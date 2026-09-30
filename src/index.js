// HITL-Driven Architecture — Worker
//
// Serves the static site (./docs, via the ASSETS binding) and a small JSON
// API under /wip-api/* backing the in-page WIP voting widget
// (docs/wip/wip-vote-widget.js), embedded directly on each votable WIP
// item's own page, plus the docs/wip/index.html hub (status-sync only —
// there is no separate review-board page anymore).
//
// Identity is never picked by the user — it comes from Cloudflare Access,
// which already authenticated them before the request reaches this Worker.
// The Cf-Access-Authenticated-User-Email header is set by Access itself and
// cannot be spoofed by a client bypassing Access, so no extra verification
// of that header is done here.

const REVIEWERS = {
  'timothy.king@hitldrivenarchitecture.com': 'Tim',
  'mmg0802@yahoo.com': 'GiGi'
};

// itemId -> contentVersion, for every votable WIP item. This is the SINGLE
// source of truth for versions — item pages and the hub no longer carry
// their own copy. Bump the version here whenever a WIP doc is materially
// revised, so stale votes are flagged rather than silently carried forward.
// No HTML file needs to change for a version bump.
const VOTABLE_ITEMS = {
  'chro-narratives': '2026-09-08',
  'hrbp-narratives': '2026-09-08',
  'recruiter-narratives': '2026-09-08',
  'hpct-badge': '2026-09-08',
  'pattern-color': '2026-09-08',
  'shock-wave': '2026-09-15',
  'concept-to-principle': '2026-09-15',
  'rule-catalog': '2026-09-08',
  'wrpm': '2026-09-29',
  'wr-display-migration': '2026-09-22',
  'wr-progression-methodology': '2026-09-29',
  'wr-palette': '2026-09-21',
  'content-promotion-policy': '2026-09-29',
  'work-product-spec': '2026-09-29',
  'work-product-catalog': '2026-09-25',
  'reference-model-spec': '2026-09-28'
};

// Friendly titles for notification emails — falls back to the raw itemId if
// a new votable item is added here without a title yet.
const ITEM_TITLES = {
  'chro-narratives': 'CHRO — Pattern Transition Narratives',
  'hrbp-narratives': 'HRBP Manager — Pattern Transition Narratives',
  'recruiter-narratives': 'Recruiter — Pattern Transition Narratives',
  'hpct-badge': 'H% Provenance Badge — Naming & Placement Standard',
  'pattern-color': 'Work Pattern Color Standard',
  'shock-wave': 'The Shock Wave Effect',
  'concept-to-principle': 'From Concept to Principle',
  'rule-catalog': 'Framework Content Generation Rules — The Complete Catalog',
  'wrpm': 'Working-Relationship Progression — A Design Methodology',
  'wr-display-migration': 'Working Relationship as the Primary Display Lens',
  'wr-progression-methodology': 'Working-Relationship Progression — Plain-Language Spec',
  'wr-palette': 'WR Category Palette Standard',
  'content-promotion-policy': 'Content Promotion Policy — Sandbox / WIP / Production',
  'work-product-spec': 'Work Product in the Role Container — Design Spec',
  'work-product-catalog': 'Work-Product Catalog — Sandbox 7.0',
  'reference-model-spec': 'Reference Model and Organization Assessment Layer — Design Spec'
};

// Only Tim can request/complete a publish — GiGi reviews and votes, but
// promoting an approved item into the live framework stays Tim's call.
const ADMIN_REVIEWERS = new Set(['Tim']);

const CHOICES = new Set(['approve', 'revise', 'park', 'deny']);

function json(data, init) {
  return new Response(JSON.stringify(data), Object.assign({
    headers: { 'content-type': 'application/json; charset=utf-8' }
  }, init));
}

function reviewerFromRequest(request) {
  const email = request.headers.get('Cf-Access-Authenticated-User-Email');
  if (!email) return null;
  return REVIEWERS[email.trim().toLowerCase()] || null;
}

async function readVotes(env, itemId) {
  const raw = await env.WIP_VOTES.get(`votes:${itemId}`);
  return raw ? JSON.parse(raw) : { Tim: null, GiGi: null, publish: null };
}

async function writeVotes(env, itemId, votes) {
  await env.WIP_VOTES.put(`votes:${itemId}`, JSON.stringify(votes));
}

// Attach a `stale` flag (vote was cast against an older content version)
// without discarding the vote itself — the UI can still show what was
// voted, just marked stale.
function annotate(raw, currentVersion) {
  if (!raw) return null;
  const stale = !!(raw.votedOnVersion && raw.votedOnVersion !== currentVersion);
  return Object.assign({}, raw, { stale });
}

// A stale vote does not count toward the decision — treated as
// not-yet-reviewed until re-cast against the current version. Computed
// server-side so every page (item pages + hub) shares one implementation
// instead of each re-deriving it client-side.
function decisionFrom(timAnn, gigiAnn) {
  const tim = timAnn && !timAnn.stale ? timAnn : null;
  const gigi = gigiAnn && !gigiAnn.stale ? gigiAnn : null;
  if (!tim || !gigi) return 'pending';
  if (tim.choice === gigi.choice) return tim.choice;
  return 'discuss';
}

// `voteDecision` is the raw reconciliation of Tim's + GiGi's votes, unchanged
// by publishing. `decision` is what the UI should actually show: once an
// approved item has a `publish` record attached, it overrides 'approve' with
// 'pending-publish' or 'published' so every page (item pages + hub) reflects
// the publish workflow without re-deriving this logic client-side.
function itemPayload(itemId, votes) {
  const version = VOTABLE_ITEMS[itemId];
  const tim = annotate(votes.Tim, version);
  const gigi = annotate(votes.GiGi, version);
  const voteDecision = decisionFrom(tim, gigi);
  const publish = votes.publish || null;
  let decision = voteDecision;
  if (voteDecision === 'approve' && publish) {
    decision = publish.status === 'published' ? 'published' : 'pending-publish';
  }
  const round = votes.round == null ? null : votes.round;
  const docStatus = docStatusFrom(tim, gigi, voteDecision, round, publish);
  return { tim, gigi, voteDecision, decision, publish, round, docStatus, history: votes.history || [] };
}

// ── Document status ladder ───────────────────────────────────────────────
// Added Sept 23, 2026, per Tim's request to track a document's own review
// maturity (Proposed -> Under Review -> Concept Agreed -> Text Approved ->
// Adopted -> Published) separately from the Section 5 Development Stage
// ladder (Concept -> Prototype -> ... -> Commercialize), which lives in the
// catalog instead and is a future, separate piece of work. This one reuses
// the EXISTING Approve/Needs Revision/Park/Deny reconciliation rather than
// adding a second voting mechanism: a `round` field on the same vote record
// splits it into two sequential approval passes.
//
//   Round 1 ("Concept Agreement" — do we agree on the direction) resolving
//   to 'approve' advances the item to Concept Agreed, logs that outcome to
//   `history`, and resets both reviewers' picks so round 2 starts fresh.
//
//   Round 2 ("Final Text" — do we agree on the exact wording) resolving to
//   'approve' logs Text Approved to `history`. Text Approved and Adopted are
//   treated as the same moment (both reviewers signing off on final text IS
//   adopting it) rather than a third vote round — docStatus reports
//   'adopted' at that point, with the stepper showing both nodes passed.
//   Published stays exactly what it already was: Tim-only, via the existing
//   publish/mark-published endpoints, no vote involved.
//
// Items that already had votes before this shipped have no `round` field in
// their stored KV record. For those, an already-resolved 'approve' is
// treated as fully Adopted (the old system's single approval always meant
// both concept + text at once) rather than retroactively splitting it into
// two rounds it never went through — see the `round == null` branch below.
// The first fresh vote cast on such an item enters the two-round system
// going forward (see the round-advance block in the /wip-api/vote handler).
const DOC_LADDER_STEPS = ['proposed', 'under-review', 'concept-agreed', 'text-approved', 'adopted', 'published'];

function docStatusFrom(timAnn, gigiAnn, voteDecision, round, publish) {
  if (publish && publish.status === 'published') return 'published';
  const tim = timAnn && !timAnn.stale ? timAnn : null;
  const gigi = gigiAnn && !gigiAnn.stale ? gigiAnn : null;

  if (round == null) {
    // Legacy item, never entered the two-round model.
    if (voteDecision === 'approve') return 'adopted';
    return (!tim && !gigi) ? 'proposed' : 'under-review';
  }
  if (round >= 2) {
    return voteDecision === 'approve' ? 'adopted' : 'concept-agreed';
  }
  // round === 1
  if (voteDecision === 'approve') return 'concept-agreed'; // transitional; the server advances the round synchronously, so this is rarely observed by a client
  return (!tim && !gigi) ? 'proposed' : 'under-review';
}

// Best-effort notification — a failed email should never block the publish
// request itself, so this is always wrapped in try/catch by its caller.
async function sendPublishEmail(env, itemId, requestedBy) {
  const title = ITEM_TITLES[itemId] || itemId;
  const siteUrl = 'https://hitldrivenarchitecture.com/wip/index.html';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      from: env.RESEND_FROM || 'HITL Framework <notifications@hitldrivenarchitecture.com>',
      to: ['timothy.king@hitldrivenarchitecture.com'],
      subject: `WIP Catalog: "${title}" is Pending Publish`,
      text: `"${title}" (${itemId}) is Pending Publish.\n\nRequested by ${requestedBy}. Both reviewers have approved — open a chat with Claude to walk through publishing it, then mark it Published when done.\n\nReview it here: ${siteUrl}`
    })
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }
}

// ── Sandbox Reactions & Notes (docs/sandbox/*.html) ─────────────────────
// Added Sept 16, 2026. The SANDBOX_NOTES KV namespace and its wrangler.jsonc
// binding were already wired up from the original Sept 14 sandbox build,
// but these route handlers were never added — that's exactly why the
// sandbox's Notes panel showed read-only: sandbox-notes-widget.js's fetch
// to /sandbox-api/me got a 404 (falling through to env.ASSETS.fetch, which
// correctly has no static file there) and set its own NOTES_API_DOWN flag.
// This closes that gap.
//
// Storage key: `notes:<scope>:<itemId>` -> JSON array of
// { id, reviewer, reaction, text, postedAt, editedAt }. `scope` is a
// per-domain-sandbox slug ("pcf7" today, for docs/sandbox/pcf7.html); itemId
// is a PCF code (an L3 or L4, e.g. "7.1.1.1" or leaf-L3 "7.4.4").
// sandbox-notes-widget.js's POST body doesn't send a scope yet since only
// one domain sandbox exists — defaults to 'pcf7' below. If a second domain
// sandbox (e.g. PCF 8.0) is built, the widget needs to start sending its own
// scope and the itemId pattern below needs to accept that domain's leading
// digit too.
//
// Full CRUD added Sept 16, 2026 (Tim's request): each reviewer can update or
// delete their OWN notes only — not the other reviewer's — enforced by
// comparing the authenticated reviewer against the stored note's `reviewer`
// field, never a client-supplied one. Claude's seed rationale (WR_DATA.note,
// baked into pcf7.html at patch time) is deliberately NOT part of this KV
// store at all, so it has no id/edit/delete path here — it stays read-only
// by construction, same as Tim asked.

const SANDBOX_REACTIONS = new Set(['agree', 'question', 'flag']);
const SANDBOX_ITEM_ID_RE = /^7(\.\d+){1,3}$/;
const SANDBOX_MAX_TEXT_LEN = 2000;

function sandboxKey(scope, itemId) {
  return `notes:${scope}:${itemId}`;
}

async function readSandboxNotes(env, scope, itemId) {
  const raw = await env.SANDBOX_NOTES.get(sandboxKey(scope, itemId));
  return raw ? JSON.parse(raw) : [];
}

async function writeSandboxNotes(env, scope, itemId, notes) {
  await env.SANDBOX_NOTES.put(sandboxKey(scope, itemId), JSON.stringify(notes));
}

async function handleSandboxApi(request, env, url) {
  const reviewer = reviewerFromRequest(request);

  if (url.pathname === '/sandbox-api/me') {
    return json({ reviewer });
  }

  if (url.pathname === '/sandbox-api/notes-all' && request.method === 'GET') {
    const scope = url.searchParams.get('scope') || 'pcf7';
    const prefix = `notes:${scope}:`;
    const notes = {};
    let cursor;
    do {
      const page = await env.SANDBOX_NOTES.list({ prefix, cursor });
      for (const key of page.keys) {
        const itemId = key.name.slice(prefix.length);
        const raw = await env.SANDBOX_NOTES.get(key.name);
        if (raw) notes[itemId] = JSON.parse(raw);
      }
      cursor = page.cursor;
    } while (cursor);
    return json({ reviewer, notes });
  }

  if (url.pathname === '/sandbox-api/note' && request.method === 'POST') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const itemId = body && body.itemId;
    const reaction = (body && body.reaction) || null;
    const text = typeof (body && body.text) === 'string' ? body.text.trim().slice(0, SANDBOX_MAX_TEXT_LEN) : '';
    const scope = (body && body.scope) || 'pcf7';

    if (typeof itemId !== 'string' || !SANDBOX_ITEM_ID_RE.test(itemId)) {
      return json({ error: 'unknown item' }, { status: 400 });
    }
    if (reaction && !SANDBOX_REACTIONS.has(reaction)) {
      return json({ error: 'unknown reaction' }, { status: 400 });
    }
    if (!text && !reaction) {
      return json({ error: 'a note needs text or a reaction' }, { status: 400 });
    }

    const notes = await readSandboxNotes(env, scope, itemId);
    notes.push({ id: crypto.randomUUID(), reviewer, reaction, text, postedAt: Date.now() });
    await writeSandboxNotes(env, scope, itemId, notes);
    return json({ ok: true, notes });
  }

  if (url.pathname === '/sandbox-api/note' && request.method === 'PATCH') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const itemId = body && body.itemId;
    const noteId = body && body.noteId;
    const reaction = (body && body.reaction) || null;
    const text = typeof (body && body.text) === 'string' ? body.text.trim().slice(0, SANDBOX_MAX_TEXT_LEN) : '';
    const scope = (body && body.scope) || 'pcf7';

    if (typeof itemId !== 'string' || !SANDBOX_ITEM_ID_RE.test(itemId)) {
      return json({ error: 'unknown item' }, { status: 400 });
    }
    if (typeof noteId !== 'string') return json({ error: 'missing noteId' }, { status: 400 });
    if (reaction && !SANDBOX_REACTIONS.has(reaction)) {
      return json({ error: 'unknown reaction' }, { status: 400 });
    }
    if (!text && !reaction) {
      return json({ error: 'a note needs text or a reaction' }, { status: 400 });
    }

    const notes = await readSandboxNotes(env, scope, itemId);
    const idx = notes.findIndex(n => n.id === noteId);
    if (idx === -1) return json({ error: 'note not found' }, { status: 404 });
    if (notes[idx].reviewer !== reviewer) {
      return json({ error: 'you can only edit your own notes' }, { status: 403 });
    }
    notes[idx] = Object.assign({}, notes[idx], { reaction, text, editedAt: Date.now() });
    await writeSandboxNotes(env, scope, itemId, notes);
    return json({ ok: true, notes });
  }

  if (url.pathname === '/sandbox-api/note' && request.method === 'DELETE') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const itemId = body && body.itemId;
    const noteId = body && body.noteId;
    const scope = (body && body.scope) || 'pcf7';

    if (typeof itemId !== 'string' || !SANDBOX_ITEM_ID_RE.test(itemId)) {
      return json({ error: 'unknown item' }, { status: 400 });
    }
    if (typeof noteId !== 'string') return json({ error: 'missing noteId' }, { status: 400 });

    const notes = await readSandboxNotes(env, scope, itemId);
    const idx = notes.findIndex(n => n.id === noteId);
    if (idx === -1) return json({ error: 'note not found' }, { status: 404 });
    if (notes[idx].reviewer !== reviewer) {
      return json({ error: 'you can only delete your own notes' }, { status: 403 });
    }
    notes.splice(idx, 1);
    await writeSandboxNotes(env, scope, itemId, notes);
    return json({ ok: true, notes });
  }

  return json({ error: 'not found' }, { status: 404 });
}

const DECISION_KEY_RE = /^GR-\d{3}:[a-z0-9-]{1,40}$/;
const DECISION_CHOICES = new Set(['approve', 'not-approve', 'defer']);
async function listDecisionKeys(env) {
  const out = []; let cursor;
  do {
    const page = await env.WIP_VOTES.list({ prefix: 'decision:', cursor });
    page.keys.forEach(k => out.push(k.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return out;
}
// outcome: 'approve' | 'not-approve' | 'defer' once both agree; 'split' when
// they differ; 'awaiting-tim' / 'awaiting-gigi' with one choice in; 'awaiting'.
function decisionPayload(rec) {
  const tim = rec.Tim || null, gigi = rec.GiGi || null;
  let outcome = 'awaiting';
  if (tim && gigi) outcome = tim.choice === gigi.choice ? tim.choice : 'split';
  else if (tim) outcome = 'awaiting-gigi';
  else if (gigi) outcome = 'awaiting-tim';
  return { tim, gigi, outcome, history: rec.history || [] };
}

async function handleApi(request, env, url) {
  const reviewer = reviewerFromRequest(request);

  if (url.pathname === '/wip-api/me') {
    return json({ reviewer });
  }

  // ── Requirement decisions (Sept 28, 2026) ────────────────────────────
  // Each requirement in docs/wip/requirements-data.js can carry one pending
  // decision (Approve / Not approve / Defer) with a key "<GR-id>:<decision-id>".
  // Tim and GiGi each record a choice; the outcome is the shared choice once
  // both agree. Stored in WIP_VOTES under "decision:<key>", with every change
  // kept in history. Claude folds resolved decisions into the register file.
  if (url.pathname === '/wip-api/decisions' && request.method === 'GET') {
    const keys = await listDecisionKeys(env);
    const decisions = {};
    for (const k of keys) {
      const raw = await env.WIP_VOTES.get(k);
      if (raw) decisions[k.slice('decision:'.length)] = decisionPayload(JSON.parse(raw));
    }
    return json({ reviewer, decisions });
  }

  if (url.pathname === '/wip-api/decision' && request.method === 'POST') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });
    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const key = body && body.key, choice = body && body.choice;
    if (typeof key !== 'string' || !DECISION_KEY_RE.test(key)) return json({ error: 'unknown decision' }, { status: 400 });
    if (!DECISION_CHOICES.has(choice)) return json({ error: 'unknown choice' }, { status: 400 });
    const note = typeof body.note === 'string' ? body.note.trim().slice(0, 2000) : '';
    const kvKey = 'decision:' + key;
    const raw = await env.WIP_VOTES.get(kvKey);
    const rec = raw ? JSON.parse(raw) : { Tim: null, GiGi: null, history: [] };
    const entry = { choice, note, at: new Date().toISOString() };
    rec[reviewer] = entry;
    rec.history = [Object.assign({ reviewer }, entry)].concat(rec.history || []).slice(0, 50);
    await env.WIP_VOTES.put(kvKey, JSON.stringify(rec));
    return json({ ok: true, key, decision: decisionPayload(rec) });
  }

  if (url.pathname === '/wip-api/votes' && request.method === 'GET') {
    const itemIds = Object.keys(VOTABLE_ITEMS);
    const entries = await Promise.all(itemIds.map(async (itemId) => [itemId, await readVotes(env, itemId)]));
    const items = {};
    entries.forEach(([itemId, raw]) => { items[itemId] = itemPayload(itemId, raw); });
    return json({ reviewer, items });
  }

  if (url.pathname === '/wip-api/vote' && request.method === 'POST') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const itemId = body && body.itemId;
    const choice = body && body.choice;
    if (!VOTABLE_ITEMS[itemId]) return json({ error: 'unknown item' }, { status: 400 });
    if (!CHOICES.has(choice)) return json({ error: 'unknown choice' }, { status: 400 });

    const votes = await readVotes(env, itemId);
    const version = VOTABLE_ITEMS[itemId];

    // Snapshot the reconciliation as it stood BEFORE this vote is applied,
    // so a legacy item that was already fully approved (no `round` field
    // yet) doesn't get retroactively pulled into round-1 bookkeeping the
    // moment someone touches it again — see docStatusFrom's `round == null`
    // branch for why that matters.
    const priorDecision = decisionFrom(annotate(votes.Tim, version), annotate(votes.GiGi, version));

    const existing = votes[reviewer];
    votes[reviewer] = {
      reviewer,
      choice,
      notes: (existing && existing.notes) || '',
      votedAt: new Date().toISOString(),
      votedOnVersion: version
    };

    const alreadyPublished = votes.publish && votes.publish.status === 'published';
    const legacyAlreadyApproved = votes.round == null && priorDecision === 'approve';
    if (!alreadyPublished && !legacyAlreadyApproved) {
      if (votes.round == null) votes.round = 1;
      const curDecision = decisionFrom(annotate(votes.Tim, version), annotate(votes.GiGi, version));
      votes.history = votes.history || [];
      if (votes.round === 1 && curDecision === 'approve') {
        votes.history.push({
          round: 1, label: 'concept-agreed', resolvedAt: new Date().toISOString(),
          tim: votes.Tim, gigi: votes.GiGi
        });
        votes.Tim = null;
        votes.GiGi = null;
        votes.round = 2;
      } else if (votes.round === 2 && curDecision === 'approve') {
        const hasTextApproved = votes.history.some(function (h) { return h.label === 'text-approved'; });
        if (!hasTextApproved) {
          votes.history.push({
            round: 2, label: 'text-approved', resolvedAt: new Date().toISOString(),
            tim: votes.Tim, gigi: votes.GiGi
          });
        }
      }
    }

    await writeVotes(env, itemId, votes);
    return json({ ok: true, item: itemPayload(itemId, votes) });
  }

  if (url.pathname === '/wip-api/note' && request.method === 'POST') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const itemId = body && body.itemId;
    const notes = typeof (body && body.notes) === 'string' ? body.notes : '';
    if (!VOTABLE_ITEMS[itemId]) return json({ error: 'unknown item' }, { status: 400 });

    const votes = await readVotes(env, itemId);
    const existing = votes[reviewer];
    if (!existing || !existing.choice) {
      return json({ error: 'cast a vote before saving a note' }, { status: 400 });
    }
    votes[reviewer] = Object.assign({}, existing, { notes });
    await writeVotes(env, itemId, votes);
    return json({ ok: true, item: itemPayload(itemId, votes) });
  }

  if (url.pathname === '/wip-api/publish' && request.method === 'POST') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });
    if (!ADMIN_REVIEWERS.has(reviewer)) return json({ error: 'only an admin reviewer can request publish' }, { status: 403 });

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const itemId = body && body.itemId;
    if (!VOTABLE_ITEMS[itemId]) return json({ error: 'unknown item' }, { status: 400 });

    const votes = await readVotes(env, itemId);
    const payload = itemPayload(itemId, votes);
    if (payload.voteDecision !== 'approve') {
      return json({ error: 'item is not approved yet' }, { status: 400 });
    }

    // Idempotent — a second click on an already-requested item just returns
    // the current state rather than re-sending the email.
    if (!votes.publish) {
      votes.publish = {
        status: 'requested',
        requestedAt: new Date().toISOString(),
        requestedBy: reviewer
      };
      await writeVotes(env, itemId, votes);
      try {
        await sendPublishEmail(env, itemId, reviewer);
      } catch (e) {
        console.error('publish email failed', e);
      }
    }
    return json({ ok: true, item: itemPayload(itemId, votes) });
  }

  if (url.pathname === '/wip-api/mark-published' && request.method === 'POST') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });
    if (!ADMIN_REVIEWERS.has(reviewer)) return json({ error: 'only an admin reviewer can mark an item published' }, { status: 403 });

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const itemId = body && body.itemId;
    if (!VOTABLE_ITEMS[itemId]) return json({ error: 'unknown item' }, { status: 400 });

    const votes = await readVotes(env, itemId);
    if (!votes.publish || votes.publish.status !== 'requested') {
      return json({ error: 'item is not pending publish' }, { status: 400 });
    }
    votes.publish = Object.assign({}, votes.publish, {
      status: 'published',
      publishedAt: new Date().toISOString()
    });
    await writeVotes(env, itemId, votes);
    return json({ ok: true, item: itemPayload(itemId, votes) });
  }

  return json({ error: 'not found' }, { status: 404 });
}


// ── Organizations & Assessments (docs/sandbox/*.html) ───────────────────
// Added Sept 26, 2026 for GR-052 / GR-053 (docs/wip/reference_model_
// assessment_layer_spec.html). The reference model is not stored here: it
// is the sandbox's own master data, and every page lists it first as the
// read-only "Reference Model" entry. This store holds the organizations
// assessed against it, and their activity-by-activity assessments.
//
// Keys (same SANDBOX_NOTES namespace, separate prefixes):
//   org:<orgId>             -> { id, name, industry, size, test, createdBy, createdAt }
//   assess:<orgId>:<code>   -> { current, proposed, answers, overrideReason,
//                                evidenceType, source, confidence, note,
//                                assessedBy, assessedAt, history: [...] }
//   ceil:<orgId>:<code>     -> { level, factor, evidence, approverRole,
//                                cons, refCeiling, refVersion, refSnapshot,
//                                approvedBy, approvedAt, lastReviewedAt,
//                                lastReviewedRole, reviews: [...], history: [...] }
// An activity with no assess: key is unassessed and reads as the reference
// baseline (Human-only). Resetting an activity keeps its history.
//
// A ceiling override (GR-054, Sept 27, 2026) is a governance decision, kept
// apart from the assessment: it raises one activity's Progression Ceiling for
// one organization. It is allowed only where Consequence of Error is Low or
// Moderate, must name one of the activity's own ceiling factors that no
// longer holds, and carries its evidence, the Accountable role's approval
// and is signed off by the Accountable role alone (Tim, Sept 28: no second
// approver). There is no fixed review date: the process owner's own audits
// re-confirm an override, recorded through /org-api/ceiling-override/review,
// and the page shows how long ago that was. The Worker takes the activity's Consequence of Error,
// ceiling and ceiling factors from the reference lookup
// (docs/sandbox/reference-wr.json, generated from WR_DATA by
// scripts/build-reference-wr.mjs and checked in CI), never from the page, and
// records the lookup's version on the override.
//
// Only recognized reviewers (Tim, GiGi) can create organizations or save
// assessments; the Access login gates who can read. Per-organization access
// comes later, with real clients.

const ORG_ID_RE = /^[a-z0-9][a-z0-9-]{1,40}$/;
const ASSESS_CODE_RE = /^7(\.\d+){2,3}$/;
const WR_STEPS = ['Human-only', 'Judgment', 'Oversight', 'Augmentation', 'Agent-delegation', 'Automation'];
const EVIDENCE_TYPES = new Set(['observed', 'system', 'audit', 'interview', 'document']);
const CONFIDENCE = new Set(['high', 'medium', 'low']);
const ORG_MAX = 200, NOTE_MAX = 2000, HISTORY_MAX = 25;
const OVERRIDE_CONS = new Set(['Low', 'Moderate']);
const CEILING_FACTOR_KEYS = new Set(['technical', 'governance', 'legal', 'relational', 'floor', 'accountability']);
const REFERENCE_PATH = '/sandbox/reference-wr.json';

// The reference lookup, read from the site's own static assets (deployed with
// the same push as the page it is generated from) and kept for the life of
// this Worker instance.
let referenceCache = null;
async function loadReference(env, request) {
  if (referenceCache) return referenceCache;
  const res = await env.ASSETS.fetch(new Request(new URL(REFERENCE_PATH, request.url)));
  if (!res.ok) throw new Error('reference lookup unavailable');
  const ref = await res.json();
  if (!ref || !ref.activities || !ref.version) throw new Error('reference lookup unreadable');
  referenceCache = ref;
  return ref;
}

function clip(v, n) { return typeof v === 'string' ? v.trim().slice(0, n) : ''; }
function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 36) || 'org';
}
async function listKeys(env, prefix) {
  const out = []; let cursor;
  do {
    const page = await env.SANDBOX_NOTES.list({ prefix, cursor });
    page.keys.forEach(k => out.push(k.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return out;
}
async function readOrg(env, id) {
  const raw = await env.SANDBOX_NOTES.get('org:' + id);
  return raw ? JSON.parse(raw) : null;
}

async function handleOrgApi(request, env, url) {
  const reviewer = reviewerFromRequest(request);

  if (url.pathname === '/org-api/orgs' && request.method === 'GET') {
    const keys = await listKeys(env, 'org:');
    const orgs = [];
    for (const k of keys) {
      const raw = await env.SANDBOX_NOTES.get(k);
      if (!raw) continue;
      const org = JSON.parse(raw);
      const aKeys = await listKeys(env, 'assess:' + org.id + ':');
      let assessed = 0;
      for (const ak of aKeys) {
        const rec = JSON.parse(await env.SANDBOX_NOTES.get(ak) || 'null');
        if (rec && rec.current) assessed++;
      }
      org.assessedCount = assessed;
      orgs.push(org);
    }
    orgs.sort((a, b) => a.name.localeCompare(b.name));
    return json({ reviewer, orgs });
  }

  if (url.pathname === '/org-api/orgs' && request.method === 'POST') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });
    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const name = clip(body && body.name, ORG_MAX);
    if (!name) return json({ error: 'an organization needs a name' }, { status: 400 });
    if (/^reference model$/i.test(name)) return json({ error: 'that name is reserved for the reference model' }, { status: 400 });
    let id = slugify(name), n = 2;
    const base = id;
    while (await readOrg(env, id)) id = base + '-' + (n++);
    const org = {
      id, name,
      industry: clip(body.industry, ORG_MAX),
      size: clip(body.size, ORG_MAX),
      test: body.test === true,
      createdBy: reviewer,
      createdAt: Date.now()
    };
    await env.SANDBOX_NOTES.put('org:' + id, JSON.stringify(org));
    org.assessedCount = 0;
    return json({ ok: true, org });
  }

  if (url.pathname === '/org-api/assessment' && request.method === 'GET') {
    const orgId = url.searchParams.get('org') || '';
    if (!ORG_ID_RE.test(orgId)) return json({ error: 'unknown organization' }, { status: 400 });
    const org = await readOrg(env, orgId);
    if (!org) return json({ error: 'unknown organization' }, { status: 404 });
    const prefix = 'assess:' + orgId + ':';
    const records = {};
    for (const k of await listKeys(env, prefix)) {
      const raw = await env.SANDBOX_NOTES.get(k);
      if (raw) records[k.slice(prefix.length)] = JSON.parse(raw);
    }
    const oPrefix = 'ceil:' + orgId + ':';
    const overrides = {};
    for (const k of await listKeys(env, oPrefix)) {
      const raw = await env.SANDBOX_NOTES.get(k);
      if (raw) overrides[k.slice(oPrefix.length)] = JSON.parse(raw);
    }
    return json({ reviewer, org, records, overrides });
  }

  if (url.pathname === '/org-api/assessment' && (request.method === 'POST' || request.method === 'DELETE')) {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });
    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const orgId = body && body.org, code = body && body.code;
    if (typeof orgId !== 'string' || !ORG_ID_RE.test(orgId) || !(await readOrg(env, orgId))) {
      return json({ error: 'unknown organization' }, { status: 400 });
    }
    if (typeof code !== 'string' || !ASSESS_CODE_RE.test(code)) return json({ error: 'unknown activity' }, { status: 400 });
    const key = 'assess:' + orgId + ':' + code;
    const prevRaw = await env.SANDBOX_NOTES.get(key);
    const prev = prevRaw ? JSON.parse(prevRaw) : null;
    const history = prev ? (prev.history || []) : [];
    if (prev && prev.current) {
      const snap = Object.assign({}, prev); delete snap.history;
      history.unshift(snap);
    }
    if (request.method === 'DELETE') {
      const rec = { current: null, resetBy: reviewer, resetAt: Date.now(), history: history.slice(0, HISTORY_MAX) };
      await env.SANDBOX_NOTES.put(key, JSON.stringify(rec));
      return json({ ok: true, record: rec });
    }
    const current = body.current;
    if (!WR_STEPS.includes(current)) return json({ error: 'unknown working relationship' }, { status: 400 });
    const proposed = WR_STEPS.includes(body.proposed) ? body.proposed : null;
    const overrideReason = clip(body.overrideReason, NOTE_MAX);
    if (proposed && proposed !== current && !overrideReason) {
      return json({ error: 'overriding the proposed working relationship needs a reason' }, { status: 400 });
    }
    const evidenceType = EVIDENCE_TYPES.has(body.evidenceType) ? body.evidenceType : null;
    const confidence = CONFIDENCE.has(body.confidence) ? body.confidence : null;
    if (!evidenceType || !confidence) return json({ error: 'an assessment needs an evidence type and a confidence level' }, { status: 400 });
    const answers = Array.isArray(body.answers) ? body.answers.slice(0, 5).map(a => a === true || a === false ? a : null) : [];
    // Stamp the reference the assessment was made against (Sept 30, 2026), so
    // a later change to this activity's ceiling, Consequence of Error or
    // ceiling factors can be flagged on the assessment, as overrides already
    // are. If the reference can't be read, the assessment still saves,
    // unstamped, rather than blocking the assessor.
    let refStamp = {};
    try {
      const ref = await loadReference(env, request);
      const refAct = ref.activities[code];
      if (refAct) refStamp = { refVersion: ref.version, refSnapshot: { ceiling: refAct.ceiling, cons: refAct.cons, ceilingFactors: refAct.ceilingFactors || [] } };
    } catch (e) { /* saved without a reference stamp */ }
    const rec = {
      current, proposed, answers, overrideReason, evidenceType, confidence, ...refStamp,
      source: clip(body.source, ORG_MAX),
      sourceRole: clip(body.sourceRole, ORG_MAX),
      reference: clip(body.reference, ORG_MAX),
      note: clip(body.note, NOTE_MAX),
      assessedBy: reviewer,
      assessedAt: Date.now(),
      history: history.slice(0, HISTORY_MAX)
    };
    await env.SANDBOX_NOTES.put(key, JSON.stringify(rec));
    return json({ ok: true, record: rec });
  }

  // Re-confirm an override after the process owner's audit: stamps the date
  // and who confirmed it, and re-checks it against the current reference.
  if (url.pathname === '/org-api/ceiling-override/review' && request.method === 'POST') {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });
    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const orgId = body && body.org, code = body && body.code;
    if (typeof orgId !== 'string' || !ORG_ID_RE.test(orgId) || !(await readOrg(env, orgId))) {
      return json({ error: 'unknown organization' }, { status: 400 });
    }
    if (typeof code !== 'string' || !ASSESS_CODE_RE.test(code)) return json({ error: 'unknown activity' }, { status: 400 });
    const key = 'ceil:' + orgId + ':' + code;
    const raw = await env.SANDBOX_NOTES.get(key);
    const rec = raw ? JSON.parse(raw) : null;
    if (!rec || !rec.level) return json({ error: 'no override to review' }, { status: 404 });
    // The Accountable role that confirmed it — roles, not people (Sept 29).
    const confirmedRole = clip(body.confirmedRole || body.confirmedBy, ORG_MAX);
    if (!confirmedRole) return json({ error: 'name the Accountable role that confirmed the override' }, { status: 400 });
    let ref;
    try { ref = await loadReference(env, request); } catch (e) { return json({ error: e.message }, { status: 503 }); }
    const refAct = ref.activities[code];
    const stillValid = refAct && OVERRIDE_CONS.has(refAct.cons) &&
      WR_STEPS.indexOf(rec.level) > WR_STEPS.indexOf(refAct.ceiling) &&
      (refAct.ceilingFactors || []).includes(rec.factor);
    if (!stillValid) {
      return json({ error: 'the reference has changed and this override no longer meets the rule; change or remove it' }, { status: 409 });
    }
    const now = Date.now();
    rec.reviews = [{ at: now, role: confirmedRole, recordedBy: reviewer, note: clip(body.note, NOTE_MAX) }].concat(rec.reviews || []).slice(0, HISTORY_MAX);
    rec.lastReviewedAt = now;
    rec.lastReviewedRole = confirmedRole;
    delete rec.lastReviewedBy;
    rec.cons = refAct.cons; rec.refCeiling = refAct.ceiling; rec.refVersion = ref.version;
    rec.refSnapshot = { ceiling: refAct.ceiling, cons: refAct.cons, ceilingFactors: refAct.ceilingFactors || [] };
    await env.SANDBOX_NOTES.put(key, JSON.stringify(rec));
    return json({ ok: true, override: rec });
  }

  if (url.pathname === '/org-api/ceiling-override' && (request.method === 'POST' || request.method === 'DELETE')) {
    if (!reviewer) return json({ error: 'not signed in as a recognized reviewer' }, { status: 401 });
    let body;
    try { body = await request.json(); } catch (e) { return json({ error: 'invalid JSON body' }, { status: 400 }); }
    const orgId = body && body.org, code = body && body.code;
    if (typeof orgId !== 'string' || !ORG_ID_RE.test(orgId) || !(await readOrg(env, orgId))) {
      return json({ error: 'unknown organization' }, { status: 400 });
    }
    if (typeof code !== 'string' || !ASSESS_CODE_RE.test(code)) return json({ error: 'unknown activity' }, { status: 400 });
    const key = 'ceil:' + orgId + ':' + code;
    const prevRaw = await env.SANDBOX_NOTES.get(key);
    const prev = prevRaw ? JSON.parse(prevRaw) : null;
    const history = prev ? (prev.history || []) : [];
    if (prev && prev.level) {
      const snap = Object.assign({}, prev); delete snap.history;
      history.unshift(snap);
    }
    if (request.method === 'DELETE') {
      const rec = { level: null, removedBy: reviewer, removedAt: Date.now(), history: history.slice(0, HISTORY_MAX) };
      await env.SANDBOX_NOTES.put(key, JSON.stringify(rec));
      return json({ ok: true, override: rec });
    }
    let ref;
    try { ref = await loadReference(env, request); } catch (e) { return json({ error: e.message }, { status: 503 }); }
    const refAct = ref.activities[code];
    if (!refAct) return json({ error: 'activity not in the reference model' }, { status: 400 });
    const cons = refAct.cons, refCeiling = refAct.ceiling, level = body.level;
    if (!OVERRIDE_CONS.has(cons)) {
      return json({ error: 'the Progression Ceiling cannot be overridden where Consequence of Error is above Moderate' }, { status: 400 });
    }
    if (!WR_STEPS.includes(refCeiling) || !WR_STEPS.includes(level) || WR_STEPS.indexOf(level) <= WR_STEPS.indexOf(refCeiling)) {
      return json({ error: 'an override must raise the ceiling above the reference ceiling' }, { status: 400 });
    }
    if (!CEILING_FACTOR_KEYS.has(body.factor) || !(refAct.ceilingFactors || []).includes(body.factor)) {
      return json({ error: 'name one of this activity\'s ceiling factors that no longer holds' }, { status: 400 });
    }
    const evidence = clip(body.evidence, NOTE_MAX);
    const approverRole = clip(body.approverRole, ORG_MAX);
    if (!evidence) return json({ error: 'an override needs evidence that the ceiling factor no longer holds' }, { status: 400 });
    if (!approverRole) return json({ error: 'an override needs the Accountable role that approved it' }, { status: 400 });
    const now = Date.now();
    const rec = {
      level, factor: body.factor, evidence, approverRole, cons, refCeiling,
      refVersion: ref.version,
      refSnapshot: { ceiling: refAct.ceiling, cons: refAct.cons, ceilingFactors: refAct.ceilingFactors || [] },
      approvedBy: reviewer, approvedAt: now,
      lastReviewedAt: now, lastReviewedRole: approverRole,
      reviews: [],
      history: history.slice(0, HISTORY_MAX)
    };
    await env.SANDBOX_NOTES.put(key, JSON.stringify(rec));
    return json({ ok: true, override: rec });
  }

  return json({ error: 'not found' }, { status: 404 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/wip-api/')) {
      return handleApi(request, env, url);
    }
    if (url.pathname.startsWith('/sandbox-api/')) {
      return handleSandboxApi(request, env, url);
    }
    if (url.pathname.startsWith('/org-api/')) {
      return handleOrgApi(request, env, url);
    }
    return env.ASSETS.fetch(request);
  }
};
