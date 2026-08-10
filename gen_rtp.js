const fs = require('fs');
const path = require('path');

// ── HITL Role Transition Profile generator ──────────────────────────────
// Usage: node gen_rtp.js <domain>.json "<Role Name>" <output-slug> [--abbrev=map.json]
//
// SCOPE (see HITL_RTP_Html_Spec.md for the full spec this implements):
// This generator produces the MECHANICAL, fully data-driven ~60% of an RTP
// page: masthead, Snapshot stats, Role Pattern Mix cards, the full L3/L4
// detail table, and the legend — all computed directly from real RACI data,
// nothing invented. It does NOT and cannot generate the researched ~40%:
// the role's narrative "shape of transition" framing, Skills & Competencies,
// Role Progression Framework, and the Evolution Timeline + McKinsey
// connection under "How the Role Has Evolved" — those need a real external
// source per role (one substantive, fully-fetched article minimum) and
// honest synthesis, the same standard every role in this framework has been
// held to. The output file has clearly marked TODO blocks for those
// sections — never ship it with the placeholders still in place.

const DOMAIN_JSON = process.argv[2];
const ROLE_NAME = process.argv[3];
const OUT_SLUG = process.argv[4];
const cat = JSON.parse(fs.readFileSync(DOMAIN_JSON, 'utf8'));

// Known abbreviations seen in real RACI R-fields for this domain so far
// (PCF 7.0). A NEW domain will have its own abbreviations — inspect the
// domain JSON's raw R/A strings first (see spec §2) and extend this map,
// don't assume it's empty.
const ABBREV = {
  'Dir. of L&D': 'Director of L&D',
  'Comp & Benefits Mgr': 'Compensation & Benefits Manager',
  'HRBP Mgr': 'HRBP Manager',
};

const PATTERN_META = {
  Decision:    { fill: '#EEF3FA', text: '#1B4F8A', bar: '#7B9FD1', tagline: 'Judgment & Authority \u2014 gates that stay human by design', m1: 92, m3: 80 },
  Knowledge:   { fill: '#F3F0FE', text: '#534AB7', bar: '#A79AE0', tagline: 'Synthesis & Interpretation \u2014 judgment-driven work', m1: 85, m3: 65 },
  Document:    { fill: '#E0F2FE', text: '#0369A1', bar: '#5EB8E0', tagline: 'Content Generation \u2014 drafting and communication', m1: 72, m3: 40 },
  Transaction: { fill: '#DCFCE7', text: '#166534', bar: '#6FC48C', tagline: 'Rules-Based Processing \u2014 suited to automation', m1: 60, m3: 35 },
  Exception:   { fill: '#FEE2E2', text: '#991B1B', bar: '#E88A8A', tagline: 'Non-Standard Resolution \u2014 human-resolved by nature', m1: 95, m3: 82 },
};

function normalizeRole(raw) {
  const s = (raw || '').trim();
  const m = s.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  const base = m ? m[1].trim() : s;
  return { base: ABBREV[base] || base, note: m ? m[2].trim() : null };
}

// ── Gather every L3 this role holds Responsible OR Accountable on ───────
// (the R/A-touch rule — broader than the print docs' Accountable-only
// Process Accountability table; see spec §3 for why RTP uses this rule.)
let l3s = [];
let groupsTouched = new Set();
cat.groups.forEach(g => {
  g.l3.forEach(l3 => {
    if (!l3.raci) return;
    const a = normalizeRole(l3.raci.A);
    const rParts = (l3.raci.R || '').split('\u00b7').map(normalizeRole);
    const touches = a.base === ROLE_NAME || rParts.some(r => r.base === ROLE_NAME);
    if (touches) { l3s.push({ ...l3, groupCode: g.code, groupName: g.name }); groupsTouched.add(g.code); }
  });
});
if (l3s.length === 0) {
  console.error(`WARNING: zero L3 R/A-touches found for "${ROLE_NAME}". If this is expected (a zero-touch role), build the page by hand per spec §7 — this generator assumes real touches exist.`);
}

let l4Count = 0;
const patternCounts = { Decision: 0, Knowledge: 0, Document: 0, Transaction: 0, Exception: 0 };
l3s.forEach(l3 => {
  if (l3.l4 && l3.l4.length) { l4Count += l3.l4.length; l3.l4.forEach(a => patternCounts[a.pattern]++); }
  else { l4Count += 1; patternCounts[l3.pattern]++; }
});

function weightedM1M3(counts) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (!total) return [0, 0];
  const wm1 = Math.round(Object.entries(counts).reduce((s, [p, c]) => s + c * PATTERN_META[p].m1, 0) / total);
  const wm3 = Math.round(Object.entries(counts).reduce((s, [p, c]) => s + c * PATTERN_META[p].m3, 0) / total);
  return [wm1, wm3];
}
const [aggM1, aggM3] = weightedM1M3(patternCounts);
const dominant = Object.entries(patternCounts).sort((a, b) => b[1] - a[1])[0];
const dominantPct = l4Count ? Math.round(dominant[1] / l4Count * 100) : 0;

// ── Role Pattern Mix caption note — handles BOTH directions correctly ───
// (a real bug in the first version of this logic: only handled the case
// where the dominant pattern's own M3 sits above the blend. For any
// Transaction- or Document-dominant role, the dominant pattern's M3 is
// BELOW the blend, and the old one-directional sentence template produced
// a grammatically broken result. Fixed here — never regress this.)
function captionNote() {
  const domName = dominant[0];
  const domM3 = PATTERN_META[domName].m3;
  if (domM3 > aggM3) {
    return `${domName} dominates by volume (${dominantPct}% of activities) but its own M3 (${domM3}%) sits above the blend because other, lower-M3 patterns still in the mix pull the role-wide average down.`;
  } else if (domM3 < aggM3) {
    return `${domName} dominates by volume (${dominantPct}% of activities), but its own M3 (${domM3}%) sits below the blend \u2014 higher-M3 patterns still in the mix pull the role-wide average up from ${domName}\u2019s own number.`;
  }
  return `${domName} dominates by volume (${dominantPct}% of activities); its own M3 (${domM3}%) happens to roughly match the role-wide blended average.`;
}

function capmapCardsHtml() {
  const order = ['Decision', 'Knowledge', 'Document', 'Transaction', 'Exception'];
  const cards = order.map(name => {
    const meta = PATTERN_META[name];
    const count = patternCounts[name];
    const body = count === 0
      ? `<div class="cm-count">0 <span>L4 activities</span></div><div class="cm-empty-note">No activities of this pattern touched by this role</div>`
      : `<div class="cm-count">${count} <span>L4 activities</span></div><div class="cm-mvals">M1 ${meta.m1}%  \u2192  M3 ${meta.m3}%</div>`;
    return `<div class="capmap-card" style="background:${meta.fill};color:${meta.text}"><div class="cm-name">${name}</div><div class="cm-tagline">${meta.tagline}</div>${body}</div>`;
  }).join('');
  return `<div class="capmap-grid">${cards}</div>`;
}

// ── Full Detail table — L3 ALWAYS a bar (solid if single-pattern, segmented
// if mixed), L4 ALWAYS a badge. This was the other real bug found this
// session: an earlier draft used badges for single-pattern LEAF L3 rows,
// copied from an old reference page that itself violated this rule. ─────
function countL4Patterns(l4list) {
  const c = {}; (l4list || []).forEach(a => { c[a.pattern] = (c[a.pattern] || 0) + 1; }); return c;
}
function patternBarL3(l3) {
  if (l3.mixed && l3.l4 && l3.l4.length) {
    const counts = countL4Patterns(l3.l4);
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const spans = Object.entries(counts).map(([p, c]) =>
      `<span style="width:${(c / total * 100).toFixed(1)}%;background:${PATTERN_META[p].bar}" title="${p} (${c})"></span>`).join('');
    return `<span class="mixbar">${spans}</span>`;
  }
  return `<span class="mixbar"><span style="width:100%;background:${PATTERN_META[l3.pattern].bar}" title="${l3.pattern}"></span></span>`;
}
function patternBadgeL4(pattern) {
  const meta = PATTERN_META[pattern];
  return `<span class="pat-badge" style="color:${meta.text};background:${meta.fill}">${pattern}</span>`;
}
function statRow(mv) {
  return `<td class="stat">${mv[0]}%</td><td class="stat">${mv[1]}%</td><td class="stat m3">${mv[2]}%</td><td class="stat">${mv[3]}%</td><td class="stat">${mv[4]}%</td><td class="stat delta">-${mv[0]-mv[2]}%</td>`;
}
let tableRows = '';
l3s.forEach(l3 => {
  tableRows += `<tr class="l3-row"><td class="pcf">${l3.code}</td><td class="act">${l3.name}</td><td class="patcell">${patternBarL3(l3)}</td>${statRow(l3.mv)}</tr>`;
  if (l3.l4 && l3.l4.length) {
    l3.l4.forEach(a => {
      tableRows += `<tr class="l4-row"><td class="pcf">${a.code}</td><td class="act">${a.name}</td><td class="patcell">${patternBadgeL4(a.pattern)}</td>${statRow(a.mv)}</tr>`;
    });
  }
});

const groupsTotal = cat.groups.length;
const roleTier = ((cat.lenses && cat.lenses.roles) || []).find(r => r.role === ROLE_NAME);
const tierLabel = roleTier ? roleTier.tier : '[[TIER \u2014 fill in from roles/taxonomy]]';

const css = fs.readFileSync(path.join(__dirname, 'rtp_style.css'), 'utf8');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${ROLE_NAME} \u2014 Role Transition Profile \u2014 The Human-AI Partnership Framework</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>

<div class="masthead">
  <h1>The Human-AI Partnership Framework</h1>
  <div class="tagline">Where human judgment belongs</div>
  <nav><a href="index.html">Documentation</a><a href="../hitl_dashboard_final.html">Dashboard</a></nav>
</div>

<div class="breadcrumb"><a href="index.html">Documentation</a> / <a href="role_taxonomy.html">People View</a> / ${ROLE_NAME}</div>

<div class="doc">
<h1 class="title">${ROLE_NAME} \u2014 Role Transition Profile</h1>
<p class="subtitle">${tierLabel} Tier &middot; ${l3s.length} PCF processes across ${groupsTouched.size} process group${groupsTouched.size === 1 ? '' : 's'}</p>

<h2>Role Impact Snapshot</h2>
<p>Computed from ${cat.code}'s confirmed RACI data using the Responsible/Accountable touch rule (excludes Consulted/Informed).</p>
<div class="snapshot-grid">
<div class="snap-box"><div class="snap-label">L3 processes touched</div><div class="snap-value">${l3s.length}</div></div>
<div class="snap-box"><div class="snap-label">L4 activity units</div><div class="snap-value">${l4Count}</div></div>
<div class="snap-box"><div class="snap-label">Process groups spanned</div><div class="snap-value">${groupsTouched.size} of ${groupsTotal}</div></div>
<div class="snap-box"><div class="snap-label">Aggregate M1 &rarr; M3</div><div class="snap-value">${aggM1}% &rarr; ${aggM3}%</div></div>
<div class="snap-box"><div class="snap-label">Convergence gap</div><div class="snap-value">-${aggM1-aggM3} pts</div></div>
<div class="snap-box"><div class="snap-label">Dominant pattern</div><div class="snap-value">${dominant[0]} (${dominantPct}%)</div></div>
</div>

<h2>Role Pattern Mix</h2>
<p>Pattern-type distribution across every L4 activity this role touches (Responsible or Accountable), with each pattern's standard M1&rarr;M3 convergence applied. Same card design as the Value Stream Profile docs' AI Capability Map, scoped to this role instead of a value stream.</p>
<p class="caption-note">Each card shows that pattern's own standard M1&rarr;M3 value, not weighted by this role. The Snapshot's Aggregate M1&rarr;M3 above (${aggM1}% &rarr; ${aggM3}%) is the count-weighted blend across all 5 patterns present \u2014 ${captionNote()}</p>
${capmapCardsHtml()}

<!-- TODO (requires real research \u2014 see spec \u00a74): a bespoke narrative
     section here, titled to fit the role (not a generic heading \u2014 every
     existing PCF 7.0 RTP page titles this uniquely). OPTIONAL \u2014 2 of the
     11 real PCF 7.0 pages (HRBP Manager, HRIS Analyst) skip this section
     entirely and go straight from the Full Detail table to Skills &
     Competencies. Delete this block if the role doesn't need it; don't
     force one to exist. -->
<h2>Role Impact Profile &mdash; Full Detail</h2>
<p>Every L3 process this role holds Responsible or Accountable on. Each Mixed-pattern process is shown with its own aggregate rollup row (a proportional pattern-mix bar in place of a plain &ldquo;Mixed&rdquo; label), followed by its individual Level 4 activities.</p>
<table class="detail-table">
<thead><tr><th>PCF</th><th>Process/Activity</th><th>Pattern</th><th>M1<br><span class=mh>UNDESIGNED</span></th><th>M2<br><span class=mh>EMERGING</span></th><th>M3 &#9733;<br><span class=mh>DESIGN INTENT</span></th><th>M4<br><span class=mh>OPTIMIZED</span></th><th>M5<br><span class=mh>LEADING</span></th><th>&Delta; M1&rarr;M3</th></tr></thead>
<tbody>${tableRows}</tbody>
</table>
<div class="legend"><span class="sw" style="background:var(--c-dec)"></span>Decision &mdash; Judgment &amp; Authority &nbsp; <span class="sw" style="background:var(--c-kno)"></span>Knowledge &mdash; Synthesis &amp; Interpretation &nbsp; <span class="sw" style="background:var(--c-doc)"></span>Document &mdash; Content Generation &nbsp; <span class="sw" style="background:var(--c-tra)"></span>Transaction &mdash; Rules-Based Processing<br><span class="sw" style="background:var(--c-exc)"></span>Exception &mdash; Non-Standard Resolution &nbsp;&middot;&nbsp; R/A-touch basis, not C/I &nbsp;&middot;&nbsp; Equal-weighted rollup across touched processes &nbsp;&middot;&nbsp; &copy; Timothy P. King &amp; Claude (Anthropic) 2026</div>

<h2>[[TODO: role-specific narrative section title \u2014 OR delete this whole h2+p block if this role doesn't need one]]</h2>
<p>[[TODO: narrative content \u2014 what's distinctive about this role's real touch pattern, grounded in the table above, not invented]]</p>

<!-- TODO (requires real research \u2014 see spec \u00a74): find and fully fetch
     ONE substantive, real, named external source for this role (industry
     research, a certification body's own career-path material, BLS-style
     labor data, etc.) \u2014 never fabricate one. -->
<h2>Skills &amp; Competencies</h2>
<p>[[TODO: grounded in [SOURCE NAME], real bullet list of 5 skill areas]]</p>
<ul class="skills">
<li>[[TODO]]</li>
</ul>
<p class="framework-connection"><strong>Framework connection: </strong>[[TODO: tie back to the Role Pattern Mix finding above]]</p>

<h2>Role Progression Framework</h2>
<p>Three-stage structure follows the AIHR &ldquo;HR Business Partner Guide&rdquo; infographic's template (Getting Started / Established / Future-Focused) \u2014 structure only, no content reused. Column content grounded in [[TODO: source]].</p>
<table class="prog-table">
<thead><tr><th></th><th>Getting Started</th><th>Established</th><th>Future-Focused</th></tr></thead>
<tbody>
<tr><td class="rowlabel">Role focus</td><td>[[TODO]]</td><td>[[TODO]]</td><td>[[TODO]]</td></tr>
<tr><td class="rowlabel">Key activities</td><td>[[TODO]]</td><td>[[TODO]]</td><td>[[TODO]]</td></tr>
<tr><td class="rowlabel">Skills to build</td><td>[[TODO]]</td><td>[[TODO]]</td><td>[[TODO]]</td></tr>
<tr><td class="rowlabel">Common pitfalls</td><td>[[TODO]]</td><td>[[TODO]]</td><td>[[TODO]]</td></tr>
</tbody>
</table>

<h2>How the Role Has Evolved</h2>
<!-- TODO (requires real research \u2014 see spec \u00a75): a real, independently-
     verified 5-era timeline appropriate to THIS role's own domain (do NOT
     reuse the HR-industry Ulrich/AIHR timeline for a non-HR role \u2014 find
     the real history: e.g. ITIL versions for ITSM roles, NIST CSF/ISO 27001
     for security roles, TOGAF for architecture roles). -->
<div class="evo-timeline">
[[TODO: 5 .evo-era divs \u2014 see spec \u00a75 for exact markup and the color
progression (pale to var(--navy-d), "Now" era gets the \u2605 marker)]]
</div>
<p style="font-size:11px;color:var(--lgray);font-style:italic;margin-top:-12px;margin-bottom:20px">Era framing follows the AIHR &ldquo;HR Business Partner Guide&rdquo; infographic's own historical structure; [[TODO: domain]] facts verified independently, not reproduced from AIHR's text.</p>
<p class="framework-connection"><strong>A related pattern${cat.code === '7.0' ? ' from outside HR' : ''}: </strong>McKinsey's Julie Goran, writing in July 2026, frames the scale of what's changing as comparable to the dawn of the Industrial Age \u2014 leaders are now asking whether AI agents belong on the org chart itself, and how to plan spans and layers around agent capacity alongside human capacity. [[TODO: one sentence tying this to what THIS role's own data already shows]]</p>
<p class="sources">Sources: [[TODO: real source citation(s)]]; Julie Goran, &ldquo;Rewired takes: How AI is unlocking creativity and heralding the rise of the agent manager,&rdquo; McKinsey &amp; Company, July 2026. AIHR &ldquo;HR Business Partner Guide&rdquo; infographic used as structural template only; no content reused.</p>

</div>

<footer>
  <p>
    <strong style="color:var(--navy)">Timothy P. King</strong> &nbsp;&middot;&nbsp; Human Enterprise Architect &nbsp;&middot;&nbsp; August 2026<br>
    Co-developed with Claude (Anthropic)<br>
    <a href="mailto:timothy.king@hitldrivenarchitecture.com">timothy.king@hitldrivenarchitecture.com</a>
    &nbsp;&middot;&nbsp; hitldrivenarchitecture.com
  </p>
</footer>

</body>
</html>
`;

const outPath = `rtp_${OUT_SLUG}.html`;
fs.writeFileSync(outPath, html);
console.log(`written ${outPath} \u2014 mechanical sections complete, TODO blocks need real research before this is shippable (see HITL_RTP_Html_Spec.md \u00a74-5)`);
