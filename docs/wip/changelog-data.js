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
  },
  {
    "id": "CL-006",
    "date": "2026-09-26",
    "requestedBy": "Tim",
    "kind": "crud",
    "target": {
      "domain": "7.0",
      "activity": "7.2.1.2"
    },
    "summary": "Requisition Record's creator moved from 7.1.2 to 7.2.1: the requisition is opened in 7.2.1.2 Open job requisitions.",
    "from": "Created in 7.1.2 Develop and implement workforce planning, policies, and strategies",
    "to": "Created in 7.2.1 Manage employee requisitions (activity 7.2.1.2)",
    "files": [
      "docs/sandbox/pcf7.html"
    ],
    "source": "Tim, Sept 26, 2026, reviewing the HRBP Manager activity-level CRUD draft (docs/wip/activity_crud_hrbp_manager.html).",
    "reason": "None of 7.1.2's sixteen activities opens a requisition; they plan the workforce, programs and policies. 7.2.1.2 is where the requisition record is opened in iCIMS. 7.1.2 keeps its read of the Workforce Plan and now creates nothing.",
    "verified": "Recount: Requisition Record has one creating process (7.2.1); still 37 work products with none created in more than one process. Sandbox views render with no errors; every Current State and Progression Ceiling unchanged."
  },
  {
    "id": "CL-007",
    "date": "2026-09-26",
    "requestedBy": "Tim",
    "kind": "crud",
    "target": {
      "domain": "7.0",
      "role": "HRBP Manager"
    },
    "summary": "Activity-level CRUD confirmed and stored for the HRBP Manager's 11 Accountable processes; those processes' CRUD is now derived from their activities. The Work-Product Catalog moved into the sandbox as master data, with two new work products.",
    "from": "Process-level CRUD stored for all 37 processes; catalog held only as a WIP draft",
    "to": "ACTIVITY_CRUD for 23 activities (7.2.1, 7.3.2, 7.4.1-7.4.4, 7.6.1-7.6.3, 7.8.1, 7.8.3), process CRUD derived for those 11; WORK_PRODUCTS (39 entries, WP-7-38 Staffing Plan and WP-7-39 Performance Program new)",
    "files": [
      "docs/sandbox/pcf7.html",
      "scripts/check-changelog-audit.mjs"
    ],
    "source": "Tim's answers, Sept 26, 2026, to the five questions in docs/wip/activity_crud_hrbp_manager.html.",
    "reason": "Tim set the method: each activity's CRUD is reasoned from the activity, not inherited from its process, and a finished process's CRUD is derived from its activities, process by process. Decisions: 7.6.2's update of the ER Case Record dropped (no activity supports it); all 10 new links accepted; offboarding creates the Separation Record and retirement updates it; an update implies a read; outputs the catalog lacks are added when identified.",
    "verified": "Derived CRUD recomputed for all 11 processes; every activity's links match the reviewed draft. Sandbox views render with no errors; every Current State and Progression Ceiling unchanged. The changelog check now also tracks WORK_PRODUCTS, ACTIVITY_CRUD and process CRUD lines."
  },
  {
    "id": "CL-008",
    "date": "2026-09-26",
    "requestedBy": "Tim",
    "kind": "crud",
    "target": {
      "domain": "7.0"
    },
    "summary": "Every system of record renamed from a vendor to a generic category of system, in the Work-Product Catalog and in all stored process CRUD.",
    "from": "Vendor names, e.g. Workday HCM, iCIMS, Lattice, Visier, ADP Workforce Now",
    "to": "Generic categories, e.g. Core HR System (HCM), Applicant Tracking System, Performance Management System, People Analytics Platform, Payroll System",
    "files": [
      "docs/sandbox/pcf7.html"
    ],
    "source": "Tim, Sept 26, 2026: “Shouldn't the systems be generic since we don't know what systems since the framework isn't based on a specific organization?”",
    "reason": "The framework describes a generic organization, so vendor names implied a technology stack nobody chose. The category (applicant tracking, payroll, and so on) carries what matters: the kind of system holding the authoritative record. Mapping: Workday HCM → Core HR System (HCM); iCIMS → Applicant Tracking System; HireRight → Background Screening Service; Lattice → Performance Management System; Cornerstone OnDemand → Learning Management System; Workday Skills Cloud → Skills Management System; UKG HR Service Delivery → HR Case Management System; NAVEX EthicsPoint → Ethics & Grievance Case System; CobbleStone CLM → Contract Management System; XpertHR → Regulatory Research Service; beqom → Compensation Management System; ADP Workforce Now → Payroll System; Businessolver → Benefits Administration System; Lyra Health → Employee Assistance Provider; UKG Pro Workforce Management → Time & Attendance System; Visier → People Analytics Platform; Qualtrics EmployeeXM → Employee Survey Platform; Equus Software → Global Mobility System; Okta → Identity & Access Management; Staffbase → Employee Communications Platform. Changelog entries before this one keep the vendor names that were in the data at the time.",
    "verified": "No vendor name remains in the sandbox's catalog or CRUD; 39 catalog entries and 68 CRUD strings renamed. Sandbox views render with no errors; every Current State and Progression Ceiling unchanged."
  },
  {
    "id": "CL-009",
    "date": "2026-09-26",
    "requestedBy": "Tim",
    "kind": "wr-current",
    "target": {
      "domain": "7.0"
    },
    "summary": "Reference Model reset: every activity's Current State set to the Human-only baseline. The Progression Ceiling states how far AI may take each activity, and an organization's assessment supplies its own Current State.",
    "from": "Modeled typical practice: Augmentation 36, Judgment 28, Automation 25, Agent-delegation 22, Oversight 7. Per activity: 7.1.1.1 Judgment; 7.1.1.2 Judgment; 7.1.1.3 Judgment; 7.1.1.4 Judgment; 7.1.1.5 Oversight; 7.1.1.6 Judgment; 7.1.1.7 Augmentation; 7.1.1.8 Judgment; 7.1.1.9 Augmentation; 7.1.1.10 Judgment; 7.1.2.1 Judgment; 7.1.2.2 Judgment; 7.1.2.3 Judgment; 7.1.2.4 Augmentation; 7.1.2.5 Augmentation; 7.1.2.6 Agent-delegation; 7.1.2.7 Augmentation; 7.1.2.8 Augmentation; 7.1.2.9 Augmentation; 7.1.2.10 Augmentation; 7.1.2.11 Agent-delegation; 7.1.2.12 Augmentation; 7.1.2.13 Augmentation; 7.1.2.14 Agent-delegation; 7.1.2.15 Agent-delegation; 7.1.2.16 Augmentation; 7.1.3.1 Agent-delegation; 7.1.3.2 Agent-delegation; 7.1.3.3 Augmentation; 7.1.3.4 Judgment; 7.1.4 Judgment; 7.2.1.1 Judgment; 7.2.1.2 Automation; 7.2.1.3 Oversight; 7.2.1.4 Automation; 7.2.1.5 Automation; 7.2.1.6 Automation; 7.2.1.7 Automation; 7.2.2.1 Augmentation; 7.2.2.2 Augmentation; 7.2.2.3 Agent-delegation; 7.2.2.4 Augmentation; 7.2.2.5 Agent-delegation; 7.2.2.6 Agent-delegation; 7.2.3.1 Judgment; 7.2.3.2 Judgment; 7.2.3.3 Agent-delegation; 7.2.3.4 Judgment; 7.2.4.1 Agent-delegation; 7.2.4.2 Judgment; 7.2.4.3 Oversight; 7.2.5.1 Automation; 7.2.5.2 Automation; 7.2.5.3 Automation; 7.2.5.4 Automation; 7.3.1.1 Augmentation; 7.3.1.2 Agent-delegation; 7.3.1.3 Augmentation; 7.3.2.1 Judgment; 7.3.2.2 Judgment; 7.3.2.3 Augmentation; 7.3.2.4 Agent-delegation; 7.3.3.1 Augmentation; 7.3.3.2 Judgment; 7.3.3.3 Agent-delegation; 7.3.3.4 Judgment; 7.3.4.1 Augmentation; 7.3.4.2 Agent-delegation; 7.3.4.3 Agent-delegation; 7.3.4.4 Augmentation; 7.3.4.5 Augmentation; 7.3.4.6 Automation; 7.3.4.7 Agent-delegation; 7.4.1 Judgment; 7.4.2 Judgment; 7.4.3 Judgment; 7.4.4 Judgment; 7.4.5 Agent-delegation; 7.5.1.1 Judgment; 7.5.1.2 Augmentation; 7.5.1.3 Augmentation; 7.5.1.4 Augmentation; 7.5.1.5 Automation; 7.5.1.6 Automation; 7.5.1.7 Augmentation; 7.5.1.8 Augmentation; 7.5.1.9 Augmentation; 7.5.2.1 Automation; 7.5.2.2 Automation; 7.5.2.3 Automation; 7.5.2.4 Automation; 7.5.3.1 Oversight; 7.5.3.2 Augmentation; 7.5.4 Automation; 7.5.5 Agent-delegation; 7.6.1 Judgment; 7.6.2.1 Automation; 7.6.2.2 Automation; 7.6.2.3 Automation; 7.6.2.4 Augmentation; 7.6.3.1 Oversight; 7.7.1 Agent-delegation; 7.7.2 Oversight; 7.7.3 Automation; 7.7.4 Automation; 7.7.5 Augmentation; 7.7.6 Automation; 7.7.7.1 Augmentation; 7.7.7.2 Augmentation; 7.7.7.3 Judgment; 7.7.7.4 Augmentation; 7.7.7.5 Automation; 7.7.8.1 Automation; 7.7.8.2 Augmentation; 7.7.8.3 Oversight; 7.8.1 Augmentation; 7.8.2 Agent-delegation; 7.8.3 Agent-delegation",
    "to": "Human-only for all 118 activities",
    "files": [
      "docs/sandbox/pcf7.html"
    ],
    "source": "Tim, Sept 26, 2026: “I would initialize our current reference to the Human-only stage. The ceiling is our reference point for what needs to stay human by design.” GR-052; docs/wip/reference_model_assessment_layer_spec.html.",
    "reason": "A generic framework cannot know how any organization works today; the retired values were Claude's modeled judgments of typical practice. The reference now states only what is true of the work, and each organization's Current State comes from its assessment. The retired values are kept above, activity by activity.",
    "verified": "All 118 WR_DATA entries read Human-only; every Progression Ceiling, Consequence of Error and ceiling factor unchanged. Sandbox views render with no errors; selecting an organization overlays its assessed values and switching back restores the baseline."
  },
  {
    "id": "CL-010",
    "date": "2026-09-29",
    "requestedBy": "Tim",
    "kind": "wr-note",
    "target": { "domain": "7.0", "activity": "7.2.1.1" },
    "summary": "Wording only: 7.2.1.1's ceiling note now says \u201cWRPM section 3\u201d instead of \u201cWRPM \u00a73\u201d.",
    "from": "superseding WRPM \u00a73's earlier open/undecided flag",
    "to": "superseding WRPM section 3's earlier open/undecided flag",
    "files": ["docs/sandbox/pcf7.html"],
    "source": "Tim, Sept 29, 2026: write section references out as \u201csection\u201d rather than the \u00a7 sign, across the register, specs and sandbox.",
    "reason": "Readability. The note sits on a working-relationship data line, so the changelog check requires an entry even for a wording change.",
    "verified": "7.2.1.1's Progression Ceiling, Current State, Consequence of Error and ceiling factors are unchanged; only the note's wording differs. reference-wr.json is unaffected."
  },
  {
    "id": "CL-011",
    "date": "2026-09-30",
    "requestedBy": "Tim",
    "kind": "wr-factor",
    "target": {
      "domain": "7.0",
      "activity": "7.4.4"
    },
    "summary": "7.4.4's ceiling factors no longer include “Already at Top of Ramp”, and its ceiling note no longer refers to the M1–M5 maturity curve.",
    "from": "Factors: Standing Legal / Fiduciary Duty, Relational / Emotional Stakes, Human Judgment Floor, Already at Top of Ramp. Note opened: “Already at its human-side ceiling. The Accountable role (HRBP Manager) never changes across the real M1→M5 curve (95%→68%) — the mirror case to an activity already at Automation with no further runway.”",
    "to": "Factors: Standing Legal / Fiduciary Duty, Relational / Emotional Stakes, Human Judgment Floor. Note opens at “Grievances routinely stem from CBA violations or protected-activity retaliation…”, the rest unchanged.",
    "files": [
      "docs/sandbox/pcf7.html",
      "docs/sandbox/reference-wr.json"
    ],
    "source": "Tim, Sept 30, 2026, reviewing 7.4.4's ceiling panel after the grievance pilot pack flagged the factor: remove the M1–M5 maturity references, and remove Already at Top of Ramp if it is incorrect.",
    "reason": "Already at Top of Ramp describes an activity whose ceiling is Automation, with no further runway; 7.4.4's ceiling is Judgment. It was the only one of the 35 activities carrying that factor without an Automation ceiling. The M1–M5 maturity model was retired (Sept 25, 2026: Current State and Progression Ceiling only), and the sentence restated the old model rather than a reason for the ceiling. The three remaining factors are what hold the ceiling at Judgment.",
    "verified": "7.4.4's Progression Ceiling (Judgment), Current State and Consequence of Error (Critical) are unchanged. reference-wr.json regenerated with scripts/build-reference-wr.mjs; 7.4.4 remains not overridable (Critical), so no ceiling override is affected."
  },
  {
    "id": "CL-012",
    "date": "2026-09-30",
    "requestedBy": "Tim",
    "kind": "wr-note",
    "target": {
      "domain": "7.0",
      "activity": "7.1.2.1, 7.1.2.5, 7.1.2.11, 7.2.3.2, 7.4.5, 7.5.3.1"
    },
    "summary": "Wording only: six ceiling notes now say “not a temporary gap” instead of “not a maturity gap”.",
    "from": "…the ceiling, not a maturity gap.",
    "to": "…the ceiling, not a temporary gap.",
    "files": [
      "docs/sandbox/pcf7.html"
    ],
    "source": "Tim, Sept 30, 2026, after CL-011: remove the retired maturity vocabulary from the ceiling notes.",
    "reason": "The maturity model (M1–M5) was retired on Sept 25, 2026 in favour of Current State and Progression Ceiling. The phrase meant a real ceiling rather than a temporary shortfall; the new wording says that without the retired term.",
    "verified": "Ceilings, Current State, Consequence of Error and ceiling factors of all six activities are unchanged; only the note wording differs. reference-wr.json does not carry notes and is unaffected."
  },
  {
    "id": "CL-013",
    "date": "2026-09-30",
    "requestedBy": "Tim",
    "kind": "wr-note",
    "target": {
      "domain": "7.0",
      "activity": "7.2.1.1, 7.2.1.3, 7.2.3.3, 7.2.5.1, 7.3.2.3, 7.3.4.5, 7.3.4.6, 7.4.1, 7.4.2"
    },
    "summary": "Wording only: nine ceiling notes no longer carry names, dates or change history — only the reason the ceiling sits where it does.",
    "from": "Notes opening or closing with decision records, e.g. “Resolved by Tim (Sept 20, 2026), superseding WRPM section 3's earlier open/undecided flag. See CL-002…”, “Decided by Tim (Sept 25, 2026), replacing the earlier Agent-delegation ceiling. See CL-004…”, “Moved up to High on individual walkthrough (Sept 14, 2026) —”, “Moved to Critical (Tim, Sept 16, 2026) —”.",
    "to": "The same notes with the decision records removed; each keeps its reason unchanged in substance.",
    "files": [
      "docs/sandbox/pcf7.html"
    ],
    "source": "Tim, Sept 30, 2026, reviewing 7.2.1.1 in ABC Test Org's Assess panel: remove references to names and history from assessment cards.",
    "reason": "Reference notes are read by every assessed organization. Who decided a ceiling and what it replaced is maintenance history, already recorded in this changelog (CL-002, CL-004 and the Sept 14 and 16 walkthroughs); on an organization's card it reads as internal record-keeping and names people.",
    "verified": "Ceilings, Current State, Consequence of Error and ceiling factors of all nine activities are unchanged; only note wording differs. reference-wr.json does not carry notes and is unaffected. No ceiling note now names a person, a date or a changelog entry."
  },
  {
    "id": "CL-014",
    "date": "2026-10-02",
    "requestedBy": "Tim",
    "kind": "crud",
    "target": {
      "domain": "7.0",
      "role": "All Accountable roles other than the HRBP Manager"
    },
    "summary": "Activity-level CRUD confirmed and stored for the remaining 26 processes (95 activities); every process's CRUD is now derived from its activities. Ten work products added to the catalog, and nine old process links corrected.",
    "from": "Process-level CRUD stored for 26 processes; 39 work products; Performance Program with no creator; Workforce Plan created in 7.1.1, Policy Update Record in 7.1.3, Offer Letter in 7.2.3, Background Check Record in 7.2.4, Employee Master Record in 7.7.3, Retention Risk Score in 7.5.3; 7.3.3 updating the Performance Review; 7.5.3 reading it",
    "to": "ACTIVITY_CRUD for all 118 activities and no stored process CRUD; 49 work products (WP-7-40 HR Strategy, WP-7-41 Job Profile, WP-7-42 Succession Plan, WP-7-43 Compensation Plan, WP-7-44 Benefits Plan, WP-7-45 Benefits Claim, WP-7-46 HR Program, WP-7-47 Onboarding Program, WP-7-48 Learning Program, WP-7-49 Vendor Agreement) and a new system category, Document Management System; Performance Program created in 7.1.2.9; Workforce Plan created in 7.1.2.1, Policy Update Record in 7.1.2.10, Offer Letter in 7.2.4.1, Background Check Record in 7.2.5.1, Employee Master Record in 7.2.4.3, Retention Risk Score in 7.7.8.2; 7.3.3 and 7.5.3 no longer touch the Performance Review",
    "files": [
      "docs/sandbox/pcf7.html"
    ],
    "source": "Tim, Oct 2, 2026: “Accept all” to the six questions in docs/wip/activity_crud_remaining_roles.html.",
    "reason": "Same method as CL-007: each activity's CRUD is reasoned from the activity, never inherited from its process. Each correction moves a create to the activity that produces the work product, or drops a link no activity supports. Outputs other activities rely on were added to the catalog; five pieces of single-activity working material were left out.",
    "verified": "All 37 processes derive their CRUD from their activities, with no warning from applyActivityCrud(). Across the 118 activities every work product has exactly one creating process. 209 new activity links match the reviewed draft. Sandbox views and the Work-Product Catalog render with no errors; every Current State and Progression Ceiling unchanged."
  }
];
