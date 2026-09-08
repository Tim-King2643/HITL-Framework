// WIP vote widget — shared by every votable item page and the WIP hub.
//
// Two independent jobs, both driven by one shared fetch of /wip-api/me and
// /wip-api/votes:
//
//   1. Full voting UI: mounts into <div data-wip-vote-mount data-item="ID">
//      on a votable item's own page — status pill, both reviewers' picks,
//      Approve/Needs Revision/Park/Deny buttons, and an optional note.
//
//   2. Hub status sync: updates <span data-wip-status="ID">...</span> on
//      docs/wip/index.html to show the live decision instead of a
//      hand-typed "Ready for review" label.
//
// Voting now happens on the item's own page — there is no separate review
// board page anymore, so both jobs share one source of truth (this file +
// the Worker's VOTABLE_ITEMS map) instead of three copies drifting apart.

(function () {
  var POLL_MS = 20000;

  var DECISION_META = {
    pending: { label: 'Pending Review', fg: '#4E5D78', bg: '#ECEFF5' },
    approve: { label: 'Approved', fg: '#1B7A4C', bg: '#E4F5EC' },
    revise: { label: 'Needs Revision', fg: '#9A6B12', bg: '#FDF1D9' },
    park: { label: 'Parked', fg: '#55607A', bg: '#EDEFF5' },
    deny: { label: 'Denied', fg: '#A23B3B', bg: '#FBEAEA' },
    discuss: { label: 'Needs Discussion', fg: '#9A6B12', bg: '#FDF1D9' }
  };
  var CHOICE_LABEL = { approve: 'Approve', revise: 'Needs Revision', park: 'Park', deny: 'Deny' };
  var CHOICE_TAG = { approve: 'Approved', revise: 'Needs Revision', park: 'Parked', deny: 'Denied' };

  var identity = null;
  var latestItems = {};
  var pollTimer = null;

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) { for (var k in attrs) { e.setAttribute(k, attrs[k]); } }
    if (html !== undefined) { e.innerHTML = html; }
    return e;
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : s;
    return d.innerHTML;
  }

  function injectStyles() {
    if (document.getElementById('wip-vote-widget-styles')) return;
    var style = el('style', { id: 'wip-vote-widget-styles' });
    style.textContent = [
      '.wip-vote-card{background:var(--surface,#fff);border:1px solid var(--border,#DDE3EE);border-radius:10px;',
      'padding:18px 22px;margin:0 0 28px;box-shadow:0 1px 2px rgba(13,45,79,.06),0 1px 1px rgba(13,45,79,.04);font-family:"Segoe UI",sans-serif;}',
      '.wip-vote-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px;}',
      '.wip-vote-eyebrow{font-family:Consolas,monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--lgray,#888);}',
      '.wip-vote-pill{font-size:11px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;padding:5px 12px;border-radius:20px;white-space:nowrap;}',
      '.wip-vote-status-row{display:flex;gap:20px;flex-wrap:wrap;font-size:12.5px;color:var(--gray,#444);margin-bottom:12px;}',
      '.wip-vote-status-row b{color:var(--dark,#0D1B2A);}',
      '.wip-vote-status-row .wip-stale{color:var(--lgray,#888);font-style:italic;}',
      '.wip-vote-controls{padding-top:12px;border-top:1px dashed var(--border,#DDE3EE);}',
      '.wip-vote-prompt{font-size:12px;color:var(--lgray,#888);margin-bottom:8px;}',
      '.wip-vote-buttons{display:flex;gap:8px;flex-wrap:wrap;}',
      '.wip-vote-btn{font-family:"Segoe UI",sans-serif;font-size:12.5px;font-weight:600;padding:7px 14px;',
      'border-radius:6px;cursor:pointer;border:1px solid var(--border,#DDE3EE);background:#fff;color:var(--gray,#444);}',
      '.wip-vote-btn:hover{border-color:var(--navy,#1B4F8A);color:var(--navy,#1B4F8A);}',
      '.wip-vote-btn.is-selected{border-width:1px;font-weight:700;}',
      '.wip-vote-note-row{margin-top:10px;display:flex;gap:8px;align-items:flex-start;}',
      '.wip-vote-note-row textarea{flex:1;font-family:"Segoe UI",sans-serif;font-size:12.5px;color:var(--dark,#0D1B2A);',
      'background:var(--bg,#F4F6FB);border:1px solid var(--border,#DDE3EE);border-radius:6px;padding:8px 10px;resize:vertical;min-height:34px;}',
      '.wip-vote-note-row button{font-family:"Segoe UI",sans-serif;font-size:12px;font-weight:600;padding:8px 12px;',
      'border-radius:6px;border:1px solid var(--navy,#1B4F8A);background:var(--navy,#1B4F8A);color:#fff;cursor:pointer;white-space:nowrap;}',
      '.wip-vote-note-row button:hover{background:var(--navy-d,#0D2D4F);}',
      '.wip-vote-saved{font-size:11px;color:#1B7A4C;margin-top:6px;}',
      '.wip-vote-unrecognized{font-size:12px;color:var(--lgray,#888);font-style:italic;padding-top:12px;border-top:1px dashed var(--border,#DDE3EE);}',
      '.wip-status-badge{display:inline-block;font-size:9px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;',
      'border-radius:3px;padding:3px 7px;white-space:nowrap;}'
    ].join('');
    document.head.appendChild(style);
  }

  function api(path, opts) {
    return fetch(path, Object.assign({ credentials: 'same-origin' }, opts || {})).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    });
  }

  function statusLine(reviewerName, raw) {
    if (!raw) return '<span><b>' + reviewerName + ':</b> not yet reviewed</span>';
    var tag = CHOICE_TAG[raw.choice] || raw.choice;
    var when = '';
    try { when = new Date(raw.votedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); } catch (e) {}
    var staleNote = raw.stale ? ' <span class="wip-stale">(item updated since — please take another look)</span>' : '';
    return '<span><b>' + reviewerName + ':</b> ' + tag + (when ? ' · ' + when : '') + staleNote + '</span>';
  }

  function renderVoteMount(mount, itemId, itemData) {
    var meta = DECISION_META[itemData.decision] || DECISION_META.pending;
    var myVote = identity === 'Tim' ? itemData.tim : identity === 'GiGi' ? itemData.gigi : null;

    var html = '';
    html += '<div class="wip-vote-head">';
    html += '<span class="wip-vote-eyebrow">WIP Review</span>';
    html += '<span class="wip-vote-pill" style="color:' + meta.fg + ';background:' + meta.bg + '">' + meta.label + '</span>';
    html += '</div>';
    html += '<div class="wip-vote-status-row">' + statusLine('Tim', itemData.tim) + statusLine('GiGi', itemData.gigi) + '</div>';

    if (identity) {
      html += '<div class="wip-vote-controls">';
      html += '<div class="wip-vote-prompt">Your review, ' + identity + ':</div>';
      html += '<div class="wip-vote-buttons">';
      ['approve', 'revise', 'park', 'deny'].forEach(function (c) {
        var sel = myVote && myVote.choice === c ? ' is-selected' : '';
        var color = myVote && myVote.choice === c ? DECISION_META[c].fg : '';
        var bg = myVote && myVote.choice === c ? DECISION_META[c].bg : '';
        var styleAttr = sel ? ' style="color:' + color + ';background:' + bg + ';border-color:' + color + '"' : '';
        html += '<button class="wip-vote-btn' + sel + '" data-choice="' + c + '"' + styleAttr + '>' + CHOICE_LABEL[c] + '</button>';
      });
      html += '</div>';
      html += '<div class="wip-vote-note-row">';
      html += '<textarea placeholder="Optional note…">' + (myVote && myVote.notes ? escapeHtml(myVote.notes) : '') + '</textarea>';
      html += '<button data-save-note>Save note</button>';
      html += '</div>';
      html += '<div class="wip-vote-saved" hidden>Saved.</div>';
      html += '</div>';
    } else {
      html += '<div class="wip-vote-unrecognized">Signed in, but not a recognized reviewer — no vote available.</div>';
    }

    mount.innerHTML = html;

    mount.querySelectorAll('[data-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        castVote(itemId, btn.getAttribute('data-choice'));
      });
    });
    var saveBtn = mount.querySelector('[data-save-note]');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var ta = mount.querySelector('textarea');
        saveNote(itemId, ta ? ta.value : '');
      });
    }
  }

  function renderHubBadge(span, itemData) {
    var meta = DECISION_META[itemData.decision] || DECISION_META.pending;
    span.textContent = meta.label;
    span.className = 'wip-status-badge';
    span.style.color = meta.fg;
    span.style.background = meta.bg;
  }

  function renderAll() {
    document.querySelectorAll('[data-wip-vote-mount]').forEach(function (mount) {
      var itemId = mount.getAttribute('data-item');
      var itemData = latestItems[itemId];
      if (itemData) renderVoteMount(mount, itemId, itemData);
    });
    document.querySelectorAll('[data-wip-status]').forEach(function (span) {
      var itemId = span.getAttribute('data-wip-status');
      var itemData = latestItems[itemId];
      if (itemData) renderHubBadge(span, itemData);
    });
  }

  function loadAll() {
    return Promise.all([api('/wip-api/me'), api('/wip-api/votes')]).then(function (results) {
      identity = results[0].reviewer || null;
      latestItems = results[1].items || {};
      renderAll();
    }).catch(function (e) {
      console.error('wip-vote-widget: load failed', e);
    });
  }

  function castVote(itemId, choice) {
    api('/wip-api/vote', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ itemId: itemId, choice: choice })
    }).then(function (res) {
      latestItems[itemId] = res.item;
      renderAll();
    }).catch(function (e) {
      console.error('wip-vote-widget: vote failed', e);
    });
  }

  function saveNote(itemId, notes) {
    api('/wip-api/note', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ itemId: itemId, notes: notes })
    }).then(function (res) {
      latestItems[itemId] = res.item;
      renderAll();
      var mount = document.querySelector('[data-wip-vote-mount][data-item="' + itemId + '"]');
      var marker = mount && mount.querySelector('.wip-vote-saved');
      if (marker) {
        marker.hidden = false;
        setTimeout(function () { marker.hidden = true; }, 1800);
      }
    }).catch(function (e) {
      console.error('wip-vote-widget: note save failed', e);
    });
  }

  function init() {
    var hasWork = document.querySelector('[data-wip-vote-mount]') || document.querySelector('[data-wip-status]');
    if (!hasWork) return;
    injectStyles();
    loadAll().finally(function () {
      if (pollTimer) clearInterval(pollTimer);
      pollTimer = setInterval(loadAll, POLL_MS);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
