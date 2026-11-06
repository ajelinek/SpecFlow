<img src="site/public/SpecFlow.png" alt="SpecFlow" width="120" />

# SpecFlow

> **Under active development.** Content and features may change without notice.

Official documentation lives at [ajelinek.github.io/SpecFlow](https://ajelinek.github.io/SpecFlow).

SpecFlow is a lightweight, spec-driven workflow for building software with AI.

It helps you define a feature, describe its expected behavior, implement it, and clean it up without turning the process into a pile of bloated planning docs.

**Just enough structure.** Consistent, skimmable templates make the goal, key decisions, and expected behavior easy to review. Include only what the work needs: enough context and constraints to guide AI, with room for judgment about how to deliver it.

The core idea is simple:

1. Define the feature
2. Define the expected behavior
3. Design, review, implement, and validate it

If you only use one part of SpecFlow, use this path:

`201-high-level-design` -> `202-spec-design` -> `301-spec-implementation`

`301` includes independent review and bounded refinement. Add `401-cleanup` when the changed set
warrants a deeper, separately scoped source or test cleanup pass.

Docs site development and deployment notes live in `site/README.md`.

## Who This Is For

SpecFlow is for teams or individuals who want a little more structure than pure prompt-and-pray coding, but do not want a heavyweight process.

It works best when you want:

- faster human review
- clearer feature intent before coding
- tighter implementation scope
- cleaner handoff between design and implementation
- a repeatable path from idea to cleaned-up code

It is especially useful for full-stack work across UI, API, and data layers, but it also works fine for a single feature or component.

## What Makes It Different

SpecFlow is not trying to replace your coding standards, framework rules, or project conventions.

Instead, it is designed to work with them.

When it runs, it should use your existing:

- project rules
- `CLAUDE.md` guidance (or `AGENTS.md`, imported into `CLAUDE.md`, if that's what the project already uses)
- local architecture docs
- installed standards skills

That means SpecFlow gives you process structure without forcing a single engineering style.

## Start Here

Most users should start with the minimal feature path.

## Install

Interactive install:

```bash
npx skills add ajelinek/SpecFlow
```

This opens the interactive installer so you can pick only the skills you want.

Install all bundled skills:

```bash
npx skills add ajelinek/SpecFlow --skill '*'
```

This installs every available skill from the repo.

Preview available skills before installing:

```bash
npx skills add ajelinek/SpecFlow --list
```

### Configure your coding tools

After installing the skills, run `specflow-setup` to configure SpecFlow for **Claude Code,
GitHub Copilot CLI, OpenCode, or Codex CLI** (one or several).

The setup skill asks for project-local or user-wide scope, checks current official documentation
against installed tool versions, and configures the full skill catalog, five worker agents, and
confirmed role-specific model routing. It plans internally and reports results, preferring external
configuration and adapting installed files only when needed. Existing customizations are preserved;
conflicts and consequential changes require specific approval. It also asks whether
to run bounded live verification tests, which may consume model tokens.

Example: `Run specflow-setup for OpenCode and Codex CLI.`

Setup configures SpecFlow files; it does not install coding applications or manage credentials.
The manual agent installer below remains an alternative for copying Claude-format agents; it does
not perform this multi-tool configuration.

## Custom Agents

SpecFlow includes supporting worker agents in `agents/`:

- `coder`
- `decider`
- `designer`
- `reviewer`
- `validator`

The main install covers skills only. The worker agents are optional.

Copy the bundled agents into any directory you choose:

```bash
./install/install-agents.sh --path=/path/to/agents-dir
```

Claude Code global:

```bash
./install/install-agents.sh --path="$HOME/.claude/agents"
```

Claude Code project-local:

```bash
./install/install-agents.sh --path=/path/to/project/.claude/agents
```

You can also copy them manually if you prefer: copy the files into `~/.claude/agents/` or
`.claude/agents/`.

If your setup does not support the bundled `model` value in one of these files, edit the copied
agent file and replace or remove that field.

Site-specific install notes live on the docs site.

### Minimal Feature Path

1. Run `201-high-level-design`
2. Run `202-spec-design`
3. Run `301-spec-implementation`

For deeper cleanup afterward, run `401-cleanup` for source code or test code as separate runs.

What each step does:

- `201-high-level-design`: creates a short feature overview and user journey
- `202-spec-design`: writes Gherkin scenarios for the feature's expected behavior
- `301-spec-implementation`: designs and reviews the approach in memory, implements tests-first, then independently refines and validates
- `401-cleanup`: provides a deeper cleanup pass when the changed set warrants it

### Example

```text
Run 201-high-level-design for invoice approval.
Use 202-spec-design for invoice approval with balanced coverage.
Run 301-spec-implementation for the invoice approval feature.
```

If the changed set warrants deeper cleanup:

```text
Run 401-cleanup on the changed source files.
Run 401-cleanup on the changed test files.
```

## How SpecFlow Uses Gherkin

SpecFlow uses Gherkin to make behavior easier to review and discuss.

The Gherkin file is not the implementation plan and it is not meant to become ceremony. It is a compact way to capture what the system should do in user-visible terms.

In practice:

- `201` explains the feature
- `202` explains the expected behavior
- `301` builds it
- `401` adds a deeper, separately scoped cleanup pass when needed

## When To Use The Other Skills

The minimal path is enough for many tasks. The rest of the catalog exists to help when you need more context, stronger planning, or better project setup.

### Project Setup And Planning

Use these when you are starting a new project, entering a new domain, or need stronger up-front clarity.

- `100-domain-knowledge`: research the business domain, user workflows, constraints, and terminology
- `101-project-overview`: define what the product is, who it is for, and why it matters
- `102-system-architecture`: define the major system pieces and technical shape
- `103-common-data-model`: model relational schemas in one project-wide DBML file and non-relational data in Markdown
- `104-backend-architecture`: define API, service, and backend structure
- `105-frontend-architecture`: define frontend structure, state, and component patterns
- `106-ui-design` (Visual Design): record color, typography, spacing, and component appearance
- `107-ui-experience` (UX & Navigation): record user paths, interaction/recovery behavior, and pages/routes
- `108-ui-page-design`: design a page or related views with stateful HTML previews and a maintained page/route index
- `110-feature-overview`: define and prioritize the feature list

These are helpful, but not required for every project.

`106` and `107` are independently optional and can run in either order. Keep visual presentation in
`106` and navigation/interaction behavior in `107`; `108` applies those decisions to a specific page.
Both produce concise decision records, reuse established guidance, and compare alternatives only
when a meaningful choice remains open.

### Feature Design

Use these per feature.

- `201-high-level-design`: create a short feature overview
- `202-spec-design`: create the behavior spec in Gherkin

`301` owns the codebase-grounded implementation design and independent readiness review. The design stays in memory rather than becoming another feature artifact.

If SpecFlow has a center of gravity, this is it.

### Implementation And Cleanup

- `301-spec-implementation`: implement a substantial planned change
- `302-test-implementation`: add or repair tests for behavior that already exists
- `401-cleanup`: clean up changed source code or changed test code
- `402-test-correction`: classify and correct a failing test by deciding whether the defect is in the test, in source, or in intended behavior

`401-cleanup` handles exactly one cleanup target type per run. If you want both source and test cleanup, run it twice.
`402-test-correction` is for failing-test triage and correction when the right fix path is not yet clear.

## Common Ways To Use SpecFlow

### Existing project, new feature

Use:

`201` -> `202` -> `301`

Add `401` only when the changed set warrants deeper source or test cleanup.

### Existing project, unclear domain or product direction

Start with:

- `100`
- `101`
- `110`

Then move into feature work.

### Existing project, behavior exists but test coverage is weak

Use:

- `302-test-implementation`

### Existing project, code already changed and now needs refactoring

Use:

- `401-cleanup`

## Files SpecFlow Produces

Project-level docs go under `.specflow/docs/`.

Feature-level docs go under `.specflow/features/<fid>-<feature-slug>/`.

Typical feature outputs:

- `overview.md`
- `specs.feature`

`301` builds a compact, versioned implementation design in memory. Two fresh, independent, read-only reviewers assess the same complete brief revision before coding. After at most two repair rounds, remaining findings return to the caller for an explicit resolution; under `901`, the decider selects the best evidence-backed approach so implementation can continue without restarting the review budget. Actual reviewer verdicts and remaining risks stay visible.

Missing `201` or `202` context is generated inline without writing files unless requested. Running those skills normally still produces the artifacts above.

Reusable domain context goes under:

- `.specflow/context/domain-knowledge.md`

Project agent guidance goes in:

- `CLAUDE.md`

Nested `CLAUDE.md` files should only be added when a subtree genuinely needs local overrides. The
exception is `.specflow/CLAUDE.md` itself: run `context-manager` in `initialize` mode once, as part
of setting up SpecFlow in a project, to create it. It describes the `context/`/`docs`/`features/`
layout and states the feature isolation rule: each `.specflow/features/<F-ID>-<slug>/` folder is a
point-in-time snapshot, and Claude should not read another feature's folder unless explicitly asked
to.

## Example Prompts

```text
Run 201-high-level-design for account recovery.
Use 202-spec-design for account recovery with happy path coverage only.
Run 301-spec-implementation for the account recovery feature.
Run 302-test-implementation for the billing retry scenarios.
Run 401-cleanup on the staged source changes.
Run 402-test-correction for the failing checkout confirmation test.
Use 501-browser-qa-analyst to explore https://staging.example.com for bugs.
Run 502-defect-resolution to work through the open D11 backlog.
Refresh CLAUDE.md for this repo using context-manager.
```

## Worker Agents

SpecFlow includes a small worker bundle that supports the workflows:

- `coder`
- `decider`
- `designer`
- `reviewer`
- `validator`

These are support workers, not the main user-facing interface. The main interface is the skill catalog.

## Bonus Skills

These are useful support skills, but they are not part of the core SpecFlow feature workflow.

- `context-manager`: create or refresh `CLAUDE.md` files based on the actual repo

Like the rest of the numbered catalog, it can trigger from a matching prompt — you do not
need to type an exact slash command.

## Support Skills

These are meant to be referenced by name from inside other skills' steps, the same way
`101-project-overview` references `gap-check`, rather than reached for on their own.

- `gap-check`: resolve a workflow's declared Required Inputs from existing context first, then ask
  about only what's left, one question at a time with a recommended answer. Used during input
  validation by the 100-series workflows that run in the main conversation — `100-domain-knowledge`
  is the exception, since it runs forked with no user to ask.

`gap-check` runs in its caller's context — it has to reach the user to ask, so it is never dispatched
to a forked or background subagent.

- `engineering-principles`: SpecFlow's shared engineering principles. The primary principle is reuse
  over creation, applied through a reuse ladder (no change, configure, delete, reuse, extend,
  compose, platform, installed dependency, new code, new dependency), followed by a short list of
  supporting principles. Loaded by `301`, `302`, `401`, `402`, and `@coder`.

## Quality Assurance Skills

These explore a live, running system and work its findings toward resolution — a different kind of
pass from the numbered pipeline phases above, since they operate on a whole running site rather
than a bounded, already-changed scope. Both are user-invoked.

- `501-browser-qa-analyst`: drive a real, visible Chrome browser through a live site as a QA
  analyst would, judging each flow against a rubric and against what a reasonable user would
  expect, and logging anything broken or unintuitive to a running defect backlog
  (`D11-exploratory-defects.md`)
- `502-defect-resolution`: work through that backlog — dispatch each targeted entry to
  `402-test-correction` to reproduce, classify, and (when justified) fix it, update its status
  from the outcome, commit per entry, and compact the resolved history

`502` auto-resolves `Rubric`-detected entries (`Fixed` when `402` applies a real fix, `Not a
Defect` when `402` confirms the behavior is intentional) but always surfaces `Judgment`-detected
entries — subjective UX calls — back to the user rather than closing them out on its own.

## Orchestration Skills

These extend the core workflow into larger runs. Both are user-invoked.

- `900-feedback-loop`: run a bounded review/apply-fix convergence cycle around work that already
  happened, using isolated subagent contexts for each role
- `901-feature-loop`: run one feature end-to-end through `201` -> `202` -> per-scenario `301`
  build-out -> cleanup -> an optional expanded-coverage round -> base sync -> whole-feature review ->
  validated merge, on its own branch, with `900-feedback-loop` reviewing every design artifact and
  cleanup pass along the way

`901-feature-loop` is heavy by design — on the order of a hundred or more subagent invocations for a
feature with several scenarios across two coverage rounds. Use it when a feature genuinely
warrants full BDD rigor and branch-level traceability. Use direct edits for quick fixes, `301` for
substantial feature chunks, or `401` for already-changed cleanup scopes instead.

Review caps bound deliberation, not feature progress. At any exhausted review budget, `901` uses the
existing `decider` to choose a concrete way forward, applies any bounded correction, records finding
dispositions and remaining risks, and advances without claiming the review was clean. Tests, lint,
and build must still pass; confirmed defects and missing required behavior/coverage cannot be waived.
Resuming rebuilds pending context and preserves consumed budgets. A prior cap-only terminal report
can resume through the same decision protocol, appending to rather than rewriting its history.

## Practical Advice

- Start with the smallest workflow that fits the task
- Use the 100-series only when more project context is actually helpful
- Use the 200-series per feature, not for the whole roadmap at once
- Keep `201` and `202` short enough for fast human review
- Use `301` for substantial implementation work, not tiny isolated edits
- Use `401` after the code works, not instead of implementation discipline
- Use `402` when a failing test needs source-vs-test triage before you decide what to change

## In One Sentence

SpecFlow gives you just enough structure to design, implement, and clean up features with AI without burying the work in process.
