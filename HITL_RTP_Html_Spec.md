# HITL Role Transition Profile (docs/rtp_<slug>.html) — Design Spec

**Status:** Partial lock, August 9, 2026. This is the first formal spec for this doc type — it did not exist before this session; the 11 real PCF 7.0 pages were built individually over several earlier sessions without one. This spec was written by reverse-engineering the real, live `docs/rtp_hrbp_manager.html` (ground truth) plus the retrofit work done this session across all 11 PCF 7.0 pages and the new PCF 8.0 pilot (`rtp_it_service_manager.html`).

**Unlike the other four locked specs (Maturity, domain-wide RACI, Value Stream Profile, Per-Stream RACI), this doc type is only partially generator-driven, and that split is permanent, not a gap to close.** See §4–5.

Generator: `gen_rtp.js`, invoked as:
```
node gen_rtp.js <domain>.json "<Role Name>" <output-slug>
# e.g. node gen_rtp.js pcf8_full.json "Director of Cybersecurity" director_of_cybersecurity
```
Requires `rtp_style.css` (the full accumulated stylesheet) in the same directory. Output is `rtp_<slug>.html`, written with `[[TODO: ...]]` markers in every section that needs real research — **never ship a file with TODO markers still present.**

---

## 1. Page setup

HTML, not docx — no page-size/margin concept. Fonts: Playfair Display (serif, titles) + DM Sans (body) + DM Mono (PCF codes), loaded from Google Fonts. Palette: `--navy: #1B4F8A`, `--navy-d: #0D2D4F`, `--navy-l: #EEF3FA`, standard 5-pattern fill/text/bar triads (see `PATTERN_META` in the generator — copied from `index.html`'s own `PATTERN_META`/`PATTERN_BAR` constants, ground truth, not reconstructed).

## 2. Masthead, breadcrumb, footer

Identical navy masthead (framework name + "Where human judgment belongs" tagline + Documentation/Dashboard nav links) and breadcrumb (`Documentation / People View / {Role Name}`) across every page. Footer: Tim's name/title/date, "Co-developed with Claude (Anthropic)", email, site URL — unchanged from the original pages, not regenerated per role.

## 3. R/A-touch rule — broader than the print docs

RTP pages use **Responsible OR Accountable**, not the print docs' Accountable-only Process Accountability rule. This is deliberate and was confirmed directly from the real `rtp_hrbp_manager.html` page's own methodology note, not assumed. A role can have real RTP-page touches (and get counted) on an L3 where it's only Responsible, even with zero Accountable ownership anywhere — this is common for Operational-tier and specialist roles paired with a Managerial owner (e.g. L&D Specialist's R-side pairing with Director of L&D).

**Real name-matching gotcha, confirmed the hard way:** raw RACI `R`/`A` fields carry inconsistent abbreviations (`"HRBP Mgr"` vs `"HRBP Manager"`, `"Dir. of L&D"` vs `"Director of L&D"`) and scope-qualifying parentheticals (`"HRBP Manager (partial—see gap note)"`, `"HRIS Analyst (HR-owned scope)"`). A naive exact-string match undercounts real touches. The generator's `normalizeRole()` strips trailing parentheticals and applies a known-abbreviation map (`ABBREV`) — **inspect a new domain's actual raw R/A strings first** (`d.groups.flatMap(g=>g.l3).map(l3=>l3.raci)`) before assuming the existing `ABBREV` map covers it; PCF 7.0's abbreviations won't necessarily apply to a new domain.

This exact gap — an early, cruder matcher — caused a real discrepancy on the live `rtp_hris_analyst.html` page (stated 17 L4 units; corrected R/A-touch total is 20). Flagged directly on that page with a highlighted note rather than silently changed. Any future recompute against updated RACI data should watch for the same class of drift.

## 4. Mechanical sections (generator-produced, no research needed)

- **Role Impact Snapshot** — 6 stats: L3 processes touched, L4 activity units, process groups spanned (of the domain's total), Aggregate M1→M3 (count-weighted blend across all 5 patterns' standard values — see `weightedM1M3()`), Convergence gap, Dominant pattern + its % share.
- **Role Pattern Mix** — 5 cards, identical component to the Value Stream Profile docs' AI Capability Map (`PATTERN_META` fill/text/tagline, count + M1→M3 per pattern, 0-count patterns get the explicit empty-state note, never omitted). **Caption-note bug fixed this session, don't regress it**: the sentence explaining why the dominant pattern's own M3 differs from the blended aggregate has two real cases — dominant M3 *above* the blend (common: Knowledge-dominant roles) and dominant M3 *below* the blend (Transaction/Document-dominant roles like Recruiter, HRIS Analyst, IT Service Manager). An early version only handled the "above" case and produced a grammatically broken sentence for the "below" case. `captionNote()` handles both branches plus an exact-match branch.
- **Role Impact Profile — Full Detail table** — every touched L3 + its L4 children. **L3 rows ALWAYS get a bar** (solid single-color if single-pattern/leaf, proportionally segmented if `mixed`), **L4 rows ALWAYS get a text badge** — never the reverse. This was a real bug found and fixed this session: an early draft (and the original `rtp_hrbp_manager.html` reference itself) used a badge for single-pattern leaf L3 rows, inconsistent with the locked domain-wide Maturity/RACI convention that L3 always gets a bar. All 12 real pages built or retrofitted this session use the corrected always-bar rule; if you ever pull a pre-August-9 PCF 7.0 page as a styling reference again, know that its L3 badge-vs-bar treatment is wrong and needs correcting, not copying.
- **Legend** — identical compact 5-item legend to every other locked doc type, plus the R/A-touch-basis note.

## 5. Researched sections (generator emits `[[TODO]]` placeholders — cannot be automated)

These require a real, substantive external source per role — the same standard set by Bersin-sourced HR pages and the ITIL/McKinsey-sourced IT Service Manager pilot. **Never fabricate a source or invent plausible-sounding history.**

- **A bespoke narrative section** (title varies per role — e.g. "The Densest Judgment Profile in the Framework" for Recruiter, "A Named Case Study, Not a Hypothetical" for Onboarding Coordinator) — grounded in what the real table data actually shows for that specific role, not generic filler. Exception: HRIS Analyst's page uses "How the Role Has Evolved" as this section's own heading rather than a separate bespoke title — don't force a second, redundant section onto it.
- **Skills & Competencies** — 5 real bullets + a "Framework connection" callout tying them back to the Role Pattern Mix finding. Needs one real, named, fully-fetched source (not a snippet-only citation).
- **Role Progression Framework** — 3-column table (Getting Started / Established / Future-Focused), structure borrowed from the AIHR "HR Business Partner Guide" infographic (**cite this explicitly as structural-template-only, no content reused** — an attribution gap on the original IT Service Manager draft, caught and fixed this session). Column content grounded in the same real source as Skills & Competencies, or a distinct real career-path source.
- **How the Role Has Evolved: 5-era evolution timeline** — real, independently-verified history **appropriate to that role's actual domain**, never borrowed wholesale from a different domain's timeline. PCF 7.0 (HR) roles share the same real Ulrich/AIHR-era arc (1996/97 *Human Resource Champions* → mid-2000s three-pillar HRBP/CoE/Shared-Services split → 2010s people analytics → 2020s COVID-era partner role → 2026 AI-era), each era's *description* tailored to what it meant for that specific role — this is legitimate reuse of the same cited historical facts, not fabrication. A different domain needs its own real history (e.g. ITIL version history worked for IT Service Manager; a Director of Cybersecurity page would need real NIST CSF/ISO 27001/zero-trust history instead — do not reuse ITIL's timeline for a non-ITSM role). Verify era dates independently via web search before publishing; don't trust a single source's framing uncritically.
- **McKinsey "agent manager" connection** — Julie Goran, "Rewired takes: How AI is unlocking creativity and heralding the rise of the agent manager," McKinsey & Company, July 2026, **is fully reusable as-is across every role in every domain** — it's about management and AI broadly, not tied to HR or IT. Only the one-sentence connection tying it to the specific role's own scope needs to change per role.
- **Sources line** — every real citation used in the section, plus the standing AIHR structural-template-only attribution.

## 6. Colors used for the evolution timeline (not the pattern palette)

5-era capsules progress pale-to-navy (`#EEF3FA` → `#DCE6F5` → `#B9CCEA` → `#7FA3D6` → `var(--navy-d)`), **not** the Decision/Knowledge/Document/Transaction/Exception pattern colors — using the pattern palette here would wrongly imply eras map to patterns. The final "Now" era gets a ★ in its label, matching the M3★ convention used throughout the framework's locked docs.

## Build/validation checklist for any new role

1. Run `node gen_rtp.js <domain>.json "<Role Name>" <slug>` — confirms the mechanical numbers are real and consistent (cross-check Snapshot stats against a second independent computation if the role's data looks unusual, the way HRIS Analyst's discrepancy was caught).
2. Fill in every `[[TODO]]` block with real, sourced content — see §5. Do not remove a TODO marker without replacing it with genuine content.
3. Structural validation: div/tr/p tag-balance check, H2 section count and order, all real PCF codes present in the table (same discipline as every other doc type).
4. Visual render check (wkhtmltoimage or equivalent) before delivering — confirm bars vs. badges are correct on L3 vs. L4 rows, capmap cards render as a 2-column grid (note: some headless renderers don't support CSS Grid properly and will show them stacked single-column — this is a renderer limitation, not a page bug; confirmed against real Chrome screenshots).
5. Confirm the caption-note sentence reads grammatically in both directions (dominant-above-blend and dominant-below-blend) before delivering.

## Known outstanding

- Zero-touch roles (roles with no real R/A touches on any L3 — e.g. SVP Technology, Data Engineer, Cybersecurity Analyst in PCF 8.0) need to be built by hand, not through this generator, which assumes real touches exist and only warns rather than handling the zero case gracefully. PCF 7.0 handled its 3 zero-touch roles (SVP Talent Management, VP People & Culture, Director of TA) by leaving them explicitly named as "not yet profiled" on the Role Taxonomy overview page rather than generating empty pages — same convention should apply to PCF 8.0's zero-touch roles.
- Only verified so far against PCF 7.0 (11 of 11 roles now retrofitted) and one PCF 8.0 pilot (IT Service Manager). Director of Cybersecurity is queued as the next PCF 8.0 role — real R/A-touch data already computed (8 L3s, 53 L4 units, single group 8.3), evolution timeline and other researched sections not yet written.
- This spec's §5 boundary (mechanical vs. researched) is itself worth re-examining if this doc type ever needs true full automation — but doing so would mean either accepting generic, ungrounded narrative content (a real quality regression) or building genuine research-retrieval into the generator itself, neither of which has been attempted.
