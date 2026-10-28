---
name: 302-test-implementation
description: >
  Use `302` to add or repair automated tests for behavior that already exists. Choose it when the
  missing work is test coverage, not broad production-code changes. Trigger it for prompts like
  "302", "test-only implementation", "write the tests", or "add E2E coverage".
argument-hint: "[test-scope]"
context: fork
---

# 302 - Test-Only Implementation

Add automated tests for behavior that already exists — coverage gaps, not new behavior. The existing
implementation is the source of truth; never silently turn this into feature delivery.

Change tests, not production code. The only routine exception is a minimal UI testability hook — an
accessible label, accessible name, role, or stable selector that doesn't change user-visible behavior.

**Output**: Updated test files and, if present, the feature `overview.md` status. No new `.specflow/`
artifact.

---

## Required Inputs

1. **Test scope** — feature name, `.feature` file, `@TS###` / `TSM###`, scenario titles, or a precise
   behavior description
2. **Implementation status** — the behavior already exists; if not, reroute to
   `301-spec-implementation`
3. **Test surface** — UI, API, integration, unit, or mixed
4. **Code-touch boundary** — production code is off-limits except the UI testability exception

**Blocking questions.** This skill runs in a forked context and can't reach the user. When the scope
is too vague, or requested scenarios, implementation, and repo behavior disagree (which side to
correct first?), stop and return the question to the caller with options and a recommendation.

---

## Execution Protocol

You are the orchestrator. Code changes go through `@coder`, validation through `@validator`, and
`@explore` only for focused discovery of implementation and test patterns. Keep a compact working
model: scope, touched test files, read-only references, touch-boundary exceptions, reusable helpers.

---

## Steps

- [ ] **Step 1: Resolve scope and workflow fit.** Anchor to the smallest usable unit; for a `.feature`
  file, a single `@TS###`, single `TSM###`, or the full file.

- [ ] **Step 2: Load context.** The feature's `overview.md`, `specs.feature`, `implementation.md`, and
  D02/D04/D05/D06/D07 when present — to understand intended coverage, not to invent scenarios.

- [ ] **Step 3: Research patterns** with `@explore` as needed: the production files implementing the
  behavior; 2-3 similar tests; reusable page objects, fixtures, helpers, selectors, and setup
  utilities; existing accessibility hooks, test IDs, or selector conventions; testability smells.
  Reuse these before introducing new abstractions, per `engineering-principles`.

- [ ] **Step 4: Freeze the touch boundary** in a task packet: exact scenarios, exact test files to
  create or modify, read-only production references, explicit no-touch production boundaries, and any
  UI files that may receive a hook only if required. Never change business logic, routing, data flow,
  or visual design; never touch frontend code for backend/API-only test work.

- [ ] **Step 5: Baseline.** `@validator` for the relevant test/lint/build checks before editing.
  Record pre-existing failures; return them as a blocking question if they undermine confidence.

- [ ] **Step 6: Test-only pass.** `@coder` implements only the missing tests and directly supporting
  helpers, fixtures, page objects, or setup, following repo patterns: business-outcome assertions over
  implementation details; accessible selectors over custom hooks; typed, intentional helper inputs
  with no dead branches or unused setup; existing assertions preserved unless wrong, and new ones
  added only when they materially strengthen intended coverage.

- [ ] **Step 7: Validate** as narrowly as the repo allows: new tests are discovered and nothing
  regresses. If a failure shows the behavior isn't actually implemented, stop and escalate — never
  write workaround assertions.

- [ ] **Step 8: Record smells.** If tests pass but the behavior seems awkward, fragile, inconsistent,
  or misleading, record it for the summary rather than normalizing it silently, and don't broaden
  scope to fix it. Typical smells: awkward action sequences for common outcomes; weak labeling,
  affordance, or feedback; API contracts or setup inconsistent with nearby endpoints; inconsistent
  validation, loading, or error states; brittle timing workarounds or hidden state dependencies;
  unnecessary coupling or odd state transitions.

- [ ] **Step 9: UI testability exception, only if necessary.** If a UI test can't be made reliable
  without a product hook, a narrowly scoped `@coder` pass adds the smallest accessible label, name,
  role, or stable selector. Never for API, backend, or business-logic gaps.

- [ ] **Step 10: Test cleanup if needed** — changed test files and approved shared helpers only;
  improve clarity and deduplication without reducing coverage.

- [ ] **Step 11: Post-change validation** — the targeted tests, any broader related suite needed to
  catch regressions, and lint/build where they apply. On failure, a focused `@coder` repair of only
  the reported failure or approved hook, then rerun; stop if repairs stop converging.

- [ ] **Step 12: Update feature status** if `overview.md` exists: `todo` → `implementing` at start,
  → `done` after validation passes.

- [ ] **Step 13: Summarize.** Test scope and scenarios covered; test files changed; helpers, fixtures,
  or page objects added or updated; whether the UI exception was used; smells found, each typed as UX,
  API, validation, state-transition, or test-fragility; baseline failures; final validation result;
  any mismatch between requested scenarios and actual behavior.
