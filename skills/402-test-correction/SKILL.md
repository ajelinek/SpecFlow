---
name: 402-test-correction
description: >
  Use `402` to investigate and correct a failing automated test by deciding whether the right fix is
  in the test, in production code, or in the expected behavior itself. Trigger it for prompts like
  "402", "fix this failing test", "is this a test issue or a product bug", or "triage the
  failing spec".
---

# 402 - Test Correction

Start from a failing automated test and determine the correct correction path before editing
anything.

This workflow exists for the cases where a red test does not immediately tell you whether the defect
is:

1. a broken or stale test
2. a real source-code defect
3. an intentional product behavior change that now conflicts with the old test

The job of `402` is to classify the failure, explain why, and only then apply the smallest correct
fix.

**Output**: Corrected test files, corrected source files, or a blocking user decision when the
failing test exposes an intended behavior change or product-capability ambiguity.

---

## Required Inputs

Before proceeding, confirm:

1. **Failure anchor** — failing test name, file, command, stack trace, CI link, or screenshot of the
   failure
2. **Execution surface** — UI, API, integration, unit, or mixed
3. **Change window** — the recent commits, diff range, PR, or changed files most likely related to
   the failure
4. **Decision boundary** — whether this run may correct only tests, may correct only source, or may
   correct either once the failure is classified

If the failing scope is too vague, ask one blocking question.

---

## Execution Protocol

- You are the orchestrator.
- Use `@explore` for focused discovery of failing-test context, similar patterns, and recent code
  movement.
- Use `@execution-agent` to reproduce failures and validate the chosen fix.
- Use `@coder` only after the failure classification is strong enough to justify a specific edit
  path.
- Keep a compact working model: failure anchor, suspected affected files, recent changes, current
  classification, allowed edit boundary, and decision rationale.

---

## Classification Model

Every `402` run must classify the failure into one of these buckets before broad editing begins:

- **Test defect** — the product behavior is still correct, but the test assertion, setup, timing,
  fixture, selector, or expectation is wrong or stale
- **Source defect** — the failing test is exposing a real regression or missing guard in production
  behavior
- **Behavior change / ambiguous intent** — the observed behavior changed in a way that may be
  intentional, or the failure represents a business-capability question rather than a clear defect

The third bucket is mandatory. Do not force every failure into "test bug" or "source bug".

---

## Steps

- [ ] **Step 1: Anchor the exact failing signal.** Identify the smallest reproducible failing unit:
  single test, scenario, spec block, or command. Capture the exact failure text and where it occurs.

- [ ] **Step 2: Establish baseline reproduction with `@execution-agent`.** Re-run the narrowest
  useful command first. Confirm the failure is current, reproducible, and not already superseded by
  unrelated repo breakage. Record any pre-existing failures that weaken confidence.

- [ ] **Step 3: Load local intent sources.** Read the closest intent-defining artifacts that exist:
  test name and body, `.feature` file, feature `overview.md`, implementation doc, inline comments,
  nearby assertions, and adjacent tests. Use these to understand what the failing test is trying to
  protect.

- [ ] **Step 4: Inspect recent code movement.** Review the relevant recent commits and changed files
  around the failing area. Identify what changed in the test, selectors, contracts, UX copy,
  rendering structure, validation rules, state transitions, and business logic. Use history to build
  a plausible explanation for why the test started failing.

- [ ] **Step 5: Compare against similar tests and patterns.** Find 2-3 nearby tests or helpers that
  cover similar behavior. Check whether the failing test drifted from established patterns or whether
  the implementation drifted away from the surrounding feature family.

- [ ] **Step 6: Classify the failure.** Decide which of the three buckets is most supported by the
  evidence.

  Use these decision rules:
  - selector drift alone is not automatically a product defect if the same user capability still
    works and the behavior contract did not change
  - a changed business outcome, validation rule, state transition, or user-visible capability is not
    just a "test fix"; treat it as a likely source defect or behavior-change question
  - if the implementation and the test both look reasonable but disagree about intended behavior,
    stop and ask instead of guessing

- [ ] **Step 7: Stop for ambiguous business-intent changes.** If the failure appears to come from a
  real functionality change, a product decision, or unclear intended behavior, do not silently patch
  either side. Present the user with:
  - what changed
  - why it looks intentional or ambiguous
  - why this is not just a selector or harness issue
  - the two plausible correction paths

- [ ] **Step 8: Freeze the correction boundary.** Build a task packet that states:
  - chosen classification
  - exact files allowed to change
  - exact files that are read-only references
  - forbidden edits outside the selected correction path
  - the evidence that justifies this path

- [ ] **Step 9: Run the minimal correction pass with `@coder`.**

  Under **test defect**:
  - prefer the smallest fix to setup, assertions, fixtures, selectors, waits, or helpers
  - preserve the business assertion when the behavior still exists
  - do not weaken the test just to make it pass

  Under **source defect**:
  - fix the smallest production behavior needed to satisfy the existing intended assertion
  - change tests only when the source fix legitimately changes observable output or supporting test
    setup
  - do not reinterpret a regression as a test issue to avoid touching source

- [ ] **Step 10: Validate the chosen fix with `@execution-agent`.** Run the failing test first, then
  the strongest nearby validation surface the repo supports. If the fix path fails to converge,
  reassess the classification rather than blindly iterating.

- [ ] **Step 11: Record rationale and risks.** Summarize why the failure was classified the way it
  was, what evidence supported that call, and any residual fragility that remains.

- [ ] **Step 12: Summarize.** Report:
  - failing test scope
  - reproduction command
  - recent commits or changed files reviewed
  - final classification: `test defect`, `source defect`, or `behavior change / ambiguous intent`
  - why that classification won
  - exact files changed
  - whether the fix changed tests, source, or both
  - final validation result
  - any user decision that was required before continuing

---

## Non-Negotiables

1. Reproduce the failure before changing code whenever feasible.
2. Review recent commits or changed files relevant to the failure before deciding the fix path.
3. Do not assume every red test means broken product code.
4. Do not assume every selector or UI-structure mismatch means the test should be updated.
5. A still-broken business capability is not a harmless test defect.
6. If the disagreement is really about intended functionality, stop and ask.
7. Prefer the smallest correct fix once classification is clear.
8. Never "fix" a test by deleting meaningful coverage or replacing business assertions with weaker
   implementation-detail checks.
