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
  'shock-wave': '2026-09-08',
  'concept-to-principle': '2026-09-08',
  'rule-catalog': '2026-09-08'
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
  'rule-catalog': 'Framework Content Generation Rules — The Complete Catalog'
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
  return { tim, gigi, voteDecision, decision, publish };
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

async function handleApi(request, env, url) {
  const reviewer = reviewerFromRequest(request);

  if (url.pathname === '/wip-api/me') {
    return json({ reviewer });
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
    const existing = votes[reviewer];
    votes[reviewer] = {
      reviewer,
      choice,
      notes: (existing && existing.notes) || '',
      votedAt: new Date().toISOString(),
      votedOnVersion: VOTABLE_ITEMS[itemId]
    };
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/wip-api/')) {
      return handleApi(request, env, url);
    }
    return env.ASSETS.fetch(request);
  }
};
