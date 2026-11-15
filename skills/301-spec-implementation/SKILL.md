---
name: 301-spec-implementation
description: >
  Use `301` to implement a substantial feature or implementation chunk through the main SpecFlow
  workflow. It handles reuse-first code design, scoped tests-first implementation with a cheaper
  coder, independent diff review, bounded cleanup, and isolated targeted validation.
  Trigger it for prompts like "301", "spec implementation", or "implement this feature" when the
  work is large enough to benefit from a disciplined multi-phase delivery flow.
argument-hint: "[change-request-or-spec-reference]"
---

# 301 - Spec-Driven System Implementation

**Execute this skill directly in the calling context. Never wrap it in a dedicated driver subagent.**
The calling agent is the driver and dispatches the coder, reviewer, and validator itself. If the
current context cannot dispatch workers, stop and report that to the user instead of adding a relay
layer or replacing independent review with self-review.

Keep required structured syntax unchanged.

Run in order: code-grounded design using `engineering-principles` → tests → implementation →
independent review and bounded cleanup → validation. The driver owns design and decisions; the coder
role owns tests, source, and repairs and runs its authorized development checks. A separate read-only
reviewer checks the actual diff, and a validator runs every other test, lint, and build command,
including acceptance. Every worker call is a fresh context coordinated
through the `run-log` skill. No automatic designer, explorer,
independent pre-implementation design reviews, or second review/refinement coder.

**Output:** Updated source and test files with scoped check evidence. An existing `overview.md`
becomes `implementing` at start. Partial scope reports scope complete, not feature done. Only explicit
whole-feature delivery may mark it `done` after acceptance, unless the caller reserves completion.
The brief, check plan, phase state, and worker results live in the run log (see Execution Boundary),
not in repo artifacts, unless persistence is requested.

---

## Required Inputs

1. **Change request or spec reference** — a `.feature` path, scenario title, design/plan reference,
   or plain-language request.
2. **Scope** — for a `.feature` file, exactly one of: a single `@TS###`, a single `TSM###`, or the
   full file. Otherwise derive a working scenario set from the request.
3. **Workflow fit** — substantial features or implementation chunks, not small fixes, one-file
   maintenance, or isolated cleanup.
4. **Caller resolution** _(optional, on re-entry)_ — a `review_limit` packet plus the caller's
   explicit decision, reviewed revision/code state, per-finding dispositions, and consumed budget.
   Verify current evidence and resume the pending phase; do not restart completed work or reset caps.

**Blocking questions:** Ask about missing scope, unclear outcomes, governing conflicts, baseline
failures, or non-converging repairs, with options and a recommendation. When a caller workflow
(such as `901`) invoked this skill, return them to it instead. Accept scope and decisions already resolved by
the caller; ask only about remaining gaps or conflicting evidence. Never invent missing requirements
or waive confirmed correctness/security defects.

---

## Execution Boundary and Roles

**One driver, the calling context.** There is no separate driver subagent and no relay layer. Workers
are leaf agents that return results to the driver and never dispatch the next phase. Don't spawn CLI
sessions to substitute for worker dispatch. Model and reasoning effort come from host configuration;
don't set or override them in dispatches.

**Driver:** owns discovery, reuse decisions, compact versioned design, test selection, phase state,
review dispositions, and acceptance. Do not write a line-by-line solution for the coder to transcribe.

**Run log:** load `run-log` before the first dispatch and follow its orchestrator protocol. Use the
caller's log when invoked by another skill; otherwise create the run `<date>-301-<slug>`. The log
holds the brief, phase state, every dispatch, and every result. Work from it and `git diff`, not from
earlier worker replies; once a result is logged, don't carry the reply forward.

**Fresh workers only:** every coder, reviewer, and validator call is a new subagent with a new
`dispatch` line. Never resume, fork, or continue a worker session, even for a one-line "continue".
Repairs, rechecks, cleanup, and unfinished work are new dispatches whose `in` names the earlier
results and whose `do` states exactly what remains. The worker reads only its dispatch, the pinned
brief, and those results.

**Coder:** `@coder` (general-agent fallback, with the dispatch line pasted in) for the tests-first
assignment and for each repair or cleanup pass.

**Reviewer:** `@reviewer` (general-agent fallback). A recheck is a new reviewer dispatch with `in`
naming the prior review and the repair results.

**Validator:** `@validator` is the only agent that executes acceptance test, lint, and build commands.
See Validation Output Contract.

**Run-to-completion rule:** a worker assignment runs every phase named in its dispatch (for the
coder: baseline → red → implement → green → regressions) in one turn. It returns only when the
assignment is complete or a concrete `[BLOCKING]` question/conflict stops it. Progress notes and "next
step" summaries are not valid results. If a worker stops early, dispatch a fresh one for what remains.

**Dispatch shape:** the prompt is only the log path and dispatch ID (fallback workers: see
`run-log`). `do` carries the objective and observable outcome, `in` the needed results, `skills` at
most 3 named standards skills/sections.
Never paste the brief, scenarios, diff, or prior results into a prompt or a `do`. Workers read
authoritative owners before editing; references are not read bans. Local implementation choices
belong to the coder; architectural changes return to the driver.

**Driver reading:** find with grep/glob and read the needed ranges. Don't `cat` whole large files or
several docs at once, don't re-read files already in context, and keep raw test output out of context.

### Validation Output Contract

- Every test/lint/build run, including baseline, red/green, and regressions, goes through
  `@validator`, except the coder's authorized baseline/red/green/development commands, which it runs
  itself with all output redirected to the run's `logs/` directory, reporting only exit status,
  counts, and failure reasons. The driver and reviewer never run them.
- Only **pass/fail per mode** and, for failures, **concise root-cause-grouped reasons** (test or file,
  error message, line) enter any agent's context. Successful output, full logs, stack-trace dumps,
  and warnings lists never do.
- Full output goes to the run's `logs/` directory, for the runner's own analysis only. No agent
  reads, quotes, or forwards it unless a failure reason is genuinely insufficient, and then only the
  specific excerpt needed. It is not committed, saved in artifacts, or referenced in the final summary.
- When most of a suite fails at once, have the validator check the test environment (emulators,
  ports, services) before any coder dispatch treats the failures as code defects.
- Failure reasons are capped (about 10 groups, a few lines each). If more exist, report counts per
  group and the top groups.

---

## Phase 0 - Ground Scope and Reuse

- [ ] **Resolve scope and context.** Read existing `overview.md` and `specs.feature` when present.
      No new `F-ID`, folder, or artifact is required for an inline request. Use `201`/`202` guidance
      inline for missing context, not their artifact-writing workflows. Existing selected scenarios
      need no coverage classification. When synthesizing or materially revising scenarios, use the
      supplied coverage; if unresolved, ask for Happy Path Only, Balanced, or Comprehensive.
      Route material scenario revisions through `202` with explicit scope, outcomes, current text/IDs,
      chosen coverage, constraints, proposed change, and permission to update a spec or stay inline.

- [ ] **Read governing evidence and owners.** Load `engineering-principles`, applicable project rules,
      standards skills, and relevant D01-D08/domain context. Assume the approved request and existing
      UI design are ready for implementation: follow applicable D06/D07/D08, without invoking a designer.
      Escalate actual contradictions or missing behavior that affects correctness; don't reopen design
      preference decisions. Read scoped owners and close implementation/test exemplars in full.

- [ ] **Build a code-checked reuse inventory.** Identify existing modules, functions, types, components,
      fixtures, helpers, and installed dependencies that own or nearly provide the behavior. Record
      candidate paths and capabilities, the chosen owner, and why extension/composition is sufficient
      or not. Use focused path/symbol searches, not automatic broad exploration. Before introducing
      new responsibility-bearing code, name the candidate it cannot reuse and why. No copy-and-tweak
      twins; generalize the existing owner where appropriate without speculative abstraction.

- [ ] **Set status.** Set an existing `overview.md` to `status: implementing`. A prior `done` value
      does not prove this run's scope complete. Record the starting commit and any already-dirty paths
      (brief `base` and `pre-existing:`) so this assignment's changes stay distinguishable from
      pre-existing edits. Never overwrite unrelated work.

---

## Phase 1 - Code Design and Shared Check Plan

- [ ] **Append the `brief` line** (`<slug>@1`, per `run-log`):
  - `goal`: the selected scope's observable outcomes;
  - `design`: chosen approach, module responsibilities, integration points, public contracts, state
    transitions, scenario → source changes → observable tests, applicable standards/UI constraints,
    resolved assumptions, and remaining questions. For an inline request without a spec file,
    include the complete synthesized scenarios;
  - `refs`: pointers to the selected scenarios and governing doc sections;
  - `owners`: existing owners and reuse candidates with the chosen action and reason, and concrete
    justifications for any new file/export/abstraction;
  - `rules`: edit boundaries, invariants, applicable failure/security/concurrency/compatibility
    constraints, approved new dependencies (otherwise `no new deps`), non-goals, and
    `pre-existing:` dirty paths from Phase 0;
  - `checks`: the full shared check plan below, every item as prefixed lines;
  - `base`: the starting commit for this scope's diff.

  Self-check completeness, feasibility, reuse, and contracts against actual code. Resolve material
  questions before dispatch. No mandatory pre-implementation reviewer calls. Preserve the coder's
  local judgment: specify responsibilities and invariants rather than every edit. Any later material
  change is a new revision with `why`, and later dispatches pin it.

### Select Tests Once

Use this selection order, stopping when it provides adequate evidence for the change:
1. Explicit test paths/scenario mappings in the request or project guidance.
2. An existing affected/related-test command configured by the project.
3. Colocated or conventionally named tests for the changed owner.
4. One bounded search in the relevant test subtree for the public symbol, route, or behavior.
5. The owning package/module suite if narrower selection cannot be justified.

Read relevant runner configuration, scripts, and nearby examples once. Prefer existing tooling; do
not create a test index, new dependency, or project-wide discovery pass. A dependency graph is an aid,
not complete coverage: explicitly include integration tests for dynamic wiring, routes, configuration,
or cross-service behavior when affected. An empty/no-tests selection is not passing evidence.

**Shared check plan** (brief `checks` prefix in parentheses):
- **Behavior** (`behavior:`): selected scenarios and required regression outcomes.
- **Test owners** (`owner:`): exact existing test paths, fixtures/helpers, and tests to add or extend.
- **Development checks** (`base:`, `dev:`): exact baseline, red/green, and local regression commands.
- **Acceptance checks** (`accept:`): exact test, lint, and build commands with their supported
  file/package filters.
- **Selection evidence** (`why:`): why these checks cover the source owners and affected consumers.
- **Expansion triggers** (`expand:`): new touched owners, shared infrastructure, auth/data
  boundaries, public contracts, schema/configuration changes, or uncertain impact; name broader
  checks when known.

Derive scope from this assignment's source changes, not every dirty file in the checkout. For related
selectors, use a source-file list or a known comparison baseline, not an unexplained default git range.
Do not filter so narrowly that known affected consumers disappear. Use project-documented targeted
commands; lint/build may require a package-wide or full command when no safe filter exists.

Reuse the plan across coder, reviewer, and validator. Don't have each rediscover tests. Add tests the
coder reports creating to the next brief revision. Recalculate only when evidence or scope changes; the coder returns
a proposed expansion and reason instead of silently broadening work. Full-suite testing is not the
default baseline or final check, but project/caller mandatory gates and impact-triggered broader checks
still apply. Targeted checks never replace broader acceptance gates owned by the caller.

---

## Phase 2 - Tests-First Implementation

- [ ] **Dispatch one coder.** One `dispatch` pinned to the current brief, naming the governing
      standards in `skills`. The tests-first sequence is a single assignment: the coder
      runs it end to end under the run-to-completion rule and does not return at baseline, red, or
      green. It returns only when green with regressions checked, or on a concrete blocker.

- [ ] **Establish targeted baseline.** Before editing, the coder runs the plan's baseline commands
      (or the driver dispatches `@validator` for them before the coder). Record commands, pass/fail,
      and failure reasons only. Pre-existing failures require a caller decision
      before edits. Previously passing selected checks remain part of acceptance.

- [ ] **Write tests and verify the right failure.** Extend existing test owners/fixtures before
      adding parallel infrastructure. Tests must be discovered and fail for missing behavior, not
      harness/setup errors. Record command, pass/fail, and failure reasons. No production
      edits before the failing behavior is demonstrated; do not weaken assertions to reach green.

- [ ] **Implement and verify.** The coder makes the smallest correct change using the reuse
      ladder, then runs targeted tests and named regressions. Leave readable code/tests without dead
      scaffolding or introduced duplication. Return files changed, reuse decisions, new-code
      justifications, red/green evidence, and any check-plan updates. Lines added/removed are context,
      not proof of reuse. Don't ask for a second discovery pass or separate coder per checkpoint.

  Material discoveries return to the driver: revise the brief and resolve conflicts, then dispatch a
  fresh coder for the remaining work. An unapproved dependency or architectural change is a blocker,
  not a local implementation choice. Preserve tests-first sequencing for added behavior during repairs.

---

## Phase 3 - Independent Review and Bounded Cleanup

- [ ] **Dispatch one read-only reviewer.** Pin the brief; `do` names the scoped diff command (not the
      diff) and the criteria; `in` names the coder result. Name `engineering-principles` and
      applicable standards in `skills`. The reviewer reads actual source/tests and existing
      candidates, rather than trusting the coder's summary. A recheck is a fresh reviewer dispatch
      whose `in` names the prior review and the repair result.
      Review criteria:
  - required behavior and contracts are correct, with applicable failure/security cases addressed;
  - assertions meaningfully cover scenarios/regressions and were not weakened;
  - existing owners, fixtures, and helpers are reused; new code has a grounded justification;
  - no duplicate responsibility, copy-and-tweak implementation, unnecessary abstraction/dependency,
    or unrelated scope expansion; consolidate duplication introduced or directly exposed by the change;
  - naming, boundaries, maintainability, and applicable project/UI standards are satisfied;
  - the check plan covers changed owners and affected consumers, with expansions where needed.

  The result is `clean` or `changes` (`CLEAN` / `CHANGES_REQUIRED`), the reviewed revision/code
  state, and every concrete finding with severity, location, evidence, consequence, failed
  criterion, and smallest fix.
  Out-of-criteria advisories stay separate. Any unresolved criterion means `changes`.

- [ ] **Resolve through a coder dispatch.** The driver adjudicates by evidence, records each finding's
      resolution and each advisory's accepted/deferred/rejected disposition in the repair dispatch's
      `do` (IDs plus one-line reasons; details stay in the review result), and dispatches a fresh coder with the bounded fixes and cleanup, `in` naming
      the review and prior coder results. No separate cleanup workflow, automatic `401`, or reviewer
      edits.
      Don't manufacture cleanup when none is needed. The coder reruns the affected development checks;
      the reviewer rechecks the repaired diff, including new changes and prior findings.

  Allow at most two repair/recheck rounds after the initial diff review. Carry the same budget through
  validation repairs; do not reset it for changed design or a resumed run. Record it in `state`
  `caps` (e.g. `"repair 1/2"`). At exhaustion return
  `review_limit` with current brief/check plan, reviewed code state, consumed rounds, actual verdicts,
  outstanding findings/evidence, concrete options, and the lowest-risk feasible recommendation.
  Return the packet to the caller for a resolution under its decision policy. A resolution must
  identify that state and per-finding dispositions; verify bounded corrections by inspection and
  targeted checks without restarting review. Required behavior, coverage, and correctness/security
  defects cannot be deferred.
  Preserve real verdicts: authorization to advance is not a `CLEAN` review.

---

## Phase 4 - Isolated Validation and Close

- [ ] **Run acceptance checks.** One `@validator` assignment with `modes: [test, lint, build]` and
      the check plan's exact commands/scopes, under the Validation Output Contract. Return per-mode
      passed/failed/blocked, counts when available, and concise root-cause-grouped failure reasons.
      No raw output, log references to read, or test rediscovery. A mode without a reliable command
      is blocked, not silently skipped. Acceptance requires all required modes clean.

- [ ] **Repair without restarting.** Dispatch a fresh coder with the affected scope, `in` naming the
      validator result; don't weaken assertions. Substantive repairs go back to the independent reviewer under
      the remaining review budget or an evidence-matched caller resolution, then rerun all required
      acceptance commands in one validator assignment against the final code state. Expand the plan
      when warranted. Stop and return a substantive blocker if repairs don't converge; no new caps.

- [ ] **Close scope honestly.** Recommend human review for high-impact architecture, public interfaces,
      or data/security boundaries. Mark an existing overview `done` only for explicit whole-feature
      delivery after all gates pass; partial scope stays `implementing`. If the caller reserves
      whole-feature completion, leave status `implementing` and report scope complete to the caller.

- [ ] **Summarize.** Append a final `state` for this scope (`done` or `blocked`), plus a `run` state
      when 301 is the top-level skill. Report implemented scope/scenarios, files created versus extended and their reuse
      justifications, new dependencies, red/green evidence, tested scope and selection rationale,
      checks not run/remaining risks, baseline issues, design decisions, review verdict/findings and
      dispositions, consumed `repair_rounds`, any caller resolution, and final validator results.
      Targeted green is not full-suite green. Recommend a separately scoped `401` only when warranted.

**Interrupted runs:** Resume from the run log: the last `state`, the latest brief revision, and any
dispatch without a result (append the interrupted result, then re-dispatch fresh). If the log is gone,
rebuild the brief, check plan, scoped diff, and pending findings from current evidence. Never resume
worker sessions; do not repeat completed discovery or tests solely because a context changed. Approval applies only to the reviewed
state; changed code needs the applicable recheck. Preserve consumed rounds; if repair history cannot
be recovered for a pending review, treat its budget as exhausted and return `review_limit`. A matching
caller resolution resumes the pending phase without restarting implementation or review.
