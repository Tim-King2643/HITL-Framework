/* ── Reactions & Notes widget ──────────────────────────────────────────
   Talks to /sandbox-api/* (new endpoints, mirroring the WIP vote widget's
   identity pattern: Cloudflare Access sets Cf-Access-Authenticated-User-Email,
   the Worker maps it to "Tim" or "GiGi", never picked by the client).
   Degrades gracefully when the API isn't reachable — e.g. when this file is
   previewed somewhere other than the deployed site — by showing a plain
   notice instead of a broken form. */

let IDENTITY = undefined; // undefined = not checked yet, null = checked/anonymous or unreachable, "Tim"/"GiGi" = signed in
const NOTES_CACHE = {};
let NOTES_API_DOWN = false;
const SELECTED_REACTION = {};
const EDITING = {};       // code -> noteId currently being edited, or undefined
const EDIT_REACTION = {}; // noteId -> reaction selected while editing

function safeId(code) { return code.replace(/[^a-zA-Z0-9]/g, '_'); }

// Surfaces WR_DATA's own `note` field (Claude's classification rationale,
// baked into pcf7.html at patch time) as a seed entry in the Notes panel —
// added Sept 16, 2026 per Tim's request, so it's a starting point GiGi and
// Tim can react/add to, not something they have to hunt for as a hover
// tooltip. WR_DATA is defined later in pcf7.html's own inline <script>, but
// by the time this is called (from render(), after full page parse) it's
// already a live global — same-origin classic scripts share one scope.
function seedNoteFor(code) {
  const d = (typeof WR_DATA !== 'undefined') ? WR_DATA[code] : null;
  return (d && d.note) ? d.note : null;
}

async function initNotes() {
  try {
    const meRes = await fetch('/sandbox-api/me');
    if (!meRes.ok) throw new Error('me endpoint not available');
    const me = await meRes.json();
    IDENTITY = me.reviewer || null;
  } catch (e) {
    IDENTITY = null;
    NOTES_API_DOWN = true;
  }
  try {
    const allRes = await fetch('/sandbox-api/notes-all?scope=pcf7');
    if (!allRes.ok) throw new Error('notes-all not available');
    const all = await allRes.json();
    Object.assign(NOTES_CACHE, all.notes || {});
    NOTES_API_DOWN = false;
  } catch (e) {
    // leave cache empty — panels will show the "unreachable" notice on open
  }
  renderNotesFromCache();
}

function notesWidget(code) {
  const id = safeId(code);
  const count = (NOTES_CACHE[code] || []).length;
  const seed = seedNoteFor(code);
  const badgeText = count ? ' (' + count + ')' : (seed ? ' ·' : '');
  return '<button class="notes-toggle' + ((count || seed) ? ' has-notes' : '') + '" id="notes-toggle-' + id + '" onclick="toggleNotes(\'' + code + '\')">' +
    'Notes<span class="notes-count" id="notes-count-' + id + '">' + badgeText + '</span></button>' +
    '<div class="notes-panel" id="notes-panel-' + id + '"></div>';
}

function renderNotesFromCache() {
  Object.keys(NOTES_CACHE).forEach(code => {
    const id = safeId(code);
    const countEl = document.getElementById('notes-count-' + id);
    const toggleEl = document.getElementById('notes-toggle-' + id);
    if (!countEl || !toggleEl) return;
    const n = NOTES_CACHE[code].length;
    const seed = seedNoteFor(code);
    countEl.textContent = n ? ' (' + n + ')' : (seed ? ' ·' : '');
    toggleEl.classList.toggle('has-notes', n > 0 || !!seed);
  });
}

function reactBadge(reaction) {
  if (!reaction) return '';
  const label = reaction === 'agree' ? 'Agree' : reaction === 'question' ? 'Question' : 'Flag';
  return '<span class="react react-' + reaction + '">' + label + '</span>';
}

function seedEntryHtml(code) {
  const seed = seedNoteFor(code);
  if (!seed) return '';
  return '<div class="note-entry note-entry-seed">' +
    '<span class="who">Claude</span><span class="seed-tag">read-only — starting point, not a settled call</span>' +
    '<div class="txt">' + seed.replace(/</g, '&lt;') + '</div></div>';
}

// Inline edit form for one of the reviewer's own notes — reuses the same
// reaction-button/textarea shape as the post form below.
function editFormHtml(code, e) {
  const id = safeId(code);
  const sel = EDIT_REACTION[e.id];
  return '<div class="note-entry note-entry-editing">' +
    '<div class="note-form">' +
    '<div class="note-reacts">' +
    '<button type="button" class="note-react-btn' + (sel === 'agree' ? ' sel-agree' : '') + '" onclick="pickEditReaction(\'' + e.id + '\',\'agree\')">Agree</button>' +
    '<button type="button" class="note-react-btn' + (sel === 'question' ? ' sel-question' : '') + '" onclick="pickEditReaction(\'' + e.id + '\',\'question\')">Question</button>' +
    '<button type="button" class="note-react-btn' + (sel === 'flag' ? ' sel-flag' : '') + '" onclick="pickEditReaction(\'' + e.id + '\',\'flag\')">Flag</button>' +
    '</div>' +
    '<textarea id="edit-text-' + id + '-' + e.id + '">' + (e.text || '').replace(/</g, '&lt;') + '</textarea>' +
    '<div class="note-form-row">' +
    '<button class="note-cancel" onclick="cancelEditNote(\'' + code + '\')">Cancel</button>' +
    '<button class="note-submit" onclick="saveEditNote(\'' + code + '\',\'' + e.id + '\')">Save</button>' +
    '</div></div></div>';
}

function panelBody(code) {
  const id = safeId(code);
  const seedHtml = seedEntryHtml(code);
  if (NOTES_API_DOWN) {
    return seedHtml + '<div style="font-size:11px;color:var(--lgray);font-style:italic;">' +
      'Reactions &amp; notes are backed by the live site — this panel is read-only in this preview. ' +
      'Once deployed at hitldrivenarchitecture.com, notes signed in as Tim or GiGi work here directly.</div>';
  }
  const entries = NOTES_CACHE[code] || [];
  let html = seedHtml + '<div class="notes-list">';
  if (entries.length === 0) {
    html += '<div style="font-size:11px;color:var(--lgray);font-style:italic;">No Tim/GiGi notes yet on ' + code + '.</div>';
  } else {
    entries.forEach(e => {
      if (IDENTITY && e.reviewer === IDENTITY && EDITING[code] === e.id) {
        html += editFormHtml(code, e);
        return;
      }
      const mine = IDENTITY && e.reviewer === IDENTITY;
      const ownerControls = mine
        ? '<span class="note-owner-controls">' +
          '<button class="note-link-btn" onclick="startEditNote(\'' + code + '\',\'' + e.id + '\')">Edit</button>' +
          '<button class="note-link-btn note-link-danger" onclick="deleteNote(\'' + code + '\',\'' + e.id + '\')">Delete</button>' +
          '</span>'
        : '';
      html += '<div class="note-entry"><span class="who">' + e.reviewer + '</span>' + reactBadge(e.reaction) +
        '<span class="when">' + new Date(e.postedAt).toLocaleDateString() + (e.editedAt ? ' (edited)' : '') + '</span>' +
        ownerControls +
        (e.text ? '<div class="txt">' + e.text.replace(/</g, '&lt;') + '</div>' : '') + '</div>';
    });
  }
  html += '</div>';

  if (!IDENTITY) {
    html += '<div style="font-size:11px;color:var(--lgray);font-style:italic;">Sign in via the live site as Tim or GiGi to add a reaction or note.</div>';
    return html;
  }

  const sel = SELECTED_REACTION[code];
  html += '<div class="note-form">' +
    '<div class="note-reacts">' +
    '<button type="button" class="note-react-btn' + (sel === 'agree' ? ' sel-agree' : '') + '" onclick="pickReaction(\'' + code + '\',\'agree\')">Agree</button>' +
    '<button type="button" class="note-react-btn' + (sel === 'question' ? ' sel-question' : '') + '" onclick="pickReaction(\'' + code + '\',\'question\')">Question</button>' +
    '<button type="button" class="note-react-btn' + (sel === 'flag' ? ' sel-flag' : '') + '" onclick="pickReaction(\'' + code + '\',\'flag\')">Flag</button>' +
    '</div>' +
    '<textarea id="note-text-' + id + '" placeholder="Optional note…"></textarea>' +
    '<div class="note-form-row">' +
    '<span class="note-identity">Posting as <strong>' + IDENTITY + '</strong></span>' +
    '<button class="note-submit" onclick="submitNote(\'' + code + '\')">Post</button>' +
    '</div></div>';
  return html;
}

function toggleNotes(code) {
  const id = safeId(code);
  const panel = document.getElementById('notes-panel-' + id);
  if (!panel) return;
  const opening = !panel.classList.contains('open');
  document.querySelectorAll('.notes-panel.open').forEach(p => p.classList.remove('open'));
  if (opening) {
    panel.innerHTML = panelBody(code);
    panel.classList.add('open');
  }
}

function pickReaction(code, reaction) {
  SELECTED_REACTION[code] = SELECTED_REACTION[code] === reaction ? null : reaction;
  const id = safeId(code);
  const panel = document.getElementById('notes-panel-' + id);
  if (panel) panel.innerHTML = panelBody(code);
}

function startEditNote(code, noteId) {
  const entry = (NOTES_CACHE[code] || []).find(n => n.id === noteId);
  if (!entry) return;
  EDITING[code] = noteId;
  EDIT_REACTION[noteId] = entry.reaction || null;
  const panel = document.getElementById('notes-panel-' + safeId(code));
  if (panel) panel.innerHTML = panelBody(code);
}

function cancelEditNote(code) {
  delete EDITING[code];
  const panel = document.getElementById('notes-panel-' + safeId(code));
  if (panel) panel.innerHTML = panelBody(code);
}

function pickEditReaction(noteId, reaction) {
  EDIT_REACTION[noteId] = EDIT_REACTION[noteId] === reaction ? null : reaction;
  // Find which code this note belongs to so we know which panel to re-render.
  const code = Object.keys(NOTES_CACHE).find(c => (NOTES_CACHE[c] || []).some(n => n.id === noteId));
  if (!code) return;
  const panel = document.getElementById('notes-panel-' + safeId(code));
  if (panel) panel.innerHTML = panelBody(code);
}

async function saveEditNote(code, noteId) {
  const id = safeId(code);
  const textEl = document.getElementById('edit-text-' + id + '-' + noteId);
  const text = textEl ? textEl.value.trim() : '';
  const reaction = EDIT_REACTION[noteId] || null;
  if (!text && !reaction) { alert('A note needs text or a reaction.'); return; }
  try {
    const res = await fetch('/sandbox-api/note', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ itemId: code, noteId: noteId, reaction: reaction, text: text })
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Could not save the edit.');
      return;
    }
    NOTES_CACHE[code] = data.notes;
    delete EDITING[code];
    delete EDIT_REACTION[noteId];
    const panel = document.getElementById('notes-panel-' + id);
    if (panel) panel.innerHTML = panelBody(code);
    renderNotesFromCache();
  } catch (e) {
    alert('Could not reach the notes API — this only works on the deployed site.');
  }
}

async function deleteNote(code, noteId) {
  if (!confirm('Delete this note? This can\'t be undone.')) return;
  try {
    const res = await fetch('/sandbox-api/note', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ itemId: code, noteId: noteId })
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Could not delete note.');
      return;
    }
    NOTES_CACHE[code] = data.notes;
    const panel = document.getElementById('notes-panel-' + safeId(code));
    if (panel) panel.innerHTML = panelBody(code);
    renderNotesFromCache();
  } catch (e) {
    alert('Could not reach the notes API — this only works on the deployed site.');
  }
}

async function submitNote(code) {
  const id = safeId(code);
  const textEl = document.getElementById('note-text-' + id);
  const text = textEl ? textEl.value.trim() : '';
  const reaction = SELECTED_REACTION[code] || null;
  if (!text && !reaction) return;
  try {
    const res = await fetch('/sandbox-api/note', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ itemId: code, reaction: reaction, text: text })
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Could not post note.');
      return;
    }
    NOTES_CACHE[code] = data.notes;
    SELECTED_REACTION[code] = null;
    const panel = document.getElementById('notes-panel-' + id);
    if (panel) panel.innerHTML = panelBody(code);
    renderNotesFromCache();
  } catch (e) {
    alert('Could not reach the notes API — this only works on the deployed site.');
  }
}

initNotes();
