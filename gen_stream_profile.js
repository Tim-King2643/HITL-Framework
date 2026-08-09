const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType,
  Header, Footer, PageNumber, VerticalAlign,
} = require('docx');

const DOMAIN_JSON = process.argv[2];
const STREAM_NAME = process.argv[3];
const OUT_SLUG = process.argv[4];
const cat = JSON.parse(fs.readFileSync(DOMAIN_JSON, 'utf8'));

// ── Palette — identical to gen_maturity.js / gen_domain_raci.js (locked spec) ──
const PATTERN_TEXT = { Decision: '1B4F8A', Knowledge: '534AB7', Document: '0369A1', Transaction: '166534', Exception: '991B1B' };
const NAVY = '1B4F8A';
const NAVY_D = '0D2D4F';
const GRAY = '444444';

// PATTERN_META, TIER_COLORS — copied verbatim from index.html (ground truth,
// not reconstructed) so card taglines/H% figures and tier-badge colors match
// the live dashboard exactly.
const PATTERN_META = {
  Decision:    { fill: 'EEF3FA', text: '1B4F8A', tagline: 'Judgment & Authority \u2014 gates that stay human by design', m1: 92, m3: 80 },
  Knowledge:   { fill: 'F3F0FE', text: '534AB7', tagline: 'Synthesis & Interpretation \u2014 judgment-driven work', m1: 85, m3: 65 },
  Document:    { fill: 'E0F2FE', text: '0369A1', tagline: 'Content Generation \u2014 drafting and communication', m1: 72, m3: 40 },
  Transaction: { fill: 'DCFCE7', text: '166534', tagline: 'Rules-Based Processing \u2014 suited to automation', m1: 60, m3: 35 },
  Exception:   { fill: 'FEE2E2', text: '991B1B', tagline: 'Non-Standard Resolution \u2014 human-resolved by nature', m1: 95, m3: 82 },
};
const TIER_COLORS = {
  Executive: { fill: 'FEE2E2', text: '991B1B' },
  Managerial: { fill: 'EEF3FA', text: '1B4F8A' },
  Operational: { fill: 'DCFCE7', text: '166534' },
  'External Participant': { fill: 'F5F5F5', text: '666666' },
};

function noBorder() {
  const n = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  return { top: n, bottom: n, left: n, right: n };
}
function thinBorder() {
  return {
    top: { style: BorderStyle.SINGLE, size: 2, color: '7AAED6' },
    bottom: { style: BorderStyle.SINGLE, size: 2, color: '7AAED6' },
    left: { style: BorderStyle.SINGLE, size: 2, color: '7AAED6' },
    right: { style: BorderStyle.SINGLE, size: 2, color: '7AAED6' },
  };
}

// Portrait — per-entity doc types stay portrait (established convention;
// unlike the domain-wide landscape docs, VSP is prose/table-stacked, not a
// wide L1-L4 hierarchy grid).
const TOTAL = 10040; // 12240 - 1100*2
function pct(dxa) { return Math.round((dxa / TOTAL) * 100 * 100) / 100; }

// ── Ground-truth helper functions, copied 1:1 from index.html ──────────────
function getStreamL3s(cat, stream) {
  const fullGroups = new Set(stream.l2codes || []);
  const explicitL3 = new Set(stream.l3codes || []);
  const result = [];
  cat.groups.forEach(g => {
    if (fullGroups.has(g.code)) {
      g.l3.forEach(l3 => result.push(l3));
    } else if (explicitL3.size) {
      g.l3.forEach(l3 => { if (explicitL3.has(l3.code)) result.push(l3); });
    }
  });
  return result;
}
function countPatternsForL3s(l3s) {
  const counts = { Decision: 0, Knowledge: 0, Document: 0, Transaction: 0, Exception: 0 };
  l3s.forEach(l3 => {
    if (l3.l4 && l3.l4.length) {
      l3.l4.forEach(a => { if (counts[a.pattern] !== undefined) counts[a.pattern]++; });
    } else if (counts[l3.pattern] !== undefined) {
      counts[l3.pattern]++;
    }
  });
  return counts;
}
function codeInStream(code, stream) {
  if (!stream) return false;
  const l2Match = (stream.l2codes || []).some(l2 => code === l2 || code.startsWith(l2 + '.'));
  if (l2Match) return true;
  return (stream.l3codes || []).some(l3 => code === l3 || code.startsWith(l3 + '.'));
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

// ── Shared building blocks (identical to gen_maturity.js) ──────────────────
function bannerTable() {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [TOTAL],
    borders: noBorder(),
    rows: [new TableRow({ children: [new TableCell({
      width: { size: 100, type: WidthType.PERCENTAGE },
      shading: { type: ShadingType.CLEAR, fill: NAVY_D },
      borders: noBorder(),
      margins: { top: 220, bottom: 200, left: 200, right: 200 },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
          children: [new TextRun({ text: 'The Human-AI Partnership Framework', font: 'Georgia', bold: true, color: 'FFFFFF', size: 28 })] }),
        new Paragraph({ alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Where human judgment belongs', italics: true, color: '9FC2EE', size: 16 })] }),
      ],
    })] })],
  });
}
function sectionHeading(text, caption) {
  const paras = [new Paragraph({ spacing: { before: 260, after: 40 }, children: [new TextRun({ text, bold: true, color: NAVY_D, size: 19 })] })];
  if (caption) paras.push(new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: caption, color: '888888', size: 14 })] }));
  return paras;
}
function bodyParagraphs(arr, opts) {
  opts = opts || {};
  return arr.map((t, i) => new Paragraph({
    spacing: { after: i === arr.length - 1 ? (opts.lastAfter ?? 160) : 120 },
    children: [new TextRun({ text: t, color: GRAY, size: 18 })],
  }));
}
function statCell(label, value, widthDxa) {
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    borders: thinBorder(),
    shading: { type: ShadingType.CLEAR, fill: 'FAFBFD' },
    margins: { top: 120, bottom: 120, left: 140, right: 100 },
    children: [
      new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: label, color: '888888', size: 12 })] }),
      new Paragraph({ children: [new TextRun({ text: value, bold: true, color: NAVY, size: 22 })] }),
    ],
  });
}
function headerCell(text, widthDxa, align) {
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    verticalAlign: VerticalAlign.BOTTOM,
    margins: { top: 60, bottom: 60, left: 140, right: 60 },
    children: [new Paragraph({ alignment: align || AlignmentType.LEFT, children: [new TextRun({ text, bold: true, color: 'FFFFFF', size: 11, caps: true })] })],
  });
}
function bodyCell(children, widthDxa, opts) {
  opts = opts || {};
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    borders: thinBorder(),
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill } : undefined,
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 80, bottom: 80, left: 140, right: 100 },
    children,
  });
}

// ── 1. Stats row (5 cards, one row) ─────────────────────────────────────────
const statW = [2008, 2008, 2008, 2008, 2008];
const statsTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: statW,
  rows: [new TableRow({ children: [
    statCell('L3 PROCESSES', String(d.l3Count), statW[0]),
    statCell('L4 ACTIVITIES', String(d.activityUnits), statW[1]),
    statCell('M1 BASELINE H%', d.m1 + '%', statW[2]),
    statCell('M3 DESIGN INTENT H%', d.m3 + '%', statW[3]),
    statCell('\u0394 M1 \u2192 M3', d.delta + '%', statW[4]),
  ] })],
});

// ── 2. KPIs table ────────────────────────────────────────────────────────
const KPI_W = { name: 7530, source: 2510 };
let kpiBlock = [];
if (kpiEntry) {
  kpiBlock = kpiBlock.concat(sectionHeading('KPIs'));
  const rows = [new TableRow({
    tableHeader: true,
    children: [
      headerCell('Business Impact Metric & Formula (where confirmed)', KPI_W.name),
      headerCell('Source', KPI_W.source),
    ],
  })];
  kpiEntry.metrics.forEach((m, i) => {
    const stripe = i % 2 === 1 ? 'FAFBFD' : 'FFFFFF';
    const nameChildren = [new Paragraph({ spacing: { after: m.formula ? 40 : 0 }, children: [new TextRun({ text: m.name, bold: true, color: GRAY, size: 15 })] })];
    if (m.formula) nameChildren.push(new Paragraph({ children: [new TextRun({ text: m.formula, italics: true, color: '888888', size: 13 })] }));
    rows.push(new TableRow({ children: [
      bodyCell(nameChildren, KPI_W.name, { fill: stripe }),
      bodyCell([new Paragraph({ children: [new TextRun({ text: m.source || '\u2014', color: '888888', size: 14 })] })], KPI_W.source, { fill: stripe }),
    ] }));
  });
  kpiBlock.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, columnWidths: [KPI_W.name, KPI_W.source], rows }));
}

// ── 3. Design Narrative ─────────────────────────────────────────────────
let designNarrativeBlock = [];
if (designNarrativeText) {
  designNarrativeBlock = sectionHeading('Design Narrative').concat(bodyParagraphs([designNarrativeText]));
}

// ── 4. AI Capability Map (5 cards, one row) ─────────────────────────────
const CARD_W = 1928, GAP_W = 100;
const patternCounts = countPatternsForL3s(streamL3s);
const patternOrder = ['Decision', 'Knowledge', 'Document', 'Transaction', 'Exception'];
function capCard(pattern) {
  const meta = PATTERN_META[pattern];
  const count = patternCounts[pattern];
  const body = count === 0
    ? [new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: '0 L4 activities', bold: true, color: meta.text, size: 15 })] }),
       new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: 'No activities of this pattern in this value stream', italics: true, color: meta.text, size: 11 })] })]
    : [new Paragraph({ spacing: { before: 60 }, children: [new TextRun({ text: `${count} L4 activities`, bold: true, color: meta.text, size: 15 })] }),
       new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: `M1 ${meta.m1}%  \u2192  M3 ${meta.m3}%`, color: meta.text, size: 12 })] })];
  return new TableCell({
    width: { size: pct(CARD_W), type: WidthType.PERCENTAGE },
    borders: noBorder(),
    shading: { type: ShadingType.CLEAR, fill: meta.fill },
    margins: { top: 140, bottom: 140, left: 120, right: 120 },
    children: [
      new Paragraph({ children: [new TextRun({ text: pattern, bold: true, color: meta.text, size: 15 })] }),
      new Paragraph({ spacing: { before: 30 }, children: [new TextRun({ text: meta.tagline, italics: true, color: meta.text, size: 10 })] }),
      ...body,
    ],
  });
}
function spacerCell() {
  return new TableCell({ width: { size: pct(GAP_W), type: WidthType.PERCENTAGE }, borders: noBorder(), children: [new Paragraph({ children: [] })] });
}
const capMapRowChildren = [];
patternOrder.forEach((p, i) => {
  capMapRowChildren.push(capCard(p));
  if (i < patternOrder.length - 1) capMapRowChildren.push(spacerCell());
});
const capMapColWidths = [];
patternOrder.forEach((p, i) => { capMapColWidths.push(CARD_W); if (i < patternOrder.length - 1) capMapColWidths.push(GAP_W); });
const capMapTable = new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, columnWidths: capMapColWidths, rows: [new TableRow({ children: capMapRowChildren })] });
const capMapBlock = sectionHeading('AI Capability Map', "Pattern-type distribution across this value stream's activity units. H% figures are the pattern type's standard value at each maturity level, applied consistently across all PCF domains.").concat([capMapTable]);

// ── 5. Process Accountability ───────────────────────────────────────────
const ownerData = {};
streamL3s.forEach(l3 => {
  const role = (l3.raci && l3.raci.A) || 'Unassigned';
  const count = (l3.l4 && l3.l4.length) ? l3.l4.length : 1;
  if (!ownerData[role]) ownerData[role] = { steps: 0, l3s: [] };
  ownerData[role].steps += count;
  ownerData[role].l3s.push(l3.code);
});
const tierByRole = {};
(d.roles || []).forEach(r => { tierByRole[r.role] = r.tier; });
const ACC_W = { role: 2900, tier: 1600, l3: 3540, l4: 2000 };
let accountabilityBlock = [];
if (Object.keys(ownerData).length) {
  accountabilityBlock = sectionHeading('Process Accountability');
  const rows = [new TableRow({
    tableHeader: true,
    children: [
      headerCell('Process Accountability', ACC_W.role),
      headerCell('Tier', ACC_W.tier, AlignmentType.CENTER),
      headerCell('L3 Processes', ACC_W.l3),
      headerCell('L4 Activities', ACC_W.l4, AlignmentType.CENTER),
    ],
  })];
  Object.entries(ownerData).forEach(([role, data], i) => {
    const stripe = i % 2 === 1 ? 'FAFBFD' : 'FFFFFF';
    const tier = tierByRole[role] || tierByRole[role.replace(/\*$/, '')] || 'External Participant';
    const tc = TIER_COLORS[tier] || TIER_COLORS['External Participant'];
    rows.push(new TableRow({ children: [
      bodyCell([new Paragraph({ children: [new TextRun({ text: role, color: GRAY, size: 15 })] })], ACC_W.role, { fill: stripe }),
      new TableCell({
        width: { size: pct(ACC_W.tier), type: WidthType.PERCENTAGE }, borders: thinBorder(),
        shading: { type: ShadingType.CLEAR, fill: tc.fill }, verticalAlign: VerticalAlign.TOP,
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tier, bold: true, color: tc.text, size: 12 })] })],
      }),
      bodyCell([new Paragraph({ children: [new TextRun({ text: data.l3s.join(', '), color: '666666', size: 13 })] })], ACC_W.l3, { fill: stripe }),
      new TableCell({
        width: { size: pct(ACC_W.l4), type: WidthType.PERCENTAGE }, borders: thinBorder(),
        shading: { type: ShadingType.CLEAR, fill: stripe }, verticalAlign: VerticalAlign.TOP,
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(data.steps), color: GRAY, size: 15 })] })],
      }),
    ] }));
  });
  accountabilityBlock.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, columnWidths: [ACC_W.role, ACC_W.tier, ACC_W.l3, ACC_W.l4], rows }));
}

// ── 6. Handoff Points ────────────────────────────────────────────────────
let handoffBlock = [];
if (handoffPoints.length) {
  handoffBlock = sectionHeading('Handoff Points').concat(bodyParagraphs(handoffPoints));
}

// ── 7. Governed Decision Points ─────────────────────────────────────────
const GOV_W = { pcf: 780, decision: 1900, authority: 1400, impact: 1900, escalates: 1460, trigger: 2600 };
let govBlock = sectionHeading('Governed Decision Points');
if (govItems.length) {
  govBlock.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: 'Every Decision/Exception-pattern activity in the value stream, including those embedded inside Mixed-labeled steps.', color: '888888', size: 14 })] }));
  const rows = [new TableRow({
    tableHeader: true,
    children: [
      headerCell('PCF', GOV_W.pcf),
      headerCell('Decision', GOV_W.decision),
      headerCell('Authority', GOV_W.authority),
      headerCell('Impact', GOV_W.impact),
      headerCell('Escalates To', GOV_W.escalates),
      headerCell('Trigger', GOV_W.trigger),
    ],
  })];
  govItems.forEach((g, i) => {
    const stripe = i % 2 === 1 ? 'FAFBFD' : 'FFFFFF';
    rows.push(new TableRow({ children: [
      bodyCell([new Paragraph({ children: [new TextRun({ text: g.code, color: '000000', size: 13 })] })], GOV_W.pcf, { fill: stripe }),
      bodyCell([new Paragraph({ children: [new TextRun({ text: g.decision, color: GRAY, size: 13 })] })], GOV_W.decision, { fill: stripe }),
      bodyCell([new Paragraph({ children: [new TextRun({ text: g.authority, color: GRAY, size: 13 })] })], GOV_W.authority, { fill: stripe }),
      bodyCell([new Paragraph({ children: [new TextRun({ text: g.impact, color: GRAY, size: 13 })] })], GOV_W.impact, { fill: stripe }),
      bodyCell([new Paragraph({ children: [new TextRun({ text: g.escalates, color: GRAY, size: 13 })] })], GOV_W.escalates, { fill: stripe }),
      bodyCell([new Paragraph({ children: [new TextRun({ text: g.trigger, color: GRAY, size: 13 })] })], GOV_W.trigger, { fill: stripe }),
    ] }));
  });
  govBlock.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, columnWidths: [GOV_W.pcf, GOV_W.decision, GOV_W.authority, GOV_W.impact, GOV_W.escalates, GOV_W.trigger], rows }));
} else {
  govBlock.push(new Paragraph({ children: [new TextRun({ text: 'No Decision- or Exception-pattern activity in this value stream \u2014 every step here is Knowledge, Document, Transaction, or Mixed without an embedded Decision/Exception component.', italics: true, color: '888888', size: 14 })] }));
}

// ── Assemble document ───────────────────────────────────────────────────
const doc = new Document({
  styles: { default: { document: { run: { font: 'Segoe UI' } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1000, right: 1100, bottom: 1000, left: 1100, header: 708, footer: 708 },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: 'The Human-AI Partnership Framework', bold: true, color: NAVY, size: 13 })] }),
          new Paragraph({ children: [new TextRun({ text: `${d.pcf} \u2014 ${STREAM_NAME} \u2014 Value Stream Profile`, italics: true, color: '888888', size: 13 })] }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Page ', color: '888888', size: 13 }),
            new TextRun({ children: [PageNumber.CURRENT], color: '888888', size: 13 }),
            new TextRun({ text: ' of ', color: '888888', size: 13 }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], color: '888888', size: 13 }),
          ],
        })],
      }),
    },
    children: [
      bannerTable(),
      new Paragraph({ spacing: { before: 220, after: 40 },
        children: [new TextRun({ text: STREAM_NAME, font: 'Georgia', bold: true, color: NAVY_D, size: 30 })] }),
      new Paragraph({ spacing: { after: 200 },
        children: [new TextRun({ text: `${d.pcf} \u2014 ${d.subtitle} \u2014 Value Stream Profile`, italics: true, color: '888888', size: 17 })] }),
      ...bodyParagraphs(d.narrative, { lastAfter: 200 }),
      statsTable,
      ...kpiBlock,
      ...designNarrativeBlock,
      ...capMapBlock,
      ...accountabilityBlock,
      ...handoffBlock,
      ...govBlock,
      new Paragraph({
        spacing: { before: 260 },
        children: [new TextRun({
          text: '\u00a9 Timothy P. King & Claude (Anthropic) 2026',
          italics: true, color: '888888', size: 13,
        })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`/home/claude/docbuild/hitl_valuestream_${OUT_SLUG}_final.docx`, buf);
  console.log('written');
});
