const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType,
  Header, Footer, PageNumber, VerticalAlign, HeightRule
} = require('docx');

const DOMAIN_JSON = process.argv[2];
const DOMAIN_SLUG = process.argv[3];
const d8 = JSON.parse(fs.readFileSync(DOMAIN_JSON, 'utf8'));

// Ground truth extracted directly from Tim's reference PDF (font-size/color
// dump via PyMuPDF) — a compact traditional report layout, NOT the
// dashboard's bar-based visual style. Text pattern badges use the
// project's original dark palette (Decision 1B4F8A, Knowledge 534AB7,
// Document 0369A1, Transaction 166534, Exception 991B1B), matching every
// other print doc type in this framework.
const PATTERN_TEXT = { Decision: '1B4F8A', Knowledge: '534AB7', Document: '0369A1', Transaction: '166534', Exception: '991B1B' };
const PATTERN_BADGE_FILL = { Decision: 'EEF3FA', Knowledge: 'F3F0FE', Document: 'E0F2FE', Transaction: 'DCFCE7', Exception: 'FEE2E2' };
const PATTERN_BAR = { Decision: '7B9FD1', Knowledge: 'A79AE0', Document: '5EB8E0', Transaction: '6FC48C', Exception: 'E88A8A' };
const NAVY = '1B4F8A';
const NAVY_D = '0D2D4F';
const GRAY = '444444';
const DELTA_NEG = 'B45309';

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
// PCF is its own column now (was merged into the name column before).
const COLW = { pcf: 900, name: 4160, pattern: 1400, m: 1080, delta: 1160 };
function pct(dxa) { return Math.round((dxa / TOTAL) * 100 * 100) / 100; }

function headerCell(text, widthDxa, align, subText) {
  const children = [new TextRun({ text, bold: true, color: 'FFFFFF', size: 11, caps: true })];
  if (subText) children.push(new TextRun({ text: subText, bold: false, color: 'FFFFFF', size: 10, caps: true, break: 1 }));
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
      headerCell('PCF', COLW.pcf, AlignmentType.LEFT),
      headerCell('L1-Domain / L2-Process Group / L3-Process / L4-Activity', COLW.name, AlignmentType.LEFT),
      headerCell('Pattern', COLW.pattern),
      headerCell('M1', COLW.m, null, 'Undesigned'),
      headerCell('M2', COLW.m, null, 'Emerging'),
      headerCell('M3 \u2605', COLW.m, null, 'Design Intent'),
      headerCell('M4', COLW.m, null, 'Optimized'),
      headerCell('M5', COLW.m, null, 'Leading'),
      headerCell('\u0394 M1\u2192M3', COLW.delta),
    ],
  });
}

// Pattern column: small bold colored TEXT badge (the established convention
// used by every other doc type in this framework) — L4 leaf rows only.
// L3/L2/L1 rollup rows show an em dash, matching the reference exactly.
// Thin pill-style bar, vertically centered with visible stripe-colored
// space above/below (not a full-height block, not text) — matches the
// dashboard's actual pattern-bar look. Leaf rows only; blank for rollups.
// L1/L2 rollup rows: plain em dash, no bar and no text (matches reference).
function patternDashCell(widthDxa, fill, dashColor) {
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill },
    borders: thinBorder(),
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: '\u2014', color: dashColor || GRAY, size: 14 })] })],
  });
}
function countPatterns(l4s) {
  const counts = { Decision: 0, Knowledge: 0, Document: 0, Transaction: 0, Exception: 0 };
  l4s.forEach(a => counts[a.pattern]++);
  return counts;
}
// L3 rows always get a bar: a solid single-color bar for a leaf L3 (no L4
// children), or a proportional segmented bar (real L4 pattern counts) for
// an L3 that aggregates multiple children — segments divided by a thin
// white line so they read distinctly. Thin pill style, vertically centered
// with visible stripe-colored space above/below, matching the dashboard.
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
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 50, bottom: 50, left: 60, right: 60 },
    children: [nested],
  });
}
// L4 rows always get a small colored TEXT badge — precise, single-pattern,
// leaf-level identification, distinct from L3's summary bar.
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

function textCell(text, widthDxa, opts) {
  opts = opts || {};
  const baseLeftMargin = opts.align === AlignmentType.LEFT ? 140 : 60;
  const leftMargin = baseLeftMargin + (opts.indentDxa || 0);
  return new TableCell({
    width: { size: pct(widthDxa), type: WidthType.PERCENTAGE },
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill } : undefined,
    margins: opts.align === AlignmentType.LEFT ? { top: 60, bottom: 60, left: leftMargin, right: 60 } : undefined,
    borders: thinBorder(),
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.CENTER,
      children: [new TextRun({ text: String(text), bold: !!opts.bold, color: opts.color || GRAY, size: opts.size || 14 })],
    })],
  });
}

// Renders the 5 M-column cells with M3 specially highlighted (fill +
// bold + accent text color), matching the dashboard's M3-column band.
function mCells(mv, opts) {
  return mv.map((v, i) => {
    const isM3 = i === 2;
    return textCell(v + '%', COLW.m, {
      bold: opts.boldAll || isM3,
      color: isM3 ? (opts.m3Color || opts.color) : opts.color,
      fill: isM3 ? (opts.m3Fill || opts.fill) : opts.fill,
      size: opts.size,
    });
  });
}

function l1Row(cat) {
  const mv = cat.l1mv;
  const delta = mv[2] - mv[0];
  return new TableRow({
    children: [
      textCell(cat.code, COLW.pcf, { align: AlignmentType.LEFT, bold: true, color: '9FC0E8', fill: NAVY_D, size: 12 }),
      textCell(`${cat.name} \u00b7 L1 DOMAIN AGGREGATE`, COLW.name, { align: AlignmentType.LEFT, bold: true, color: 'FFFFFF', fill: NAVY_D, size: 12 }),
      patternDashCell(COLW.pattern, NAVY_D, 'C7DBF2'),
      ...mCells(mv, { color: 'C7DBF2', fill: NAVY_D, m3Color: 'FFFFFF', size: 12 }),
      textCell(delta + '%', COLW.delta, { bold: true, color: 'FFD9A8', fill: NAVY_D, size: 12 }),
    ],
  });
}
function l2Row(g) {
  const mv = g.mv;
  const delta = mv[2] - mv[0];
  return new TableRow({
    children: [
      textCell(g.code, COLW.pcf, { align: AlignmentType.LEFT, bold: true, color: '000000', fill: 'EEF3FA', size: 14 }),
      textCell(`${g.name} \u00b7 L2 AVG`, COLW.name, { align: AlignmentType.LEFT, bold: true, color: NAVY_D, fill: 'EEF3FA', size: 14 }),
      patternDashCell(COLW.pattern, 'EEF3FA'),
      ...mCells(mv, { boldAll: true, color: GRAY, fill: 'EEF3FA', m3Color: NAVY, m3Fill: 'D6E8FF', size: 14 }),
      textCell(delta + '%', COLW.delta, { bold: true, color: DELTA_NEG, fill: 'EEF3FA', size: 14 }),
    ],
  });
}
function dataRow(code, name, patternCellObj, mv, opts) {
  opts = opts || {};
  const delta = mv[2] - mv[0];
  const stripe = opts.stripe || 'FFFFFF';
  return new TableRow({
    children: [
      textCell(code, COLW.pcf, { align: AlignmentType.LEFT, color: '000000', fill: stripe, size: 13 }),
      textCell(name, COLW.name, { align: AlignmentType.LEFT, color: GRAY, fill: stripe, size: 14, indentDxa: opts.indentDxa }),
      patternCellObj,
      ...mCells(mv, { color: GRAY, fill: stripe, m3Color: NAVY, m3Fill: 'D6E8FF', size: 14 }),
      textCell(delta + '%', COLW.delta, { color: DELTA_NEG, fill: stripe, size: 14 }),
    ],
  });
}

const rows = [headerRow(), l1Row(d8)];
d8.groups.forEach(g => {
  rows.push(l2Row(g));
  g.l3.forEach((l3, l3i) => {
    const stripe3 = l3i % 2 === 1 ? 'F9FBFD' : 'FFFFFF';
    // L3 always gets a bar — solid for a leaf L3, proportionally segmented
    // for one that rolls up real L4 children.
    rows.push(dataRow(l3.code, l3.name, patternBarCellL3(l3, COLW.pattern, stripe3), l3.mv, { stripe: stripe3 }));
    if (l3.l4 && l3.l4.length) {
      l3.l4.forEach((l4, l4i) => {
        const stripe4 = l4i % 2 === 1 ? 'FBFCFE' : 'FFFFFF';
        // L4 always gets a precise colored text badge, not a bar. Real
        // paragraph indent (not leading spaces) for the hierarchy offset.
        rows.push(dataRow(l4.code, l4.name, patternTextCell(l4.pattern, COLW.pattern, stripe4), l4.mv, { stripe: stripe4, indentDxa: 260 }));
      });
    }
  });
});

const table = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: [COLW.pcf, COLW.name, COLW.pattern, COLW.m, COLW.m, COLW.m, COLW.m, COLW.m, COLW.delta],
  rows,
});

// Stats block: 3-column x 2-row grid, matching the reference exactly
// (label above value, values bold/blue/large).
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
  rows: [
    new TableRow({ children: [statCell('L3 PROCESSES', String(l3Count), 4547), statCell('L4 ACTIVITIES', String(l4Count), 4546), statCell('M1 BASELINE H%', d8.l1mv[0] + '%', 4547)] }),
    new TableRow({ children: [statCell('M3 DESIGN INTENT H%', d8.l1mv[2] + '%', 4547), statCell('M5 LEADING H%', d8.l1mv[4] + '%', 4546), statCell('\u0394 M1 \u2192 M3', (d8.l1mv[2] - d8.l1mv[0]) + '%', 4547)] }),
  ],
});

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
    properties: {
      page: {
        size: { width: 15840, height: 12240, orientation: 'landscape' },
        margin: { top: 1000, right: 1100, bottom: 1000, left: 1100, header: 708, footer: 708 },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: 'The Human-AI Partnership Framework', bold: true, color: NAVY, size: 13 })] }),
          new Paragraph({ children: [new TextRun({ text: `PCF ${d8.code} \u2014 HITL Maturity Assessment`, italics: true, color: '888888', size: 13 })] }),
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
        children: [new TextRun({ text: `PCF ${d8.code} \u2014 ${d8.name}`, font: 'Georgia', bold: true, color: NAVY_D, size: 30 })] }),
      new Paragraph({ spacing: { after: 200 },
        children: [new TextRun({ text: 'HITL Maturity Assessment \u2014 All Processes', italics: true, color: '888888', size: 17 })] }),
      statsTable,
      new Paragraph({ spacing: { before: 200, after: 160 }, children: [
        new TextRun({ text: `This document reports HITL (Human-in-the-Loop) maturity ratios for all of PCF ${d8.code} (${d8.name}) \u2014 ${d8.groups.length} process groups, ${l3Count} Level 3 processes, and ${l4Count} Level 4 activities in total \u2014 at five maturity levels from M1 (Undesigned) through M5 (Leading), with M3 marking HITL Design Intent.`, color: GRAY, size: 18 }),
      ]}),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun({ text: `At M3 (HITL Design Intent), this domain's aggregate human-involvement ratio is `, color: GRAY, size: 18 }),
        new TextRun({ text: `${d8.l1mv[2]}%`, bold: true, color: GRAY, size: 18 }),
        new TextRun({ text: `, down from a `, color: GRAY, size: 18 }),
        new TextRun({ text: `${d8.l1mv[0]}%`, bold: true, color: GRAY, size: 18 }),
        new TextRun({ text: ` undesigned (M1) baseline \u2014 a ${d8.l1mv[2] - d8.l1mv[0]}-point AI convergence opportunity. Mixed-pattern L3 rows reflect an equal-weighted rollup of their real L4 children rather than a force-classified single pattern.`, color: GRAY, size: 18 }),
      ]}),
      new Paragraph({ spacing: { before: 100, after: 40 }, children: [new TextRun({ text: 'HITL Maturity Assessment', bold: true, color: NAVY_D, size: 19 })] }),
      new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: 'H% = Human involvement at each maturity level \u00b7 M3 = HITL Design Intent \u00b7 Full L1\u2192L2\u2192L3\u2192L4 hierarchy', color: '888888', size: 14 })] }),
      table,
      new Paragraph({ spacing: { before: 160, after: 100 }, children: [] }),
      legendTable,
      new Paragraph({
        spacing: { before: 100 },
        children: [new TextRun({
          text: 'Full L1\u2192L2\u2192L3\u2192L4 hierarchy \u00b7 Mixed-pattern rows show an equal-weighted rollup of their real L4 children \u00b7 \u00a9 Timothy P. King 2026 \u00b7 developed with the assistance of Claude (Anthropic)',
          italics: true, color: '888888', size: 13,
        })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(`/home/claude/docbuild/hitl_maturity_${DOMAIN_SLUG}_final.docx`, buf);
  console.log('written');
});
