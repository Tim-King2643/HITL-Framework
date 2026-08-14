const fs = require('fs');

// gen_crud_html.js — domain-wide CRUD Matrix HTML page generator
// Usage: node gen_crud_html.js <domain>.json <slug> "<Domain Full Name>"
// Data source: each L3 carries an optional `.crud` field —
//   { create: [...], read: [...], update: [...], delete: [...] }
// where each entry is a string "Entity Name (System of Record)".
// Assigned at L3 granularity and inherited by L4 children, same
// convention as .raci — never assigned independently per L4.
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

function crudCell(entries, opClass) {
  if (!entries || !entries.length) return `<td class="crud crud-empty">&middot;</td>`;
  const items = entries.map(e => {
    const m = e.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    return m
      ? `<div class="crud-entry"><span class="crud-entity">${m[1]}</span><span class="crud-sys">${m[2]}</span></div>`
      : `<div class="crud-entry"><span class="crud-entity">${e}</span></div>`;
  }).join('');
  return `<td class="crud crud-${opClass}">${items}</td>`;
}

let rows = '';
let l3Count = 0, l4Count = 0, l3WithCrud = 0;
cat.groups.forEach(g => {
  rows += `<tr class="l2-row toggle-row" data-crud-group="${g.code}">
    <td class="toggle-l2" colspan="7" data-crud-group="${g.code}" onclick="toggleCrudGroup('${g.code}',this)">
      <span class="row-flex"><span class="row-prefix"><span class="toggle-icon" title="Click to collapse">&minus;</span>${g.code}</span><span class="row-text">${g.name}</span></span>
    </td>
  </tr>`;
  g.l3.forEach(l3 => {
    l3Count++;
    const cr = l3.crud || {};
    if (l3.crud) l3WithCrud++;
    const hasL4 = l3.l4 && l3.l4.length > 0;
    const l3ToggleAttrs = hasL4
      ? `class="act toggle-l3 collapsed" data-crud-l3code="${l3.code}" onclick="toggleCrudL3('${l3.code}',this)"`
      : `class="act"`;
    const l3Icon = hasL4
      ? `<span class="toggle-icon" title="Click to expand">+</span>`
      : `<span class="toggle-icon placeholder"></span>`;
    rows += `<tr class="l3-row" data-crud-parent="${g.code}" data-crud-l3code="${l3.code}"><td class="pcf">${l3.code}</td><td ${l3ToggleAttrs}><span class="row-flex"><span class="row-prefix">${l3Icon}</span><span class="row-text">${l3.name}</span></span></td><td class="patcell">${patCellL3(l3)}</td>${crudCell(cr.create,'c')}${crudCell(cr.read,'r')}${crudCell(cr.update,'u')}${crudCell(cr.delete,'d')}</tr>`;
    if (hasL4) {
      l3.l4.forEach(a => {
        l4Count++;
        rows += `<tr class="l4-row" data-crud-parent="${g.code}" data-crud-parent-l3="${l3.code}" style="display:none"><td class="pcf">${a.code}</td><td class="act">${a.name}</td><td class="patcell">${patBadgeL4(a)}</td>${crudCell(cr.create,'c')}${crudCell(cr.read,'r')}${crudCell(cr.update,'u')}${crudCell(cr.delete,'d')}</tr>`;
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
<title>Data View — CRUD Matrix — The Human-AI Partnership Framework</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --navy: #1B4F8A; --navy-d: #0D2D4F; --navy-l: #EEF3FA; --dark: #0D1B2A;
  --gray: #444; --lgray: #888; --bg: #F4F6FB; --border: #DDE3EE;
  --c-dec:#1B4F8A; --bg-dec:#EEF3FA; --c-kno:#534AB7; --bg-kno:#F3F0FE;
  --c-doc:#0369A1; --bg-doc:#E0F2FE; --c-tra:#166534; --bg-tra:#DCFCE7;
  --c-exc:#991B1B; --bg-exc:#FEE2E2;
  --c-c:#166534; --bg-c:#DCFCE7; --c-r:#1B4F8A; --bg-r:#DBEAFE;
  --c-u:#B45309; --bg-u:#FEF3C7; --c-d:#991B1B; --bg-d:#FEE2E2;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--dark); }
.masthead { background: var(--navy-d); color: #fff; padding: 32px 24px 28px; text-align: center; }
.masthead h1 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 24px; margin-bottom: 4px; }
.masthead .tagline { font-size: 13px; color: #6E8CB8; font-style: italic; margin-bottom: 18px; }
.masthead nav a { color: #CFE0F5; text-decoration: none; font-size: 13px; font-weight: 600; margin: 0 14px; padding-bottom: 3px; border-bottom: 2px solid transparent; }
.masthead nav a:hover, .masthead nav a.active { color: #fff; border-bottom-color: #7B9FD1; }
.breadcrumb { max-width: 1300px; margin: 20px auto 0; padding: 0 24px; font-size: 12px; color: var(--lgray); }
.breadcrumb a { color: var(--navy); text-decoration: none; }
.doc { max-width: 1300px; margin: 0 auto; padding: 24px 24px 80px; }
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
.detail-table tr.l3-row td { background: #F5F8FC; color: var(--navy-d); }
.detail-table tr.l4-row td.act { padding-left: 18px; color: var(--gray); font-weight: 400; }
.detail-table tbody tr.l4-row td { background: #fff; }
.detail-table tbody tr.l4-row:nth-child(odd) td { background: #FAFBFD; }
.pat-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 3px; white-space: nowrap; }
.mixbar { display: flex; height: 12px; width: 100%; min-width:46px; border-radius: 0; overflow: hidden; margin-bottom: 3px; }
.mixbar span { display: block; height: 100%; }
.m3tag { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--lgray); margin-top: 2px; }
td.crud { font-size: 10.5px; }
td.crud-empty { color: #C8D0DC; text-align: center; font-size: 12px; }
.crud-entry { margin-bottom: 4px; }
.crud-entry:last-child { margin-bottom: 0; }
.crud-entity { display: block; font-weight: 600; }
.crud-sys { display: block; font-size: 9.5px; color: var(--lgray); font-style: italic; }
td.crud-c .crud-entity { color: var(--c-c); }
td.crud-r .crud-entity { color: var(--c-r); }
td.crud-u .crud-entity { color: var(--c-u); }
td.crud-d .crud-entity { color: var(--c-d); }
.legend { font-size: 11.5px; color: var(--gray); margin: 10px 0 24px; line-height: 1.9; }
.legend .sw { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 4px; vertical-align: middle; }
.toggle-l2, .toggle-l3 { cursor: pointer; user-select: none; }
.toggle-icon { display: inline-block; width: 14px; text-align: center; margin-right: 4px; font-weight: 800; font-size: 12px; color: var(--navy-d); }
.toggle-icon.placeholder { visibility: hidden; }
.row-flex { display: flex; align-items: flex-start; }
.row-prefix { flex: 0 0 auto; white-space: nowrap; margin-right: 6px; }
.detail-table tr.l2-row td.toggle-l2 { color: #fff; }
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

<div class="breadcrumb"><a href="index.html">Documentation</a> / Data View / CRUD Matrix</div>

<div class="doc">
  <h1 class="title">CRUD Matrix — Data Entities &amp; Systems of Record</h1>
  <p class="subtitle">${cat.code} — ${cat.name} · Domain-wide, all ${groupCount} process groups</p>

  <p>This page maps every data entity each process Creates, Reads, Updates, or Deletes, and the system of record it lives in, for all of ${cat.code} (${cat.name}) — ${groupCount} process groups, ${l3Count} Level 3 processes, and ${l4Count} Level 4 activities in total. It's the Data View's answer to a different question than Process View (how much stays human) or People View (who's accountable): what actually gets touched, and where does it live.</p>
  <p>CRUD assignment in this framework is confirmed at L3 process granularity and inherited by L4 children, the same convention already used for RACI — never assigned independently per L4. Coverage is real, not exhaustive: only L3s with a confirmed CRUD assignment show entries; the rest show &ldquo;&middot;&rdquo;, an honest gap rather than an inferred one. ${l3WithCrud} of ${l3Count} L3 processes have confirmed CRUD data so far.</p>

  <h2>CRUD Matrix</h2>
  <p class="caption">C = Create · R = Read · U = Update · D = Delete · Full L1&rarr;L2&rarr;L3&rarr;L4 hierarchy, CRUD carried from L3 to its L4 children</p>

  <table class="detail-table">
    <colgroup>
      <col style="width:7%"><col style="width:25%"><col style="width:12%">
      <col style="width:14%"><col style="width:14%"><col style="width:14%"><col style="width:14%">
    </colgroup>
    <thead>
      <tr>
        <th>PCF</th><th>Activity</th><th>Pattern &middot; M3 H%</th>
        <th>C &mdash; Create</th><th>R &mdash; Read</th><th>U &mdash; Update</th><th>D &mdash; Delete</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <div class="legend"><span class="sw" style="background:var(--c-dec)"></span>Decision &nbsp; <span class="sw" style="background:var(--c-kno)"></span>Knowledge &nbsp; <span class="sw" style="background:var(--c-doc)"></span>Document &nbsp; <span class="sw" style="background:var(--c-tra)"></span>Transaction &nbsp; <span class="sw" style="background:var(--c-exc)"></span>Exception<br>CRUD carried from L3 to its L4 children &nbsp;&middot;&nbsp; &copy; Timothy P. King &amp; Claude (Anthropic) 2026</div>

</div>

<footer>
  <p>
    <strong style="color:var(--navy)">Timothy P. King</strong> &nbsp;&middot;&nbsp; Human Enterprise Architect &nbsp;&middot;&nbsp; August 2026<br>
    Co-developed with Claude (Anthropic)<br>
    <a href="mailto:timothy.king@hitldrivenarchitecture.com">timothy.king@hitldrivenarchitecture.com</a>
    &nbsp;&middot;&nbsp; hitldrivenarchitecture.com
  </p>
</footer>

<script>
// Expand/collapse — same mechanism as the live dashboard's Maturity/RACI
// tables (toggleGroup/toggleL3), ported here as a self-contained copy since
// this is a standalone generated page, not part of the shared dashboard JS.
// Scoped with crud- prefixed data attributes so nothing collides if this
// page is ever embedded alongside the dashboard's own tables.
function setIcon(el, expanded) {
  const icon = el.querySelector('.toggle-icon');
  if (!icon || icon.classList.contains('placeholder')) return;
  icon.textContent = expanded ? '\u2212' : '+';
  icon.title = expanded ? 'Click to collapse' : 'Click to expand';
}
function setCrudGroupExpanded(code, expanded) {
  const td = document.querySelector('td.toggle-l2[data-crud-group="' + code + '"]');
  if (!td) return;
  td.classList.toggle('collapsed', !expanded);
  setIcon(td, expanded);
  document.querySelectorAll('tr.l3-row[data-crud-parent="' + code + '"]').forEach(r => {
    r.style.display = expanded ? '' : 'none';
  });
  if (!expanded) {
    document.querySelectorAll('tr.l3-row[data-crud-parent="' + code + '"] td.toggle-l3').forEach(td3 => {
      td3.classList.add('collapsed');
      setIcon(td3, false);
    });
    document.querySelectorAll('tr.l4-row[data-crud-parent="' + code + '"]').forEach(r => {
      r.style.display = 'none';
    });
  }
}
function setCrudL3Expanded(code, expanded) {
  const td = document.querySelector('td.toggle-l3[data-crud-l3code="' + code + '"]');
  if (!td) return;
  td.classList.toggle('collapsed', !expanded);
  setIcon(td, expanded);
  document.querySelectorAll('tr.l4-row[data-crud-parent-l3="' + code + '"]').forEach(r => {
    r.style.display = expanded ? '' : 'none';
  });
}
function toggleCrudGroup(code, el) {
  setCrudGroupExpanded(code, el.classList.contains('collapsed'));
}
function toggleCrudL3(code, el) {
  setCrudL3Expanded(code, el.classList.contains('collapsed'));
}
</script>

</body>
</html>
`;

const outPath = `hitl_crud_${SLUG}_final.html`;
fs.writeFileSync(outPath, html);
console.log(`written ${outPath} — ${l3Count} L3s (${l3WithCrud} with confirmed CRUD data), ${l4Count} L4s, ${groupCount} groups`);
