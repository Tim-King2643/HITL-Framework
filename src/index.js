// HITL-Driven Architecture — Worker
//
// Serves the static site (./docs, via the ASSETS binding) and a small JSON
// API under /wip-api/* backing the WIP Review Board (docs/wip/review_board.html).
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

// itemId -> contentVersion, for every votable item in review_board.html's
// ITEMS array. Keep this in sync with that file: bump the version here (and
// there) whenever a WIP doc is materially revised, so stale votes are
// flagged rather than silently carried forward.
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
  return raw ? JSON.parse(raw) : { Tim: null, GiGi: null };
}

async function writeVotes(env, itemId, votes) {
  await env.WIP_VOTES.put(`votes:${itemId}`, JSON.stringify(votes));
}

async function handleApi(request, env, url) {
  const reviewer = reviewerFromRequest(request);

  if (url.pathname === '/wip-api/me') {
    return json({ reviewer });
  }

  if (url.pathname === '/wip-api/votes' && request.method === 'GET') {
    const itemIds = Object.keys(VOTABLE_ITEMS);
    const entries = await Promise.all(itemIds.map(async (itemId) => [itemId, await readVotes(env, itemId)]));
    const votes = {};
    entries.forEach(([itemId, v]) => { votes[itemId] = v; });
    return json({ reviewer, votes });
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
    return json({ ok: true, votes });
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
    return json({ ok: true, votes });
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
