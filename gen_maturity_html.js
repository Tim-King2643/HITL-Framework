const fs = require('fs');

// gen_maturity_html.js — domain-wide Maturity HTML page generator
// Usage: node gen_maturity_html.js <domain>.json <slug> "<Domain Full Name>" <l3count> <l4count> <groupcount>
const DOMAIN_JSON = process.argv[2];
const SLUG = process.argv[3];
const DOMAIN_TITLE = process.argv[4];
const cat = JSON.parse(fs.readFileSync(DOMAIN_JSON, 'utf8'));

const PATTERN_BAR = { Decision: '#7B9FD1', Knowledge: '#A79AE0', Document: '#5EB8E0', Transaction: '#6FC48C', Exception: '#E88A8A' };
const PATTERN_TEXT_VAR = { Decision: '--c-dec', Knowledge: '--c-kno', Document: '--c-doc', Transaction: '--c-tra', Exception: '--c-exc' };
const PATTERN_BG_VAR = { Decision: '--bg-dec', Knowledge: '--bg-kno', Document: '--bg-doc', Transaction: '--bg-tra', Exception: '--bg-exc' };

function statRow(mv) {
  return `<td class="stat">${mv[0]}%</td><td class="stat">${mv[1]}%</td><td class="stat m3">${mv[2]}%</td><td class="stat">${mv[3]}%</td><td class="stat">${mv[4]}%</td><td class="stat delta">-${mv[0]-mv[2]}%</td>`;
}

function patCellL3(l3) {
  if (l3.mixed && l3.l4 && l3.l4.length) {
    const counts = {};
    l3.l4.forEach(a => { counts[a.pattern] = (counts[a.pattern]||0)+1; });
    const total = l3.l4.length;
    const spans = Object.entries(counts).map(([p,c]) =>
      `<span style="width:${(c/total*100).toFixed(1)}%;background:${PATTERN_BAR[p]}" title="${p} (${c})"></span>`).join('');
    return `<span class="mixbar">${spans}</span>`;
  }
  return `<span class="mixbar"><span style="width:100%;background:${PATTERN_BAR[l3.pattern]}" title="${l3.pattern}"></span></span>`;
}

function patBadgeL4(pattern) {
  return `<span class="pat-badge" style="color:var(${PATTERN_TEXT_VAR[pattern]});background:var(${PATTERN_BG_VAR[pattern]})">${pattern}</span>`;
}

let rows = '';
// L1 domain aggregate row
rows += `<tr class="l1-row"><td class="pcf">${cat.code}</td><td class="act">${cat.name} <span class="agg-tag">L1 DOMAIN AGGREGATE</span></td><td class="patcell">&mdash;</td>${statRow(cat.l1mv)}</tr>`;

let l3Count = 0, l4Count = 0;
cat.groups.forEach(g => {
  rows += `<tr class="l2-row"><td class="pcf">${g.code}</td><td class="act">${g.name} <span class="agg-tag l2tag">L2 AVG</span></td><td class="patcell">&mdash;</td>${statRow(g.mv)}</tr>`;
  g.l3.forEach(l3 => {
    l3Count++;
    rows += `<tr class="l3-row"><td class="pcf">${l3.code}</td><td class="act">${l3.name}</td><td class="patcell">${patCellL3(l3)}</td>${statRow(l3.mv)}</tr>`;
    if (l3.l4 && l3.l4.length) {
      l3.l4.forEach(a => {
        l4Count++;
        rows += `<tr class="l4-row"><td class="pcf">${a.code}</td><td class="act">${a.name}</td><td class="patcell">${patBadgeL4(a.pattern)}</td>${statRow(a.mv)}</tr>`;
      });
    } else {
      l4Count++; // leaf L3 with no children counted as its own unit (matches domain doc convention)
    }
  });
});

const groupCount = cat.groups.length;
const [m1,,m3] = cat.l1mv;
const delta = m1 - m3;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>HITL Maturity Assessment — All Processes — The Human-AI Partnership Framework</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --navy: #1B4F8A; --navy-d: #0D2D4F; --navy-l: #EEF3FA; --dark: #0D1B2A;
  --gray: #444; --lgray: #888; --bg: #F4F6FB; --border: #DDE3EE;
  --c-dec:#1B4F8A; --bg-dec:#EEF3FA; --c-kno:#534AB7; --bg-kno:#F3F0FE;
  --c-doc:#0369A1; --bg-doc:#E0F2FE; --c-tra:#166534; --bg-tra:#DCFCE7;
  --c-exc:#991B1B; --bg-exc:#FEE2E2;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--dark); }
.masthead { background: var(--navy-d); color: #fff; padding: 32px 24px 28px; text-align: center; }
.masthead h1 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; margin-bottom: 4px; }
.masthead .tagline { font-size: 13px; color: #6E8CB8; font-style: italic; margin-bottom: 18px; }
.masthead nav a { color: #CFE0F5; text-decoration: none; font-size: 13px; font-weight: 600; margin: 0 14px; padding-bottom: 3px; border-bottom: 2px solid transparent; }
.masthead nav a:hover, .masthead nav a.active { color: #fff; border-bottom-color: #7B9FD1; }
.breadcrumb { max-width: 1200px; margin: 20px auto 0; padding: 0 24px; font-size: 12px; color: var(--lgray); }
.breadcrumb a { color: var(--navy); text-decoration: none; }
.doc { max-width: 1200px; margin: 0 auto; padding: 24px 24px 80px; }
.doc h1.title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--navy-d); margin: 8px 0 6px; }
.doc .subtitle { font-size: 13px; color: var(--lgray); font-style: italic; margin-bottom: 20px; }
.doc h2 { font-size: 16px; color: var(--navy-d); font-weight: 700; margin: 26px 0 10px; padding-bottom: 6px; border-bottom: 2px solid var(--navy-l); }
.doc p { font-size: 13px; line-height: 1.7; color: var(--gray); margin-bottom: 12px; }
.doc p.caption { font-size: 11.5px; color: var(--lgray); margin-bottom: 14px; }
table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
th { background: var(--navy); color: #fff; text-align: left; padding: 7px 8px; font-size: 10.5px; position: sticky; top: 0; }
.mh { font-weight: 400; font-size: 8.5px; display:block; opacity:.85; }
td { padding: 5px 8px; border-bottom: 1px solid var(--border); vertical-align: top; }
.detail-table td.stat, .detail-table th { text-align: center; }
.detail-table td.pcf { font-family: 'DM Mono', monospace; color: var(--navy); font-size: 11px; white-space: nowrap; }
.detail-table tr.l1-row td { background: #0D2D4F; color: #fff; font-weight: 700; font-size: 12px; }
.detail-table tr.l1-row td.pcf { color: #9FC0E8; }
.detail-table tr.l1-row td.stat { color: #C7DBF2; }
.detail-table tr.l1-row td.m3 { color: #fff; }
.detail-table tr.l2-row td { background: #EEF3FA; font-weight: 700; color: var(--navy-d); font-size: 11.5px; border-top: 2px solid #7AAED6; }
.detail-table tr.l3-row td { background: #F5F8FC; color: var(--navy-d); }
.detail-table tr.l3-row td.stat { color: var(--navy); }
.detail-table tr.l4-row td.act { padding-left: 18px; color: var(--gray); font-weight: 400; }
.detail-table td.m3 { background: #D6E8FF; font-weight: 700; color: var(--navy); }
.detail-table tr.l1-row td.m3 { background: #12385F; }
.detail-table tr.l2-row td.m3, .detail-table tr.l3-row td.m3 { background: #C4DCFF; }
.detail-table td.delta { color: #B45309; }
.detail-table tr.l1-row td.delta { color: #FFD9A8; }
.pat-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px; white-space: nowrap; }
.mixbar { display: flex; height: 13px; width: 100%; min-width:50px; border-radius: 0; overflow: hidden; }
.mixbar span { display: block; height: 100%; }
.agg-tag { font-size: 9px; font-weight: 700; letter-spacing: .03em; opacity: .75; margin-left: 6px; }
.legend { font-size: 11.5px; color: var(--gray); margin: 10px 0 24px; line-height: 1.9; }
.legend .sw { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 4px; vertical-align: middle; }
.detail-table tbody tr.l4-row:nth-child(odd) td { background: #FAFBFD; }
.detail-table tbody tr.l4-row td { background: #fff; }
footer { text-align: center; padding: 40px 24px 48px; border-top: 1px solid var(--border); margin-top: 40px; }
footer p { font-size: 12px; color: var(--lgray); line-height: 1.8; }
footer a { color: var(--navy); text-decoration: none; }
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

<div class="breadcrumb"><a href="index.html">Documentation</a> / Process View / HITL Maturity Assessment — All Processes</div>

<div class="doc">
  <h1 class="title">HITL Maturity Assessment — All Processes</h1>
  <p class="subtitle">${cat.code} — ${cat.name} · Domain-wide rollup across all ${groupCount} process groups</p>

  <p>This page reports HITL (Human-in-the-Loop) maturity ratios for all of ${cat.code} (${cat.name}) — ${groupCount} process groups, ${l3Count} Level 3 processes, and ${l4Count} Level 4 activities in total — at five maturity levels from M1 (Undesigned) through M5 (Leading), with M3 marking HITL Design Intent.</p>
  <p>At M3 (HITL Design Intent), this domain's aggregate human-involvement ratio is <strong>${m3}%</strong>, down from a <strong>${m1}%</strong> undesigned (M1) baseline — a <strong>-${delta}-point</strong> AI convergence opportunity. Mixed-pattern L3 rows reflect an equal-weighted rollup of their real L4 children rather than a force-classified single pattern.</p>
  <p>This is the same underlying data shown per-stream in each Value Stream Profile's HITL Impact Analysis table — this page is the full domain in one place, for anyone who wants the whole picture rather than one value stream at a time.</p>

  <h2>HITL Maturity Assessment</h2>
  <p class="caption">H% = Human involvement at each maturity level · M3 = HITL Design Intent · Full L1→L2→L3→L4 hierarchy</p>

  <table class="detail-table">
    <colgroup>
      <col style="width:7%"><col style="width:31%"><col style="width:13%">
      <col style="width:7%"><col style="width:7%"><col style="width:8%">
      <col style="width:7%"><col style="width:7%"><col style="width:8%">
    </colgroup>
    <thead>
      <tr>
        <th>PCF</th><th>L1-Domain / L2-Process Group / L3-Process / L4-Activity</th><th style="text-align:center">M3 &#9733;<br><span class="mh">PATTERN</span></th>
        <th style="text-align:center">M1<br><span class="mh">UNDESIGNED</span></th>
        <th style="text-align:center">M2<br><span class="mh">EMERGING</span></th>
        <th style="text-align:center;background:#396CA7">M3 &#9733;<br><span class="mh">DESIGN INTENT</span></th>
        <th style="text-align:center">M4<br><span class="mh">OPTIMIZED</span></th>
        <th style="text-align:center">M5<br><span class="mh">LEADING</span></th>
        <th style="text-align:center">Δ M1→M3</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <div class="legend"><span class="sw" style="background:var(--c-dec)"></span>Decision — Judgment &amp; Authority &nbsp; <span class="sw" style="background:var(--c-kno)"></span>Knowledge — Synthesis &amp; Interpretation &nbsp; <span class="sw" style="background:var(--c-doc)"></span>Document — Content Generation &nbsp; <span class="sw" style="background:var(--c-tra)"></span>Transaction — Rules-Based Processing<br><span class="sw" style="background:var(--c-exc)"></span>Exception — Non-Standard Resolution &nbsp;&middot;&nbsp; Full L1→L2→L3→L4 hierarchy · Mixed-pattern rows show an equal-weighted rollup of their real L4 children &nbsp;&middot;&nbsp; &copy; Timothy P. King 2026 &middot; developed with the assistance of Claude (Anthropic)</div>

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

const outPath = `hitl_maturity_${SLUG}_final.html`;
fs.writeFileSync(outPath, html);
console.log(`written ${outPath} — ${l3Count} L3s, ${l4Count} L4s, ${groupCount} groups`);
