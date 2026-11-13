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

**Execute this skill in a dedicated subagent when supported.** Pass the resolved request, scope,
governing references, caller constraints, and `role: 301-driver`. If already running in that delegated
context, execute here without creating another driver. If delegation is unavailable, follow the
Execution Boundary below rather than silently changing the workflow.

Keep required structured syntax unchanged.

Run in order: code-grounded design using `engineering-principles` → tests → implementation →
independent review and bounded cleanup → validation. The driver owns design and decisions; one
implementation coder owns tests, source, and repairs. A separate read-only reviewer checks the actual
diff, and a validator contains acceptance-check output. No automatic designer, explorer, independent
pre-implementation design reviews, or second review/refinement coder.

**Output:** Updated source and test files with scoped check evidence. An existing `overview.md`
becomes `implementing` at start. Partial scope reports scope complete, not feature done. Only explicit
whole-feature delivery may mark it `done` after acceptance, unless the caller reserves completion.
Keep the design brief, reuse inventory, and check plan in memory unless persistence is requested.

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

**Blocking questions:** A delegated driver returns missing scope, unclear outcomes, governing conflicts,
baseline failures, or non-converging repairs to its caller with options and a recommendation. A driver
running in the user-facing context may ask directly. Accept scope and decisions already resolved by
the caller; ask only about remaining gaps or conflicting evidence. Never invent missing requirements
or waive confirmed correctness/security defects.

---

## Execution Boundary and Roles

**One driver context, not recursive delegation:**
- The caller delegates the complete workflow once to a general agent capable of code design and
  orchestration, passing this skill and the inputs named above. Use the caller's design-capable model
  tier where supported, rather than the cheaper implementation-coder role.
- If already delegated or marked `role: 301-driver`, execute here. The driver is not the
  implementation coder. Don't delegate another driver to repeat the same workflow.

**Driver:** owns discovery, reuse decisions, compact versioned design, test selection, phase state,
review dispositions, and acceptance. Do not write a line-by-line solution for the coder to transcribe.

**Coder:** use `@coder` (general-agent fallback) for one tests-first assignment; resume the same session
for implementation repairs and cleanup. Honor its configured lower-cost model where the host supports
model selection; do not assume model names are portable or override caller model policy. If session
resumption is unavailable, pass a compact continuation packet, not a new design/discovery assignment.

**Reviewer:** one independent read-only `@reviewer` context (general-agent fallback). Never use the
implementation coder's session. Reuse the reviewer session for bounded rechecks.

**Validator:** one isolated `@validator` assignment per acceptance pass, bundling the selected test,
lint, and build commands. The coder runs only authorized narrow development checks. Preserve full
command output outside the driver context; return concise results and relevant failure excerpts.

**Host limits:** if nested delegation is unavailable, return worker packets to the calling agent for
dispatch, including the pending phase, current brief/check plan, findings, consumed budget, and driver
session reference when supported. The caller dispatches only the requested worker and resumes this
driver with its result and continuation state; it does not invoke a fresh `301`. Keep the coder and
reviewer contexts separate when routing. Do not spawn CLI sessions or silently replace independent
review with self-review. If the host has no delegation capability, report that limitation and ask
whether to proceed with an explicitly reduced workflow.

**Packets:** pass objective, phase, selected scenario text, brief revision, exact edit boundaries,
existing owners/reuse candidates, relevant contracts/invariants, exemplar and standards references,
check plan, and success criteria. Include why and observable outcomes, not the full conversation or
whole repository. Workers read authoritative owners before editing; references are not read bans.
Local implementation choices belong to the coder; architectural changes return to the driver.

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
      does not prove this run's scope complete. Record the starting worktree/diff state so this
      assignment's changes can be distinguished from pre-existing edits. Never overwrite unrelated work.

---

## Phase 1 - Code Design and Shared Check Plan

- [ ] **Draft a compact versioned brief.** Include:
  - selected scope, complete scenarios, observable outcomes, and non-goals;
  - chosen approach, module responsibilities, edit boundaries, integration points, public contracts,
    state transitions, and applicable failure/security/concurrency/compatibility constraints;
  - existing owners and reuse candidates, concrete justifications for new files/exports/abstractions,
    and explicitly approved new dependencies (otherwise none);
  - scenario → source changes → observable tests, applicable standards/UI constraints, evidence
    paths, resolved assumptions, and remaining questions;
  - the shared check plan below.

  Self-check completeness, feasibility, reuse, and contracts against actual code. Resolve material
  questions before dispatch. No mandatory pre-implementation reviewer calls. Preserve the coder's
  local judgment: specify responsibilities and invariants rather than every edit.

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

**Shared check plan:**
- **Behavior:** selected scenarios and required regression outcomes.
- **Test owners:** exact existing test paths, fixtures/helpers, and tests to add or extend.
- **Development checks:** exact baseline, red/green, and local regression commands.
- **Acceptance checks:** exact test, lint, and build commands with their supported file/package filters.
- **Selection evidence:** why these checks cover the source owners and affected consumers.
- **Expansion triggers:** new touched owners, shared infrastructure, auth/data boundaries, public
  contracts, schema/configuration changes, or uncertain impact; name broader checks when known.

Derive scope from this assignment's source changes, not every dirty file in the checkout. For related
selectors, use a source-file list or a known comparison baseline, not an unexplained default git range.
Do not filter so narrowly that known affected consumers disappear. Use project-documented targeted
commands; lint/build may require a package-wide or full command when no safe filter exists.

Reuse the plan across coder, reviewer, and validator. Don't have each rediscover tests. Add new tests
to the plan as they are created. Recalculate only when evidence or scope changes; the coder returns
a proposed expansion and reason instead of silently broadening work. Full-suite testing is not the
default baseline or final check, but project/caller mandatory gates and impact-triggered broader checks
still apply. Targeted checks never replace broader acceptance gates owned by the caller.

---

## Phase 2 - Tests-First Implementation

- [ ] **Dispatch one coder.** Send the accepted brief, reuse inventory, shared check plan, governing
      references, edit boundaries, and explicit tests-first checkpoints in one packet.

- [ ] **Establish targeted baseline.** Before editing, the coder runs the plan's baseline commands
      and records commands, exit statuses, and concise results. Pre-existing failures require a caller
      decision before edits. Previously passing selected checks remain part of acceptance.

- [ ] **Write tests and verify the right failure.** Extend existing test owners/fixtures before
      adding parallel infrastructure. Tests must be discovered and fail for missing behavior, not
      harness/setup errors. Record command, exit status, and relevant failure evidence. No production
      edits before the failing behavior is demonstrated; do not weaken assertions to reach green.

- [ ] **Implement and verify.** The same coder makes the smallest correct change using the reuse
      ladder, then runs targeted tests and named regressions. Leave readable code/tests without dead
      scaffolding or introduced duplication. Return files changed, reuse decisions, new-code
      justifications, red/green evidence, and any check-plan updates. Lines added/removed are context,
      not proof of reuse. Don't ask for a second discovery pass or separate coder per checkpoint.

  Material discoveries return to the driver: revise the brief/check plan and resolve conflicts before
  continuing in the same coder session. An unapproved dependency or architectural change is a blocker,
  not a local implementation choice. Preserve tests-first sequencing for added behavior during repairs.

---

## Phase 3 - Independent Review and Bounded Cleanup

- [ ] **Dispatch one read-only reviewer.** Provide the actual scoped diff/code state, accepted brief,
      complete scenarios, reuse inventory and candidate paths, standards/exemplars, check plan, and
      red/green evidence. Name `engineering-principles` and applicable standards skills/sections for
      the reviewer to load in its own context. The reviewer reads actual source/tests and existing
      candidates, rather than trusting the coder's summary. Review criteria:
  - required behavior and contracts are correct, with applicable failure/security cases addressed;
  - assertions meaningfully cover scenarios/regressions and were not weakened;
  - existing owners, fixtures, and helpers are reused; new code has a grounded justification;
  - no duplicate responsibility, copy-and-tweak implementation, unnecessary abstraction/dependency,
    or unrelated scope expansion; consolidate duplication introduced or directly exposed by the change;
  - naming, boundaries, maintainability, and applicable project/UI standards are satisfied;
  - the check plan covers changed owners and affected consumers, with expansions where needed.

  Return `## Verdict: CLEAN` or `## Verdict: CHANGES_REQUIRED`, reviewed brief/code revision, and
  concrete findings with severity, location, failed criterion, evidence, consequence, and smallest fix.
  Keep out-of-criteria advisories separate. Any unresolved criterion means `CHANGES_REQUIRED`.

- [ ] **Resolve through the same coder.** The driver adjudicates by evidence, records each finding's
      resolution and each advisory's accepted/deferred/rejected disposition, and sends bounded fixes
      and cleanup to the original coder. No fresh cleanup coder, automatic `401`, or reviewer edits.
      Don't manufacture cleanup when none is needed. The coder reruns the affected development checks;
      the reviewer rechecks the repaired diff, including new changes and prior findings.

  Allow at most two repair/recheck rounds after the initial diff review. Carry the same budget through
  validation repairs; do not reset it for changed design or a resumed run. At exhaustion return
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
      the check plan's exact commands/scopes. Capture full output in tool-managed storage or an
      approved log location, not the driver conversation. Return commands, scopes, exit statuses,
      passed/failed/blocked results, counts when available, and concise root-cause-grouped failure
      excerpts with log references. No raw successful output or test rediscovery. A mode without a
      reliable command is blocked, not silently skipped. Acceptance requires all required modes clean.

- [ ] **Repair without restarting.** Send failures to the same coder with the affected scope and
      evidence; don't weaken assertions. Substantive repairs go back to the independent reviewer under
      the remaining review budget or an evidence-matched caller resolution, then rerun all required
      acceptance commands in one validator assignment against the final code state. Expand the plan
      when warranted. Stop and return a substantive blocker if repairs don't converge; no new caps.

- [ ] **Close scope honestly.** Recommend human review for high-impact architecture, public interfaces,
      or data/security boundaries. Mark an existing overview `done` only for explicit whole-feature
      delivery after all gates pass; partial scope stays `implementing`. If the caller reserves
      whole-feature completion, leave status `implementing` and report scope complete to the caller.

- [ ] **Summarize.** Report implemented scope/scenarios, files created versus extended and their reuse
      justifications, new dependencies, red/green evidence, tested scope and selection rationale,
      checks not run/remaining risks, baseline issues, design decisions, review verdict/findings and
      dispositions, consumed `repair_rounds`, any caller resolution, and final validator results.
      Targeted green is not full-suite green. Recommend a separately scoped `401` only when warranted.

**Interrupted runs:** Rebuild the brief, reuse inventory, check plan, scoped diff, and pending findings
from current evidence before continuing. Recover coder/reviewer sessions where possible; do not repeat
completed discovery or tests solely because a session changed. Approval applies only to the reviewed
state; changed code needs the applicable recheck. Preserve consumed rounds; if repair history cannot
be recovered for a pending review, treat its budget as exhausted and return `review_limit`. A matching
caller resolution resumes the pending phase without restarting implementation or review.
