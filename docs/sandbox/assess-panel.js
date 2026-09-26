// Activity assessment panel (GR-053) — opened from an activity card in the
// sandbox's Working Relationship view while an organization is selected.
//
// It shows what the reference model knows about the activity (roles,
// Consequence of Error, the ceiling as design intent), walks five questions
// drawn from the locked category definitions to a proposed working
// relationship, and records the assessor's confirmation or override, the
// evidence, source, confidence and a note. Saving goes through the Worker
// (OrgContext.saveAssessment); the page then re-applies the organization's
// overlay and re-renders.
//
// AssessPanel.open({
//   org, code, name, process, A, R,        // activity and its roles
//   ref: { ceiling, cons, ceilingFactors, ceilingNote },
//   record, defs, cats, cfLabels, consColor, canEdit,
//   onSaved(record)                         // after a save or a reset
// })
(function () {
  var STEPS = ['Human-only', 'Judgment', 'Oversight', 'Augmentation', 'Agent-delegation', 'Automation'];
  var QUESTIONS = [
    { q: 'Does AI play any part in this activity&rsquo;s work?', yes: 1, no: 'Human-only' },
    { q: 'Does AI only supply inputs &mdash; data, rankings, benchmarks &mdash; for a person&rsquo;s own reasoning, without proposing the decision or producing the work?', yes: 'Judgment', no: 2 },
    { q: 'Does a person remain the primary actor, doing the work with AI assisting in real time and no separate approval step?', yes: 'Augmentation', no: 3 },
    { q: 'AI produces or proposes the complete work. Does a person review and approve every instance before it takes effect?', yes: 'Oversight', no: 4 },
    { q: 'Does a person handle only the exceptions the AI flags, rather than every instance?', yes: 'Agent-delegation', no: 'Automation' }
  ];
  var EVIDENCE = [['observed', 'Observed practice'], ['system', 'System configuration'], ['interview', 'Interview'], ['document', 'Document']];
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
      '.ap .sec{border-top:1px solid #DDE3EE;padding-top:14px;margin-top:14px;}' +
      '.ap h4{font-family:"DM Mono",monospace;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#1B4F8A;margin:0 0 8px;}' +
      '.ap .q{background:#F8FAFD;border:1px solid #DDE3EE;border-radius:8px;padding:10px 12px;margin-bottom:8px;font-size:13px;line-height:1.5;}' +
      '.ap .q.done{opacity:.75;}' +
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
      '.ap .hist{font-size:12px;color:#6B7A90;margin-top:10px;}';
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
    var answers = (rec && rec.current && rec.answers && rec.answers.length) ? rec.answers.slice() : [null, null, null, null, null];
    function close() { back.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    back.addEventListener('click', function (e) { if (e.target === back) close(); });

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

    function draw() {
      var w = o.ref, st = walk();
      var factors = (w.ceilingFactors || []).map(function (k) { return '<li>' + esc(o.cfLabels[k] || k) + '</li>'; }).join('');
      var html = '<div class="ap-top"><div><div class="ap-org">' + esc(o.org.name) + (o.org.test ? ' · TEST DATA' : '') + '</div>' +
        '<h3>' + esc(o.code) + ' ' + esc(o.name) + '</h3><div class="ap-proc">' + esc(o.process) + '</div></div>' +
        '<button type="button" class="ap-close" aria-label="Close">&times;</button></div>' +
        '<dl>' +
        '<dt>Accountable</dt><dd>' + (esc(o.A.join(', ')) || '&mdash;') + '</dd>' +
        '<dt>Responsible</dt><dd>' + (esc(o.R.join(', ')) || '&mdash;') + '</dd>' +
        '<dt>Consequence of Error</dt><dd>' + (w.cons ? '<span style="color:' + (o.consColor[w.cons] || '#333') + ';font-weight:600">' + esc(w.cons) + '</span>' : '&mdash;') + '</dd>' +
        '<dt>Design intent (ceiling)</dt><dd>' + chip(w.ceiling) + (factors ? '<ul>' + factors + '</ul>' : '') + (w.ceilingNote ? '<div style="color:#555;margin-top:4px">' + esc(w.ceilingNote) + '</div>' : '') + '</dd>' +
        '<dt>Current State</dt><dd>' + chip(rec && rec.current) + (rec && rec.current ? ' <span style="color:#6B7A90">by ' + esc(rec.assessedBy) + ', ' + new Date(rec.assessedAt).toLocaleDateString() + '</span>' : ' <span style="color:#6B7A90">reads as the Human-only baseline</span>') + '</dd>' +
        '</dl>';
      html += '<div class="sec"><h4>How is this activity done in ' + esc(o.org.name) + '?</h4>';
      st.path.forEach(function (qi) {
        var a = answers[qi];
        html += '<div class="q' + (a === null || a === undefined ? '' : ' done') + '"><span class="qn">Q' + (qi + 1) + '</span>' + QUESTIONS[qi].q +
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
          '<div id="ap-reason-wrap" style="display:none"><label for="ap-reason">Reason for overriding the proposal</label><textarea id="ap-reason"' + dis + '>' + esc(rec && rec.overrideReason || '') + '</textarea></div>' +
          '<label for="ap-evidence">Evidence</label><select id="ap-evidence"' + dis + '><option value="">Choose&hellip;</option>' +
          EVIDENCE.map(function (e) { return '<option value="' + e[0] + '"' + (rec && rec.evidenceType === e[0] ? ' selected' : '') + '>' + e[1] + '</option>'; }).join('') + '</select>' +
          '<label for="ap-source">Source (who or what it came from)</label><input type="text" id="ap-source" value="' + esc(rec && rec.source || '') + '"' + dis + '>' +
          '<label>Confidence</label><div class="radios">' +
          ['high', 'medium', 'low'].map(function (c) { return '<label><input type="radio" name="ap-conf" value="' + c + '"' + (rec && rec.confidence === c ? ' checked' : '') + dis + '> ' + c.charAt(0).toUpperCase() + c.slice(1) + '</label>'; }).join('') + '</div>' +
          '<label for="ap-note">Note</label><textarea id="ap-note"' + dis + '>' + esc(rec && rec.note || '') + '</textarea>' +
          '<div id="ap-beyond"></div>' +
          '<div class="actions">' + (o.canEdit ? '<button type="button" class="primary" id="ap-save">Save assessment</button>' : '<span class="msg">Sign in as Tim or GiGi to save.</span>') +
          (o.canEdit && rec && rec.current ? '<button type="button" id="ap-reset">Reset to baseline</button>' : '') +
          '<span class="msg" id="ap-msg"></span></div>';
      }
      if (rec && rec.history && rec.history.length) html += '<div class="hist">' + rec.history.length + ' earlier version' + (rec.history.length === 1 ? '' : 's') + ' kept.</div>';
      el.innerHTML = html;

      el.querySelector('.ap-close').onclick = close;
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
      var cur = el.querySelector('#ap-current'), p2 = st.proposed;
      function sync() {
        var v = cur.value;
        el.querySelector('#ap-reason-wrap').style.display = v !== p2 ? '' : 'none';
        el.querySelector('#ap-beyond').innerHTML = (w.ceiling && rank(v) > rank(w.ceiling))
          ? '<div class="warn"><strong>Beyond design intent.</strong> ' + esc(v) + ' is past this activity&rsquo;s ceiling of ' + esc(w.ceiling) + '. That is a finding to record, not an error: this organization relies on AI here more than the reference model permits.</div>' : '';
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
