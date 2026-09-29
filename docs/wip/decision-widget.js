// Requirement decisions (Sept 28, 2026) — shared by the Requirements
// Register and the design specs.
//
// A requirement in requirements-data.js can carry one pending decision:
//   decision: { id, type: 'accept'|'design'|'question', question, summary, via? }
//   summary: one or two sentences — what's built (accept) or what happens if approved.
// Its key is "<GR-id>:<decision id>". Tim and GiGi each choose Approve, Not
// approve or Defer (Worker routes /wip-api/decisions and /wip-api/decision);
// the outcome is the shared choice once both agree. Where a decision is
// taken through an existing WIP item's vote (`via`), the widget shows that
// vote instead of its own buttons, so each decision is made in one place.
//
// Usage:
//   DecisionStore.load()                 -> Promise<{ reviewer, decisions, votes }>
//   DecisionStore.outcome(req)           -> { code, label } for a requirement
//   DecisionWidget.html(req, store)      -> HTML for a decision block
//   DecisionWidget.wire(rootEl, onChange) after inserting html()
//   DecisionWidget.mount(el, reqId)      loads everything and renders one block
(function () {
  var CHOICE_LABEL = { approve: 'Approve', 'not-approve': 'Not approve', defer: 'Defer' };
  var OUTCOME = {
    approve: { label: 'Approved', cls: 'dw-ok' },
    'not-approve': { label: 'Not approved', cls: 'dw-no' },
    defer: { label: 'Deferred', cls: 'dw-defer' },
    split: { label: 'Split — discuss', cls: 'dw-split' },
    'awaiting-tim': { label: 'Awaiting Tim', cls: 'dw-wait' },
    'awaiting-gigi': { label: 'Awaiting GiGi', cls: 'dw-wait' },
    awaiting: { label: 'Awaiting decision', cls: 'dw-wait' },
    revise: { label: 'Revision requested', cls: 'dw-split' },
    none: { label: '—', cls: 'dw-none' }
  };
  // Pages for WIP items a decision can be taken through.
  var VIA_PAGES = {
    'hpct-badge': 'h_pct_provenance_badge_standard.html',
    'wr-display-migration': 'working_relationship_display_migration.html',
    'rule-catalog': 'framework_content_generation_rules.html',
    'content-promotion-policy': 'content_promotion_policy.html',
    'work-product-spec': 'work_product_role_container_spec.html',
    'reference-model-spec': 'reference_model_assessment_layer_spec.html',
    'wr-progression-methodology': 'wr_progression_methodology_spec.html'
  };
  var state = { loaded: null, reviewer: null, decisions: {}, votes: {} };

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function getJson(path) {
    return fetch(path, { credentials: 'same-origin' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; });
  }

  function injectCss() {
    if (document.getElementById('decision-widget-css')) return;
    var st = document.createElement('style');
    st.id = 'decision-widget-css';
    st.textContent =
      '.dw-chip{display:inline-block;font-size:9.5px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;border-radius:3px;padding:3px 8px;white-space:nowrap;}' +
      '.dw-ok{background:#DCFCE7;color:#166534;}.dw-no{background:#FEE2E2;color:#991B1B;}.dw-defer{background:#EDEFF3;color:#444;}' +
      '.dw-split{background:#FEF3C7;color:#7A5A1E;}.dw-wait{background:#D6E8FF;color:#0D2D4F;}.dw-none{background:transparent;color:#888;padding-left:0;}' +
      '.dw{background:#fff;border:1px solid #DDE3EE;border-left:4px solid #1B4F8A;border-radius:8px;padding:12px 14px;margin:0;font-size:13px;line-height:1.5;color:#0D1B2A;}' +
      '.dw-q{font-weight:600;color:#0D2D4F;margin:4px 0 8px;}' +
      '.dw-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:10.5px;letter-spacing:.04em;text-transform:uppercase;color:#6B7A90;font-weight:700;}' +
      '.dw-sum{font-size:12.5px;color:#444;line-height:1.5;background:#F8FAFD;border:1px solid #E6EBF3;border-radius:6px;padding:7px 10px;margin:0 0 10px;}' +
      '.dw-sum span{display:block;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#6B7A90;margin-bottom:2px;}' +
      '.dw-who{display:flex;gap:16px;flex-wrap:wrap;font-size:12px;color:#444;margin-bottom:8px;}' +
      '.dw-who b{color:#0D1B2A;}' +
      '.dw-btns{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}' +
      '.dw-btns button{font:inherit;font-size:12px;font-weight:600;padding:5px 12px;border-radius:6px;border:1px solid #DDE3EE;background:#fff;color:#444;cursor:pointer;}' +
      '.dw-btns button:hover{border-color:#1B4F8A;color:#1B4F8A;}' +
      '.dw-btns button.on{background:#1B4F8A;border-color:#1B4F8A;color:#fff;}' +
      '.dw-btns input{flex:1 1 180px;font:inherit;font-size:12px;padding:5px 8px;border:1px solid #DDE3EE;border-radius:6px;}' +
      '.dw-msg{font-size:11.5px;color:#991B1B;}' +
      '.dw-via{font-size:12px;color:#444;}.dw-via a{color:#1B4F8A;font-weight:600;}';
    document.head.appendChild(st);
  }

  function load(force) {
    if (state.loaded && !force) return state.loaded;
    state.loaded = Promise.all([getJson('/wip-api/decisions'), getJson('/wip-api/votes')]).then(function (res) {
      state.reviewer = res[0].reviewer || res[1].reviewer || null;
      state.decisions = res[0].decisions || {};
      state.votes = res[1].items || {};
      return state;
    });
    return state.loaded;
  }

  function keyOf(req) { return req.decision ? req.id + ':' + req.decision.id : null; }

  // Outcome for a requirement: the live decision if one is pending, else the
  // last decision recorded in the file, else none.
  function outcome(req) {
    var d = req.decision;
    if (!d) {
      var last = (req.decisions || [])[0];
      return last ? { code: last.outcome, label: (OUTCOME[last.outcome] || OUTCOME.none).label, cls: (OUTCOME[last.outcome] || OUTCOME.none).cls, recorded: true } : { code: 'none', label: OUTCOME.none.label, cls: OUTCOME.none.cls };
    }
    var code = 'awaiting';
    if (d.via) {
      var v = state.votes[d.via];
      if (v) {
        var dec = v.decision;
        if (dec === 'approve' || dec === 'published' || dec === 'pending-publish') code = 'approve';
        else if (dec === 'deny') code = 'not-approve';
        else if (dec === 'park') code = 'defer';
        else if (dec === 'revise') code = 'revise';
        else if (dec === 'discuss') code = 'split';
        else if (v.tim && !v.tim.stale && !(v.gigi && !v.gigi.stale)) code = 'awaiting-gigi';
        else if (v.gigi && !v.gigi.stale && !(v.tim && !v.tim.stale)) code = 'awaiting-tim';
      }
    } else {
      var live = state.decisions[keyOf(req)];
      if (live) code = live.outcome;
    }
    var o = OUTCOME[code] || OUTCOME.awaiting;
    return { code: code, label: o.label, cls: o.cls };
  }
  function chip(req) { var o = outcome(req); return '<span class="dw-chip ' + o.cls + '">' + esc(o.label) + '</span>'; }
  function needsDecision(req) {
    if (!req.decision) return false;
    var c = outcome(req).code;
    return c !== 'approve' && c !== 'not-approve' && c !== 'defer';
  }

  function whoLine(entry, name) {
    if (!entry) return '<span>' + name + ': <b>not yet</b></span>';
    return '<span>' + name + ': <b>' + esc(CHOICE_LABEL[entry.choice] || entry.choice) + '</b>' +
      (entry.note ? ' &mdash; ' + esc(entry.note) : '') + '</span>';
  }

  function html(req) {
    injectCss();
    var d = req.decision;
    if (!d) return '';
    var h = '<div class="dw" data-dw-key="' + esc(keyOf(req)) + '">' +
      '<div class="dw-head">' + esc(req.id) + ' &middot; ' + (d.type === 'accept' ? 'Accept' : d.type === 'design' ? 'Approve the design' : 'Decide') + ' ' + chip(req) + '</div>' +
      '<div class="dw-q">' + esc(d.question) + '</div>' +
      (d.summary ? '<div class="dw-sum"><span>' + (d.type === 'accept' ? 'What&rsquo;s built' : 'If approved') + '</span>' + esc(d.summary) + '</div>' : '');
    if (d.via) {
      var page = VIA_PAGES[d.via];
      var here = page && location.pathname.slice(-page.length) === page;
      h += '<div class="dw-via">' + (here ? 'Decided through this page&rsquo;s review vote, at the top of the page.' :
        'Decided through the vote on its WIP item' + (page ? ': <a href="' + page + '">open it and vote there</a>' : '') + '.') + '</div></div>';
      return h;
    }
    var live = state.decisions[keyOf(req)] || {};
    h += '<div class="dw-who">' + whoLine(live.tim, 'Tim') + whoLine(live.gigi, 'GiGi') + '</div>';
    if (state.reviewer) {
      var mine = state.reviewer === 'Tim' ? live.tim : live.gigi;
      h += '<div class="dw-btns">' +
        ['approve', 'not-approve', 'defer'].map(function (c) {
          return '<button type="button" data-dw-choice="' + c + '"' + (mine && mine.choice === c ? ' class="on"' : '') + '>' + CHOICE_LABEL[c] + '</button>';
        }).join('') +
        '<input type="text" data-dw-note placeholder="Note (optional)" value="' + esc(mine && mine.note || '') + '">' +
        '<span class="dw-msg" data-dw-msg></span></div>';
    } else {
      h += '<div class="dw-via">Sign in as Tim or GiGi to record a decision.</div>';
    }
    return h + '</div>';
  }

  function wire(root, onChange) {
    Array.prototype.forEach.call(root.querySelectorAll('.dw[data-dw-key]'), function (box) {
      var key = box.getAttribute('data-dw-key');
      Array.prototype.forEach.call(box.querySelectorAll('button[data-dw-choice]'), function (b) {
        b.onclick = function (e) {
          e.stopPropagation();
          var note = box.querySelector('[data-dw-note]');
          var msg = box.querySelector('[data-dw-msg]');
          b.disabled = true;
          fetch('/wip-api/decision', {
            method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ key: key, choice: b.getAttribute('data-dw-choice'), note: note ? note.value : '' })
          }).then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error || 'HTTP ' + r.status); return j; }); })
            .then(function (j) { state.decisions[key] = j.decision; if (onChange) onChange(key); })
            .catch(function (err) { b.disabled = false; if (msg) msg.textContent = err.message; });
        };
      });
      Array.prototype.forEach.call(box.querySelectorAll('input'), function (i) { i.onclick = function (e) { e.stopPropagation(); }; });
    });
  }

  function mount(el, reqId) {
    injectCss();
    load().then(function () {
      var req = (window.REQUIREMENTS || []).filter(function (r) { return r.id === reqId; })[0];
      if (!req) return;
      function draw() { el.innerHTML = html(req) || ''; wire(el, draw); }
      draw();
    });
  }

  window.DecisionStore = { load: load, outcome: outcome, needsDecision: needsDecision, keyOf: keyOf, state: state };
  window.DecisionWidget = { html: html, wire: wire, mount: mount, chip: chip };
})();
