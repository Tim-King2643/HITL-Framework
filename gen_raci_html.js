const fs = require('fs');

// gen_raci_html.js — domain-wide RACI HTML page generator
// Usage: node gen_raci_html.js <domain>.json <slug> "<Domain Full Name>"
const DOMAIN_JSON = process.argv[2];
const SLUG = process.argv[3];
const cat = JSON.parse(fs.readFileSync(DOMAIN_JSON, 'utf8'));

const PATTERN_BAR = { Decision: '#7B9FD1', Knowledge: '#A79AE0', Document: '#5EB8E0', Transaction: '#6FC48C', Exception: '#E88A8A' };
const PATTERN_TEXT_VAR = { Decision: '--c-dec', Knowledge: '--c-kno', Document: '--c-doc', Transaction: '--c-tra', Exception: '--c-exc' };
const PATTERN_BG_VAR = { Decision: '--bg-dec', Knowledge: '--bg-kno', Document: '--bg-doc', Transaction: '--bg-tra', Exception: '--bg-exc' };

function patCellL3(l3) {
  let bar;
  if (l3.mixed && l3.l4 && l3.l4.length) {
    const counts = {};
    l3.l4.forEach(a => { counts[a.pattern] = (counts[a.pattern]||0)+1; });
    const total = l3.l4.length;
    const spans = Object.entries(counts).map(([p,c]) =>
      `<span style="width:${(c/total*100).toFixed(1)}%;background:${PATTERN_BAR[p]}" title="${p} (${c})"></span>`).join('');
    bar = `<span class="mixbar">${spans}</span>`;
  } else {
    bar = `<span class="mixbar"><span style="width:100%;background:${PATTERN_BAR[l3.pattern]}" title="${l3.pattern}"></span></span>`;
  }
  return `${bar}<div class="m3tag">${l3.mv[2]}%</div>`;
}

function patBadgeL4(a) {
  return `<span class="pat-badge" style="color:var(${PATTERN_TEXT_VAR[a.pattern]});background:var(${PATTERN_BG_VAR[a.pattern]})">${a.pattern}</span><div class="m3tag">${a.mv[2]}%</div>`;
}

function raciCell(val, isAcct) {
  const v = (val || '—').trim() || '—';
  return `<td class="raci${isAcct ? ' acct' : ''}">${v.split('·').map(s=>s.trim()).join(' · ')}</td>`;
}

let rows = '';
let l3Count = 0, l4Count = 0;
cat.groups.forEach(g => {
  rows += `<tr class="l2-row"><td colspan="7">${g.code} ${g.name}</td></tr>`;
  g.l3.forEach(l3 => {
    l3Count++;
    const r = l3.raci || {};
    rows += `<tr class="l3-row"><td class="pcf">${l3.code}</td><td class="act">${l3.name}</td><td class="patcell">${patCellL3(l3)}</td>${raciCell(r.R)}${raciCell(r.A, true)}${raciCell(r.C)}${raciCell(r.I)}</tr>`;
    if (l3.l4 && l3.l4.length) {
      l3.l4.forEach(a => {
        l4Count++;
        rows += `<tr class="l4-row"><td class="pcf">${a.code}</td><td class="act">${a.name}</td><td class="patcell">${patBadgeL4(a)}</td>${raciCell(r.R)}${raciCell(r.A, true)}${raciCell(r.C)}${raciCell(r.I)}</tr>`;
      });
    } else {
      l4Count++;
    }
  });
});

const groupCount = cat.groups.length;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>End-to-End Process &amp; Role Accountability — The Human-AI Partnership Framework</title>
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
th { background: var(--navy); color: #fff; text-align: left; padding: 7px 8px; font-size: 10.5px; }
td { padding: 5px 8px; border-bottom: 1px solid var(--border); vertical-align: top; }
.detail-table td.pcf { font-family: 'DM Mono', monospace; color: var(--navy); font-size: 11px; white-space: nowrap; }
.detail-table tr.l2-row td { background: #0D2D4F; color: #fff; font-weight: 700; font-size: 11.5px; padding: 6px 8px; }
.detail-table tr.l3-row td { background: #F5F8FC; font-weight: 700; color: var(--navy-d); }
.detail-table tr.l4-row td.act { padding-left: 18px; color: var(--gray); font-weight: 400; }
.detail-table tbody tr.l4-row td { background: #fff; }
.detail-table tbody tr.l4-row:nth-child(odd) td { background: #FAFBFD; }
.pat-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px; white-space: nowrap; }
.mixbar { display: flex; height: 12px; width: 100%; min-width:46px; border-radius: 3px; overflow: hidden; margin-bottom: 3px; }
.mixbar span { display: block; height: 100%; }
.m3tag { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--lgray); margin-top: 2px; }
.raci { font-size: 11.5px; color: var(--gray); }
.raci.acct { font-weight: 700; color: var(--navy-d); background: #F5F5F5; }
.legend { font-size: 11.5px; color: var(--gray); margin: 10px 0 24px; line-height: 1.9; }
.legend .sw { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 4px; vertical-align: middle; }
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

<div class="breadcrumb"><a href="index.html">Documentation</a> / Process View / End-to-End Process &amp; Role Accountability</div>

<div class="doc">
  <h1 class="title">End-to-End Process &amp; Role Accountability Specification</h1>
  <p class="subtitle">${cat.code} — ${cat.name} · Domain-wide RACI across all ${groupCount} process groups</p>

  <p>This page specifies the full end-to-end process flow and role accountability for all of ${cat.code} (${cat.name}) — ${groupCount} process groups, ${l3Count} Level 3 processes, and ${l4Count} Level 4 activities in total. Each row shows the activity's HITL pattern and M3 (HITL Design Intent) human-involvement ratio, alongside its confirmed RACI assignment.</p>
  <p>RACI assignment in this framework is confirmed at L3 process granularity, grounded directly in real APQC L4 activity text matched against the Organizational Role Taxonomy — never inferred from process names alone. Every L4 activity shown below inherits its parent L3's confirmed RACI rather than carrying an independently assigned one, consistent with the methodology used throughout this framework.</p>
  <p>This is the same underlying RACI data confirmed per-stream in each Value Stream Profile — this page is the full domain in one place, for anyone who wants the whole accountability picture rather than one value stream at a time.</p>

  <h2>End-to-End Process Specification</h2>
  <p class="caption">R = Responsible · A = Accountable · C = Consulted · I = Informed · Full L1→L2→L3→L4 hierarchy, RACI carried from L3 to its L4 children</p>

  <table class="detail-table">
    <colgroup>
      <col style="width:7%"><col style="width:29%"><col style="width:13%">
      <col style="width:14%"><col style="width:12%"><col style="width:12%"><col style="width:13%">
    </colgroup>
    <thead>
      <tr>
        <th>PCF</th><th>Activity</th><th>Pattern · M3 H%</th>
        <th>R — Responsible</th><th>A — Accountable</th><th>C — Consulted</th><th>I — Informed</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <div class="legend"><span class="sw" style="background:var(--c-dec)"></span>Decision — Judgment &amp; Authority &nbsp; <span class="sw" style="background:var(--c-kno)"></span>Knowledge — Synthesis &amp; Interpretation &nbsp; <span class="sw" style="background:var(--c-doc)"></span>Document — Content Generation &nbsp; <span class="sw" style="background:var(--c-tra)"></span>Transaction — Rules-Based Processing<br><span class="sw" style="background:var(--c-exc)"></span>Exception — Non-Standard Resolution &nbsp;&middot;&nbsp; RACI carried from L3 to its L4 children &nbsp;&middot;&nbsp; &copy; Timothy P. King &amp; Claude (Anthropic) 2026</div>

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

const outPath = `hitl_raci_${SLUG}_final.html`;
fs.writeFileSync(outPath, html);
console.log(`written ${outPath} — ${l3Count} L3s, ${l4Count} L4s, ${groupCount} groups`);
