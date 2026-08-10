const fs = require('fs');

// gen_vsp_html.js — per-stream Value Stream Profile HTML page generator
// Usage: node gen_vsp_html.js <domain>.json "<Stream Name>" <slug> <domain-slug>
const DOMAIN_JSON = process.argv[2];
const STREAM_NAME = process.argv[3];
const OUT_SLUG = process.argv[4];
const DOMAIN_SLUG = process.argv[5]; // e.g. 'pcf8' for pdf link paths
const cat = JSON.parse(fs.readFileSync(DOMAIN_JSON, 'utf8'));

const PATTERN_META = {
  Decision:    { fill: '#EEF3FA', text: '#1B4F8A', bar: '#7B9FD1', tagline: 'Judgment &amp; Authority \u2014 gates that stay human by design', m1: 92, m3: 80 },
  Knowledge:   { fill: '#F3F0FE', text: '#534AB7', bar: '#A79AE0', tagline: 'Synthesis &amp; Interpretation \u2014 judgment-driven work', m1: 85, m3: 65 },
  Document:    { fill: '#E0F2FE', text: '#0369A1', bar: '#5EB8E0', tagline: 'Content Generation \u2014 drafting and communication', m1: 72, m3: 40 },
  Transaction: { fill: '#DCFCE7', text: '#166534', bar: '#6FC48C', tagline: 'Rules-Based Processing \u2014 suited to automation', m1: 60, m3: 35 },
  Exception:   { fill: '#FEE2E2', text: '#991B1B', bar: '#E88A8A', tagline: 'Non-Standard Resolution \u2014 human-resolved by nature', m1: 95, m3: 82 },
};
const TIER_COLORS = {
  Executive: { fill: '#FEE2E2', text: '#991B1B' },
  Managerial: { fill: '#EEF3FA', text: '#1B4F8A' },
  Operational: { fill: '#DCFCE7', text: '#166534' },
  'External Participant': { fill: '#F5F5F5', text: '#666666' },
};

function getStreamL3s(cat, stream) {
  const fullGroups = new Set(stream.l2codes || []);
  const explicitL3 = new Set(stream.l3codes || []);
  const result = [];
  cat.groups.forEach(g => {
    if (fullGroups.has(g.code)) g.l3.forEach(l3 => result.push(l3));
    else if (explicitL3.size) g.l3.forEach(l3 => { if (explicitL3.has(l3.code)) result.push(l3); });
  });
  return result;
}
function countPatternsForL3s(l3s) {
  const counts = { Decision: 0, Knowledge: 0, Document: 0, Transaction: 0, Exception: 0 };
  l3s.forEach(l3 => {
    if (l3.l4 && l3.l4.length) l3.l4.forEach(a => { if (counts[a.pattern] !== undefined) counts[a.pattern]++; });
    else if (counts[l3.pattern] !== undefined) counts[l3.pattern]++;
  });
  return counts;
}
function codeInStream(code, stream) {
  if (!stream) return false;
  if ((stream.l2codes || []).some(l2 => code === l2 || code.startsWith(l2 + '.'))) return true;
  return (stream.l3codes || []).some(l3 => code === l3 || code.startsWith(l3 + '.'));
}
function splitRoleAnnotation(raw) {
  const m = raw.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return m ? { base: m[1].trim(), note: m[2].trim() } : { base: raw, note: null };
}

const stream = cat.valueStreams.find(s => s.name === STREAM_NAME);
if (!stream) { console.error('Stream not found:', STREAM_NAME); process.exit(1); }
const d = cat.lenses.descriptions.find(x => x.stream === STREAM_NAME);
if (!d) { console.error('No description entry for stream:', STREAM_NAME); process.exit(1); }
const kpiEntry = (cat.lenses.kpis || []).find(k => k.stream === STREAM_NAME);
const designNarrativeText = (cat.lenses.designNarrative && cat.lenses.designNarrative[STREAM_NAME]) || '';
const handoffPoints = (cat.lenses.handoffPoints && cat.lenses.handoffPoints[STREAM_NAME]) || [];
const streamL3s = getStreamL3s(cat, stream);
const govItems = (cat.lenses.governance || []).filter(g => codeInStream(g.code, stream));

// ── KPIs ──────────────────────────────────────────────────────────────────
let kpiHtml = '';
if (kpiEntry) {
  const rows = kpiEntry.metrics.map(m => `<tr><td><div class="kpi-name">${m.name}</div>${m.formula ? `<div class="kpi-formula">${m.formula}</div>` : ''}</td><td>${m.source ? `<span class="src-badge">${m.source}</span>` : '<span class="src-none">&mdash;</span>'}</td></tr>`).join('');
  kpiHtml = `<h2>KPIs</h2><table><tr><th>Business Impact Metric &amp; Formula (where confirmed)</th><th style="width:15%">Source</th></tr>${rows}</table>`;
}

// ── Design Narrative ──────────────────────────────────────────────────────
let designHtml = '';
if (designNarrativeText) {
  designHtml = `<h2>Design Narrative</h2><p>${designNarrativeText}</p>`;
}

// ── AI Capability Map ─────────────────────────────────────────────────────
const patternCounts = countPatternsForL3s(streamL3s);
const patternOrder = ['Decision', 'Knowledge', 'Document', 'Transaction', 'Exception'];
const capCards = patternOrder.map(p => {
  const meta = PATTERN_META[p];
  const count = patternCounts[p];
  const body = count === 0
    ? `<div class="cm-count">0 <span>L4 activities</span></div><div class="cm-empty-note">No activities of this pattern in this value stream</div>`
    : `<div class="cm-count">${count} <span>L4 activities</span></div><div class="cm-mvals">M1 ${meta.m1}%  &rarr;  M3 ${meta.m3}%</div>`;
  return `<div class="capmap-card" style="background:${meta.fill};color:${meta.text}"><div class="cm-name">${p}</div><div class="cm-tagline">${meta.tagline}</div>${body}</div>`;
}).join('');
const capMapHtml = `<h2>AI Capability Map</h2><p class="caption">Pattern-type distribution across this value stream's activity units. H% figures are the pattern type's standard value at each maturity level, applied consistently across all PCF domains.</p><div class="capmap-grid">${capCards}</div>`;

// ── Process Accountability ────────────────────────────────────────────────
const ownerData = {};
const roleNotes = {};
streamL3s.forEach(l3 => {
  const raw = (l3.raci && l3.raci.A) || 'Unassigned';
  const { base: role, note } = splitRoleAnnotation(raw);
  const count = (l3.l4 && l3.l4.length) ? l3.l4.length : 1;
  if (!ownerData[role]) ownerData[role] = { steps: 0, l3s: [] };
  ownerData[role].steps += count;
  ownerData[role].l3s.push(l3.code);
  if (note) { if (!roleNotes[role]) roleNotes[role] = []; roleNotes[role].push({ code: l3.code, note }); }
});
const tierByRole = {};
(d.roles || []).forEach(r => { tierByRole[r.role] = r.tier; });
let accHtml = '';
if (Object.keys(ownerData).length) {
  const rows = Object.entries(ownerData).map(([role, data]) => {
    const tier = tierByRole[role] || tierByRole[role.replace(/\*$/, '')] || 'External Participant';
    const tc = TIER_COLORS[tier] || TIER_COLORS['External Participant'];
    const notes = roleNotes[role] || [];
    const l3Text = data.l3s.map(code => notes.some(n => n.code === code) ? code + '&dagger;' : code).join(', ');
    const noteLines = notes.map(n => `<div class="acc-note">&dagger; ${n.code}: ${n.note}</div>`).join('');
    return `<tr><td class="acc-role">${role}</td><td style="text-align:center"><span class="tier-badge" style="background:${tc.fill};color:${tc.text}">${tier}</span></td><td class="acc-l3">${l3Text}${noteLines}</td><td style="text-align:center">${data.steps}</td></tr>`;
  }).join('');
  accHtml = `<h2>Process Accountability</h2><table><tr><th>Process Accountability</th><th style="width:14%;text-align:center">Tier</th><th style="width:35%">L3 Processes</th><th style="width:12%;text-align:center">L4 Activities</th></tr>${rows}</table>`;
}

// ── Handoff Points ─────────────────────────────────────────────────────────
let handoffHtml = '';
if (handoffPoints.length) {
  handoffHtml = `<h2>Handoff Points</h2>` + handoffPoints.map(p => `<p>${p}</p>`).join('');
}

// ── Governed Decision Points ────────────────────────────────────────────────
let govHtml = '<h2>Governed Decision Points</h2>';
if (govItems.length) {
  govHtml += `<p class="caption">Every Decision/Exception-pattern activity in the value stream, including those embedded inside Mixed-labeled steps.</p>`;
  const rows = govItems.map(g => `<tr><td class="gdp-pcf">${g.code}</td><td>${g.decision}</td><td>${g.authority}</td><td>${g.impact}</td><td>${g.escalates}</td><td>${g.trigger}</td></tr>`).join('');
  govHtml += `<table><tr><th style="width:8%">PCF</th><th>Decision</th><th>Authority</th><th>Impact</th><th>Escalates To</th><th>Trigger</th></tr>${rows}</table>`;
} else {
  govHtml += `<p class="no-gdp">No Decision- or Exception-pattern activity in this value stream &mdash; every step here is Knowledge, Document, Transaction, or Mixed without an embedded Decision/Exception component.</p>`;
}

const narrativeHtml = d.narrative.map(p => `<p>${p}</p>`).join('');
const pdfSlug = OUT_SLUG;
const domainSuffix = DOMAIN_SLUG === 'pcf7' ? 'pcf7' : 'pcf8';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${STREAM_NAME} — The Human-AI Partnership Framework</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --navy: #1B4F8A; --navy-d: #0D2D4F; --navy-l: #EEF3FA; --dark: #0D1B2A;
  --gray: #444; --lgray: #888; --bg: #F4F6FB; --border: #DDE3EE;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--dark); }
.masthead { background: var(--navy-d); color: #fff; padding: 32px 24px 28px; text-align: center; }
.masthead h1 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; margin-bottom: 4px; }
.masthead .tagline { font-size: 13px; color: #6E8CB8; font-style: italic; margin-bottom: 18px; }
.masthead nav a { color: #CFE0F5; text-decoration: none; font-size: 13px; font-weight: 600; margin: 0 14px; padding-bottom: 3px; border-bottom: 2px solid transparent; }
.masthead nav a:hover, .masthead nav a.active { color: #fff; border-bottom-color: #7B9FD1; }
.breadcrumb { max-width: 900px; margin: 20px auto 0; padding: 0 24px; font-size: 12px; color: var(--lgray); }
.breadcrumb a { color: var(--navy); text-decoration: none; }
.doc { max-width: 900px; margin: 0 auto; padding: 24px 24px 80px; }
.doc h1.title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--navy-d); margin: 8px 0 6px; }
.doc .subtitle { font-size: 13px; color: var(--lgray); font-style: italic; margin-bottom: 5px; }
.doc .stats { font-size: 13px; color: var(--gray); margin-bottom: 22px; }
.doc h2 { font-size: 16px; color: var(--navy-d); font-weight: 700; margin: 28px 0 10px; padding-bottom: 6px; border-bottom: 2px solid var(--navy-l); }
.doc p { font-size: 13px; line-height: 1.7; color: var(--gray); margin-bottom: 12px; }
.doc p.caption { font-size: 11.5px; color: var(--lgray); margin-bottom: 14px; }
table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 12px; }
th { background: var(--navy); color: #fff; text-align: left; padding: 7px 10px; font-size: 11px; }
td { padding: 8px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
tr:nth-child(even) td { background: #FAFBFD; }
.kpi-name { font-weight: 700; color: var(--navy-d); }
.kpi-formula { font-size: 12px; color: var(--lgray); font-style: italic; }
.src-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; background: #DCFCE7; color: #166534; }
.src-none { color: #B8C0CC; }
.gdp-pcf { font-family: 'DM Mono', monospace; color: var(--navy); }
.no-gdp { font-style: italic; color: var(--lgray); font-size: 13px; padding: 12px 0; }
.capmap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px,1fr)); gap: 10px; margin: 14px 0 8px; }
.capmap-card { border-radius: 8px; padding: 14px 14px; }
.cm-name { font-weight: 700; font-size: 13px; margin-bottom: 4px; }
.cm-tagline { font-size: 10px; font-style: italic; opacity: .85; margin-bottom: 10px; line-height: 1.4; }
.cm-count { font-weight: 700; font-size: 15px; }
.cm-count span { font-weight: 400; font-size: 11px; }
.cm-mvals { font-size: 11px; margin-top: 4px; }
.cm-empty-note { font-size: 10.5px; font-style: italic; margin-top: 4px; }
.acc-role { color: var(--navy-d); }
.tier-badge { display: inline-block; font-size: 10.5px; font-weight: 700; padding: 3px 10px; border-radius: 10px; }
.acc-l3 { font-size: 11.5px; color: #666; }
.acc-note { font-size: 10.5px; font-style: italic; color: var(--lgray); margin-top: 3px; }
footer { text-align: center; padding: 40px 24px 48px; border-top: 1px solid var(--border); margin-top: 40px; }
footer p { font-size: 12px; color: var(--lgray); line-height: 1.8; }
footer a { color: var(--navy); text-decoration: none; }
.pdflink { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--navy); text-decoration: none; background: #fff; border: 1px solid var(--border); border-radius: 6px; padding: 8px 14px; margin-top: 4px; }
</style>
</head>
<body>
<div class="masthead">
  <h1>The Human-AI Partnership Framework</h1>
  <div class="tagline">Where human judgment belongs</div>
  <nav>
    <a href="index.html">Documentation</a>
    <a href="../hitl_dashboard_final.html">Dashboard</a>
  </nav>
</div>
<div class="breadcrumb"><a href="index.html">Documentation</a> / Process View / ${STREAM_NAME}</div>
<div class="doc">
<h1 class="title">${STREAM_NAME}</h1>
<p class="subtitle">${d.pcf} &middot; ${d.subtitle}</p>
<p class="stats">${d.l3Count} PCF processes &middot; ${d.activityUnits} L4 activities &middot; M1 ${d.m1}% &rarr; M3 ${d.m3}% (&Delta; ${d.delta}%)</p>
<a class="pdflink" href="../pdfs/hitl_valuestream_${pdfSlug}_${domainSuffix}_final.pdf">&#8659; Download as PDF</a>
<h2>Description</h2>
${narrativeHtml}
${kpiHtml}
${designHtml}
${capMapHtml}
${accHtml}
${handoffHtml}
${govHtml}
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

const outPath = `vsp_${OUT_SLUG}.html`;
fs.writeFileSync(outPath, html);
console.log(`written ${outPath} — ${streamL3s.length} L3s, ${Object.keys(ownerData).length} roles, ${govItems.length} governance rows`);
