# Execution and worker intent

This policy preserves SpecFlow behavior across runtimes. It is not a claim that all tools implement
Claude-style skill frontmatter. Re-read source workflows on every setup; the catalog can grow.

## Skill placement

- **Main, interactive:** `specflow-setup`; `101`–`110`, including `106`/`108`; `201`; `202`.
  Their user decisions and artifact ownership stay with the caller. `106`/`108` may dispatch
  complete design briefs to independent designer workers.
- **Inline guidance:** `gap-check`, `engineering-principles`, and installed language/framework/testing
  standards. Load these where the work happens. `gap-check` must reach the human, not run headlessly.
- **Independent bounded task candidates:** `100` research; `context-manager` generate/refresh/initialize;
  `301`, `302`, `401`, `402` when given complete briefs. The latter four also orchestrate workers:
  they are not delegation-free leaf tasks. Return unresolved questions to the caller.
- **Coordinator-first:** `900`, `901`, and `502`. Prefer main-session coordination if nested forks
  exhaust depth. Keep each Review and Apply-Fix independent and fresh; preserve their scopes/caps.
  `901` stays headless once its required inputs are resolved; moving it to main does not authorize
  new human questions or change its git/commit/merge rules. Preserve review-limit handoffs to its
  decider: exhausted review budgets trigger explicit resolutions, not terminal outcomes or cap resets.
  Setup itself never runs those operations.
- **Conditional browser execution:** `501` needs the actual visible browser integration and must
  explore directly in its assigned context. Do not delegate the exploration to another worker.
  Keep it main if browser tooling is unavailable to children; otherwise a bounded child is possible.
- **Unknown/new skills:** inspect required interaction, outputs, delegation, tools, and blockers;
  classify explicitly. Never default all skills to forks or all skills to the main conversation.

Direct interactive invocation and headless workflow invocation may need different routing. For
example, `201`/`202` stay interactive normally; under `901`, delegate with complete feature identity,
coverage, artifact paths, and no-commit instructions. A reference skill is never a standalone agent.

## Five worker contracts

Read the canonical `agents/*.md` at the selected revision and carry the **complete contract** forward.
Use these summaries to check that translation has not lost intent:

- **coder:** bounded source/test implementation and assigned refinement; loads engineering principles
  and relevant installed standards; honors tests-first phases and assigned development checks. Returns
  blockers instead of widening scope. Strong coding and reasoning; editing tools required.
- **validator:** executes assigned test/lint/build modes, captures actual results and exit statuses,
  and returns grouped diagnostics. Never fixes failures or modifies source/config/dependencies.
  Economical tool-capable model. Test/build artifacts may be legitimate outputs of authorized checks.
- **designer:** one opinionated visual direction per call; honors D06/D07 and reports conflicts;
  loads relevant UI/accessibility standards; returns missing-input questions to the caller. Strong
  creative judgment. Not the artifact-writing agent for an entire `108` workflow.
- **reviewer:** fresh read-only context against supplied criteria and complete evidence; preserves
  `CLEAN` / `CHANGES_REQUIRED`, prior-feedback handling, and `301` revision/readiness requirements.
  Strong reasoning. Never fixes its own findings or sees the other independent review's conclusions.
- **decider:** verifies once, obtains three independent stance-framed votes, and arbitrates exactly
  as its contract specifies. Returns one supplied option or `UNANSWERABLE`; never acts. Strong
  decision reasoning. No recursive decider calls; voters need only the verified brief and reasoning.

Canonical bodies can contain tool/model names (`Bash`, `Agent`, `sonnet`, `opus`, `general-purpose`).
Map their **capability or role meaning**, not a blind token replacement. Preserve genuine user-chosen
model requirements; otherwise resolve vendor-specific defaults through the confirmed role mapping.
In particular, `901`'s inheritance language and a pinned decider can conflict: make the chosen policy
explicit and make installed dispatch use it rather than overriding the approved worker model.

Use explicit `mode: subagent` where the runtime supports it; do not accidentally make all five workers
primary agents. Spawn a fresh child, not a conversation-history clone, for independent judgments.
Workers must load the needed skills/instructions in their own context. Do not assume the parent's
loaded skills, repository rules, or read history accompany them. Keep setup out of worker preloads.

## Topology adaptation

The historical unflattened longest chain includes:

```text
main → 901 fork → 900 fork → Apply-Fix child → 401 fork → coder/validator
main → 901 fork → decider → three voters
main → 502 fork → 402 fork → coder/validator
```

Count actual child edges after selecting mechanisms; default depth and permitted nesting vary.
Flatten **coordination**, not required independence. A top-level coordinator can run skill phases
inline and dispatch fresh bounded workers. If a worker needs another independent phase, it may
return a request for the coordinator to dispatch, then continue with only the appropriate result.
This requires an explicit supported routing protocol; a Markdown diagram alone does not implement it.

An approved adapter must spell out: who owns each logical skill phase; how child requests/results
route; what complete brief is passed; which skill body runs; completion gates; blocked-question
handling; and where state/caps remain. Preserve `901` git ownership, `900` iteration counts and capped
results, `301` review-limit packets/caller-resolution re-entry, fail-closed executable validation,
tests-first sequencing, and source/test scope boundaries. Never reset a cap by re-invoking a workflow
or replace two independent reviewers with two passes in one context.

Prefer a documented runtime routing mechanism. If none exists, minimally adapt the installed skill's
execution section with a clear source/delta note and its main-session routing pointer. Remove
contradictory fork/dispatch statements only in that installed adapter; preserve task semantics.
If this cannot be made explicit and tested, report the workflow blocked instead of claiming parity.

## Permission reality

Tool allowlists and skill permission grants are different. A skill's `allowed-tools` may grant
approval, not restrict tools. Removing edit tools does not stop shell/MCP writes. Agent descriptions
are not sandboxes. Do not promise enforced read-only workers if the runtime only supplies behavioral
restrictions. Restrict unnecessary capabilities where supported without breaking assigned checks.

Parallelize independent reads/reviews when allowed. Shared contexts are not independent; separate
contexts are not separate filesystems. Avoid concurrent writers to overlapping files. Never create
worktrees, install browser tools, or broaden filesystem access merely to make setup tests pass.
