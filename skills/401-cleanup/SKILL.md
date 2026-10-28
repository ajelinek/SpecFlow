---
name: 401-cleanup
description: >
  Use `401` to clean up an already-changed source scope or test scope without turning it into a
  broad rewrite. Trigger it for prompts like "401", "cleanup this change", "refactor the touched
  files", or "tidy the tests", and run it separately for source and test cleanup.
argument-hint: "[source|test] [scope-anchor]"
context: fork
---

# 401 - Cleanup

One thorough, in-scope cleanup pass over an existing changed set — either touched source files or
touched test files, never both. Choose exactly one target type per run: `source-cleanup-only` or
`test-cleanup-only`; the other side is forbidden scope. Not feature work, bug-fix delivery, or
additive test coverage — reroute those to `301-spec-implementation` or `302-test-implementation`.

**Output**: Updated existing source or test files. No new `.specflow/` artifact.

---

## Required Inputs

1. **Cleanup scope anchor** — staged changes, last `N` commits, specific files or directories, or a
   PR/diff range
2. **Cleanup target type** — exactly one of source or test
3. **Preservation constraints** — APIs, assertions, patterns, deadlines, or boundaries that must not
   change
4. **Pre-authorized scope expansion** *(optional)* — when the caller grants it (e.g. `901`'s final
   round), apply out-of-scope opportunities in Step 7 without returning for approval

**Blocking questions.** This skill runs in a forked context and can't reach the user. When the
changed set is unclear, the scope mixes source and test files, baseline failures make risk hard to
judge, or broadening scope needs approval, stop and return the question to the caller with options
and a recommendation.

---

## Execution Protocol

You are the orchestrator. All edits go through `@coder` (else the general agent); all validation
through `@validator`, whose feedback outranks model opinion on whether the cleanup stayed safe.
Prefer loaded standards and repo conventions over generic cleanup advice.

Keep a compact working state: cleanup brief (outcome, scope anchor, target type); cleanup ledger
(in-scope files, allowed and forbidden modules, no-touch areas); context map (nearby modules,
helpers, patterns, validation surface); standards index (conventions, config, loaded skills); risk
register (in-scope correctness risks, fragile assumptions, baseline failures). Subagents receive only
the task packet in Step 8 — never the full conversation, every changed file, or unrelated history.

---

## Steps

### Phase 0 - Prepare

- [ ] **Step 1: Resolve scope and target type.** Identify the exact changed set and require exactly
  one target type; a mixed set is a blocking question before any edit.

- [ ] **Step 2: Load conventions.** Load `engineering-principles`, then loaded standards and any
  relevant skills that materially affect the target type. Read only the repo docs, config, or guidance
  needed to judge the files in scope.

- [ ] **Step 3: Freeze the edit boundary.** Record files in scope, target type, explicit no-touch
  areas, and files excluded because they belong to the other target type.

- [ ] **Step 4: Baseline with `@validator`** — `mode: test`, plus `mode: lint` and `mode: build` where
  they apply. Baseline integrity is mandatory: record and surface pre-existing failures before any
  edit so regressions can be judged honestly.

### Phase 1 - Explore and Classify

- [ ] **Step 5: In-scope review with `@explore`** over the selected files and only the nearby code
  needed to judge them: helpers and patterns to match; duplication, dead code, weak naming, misplaced
  logic, avoidable complexity, pattern drift; in-scope correctness risks (missing guards, unsafe
  assumptions, incomplete validation, brittle error handling, fragile tests, suspicious edge cases);
  out-of-scope opportunities. For test cleanup, focus on fragility, confusing assertions, weak
  fixtures, misleading names, and helper duplication.

- [ ] **Step 6: Classify** into in-scope cleanup (structure, duplication, naming, readability, dead
  code), in-scope risk fixes (obvious robustness issues safely fixable inside scope), and out-of-scope
  opportunities (require touching new files or modules).

- [ ] **Step 7: Approval before broadening.** Present out-of-scope opportunities as explicit options
  naming the files/modules they'd add; edit outside the initial boundary only with approval (or
  pre-authorization). Never cross between source and test cleanup.

### Phase 2 - Cleanup Pass

- [ ] **Step 8: Freeze the task packet:** objective, phase, target type, exact files allowed to
  change (including newly approved ones), full in-scope cleanup goals, reusable helpers/modules that
  may be extended, standards excerpt, success criteria, and the forbidden files plus the entire other
  target type.

- [ ] **Step 9: Cleanup pass with `@coder`** — a full in-scope pass, not cosmetic polish: duplication,
  naming, dead code, structure, and obvious in-scope robustness issues where intent is clear (no
  speculative redesign disguised as cleanup). Reduce complexity in existing modules rather than add
  abstraction layers, and fold duplicated code into its existing owner (if that owner is outside the
  changed set, Step 7 applies).
  - **Source cleanup**: never edit tests, test helpers, or assertions.
  - **Test cleanup**: never edit production files, add scenarios or coverage, or create test files.

### Phase 3 - Validate and Summarize

- [ ] **Step 10: Validate with `@validator`** — targeted tests, broader regression tests when needed,
  lint/build where applicable. On failure, a focused `@coder` repair of only the reported regression,
  keeping the target type, then rerun; stop and return the blocker if repairs stop converging.

- [ ] **Step 11: Summarize.** Initial and final approved scope; target type; files changed;
  conventions or skills that shaped the cleanup; key wins and risk fixes; out-of-scope opportunities
  not approved; baseline failures; final validation result.
