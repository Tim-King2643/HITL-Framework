/* ABC Test Org: generated test assessment (GR-052, built on GR-058 work elements).
   Used by abc_test_assessment_sketch.html (to choose and download a set), by
   four_view_sandbox_sketch.html (to run the four views on all 118 activities) and by
   the element assessment panel sketch (to assess by hand; see working() below).

   The set is generated for coverage, not realism: it makes sure every case the
   assessment, override and exceptions flows have to handle occurs at least a few
   times. A fixed seed gives the same set every time, so test results stay comparable.

   Each assessment has the GR-058 shape: who leads each work element, with evidence,
   and the activity's Current State derived from the elements (derive(), as in the
   element assessment panel sketch). Overrides and reference stamps have the shape
   the Worker saves (src/index.js, /org-api/assessment and /org-api/ceiling-override). */
(function (g) {
  var ST = ['Human-only', 'Judgment', 'Augmentation', 'Oversight', 'Agent-delegation', 'Automation'];
  var LEAD = ['Human', 'Human-led', 'AI-led', 'AI'];
  var EVIDENCE = [['observed', 'Observed practice'], ['system', 'System configuration'], ['audit', 'Audit or control test'], ['interview', 'Interview'], ['document', 'Document']];
  var CONF = ['high', 'medium', 'low'];
  var rank = function (s) { return ST.indexOf(s); }, lr = function (s) { return LEAD.indexOf(s); };

  // How many of each case a profile produces. Unassessed is a share of all 118.
  var PROFILES = {
    early:    { label: 'Early adoption', weights: [6, 5, 3, 1, 0.5, 0.3], unassessed: 0.30, pastLowMod: 2, pastHighCrit: 2, override: 2, elementPast: 3, refChanged: 4 },
    mixed:    { label: 'Mixed',          weights: [2, 3, 3, 2, 2, 2],     unassessed: 0.15, pastLowMod: 3, pastHighCrit: 3, override: 3, elementPast: 5, refChanged: 4 },
    advanced: { label: 'Advanced',       weights: [0.5, 1, 2, 3, 4, 5],   unassessed: 0.05, pastLowMod: 4, pastHighCrit: 4, override: 4, elementPast: 6, refChanged: 4 }
  };

  function rng(seed) { // mulberry32
    var t = seed >>> 0;
    return function () { t += 0x6D2B79F5; var r = Math.imul(t ^ t >>> 15, 1 | t); r ^= r + Math.imul(r ^ r >>> 7, 61 | r); return ((r ^ r >>> 14) >>> 0) / 4294967296; };
  }
  function shuffle(arr, R) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(R() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pickWeighted(weights, R) { var tot = weights.reduce(function (s, w) { return s + w; }, 0), x = R() * tot; for (var i = 0; i < weights.length; i++) { x -= weights[i]; if (x <= 0) return i; } return weights.length - 1; }

  // Current State from the element leads (the element assessment panel sketch's rule).
  function derive(els, control, lead) {
    var ai = function (e) { return lead[e] !== 'Human'; }, leads = function (e) { return lr(lead[e]) >= 2; }, has = function (e) { return els.indexOf(e) >= 0; };
    var core = ['Evaluate', 'Draft', 'Verify', 'Decide', 'Communicate'].filter(has);
    if (!els.some(ai)) return 'Human-only';
    if (els.every(function (e) { return lead[e] === 'AI'; })) return 'Automation';
    if (core.some(leads) && (!has('Draft') || leads('Draft') || control === 'Draft')) {
      var c = lead[control];
      if (c === 'AI') return 'Automation';
      if (c === 'AI-led') return 'Agent-delegation';
      return 'Oversight';
    }
    if (['Draft', 'Verify', 'Communicate'].filter(has).some(ai)) return 'Augmentation';
    if (['Research', 'Evaluate'].filter(has).some(ai)) return 'Judgment';
    return 'Human-only';
  }

  /* model: { acts, ceil(a), refCeiling(a) (before GR-058), cons(a), refCons(a) (before GR-058),
              els(a), ctl(a), cap(a,e), stageEls(a,stage), roles(a) -> {A, R} }
     opts:  { profile: 'early'|'mixed'|'advanced', seed: integer } */
  function generate(model, opts) {
    var P = PROFILES[opts.profile] || PROFILES.mixed, R = rng(opts.seed || 1);
    var acts = model.acts, out = {}, overrides = {}, intent = {};
    var cur = function (a, lead) { return derive(model.els(a), model.ctl(a), lead); };
    var lowMod = function (a) { return model.cons(a) === 'Low' || model.cons(a) === 'Moderate'; };
    var below = function (a) { return rank(model.ceil(a)) < 5; };

    // A lead set that derives past the ceiling, or null.
    function pastLeads(a) {
      for (var k = rank(model.ceil(a)) + 1; k < 6; k++) { var l = model.stageEls(a, ST[k]); if (rank(cur(a, l)) > rank(model.ceil(a))) return l; }
      return null;
    }
    // A lead set within the ceiling with one element raised one step past its own ceiling, or null.
    function elementPastLeads(a) {
      var ci = rank(model.ceil(a));
      for (var k = ci; k >= 1; k--) {
        var base = model.stageEls(a, ST[k]), els = shuffle(model.els(a), R);
        for (var i = 0; i < els.length; i++) {
          var e = els[i], c = model.cap(a, e);
          if (c === 'AI' || lr(base[e]) !== lr(c)) continue;
          var l = Object.assign({}, base); l[e] = LEAD[lr(c) + 1];
          if (rank(cur(a, l)) <= ci) return l;
        }
      }
      return null;
    }
    var used = {};
    function take(pool, n, make, tag) {
      var got = 0; shuffle(pool, R).forEach(function (a) {
        if (got >= n || used[a.code]) return; var l = make(a); if (!l) return;
        used[a.code] = 1; out[a.code] = { lead: l }; intent[a.code] = tag; got++;
      });
    }
    take(acts.filter(function (a) { return below(a) && model.cons(a) !== 'Low' && model.cons(a) !== 'Moderate'; }), P.pastHighCrit, pastLeads, 'past-high');
    take(acts.filter(function (a) { return below(a) && lowMod(a); }), P.override, pastLeads, 'override');
    take(acts.filter(function (a) { return below(a) && lowMod(a); }), P.pastLowMod, pastLeads, 'past-lowmod');
    take(acts.filter(function (a) { return model.els(a).some(function (e) { return model.cap(a, e) !== 'AI'; }); }), P.elementPast, elementPastLeads, 'element-past');
    // Reference changed since assessed: assessed against the ceiling or Consequence of Error before GR-058.
    take(acts.filter(function (a) { return model.refCeiling(a) !== model.ceil(a) || model.refCons(a) !== model.cons(a); }), P.refChanged,
      function (a) { var ci = rank(model.ceil(a)); return model.stageEls(a, ST[Math.max(0, Math.min(ci, rank(model.refCeiling(a))))]); }, 'ref-changed');
    // Unassessed: left at the Human-only baseline with no record.
    var rest = shuffle(acts.filter(function (a) { return !used[a.code]; }), R);
    var nUn = Math.round(acts.length * P.unassessed);
    rest.slice(0, nUn).forEach(function (a) { used[a.code] = 1; intent[a.code] = 'unassessed'; });
    // Everything else: somewhere from the baseline up to the ceiling, by profile.
    rest.slice(nUn).forEach(function (a) {
      var ci = rank(model.ceil(a)), k = pickWeighted(P.weights.slice(0, ci + 1), R);
      out[a.code] = { lead: model.stageEls(a, ST[k]) }; intent[a.code] = 'within';
    });

    // Fill in the record: evidence per element, confidence, source role, reference stamp.
    var n = 0;
    acts.forEach(function (a) {
      var o = out[a.code]; if (!o) return;
      var els = model.els(a), el = {};
      els.forEach(function (e) {
        var ev = EVIDENCE[(n++) % EVIDENCE.length];
        el[e] = o.lead[e] === 'Human' && R() < 0.6 ? ['Human', '', ''] : [o.lead[e], ev[0], 'Test data: ' + ev[1].toLowerCase() + ' for ' + e];
      });
      var roles = model.roles(a), src = R() < 0.65 || !roles.R.length ? roles.A : roles.R[Math.floor(R() * roles.R.length)];
      var stampOld = intent[a.code] === 'ref-changed';
      out[a.code] = {
        el: el, current: cur(a, o.lead), confidence: CONF[Math.floor(R() * 3)],
        sourceRole: src, note: 'Generated test assessment (' + P.label + ', seed ' + (opts.seed || 1) + ')',
        refSnapshot: { ceiling: stampOld ? model.refCeiling(a) : model.ceil(a), cons: stampOld ? model.refCons(a) : model.cons(a), ceilingFactors: a.f || [] },
        refVersion: stampOld ? 'before GR-058' : 'GR-058'
      };
      if (intent[a.code] === 'override') {
        var factor = (a.f || []).filter(function (f) { return f !== 'top'; })[0] || null;
        if (factor) overrides[a.code] = { level: out[a.code].current, factor: factor, evidence: 'Test data: evidence that the ' + factor + ' factor no longer holds', approverRole: roles.A, cons: model.cons(a), refCeiling: model.ceil(a) };
      }
    });
    return { profile: opts.profile || 'mixed', profileLabel: P.label, seed: opts.seed || 1, assessments: out, overrides: overrides };
  }

  // Cases read back from a generated set (computed from the output, not from the generator's intentions).
  function classify(model, set) {
    var rows = {};
    model.acts.forEach(function (a) {
      var r = set.assessments[a.code], ov = set.overrides[a.code], ci = rank(model.ceil(a));
      if (!r) { rows[a.code] = { assessed: false }; return; }
      var c = rank(r.current), lim = ov ? Math.max(ci, rank(ov.level)) : ci;
      var elPast = model.els(a).filter(function (e) { return r.el[e] && lr(r.el[e][0]) > lr(model.cap(a, e)); });
      rows[a.code] = {
        assessed: true, current: r.current, atCeiling: c === ci, within: c <= ci, pastCeiling: c > ci, pastNoOverride: c > lim,
        override: !!ov, overrideBlocked: c > ci && !(model.cons(a) === 'Low' || model.cons(a) === 'Moderate'),
        elementPast: elPast, elementPastWithin: elPast.length > 0 && c <= ci,
        refChanged: r.refSnapshot.ceiling !== model.ceil(a) || r.refSnapshot.cons !== model.cons(a),
        evidence: model.els(a).map(function (e) { return r.el[e] && r.el[e][1]; }).filter(Boolean), confidence: r.confidence
      };
    });
    return rows;
  }

  /* The working assessment: what ABC Test Org shows in the sketches.
     It starts from one of two sources, then carries the assessments saved by hand in the
     element assessment panel on top:
       reference  the Reference Model's Human-only baseline: nothing assessed, no overrides
       generated  the generated test assessment for the chosen profile and seed
     Hand-saved assessments are kept per source (and per profile and seed), so switching the
     source never loses them; switching back brings them back. They live in this browser only;
     the real build saves through the Worker. */
  var KEY_SET = 'hitl.abcTestSet', KEY_ED = 'hitl.abcEdits';
  function store() { try { return g.localStorage; } catch (e) { return null; } }
  function readJSON(k, d) { try { var s = store(); var v = s && JSON.parse(s.getItem(k) || 'null'); return v == null ? d : v; } catch (e) { return d; } }
  function writeJSON(k, v) { try { var s = store(); if (!s) return false; s.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function settings() {
    var o = { profile: 'mixed', seed: 1, source: 'generated' }, v = readJSON(KEY_SET, null);
    if (v) { if (PROFILES[v.profile] && v.seed > 0) { o.profile = v.profile; o.seed = v.seed; } if (v.source === 'reference') o.source = 'reference'; }
    return o;
  }
  function saveSettings(o) { var c = settings(); ['profile', 'seed', 'source'].forEach(function (k) { if (o[k] != null) c[k] = o[k]; }); writeJSON(KEY_SET, c); return c; }
  function baseKey(o) { return o.source === 'reference' ? 'reference' : o.profile + '-' + o.seed; }
  function edits(o) { var all = readJSON(KEY_ED, {}); return all[baseKey(o || settings())] || {}; }
  // rec: an assessment record, or null to mark the activity not assessed.
  function saveEdit(code, rec, o) { var all = readJSON(KEY_ED, {}), k = baseKey(o || settings()); all[k] = all[k] || {}; all[k][code] = rec; return writeJSON(KEY_ED, all); }
  // Drop the hand-saved record for one activity, so it goes back to what the start has.
  function dropEdit(code, o) { var all = readJSON(KEY_ED, {}), k = baseKey(o || settings()); if (all[k]) delete all[k][code]; return writeJSON(KEY_ED, all); }
  function clearEdits(o) { var all = readJSON(KEY_ED, {}); delete all[baseKey(o || settings())]; return writeJSON(KEY_ED, all); }
  function working(model, o) {
    o = o || settings();
    var P = PROFILES[o.profile] || PROFILES.mixed;
    var base = o.source === 'reference' ? { assessments: {}, overrides: {} } : generate(model, o);
    var ed = edits(o), as = {}, ov = {};
    Object.keys(base.assessments).forEach(function (c) { as[c] = base.assessments[c]; });
    Object.keys(base.overrides).forEach(function (c) { ov[c] = base.overrides[c]; });
    Object.keys(ed).forEach(function (c) { if (ed[c]) as[c] = ed[c]; else delete as[c]; });
    return { source: o.source, profile: o.profile, profileLabel: P.label, seed: o.seed, assessments: as, overrides: ov, edits: ed, edited: Object.keys(ed).length };
  }
  function describe(set) { return set.source === 'reference' ? 'the Reference Model (Human-only baseline)' : 'the generated test assessment (' + set.profileLabel + ' profile, seed ' + set.seed + ')'; }

  g.ABC_TEST = { generate: generate, classify: classify, derive: derive, PROFILES: PROFILES, EVIDENCE: EVIDENCE, CONF: CONF,
    settings: settings, saveSettings: saveSettings, working: working, edits: edits, saveEdit: saveEdit, dropEdit: dropEdit, clearEdits: clearEdits, describe: describe };
})(window);
