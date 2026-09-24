// Single, shared change log for every modeled data value corrected on Tim's
// or GiGi's direction — reportsTo edges, WR classification/ceiling values,
// or any other modeled figure, in one place rather than duplicated across
// files. docs/wip/production_changelog.html renders this whole array as
// the Production Changelog page; docs/sandbox/pcf7.html reads it live to
// decide whether an activity's ceiling info box needs a Change History
// link, and to build that link's target (production_changelog.html?q=<id>).
//
// This is a single manually-appended source of truth, not an automatic
// diff/audit pipeline: whoever makes the data edit (Tim or Claude, on
// Tim's or GiGi's direction) adds exactly one entry here, in this one
// file, and every page that needs to show it — the changelog itself, the
// ceiling info box's link — derives from this array at render time rather
// than each keeping its own separate copy. A true automatic-capture
// pipeline (a CI diff step that detects a changed modeled value on push
// and appends here without a human writing the entry) is a further step,
// not yet built — flagged separately, since it would need a real "why"
// for each change, which isn't something a diff alone can produce.
//
// Fields: id, date, requestedBy ("Tim" | "GiGi"), kind (a short slug for
// the modeled-value type — "reportsTo", "wr-ceiling", "wr-current",
// "wr-future", "wr-consequence", etc.), target (whichever keys locate the
// value: domain + activity for WR fields, domain + role for org-taxonomy
// fields), summary, from, to, files touched, source (what raised it),
// reason (what evidence drove it), verified (how it was checked).

const CHANGE_LOG = [
  {
    "id": "CL-001",
    "date": "2026-09-23",
    "requestedBy": "GiGi",
    "kind": "reportsTo",
    "target": { "domain": "7.0", "role": "HRBP Manager" },
    "summary": "HRBP Manager reportsTo corrected from VP People & Culture to Director of HR Ops.",
    "from": "VP People & Culture",
    "to": "Director of HR Ops",
    "files": ["docs/hitl_dashboard_final.html"],
    "source": "reportsTo self-consistency check — see docs/wip/wr_progression_methodology_spec.html “Proven So Far,” confirmed by GiGi directly rather than run through a voted WIP item",
    "reason": "VP People & Culture never appears as C or I across HRBP Manager's 11 owned (Accountable) L3 processes; Director of HR Ops appears 6 times with no other candidate close behind.",
    "verified": "computeSpanOfControl / getRoleTaxonomy re-run clean for PCF 7.0 (no orphans or cycles); requirements register GR-035/GR-040 updated to Implemented."
  },
  {
    "id": "CL-002",
    "date": "2026-09-20",
    "requestedBy": "Tim",
    "kind": "wr-ceiling",
    "target": { "domain": "7.0", "activity": "7.2.1.1" },
    "summary": "7.2.1.1's Progression Ceiling resolved from Open/undecided to Judgment, permanently.",
    "from": "Open / undecided",
    "to": "Judgment",
    "files": ["docs/sandbox/pcf7.html"],
    "source": "This item's individual walkthrough against Working_Relationship_Progression_Methodology.docx had deliberately left the ceiling open/undecided",
    "reason": "A standing strategic/budget-authority duty — the same logic as the rest of 7.1.1's strategy-formation work — holds this ceiling permanently regardless of technical capability. WRPM Table 4 updated to match.",
    "verified": "Ceiling info box on 7.2.1.1 shows the locked note and links to this entry."
  }
];
