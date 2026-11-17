// ABC Test Org, process group 7.2: one scenario per activity, chosen so every input and every outcome shows at least once.
// cur: the assessed Current State (null = Unassessed). te: the Technical / process check for the next step
// (met | not | ins | serious; miss = which measure misses). rd: readiness for the next step: base finding, then
// overrides as "dim" (organizational or shared), "dim@Role" (one role), "over" (governance oversight).
module.exports = {
 '7.2.1.1': {cur:'Judgment', conf:'high', ev:'observed', te:{mode:'met'}, rd:{base:'ready'}, say:'The gate clears: every check is met or Ready.'},
 '7.2.1.2': {cur:'Oversight', conf:'medium', ev:'system', te:{mode:'not'}, rd:{base:'ready'}, say:'Holds on the technical check: the audit-pass rate misses its threshold.'},
 '7.2.1.3': {cur:'Augmentation', conf:'high', ev:'audit', te:{mode:'met'}, rd:{base:'ready', set:{'skill@HRBP Manager':'not','capacity':'cond','change':'cond'}, over:'ready'}, say:'High work: the weakest link holds the step, one role Not Ready on Capability / Skill.'},
 '7.2.1.4': {cur:'Automation', conf:'high', ev:'system', say:'At its Progression Ceiling: no next step.'},
 '7.2.1.5': {cur:'Agent-delegation', conf:'medium', ev:'system', te:{mode:'ins'}, rd:{base:'ready'}, say:'Holds on insufficient evidence: the in-stage audit is below its minimum volume.'},
 '7.2.1.6': {cur:null, say:'Unassessed: no Current State yet.'},
 '7.2.1.7': {cur:'Judgment', conf:'low', ev:'interview', say:'Assessed, with nothing assessed for its next step yet (a dashed square).'},
 '7.2.2.1': {cur:'Automation', conf:'high', ev:'system', override:true, say:'A ceiling override raises the ceiling to Automation, with a review recorded.'},
 '7.2.2.2': {cur:'Automation', conf:'medium', ev:'system', say:'Past its Progression Ceiling with no override: a finding.'},
 '7.2.2.3': {cur:'Augmentation', conf:'medium', ev:'observed', te:{mode:'met'}, rd:{base:'ready', set:{'fluency':'cond','manager':'cond'}}, say:'Clears with conditions, each with its required action recorded.'},
 '7.2.2.4': {cur:'Oversight', conf:'medium', ev:'observed', elPast:true, te:{mode:'met'}, rd:{base:'ready', set:{'safety@Recruiter':'cond'}, noAct:['safety@Recruiter']}, say:'An element led past its own ceiling; readiness by role below High, one Conditional finding still missing its required action.'},
 '7.2.2.5': {cur:'Human-only', conf:'high', ev:'interview', rd:{base:'ready'}, say:'Assessed at the Human-only baseline; readiness assessed but the technical replay not yet, so the step holds gray.'},
 '7.2.2.6': {cur:'Agent-delegation', conf:'medium', ev:'audit', te:{mode:'serious'}, rd:{base:'ready'}, say:'Holds: the discrepancy log has an open Serious entry.'},
 '7.2.3.1': {cur:'Augmentation', conf:'high', ev:'observed', say:'At its Progression Ceiling: no next step.'},
 '7.2.3.2': {cur:'Judgment', conf:'high', ev:'observed', te:{mode:'met'}, rd:{base:'ready', over:'ready'}, say:'High work that clears: governance oversight Ready and the evidence signed off.'},
 '7.2.3.3': {cur:'Augmentation', conf:'medium', ev:'document', te:{mode:'met'}, rd:{base:'ready', set:{'evidence':'ins'}, over:'ready'}, say:'Holds on Trust / Evidence Quality, a candidate hard gate, at Insufficient Evidence.'},
 '7.2.3.4': {cur:'Judgment', conf:'high', ev:'observed', te:{mode:'met'}, rd:{base:'ready', set:{'skill@Recruiter':'cond','fluency@Recruiter':'cond','capacity@Director of TA':'cond','change':'cond'}, over:'cond', rich:true}, say:'GiGi’s Critical pilot: clears with conditions, with full evidence records on every dimension.'},
 '7.2.4.1': {cur:'Agent-delegation', conf:'high', ev:'system', te:{mode:'met'}, rd:{base:'ready'}, say:'Clears for Automation: 1,000+ instances audited and signed off.'},
 '7.2.4.2': {cur:'Augmentation', conf:'high', ev:'observed', say:'High work at its Progression Ceiling.'},
 '7.2.4.3': {cur:'Oversight', conf:'medium', ev:'interview', rd:{base:'ready', set:{'safety':'not','change':'not'}}, say:'Holds Not Ready on Psychological Safety and Change Capacity; the technical check not yet run.'},
 '7.2.5.1': {cur:'Oversight', conf:'high', ev:'audit', te:{mode:'not', miss:1}, rd:{base:'ready', over:'not'}, say:'High work held twice: exception-detection recall misses, and governance oversight is Not Ready.'},
 '7.2.5.2': {cur:'Automation', conf:'high', ev:'system', say:'At its Progression Ceiling.'},
 '7.2.5.3': {cur:null, say:'Unassessed: no Current State yet.'},
 '7.2.5.4': {cur:'Augmentation', conf:'medium', ev:'system', te:{mode:'met'}, say:'Technical check met by a shadow run; readiness not yet assessed, so the step holds gray.'},
};
