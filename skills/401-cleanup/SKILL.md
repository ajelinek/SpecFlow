---
name: 401-cleanup
description: >
  Use `401` to clean up an already-changed source scope or test scope without turning it into a
  broad rewrite. Trigger it for prompts like "401", "cleanup this change", "refactor the touched
  files", or "tidy the tests", and run it separately for source and test cleanup.
---

# 401 - Cleanup

Clean up an existing changed set without losing scope control. This workflow performs one thorough,
in-scope cleanup pass across either touched source files or touched test files.

Use this phase order:

1. Resolve scope and cleanup target type
2. Load conventions and establish a baseline
3. Explore the changed set and classify cleanup work
4. Run one cleanup pass for the selected target type
5. Validate and summarize

Choose exactly one cleanup target type per run:

- `source-cleanup-only`
- `test-cleanup-only`

The other side is forbidden scope.

**Output**: No new `.specflow/` artifact. Update existing source or test files in the project.

---

## Required Inputs

Before proceeding, confirm:

1. **Cleanup scope anchor** — staged changes, last `N` commits, specific files, specific
   directories, or a PR/diff range
2. **Cleanup target type** — exactly one of source code cleanup or test code cleanup
3. **Preservation constraints** — APIs, assertions, patterns, deadlines, or boundaries that must
   not change

If the changed set is unclear, ask one blocking question. If the request is really feature work,
bug fixing, or new test creation, reroute to `301-spec-implementation` or `302-test-implementation`.

---

## Execution Protocol

- You are the orchestrator.
- All edits go through `@coder` when available; otherwise use the general agent.
- All validation goes through `@execution-agent`.
- Prefer loaded standards and repo conventions over generic cleanup advice.
- Keep a compact working model for the run: cleanup brief, scope ledger, nearby patterns/helpers,
  relevant standards, and validation surface.
- Give subagents a focused task packet only: cleanup objective, phase, target type, exact files in
  scope, reusable patterns/helpers, standards excerpt, forbidden files, and success criteria.

---

## Steps

### Phase 0 - Prepare

- [ ] **Step 1: Resolve scope, target type, and workflow fit.** Identify the exact changed set.
  Require exactly one target type. If the selected scope includes both source and test files, stop
  and ask the user to choose one side before continuing.

- [ ] **Step 2: Load conventions and project context.** Use loaded standards as the starting point.
  Load any relevant skills if they materially affect the selected target type. Read only the repo
  docs, config, or guidance needed to judge the files in scope well.

- [ ] **Step 3: Freeze the initial edit boundary.** Record:
  - files in scope
  - selected target type
  - explicit no-touch areas
  - files excluded because they belong to the unselected target type

- [ ] **Step 4: Establish the baseline with `@execution-agent`.** Run the strongest relevant
  validation the project supports before editing:
  1. `mode: test`
  2. `mode: lint` when lint applies
  3. `mode: build` when type-check or compilation applies

  Record pre-existing failures. If they make cleanup risk hard to judge, surface that before
  proceeding.

### Phase 1 - Explore and Classify

- [ ] **Step 5: Run the in-scope review with `@explore`.** Inspect the selected files and only the
  nearby code needed to judge them well. Ask `@explore` to identify:
  - existing helpers, patterns, or modules this change should match
  - duplication, dead code, weak naming, misplaced logic, avoidable complexity, and pattern drift
  - likely correctness risks inside scope: missing guards, unsafe assumptions, incomplete
    validation, brittle error handling, fragile tests, or suspicious edge cases
  - out-of-scope cleanup opportunities worth surfacing separately

  For `test-cleanup-only`, focus on fragility, confusing assertions, weak fixtures, misleading
  names, and helper duplication. Do not turn the work into additive coverage.

- [ ] **Step 6: Classify the results.** Organize findings into:
  - **In-scope cleanup** — structure, duplication, naming, readability, dead code
  - **In-scope risk fixes** — obvious robustness issues that can be fixed safely inside scope
  - **Out-of-scope opportunities** — useful improvements that require touching new files/modules

- [ ] **Step 7: Get approval before broadening scope.** If Step 6 found out-of-scope
  opportunities, present them as explicit options with the files/modules that would be added. Do
  not edit outside the initial boundary without approval. Never cross from source cleanup into test
  cleanup or vice versa.

### Phase 2 - Cleanup Pass

- [ ] **Step 8: Freeze the cleanup task packet.** Include:
  - selected target type
  - exact files allowed to change
  - full in-scope cleanup goals
  - reusable helpers/modules that may be extended
  - relevant standards excerpt
  - any newly approved files
  - explicit forbidden files and the entire unselected target type

- [ ] **Step 9: Run the cleanup pass with `@coder`.** Instruct `@coder` to make a full in-scope
  cleanup pass, not a cosmetic polish. Fix duplication, naming, dead code, structure, and obvious
  in-scope robustness issues when intended behavior is clear.

  Additional boundary rules:
  - **Source cleanup**: do not edit tests, test helpers, or assertions.
  - **Test cleanup**: do not edit production files, add net-new scenarios, add net-new coverage, or
    create new test files unless the user reroutes to another workflow.

### Phase 3 - Validate and Summarize

- [ ] **Step 10: Run post-change validation with `@execution-agent`.** Execute the strongest normal
  validation that applies to the touched files: targeted/relevant tests, broader regression tests
  when needed, plus lint/build where applicable.

  If validation fails, run a focused repair pass through `@coder`, fix only the reported cleanup
  regression, preserve the selected target type, and rerun validation. If repair loops stop
  converging, stop and surface the blocker.

- [ ] **Step 11: Summarize.** Report:
  - initial scope and final approved scope
  - selected cleanup target type
  - files changed
  - conventions or skills that materially shaped the cleanup
  - key cleanup wins and risk fixes
  - out-of-scope opportunities found but not approved
  - baseline failures, if any
  - final validation result

---

## Non-Negotiables

1. Exactly one cleanup target type per run.
2. The unselected side is forbidden scope.
3. Mixed changed sets require a blocking user choice before editing.
4. Do not turn cleanup into feature work, bug-fix delivery, or additive test coverage.
5. Ask before editing outside the initial changed set.
6. Prefer reducing complexity in existing modules over adding new abstraction layers.
7. Fix obvious in-scope correctness risks when intent is clear, but do not hide speculative
   redesign as cleanup.
8. Validation feedback outranks model opinion when judging whether the cleanup stayed safe.
9. Stop and surface blockers if repair loops stop converging.
