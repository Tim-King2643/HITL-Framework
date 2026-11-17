// ABC Test Org test data for process group 7.2 (Nov 17, 2026): one scenario per activity, so every input and every
// outcome shows at least once. Built from the sandbox's own model (stageEls / deriveGrid), loaded by abc_test_data_loader.html.
window.ABC_TEST_DATA = {
 "org": "abc-test-org",
 "group": "7.2",
 "built": "2026-11-17",
 "scenarios": [
  {
   "code": "7.2.1.1",
   "name": "Align staffing plan to work force plan and business unit strategies/resource needs",
   "cur": "Judgment",
   "say": "The gate clears: every check is met or Ready.",
   "out": "Clears"
  },
  {
   "code": "7.2.1.2",
   "name": "Open job requisitions",
   "cur": "Oversight",
   "say": "Holds on the technical check: the audit-pass rate misses its threshold.",
   "out": "Holds: not met"
  },
  {
   "code": "7.2.1.3",
   "name": "Approve job requisition",
   "cur": "Augmentation",
   "say": "High work: the weakest link holds the step, one role Not Ready on Capability / Skill.",
   "out": "Holds: Not Ready"
  },
  {
   "code": "7.2.1.4",
   "name": "Post job requisitions",
   "cur": "Automation",
   "say": "At its Progression Ceiling: no next step.",
   "out": "At its ceiling"
  },
  {
   "code": "7.2.1.5",
   "name": "Modify job requisitions",
   "cur": "Agent-delegation",
   "say": "Holds on insufficient evidence: the in-stage audit is below its minimum volume.",
   "out": "Holds: insufficient evidence"
  },
  {
   "code": "7.2.1.6",
   "name": "Notify hiring manager",
   "cur": null,
   "say": "Unassessed: no Current State yet.",
   "out": "Unassessed"
  },
  {
   "code": "7.2.1.7",
   "name": "Manage requisition dates",
   "cur": "Judgment",
   "say": "Assessed, with nothing assessed for its next step yet (a dashed square).",
   "out": "Next step not yet assessed"
  },
  {
   "code": "7.2.2.1",
   "name": "Determine recruitment methods and channels",
   "cur": "Automation",
   "say": "A ceiling override raises the ceiling to Automation, with a review recorded.",
   "out": "Ceiling override"
  },
  {
   "code": "7.2.2.2",
   "name": "Perform recruiting activities/events",
   "cur": "Automation",
   "say": "Past its Progression Ceiling with no override: a finding.",
   "out": "Past the ceiling"
  },
  {
   "code": "7.2.2.3",
   "name": "Develop and maintain candidate pool",
   "cur": "Augmentation",
   "say": "Clears with conditions, each with its required action recorded.",
   "out": "Clears with conditions"
  },
  {
   "code": "7.2.2.4",
   "name": "Manage recruitment vendors",
   "cur": "Oversight",
   "say": "An element led past its own ceiling; readiness by role below High, one Conditional finding still missing its required action.",
   "out": "Clears with conditions; element past its ceiling"
  },
  {
   "code": "7.2.2.5",
   "name": "Manage employee referral programs",
   "cur": "Human-only",
   "say": "Assessed at the Human-only baseline; readiness assessed but the technical replay not yet, so the step holds gray.",
   "out": "Holds: insufficient evidence"
  },
  {
   "code": "7.2.2.6",
   "name": "Manage recruitment channels",
   "cur": "Agent-delegation",
   "say": "Holds: the discrepancy log has an open Serious entry.",
   "out": "Holds: not met"
  },
  {
   "code": "7.2.3.1",
   "name": "Identify and deploy candidate selection tools",
   "cur": "Augmentation",
   "say": "At its Progression Ceiling: no next step.",
   "out": "At its ceiling"
  },
  {
   "code": "7.2.3.2",
   "name": "Interview candidates",
   "cur": "Judgment",
   "say": "High work that clears: governance oversight Ready and the evidence signed off.",
   "out": "Clears"
  },
  {
   "code": "7.2.3.3",
   "name": "Test candidates",
   "cur": "Augmentation",
   "say": "Holds on Trust / Evidence Quality, a candidate hard gate, at Insufficient Evidence.",
   "out": "Holds: insufficient evidence"
  },
  {
   "code": "7.2.3.4",
   "name": "Select and reject candidates",
   "cur": "Judgment",
   "say": "GiGi’s Critical pilot: clears with conditions, with full evidence records on every dimension.",
   "out": "Clears with conditions"
  },
  {
   "code": "7.2.4.1",
   "name": "Draw up and make offer",
   "cur": "Agent-delegation",
   "say": "Clears for Automation: 1,000+ instances audited and signed off.",
   "out": "Clears"
  },
  {
   "code": "7.2.4.2",
   "name": "Negotiate offer",
   "cur": "Augmentation",
   "say": "High work at its Progression Ceiling.",
   "out": "At its ceiling"
  },
  {
   "code": "7.2.4.3",
   "name": "Hire candidate",
   "cur": "Oversight",
   "say": "Holds Not Ready on Psychological Safety and Change Capacity; the technical check not yet run.",
   "out": "Holds: Not Ready"
  },
  {
   "code": "7.2.5.1",
   "name": "Obtain candidate background information",
   "cur": "Oversight",
   "say": "High work held twice: exception-detection recall misses, and governance oversight is Not Ready.",
   "out": "Holds: not met"
  },
  {
   "code": "7.2.5.2",
   "name": "Create applicant record",
   "cur": "Automation",
   "say": "At its Progression Ceiling.",
   "out": "At its ceiling"
  },
  {
   "code": "7.2.5.3",
   "name": "Manage/Track applicant data",
   "cur": null,
   "say": "Unassessed: no Current State yet.",
   "out": "Unassessed"
  },
  {
   "code": "7.2.5.4",
   "name": "Archive and retain records of non-hires",
   "cur": "Augmentation",
   "say": "Technical check met by a shadow run; readiness not yet assessed, so the step holds gray.",
   "out": "Holds: insufficient evidence"
  }
 ],
 "assess": [
  {
   "org": "abc-test-org",
   "code": "7.2.1.1",
   "current": "Judgment",
   "el": {
    "Research": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Evaluate": [
     "Human-led",
     "system",
     "System logs, Q3 2026"
    ],
    "Draft": [
     "Human",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Verify": [
     "Human",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Decide": [
     "Human",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Produce / Execute": [
     "Human",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Communicate": [
     "Human",
     "system",
     "System logs, Q3 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "HRBP Manager",
   "source": "HRBP Manager",
   "note": "Test data. The gate clears: every check is met or Ready."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.2",
   "current": "Oversight",
   "el": {
    "Research": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Draft": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Verify": [
     "Human",
     "system",
     "System logs, Q3 2026"
    ],
    "Produce / Execute": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Communicate": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ]
   },
   "confidence": "medium",
   "sourceRole": "HRBP Manager",
   "source": "HRBP Manager",
   "note": "Test data. Holds on the technical check: the audit-pass rate misses its threshold."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.3",
   "current": "Augmentation",
   "el": {
    "Research": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Evaluate": [
     "Human-led",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Draft": [
     "Human-led",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Verify": [
     "Human-led",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Decide": [
     "Human",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Produce / Execute": [
     "Human-led",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Communicate": [
     "Human-led",
     "interview",
     "Interviews with the team, Oct 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "HRBP Manager",
   "source": "HRBP Manager",
   "note": "Test data. High work: the weakest link holds the step, one role Not Ready on Capability / Skill."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.4",
   "current": "Automation",
   "el": {
    "Research": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Draft": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Verify": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Produce / Execute": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. At its Progression Ceiling: no next step."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.5",
   "current": "Agent-delegation",
   "el": {
    "Research": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Evaluate": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Draft": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Verify": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Decide": [
     "AI-led",
     "system",
     "System logs, Q3 2026"
    ],
    "Produce / Execute": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Communicate": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ]
   },
   "confidence": "medium",
   "sourceRole": "HRBP Manager",
   "source": "HRBP Manager",
   "note": "Test data. Holds on insufficient evidence: the in-stage audit is below its minimum volume."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.7",
   "current": "Judgment",
   "el": {
    "Research": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Evaluate": [
     "Human-led",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Draft": [
     "Human",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Verify": [
     "Human",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Decide": [
     "Human",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Produce / Execute": [
     "Human",
     "system",
     "System logs, Q3 2026"
    ],
    "Communicate": [
     "Human",
     "audit",
     "Internal audit sample, Oct 2026"
    ]
   },
   "confidence": "low",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. Assessed, with nothing assessed for its next step yet (a dashed square)."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.1",
   "current": "Automation",
   "el": {
    "Research": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Evaluate": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Draft": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Verify": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Decide": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Produce / Execute": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Communicate": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "Director of TA",
   "source": "Director of TA",
   "note": "Test data. A ceiling override raises the ceiling to Automation, with a review recorded."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.2",
   "current": "Automation",
   "el": {
    "Research": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Evaluate": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Draft": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Verify": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Decide": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Produce / Execute": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Communicate": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ]
   },
   "confidence": "medium",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. Past its Progression Ceiling with no override: a finding."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.3",
   "current": "Augmentation",
   "el": {
    "Research": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Evaluate": [
     "Human-led",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Draft": [
     "Human-led",
     "system",
     "System logs, Q3 2026"
    ],
    "Verify": [
     "Human-led",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Decide": [
     "Human",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Produce / Execute": [
     "Human-led",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Communicate": [
     "Human-led",
     "observed",
     "Observed instances, Oct 2026"
    ]
   },
   "confidence": "medium",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. Clears with conditions, each with its required action recorded."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.4",
   "current": "Oversight",
   "el": {
    "Research": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Evaluate": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Draft": [
     "AI-led",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Verify": [
     "AI-led",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Decide": [
     "Human",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Produce / Execute": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Communicate": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ]
   },
   "confidence": "medium",
   "sourceRole": "Director of TA",
   "source": "Director of TA",
   "note": "Test data. An element led past its own ceiling; readiness by role below High, one Conditional finding still missing its required action."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.5",
   "current": "Human-only",
   "el": {
    "Research": [
     "Human",
     "system",
     "System logs, Q3 2026"
    ],
    "Evaluate": [
     "Human",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Draft": [
     "Human",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Verify": [
     "Human",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Decide": [
     "Human",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Produce / Execute": [
     "Human",
     "system",
     "System logs, Q3 2026"
    ],
    "Communicate": [
     "Human",
     "audit",
     "Internal audit sample, Oct 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. Assessed at the Human-only baseline; readiness assessed but the technical replay not yet, so the step holds gray."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.6",
   "current": "Agent-delegation",
   "el": {
    "Research": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Evaluate": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Draft": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Verify": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Decide": [
     "AI-led",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Produce / Execute": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Communicate": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ]
   },
   "confidence": "medium",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. Holds: the discrepancy log has an open Serious entry."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.1",
   "current": "Augmentation",
   "el": {
    "Research": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Evaluate": [
     "Human-led",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Draft": [
     "Human-led",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Verify": [
     "Human-led",
     "system",
     "System logs, Q3 2026"
    ],
    "Decide": [
     "Human",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Produce / Execute": [
     "Human-led",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Communicate": [
     "Human-led",
     "document",
     "Process documentation, rev. 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "Director of TA",
   "source": "Director of TA",
   "note": "Test data. At its Progression Ceiling: no next step."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.2",
   "current": "Judgment",
   "el": {
    "Research": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Evaluate": [
     "Human-led",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Draft": [
     "Human",
     "system",
     "System logs, Q3 2026"
    ],
    "Verify": [
     "Human",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Decide": [
     "Human",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Produce / Execute": [
     "Human",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Communicate": [
     "Human",
     "observed",
     "Observed instances, Oct 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. High work that clears: governance oversight Ready and the evidence signed off."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.3",
   "current": "Augmentation",
   "el": {
    "Research": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Evaluate": [
     "Human-led",
     "system",
     "System logs, Q3 2026"
    ],
    "Draft": [
     "Human-led",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Verify": [
     "Human-led",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Decide": [
     "Human",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Produce / Execute": [
     "Human-led",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Communicate": [
     "Human-led",
     "system",
     "System logs, Q3 2026"
    ]
   },
   "confidence": "medium",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. Holds on Trust / Evidence Quality, a candidate hard gate, at Insufficient Evidence."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.4",
   "current": "Judgment",
   "el": {
    "Research": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Evaluate": [
     "Human-led",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Draft": [
     "Human",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Verify": [
     "Human",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Decide": [
     "Human",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Produce / Execute": [
     "Human",
     "system",
     "System logs, Q3 2026"
    ],
    "Communicate": [
     "Human",
     "audit",
     "Internal audit sample, Oct 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "Director of TA",
   "source": "Director of TA",
   "note": "Test data. GiGi’s Critical pilot: clears with conditions, with full evidence records on every dimension."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.4.1",
   "current": "Agent-delegation",
   "el": {
    "Research": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Evaluate": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Draft": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Verify": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Decide": [
     "AI-led",
     "system",
     "System logs, Q3 2026"
    ],
    "Produce / Execute": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Communicate": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. Clears for Automation: 1,000+ instances audited and signed off."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.4.2",
   "current": "Augmentation",
   "el": {
    "Research": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Evaluate": [
     "Human-led",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Draft": [
     "Human-led",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Verify": [
     "Human-led",
     "system",
     "System logs, Q3 2026"
    ],
    "Decide": [
     "Human",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Produce / Execute": [
     "Human-led",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Communicate": [
     "Human-led",
     "document",
     "Process documentation, rev. 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "Director of TA",
   "source": "Director of TA",
   "note": "Test data. High work at its Progression Ceiling."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.4.3",
   "current": "Oversight",
   "el": {
    "Research": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Evaluate": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Draft": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Verify": [
     "AI",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Decide": [
     "Human",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Produce / Execute": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Communicate": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ]
   },
   "confidence": "medium",
   "sourceRole": "Recruiter",
   "source": "Recruiter",
   "note": "Test data. Holds Not Ready on Psychological Safety and Change Capacity; the technical check not yet run."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.5.1",
   "current": "Oversight",
   "el": {
    "Research": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Evaluate": [
     "AI-led",
     "system",
     "System logs, Q3 2026"
    ],
    "Draft": [
     "AI-led",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Verify": [
     "AI-led",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Decide": [
     "Human",
     "audit",
     "Internal audit sample, Oct 2026"
    ],
    "Produce / Execute": [
     "AI",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Communicate": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "Director of TA",
   "source": "Director of TA",
   "note": "Test data. High work held twice: exception-detection recall misses, and governance oversight is Not Ready."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.5.2",
   "current": "Automation",
   "el": {
    "Research": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Verify": [
     "AI",
     "system",
     "System logs, Q3 2026"
    ],
    "Produce / Execute": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Communicate": [
     "AI",
     "document",
     "Process documentation, rev. 2026"
    ]
   },
   "confidence": "high",
   "sourceRole": "HRIS Analyst",
   "source": "HRIS Analyst",
   "note": "Test data. At its Progression Ceiling."
  },
  {
   "org": "abc-test-org",
   "code": "7.2.5.4",
   "current": "Augmentation",
   "el": {
    "Research": [
     "AI",
     "interview",
     "Interviews with the team, Oct 2026"
    ],
    "Evaluate": [
     "Human-led",
     "document",
     "Process documentation, rev. 2026"
    ],
    "Verify": [
     "Human-led",
     "observed",
     "Observed instances, Oct 2026"
    ],
    "Decide": [
     "Human",
     "system",
     "System logs, Q3 2026"
    ],
    "Produce / Execute": [
     "Human-led",
     "audit",
     "Internal audit sample, Oct 2026"
    ]
   },
   "confidence": "medium",
   "sourceRole": "HRIS Analyst",
   "source": "HRIS Analyst",
   "note": "Test data. Technical check met by a shadow run; readiness not yet assessed, so the step holds gray."
  }
 ],
 "del": [
  "7.2.1.6",
  "7.2.5.3"
 ],
 "override": [
  {
   "org": "abc-test-org",
   "code": "7.2.2.1",
   "level": "Automation",
   "factor": "technical",
   "approverRole": "Director of TA",
   "evidence": "Test data. Six months of agent-delegated runs (1,240 instances) with no exception the agent failed to flag; the technical factor no longer holds for this organization."
  }
 ],
 "review": [
  {
   "org": "abc-test-org",
   "code": "7.2.2.1",
   "confirmedRole": "Director of TA",
   "note": "Test data. Quarterly review: the evidence still holds."
  }
 ],
 "ready": [
  {
   "org": "abc-test-org",
   "code": "7.2.1.1",
   "to": "Augmentation",
   "cells": {
    "HRBP Manager|clarity": "ready",
    "HRBP Manager|authority": "ready",
    "HRBP Manager|skill": "ready",
    "HRBP Manager|fluency": "ready",
    "HRBP Manager|safety": "ready",
    "HRBP Manager|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready"
   },
   "dims": {
    "HRBP Manager|clarity": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|authority": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|skill": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|fluency": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|safety": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|capacity": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "",
    "agencyBy": {
     "HRBP Manager": "Test data. HRBP Manager keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.2",
   "to": "Agent-delegation",
   "cells": {
    "HRBP Manager|clarity": "ready",
    "HR Generalist|clarity": "ready",
    "HRBP Manager|authority": "ready",
    "HR Generalist|authority": "ready",
    "HRBP Manager|skill": "ready",
    "HR Generalist|skill": "ready",
    "HRBP Manager|fluency": "ready",
    "HR Generalist|fluency": "ready",
    "HRBP Manager|safety": "ready",
    "HR Generalist|safety": "ready",
    "HRBP Manager|capacity": "ready",
    "HR Generalist|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready"
   },
   "dims": {
    "HRBP Manager|clarity": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|clarity": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|authority": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|authority": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|skill": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|skill": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|fluency": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|fluency": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|safety": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|safety": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|capacity": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|capacity": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "",
    "agencyBy": {
     "HRBP Manager": "Test data. HRBP Manager keeps the judgment at Verify and can set aside the AI output with a reason; the step changes what they review, not what they answer for.",
     "HR Generalist": "Test data. HR Generalist keeps the judgment at Verify and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.3",
   "to": "Oversight",
   "cells": {
    "HRBP Manager|clarity": "ready",
    "HRBP Manager|authority": "ready",
    "HRBP Manager|skill": "not",
    "HRBP Manager|fluency": "ready",
    "HRBP Manager|safety": "ready",
    "HRBP Manager|capacity": "cond",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "cond",
    "_|evidence": "ready",
    "_over|manager": "ready"
   },
   "dims": {
    "HRBP Manager|clarity": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|authority": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|skill": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Not yet in place: capability / skill for HRBP Manager at Oversight.",
     "act": "Close the gap before the step: targeted coaching and scenario practice for HRBP Manager.",
     "owner": "Director of HR Ops",
     "move": "Reassess in 60 days."
    },
    "HRBP Manager|fluency": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|safety": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|capacity": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Partly in place: capacity / workload for HRBP Manager at Oversight.",
     "act": "Before or during the step: targeted coaching and scenario practice for HRBP Manager.",
     "owner": "Director of HR Ops",
     "move": "Confirm within 30 days of the step."
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Partly in place: change capacity for the organization at Oversight.",
     "act": "Before or during the step: targeted organizational action for the organization.",
     "owner": "Director of HR Ops",
     "move": "Confirm within 30 days of the step."
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "Director of HR Ops",
    "agencyBy": {
     "HRBP Manager": "Test data. HRBP Manager keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.5",
   "to": "Automation",
   "cells": {
    "HRBP Manager|clarity": "ready",
    "HR Generalist|clarity": "ready",
    "HRBP Manager|authority": "ready",
    "HR Generalist|authority": "ready",
    "HRBP Manager|skill": "ready",
    "HR Generalist|skill": "ready",
    "HRBP Manager|fluency": "ready",
    "HR Generalist|fluency": "ready",
    "HRBP Manager|safety": "ready",
    "HR Generalist|safety": "ready",
    "HRBP Manager|capacity": "ready",
    "HR Generalist|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready"
   },
   "dims": {
    "HRBP Manager|clarity": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|clarity": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|authority": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|authority": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|skill": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|skill": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|fluency": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|fluency": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|safety": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|safety": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HRBP Manager|capacity": {
     "ev": "Test data. Evidence reviewed for HRBP Manager.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|capacity": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "",
    "agencyBy": {
     "HRBP Manager": "Test data. HRBP Manager keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for.",
     "HR Generalist": "Test data. HR Generalist keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.3",
   "to": "Oversight",
   "cells": {
    "Recruiter|clarity": "ready",
    "Recruiter|authority": "ready",
    "Recruiter|skill": "ready",
    "Recruiter|fluency": "cond",
    "Recruiter|safety": "ready",
    "Recruiter|capacity": "ready",
    "_|manager": "cond",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready"
   },
   "dims": {
    "Recruiter|clarity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Partly in place: confidence / decision fluency for Recruiter at Oversight.",
     "act": "Before or during the step: targeted coaching and scenario practice for Recruiter.",
     "owner": "Director of TA",
     "move": "Confirm within 30 days of the step."
    },
    "Recruiter|safety": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|capacity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Partly in place: manager / governance-oversight readiness for the organization at Oversight.",
     "act": "Before or during the step: targeted organizational action for the organization.",
     "owner": "Director of TA",
     "move": "Confirm within 30 days of the step."
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "",
    "agencyBy": {
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.4",
   "to": "Agent-delegation",
   "cells": {
    "Director of TA|clarity": "ready",
    "Recruiter|clarity": "ready",
    "Director of TA|authority": "ready",
    "Recruiter|authority": "ready",
    "Director of TA|skill": "ready",
    "Recruiter|skill": "ready",
    "Director of TA|fluency": "ready",
    "Recruiter|fluency": "ready",
    "Director of TA|safety": "ready",
    "Recruiter|safety": "cond",
    "Director of TA|capacity": "ready",
    "Recruiter|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready"
   },
   "dims": {
    "Director of TA|clarity": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|clarity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|authority": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|skill": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|fluency": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|safety": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|safety": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Partly in place: psychological safety for Recruiter at Agent-delegation."
    },
    "Director of TA|capacity": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|capacity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "",
    "agencyBy": {
     "Director of TA": "Test data. Director of TA keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for.",
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.5",
   "to": "Judgment",
   "cells": {
    "Recruiter|clarity": "ready",
    "HR Generalist|clarity": "ready",
    "Recruiter|authority": "ready",
    "HR Generalist|authority": "ready",
    "Recruiter|skill": "ready",
    "HR Generalist|skill": "ready",
    "Recruiter|fluency": "ready",
    "HR Generalist|fluency": "ready",
    "Recruiter|safety": "ready",
    "HR Generalist|safety": "ready",
    "Recruiter|capacity": "ready",
    "HR Generalist|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready"
   },
   "dims": {
    "Recruiter|clarity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|clarity": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|authority": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|skill": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|fluency": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|safety": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|safety": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|capacity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "HR Generalist|capacity": {
     "ev": "Test data. Evidence reviewed for HR Generalist.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "",
    "agencyBy": {
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for.",
     "HR Generalist": "Test data. HR Generalist keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.6",
   "to": "Automation",
   "cells": {
    "Recruiter|clarity": "ready",
    "Recruiter|authority": "ready",
    "Recruiter|skill": "ready",
    "Recruiter|fluency": "ready",
    "Recruiter|safety": "ready",
    "Recruiter|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready"
   },
   "dims": {
    "Recruiter|clarity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|safety": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|capacity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "",
    "agencyBy": {
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.2",
   "to": "Augmentation",
   "cells": {
    "Recruiter|clarity": "ready",
    "Hiring Managers*|clarity": "ready",
    "Recruiter|authority": "ready",
    "Hiring Managers*|authority": "ready",
    "Recruiter|skill": "ready",
    "Hiring Managers*|skill": "ready",
    "Recruiter|fluency": "ready",
    "Hiring Managers*|fluency": "ready",
    "Recruiter|safety": "ready",
    "Hiring Managers*|safety": "ready",
    "Recruiter|capacity": "ready",
    "Hiring Managers*|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready",
    "_over|manager": "ready"
   },
   "dims": {
    "Recruiter|clarity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|clarity": {
     "ev": "Test data. Evidence reviewed for Hiring Managers*.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|authority": {
     "ev": "Test data. Evidence reviewed for Hiring Managers*.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|skill": {
     "ev": "Test data. Evidence reviewed for Hiring Managers*.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|fluency": {
     "ev": "Test data. Evidence reviewed for Hiring Managers*.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|safety": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|safety": {
     "ev": "Test data. Evidence reviewed for Hiring Managers*.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|capacity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|capacity": {
     "ev": "Test data. Evidence reviewed for Hiring Managers*.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "Director of TA",
    "agencyBy": {
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for.",
     "Hiring Managers*": "Test data. Hiring Managers* keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.3",
   "to": "Oversight",
   "cells": {
    "Recruiter|clarity": "ready",
    "Recruiter|authority": "ready",
    "Recruiter|skill": "ready",
    "Recruiter|fluency": "ready",
    "Recruiter|safety": "ready",
    "Recruiter|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ins",
    "_over|manager": "ready"
   },
   "dims": {
    "Recruiter|clarity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|safety": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|capacity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "No evidence yet: Traceable technical evidence: type, source, reference, confidence, limitations, failure modes, real-volume results."
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "Director of TA",
    "agencyBy": {
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.4",
   "to": "Augmentation",
   "cells": {
    "Director of TA|clarity": "ready",
    "Recruiter|clarity": "ready",
    "Hiring Managers*|clarity": "ready",
    "Director of TA|authority": "ready",
    "Recruiter|authority": "ready",
    "Hiring Managers*|authority": "ready",
    "Director of TA|skill": "ready",
    "Recruiter|skill": "cond",
    "Hiring Managers*|skill": "ready",
    "Director of TA|fluency": "ready",
    "Recruiter|fluency": "cond",
    "Hiring Managers*|fluency": "ready",
    "Director of TA|safety": "ready",
    "Recruiter|safety": "ready",
    "Hiring Managers*|safety": "ready",
    "Director of TA|capacity": "cond",
    "Recruiter|capacity": "ready",
    "Hiring Managers*|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "cond",
    "_|evidence": "ready",
    "_over|manager": "cond"
   },
   "dims": {
    "Director of TA|clarity": {
     "ev": "Test data. Workflow, role language, RACI, training, scenario walkthrough. Reviewed for Director of TA on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|clarity": {
     "ev": "Test data. Workflow, role language, RACI, training, scenario walkthrough. Reviewed for Recruiter on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|clarity": {
     "ev": "Test data. Workflow, role language, RACI, training, scenario walkthrough. Reviewed for Hiring Managers* on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|authority": {
     "ev": "Test data. Override rights, system permissions, escalation process, approval matrix, governed decision points. Reviewed for Director of TA on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Override rights, system permissions, escalation process, approval matrix, governed decision points. Reviewed for Recruiter on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|authority": {
     "ev": "Test data. Override rights, system permissions, escalation process, approval matrix, governed decision points. Reviewed for Hiring Managers* on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|skill": {
     "ev": "Test data. Case review, scenario testing, qualifications, exception-handling evidence. Reviewed for Director of TA on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Case review, scenario testing, qualifications, exception-handling evidence. Reviewed for Recruiter on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Partly in place: capability / skill for Recruiter at Augmentation.",
     "act": "Before or during the step: targeted coaching and scenario practice for Recruiter.",
     "owner": "SVP Talent Management",
     "move": "Confirm within 30 days of the step."
    },
    "Hiring Managers*|skill": {
     "ev": "Test data. Case review, scenario testing, qualifications, exception-handling evidence. Reviewed for Hiring Managers* on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|fluency": {
     "ev": "Test data. Scenario exercises, observed override behavior, manager feedback. Reviewed for Director of TA on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Scenario exercises, observed override behavior, manager feedback. Reviewed for Recruiter on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Partly in place: confidence / decision fluency for Recruiter at Augmentation.",
     "act": "Before or during the step: targeted coaching and scenario practice for Recruiter.",
     "owner": "SVP Talent Management",
     "move": "Confirm within 30 days of the step."
    },
    "Hiring Managers*|fluency": {
     "ev": "Test data. Scenario exercises, observed override behavior, manager feedback. Reviewed for Hiring Managers* on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|safety": {
     "ev": "Test data. Speak-up history, leadership behavior, escalation norms, incident reviews. Reviewed for Director of TA on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|safety": {
     "ev": "Test data. Speak-up history, leadership behavior, escalation norms, incident reviews. Reviewed for Recruiter on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|safety": {
     "ev": "Test data. Speak-up history, leadership behavior, escalation norms, incident reviews. Reviewed for Hiring Managers* on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|capacity": {
     "ev": "Test data. Caseload, review time, exception volume, backlog, staffing, verification effort. Reviewed for Director of TA on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Partly in place: capacity / workload for Director of TA at Augmentation.",
     "act": "Before or during the step: targeted coaching and scenario practice for Director of TA.",
     "owner": "SVP Talent Management",
     "move": "Confirm within 30 days of the step."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Caseload, review time, exception volume, backlog, staffing, verification effort. Reviewed for Recruiter on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Hiring Managers*|capacity": {
     "ev": "Test data. Caseload, review time, exception volume, backlog, staffing, verification effort. Reviewed for Hiring Managers* on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Manager/governance expectations, escalation criteria, monitoring, coaching, evidence of the actual oversight body. Reviewed for the organization on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Decision rights, risk tolerance, stop conditions, escalation routes, named owners, governance standards. Reviewed for the organization on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Competing initiatives, staffing changes, implementation timing, leadership capacity, change load. Reviewed for the organization on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Partly in place: change capacity for the organization at Augmentation.",
     "act": "Before or during the step: targeted organizational action for the organization.",
     "owner": "SVP Talent Management",
     "move": "Confirm within 30 days of the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence: type, source, reference, confidence, limitations, failure modes, real-volume results. Reviewed for the organization on 7.2.3.4.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "SVP Talent Management",
    "agencyBy": {
     "Director of TA": "Test data. Director of TA keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for.",
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for.",
     "Hiring Managers*": "Test data. Hiring Managers* keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.4.1",
   "to": "Automation",
   "cells": {
    "Recruiter|clarity": "ready",
    "Recruiter|authority": "ready",
    "Recruiter|skill": "ready",
    "Recruiter|fluency": "ready",
    "Recruiter|safety": "ready",
    "Recruiter|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready"
   },
   "dims": {
    "Recruiter|clarity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|safety": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|capacity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "",
    "agencyBy": {
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.4.3",
   "to": "Agent-delegation",
   "cells": {
    "Recruiter|clarity": "ready",
    "Recruiter|authority": "ready",
    "Recruiter|skill": "ready",
    "Recruiter|fluency": "ready",
    "Recruiter|safety": "not",
    "Recruiter|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "not",
    "_|evidence": "ready"
   },
   "dims": {
    "Recruiter|clarity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|safety": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Not yet in place: psychological safety for Recruiter at Agent-delegation.",
     "act": "Close the gap before the step: targeted coaching and scenario practice for Recruiter.",
     "owner": "Director of TA",
     "move": "Reassess in 60 days."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026",
     "gap": "Not yet in place: change capacity for the organization at Agent-delegation.",
     "act": "Close the gap before the step: targeted organizational action for the organization.",
     "owner": "Director of TA",
     "move": "Reassess in 60 days."
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "",
    "agencyBy": {
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  },
  {
   "org": "abc-test-org",
   "code": "7.2.5.1",
   "to": "Agent-delegation",
   "cells": {
    "Director of TA|clarity": "ready",
    "Recruiter|clarity": "ready",
    "Director of TA|authority": "ready",
    "Recruiter|authority": "ready",
    "Director of TA|skill": "ready",
    "Recruiter|skill": "ready",
    "Director of TA|fluency": "ready",
    "Recruiter|fluency": "ready",
    "Director of TA|safety": "ready",
    "Recruiter|safety": "ready",
    "Director of TA|capacity": "ready",
    "Recruiter|capacity": "ready",
    "_|manager": "ready",
    "_|governance": "ready",
    "_|change": "ready",
    "_|evidence": "ready",
    "_over|manager": "not"
   },
   "dims": {
    "Director of TA|clarity": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|clarity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|authority": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|authority": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|skill": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|skill": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|fluency": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|fluency": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|safety": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|safety": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Director of TA|capacity": {
     "ev": "Test data. Evidence reviewed for Director of TA.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "Recruiter|capacity": {
     "ev": "Test data. Evidence reviewed for Recruiter.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "manager": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "governance": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "change": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    },
    "evidence": {
     "ev": "Test data. Evidence reviewed for the organization.",
     "prov": "ABC Test Org, Nov 17, 2026"
    }
   },
   "meta": {
    "by": "Tim King (test data)",
    "from": "ABC Test Org test data (7.2), Nov 17, 2026",
    "signed": "SVP Talent Management",
    "agencyBy": {
     "Director of TA": "Test data. Director of TA keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for.",
     "Recruiter": "Test data. Recruiter keeps the judgment at Decide and can set aside the AI output with a reason; the step changes what they review, not what they answer for."
    }
   }
  }
 ],
 "stepev": [
  {
   "org": "abc-test-org",
   "code": "7.2.1.1",
   "to": "Augmentation",
   "counts": {
    "inst": 60,
    "used": 48,
    "spot": 60,
    "errs": 1
   },
   "wk": 5,
   "auditor": "Director of HR Ops",
   "source": "Test data. Bounded trial in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1000",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "HRBP Manager",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1003",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "HRBP Manager",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.2",
   "to": "Agent-delegation",
   "counts": {
    "reviewed": 600,
    "passed": 570,
    "realexc": 24,
    "flagged": 23
   },
   "wk": 9,
   "auditor": "Director of HR Ops",
   "source": "Test data. In-stage audit in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1007",
     "el": "Verify",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "HRBP Manager",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1010",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "HRBP Manager",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.3",
   "to": "Oversight",
   "counts": {
    "shadow": 240,
    "match": 228
   },
   "wk": 9,
   "auditor": "Director of HR Ops",
   "source": "Test data. Shadow run in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1014",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "HRBP Manager",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1017",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "HRBP Manager",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.1.5",
   "to": "Automation",
   "counts": {
    "instances": 400,
    "needed": 2
   },
   "wk": 11,
   "auditor": "Director of HR Ops",
   "source": "Test data. In-stage audit in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1031",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "HRBP Manager",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.3",
   "to": "Oversight",
   "counts": {
    "shadow": 120,
    "match": 114
   },
   "wk": 5,
   "auditor": "Director of TA",
   "source": "Test data. Shadow run in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1063",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "Recruiter",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1066",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "Recruiter",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.4",
   "to": "Agent-delegation",
   "counts": {
    "reviewed": 600,
    "passed": 594,
    "realexc": 24,
    "flagged": 23
   },
   "wk": 9,
   "auditor": "SVP Talent Management",
   "source": "Test data. In-stage audit in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1070",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "Director of TA",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1073",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "Director of TA",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.2.6",
   "to": "Automation",
   "counts": {
    "instances": 1200,
    "needed": 6
   },
   "wk": 13,
   "auditor": "Director of TA",
   "source": "Test data. In-stage audit in ABC Test Org, Oct–Nov 2026.",
   "signed": "Director of TA",
   "log": [
    {
     "inst": "#1085",
     "el": "Decide",
     "what": "Agent acted on an instance it should have flagged for a person.",
     "sev": "Serious",
     "why": "Would have bypassed the control point.",
     "by": "Recruiter",
     "disp": "",
     "re": false
    },
    {
     "inst": "#1084",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "Recruiter",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1087",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "Recruiter",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.2",
   "to": "Augmentation",
   "counts": {
    "inst": 120,
    "used": 96,
    "spot": 120,
    "errs": 1
   },
   "wk": 9,
   "auditor": "Director of TA",
   "source": "Test data. Bounded trial in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1098",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "Recruiter",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1101",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "Recruiter",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.3",
   "to": "Oversight",
   "counts": {
    "shadow": 240,
    "match": 228
   },
   "wk": 9,
   "auditor": "Director of TA",
   "source": "Test data. Shadow run in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1105",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "Recruiter",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1108",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "Recruiter",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.3.4",
   "to": "Augmentation",
   "counts": {
    "inst": 120,
    "used": 96,
    "spot": 120,
    "errs": 1
   },
   "wk": 9,
   "auditor": "SVP Talent Management",
   "source": "Test data. Bounded trial in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1112",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "Director of TA",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1115",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "Director of TA",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.4.1",
   "to": "Automation",
   "counts": {
    "instances": 1200,
    "needed": 6
   },
   "wk": 13,
   "auditor": "Director of TA",
   "source": "Test data. In-stage audit in ABC Test Org, Oct–Nov 2026.",
   "signed": "Director of TA",
   "log": [
    {
     "inst": "#1119",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "Recruiter",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1122",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "Recruiter",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.5.1",
   "to": "Agent-delegation",
   "counts": {
    "reviewed": 1200,
    "passed": 1188,
    "realexc": 48,
    "flagged": 44
   },
   "wk": 17,
   "auditor": "SVP Talent Management",
   "source": "Test data. In-stage audit in ABC Test Org, Oct–Nov 2026.",
   "signed": "SVP Talent Management",
   "log": [
    {
     "inst": "#1140",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "Director of TA",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1143",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "Director of TA",
     "disp": "",
     "re": false
    }
   ]
  },
  {
   "org": "abc-test-org",
   "code": "7.2.5.4",
   "to": "Oversight",
   "counts": {
    "shadow": 120,
    "match": 114
   },
   "wk": 5,
   "auditor": "Director of HR Ops",
   "source": "Test data. Shadow run in ABC Test Org, Oct–Nov 2026.",
   "signed": "",
   "log": [
    {
     "inst": "#1161",
     "el": "Decide",
     "what": "Output missed a required field, caught at the next activity.",
     "sev": "Moderate",
     "why": "Caught downstream before any effect.",
     "by": "HRIS Analyst",
     "disp": "Template corrected; re-tested on 50 instances.",
     "re": true
    },
    {
     "inst": "#1164",
     "el": "Communicate",
     "what": "Formatting inconsistent with the house style.",
     "sev": "Minor",
     "why": "No effect on the outcome.",
     "by": "HRIS Analyst",
     "disp": "",
     "re": false
    }
   ]
  }
 ]
};
