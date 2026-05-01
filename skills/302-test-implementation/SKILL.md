---
name: 302-test-implementation
description: >
  Use `302` to add or repair automated tests for behavior that already exists. Choose it when the
  missing work is test coverage, not broad production-code changes. Trigger it for prompts like
  "302", "test-only implementation", "write the tests", or "add E2E coverage".
---

# 302 - Test-Only Implementation

Implement automated tests for behavior that already exists in the codebase. This workflow is for
coverage gaps after implementation is complete, not for delivering new behavior.

Default rule: change tests, not production code. The only routine exception is a minimal UI
testability adjustment such as an accessible label, accessible name, role, or stable selector that
does not change user-visible behavior.

**Output**: No new `.specflow/` artifact. Update test files in the project and, if present, the
feature `overview.md` status.

---

## Required Inputs

Before proceeding, confirm:

1. **Test scope** — feature name, `.feature` file, `@TS###` / `TSM###`, scenario titles, or a
   precise behavior description
2. **Implementation status** — the behavior already exists
3. **Test surface** — UI, API, integration, unit, or mixed
4. **Code-touch boundary** — production code is off-limits except the minimal UI testability hook
   exception

If the scope is too vague, ask one blocking question. If the behavior is not implemented yet,
reroute to `301-spec-implementation`. If requested scenarios and actual behavior disagree, stop and
ask whether the implementation or the scenarios should be corrected first.

---

## Execution Protocol

- You are the orchestrator.
- Code changes go through `@coder`.
- Validation goes through `@execution-agent`.
- Use `@explore` only for focused discovery of implementation and test patterns.
- Keep a compact working model: scope, touched test files, allowed read-only references,
  touch-boundary exceptions, and reusable helpers/patterns.

---

## Steps

- [ ] **Step 1: Resolve scope and confirm workflow fit.** Anchor the scope to the smallest usable
  unit. If the request references a `.feature` file, scope it to a single `@TS###`, single `TSM###`,
  or the full file.

- [ ] **Step 2: Load feature and architecture context.** Read relevant existing artifacts when they
  exist, such as feature `overview.md`, `specs.feature`, `implementation.md`, and D02/D04/D05/D06/D07.
  Use them to understand intended coverage, but do not invent new scenarios here.

- [ ] **Step 3: Research implementation and test patterns.** Use `@explore` when needed to:
  - read the production files that implement the scoped behavior
  - find 2-3 similar tests
  - identify reusable page objects, fixtures, helpers, selectors, and setup utilities
  - flag behavior or implementation smells relevant to testability

- [ ] **Step 4: Freeze the touch boundary.** Build a task packet that names:
  - exact scenarios in scope
  - exact test files to create or modify
  - production files allowed as read-only references
  - explicit no-touch production boundaries
  - any UI files that may receive a minimal accessibility/testability hook only if required

  Under 302:
  - do not change business logic, routing, data flow, or visual design
  - do not touch frontend code for backend-only or API-only test work
  - preserve existing assertions unless they are wrong

- [ ] **Step 5: Establish the baseline.** Run `@execution-agent` for the relevant test/lint/build
  checks before editing. Record pre-existing failures and surface them if they block confidence.

- [ ] **Step 6: Run the test-only coding pass.** Use `@coder` to implement only the missing tests
  and directly supporting test helpers, fixtures, page objects, or setup code. Follow existing repo
  patterns.

- [ ] **Step 7: Validate the test changes.** Run `@execution-agent` as narrowly as the repo allows.
  Confirm the new tests are discovered and that regressions are not introduced.

  If failure shows the behavior is not actually implemented, stop and escalate instead of writing
  workaround assertions.

- [ ] **Step 8: Record non-blocking smells.** If the tests pass but the exercised behavior seems
  awkward, fragile, inconsistent, or misleading, record it as a smell for the summary. Do not
  broaden scope to fix it unless the change stays within the allowed UI testability exception.

- [ ] **Step 9: Use the UI testability exception only when necessary.** If a UI test cannot be made
  reliable without a product hook, run a narrowly scoped `@coder` pass limited to the smallest
  accessible label, accessible name, role, or stable selector needed. Do not use this exception for
  API, backend, or business-logic gaps.

- [ ] **Step 10: Run test cleanup if needed.** Limit this to the changed test files and approved
  shared test helpers. Improve clarity and deduplication without reducing coverage.

- [ ] **Step 11: Run post-change validation.** Execute the strongest normal validation the repo
  supports for this test surface. If validation fails, run a focused repair pass through `@coder`,
  repair only the reported test failure or approved UI hook, rerun validation, and stop if repair
  loops stop converging.

- [ ] **Step 12: Update feature status if applicable.** If `overview.md` exists, change `status`
  from `todo` to `implementing` when work starts and to `done` after validation passes.

- [ ] **Step 13: Summarize.** Report:
  - implemented test scope
  - scenarios covered
  - test files changed
  - helpers, fixtures, or page objects added or updated
  - whether the UI testability exception was used
  - behavior or implementation smells found
  - baseline failures, if any
  - final validation result
  - any mismatch between requested scenarios and actual implemented behavior

---

## Rules

1. Treat the existing implementation as the source of truth for 302.
2. Do not silently turn 302 into feature delivery.
3. Prefer business-outcome assertions over incidental implementation details.
4. Reuse existing test patterns before introducing new abstractions.
5. Prefer accessible selectors over custom test hooks.
6. If scenarios, implementation, and repo behavior disagree, stop and ask.
