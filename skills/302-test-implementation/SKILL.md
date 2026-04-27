---
name: 302-test-implementation
description: >
  Use this skill when you need to implement missing or incomplete automated tests for behavior
  that is already implemented. Trigger it for requests like "302", "test-only implementation",
  "write the tests", "add E2E coverage", or "automate these scenarios" when the goal is to
  add or repair tests without broad production-code changes.
---

# 302 - Test-Only Implementation

Implement automated tests for behavior that already exists in the codebase. This workflow is for
closing test coverage gaps after implementation is complete, not for driving new feature work. The
default rule is simple: change tests, not production code. The only routine exception is a small
UI testability adjustment such as an accessibility label, accessible name, or stable selector that
makes an interaction reliably automatable without changing user-visible behavior.

This workflow also calls out implementation and behavior smells discovered while writing tests.
These are cases where the test can be made to pass, but the tested user experience, API shape,
state transition, validation behavior, or interaction model appears off, fragile, misleading, or
unnecessarily awkward.

**Output path**: No new `.specflow/` document is written. This workflow updates test files in the
project codebase and may update `.specflow/features/<feature-name>/overview.md` status if that file
already exists.

## Your Role

Run this as an orchestrator-worker workflow. Keep the scope and constraints in the lead agent,
delegate code changes to `@coder`, use `@explore` for focused codebase discovery when needed, and
use `@execution-agent` as the ground truth for test, lint, and build results.

## Required Inputs

Before proceeding, confirm:

1. **Test scope** - provide at least one of these anchors:
   - feature name
   - `.feature` file path
   - one or more scenario tags such as `@TS###` or `TSM###`
   - scenario titles
   - a precise plain-language description of the implemented behavior to cover

2. **Implementation status** - confirm the underlying behavior already exists in the codebase.

3. **Test surface** - identify whether this is UI, API, integration, unit, or mixed test work. If
   omitted, infer it from the scope and existing repository patterns.

4. **Code-touch boundary** - the default boundary is:
   - production code is off-limits
   - UI work may add only the minimum accessibility labels, accessible names, roles, or stable
     selectors needed for reliable tests
   - backend or API test work must not change production code

If the scope is too vague to identify the intended coverage, ask one blocking question before
proceeding. If the implementation is not complete, stop and route the work to
`301-spec-implementation` instead. If the requested scenarios do not match the actual behavior in
the codebase, stop and ask whether the implementation or the scenarios should be corrected first.

## Steps

- [ ] **Step 1: Resolve scope and confirm workflow fit.**
  - Determine the feature slug and working test scope from the request.
  - If the user references a `.feature` file, anchor scope to a single `@TS###`, a single
    `TSM###`, or the full file.
  - Confirm this is truly test-only work. If the missing behavior requires production logic,
    routing, data-model, or API changes, stop and route to `301-spec-implementation`.

- [ ] **Step 2: Load feature context and existing design artifacts.** Read these files directly if
      they exist:
  - `.specflow/features/<feature-name>/overview.md`
  - `.specflow/features/<feature-name>/specs.feature`
  - `.specflow/features/<feature-name>/implementation.md`
  - `.specflow/docs/D02-system-architecture.md`
  - `.specflow/docs/D04-backend-architecture.md`
  - `.specflow/docs/D05-frontend-architecture.md`
  - `.specflow/docs/D06-ui-design.md`
  - `.specflow/docs/D07-ui-experience.md`

  Skip files that do not exist. Use existing artifacts to understand the intended coverage, but do
  not invent new scenarios here. If the missing work is actually scenario design, stop and ask the user to execute the `202-spec-design`.

- [ ] **Step 3: Research the implementation and test patterns with `@explore`.** Use `@explore`
      when repository discovery is needed. Ask it to:
  - read the production files that already implement the scoped behavior
  - find 2-3 concrete existing tests that use the same patterns or framework surface
  - identify reusable page objects, fixtures, test-context helpers, tagging patterns, API helpers,
    and data setup utilities
  - identify any existing accessibility hooks, test IDs, or selector conventions already used in
    similar tests
  - flag any behavior or implementation smells that would matter from a test-implementation
    perspective, such as confusing UX flow, unstable interaction contracts, surprising API usage,
    inconsistent validation behavior, or awkward state transitions
  - return a concise summary with exact paths, reusable candidates, and any pattern inconsistencies

  Before moving on, load any relevant testing, language, accessibility, or framework standards that
  are already available through the environment's supported skill-loading tools.

- [ ] **Step 4: Freeze the touch boundaries before editing.** Build one focused task packet for the
      test work. Include:
  - exact scenarios in scope
  - exact test files to create or modify
  - production files allowed as read-only references
  - explicit no-touch production boundaries
  - any UI files that may receive minimal accessibility hooks if tests cannot be made reliable
    otherwise
  - any smells already identified that should be recorded if they appear during implementation

  Keep these boundaries strict:
  - do not change business logic, API behavior, data flow, routing, or visual design under 302
  - do not touch frontend code for backend-only or API-only test work
  - preserve existing assertions unless they are wrong; add assertions only when they materially
    improve validation of the intended business outcome

- [ ] **Step 5: Establish the pre-change baseline with `@execution-agent`.** Run the relevant
      validation commands before changing anything:
  - `mode: test`
  - `mode: lint` if the project normally lint-checks test files
  - `mode: build` if the project normally type-checks or compiles test code as part of validation

  Record pre-existing failures. If baseline failures already block confidence in the targeted area,
  surface them to the user and ask whether to proceed.

- [ ] **Step 6: Run the test-only coding pass with `@coder`.** Use the Step 4 task packet.
      Instruction: implement only the missing automated tests and any directly supporting test helpers,
      page objects, fixtures, or data setup code. Follow existing repository patterns. Keep helper
      inputs typed precisely. Avoid `any` when a real type is available or can be inferred.

- [ ] **Step 7: Validate the targeted test changes with `@execution-agent`.** Run `mode: test`
      scoped as narrowly as the repository supports. Confirm:
  - the new or updated tests are discovered
  - the targeted scenarios pass or fail only for a known testability gap
  - previously passing tests in the touched area still pass

  If the tests fail because the workflow tried to validate behavior that is not actually
  implemented, stop and escalate instead of writing workaround assertions.

- [ ] **Step 8: Classify non-blocking smells exposed by the tests.** If the tests can be made to
      pass but the exercised behavior still seems off, record that as a smell for the summary.
      Typical smells include:
  - the user must take a surprising or awkward sequence of actions for a common outcome
  - a control is technically operable but has weak labeling, poor affordance, or confusing feedback
  - an API contract works but is inconsistent with nearby endpoints or requires unnatural setup
  - validation, loading, or error states behave inconsistently across similar flows
  - the test depends on a brittle sequence, timing workaround, or hidden state because the product
    behavior is fragile even if technically correct
  - the implementation exposes an unnecessary coupling or odd state transition that makes the test
    harder to express cleanly

  Treat these as findings, not automatic blockers. Do not broaden scope to fix them under 302
  unless the change stays within the allowed UI accessibility-hook exception.

- [ ] **Step 9: Apply the UI accessibility-hook exception only when necessary.** If a UI test still
      cannot be written cleanly because the product lacks a reliable accessible hook:
  - run a narrowly scoped `@coder` pass
  - limit edits to the minimum accessible label, accessible name, role, or stable selector needed
    for reliable automation
  - keep behavior, layout, styling, and copy unchanged unless the accessibility fix itself requires
    a tiny wording correction

  This exception is allowed only for UI testability. Do not use it to compensate for missing API,
  backend, or business logic.

- [ ] **Step 10: Run the test-cleanup pass with `@coder` if needed.** Scope this pass to the new or
      changed test files and approved shared test helpers only. Improve clarity, naming, and
      deduplication without reducing coverage or weakening assertions.

- [ ] **Step 11: Run post-change validation with `@execution-agent`.** Execute the strongest normal
      validation the project supports for this test surface:
  - targeted test command for fast feedback
  - broader suite or related suite to catch regressions
  - `mode: lint` when test files are linted
  - `mode: build` when test files participate in type-check or compile validation

  If validation fails:
  - run a focused repair pass through `@coder`
  - repair only the reported failure in tests or the explicitly allowed UI accessibility hooks
  - rerun validation
  - stop and surface the blocker if repeated repair passes stop converging

- [ ] **Step 12: Update feature status if applicable.** If
      `.specflow/features/<feature-name>/overview.md` exists:
  - change `status` from `todo` to `implementing` when test work starts
  - change `status` from `implementing` to `done` after final validation passes

- [ ] **Step 13: Summarize.** Report:
  - implemented test scope
  - scenarios covered
  - test files created or modified
  - any shared test helpers, page objects, or fixtures added or updated
  - whether a UI accessibility hook exception was used and which files it touched
  - any behavior or implementation smells discovered while making the tests pass
  - whether each smell is a UX smell, API smell, validation smell, state-transition smell, or test
    fragility smell
  - any baseline failures discovered before the change
  - final validation result
  - any open mismatch between requested scenarios and implemented behavior

## Quality Bar

- Treat the existing implementation as the source of truth for 302. Do not silently turn this into
  feature delivery work.
- Write tests that validate business outcomes and user-visible behavior, not incidental internal
  implementation details.
- Prefer existing page objects, fixtures, test-context patterns, and tagging conventions over new
  abstractions.
- Keep test selectors accessible and stable. Prefer roles, labels, and accessible names before
  introducing custom test selectors.
- For UI tests, production edits are limited to the smallest accessibility or selector adjustment
  needed for reliable automation.
- If the tested behavior technically works but appears awkward, misleading, inconsistent, or
  fragile, surface that as a smell instead of normalizing it in silence.
- Preserve existing assertions. Add assertions only when they strengthen
  the intended scenario coverage.
- Keep test setup code typed and intentional. Remove unused variables, helpers, and dead branches.
- The workflow is not complete until the relevant tests pass consistently and lint/build checks are
  clean when those checks apply to the changed files.
- If scenarios, implementation, and repository behavior disagree, stop and ask instead of guessing.
