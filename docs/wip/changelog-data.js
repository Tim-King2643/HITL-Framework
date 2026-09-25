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
// "wr-consequence", "wr-model", "crud", etc.), target (whichever keys locate the
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
  },
  {
    "id": "CL-003",
    "date": "2026-09-25",
    "requestedBy": "Tim",
    "kind": "wr-model",
    "target": {
      "domain": "7.0"
    },
    "summary": "Future State retired from the working-relationship model: the future field removed from all 118 WR_DATA entries. Each activity now carries Current State and Progression Ceiling only.",
    "from": "Current State, Future State, Progression Ceiling",
    "to": "Current State, Progression Ceiling",
    "files": [
      "docs/sandbox/pcf7.html",
      "scripts/check-changelog-audit.mjs"
    ],
    "source": "Tim, Sept 25, 2026: “We are not using ‘Future State’.” Requirement GR-049 in docs/wip/requirements_register.html.",
    "reason": "No sandbox view displayed Future State, and in 117 of 118 activities it equaled the Progression Ceiling. The one exception, 7.2.1.3 (Future State Oversight, ceiling Agent-delegation), keeps its ceiling; the governance choice to hold it at Oversight is already carried by its ceiling factors (governance, technical) and ceiling note. Whether its ceiling should drop to Oversight is open for Tim and GiGi.",
    "verified": "Every activity's Current State and Progression Ceiling compared before and after: all 118 unchanged. Sandbox views render with no errors. The CI audit now tracks rel and ceiling only."
  },
  {
    "id": "CL-004",
    "date": "2026-09-25",
    "requestedBy": "Tim",
    "kind": "wr-ceiling",
    "target": {
      "domain": "7.0",
      "activity": "7.2.1.3"
    },
    "summary": "7.2.1.3 (Approve job requisition) Progression Ceiling lowered from Agent-delegation to Oversight, so the activity is now at its ceiling.",
    "from": "Agent-delegation",
    "to": "Oversight",
    "files": [
      "docs/sandbox/pcf7.html"
    ],
    "source": "Tim, Sept 25, 2026, settling the open question left by the Future State cleanup (GR-049, CL-003): the retired Future State had held this activity at Oversight while its ceiling said Agent-delegation.",
    "reason": "Consequence of Error is High: this is the budget-commitment gate, and reversing an approved-then-wrong hire is a real financial and organizational cost. Human sign-off stays as a governance choice, so the ceiling is Oversight. Ceiling factors narrowed to Governance / Sign-off Choice (Technical Readiness Gap removed, since technology is no longer what sets the limit).",
    "verified": "Sandbox views render with no errors; 7.2.1.3's ceiling info box shows the new note and links to this entry."
  },
  {
    "id": "CL-005",
    "date": "2026-09-25",
    "requestedBy": "Tim",
    "kind": "crud",
    "target": {
      "domain": "7.0"
    },
    "summary": "Work-product CRUD corrected from the catalog review: two merges, one rename, one system of record per work product, and one creating process per work product. 39 work products become 37.",
    "from": "Candidate Profile and Applicant Record; HR Report and HR Analytics Report; T&A Record; Job Posting (iCIMS / LinkedIn Recruiter); Offer Letter (iCIMS / DocuSign); Payroll Record created in 7.5.1 and 7.5.4; HR Analytics Report created in 7.7.7 and 7.7.8",
    "to": "Applicant Record (created 7.2.5; updated 7.2.2, 7.2.3, 7.2.4, 7.2.5); HR Analytics Report (Visier; created 7.7.8; updated 7.7.1); Time and Attendance Record; Job Posting (iCIMS); Offer Letter (iCIMS); Payroll Record created in 7.5.4, updated in 7.5.1; 7.7.7 no longer creates a report",
    "files": [
      "docs/sandbox/pcf7.html"
    ],
    "source": "Tim's answers, Sept 25, 2026, to the five review questions in docs/wip/work_product_catalog.html (item A1 of the Work Product spec).",
    "reason": "Applicant Record's creator follows activity 7.2.5.2 “Create applicant record.” Payroll Record's creator is 7.5.4 Administer Payroll; 7.5.1 feeds reward payouts through 7.5.1.5. HR Analytics Report is produced by 7.7.8.2 and 7.7.8.3; none of 7.7.7's activities produces a report. LinkedIn Recruiter and DocuSign are channels, not systems of record.",
    "verified": "Recount after the change: 113 CRUD entries, 37 work products, none with more than one creating process. Sandbox views render with no errors. Every Current State and Progression Ceiling unchanged."
  }
];
