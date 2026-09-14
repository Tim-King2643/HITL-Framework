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

function safeId(code) { return code.replace(/[^a-zA-Z0-9]/g, '_'); }

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
  return '<button class="notes-toggle' + (count ? ' has-notes' : '') + '" id="notes-toggle-' + id + '" onclick="toggleNotes(\'' + code + '\')">' +
    'Notes<span class="notes-count" id="notes-count-' + id + '">' + (count ? ' (' + count + ')' : '') + '</span></button>' +
    '<div class="notes-panel" id="notes-panel-' + id + '"></div>';
}

function renderNotesFromCache() {
  Object.keys(NOTES_CACHE).forEach(code => {
    const id = safeId(code);
    const countEl = document.getElementById('notes-count-' + id);
    const toggleEl = document.getElementById('notes-toggle-' + id);
    if (!countEl || !toggleEl) return;
    const n = NOTES_CACHE[code].length;
    countEl.textContent = n ? ' (' + n + ')' : '';
    toggleEl.classList.toggle('has-notes', n > 0);
  });
}

function reactBadge(reaction) {
  if (!reaction) return '';
  const label = reaction === 'agree' ? 'Agree' : reaction === 'question' ? 'Question' : 'Flag';
  return '<span class="react react-' + reaction + '">' + label + '</span>';
}

function panelBody(code) {
  const id = safeId(code);
  if (NOTES_API_DOWN) {
    return '<div style="font-size:11px;color:var(--lgray);font-style:italic;">' +
      'Reactions &amp; notes are backed by the live site — this panel is read-only in this preview. ' +
      'Once deployed at hitldrivenarchitecture.com, notes signed in as Tim or GiGi work here directly.</div>';
  }
  const entries = NOTES_CACHE[code] || [];
  let html = '<div class="notes-list">';
  if (entries.length === 0) {
    html += '<div style="font-size:11px;color:var(--lgray);font-style:italic;">No notes yet on ' + code + '.</div>';
  } else {
    entries.forEach(e => {
      html += '<div class="note-entry"><span class="who">' + e.reviewer + '</span>' + reactBadge(e.reaction) +
        '<span class="when">' + new Date(e.postedAt).toLocaleDateString() + '</span>' +
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
