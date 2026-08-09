const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType,
  Header, Footer, PageNumber, VerticalAlign, HeightRule
} = require('docx');

const DOMAIN_JSON = process.argv[2];
const DOMAIN_SLUG = process.argv[3];
const d8 = JSON.parse(fs.readFileSync(DOMAIN_JSON, 'utf8'));

// Locked spec — ported from the approved gen_maturity.js (see
// HITL_Maturity_Docx_Spec.md). Pattern palettes, borders, fonts, row
// hierarchy, indentation method, stats-card and legend treatment are all
// shared conventions across every domain-wide doc type in this framework.
const PATTERN_TEXT = { Decision: '1B4F8A', Knowledge: '534AB7', Document: '0369A1', Transaction: '166534', Exception: '991B1B' };
const PATTERN_BADGE_FILL = { Decision: 'EEF3FA', Knowledge: 'F3F0FE', Document: 'E0F2FE', Transaction: 'DCFCE7', Exception: 'FEE2E2' };
const PATTERN_BAR = { Decision: '7B9FD1', Knowledge: 'A79AE0', Document: '5EB8E0', Transaction: '6FC48C', Exception: 'E88A8A' };
const NAVY = '1B4F8A';
const NAVY_D = '0D2D4F';
const GRAY = '444444';

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

const TOTAL = 13640;
const COLW = { pcf: 850, name: 3200, pattern: 1200, r: 1980, a: 1980, c: 1780, i: 1650 };
function pct(dxa) { return Math.round((dxa / TOTAL) * 100 * 100) / 100; }

function headerCell(text, subText, widthDxa, align) {
  const children = [new TextRun({ text, bold: true, color: 'FFFFFF', size: 11, caps: true })];
  if (subText) children.push(new TextRun({ text: subText, bold: true, color: 'FFFFFF', size: 11, caps: true, break: 1 }));
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: NAVY },
    verticalAlign: VerticalAlign.BOTTOM,
    margins: align === AlignmentType.LEFT ? { top: 60, bottom: 60, left: 140, right: 60 } : undefined,
    children: [new Paragraph({ alignment: align || AlignmentType.CENTER, children })],
  });
}
function headerRow() {
  return new TableRow({
    tableHeader: true,
    children: [
      headerCell('PCF', null, COLW.pcf, AlignmentType.LEFT),
      headerCell('L1-Domain / L2-Process Group / L3-Process / L4-Activity', null, COLW.name, AlignmentType.LEFT),
      headerCell('Pattern', null, COLW.pattern),
      headerCell('R \u2014 Responsible', null, COLW.r, AlignmentType.LEFT),
      headerCell('\u2605', 'A \u2014 Accountable', COLW.a, AlignmentType.CENTER),
      headerCell('C \u2014 Consulted', null, COLW.c, AlignmentType.LEFT),
      headerCell('I \u2014 Informed', null, COLW.i, AlignmentType.LEFT),
    ],
  });
}

function countPatterns(l4s) {
  const counts = { Decision: 0, Knowledge: 0, Document: 0, Transaction: 0, Exception: 0 };
  l4s.forEach(a => counts[a.pattern]++);
  return counts;
}
// L3 rows always get a bar: solid for a leaf L3, proportionally segmented
// (thin white divider between segments) for one that rolls up real L4
// children — vertically centered thin pill, NOT a full-height block, so
// consecutive rows stay visually distinct. Matches gen_maturity.js exactly.
function patternBarCellL3(l3, widthDxa, fill) {
  const hasChildren = l3.l4 && l3.l4.length;
  let barRow;
  if (!hasChildren) {
    barRow = new TableRow({ height: { value: 180, rule: HeightRule.EXACT }, children: [new TableCell({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: noBorder(),
      shading: { type: ShadingType.CLEAR, fill: PATTERN_BAR[l3.pattern] || 'CCCCCC' },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      children: [new Paragraph({ children: [] })],
    })] });
  } else {
    const counts = countPatterns(l3.l4);
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const present = Object.entries(counts).filter(([, c]) => c > 0);
    const segDivider = { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.SINGLE, size: 4, color: 'FFFFFF' }, right: { style: BorderStyle.SINGLE, size: 4, color: 'FFFFFF' } };
    const segCells = present.map(([pattern, c], i) => new TableCell({
      width: { size: Math.round((c / total) * 100 * 100) / 100, type: WidthType.PERCENTAGE },
      borders: i < present.length - 1 ? segDivider : noBorder(),
      shading: { type: ShadingType.CLEAR, fill: PATTERN_BAR[pattern] },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      children: [new Paragraph({ children: [] })],
    }));
    barRow = new TableRow({ height: { value: 180, rule: HeightRule.EXACT }, children: segCells });
  }
  const nested = new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, columnWidths: [widthDxa], rows: [barRow] });
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill },
    borders: thinBorder(),
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 50, bottom: 50, left: 60, right: 60 },
    children: [nested],
  });
}
// L4 rows always get a small colored TEXT badge on a pale fill — the
// classic badge convention used everywhere else in this framework.
function patternTextCell(pattern, widthDxa, fill) {
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: PATTERN_BADGE_FILL[pattern] || fill },
    borders: thinBorder(),
    verticalAlign: VerticalAlign.TOP,
    children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: pattern, bold: true, color: PATTERN_TEXT[pattern], size: 11 })] })],
  });
}

function raciCellParas(value, derived, size) {
  if (!value || value === '\u2014') {
    return [new Paragraph({ children: [new TextRun({ text: '\u2014', color: '999999', size: size || 14 })] })];
  }
  const parts = value.split('\u00b7').map(p => p.trim()).filter(Boolean);
  const paras = [];
  parts.forEach(part => {
    const m = part.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    if (m) {
      paras.push(new Paragraph({ spacing: { after: 10 }, children: [new TextRun({ text: m[1], color: derived ? '888888' : GRAY, italics: !!derived, size: size || 14 })] }));
      paras.push(new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: m[2], color: '888888', italics: true, size: (size || 14) - 2 })] }));
    } else {
      paras.push(new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: part, color: derived ? '888888' : GRAY, italics: !!derived, size: size || 14 })] }));
    }
  });
  if (derived) paras.push(new Paragraph({ children: [new TextRun({ text: 'from Accountable', color: '999999', italics: true, size: 11 })] }));
  return paras;
}
function raciDataCell(value, widthDxa, stripe, opts) {
  opts = opts || {};
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: opts.fill || stripe },
    borders: thinBorder(),
    children: raciCellParas(value, opts.derived, opts.size),
  });
}
function rCellValue(raci) {
  if (raci.R && raci.R !== '\u2014') return { value: raci.R, derived: false };
  return { value: raci.A, derived: true };
}
// Indentation via cell margin (not paragraph indent) — paragraph indent's
// wrapped-line behavior was inconsistent in Word tables; cell margins
// apply uniformly to every wrapped line. See spec §10.
function textCell(text, widthDxa, opts) {
  opts = opts || {};
  const baseLeftMargin = opts.align === AlignmentType.LEFT ? 140 : 60;
  const leftMargin = baseLeftMargin + (opts.indentDxa || 0);
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill } : undefined,
    margins: opts.align === AlignmentType.LEFT ? { top: 60, bottom: 60, left: leftMargin, right: 60 } : undefined,
    borders: thinBorder(),
    verticalAlign: VerticalAlign.TOP,
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.CENTER,
      children: [new TextRun({ text: String(text), bold: !!opts.bold, color: opts.color || GRAY, size: opts.size || 14 })],
    })],
  });
}

function l2Row(g) {
  return new TableRow({
    children: [new TableCell({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnSpan: 7,
      shading: { type: ShadingType.CLEAR, fill: 'EEF3FA' },
      borders: thinBorder(),
      children: [new Paragraph({ children: [
        new TextRun({ text: g.code + '  ', bold: true, color: NAVY_D, size: 14 }),
        new TextRun({ text: g.name, bold: true, color: NAVY_D, size: 14 }),
      ]})],
    })],
  });
}
function dataRow(code, name, patternCellObj, raci, stripe, indentDxa) {
  const r = rCellValue(raci);
  return new TableRow({
    children: [
      textCell(code, COLW.pcf, { align: AlignmentType.LEFT, color: '000000', fill: stripe, size: 13 }),
      textCell(name, COLW.name, { align: AlignmentType.LEFT, color: GRAY, fill: stripe, size: 14, indentDxa }),
      patternCellObj,
      raciDataCell(r.value, COLW.r, stripe, { derived: r.derived }),
      raciDataCell(raci.A, COLW.a, stripe, { fill: 'F5F5F5' }),
      raciDataCell(raci.C, COLW.c, stripe),
      raciDataCell(raci.I, COLW.i, stripe),
    ],
  });
}

const rows = [headerRow()];
d8.groups.forEach(g => {
  rows.push(l2Row(g));
  g.l3.forEach((l3, l3i) => {
    if (!l3.raci) return;
    const stripe3 = l3i % 2 === 1 ? 'F9FBFD' : 'FFFFFF';
    // L3 always gets a bar — solid for a leaf L3, segmented for a rollup.
    rows.push(dataRow(l3.code, l3.name, patternBarCellL3(l3, COLW.pattern, stripe3), l3.raci, stripe3));
    if (l3.l4 && l3.l4.length) {
      l3.l4.forEach((l4, l4i) => {
        const stripe4 = l4i % 2 === 1 ? 'FBFCFE' : 'FFFFFF';
        // L4 always gets a colored text badge, not a bar. Real cell-margin
        // indent, not leading spaces.
        rows.push(dataRow(l4.code, l4.name, patternTextCell(l4.pattern, COLW.pattern, stripe4), l3.raci, stripe4, 260));
      });
    }
  });
});

const table = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [COLW.pcf, COLW.name, COLW.pattern, COLW.r, COLW.a, COLW.c, COLW.i],
  rows,
});

// Bordered stats cards (an early pass used noBorder() and it read as loose
// floating text instead of a card grid — corrected, now locked).
function statCell(label, value, widthDxa) {
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    borders: thinBorder(),
    shading: { type: ShadingType.CLEAR, fill: 'FAFBFD' },
    margins: { top: 120, bottom: 120, left: 140, right: 100 },
    children: [
      new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: label, color: '888888', size: 13 })] }),
      new Paragraph({ children: [new TextRun({ text: value, bold: true, color: NAVY, size: 22 })] }),
    ],
  });
}
const l3Count = d8.groups.reduce((s, g) => s + g.l3.length, 0);
const l4Count = d8.groups.reduce((s, g) => s + g.l3.reduce((s2, l3) => s2 + (l3.l4 ? l3.l4.length : 1), 0), 0);
const statsTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [4547, 4546, 4547],
  rows: [new TableRow({ children: [
    statCell('PROCESS GROUPS', String(d8.groups.length), 4547),
    statCell('L3 PROCESSES CONFIRMED', String(l3Count), 4546),
    statCell('L4 ACTIVITIES INHERITED', String(l4Count), 4547),
  ]})],
});

// Compact, left-packed legend (was 5 equal-width columns spread across the
// full page with large gaps — corrected, now locked).
function legendItem(pattern, widthDxa) {
  return new TableCell({ width: { size: pct(widthDxa), type: WidthType.PERCENTAGE }, borders: noBorder(),
    children: [new Paragraph({ children: [
      new TextRun({ text: '\u25A0 ', color: PATTERN_TEXT[pattern], size: 13 }),
      new TextRun({ text: pattern, color: GRAY, size: 13 }),
    ]})] });
}
const legendColW = [1500, 1600, 1600, 1800, 1600];
const legendSpacer = TOTAL - legendColW.reduce((a, b) => a + b, 0);
const legendTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [...legendColW, legendSpacer],
  rows: [new TableRow({ children: [
    legendItem('Decision', legendColW[0]), legendItem('Knowledge', legendColW[1]), legendItem('Document', legendColW[2]), legendItem('Transaction', legendColW[3]), legendItem('Exception', legendColW[4]),
    new TableCell({ width: { size: pct(legendSpacer), type: WidthType.PERCENTAGE }, borders: noBorder(), children: [new Paragraph({ children: [] })] }),
  ]})],
});

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

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Segoe UI' },
      },
    },
  },
  sections: [{
    properties: { page: {
      size: { width: 15840, height: 12240, orientation: 'landscape' },
      margin: { top: 1000, right: 1100, bottom: 1000, left: 1100, header: 708, footer: 708 },
    }},
    headers: { default: new Header({ children: [
      new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: 'The Human-AI Partnership Framework', bold: true, color: NAVY, size: 13 })] }),
      new Paragraph({ children: [new TextRun({ text: `PCF ${d8.code} \u2014 Full RACI Assignment`, italics: true, color: '888888', size: 13 })] }),
    ]})},
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: 'Page ', color: '888888', size: 13 }),
      new TextRun({ children: [PageNumber.CURRENT], color: '888888', size: 13 }),
      new TextRun({ text: ' of ', color: '888888', size: 13 }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], color: '888888', size: 13 }),
    ]})]})},
    children: [
      bannerTable(),
      new Paragraph({ spacing: { before: 220, after: 40 },
        children: [new TextRun({ text: `PCF ${d8.code} \u2014 ${d8.name}`, font: 'Georgia', bold: true, color: NAVY_D, size: 30 })] }),
      new Paragraph({ spacing: { after: 200 },
        children: [new TextRun({ text: 'Full RACI Assignment \u2014 All Processes', italics: true, color: '888888', size: 17 })] }),
      statsTable,
      new Paragraph({ spacing: { before: 200, after: 160 }, children: [
        new TextRun({ text: `This document reports confirmed R/A/C/I role accountability for all of PCF ${d8.code} (${d8.name}) \u2014 every L4 activity inherits its parent L3's confirmed RACI, since RACI in this framework is assigned at L3 process granularity, grounded directly in real APQC L4 activity text against the Organizational Role Taxonomy.`, color: GRAY, size: 18 }),
      ]}),
      new Paragraph({ spacing: { before: 100, after: 40 }, children: [new TextRun({ text: 'Full RACI Assignment', bold: true, color: NAVY_D, size: 19 })] }),
      new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: 'R = Responsible \u00b7 A = Accountable \u00b7 C = Consulted \u00b7 I = Informed \u00b7 Full L1\u2192L2\u2192L3\u2192L4 hierarchy', color: '888888', size: 14 })] }),
      table,
      new Paragraph({ spacing: { before: 160, after: 100 }, children: [] }),
      legendTable,
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({
          text: `\u2605 A = Accountable \u00b7 RACI grounded in real APQC L4 activity text \u00b7 ${l3Count} confirmed L3 assignments across ${d8.groups.length} process groups \u00b7 \u00a9 Timothy P. King & Claude (Anthropic) 2026`,
          italics: true, color: '888888', size: 13,
        })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`/home/claude/docbuild/hitl_raci_${DOMAIN_SLUG}_final.docx`, buf);
  console.log('written');
});
