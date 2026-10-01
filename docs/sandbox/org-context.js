// Organization context for the domain sandboxes (GR-052 / GR-053).
//
// Every sandbox page works "as" one organization. The first entry is always
// the read-only Reference Model: the framework's own master data, which
// describes the work and no particular organization. Every other entry is an
// organization assessed against it, stored behind the Worker's /org-api/
// routes (see src/index.js). A new organization starts as a copy of the
// reference: every activity at the Human-only baseline, every ceiling the
// reference ceiling. Its values change only through the assessment panel
// (assess-panel.js), opened from an activity in the Working Relationship view.
//
// Launching the sandbox always opens the Reference Model (Tim, Sept 29).
// An organization opens only when the URL names it (?org=), which the
// selector keeps in step so a reload or a shared link stays on it. Nothing
// about the selection or an organization is stored in the browser.
//
// Usage:
//   OrgContext.mountSelector(el, { includeReference, onChange })
//   OrgContext.selectedId()                -> 'reference' or an org id
//   OrgContext.getAssessment(orgId)        -> { org, records, overrides, reviewer }
//   OrgContext.saveAssessment(record)      -> { record }
//   OrgContext.resetAssessment(orgId, code)
//   OrgContext.saveOverride(record)        -> { override }  (ceiling override, GR-054)
//   OrgContext.removeOverride(orgId, code)
//   OrgContext.reviewOverride(orgId, code, confirmedBy, note)  (after the owner's audit)
(function () {
  var REFERENCE = {
    id: 'reference',
    name: 'Reference Model',
    subtitle: 'Human-AI Partnership Framework · Reference Model',
    reference: true
  };
  var STORE_KEY = 'hitl.sandbox.org';
  var state = { orgs: [], reviewer: null, loaded: false, apiDown: false };

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  // Clear the old remembered choice left by earlier versions of this file.
  try { localStorage.removeItem(STORE_KEY); } catch (e) { /* private window: fine */ }

  function selectedId() {
    var p = new URLSearchParams(location.search).get('org');
    return p || REFERENCE.id;
  }
  function setSelected(id) {
    var u = new URL(location.href);
    if (id === REFERENCE.id) u.searchParams.delete('org'); else u.searchParams.set('org', id);
    history.replaceState(null, '', u.toString());
  }

  function api(method, path, body) {
    var opt = { method: method, headers: { 'content-type': 'application/json' }, credentials: 'same-origin' };
    if (body) opt.body = JSON.stringify(body);
    return fetch(path, opt).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) throw new Error(j.error || ('HTTP ' + r.status));
        return j;
      });
    });
  }

  function loadOrgs() {
    return api('GET', '/org-api/orgs').then(function (j) {
      state.orgs = j.orgs || []; state.reviewer = j.reviewer || null; state.loaded = true; state.apiDown = false;
      return state.orgs;
    }).catch(function () { state.loaded = true; state.apiDown = true; state.orgs = []; return []; });
  }
  function findOrg(id) {
    if (id === REFERENCE.id) return REFERENCE;
    for (var i = 0; i < state.orgs.length; i++) if (state.orgs[i].id === id) return state.orgs[i];
    return null;
  }

  function injectCss() {
    if (document.getElementById('org-context-css')) return;
    var st = document.createElement('style');
    st.id = 'org-context-css';
    st.textContent =
      '.orgsel{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0 0;}' +
      '.orgsel label{font-family:"DM Mono",Consolas,monospace;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:#6B7A90;}' +
      '.orgsel select{font:inherit;font-size:13px;padding:6px 10px;border:1px solid #C6D8EE;border-radius:6px;background:#fff;color:#0D2D4F;min-width:240px;max-width:100%;}' +
      '.orgsel .orgsel-sub{font-size:11.5px;color:#6B7A90;}' +
      '.org-chip{display:inline-block;font-family:"DM Mono",Consolas,monospace;font-size:9.5px;font-weight:700;letter-spacing:.05em;border-radius:3px;padding:1px 6px;vertical-align:middle;}' +
      '.org-chip-test{background:#FEF3C7;color:#7A5A1E;border:1px solid #F0C67A;}' +
      '.org-chip-ref{background:#EEF3FA;color:#1B4F8A;border:1px solid #C6D8EE;}' +
      '.org-modal-back{position:fixed;inset:0;background:rgba(13,27,42,.45);z-index:2000;display:flex;align-items:center;justify-content:center;padding:16px;}' +
      '.org-modal{background:#fff;border-radius:10px;max-width:440px;width:100%;padding:20px 22px;box-shadow:0 10px 40px rgba(0,0,0,.25);}' +
      '.org-modal h3{margin:0 0 4px;font-size:17px;color:#0D2D4F;}' +
      '.org-modal p{margin:0 0 14px;font-size:12.5px;color:#555;line-height:1.5;}' +
      '.org-modal label{display:block;font-size:12px;font-weight:600;color:#0D2D4F;margin:10px 0 4px;}' +
      '.org-modal input[type=text]{width:100%;box-sizing:border-box;font:inherit;font-size:13px;padding:7px 9px;border:1px solid #C6D8EE;border-radius:6px;}' +
      '.org-modal .chk{display:flex;align-items:center;gap:8px;font-weight:400;}' +
      '.org-modal .row{display:flex;justify-content:flex-end;gap:8px;margin-top:16px;}' +
      '.org-modal button{font:inherit;font-size:13px;font-weight:600;padding:7px 14px;border-radius:6px;border:1px solid #C6D8EE;background:#fff;color:#0D2D4F;cursor:pointer;}' +
      '.org-modal button.primary{background:#1B4F8A;border-color:#1B4F8A;color:#fff;}' +
      '.org-modal .err{color:#991B1B;font-size:12px;margin-top:8px;min-height:1em;}';
    document.head.appendChild(st);
  }

  function orgLabel(o) {
    if (o.reference) return o.name + ' (default)';
    // Name only (Tim, Oct 1, 2026): counts are on the page's own badges, and
    // test data is marked by the banner's TEST DATA chip.
    return o.name;
  }

  function openNewOrg(onCreated) {
    injectCss();
    var back = document.createElement('div');
    back.className = 'org-modal-back';
    back.innerHTML =
      '<div class="org-modal" role="dialog" aria-modal="true" aria-labelledby="org-new-title">' +
      '<h3 id="org-new-title">New organization</h3>' +
      '<p>It starts as a copy of the Reference Model: every activity at the Human-only baseline and every ceiling the reference ceiling. Its values change only through the assessment template.</p>' +
      '<label for="org-new-name">Name</label><input type="text" id="org-new-name" maxlength="200">' +
      '<label for="org-new-industry">Industry</label><input type="text" id="org-new-industry" maxlength="200">' +
      '<label for="org-new-size">Size</label><input type="text" id="org-new-size" maxlength="200" placeholder="e.g. 5,000 employees">' +
      '<label class="chk"><input type="checkbox" id="org-new-test"> Test data &mdash; not a real organization</label>' +
      '<div class="err" id="org-new-err"></div>' +
      '<div class="row"><button type="button" id="org-new-cancel">Cancel</button><button type="button" class="primary" id="org-new-save">Create</button></div>' +
      '</div>';
    document.body.appendChild(back);
    var nameEl = back.querySelector('#org-new-name');
    nameEl.focus();
    function close() { back.remove(); }
    back.querySelector('#org-new-cancel').onclick = function () { close(); onCreated(null); };
    back.querySelector('#org-new-save').onclick = function () {
      var body = {
        name: nameEl.value,
        industry: back.querySelector('#org-new-industry').value,
        size: back.querySelector('#org-new-size').value,
        test: back.querySelector('#org-new-test').checked
      };
      api('POST', '/org-api/orgs', body).then(function (j) {
        state.orgs.push(j.org);
        state.orgs.sort(function (a, b) { return a.name.localeCompare(b.name); });
        close(); onCreated(j.org);
      }).catch(function (e) { back.querySelector('#org-new-err').textContent = e.message; });
    };
  }

  function mountSelector(el, opts) {
    opts = opts || {};
    injectCss();
    var includeRef = opts.includeReference !== false;
    function draw() {
      var cur = selectedId();
      var list = (includeRef ? [REFERENCE] : []).concat(state.orgs);
      if (!findOrg(cur) || (!includeRef && cur === REFERENCE.id)) cur = list.length ? list[0].id : '';
      var html = '<div class="orgsel"><label for="orgsel-select">Organization</label><select id="orgsel-select">';
      list.forEach(function (o) { html += '<option value="' + esc(o.id) + '"' + (o.id === cur ? ' selected' : '') + '>' + esc(orgLabel(o)) + '</option>'; });
      if (!list.length) html += '<option value="" selected>No organizations yet</option>';
      if (state.reviewer && !state.apiDown) html += '<option value="__new__">New organization&hellip;</option>';
      html += '</select>';
      if (state.apiDown) html += '<span class="orgsel-sub">Organizations are unavailable right now; showing the Reference Model.</span>';
      html += '</div>';
      el.innerHTML = html;
      var sel = el.querySelector('select');
      sel.onchange = function () {
        if (sel.value === '__new__') {
          openNewOrg(function (org) {
            if (org) { setSelected(org.id); draw(); fire(org.id); } else { draw(); }
          });
          return;
        }
        setSelected(sel.value); fire(sel.value);
      };
      return cur;
    }
    function fire(id) { if (opts.onChange) opts.onChange(findOrg(id)); }
    return loadOrgs().then(function () { var cur = draw(); if (cur) setSelected(cur); fire(cur); return findOrg(cur); });
  }

  window.OrgContext = {
    REFERENCE: REFERENCE,
    selectedId: selectedId,
    findOrg: findOrg,
    mountSelector: mountSelector,
    reviewer: function () { return state.reviewer; },
    refresh: loadOrgs,
    getAssessment: function (orgId) { return api('GET', '/org-api/assessment?org=' + encodeURIComponent(orgId)); },
    saveAssessment: function (rec) { return api('POST', '/org-api/assessment', rec); },
    resetAssessment: function (orgId, code) { return api('DELETE', '/org-api/assessment', { org: orgId, code: code }); },
    saveOverride: function (rec) { return api('POST', '/org-api/ceiling-override', rec); },
    removeOverride: function (orgId, code) { return api('DELETE', '/org-api/ceiling-override', { org: orgId, code: code }); },
    reviewOverride: function (orgId, code, confirmedBy, note) { return api('POST', '/org-api/ceiling-override/review', { org: orgId, code: code, confirmedBy: confirmedBy, note: note || '' }); },
    chip: function (o) {
      if (!o) return '';
      if (o.reference) return '<span class="org-chip org-chip-ref">REFERENCE</span>';
      return o.test ? '<span class="org-chip org-chip-test">TEST DATA</span>' : '';
    }
  };
})();
