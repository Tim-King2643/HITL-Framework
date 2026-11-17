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
     "ev": "Test data. HRBP Manager described what AI does at Augmentation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: HRBP Manager · Reference: Role walkthrough of the Augmentation workflow · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.1 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with HRBP Manager."
    },
    "HRBP Manager|authority": {
     "ev": "Test data. HRBP Manager has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: HRBP Manager · Reference: Approval matrix and system permissions for 7.2.1.1 Align staffing plan to work force plan and business unit strategies/resource needs · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.1 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "HRBP Manager|skill": {
     "ev": "Test data. HRBP Manager caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: HRBP Manager · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.1 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to HRBP Manager’s review."
    },
    "HRBP Manager|fluency": {
     "ev": "Test data. When the AI and HRBP Manager disagreed in the exercise, HRBP Manager made and defended an independent call each time.",
     "prov": "Type: observed · Source role: HRBP Manager · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.1 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "HRBP Manager|safety": {
     "ev": "Test data. HRBP Manager reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: HRBP Manager · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.1 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "HRBP Manager|capacity": {
     "ev": "Test data. HRBP Manager has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: HRBP Manager · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.1 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Augmentation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of HR Ops · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.1.1 Align staffing plan to work force plan and business unit strategies/resource needs at Augmentation are written and agreed.",
     "prov": "Type: document · Source role: Director of HR Ops · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: Director of HR Ops · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of HR Ops · Reference: Technical evidence pack for 7.2.1.1 Align staffing plan to work force plan and business unit strategies/resource needs at Augmentation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
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
     "ev": "Test data. HRBP Manager described what AI does at Agent-delegation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: HRBP Manager · Reference: Role walkthrough of the Agent-delegation workflow · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with HRBP Manager."
    },
    "HR Generalist|clarity": {
     "ev": "Test data. HR Generalist described what AI does at Agent-delegation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: HR Generalist · Reference: Role walkthrough of the Agent-delegation workflow · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with HR Generalist."
    },
    "HRBP Manager|authority": {
     "ev": "Test data. HRBP Manager has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: HRBP Manager · Reference: Approval matrix and system permissions for 7.2.1.2 Open job requisitions · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "HR Generalist|authority": {
     "ev": "Test data. HR Generalist has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: HR Generalist · Reference: Approval matrix and system permissions for 7.2.1.2 Open job requisitions · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "HRBP Manager|skill": {
     "ev": "Test data. HRBP Manager caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: HRBP Manager · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to HRBP Manager’s review."
    },
    "HR Generalist|skill": {
     "ev": "Test data. HR Generalist caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: HR Generalist · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to HR Generalist’s review."
    },
    "HRBP Manager|fluency": {
     "ev": "Test data. When the AI and HRBP Manager disagreed in the exercise, HRBP Manager made and defended an independent call each time.",
     "prov": "Type: observed · Source role: HRBP Manager · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "HR Generalist|fluency": {
     "ev": "Test data. When the AI and HR Generalist disagreed in the exercise, HR Generalist made and defended an independent call each time.",
     "prov": "Type: observed · Source role: HR Generalist · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "HRBP Manager|safety": {
     "ev": "Test data. HRBP Manager reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: HRBP Manager · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "HR Generalist|safety": {
     "ev": "Test data. HR Generalist reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: HR Generalist · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "HRBP Manager|capacity": {
     "ev": "Test data. HRBP Manager has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: HRBP Manager · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "HR Generalist|capacity": {
     "ev": "Test data. HR Generalist has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: HR Generalist · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.2 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Agent-delegation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of HR Ops · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.1.2 Open job requisitions at Agent-delegation are written and agreed.",
     "prov": "Type: document · Source role: Director of HR Ops · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: Director of HR Ops · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of HR Ops · Reference: Technical evidence pack for 7.2.1.2 Open job requisitions at Agent-delegation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
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
     "ev": "Test data. HRBP Manager described what AI does at Oversight, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: HRBP Manager · Reference: Role walkthrough of the Oversight workflow · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with HRBP Manager."
    },
    "HRBP Manager|authority": {
     "ev": "Test data. HRBP Manager has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: HRBP Manager · Reference: Approval matrix and system permissions for 7.2.1.3 Approve job requisition · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "HRBP Manager|skill": {
     "ev": "Test data. HRBP Manager caught 1 of 3 seeded errors and deferred to the AI output on 4 of 10 cases.",
     "prov": "Type: observed · Source role: HRBP Manager · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: medium · Coverage: all HRBP Manager instances on 7.2.1.3 · Date: Oct 2026",
     "gap": "Not in place for Oversight; this holds the step.",
     "act": "Targeted case practice for HRBP Manager on the error types missed, then retest on a fresh set.",
     "owner": "Director of HR Ops",
     "move": "Moves up on: a retest with every seeded error caught and the right call reached independently."
    },
    "HRBP Manager|fluency": {
     "ev": "Test data. When the AI and HRBP Manager disagreed in the exercise, HRBP Manager made and defended an independent call each time.",
     "prov": "Type: observed · Source role: HRBP Manager · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "HRBP Manager|safety": {
     "ev": "Test data. HRBP Manager reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: HRBP Manager · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "HRBP Manager|capacity": {
     "ev": "Test data. Review fits at average volume, but the hiring peak in Q1 would leave under 10% for exceptions.",
     "prov": "Type: system · Source role: HRBP Manager · Reference: Caseload and review-time data, Q3 2026 · Confidence: medium · Coverage: all HRBP Manager instances on 7.2.1.3 · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Oversight.",
     "act": "Plan peak cover before the step (temporary support or a lower AI hand-off rate in Q1).",
     "owner": "Director of HR Ops",
     "move": "Ready once: peak cover in place and review time measured at peak."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Oversight, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of HR Ops · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.1.3 Approve job requisition at Oversight are written and agreed.",
     "prov": "Type: document · Source role: Director of HR Ops · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. An ATS upgrade lands in the same quarter; the step can proceed if the two are sequenced.",
     "prov": "Type: document · Source role: Director of HR Ops · Reference: Change calendar and initiative load, 2026–27 · Confidence: medium · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Oversight.",
     "act": "Sequence the step after the competing change and confirm the dates in the change calendar.",
     "owner": "Director of HR Ops",
     "move": "Ready once: competing change complete or rescheduled, confirmed in the calendar."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of HR Ops · Reference: Technical evidence pack for 7.2.1.3 Approve job requisition at Oversight · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
    },
    "_over|manager": {
     "ev": "Test data. The manager has escalation criteria for Oversight, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of HR Ops · Reference: Manager and governance-body interviews · Confidence: high · Coverage: oversight of 7.2.1.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "CHRO",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
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
     "ev": "Test data. HRBP Manager described what AI does at Automation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: HRBP Manager · Reference: Role walkthrough of the Automation workflow · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with HRBP Manager."
    },
    "HR Generalist|clarity": {
     "ev": "Test data. HR Generalist described what AI does at Automation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: HR Generalist · Reference: Role walkthrough of the Automation workflow · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with HR Generalist."
    },
    "HRBP Manager|authority": {
     "ev": "Test data. HRBP Manager has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: HRBP Manager · Reference: Approval matrix and system permissions for 7.2.1.5 Modify job requisitions · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "HR Generalist|authority": {
     "ev": "Test data. HR Generalist has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: HR Generalist · Reference: Approval matrix and system permissions for 7.2.1.5 Modify job requisitions · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "HRBP Manager|skill": {
     "ev": "Test data. HRBP Manager caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: HRBP Manager · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to HRBP Manager’s review."
    },
    "HR Generalist|skill": {
     "ev": "Test data. HR Generalist caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: HR Generalist · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to HR Generalist’s review."
    },
    "HRBP Manager|fluency": {
     "ev": "Test data. When the AI and HRBP Manager disagreed in the exercise, HRBP Manager made and defended an independent call each time.",
     "prov": "Type: observed · Source role: HRBP Manager · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "HR Generalist|fluency": {
     "ev": "Test data. When the AI and HR Generalist disagreed in the exercise, HR Generalist made and defended an independent call each time.",
     "prov": "Type: observed · Source role: HR Generalist · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "HRBP Manager|safety": {
     "ev": "Test data. HRBP Manager reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: HRBP Manager · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "HR Generalist|safety": {
     "ev": "Test data. HR Generalist reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: HR Generalist · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "HRBP Manager|capacity": {
     "ev": "Test data. HRBP Manager has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: HRBP Manager · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all HRBP Manager instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "HR Generalist|capacity": {
     "ev": "Test data. HR Generalist has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: HR Generalist · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all HR Generalist instances on 7.2.1.5 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Automation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of HR Ops · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.1.5 Modify job requisitions at Automation are written and agreed.",
     "prov": "Type: document · Source role: Director of HR Ops · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: Director of HR Ops · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of HR Ops · Reference: Technical evidence pack for 7.2.1.5 Modify job requisitions at Automation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of HR Ops",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
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
     "ev": "Test data. Recruiter described what AI does at Oversight, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Oversight workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.2.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.2.3 Develop and maintain candidate pool · Confidence: high · Coverage: all Recruiter instances on 7.2.2.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Recruiter instances on 7.2.2.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Recruiter’s review."
    },
    "Recruiter|fluency": {
     "ev": "Test data. Recruiter made independent calls but hesitated to record the reason when overriding.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: medium · Coverage: all Recruiter instances on 7.2.2.3 · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Oversight.",
     "act": "Coaching on recording override reasons; a second disagreement exercise in 30 days.",
     "owner": "Director of TA",
     "move": "Ready once: override reasons recorded on every disagreement in the next exercise."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Recruiter instances on 7.2.2.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.2.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager reviews exceptions informally, but escalation criteria for Oversight are not yet agreed.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Manager and governance-body interviews · Confidence: medium · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Oversight.",
     "act": "Agree escalation criteria and run one exception review with the team before the step.",
     "owner": "Director of TA",
     "move": "Ready once: an exception review held and its outcomes recorded."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.2.3 Develop and maintain candidate pool at Oversight are written and agreed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of TA · Reference: Technical evidence pack for 7.2.2.3 Develop and maintain candidate pool at Oversight · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
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
     "ev": "Test data. Director of TA described what AI does at Agent-delegation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Role walkthrough of the Agent-delegation workflow · Confidence: high · Coverage: all Director of TA instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Director of TA."
    },
    "Recruiter|clarity": {
     "ev": "Test data. Recruiter described what AI does at Agent-delegation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Agent-delegation workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "Director of TA|authority": {
     "ev": "Test data. Director of TA has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Director of TA · Reference: Approval matrix and system permissions for 7.2.2.4 Manage recruitment vendors · Confidence: high · Coverage: all Director of TA instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.2.4 Manage recruitment vendors · Confidence: high · Coverage: all Recruiter instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Director of TA|skill": {
     "ev": "Test data. Director of TA caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Director of TA · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Director of TA instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Director of TA’s review."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Recruiter instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Recruiter’s review."
    },
    "Director of TA|fluency": {
     "ev": "Test data. When the AI and Director of TA disagreed in the exercise, Director of TA made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Director of TA · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Director of TA instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Recruiter|fluency": {
     "ev": "Test data. When the AI and Recruiter disagreed in the exercise, Recruiter made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Recruiter instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Director of TA|safety": {
     "ev": "Test data. Director of TA reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Director of TA instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter raises concerns with the direct manager but not across teams.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: medium · Coverage: all Recruiter instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Agent-delegation.",
     "owner": "SVP Talent Management",
     "move": "Ready once: concerns raised and acted on through the new channel within 60 days."
    },
    "Director of TA|capacity": {
     "ev": "Test data. Director of TA has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Director of TA · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Director of TA instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.2.4 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Agent-delegation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: SVP Talent Management · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.2.4 Manage recruitment vendors at Agent-delegation are written and agreed.",
     "prov": "Type: document · Source role: SVP Talent Management · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: SVP Talent Management · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: SVP Talent Management · Reference: Technical evidence pack for 7.2.2.4 Manage recruitment vendors at Agent-delegation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
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
     "ev": "Test data. Recruiter described what AI does at Judgment, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Judgment workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "HR Generalist|clarity": {
     "ev": "Test data. HR Generalist described what AI does at Judgment, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: HR Generalist · Reference: Role walkthrough of the Judgment workflow · Confidence: high · Coverage: all HR Generalist instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with HR Generalist."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.2.5 Manage employee referral programs · Confidence: high · Coverage: all Recruiter instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "HR Generalist|authority": {
     "ev": "Test data. HR Generalist has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: HR Generalist · Reference: Approval matrix and system permissions for 7.2.2.5 Manage employee referral programs · Confidence: high · Coverage: all HR Generalist instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Recruiter instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Recruiter’s review."
    },
    "HR Generalist|skill": {
     "ev": "Test data. HR Generalist caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: HR Generalist · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all HR Generalist instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to HR Generalist’s review."
    },
    "Recruiter|fluency": {
     "ev": "Test data. When the AI and Recruiter disagreed in the exercise, Recruiter made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Recruiter instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "HR Generalist|fluency": {
     "ev": "Test data. When the AI and HR Generalist disagreed in the exercise, HR Generalist made and defended an independent call each time.",
     "prov": "Type: observed · Source role: HR Generalist · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all HR Generalist instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Recruiter instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "HR Generalist|safety": {
     "ev": "Test data. HR Generalist reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: HR Generalist · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all HR Generalist instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "HR Generalist|capacity": {
     "ev": "Test data. HR Generalist has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: HR Generalist · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all HR Generalist instances on 7.2.2.5 · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Judgment, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.2.5 Manage employee referral programs at Judgment are written and agreed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of TA · Reference: Technical evidence pack for 7.2.2.5 Manage employee referral programs at Judgment · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Judgment.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
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
     "ev": "Test data. Recruiter described what AI does at Automation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Automation workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.2.6 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.2.6 Manage recruitment channels · Confidence: high · Coverage: all Recruiter instances on 7.2.2.6 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Recruiter instances on 7.2.2.6 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Recruiter’s review."
    },
    "Recruiter|fluency": {
     "ev": "Test data. When the AI and Recruiter disagreed in the exercise, Recruiter made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Recruiter instances on 7.2.2.6 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Recruiter instances on 7.2.2.6 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.2.6 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Automation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.2.6 Manage recruitment channels at Automation are written and agreed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of TA · Reference: Technical evidence pack for 7.2.2.6 Manage recruitment channels at Automation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
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
     "ev": "Test data. Recruiter described what AI does at Augmentation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Augmentation workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "Hiring Managers*|clarity": {
     "ev": "Test data. Hiring Managers* described what AI does at Augmentation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Hiring Managers* · Reference: Role walkthrough of the Augmentation workflow · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Hiring Managers*."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.3.2 Interview candidates · Confidence: high · Coverage: all Recruiter instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Hiring Managers*|authority": {
     "ev": "Test data. Hiring Managers* has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Hiring Managers* · Reference: Approval matrix and system permissions for 7.2.3.2 Interview candidates · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Recruiter instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Recruiter’s review."
    },
    "Hiring Managers*|skill": {
     "ev": "Test data. Hiring Managers* caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Hiring Managers* · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Hiring Managers*’s review."
    },
    "Recruiter|fluency": {
     "ev": "Test data. When the AI and Recruiter disagreed in the exercise, Recruiter made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Recruiter instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Hiring Managers*|fluency": {
     "ev": "Test data. When the AI and Hiring Managers* disagreed in the exercise, Hiring Managers* made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Hiring Managers* · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Recruiter instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Hiring Managers*|safety": {
     "ev": "Test data. Hiring Managers* reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Hiring Managers* · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "Hiring Managers*|capacity": {
     "ev": "Test data. Hiring Managers* has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Hiring Managers* · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Augmentation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.3.2 Interview candidates at Augmentation are written and agreed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of TA · Reference: Technical evidence pack for 7.2.3.2 Interview candidates at Augmentation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
    },
    "_over|manager": {
     "ev": "Test data. The manager has escalation criteria for Augmentation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Manager and governance-body interviews · Confidence: high · Coverage: oversight of 7.2.3.2 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
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
     "ev": "Test data. Recruiter described what AI does at Oversight, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Oversight workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.3.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.3.3 Test candidates · Confidence: high · Coverage: all Recruiter instances on 7.2.3.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Recruiter instances on 7.2.3.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Recruiter’s review."
    },
    "Recruiter|fluency": {
     "ev": "Test data. When the AI and Recruiter disagreed in the exercise, Recruiter made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Recruiter instances on 7.2.3.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Recruiter instances on 7.2.3.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.3.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Oversight, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.3.3 Test candidates at Oversight are written and agreed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. No organization-specific evidence yet for the organization at Oversight.",
     "prov": "Type: audit · Source role: Director of TA · Reference: Technical evidence pack for 7.2.3.3 Test candidates at Oversight · Confidence: none yet · Coverage: the recruiting function · Date: planned by Dec 2026",
     "gap": "Nothing evidenced, so the finding stays Insufficient Evidence; it is never converted on modeled grounds.",
     "act": "Gather the evidence: technical evidence pack for 7.2.3.3 test candidates at oversight.",
     "owner": "Director of TA",
     "move": "Evidence from technical evidence pack for 7.2.3.3 test candidates at oversight."
    },
    "_over|manager": {
     "ev": "Test data. The manager has escalation criteria for Oversight, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Manager and governance-body interviews · Confidence: high · Coverage: oversight of 7.2.3.3 · Date: Oct 2026",
     "gap": "None material for Oversight.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
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
     "ev": "Test data. Director of TA described what AI does at Augmentation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Role walkthrough of the Augmentation workflow · Confidence: high · Coverage: all Director of TA instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Director of TA."
    },
    "Recruiter|clarity": {
     "ev": "Test data. Recruiter described what AI does at Augmentation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Augmentation workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "Hiring Managers*|clarity": {
     "ev": "Test data. Hiring Managers* described what AI does at Augmentation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Hiring Managers* · Reference: Role walkthrough of the Augmentation workflow · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Hiring Managers*."
    },
    "Director of TA|authority": {
     "ev": "Test data. Director of TA has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Director of TA · Reference: Approval matrix and system permissions for 7.2.3.4 Select and reject candidates · Confidence: high · Coverage: all Director of TA instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.3.4 Select and reject candidates · Confidence: high · Coverage: all Recruiter instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Hiring Managers*|authority": {
     "ev": "Test data. Hiring Managers* has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Hiring Managers* · Reference: Approval matrix and system permissions for 7.2.3.4 Select and reject candidates · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Director of TA|skill": {
     "ev": "Test data. Director of TA caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Director of TA · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Director of TA instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Director of TA’s review."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught 2 of 3 seeded errors; the miss was a judgment call on an unusual case.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: medium · Coverage: all Recruiter instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Augmentation.",
     "act": "Targeted case practice for Recruiter on the error types missed, then retest on a fresh set.",
     "owner": "SVP Talent Management",
     "move": "Ready once: a retest with every seeded error caught and the right call reached independently."
    },
    "Hiring Managers*|skill": {
     "ev": "Test data. Hiring Managers* caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Hiring Managers* · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Hiring Managers*’s review."
    },
    "Director of TA|fluency": {
     "ev": "Test data. When the AI and Director of TA disagreed in the exercise, Director of TA made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Director of TA · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Director of TA instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Recruiter|fluency": {
     "ev": "Test data. Recruiter made independent calls but hesitated to record the reason when overriding.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: medium · Coverage: all Recruiter instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Augmentation.",
     "act": "Coaching on recording override reasons; a second disagreement exercise in 30 days.",
     "owner": "SVP Talent Management",
     "move": "Ready once: override reasons recorded on every disagreement in the next exercise."
    },
    "Hiring Managers*|fluency": {
     "ev": "Test data. When the AI and Hiring Managers* disagreed in the exercise, Hiring Managers* made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Hiring Managers* · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Director of TA|safety": {
     "ev": "Test data. Director of TA reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Director of TA instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Recruiter instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Hiring Managers*|safety": {
     "ev": "Test data. Hiring Managers* reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Hiring Managers* · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Director of TA|capacity": {
     "ev": "Test data. Review fits at average volume, but the hiring peak in Q1 would leave under 10% for exceptions.",
     "prov": "Type: system · Source role: Director of TA · Reference: Caseload and review-time data, Q3 2026 · Confidence: medium · Coverage: all Director of TA instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Augmentation.",
     "act": "Plan peak cover before the step (temporary support or a lower AI hand-off rate in Q1).",
     "owner": "SVP Talent Management",
     "move": "Ready once: peak cover in place and review time measured at peak."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "Hiring Managers*|capacity": {
     "ev": "Test data. Hiring Managers* has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Hiring Managers* · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Hiring Managers* instances on 7.2.3.4 · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Augmentation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: SVP Talent Management · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.3.4 Select and reject candidates at Augmentation are written and agreed.",
     "prov": "Type: document · Source role: SVP Talent Management · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. An ATS upgrade lands in the same quarter; the step can proceed if the two are sequenced.",
     "prov": "Type: document · Source role: SVP Talent Management · Reference: Change calendar and initiative load, 2026–27 · Confidence: medium · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Augmentation.",
     "act": "Sequence the step after the competing change and confirm the dates in the change calendar.",
     "owner": "SVP Talent Management",
     "move": "Ready once: competing change complete or rescheduled, confirmed in the calendar."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: SVP Talent Management · Reference: Technical evidence pack for 7.2.3.4 Select and reject candidates at Augmentation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Augmentation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
    },
    "_over|manager": {
     "ev": "Test data. The manager reviews exceptions informally, but escalation criteria for Augmentation are not yet agreed.",
     "prov": "Type: interview · Source role: SVP Talent Management · Reference: Manager and governance-body interviews · Confidence: medium · Coverage: oversight of 7.2.3.4 · Date: Oct 2026",
     "gap": "Partly in place; the rest must be closed for Augmentation.",
     "act": "Agree escalation criteria and run one exception review with the team before the step.",
     "owner": "CHRO",
     "move": "Ready once: an exception review held and its outcomes recorded."
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
     "ev": "Test data. Recruiter described what AI does at Automation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Automation workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.4.1 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.4.1 Draw up and make offer · Confidence: high · Coverage: all Recruiter instances on 7.2.4.1 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Recruiter instances on 7.2.4.1 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Recruiter’s review."
    },
    "Recruiter|fluency": {
     "ev": "Test data. When the AI and Recruiter disagreed in the exercise, Recruiter made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Recruiter instances on 7.2.4.1 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Recruiter instances on 7.2.4.1 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.4.1 · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Automation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.4.1 Draw up and make offer at Automation are written and agreed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of TA · Reference: Technical evidence pack for 7.2.4.1 Draw up and make offer at Automation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Automation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
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
     "ev": "Test data. Recruiter described what AI does at Agent-delegation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Agent-delegation workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.4.3 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.4.3 Hire candidate · Confidence: high · Coverage: all Recruiter instances on 7.2.4.3 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Recruiter instances on 7.2.4.3 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Recruiter’s review."
    },
    "Recruiter|fluency": {
     "ev": "Test data. When the AI and Recruiter disagreed in the exercise, Recruiter made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Recruiter instances on 7.2.4.3 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter reports that challenging the system is seen as resisting the change; no concerns were logged in Q3.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: medium · Coverage: all Recruiter instances on 7.2.4.3 · Date: Oct 2026",
     "gap": "Not in place for Agent-delegation; this holds the step.",
     "act": "Leadership states the speak-up expectation; add a concern channel to the step and review it monthly.",
     "owner": "Director of TA",
     "move": "Moves up on: concerns raised and acted on through the new channel within 60 days."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.4.3 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Agent-delegation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.4.3 Hire candidate at Agent-delegation are written and agreed.",
     "prov": "Type: document · Source role: Director of TA · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. Two other changes hit the same team this quarter, with no capacity to absorb a third.",
     "prov": "Type: document · Source role: Director of TA · Reference: Change calendar and initiative load, 2026–27 · Confidence: medium · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "Not in place for Agent-delegation; this holds the step.",
     "act": "Sequence the step after the competing change and confirm the dates in the change calendar.",
     "owner": "Director of TA",
     "move": "Moves up on: competing change complete or rescheduled, confirmed in the calendar."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: Director of TA · Reference: Technical evidence pack for 7.2.4.3 Hire candidate at Agent-delegation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "Director of TA",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
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
     "ev": "Test data. Director of TA described what AI does at Agent-delegation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Role walkthrough of the Agent-delegation workflow · Confidence: high · Coverage: all Director of TA instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Director of TA."
    },
    "Recruiter|clarity": {
     "ev": "Test data. Recruiter described what AI does at Agent-delegation, what stays with a person, and what cannot be delegated, without prompting; the RACI and the written workflow agree.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Role walkthrough of the Agent-delegation workflow · Confidence: high · Coverage: all Recruiter instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a change to the workflow that is not walked through with Recruiter."
    },
    "Director of TA|authority": {
     "ev": "Test data. Director of TA has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Director of TA · Reference: Approval matrix and system permissions for 7.2.5.1 Obtain candidate background information · Confidence: high · Coverage: all Director of TA instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Recruiter|authority": {
     "ev": "Test data. Recruiter has the system permission to override the AI output and a written escalation route; two overrides in the trial were honored.",
     "prov": "Type: document · Source role: Recruiter · Reference: Approval matrix and system permissions for 7.2.5.1 Obtain candidate background information · Confidence: high · Coverage: all Recruiter instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an override that is reversed without a reason recorded."
    },
    "Director of TA|skill": {
     "ev": "Test data. Director of TA caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Director of TA · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Director of TA instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Director of TA’s review."
    },
    "Recruiter|skill": {
     "ev": "Test data. Recruiter caught all 3 seeded errors in 10 scenario cases and reached the right call on every case without the AI output.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Scenario test: 10 cases, scored against the criteria · Confidence: high · Coverage: all Recruiter instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: missed errors in the in-stage audit traced to Recruiter’s review."
    },
    "Director of TA|fluency": {
     "ev": "Test data. When the AI and Director of TA disagreed in the exercise, Director of TA made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Director of TA · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Director of TA instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Recruiter|fluency": {
     "ev": "Test data. When the AI and Recruiter disagreed in the exercise, Recruiter made and defended an independent call each time.",
     "prov": "Type: observed · Source role: Recruiter · Reference: Disagreement exercise and manager feedback · Confidence: high · Coverage: all Recruiter instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a pattern of unrecorded overrides or of deferring to the AI output."
    },
    "Director of TA|safety": {
     "ev": "Test data. Director of TA reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Director of TA · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Director of TA instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Recruiter|safety": {
     "ev": "Test data. Recruiter reports raising concerns about the AI output without penalty; two concerns raised in Q3 were acted on.",
     "prov": "Type: interview · Source role: Recruiter · Reference: Confidential interviews and speak-up history · Confidence: high · Coverage: all Recruiter instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a concern raised and dismissed without a response."
    },
    "Director of TA|capacity": {
     "ev": "Test data. Director of TA has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Director of TA · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Director of TA instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "Recruiter|capacity": {
     "ev": "Test data. Recruiter has about 25% of time free for review and exceptions at the expected volume; backlog under 2 days.",
     "prov": "Type: system · Source role: Recruiter · Reference: Caseload and review-time data, Q3 2026 · Confidence: high · Coverage: all Recruiter instances on 7.2.5.1 · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: backlog over 5 days or review time falling below the minimum."
    },
    "manager": {
     "ev": "Test data. The manager has escalation criteria for Agent-delegation, reviews exceptions weekly, and has coached the team on the change.",
     "prov": "Type: interview · Source role: SVP Talent Management · Reference: Manager and governance-body interviews · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: escalations that go unanswered for more than a week."
    },
    "governance": {
     "ev": "Test data. A named owner, stop conditions and an escalation route for 7.2.5.1 Obtain candidate background information at Agent-delegation are written and agreed.",
     "prov": "Type: document · Source role: SVP Talent Management · Reference: Decision rights and stop conditions, HR governance pack · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: an incident with no owner response within the agreed time."
    },
    "change": {
     "ev": "Test data. No competing change in the recruiting team for the next two quarters; leadership time is committed.",
     "prov": "Type: document · Source role: SVP Talent Management · Reference: Change calendar and initiative load, 2026–27 · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: a new initiative landing on the same team before the step."
    },
    "evidence": {
     "ev": "Test data. Traceable technical evidence at real volume: type, source, confidence, limits and failure modes are all documented.",
     "prov": "Type: audit · Source role: SVP Talent Management · Reference: Technical evidence pack for 7.2.5.1 Obtain candidate background information at Agent-delegation · Confidence: high · Coverage: the recruiting function · Date: Oct 2026",
     "gap": "None material for Agent-delegation.",
     "act": "None before the step; keep it in place and recheck at the next review.",
     "owner": "SVP Talent Management",
     "move": "Would drop to Conditional on: results that cannot be traced to this organization’s data."
    },
    "_over|manager": {
     "ev": "Test data. No escalation criteria for Agent-delegation; the manager expects AI exceptions to go to IT.",
     "prov": "Type: interview · Source role: SVP Talent Management · Reference: Manager and governance-body interviews · Confidence: medium · Coverage: oversight of 7.2.5.1 · Date: Oct 2026",
     "gap": "Not in place for Agent-delegation; this holds the step.",
     "act": "Agree escalation criteria and run one exception review with the team before the step.",
     "owner": "CHRO",
     "move": "Moves up on: an exception review held and its outcomes recorded."
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
