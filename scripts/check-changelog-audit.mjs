#!/usr/bin/env node
// Changelog audit — the automatic half of GR-043's "keep version history"
// requirement (see docs/wip/requirements_register.html and
// docs/wip/changelog-data.js). docs/wip/changelog-data.js is still a
// manually-written CHANGE_LOG entry (a human has to supply the "why"),
// but *forgetting* to write one is exactly the kind of thing CI should
// catch. This script fails the build when a commit range changes a
// tracked modeled-data value (a reportsTo edge, a WR rel/ceiling
// classification) without also adding a new entry to changelog-data.js.
//
// Usage:
//   node scripts/check-changelog-audit.mjs <baseRef> <headRef>
// Defaults to comparing HEAD~1..HEAD when no args are given, which is
// what a local pre-commit/pre-push hook wants. The GitHub Actions
// workflow (.github/workflows/changelog-audit.yml) passes explicit
// base/head shas.

import { execFileSync } from "node:child_process";

const CHANGELOG_FILE = "docs/wip/changelog-data.js";

// Each tracked file maps to a regex that matches a line *only* when it's
// part of the actual modeled-data entry we care about — not just any
// line in the file. Kept deliberately narrow so unrelated edits (CSS,
// copy, new UI features) never trip a false positive.
const TRACKED = [
  {
    file: "docs/hitl_dashboard_final.html",
    // Lines inside ROLE_TAXONOMY_BY_DOMAIN that set a reportsTo edge, e.g.
    //   { name: "HRBP Manager", tier: "Managerial", reportsTo: "Director of HR Ops" },
    pattern: /reportsTo\s*:\s*"/,
    label: "a reportsTo edge in ROLE_TAXONOMY_BY_DOMAIN",
  },
  {
    file: "docs/sandbox/pcf7.html",
    // WR_DATA activity entries are each authored as one line, e.g.
    //   "7.2.1.1": { rel:"Judgment", ceiling:"Judgment", ... }
    // Matching on the activity-code key + a WR field is enough to catch
    // an edit to rel/ceiling without matching unrelated code that
    // happens to use the word "ceiling" elsewhere (e.g. ceilingFactors,
    // ceilingNote, CSS custom properties). Future State was retired
    // Sept 25, 2026 (GR-049, CL-003), so it is no longer tracked.
    pattern: /"\d+(?:\.\d+)+"\s*:\s*\{[^}]*\b(rel|ceiling)\s*:/,
    label: "a WR classification/ceiling value in WR_DATA",
  },
  {
    file: "docs/sandbox/pcf7.html",
    // The sandbox keeps its own ROLE_TAXONOMY copy (Organizational Role
    // Taxonomy's PCF 7.0 catalog) — same field, same reason to track it as
    // the dashboard's copy above. Per the Content Promotion Policy's
    // master-data lane, this is the master table: it's edited first, then
    // published to docs/hitl_dashboard_final.html.
    pattern: /reportsTo\s*:\s*"/,
    label: "a reportsTo edge in the sandbox's ROLE_TAXONOMY",
  },
];

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" });
}

function changedFiles(base, head) {
  return git(["diff", "--name-only", `${base}..${head}`])
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function trackedFieldChanged(file, pattern, base, head) {
  let diff;
  try {
    diff = git(["diff", "-U0", `${base}..${head}`, "--", file]);
  } catch {
    return false;
  }
  return diff
    .split("\n")
    .some((line) => (line.startsWith("+") || line.startsWith("-")) && !line.startsWith("+++") && !line.startsWith("---") && pattern.test(line));
}

function changelogGainedEntry(base, head) {
  let diff;
  try {
    diff = git(["diff", "-U0", `${base}..${head}`, "--", CHANGELOG_FILE]);
  } catch {
    return false;
  }
  // A real new entry adds an "id": "CL-..." line, not just a comment or
  // whitespace tweak.
  return diff.split("\n").some((line) => line.startsWith("+") && !line.startsWith("+++") && /"id"\s*:\s*"CL-/.test(line));
}

function main() {
  const [argBase, argHead] = process.argv.slice(2);
  const base = argBase || "HEAD~1";
  const head = argHead || "HEAD";

  // First push of a branch (or a shallow/zero "before" sha from GitHub
  // Actions) has nothing meaningful to diff against — skip rather than
  // false-fail.
  if (/^0+$/.test(base)) {
    console.log("changelog-audit: base is a zero sha (new branch/first push) — skipping.");
    return;
  }

  let files;
  try {
    files = changedFiles(base, head);
  } catch (e) {
    console.log(`changelog-audit: couldn't diff ${base}..${head} (${e.message.split("\n")[0]}) — skipping.`);
    return;
  }

  const flagged = TRACKED.filter(
    (t) => files.includes(t.file) && trackedFieldChanged(t.file, t.pattern, base, head)
  );

  if (flagged.length === 0) {
    console.log("changelog-audit: no tracked modeled-data values changed — OK.");
    return;
  }

  const changelogTouched = files.includes(CHANGELOG_FILE) && changelogGainedEntry(base, head);

  if (changelogTouched) {
    console.log(
      `changelog-audit: ${flagged.map((f) => f.label).join(", ")} changed, and ${CHANGELOG_FILE} gained a new CL- entry — OK.`
    );
    return;
  }

  console.error("changelog-audit: FAILED");
  console.error("");
  for (const f of flagged) {
    console.error(`  - ${f.file} changed ${f.label}`);
  }
  console.error(`  but ${CHANGELOG_FILE} has no new "CL-…" entry in this range (${base}..${head}).`);
  console.error("");
  console.error(
    "  Add an entry to CHANGE_LOG in docs/wip/changelog-data.js describing what changed, who"
  );
  console.error(
    "  requested it (Tim or GiGi), the source evidence, and how it was verified — then re-run."
  );
  process.exitCode = 1;
}

main();
