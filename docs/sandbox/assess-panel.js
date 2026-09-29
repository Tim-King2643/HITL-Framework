// Activity assessment panel (GR-053) — opened from an activity card in the
// sandbox's Working Relationship view while an organization is selected.
//
// It shows what the reference model knows about the activity (roles,
// Consequence of Error, the Progression Ceiling), walks five questions
// drawn from the locked category definitions to a proposed working
// relationship, and records the assessor's confirmation or change, the
// evidence, source, confidence and a note. Saving goes through the Worker
// (OrgContext.saveAssessment); the page then re-applies the organization's
// overlay and re-renders.
//
// A separate section records a ceiling override (GR-054): a governance
// decision raising this activity's Progression Ceiling for this
// organization. It is offered only where Consequence of Error is Low or
// Moderate, and needs the ceiling factor that no longer holds, evidence, the
// Accountable role's approval. There is no fixed review date: after the
// process owner's audit, "Record a review" re-confirms it, and the panel
// shows how long ago that was and whether the reference has changed since.
//
// AssessPanel.open({
//   org, code, name, process, A, R,        // activity and its roles
//   ref: { ceiling, cons, consFactors, consNote, ceilingFactors, ceilingNote },
//   record, override, defs, cats, cfLabels, consLabels, consColor, canEdit,
//   onSaved(record),                        // after a save or a reset
//   onOverrideSaved(override)               // after an override is saved or removed
// })
(function () {
  var STEPS = ['Human-only', 'Judgment', 'Oversight', 'Augmentation', 'Agent-delegation', 'Automation'];
  var QUESTIONS = [
    { q: 'Does AI play any part in this activity&rsquo;s work?', yes: 1, no: 'Human-only' },
    { q: 'Does AI only supply inputs &mdash; data, rankings, benchmarks &mdash; for a person&rsquo;s own reasoning, without proposing the decision or producing the work?', yes: 'Judgment', no: 2 },
    { q: 'Does a person remain the primary actor, doing the work with AI assisting in real time and no separate approval step?', yes: 'Augmentation', no: 3 },
    { q: 'AI produces or proposes the complete work. Does a person review and approve every instance before it takes effect?', yes: 'Oversight', no: 4 },
    { q: 'When the AI flags an exception, does that instance wait for a person to resolve it before it completes?', hint: 'After-the-fact monitoring, sampling or audit reports don&rsquo;t count &mdash; that&rsquo;s Automation.', yes: 'Agent-delegation', no: 'Automation' }
  ];
  var OVERRIDE_CONS = { Low: 1, Moderate: 1 };
  var EVIDENCE = [['observed', 'Observed practice'], ['system', 'System configuration'], ['audit', 'Audit or control test'], ['interview', 'Interview'], ['document', 'Document']];
  function rank(c) { return STEPS.indexOf(c); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function injectCss() {
    if (document.getElementById('assess-panel-css')) return;
    var st = document.createElement('style');
    st.id = 'assess-panel-css';
    st.textContent =
      '.ap-back{position:fixed;inset:0;background:rgba(13,27,42,.45);z-index:2000;display:flex;justify-content:flex-end;}' +
      '.ap{background:#fff;width:min(620px,100%);height:100%;overflow-y:auto;padding:20px 22px 28px;box-shadow:-8px 0 30px rgba(0,0,0,.2);font-family:"DM Sans",sans-serif;color:#0D1B2A;}' +
      '.ap-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;}' +
      '.ap h3{font-size:17px;color:#0D2D4F;margin:0 0 2px;}' +
      '.ap .ap-org{font-size:12px;color:#6B7A90;margin-bottom:2px;}' +
      '.ap .ap-proc{font-size:12.5px;color:#6B7A90;margin-bottom:12px;}' +
      '.ap-close{font:inherit;font-size:20px;line-height:1;border:none;background:none;color:#6B7A90;cursor:pointer;padding:2px 6px;}' +
      '.ap dl{display:grid;grid-template-columns:150px 1fr;gap:6px 12px;font-size:12.5px;margin:0 0 6px;}' +
      '.ap dt{color:#6B7A90;font-weight:600;}' +
      '.ap dd{margin:0;}' +
      '.ap dd ul{margin:2px 0 0 16px;}' +
      '.ap .cons-btn{font:inherit;font-size:12.5px;background:none;border:none;padding:0;cursor:pointer;text-decoration:underline dotted;text-underline-offset:3px;}' +
      '.ap .cons-caret{font-size:10px;color:#6B7A90;}' +
      '.ap .cons-detail{margin-top:6px;padding:8px 10px;background:#F8FAFD;border:1px solid #DDE3EE;border-radius:6px;}' +
      '.ap ul.cf-list{list-style:none;margin:0 0 6px;padding:0;}' +
      '.ap .cf-list li{display:flex;align-items:center;gap:7px;font-size:12px;line-height:1.7;}' +
      '.ap .cf-list li.cf-off{color:#8A96A8;}' +
      '.ap .cf-box{flex:0 0 auto;width:13px;height:13px;border-radius:3px;border:1.3px solid #C6CDD9;display:inline-flex;align-items:center;justify-content:center;font-size:9px;color:#fff;}' +
      '.ap .cf-on .cf-box{background:#1B4F8A;border-color:#1B4F8A;}' +
      '.ap .cons-note{font-size:12px;color:#555;border-top:1px solid #DDE3EE;padding-top:6px;}' +
      '.ap .sec{border-top:1px solid #DDE3EE;padding-top:14px;margin-top:14px;}' +
      '.ap h4{font-family:"DM Mono",monospace;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#1B4F8A;margin:0 0 8px;}' +
      '.ap .q{background:#F8FAFD;border:1px solid #DDE3EE;border-radius:8px;padding:10px 12px;margin-bottom:8px;font-size:13px;line-height:1.5;}' +
      '.ap .q.done{opacity:.75;}' +
      '.ap .qhint{font-size:11.5px;color:#6B7A90;margin-top:3px;}' +
      '.ap .qn{font-family:"DM Mono",monospace;font-size:10.5px;color:#6B7A90;margin-right:4px;}' +
      '.ap .ans{margin-top:8px;display:flex;gap:8px;}' +
      '.ap button{font:inherit;font-size:12.5px;font-weight:600;padding:6px 13px;border-radius:6px;border:1px solid #C6D8EE;background:#fff;color:#0D2D4F;cursor:pointer;}' +
      '.ap button.on,.ap button.primary{background:#1B4F8A;border-color:#1B4F8A;color:#fff;}' +
      '.ap button.linkish{border:none;background:none;color:#1B4F8A;padding:0;text-decoration:underline;}' +
      '.ap button:disabled{opacity:.45;cursor:default;}' +
      '.ap .chip{display:inline-block;font-size:10px;font-weight:600;border-radius:3px;padding:1px 6px;color:#fff;white-space:nowrap;}' +
      '.ap .chip-none{background:#EDEFF3;color:#6B7A90;}' +
      '.ap .proposal{border-left:4px solid #1B4F8A;background:#EEF3FA;padding:10px 12px;border-radius:6px;font-size:13px;line-height:1.5;margin:10px 0;}' +
      '.ap label{display:block;font-size:12px;font-weight:600;color:#0D2D4F;margin:10px 0 4px;}' +
      '.ap select,.ap input[type=text],.ap textarea{font:inherit;font-size:13px;width:100%;box-sizing:border-box;padding:7px 9px;border:1px solid #C6D8EE;border-radius:6px;background:#fff;}' +
      '.ap textarea{min-height:60px;resize:vertical;}' +
      '.ap .radios{display:flex;gap:14px;font-size:13px;}' +
      '.ap .radios label{font-weight:400;margin:0;display:inline;}' +
      '.ap .warn{margin-top:10px;padding:9px 12px;border-radius:6px;background:#FEE2E2;border:1px solid #F5B5B5;color:#7F1D1D;font-size:12.5px;line-height:1.5;}' +
      '.ap .actions{display:flex;gap:8px;align-items:center;margin-top:14px;flex-wrap:wrap;}' +
      '.ap .msg{font-size:12px;}' +
      '.ap .msg.err{color:#991B1B;}' +
      '.ap .msg.ok{color:#166534;}' +
      '.ap .hist{font-size:12px;color:#6B7A90;margin-top:10px;}' +
      '.ap .ovr{margin-top:4px;padding:8px 10px;border-radius:6px;background:#F8FAFD;border:1px solid #DDE3EE;font-size:12.5px;line-height:1.5;}' +
      '.ap .muted{color:#6B7A90;font-size:12.5px;line-height:1.5;margin:0;}';
    document.head.appendChild(st);
  }

  function open(o) {
    injectCss();
    var back = document.createElement('div');
    back.className = 'ap-back';
    back.innerHTML = '<div class="ap" role="dialog" aria-modal="true" aria-label="Assess activity"></div>';
    document.body.appendChild(back);
    var el = back.firstChild;
    var rec = o.record;
    var ov = o.override && o.override.level ? o.override : null;
    var ovFormOpen = false, ovReviewOpen = false, consOpen = false;
    var answers = (rec && rec.current && rec.answers && rec.answers.length) ? rec.answers.slice() : [null, null, null, null, null];
    function close() { back.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    // Close only on a genuine click on the dimmed background: the press and
    // the release both on it. A browser autofill pick ("Saved info") or a
    // text drag that ends outside the panel must not close it.
    var downOnBack = false;
    back.addEventListener('mousedown', function (e) { downOnBack = (e.target === back); });
    back.addEventListener('click', function (e) { if (e.target === back && downOnBack) close(); downOnBack = false; });

    function chip(c) {
      if (!c) return '<span class="chip chip-none">Not assessed</span>';
      return '<span class="chip" style="background:' + ((o.cats[c] && o.cats[c].color) || '#888') + '">' + esc(c) + '</span>';
    }
    function walk() {
      var i = 0, path = [];
      while (true) {
        path.push(i);
        var a = answers[i];
        if (a === null || a === undefined) return { path: path, proposed: null };
        var step = a ? QUESTIONS[i].yes : QUESTIONS[i].no;
        if (typeof step === 'string') return { path: path, proposed: step };
        i = step;
      }
    }

    function ago(t) {
      var days = Math.floor((Date.now() - t) / 86400000);
      if (days < 1) return 'today';
      if (days < 60) return days + ' day' + (days === 1 ? '' : 's') + ' ago';
      var months = Math.floor(days / 30.4);
      return months + ' months ago';
    }
    // Has the reference changed for this activity since the override was
    // approved or last reviewed?
    function refChanged(v) {
      var w = o.ref, snap = v.refSnapshot;
      if (!snap) return (v.refCeiling && v.refCeiling !== w.ceiling) || (v.cons && v.cons !== w.cons);
      return snap.ceiling !== w.ceiling || snap.cons !== w.cons ||
        (snap.ceilingFactors || []).slice().sort().join() !== (w.ceilingFactors || []).slice().sort().join();
    }
    function overrideHtml() {
      var w = o.ref;
      var h = '<div class="sec"><h4>Ceiling override</h4>';
      if (!w.ceiling || rank(w.ceiling) >= STEPS.length - 1) return h + '<p class="muted">The ceiling is already Automation, the top of the ramp.</p></div>';
      if (!OVERRIDE_CONS[w.cons]) return h + '<p class="muted">Not available. Consequence of Error is <strong>' + esc(w.cons || 'not set') + '</strong>; a Progression Ceiling can be overridden only where it is Low or Moderate.</p></div>';
      if (ov) {
        h += '<dl><dt>Raised to</dt><dd>' + chip(ov.level) + ' <span style="color:#6B7A90">from ' + esc(w.ceiling) + '</span></dd>' +
          '<dt>Factor no longer holding</dt><dd>' + esc(o.cfLabels[ov.factor] || ov.factor) + '</dd>' +
          '<dt>Evidence</dt><dd>' + esc(ov.evidence) + '</dd>' +
          '<dt>Approved by</dt><dd>' + esc(ov.approverName) + ' (' + esc(ov.approverRole) + ')</dd>' +
          '<dt>Last reviewed</dt><dd>' + (ov.lastReviewedAt ? new Date(ov.lastReviewedAt).toLocaleDateString() + ' by ' + esc(ov.lastReviewedBy || ov.approverName) + ' <span style="color:#6B7A90">(' + ago(ov.lastReviewedAt) + ')</span>' : new Date(ov.approvedAt).toLocaleDateString() + ' <span style="color:#6B7A90">(at approval, ' + ago(ov.approvedAt) + ')</span>') + '</dd>' +
          '<dt>Recorded</dt><dd>' + esc(ov.approvedBy) + ', ' + new Date(ov.approvedAt).toLocaleDateString() + (ov.refVersion ? ' <span style="color:#6B7A90">&middot; reference version ' + esc(ov.refVersion) + '</span>' : '') + '</dd></dl>';
        if (refChanged(ov)) h += '<div class="warn"><strong>Re-review needed.</strong> This activity&rsquo;s ceiling, Consequence of Error or ceiling factors have changed in the reference since the override was approved or last reviewed.</div>';
      } else if (!ovFormOpen) {
        h += '<p class="muted">None. The reference ceiling of ' + esc(w.ceiling) + ' applies. An override raises it for ' + esc(o.org.name) + ' only, where the organization can show that a ceiling factor no longer holds.</p>';
      }
      if (!o.canEdit) return h + '</div>';
      if (ov && ovReviewOpen) {
        return h + '<label for="ov-confirmed">Confirmed by (after the process owner&rsquo;s audit)</label><input type="text" autocomplete="off" id="ov-confirmed" value="' + esc(ov.approverName || '') + '">' +
          '<label for="ov-rnote">Note (optional)</label><input type="text" autocomplete="off" id="ov-rnote">' +
          '<div class="actions"><button type="button" class="primary" id="ov-rsave">Save review</button><button type="button" id="ov-rcancel">Cancel</button><span class="msg" id="ov-msg"></span></div></div>';
      }
      if (!ovFormOpen) {
        return h + '<div class="actions">' + (ov ? '<button type="button" id="ov-review">Record a review</button>' : '') +
          '<button type="button" id="ov-open">' + (ov ? 'Change override' : 'Override the ceiling&hellip;') + '</button>' +
          (ov ? '<button type="button" id="ov-remove">Remove override</button>' : '') + '<span class="msg" id="ov-msg"></span></div></div>';
      }
      var above = STEPS.slice(rank(w.ceiling) + 1);
      var keys = (w.ceilingFactors || []).filter(function (k) { return k !== 'top'; });
      h += '<label for="ov-level">Raise the ceiling to</label><select id="ov-level">' +
          above.map(function (s) { return '<option' + (ov && ov.level === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>' +
        '<label for="ov-factor">Which ceiling factor no longer holds here?</label><select id="ov-factor"><option value="">Choose&hellip;</option>' +
          keys.map(function (k) { return '<option value="' + k + '"' + (ov && ov.factor === k ? ' selected' : '') + '>' + esc(o.cfLabels[k] || k) + '</option>'; }).join('') + '</select>' +
        '<label for="ov-evidence">Evidence that it no longer holds</label><textarea autocomplete="off" id="ov-evidence">' + esc(ov && ov.evidence || '') + '</textarea>' +
        '<label for="ov-role">Approved by (Accountable role)</label>' +
          (o.A.length ? '<select id="ov-role">' + o.A.map(function (a) { return '<option' + (ov && ov.approverRole === a ? ' selected' : '') + '>' + esc(a) + '</option>'; }).join('') + '</select>'
                      : '<input type="text" autocomplete="off" id="ov-role" value="' + esc(ov && ov.approverRole || '') + '">') +
        '<label for="ov-name">Approver&rsquo;s name</label><input type="text" autocomplete="off" id="ov-name" value="' + esc(ov && ov.approverName || '') + '">' +
        '<div class="actions"><button type="button" class="primary" id="ov-save">Save override</button><button type="button" id="ov-cancel">Cancel</button><span class="msg" id="ov-msg"></span></div>';
      return h + '</div>';
    }
    function wireOverride() {
      var w = o.ref;
      var bOpen = el.querySelector('#ov-open'); if (bOpen) bOpen.onclick = function () { ovFormOpen = true; draw(); var f = el.querySelector('#ov-level'); if (f) f.focus(); };
      var bCancel = el.querySelector('#ov-cancel'); if (bCancel) bCancel.onclick = function () { ovFormOpen = false; draw(); };
      var bRev = el.querySelector('#ov-review'); if (bRev) bRev.onclick = function () { ovReviewOpen = true; draw(); var f = el.querySelector('#ov-confirmed'); if (f) f.focus(); };
      var bRc = el.querySelector('#ov-rcancel'); if (bRc) bRc.onclick = function () { ovReviewOpen = false; draw(); };
      var bRs = el.querySelector('#ov-rsave');
      if (bRs) bRs.onclick = function () {
        var m = el.querySelector('#ov-msg');
        var who = el.querySelector('#ov-confirmed').value.trim();
        if (!who) { m.className = 'msg err'; m.textContent = 'Give the name of the person who confirmed it.'; return; }
        bRs.disabled = true;
        OrgContext.reviewOverride(o.org.id, o.code, who, el.querySelector('#ov-rnote').value).then(function (j) {
          ov = j.override; ovReviewOpen = false; if (o.onOverrideSaved) o.onOverrideSaved(ov); draw();
          var m2 = el.querySelector('#ov-msg'); if (m2) { m2.className = 'msg ok'; m2.textContent = 'Review recorded.'; }
        }).catch(function (e) { bRs.disabled = false; m.className = 'msg err'; m.textContent = e.message; });
      };
      var bRemove = el.querySelector('#ov-remove');
      if (bRemove) bRemove.onclick = function () {
        OrgContext.removeOverride(o.org.id, o.code).then(function () {
          ov = null; ovFormOpen = false; if (o.onOverrideSaved) o.onOverrideSaved(null); draw();
        }).catch(function (e) { var m = el.querySelector('#ov-msg'); m.className = 'msg err'; m.textContent = e.message; });
      };
      var bSave = el.querySelector('#ov-save');
      if (bSave) bSave.onclick = function () {
        var m = el.querySelector('#ov-msg');
        var body = {
          org: o.org.id, code: o.code,
          level: el.querySelector('#ov-level').value,
          factor: el.querySelector('#ov-factor').value,
          evidence: el.querySelector('#ov-evidence').value,
          approverRole: el.querySelector('#ov-role').value,
          approverName: el.querySelector('#ov-name').value
        };
        if (!body.factor) { m.className = 'msg err'; m.textContent = 'Name the ceiling factor that no longer holds.'; return; }
        if (!body.evidence.trim()) { m.className = 'msg err'; m.textContent = 'Give the evidence.'; return; }
        if (!body.approverRole.trim() || !body.approverName.trim()) { m.className = 'msg err'; m.textContent = 'Give the Accountable role and the approver.'; return; }
        bSave.disabled = true;
        OrgContext.saveOverride(body).then(function (j) {
          ov = j.override; ovFormOpen = false; if (o.onOverrideSaved) o.onOverrideSaved(ov); draw();
          var m2 = el.querySelector('#ov-msg'); if (m2) { m2.className = 'msg ok'; m2.textContent = 'Override saved.'; }
        }).catch(function (e) { bSave.disabled = false; m.className = 'msg err'; m.textContent = e.message; });
      };
    }

    // Consequence of Error: click the rating to see which of the six factors
    // put it there, with the rating note — the same checklist the activity
    // card's rating opens.
    function consHtml(w) {
      if (!w.cons) return '&mdash;';
      var labels = o.consLabels || [];
      var style = 'color:' + (o.consColor[w.cons] || '#333') + ';font-weight:600';
      if (!labels.length || !((w.consFactors && w.consFactors.length) || w.consNote)) return '<span style="' + style + '">' + esc(w.cons) + '</span>';
      var on = w.consFactors || [];
      var items = labels.map(function (f) {
        var hit = on.indexOf(f.key) !== -1;
        return '<li class="' + (hit ? 'cf-on' : 'cf-off') + '"><span class="cf-box">' + (hit ? '&#10003;' : '') + '</span>' + esc(f.label) + '</li>';
      }).join('');
      return '<button type="button" id="ap-cons" class="cons-btn" aria-expanded="' + consOpen + '" style="' + style + '">' + esc(w.cons) +
        ' <span class="cons-caret">' + (consOpen ? '&#9652;' : '&#9662;') + '</span></button>' +
        (consOpen ? '<div class="cons-detail"><ul class="cf-list">' + items + '</ul>' + (w.consNote ? '<div class="cons-note">' + esc(w.consNote) + '</div>' : '') + '</div>' : '');
    }

    function draw() {
      var w = o.ref, st = walk();
      var factors = (w.ceilingFactors || []).map(function (k) { return '<li>' + esc(o.cfLabels[k] || k) + '</li>'; }).join('');
      var html = '<div class="ap-top"><div><div class="ap-org">' + esc(o.org.name) + (o.org.test ? ' · TEST DATA' : '') + '</div>' +
        '<h3>' + esc(o.code) + ' ' + esc(o.name) + '</h3><div class="ap-proc">' + esc(o.process) + '</div></div>' +
        '<button type="button" class="ap-close" aria-label="Close">&times;</button></div>' +
        '<dl>' +
        '<dt>Accountable</dt><dd>' + (esc(o.A.join(', ')) || '&mdash;') + '</dd>' +
        '<dt>Responsible</dt><dd>' + (esc(o.R.join(', ')) || '&mdash;') + '</dd>' +
        '<dt>Consequence of Error</dt><dd>' + consHtml(w) + '</dd>' +
        '<dt>Progression Ceiling</dt><dd>' + chip(w.ceiling) + (factors ? '<ul>' + factors + '</ul>' : '') + (w.ceilingNote ? '<div style="color:#555;margin-top:4px">' + esc(w.ceilingNote) + '</div>' : '') +
          (ov ? '<div class="ovr"><strong>Overridden to ' + esc(ov.level) + '</strong> for ' + esc(o.org.name) + ' &mdash; last reviewed ' + ago(ov.lastReviewedAt || ov.approvedAt) + (refChanged(ov) ? ' &middot; <strong style="color:#991B1B">re-review needed</strong>' : '') + '</div>' : '') + '</dd>' +
        '<dt>Current State</dt><dd>' + chip(rec && rec.current) + (rec && rec.current ? ' <span style="color:#6B7A90">by ' + esc(rec.assessedBy) + ', ' + new Date(rec.assessedAt).toLocaleDateString() + '</span>' : ' <span style="color:#6B7A90">reads as the Human-only baseline</span>') + '</dd>' +
        '</dl>';
      html += '<div class="sec"><h4>How is this activity done in ' + esc(o.org.name) + '?</h4>';
      st.path.forEach(function (qi) {
        var a = answers[qi];
        html += '<div class="q' + (a === null || a === undefined ? '' : ' done') + '"><span class="qn">Q' + (qi + 1) + '</span>' + QUESTIONS[qi].q + (QUESTIONS[qi].hint ? '<div class="qhint">' + QUESTIONS[qi].hint + '</div>' : '') +
          '<div class="ans"><button type="button" data-q="' + qi + '" data-a="1" class="' + (a === true ? 'on' : '') + '"' + (o.canEdit ? '' : ' disabled') + '>Yes</button>' +
          '<button type="button" data-q="' + qi + '" data-a="0" class="' + (a === false ? 'on' : '') + '"' + (o.canEdit ? '' : ' disabled') + '>No</button></div></div>';
      });
      if (o.canEdit && answers.some(function (x) { return x !== null && x !== undefined; })) html += '<button type="button" class="linkish" id="ap-restart">Start the questions over</button>';
      html += '</div>';
      if (st.proposed) {
        var p = st.proposed;
        var chosen = (rec && rec.current && rec.proposed === p) ? rec.current : p;
        var dis = o.canEdit ? '' : ' disabled';
        html += '<div class="proposal">Proposed: ' + chip(p) + '<div style="margin-top:4px">' + esc(o.defs[p] || '') + '</div></div>' +
          '<label for="ap-current">Working relationship</label><select id="ap-current"' + dis + '>' +
          STEPS.map(function (s) { return '<option' + (s === chosen ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>' +
          '<div id="ap-reason-wrap" style="display:none"><label for="ap-reason">Reason for changing the proposal</label><textarea autocomplete="off" id="ap-reason"' + dis + '>' + esc(rec && rec.overrideReason || '') + '</textarea></div>' +
          '<label for="ap-evidence">Evidence</label><select id="ap-evidence"' + dis + '><option value="">Choose&hellip;</option>' +
          EVIDENCE.map(function (e) { return '<option value="' + e[0] + '"' + (rec && rec.evidenceType === e[0] ? ' selected' : '') + '>' + e[1] + '</option>'; }).join('') + '</select>' +
          '<label for="ap-source">Source (who or what it came from)</label><input type="text" autocomplete="off" id="ap-source" value="' + esc(rec && rec.source || '') + '"' + dis + '>' +
          '<label>Confidence</label><div class="radios">' +
          ['high', 'medium', 'low'].map(function (c) { return '<label><input type="radio" name="ap-conf" value="' + c + '"' + (rec && rec.confidence === c ? ' checked' : '') + dis + '> ' + c.charAt(0).toUpperCase() + c.slice(1) + '</label>'; }).join('') + '</div>' +
          '<label for="ap-note">Note</label><textarea autocomplete="off" id="ap-note"' + dis + '>' + esc(rec && rec.note || '') + '</textarea>' +
          '<div id="ap-beyond"></div>' +
          '<div class="actions">' + (o.canEdit ? '<button type="button" class="primary" id="ap-save">Save assessment</button>' : '<span class="msg">Sign in as Tim or GiGi to save.</span>') +
          (o.canEdit && rec && rec.current ? '<button type="button" id="ap-reset">Reset to baseline</button>' : '') +
          '<span class="msg" id="ap-msg"></span></div>';
      }
      if (rec && rec.history && rec.history.length) html += '<div class="hist">' + rec.history.length + ' earlier version' + (rec.history.length === 1 ? '' : 's') + ' kept.</div>';
      html += overrideHtml();
      el.innerHTML = html;
      wireOverride();

      el.querySelector('.ap-close').onclick = close;
      var consBtn = el.querySelector('#ap-cons');
      if (consBtn) consBtn.onclick = function () { consOpen = !consOpen; draw(); };
      Array.prototype.forEach.call(el.querySelectorAll('button[data-q]'), function (b) {
        b.onclick = function () {
          var qi = +b.getAttribute('data-q');
          var keep = walk().path; // questions currently on the path
          var idx = keep.indexOf(qi);
          answers = answers.map(function (a, k) { return (idx !== -1 && keep.indexOf(k) !== -1 && keep.indexOf(k) < idx) ? a : null; });
          answers[qi] = b.getAttribute('data-a') === '1';
          draw();
        };
      });
      var rs = el.querySelector('#ap-restart'); if (rs) rs.onclick = function () { answers = [null, null, null, null, null]; draw(); };
      if (!st.proposed) return;
      var w = o.ref;
      var cur = el.querySelector('#ap-current'), p2 = st.proposed;
      function sync() {
        var v = cur.value;
        el.querySelector('#ap-reason-wrap').style.display = v !== p2 ? '' : 'none';
        var past = w.ceiling && rank(v) > rank(w.ceiling);
        var covered = past && ov && rank(v) <= rank(ov.level);
        el.querySelector('#ap-beyond').innerHTML = !past ? '' : covered
          ? '<div class="ovr"><strong>Past the Progression Ceiling, within the approved override.</strong> ' + esc(v) + ' is above the reference ceiling of ' + esc(w.ceiling) + ', and inside the override to ' + esc(ov.level) + '.</div>'
          : '<div class="warn"><strong>Past the Progression Ceiling.</strong> ' + esc(v) + ' is above this activity&rsquo;s ceiling of ' + esc(w.ceiling) + '. Record it: it is a finding about how this organization works, not an error in the assessment. ' +
            (OVERRIDE_CONS[w.cons] ? 'Unless a ceiling override is approved below, it shows in red.' : 'Consequence of Error is ' + esc(w.cons) + ', so the ceiling cannot be overridden; it shows in red until the work comes back within it.') + '</div>';
      }
      cur.onchange = sync; sync();
      var save = el.querySelector('#ap-save');
      if (save) save.onclick = function () {
        var conf = el.querySelector('input[name="ap-conf"]:checked');
        var msg = el.querySelector('#ap-msg');
        var body = {
          org: o.org.id, code: o.code, current: cur.value, proposed: p2, answers: answers,
          overrideReason: el.querySelector('#ap-reason').value,
          evidenceType: el.querySelector('#ap-evidence').value,
          confidence: conf ? conf.value : '',
          source: el.querySelector('#ap-source').value,
          note: el.querySelector('#ap-note').value
        };
        if (body.current !== p2 && !body.overrideReason.trim()) { msg.className = 'msg err'; msg.textContent = 'Give a reason for overriding the proposal.'; return; }
        if (!body.evidenceType || !body.confidence) { msg.className = 'msg err'; msg.textContent = 'Choose the evidence and a confidence level.'; return; }
        save.disabled = true;
        OrgContext.saveAssessment(body).then(function (j) {
          rec = j.record; o.onSaved(rec); draw();
          var m = el.querySelector('#ap-msg'); if (m) { m.className = 'msg ok'; m.textContent = 'Saved.'; }
        }).catch(function (e) { save.disabled = false; msg.className = 'msg err'; msg.textContent = e.message; });
      };
      var reset = el.querySelector('#ap-reset');
      if (reset) reset.onclick = function () {
        OrgContext.resetAssessment(o.org.id, o.code).then(function (j) {
          rec = j.record; answers = [null, null, null, null, null]; o.onSaved(rec); draw();
        }).catch(function (e) { var m = el.querySelector('#ap-msg'); m.className = 'msg err'; m.textContent = e.message; });
      };
    }
    draw();
    var first = el.querySelector('button[data-q]') || el.querySelector('.ap-close');
    if (first) first.focus();
  }

  window.AssessPanel = { open: open };
})();
