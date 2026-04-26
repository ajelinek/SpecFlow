---
name: 401-cleanup
description: >
  Use this skill when you need to clean up an already-changed source scope or an already-changed
  test scope without turning the work into a broad rewrite. Trigger it for requests like "401",
  "cleanup this change", "refactor the touched files", "reduce duplication", or "tidy the
  tests" when the user can identify the changed set or review scope. This workflow must choose
  exactly one cleanup target type per run: source code or test code. Never use it to clean up
  both in the same pass. Start from the user-defined changed set, run an exhaustive in-scope
  cleanup and risk review for the selected target type, and surface any worthwhile out-of-scope
  cleanup opportunities for approval before expanding beyond the initial boundary.
disable-model-invocation: true
---

# 401 - Cleanup

Clean up an existing changed set without losing scope control. This workflow runs a thorough
in-scope sweep for duplication, unnecessary complexity, bad naming, dead code, weak structure,
possible bugs, missing guards, unsafe assumptions, and pattern mismatches across either touched
source code or touched test code.

Use this strict phase order:

1. Resolve the cleanup boundary and cleanup target type
2. Build the lead-agent cleanup state
3. Establish the baseline
4. Explore and classify in-scope cleanup work
5. Run one cleanup implementation pass for the selected target type
6. Validate and summarize

The initial scope is always the changed set the user points to. Use that changed set as the
anchor, then inspect the surrounding codebase just enough to judge whether the changed code is in
the right place, whether duplication should be consolidated, and whether adjacent complexity can be
removed safely.

Choose exactly one cleanup target type for the run:

- `source-cleanup-only`
- `test-cleanup-only`

The unselected type is out of bounds for edits. If the requested changed set includes both source
and test files, stop and require the user to choose one side before continuing. This rule is
critical and non-negotiable.

**Output path**: No new `.specflow/` document is written. This workflow updates existing source or
test files in the project codebase.

---

## Operating Model

This workflow uses the same orchestrator-worker shape as `301-spec-implementation`, but for
cleanup-only work.

1. **You are the orchestrator.** Own the cleanup model for the run: scope, cleanup target type,
   touched modules, approved boundaries, and validation status.

2. **All code changes go through a coding subagent.** Use `@coder` when available; otherwise use
   the general agent as the fallback.

3. **All execution goes through `@execution-agent`.** Test, lint, and build results are the ground
   truth for whether the cleanup may proceed and whether it stayed safe.

4. **Keep context tight.** Maintain a compact lead-agent working model. Give coding subagents only
   the relevant excerpt for the current cleanup pass, not the full conversation or full repo state.

5. **Use cleanup-isolated task packets.** Every coding pass must clearly name the cleanup target
   type, allowed files, forbidden files, approved cleanup goals, and validation expectations.

---

## Required Inputs

Before proceeding, confirm:

1. **Cleanup scope anchor** - the changed set to clean up. Acceptable anchors include:
   - staged changes
   - the last `N` commits
   - one or more specific files
   - one or more directories
   - a PR branch or diff range

2. **Cleanup target type** - exactly one of:
   - source code cleanup
   - test code cleanup

   If the user asks for both, implies both, or points to a mixed changed set, stop and ask one
   blocking question requiring a single choice. Do not proceed until one side is selected. The
   unselected side is off-limits for change.

3. **Preservation constraints** - any patterns, APIs, structures, assertions, deadlines, or
   boundaries that must not be disturbed.

If the changed set is not identifiable, ask a blocking question before proceeding. If the request
is really new feature work or missing-behavior work, stop and route to `301-spec-implementation`
or `302-test-implementation` instead.

---

## Lead-Agent Working State

Before any coding pass, create and maintain these compact artifacts for the run:

- **Working cleanup brief** - intended outcome, scope anchor, and selected cleanup target type
- **Cleanup ledger** - in-scope files, allowed modules, forbidden modules, and no-touch areas
- **Context map** - nearby modules, helpers, abstractions, patterns, and validation surface
- **Standards index** - relevant conventions, config files, loaded skills, and short applicability notes
- **Risk register** - in-scope correctness risks, fragile assumptions, and baseline failures
- **Task packet template** - the required fields every cleanup coding pass receives

Keep these concise and current. The lead agent owns the full bundle; subagents receive only the
current slice.

---

## Task Packet Template

Every coding subagent invocation should include only:

- cleanup objective
- current phase
- cleanup target type: `source-cleanup-only` or `test-cleanup-only`
- exact files or modules in scope
- nearby reusable patterns or helpers
- applicable standards excerpt
- relevant standards or structural expectations
- explicit out-of-scope files and modules
- concrete success criteria

Do not pass the full conversation, every changed file in the repo, or unrelated project history by
default.

---

## Steps

### Phase 0 - Prepare Cleanup Context

- [ ] **Step 1: Resolve cleanup boundary, target type, and workflow fit.**
  - Identify the exact changed set named by the user.
  - Require exactly one cleanup target type: source code or test code.
  - If the user only says "clean this up" without naming a concrete changed set, ask for the
    smallest missing scope fact first: changed files, staged diff, commit range, or directories.
  - If the user names or implies both source and test cleanup, stop and ask one blocking question
    requiring them to choose one side.
  - Stop and reroute if the task is actually feature delivery, bug fixing, new test creation, or
    broad redesign rather than cleanup of an existing change.

- [ ] **Step 2: Build the lead-agent working state.** Record the working cleanup brief, cleanup
      ledger, context map, standards index, risk register, and task packet template before any
      coding subagent is invoked.

- [ ] **Step 3: Load relevant conventions, config, and skills.** Before exploration or coding:
  - use standards already loaded into the current session as the authoritative starting point for
    project conventions
  - treat managed instructions, project instructions, and explicitly loaded skills as higher
    priority than generic best practices
  - load any relevant skills available through the supported skill-loading tools if they are not
    already active and they materially affect the selected cleanup target type
  - load the project conventions and relevant config already available for this cleanup scope, then
    distill them into the standards index
  - record short applicability notes so later cleanup passes know which conventions are binding for
    the files in scope

- [ ] **Step 4: Freeze the initial edit boundary.** Capture:
  - changed files in scope
  - selected cleanup target type
  - commit count or diff anchor if relevant
  - staged vs unstaged status if relevant
  - modules touched by the changed set
  - explicit no-touch areas
  - files excluded because they belong to the unselected cleanup target type

  Use this ledger as the default edit boundary for the rest of the workflow.

- [ ] **Step 5: Establish the baseline with `@execution-agent`.** Run the strongest relevant
      validation the project supports before cleanup:
  1. `mode: test`
  2. `mode: lint` when lint applies to the changed files
  3. `mode: build` when the changed files participate in type-check or compilation

  Record baseline results. If any validation fails, stop and ask the user whether those failures
  should be resolved first before cleanup begins. If baseline failures make later regression
  analysis ambiguous, surface that risk before proceeding.

---

### Phase 1 - Explore and Classify Cleanup Work

- [ ] **Step 6: Run the exhaustive in-scope review with `@explore`.** Use `@explore` to inspect
      only what is needed to evaluate the selected cleanup scope well, but do not leave obvious risk
      areas unchecked inside that boundary. Ask it to:
  - read the files in the initial changed set that match the selected cleanup target type
  - apply the standards index when judging whether the changed code matches repository conventions
  - identify nearby modules, helpers, abstractions, or patterns that the changed code should match
  - find duplication between the changed files and existing code elsewhere
  - check whether the changed code appears to live in the wrong module or should extend an existing
    module instead of adding more logic where it is now
  - identify removable dead code, redundant helpers, or avoidable complexity directly connected to
    the changed set
  - identify code smells and maintainability risks in the changed set: long functions, deep
    nesting, broad conditionals, weak naming, mixed responsibilities, inconsistent structure,
    over-abstraction, and copy-paste logic
  - identify correctness and robustness risks in the changed set: missing validation, missing null
    or empty-state guards, brittle assumptions, incomplete error handling, unsafe type usage,
    possible edge-case failures, and places where the code appears likely to break under invalid or
    uncommon inputs
  - if the selected target type is `test-cleanup-only`, identify fragility, confusing assertions,
    poor fixture structure, misleading names, and test-helper duplication, but do not turn the work
    into additive coverage creation
  - return a concise summary with exact paths, reusable candidates, and any out-of-scope cleanup
    opportunities worth surfacing

  Keep this exploration read-only. The purpose is to challenge the shape of the change before
  editing, not to silently broaden the implementation scope.

- [ ] **Step 7: Classify findings by type and scope.** Organize the review results into these
      buckets:
  - **In-scope cleanup** - duplication, complexity, naming, structure, dead code, or readability
    issues entirely within the user-defined changed set and selected cleanup target type
  - **In-scope risk fixes** - missing guards, unsafe assumptions, weak validation, brittle error
    handling, suspicious edge cases, fragile tests, and other likely defect sources that can be
    fixed without changing the approved cleanup boundary
  - **Out-of-scope opportunities** - changes in untouched files or modules that would simplify the
    result further

  For each out-of-scope opportunity, write a short value statement: what would improve, why it is
  not already in scope, and which files would need to be added.

- [ ] **Step 8: Get approval before broadening scope.** If Step 7 found out-of-scope opportunities:
  - present them to the user as explicit options
  - keep each option small and concrete
  - name the files or modules that would be added to scope
  - give a short explanation of the value
  - preserve the selected cleanup target type even if the scope expands

  Do not edit outside the initial changed set until the user approves the broader scope. Do not use
  scope expansion as a reason to cross from source cleanup into test cleanup or from test cleanup
  into source cleanup.

---

### Phase 2 - Run the Cleanup Pass

- [ ] **Step 9: Freeze the cleanup task packet.** Build one focused packet for `@coder` that names:
  - the exact files allowed to change
  - the selected cleanup target type: `source-cleanup-only` or `test-cleanup-only`
  - the full in-scope cleanup goals inside those files
  - any reusable modules or helpers that may be extended instead of duplicated
  - applicable standards excerpt from the standards index
  - any newly approved files added in Step 8
  - explicit out-of-scope files and modules
  - the entire unselected cleanup target type as forbidden scope
  - any in-scope risk items that should be fixed now instead of merely reported
  - success criteria: cleaner structure, stronger guards, no avoidable bug risks left unaddressed
    inside scope, no behavior regressions, and smaller or clearer code where possible

- [ ] **Step 10: Run the cleanup implementation pass with `@coder`.** Instruct `@coder` to:
  - treat this as a full in-scope cleanup pass, not a narrow cosmetic polish
  - stay strictly inside the selected cleanup target type
  - follow the standards index and loaded-skill guidance relevant to the files in scope
  - fix duplication, poor naming, weak structure, dead code, misplaced logic, and unnecessary
    branching inside the approved scope
  - fix obvious in-scope robustness issues such as missing guards, unsafe assumptions, incomplete
    validation, and brittle error handling when the intended behavior is clear from context
  - keep behavior and assertions aligned with the intended existing behavior unless the existing
    path is clearly dead, redundant, or unsafe and can be corrected without scope ambiguity
  - prefer extending existing helpers or modules over adding new ones
  - keep edits reviewable and as small as possible

  Additional instruction by cleanup target type:
  - For `source-cleanup-only`: do not edit test files, test helpers, or test assertions.
  - For `test-cleanup-only`: limit edits to cleanup of existing tests or test helpers; do not edit
    production files, add net-new coverage, add net-new scenarios, or create new test files unless
    the user explicitly widens the workflow to a different implementation skill.

---

### Phase 3 - Validate and Summarize

- [ ] **Step 11: Run post-change validation with `@execution-agent`.** Execute the strongest normal
      validation that applies to the touched files:
  - targeted or relevant test command for quick feedback
  - broader regression test command when needed
  - `mode: lint`
  - `mode: build`

  If validation fails:
  - run a focused repair pass through `@coder`
  - repair only the reported regression or cleanup mistake
  - preserve the selected cleanup target type during repair
  - rerun validation
  - stop and surface the blocker if repeated repair passes stop converging

- [ ] **Step 12: Summarize.** Report:
  - initial scope anchor and final approved scope
  - selected cleanup target type
  - files changed
  - conventions, config, and loaded skills that materially shaped the cleanup
  - key duplication, complexity, naming, placement, or dead-code issues removed
  - key bug risks, missing guards, or fragile assumptions fixed
  - any out-of-scope opportunities identified but not approved
  - baseline failures discovered before cleanup, if any
  - final validation result

## Quality Bar

- The initial user-defined changed set is the default scope. Exploration may discover better homes
  for code, but actual edits outside the initial boundary require explicit approval.
- Ask clarifying scope questions early when the user has not identified the changed set precisely
  enough to work safely.
- The default analysis is exhaustive inside scope. Do not ask the user to pick from duplication,
  naming, complexity, smells, bug risk, or guards unless they want to narrow the work.
- Load and apply relevant conventions, config, managed instructions, project instructions, and
  explicitly loaded skills before judging cleanup quality or issuing coding instructions.
- Prefer cleanup that reduces complexity in existing modules over adding fresh abstraction layers.
- Prefer extending existing modules or helpers over creating new files.
- When the changed code appears misplaced, surface the better home clearly and explain the value
  before moving it.
- Treat duplication outside the changed set as an opportunity to discuss, not as silent permission
  to refactor more broadly.
- Exactly one cleanup target type is allowed per run: source code or test code. Mixed cleanup is
  forbidden.
- If the incoming changed set includes both source and test files, require an explicit user choice
  of one side before proceeding. The other side is off-limits for change.
- Test-file changes under 401 are cleanup-only. Do not add new tests, new scenarios, or additive
  coverage.
- Source cleanup under 401 does not permit test-file edits. If test changes are needed, stop and
  ask the user whether to run a separate test-cleanup pass afterward.
- Fix obvious in-scope correctness risks when the intended behavior is clear, but do not disguise
  speculative redesign or ambiguous product changes as cleanup.
- Look for likely defects, not just aesthetics: missing guards, unsafe type assumptions, edge-case
  failures, inconsistent error handling, and brittle test protection are part of this workflow.
- The workflow is not complete until the relevant tests, lint checks, and build checks are clean or
  any remaining failures are explicitly identified as pre-existing.

---

## Non-Negotiable Constraints

1. **One cleanup target type per run.** Every `401` invocation is either `source-cleanup-only` or
   `test-cleanup-only`. Never both.

2. **The unselected side is forbidden scope.** If the run is source cleanup, test files are
   off-limits. If the run is test cleanup, source files are off-limits.

3. **Mixed changed sets require a blocking choice.** If the user points at a diff, branch, commit
   range, or file set containing both source and test changes, stop and require them to choose one
   side before any cleanup begins.

4. **Cleanup only.** Do not turn this workflow into feature work, bug-fix delivery, new scenario
   authoring, or additive test coverage.

5. **Baseline integrity is mandatory.** If pre-cleanup validation is already failing, surface that
   fact before editing so later regressions can be judged honestly.

6. **The environment is the primary evaluator.** For cleanup work, test, lint, build, and other
   execution feedback outrank model opinion when deciding whether the cleanup stayed safe.

7. **Context minimization is mandatory.** The lead agent owns the full cleanup model; coding
   subagents receive only focused task packets.

8. **Orchestration only.** You do not write cleanup code directly. Code changes go through a coding
   subagent; execution goes through `@execution-agent`.

9. **Escalate stalled loops.** If repeated repair passes are not converging, stop and surface the
   blocker rather than looping indefinitely.
