# SpecFlow

SpecFlow is a lightweight, spec-driven workflow for building software with AI.

It helps you define a feature, describe its expected behavior, implement it, and clean it up without turning the process into a pile of bloated planning docs.

The core idea is simple:

1. Define the feature
2. Define the expected behavior
3. Implement it
4. Clean it up

If you only use one part of SpecFlow, use this path:

`201-high-level-design` -> `202-spec-design` -> `301-spec-implementation` -> `401-cleanup`

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
- `AGENTS.md` guidance
- local architecture docs
- installed standards skills

That means SpecFlow gives you process structure without forcing a single engineering style.

## Start Here

Most users should start with the minimal feature path.

## Install

Install SpecFlow:

```bash
npx skills add ajelinek/SpecFlow --skill specflow
```

That is the main install. It adds the `specflow` umbrella skill, which acts as the single
entrypoint for the broader SpecFlow catalog.

If you want every bundled skill available individually too:

```bash
npx skills add ajelinek/SpecFlow --skill '*'
```

List what the CLI sees before installing:

```bash
npx skills add ajelinek/SpecFlow --list
```

## Custom Agents

SpecFlow includes supporting worker agents in `agents/`:

- `coder`
- `designer`
- `execution-agent`

The main install covers skills only. The worker agents are optional.

Copy the bundled agents into any directory you choose:

```bash
./install/install-agents.sh --path=/path/to/agents-dir
```

OpenCode global:

```bash
./install/install-agents.sh --path="$HOME/.config/opencode/agents"
```

OpenCode project-local:

```bash
./install/install-agents.sh --path=/path/to/project/.opencode/agents
```

Claude Code global:

```bash
./install/install-agents.sh --path="$HOME/.claude/agents"
```

Claude Code project-local:

```bash
./install/install-agents.sh --path=/path/to/project/.claude/agents
```

You can also copy them manually if you prefer:

- OpenCode: copy the files into `~/.config/opencode/agents/` or `.opencode/agents/`
- Claude Code: copy the files into `~/.claude/agents/` or `.claude/agents/`

If your runtime does not support the bundled `model` value in one of these files, edit the copied
agent file and replace or remove that field.

Site-specific install notes live on the docs site.

### Minimal Feature Path

1. Run `201-high-level-design`
2. Run `202-spec-design`
3. Run `301-spec-implementation`
4. Run `401-cleanup` for source code
5. Run `401-cleanup` again for test code if needed

What each step does:

- `201-high-level-design`: creates a short feature overview and user journey
- `202-spec-design`: writes Gherkin scenarios for the feature's expected behavior
- `301-spec-implementation`: implements the feature against the spec
- `401-cleanup`: tightens the changed code after it works

### Example

```text
Run 201-high-level-design for invoice approval.
Use 202-spec-design for invoice approval with balanced coverage.
Run 301-spec-implementation for the invoice approval feature.
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
- `401` cleans it up

## When To Use The Other Skills

The minimal path is enough for many tasks. The rest of the catalog exists to help when you need more context, stronger planning, or better project setup.

### Project Setup And Planning

Use these when you are starting a new project, entering a new domain, or need stronger up-front clarity.

- `100-domain-knowledge`: research the business domain, user workflows, constraints, and terminology
- `101-project-overview`: define what the product is, who it is for, and why it matters
- `102-system-architecture`: define the major system pieces and technical shape
- `103-common-data-model`: define the core domain entities and relationships
- `104-backend-architecture`: define API, service, and backend structure
- `105-frontend-architecture`: define frontend structure, state, and component patterns
- `106-ui-design`: define the visual system
- `107-ui-experience`: define navigation, flow, and interaction rules
- `108-ui-page-design`: design a specific page in detail
- `110-feature-overview`: define and prioritize the feature list

These are helpful, but not required for every project.

### Feature Design

Use these per feature.

- `201-high-level-design`: create a short feature overview
- `202-spec-design`: create the behavior spec in Gherkin
- `203-implementation-design`: create a codebase-grounded implementation plan
- `204-feature-validation`: review the feature artifacts before implementation begins

If SpecFlow has a center of gravity, this is it.

### Implementation And Cleanup

- `301-spec-implementation`: implement a substantial planned change
- `302-test-implementation`: add or repair tests for behavior that already exists
- `401-cleanup`: clean up changed source code or changed test code

`401-cleanup` handles exactly one cleanup target type per run. If you want both source and test cleanup, run it twice.

## Common Ways To Use SpecFlow

### Existing project, new feature

Use:

`201` -> `202` -> `301` -> `401`

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

Feature-level docs go under `.specflow/features/<feature-name>/`.

Typical feature outputs:

- `overview.md`
- `specs.feature`
- `implementation.md`

Reusable domain context goes under:

- `.specflow/context/domain-knowledge.md`

Project agent guidance goes in:

- `AGENTS.md`

Nested `AGENTS.md` files should only be added when a subtree genuinely needs local overrides.

## Example Prompts

```text
Run 201-high-level-design for account recovery.
Use 202-spec-design for account recovery with happy path coverage only.
Run 203-implementation-design for account recovery.
Validate the account recovery feature with 204-feature-validation.
Run 301-spec-implementation for the account recovery feature.
Run 302-test-implementation for the billing retry scenarios.
Run 401-cleanup on the staged source changes.
Refresh AGENTS.md for this repo using agent-context.
Do deep research on the latest remote browser automation options for coding agents.
```

## Worker Agents

SpecFlow includes a small worker bundle that supports the workflows:

- `coder`
- `designer`
- `execution-agent`

These are support workers, not the main user-facing interface. The main interface is the skill catalog.

## Bonus Skills

These are useful support skills, but they are not part of the core SpecFlow feature workflow.

- `agent-context`: create or refresh `AGENTS.md` files based on the actual repo
- `deep-research`: do real web research when current external information matters

Only these skills may be invoked automatically when appropriate.

Everything else in SpecFlow is user-invoked.

## Practical Advice

- Start with the smallest workflow that fits the task
- Use the 100-series only when more project context is actually helpful
- Use the 200-series per feature, not for the whole roadmap at once
- Keep `201` and `202` short enough for fast human review
- Use `301` for substantial implementation work, not tiny isolated edits
- Use `401` after the code works, not instead of implementation discipline

## In One Sentence

SpecFlow gives you just enough structure to design, implement, and clean up features with AI without burying the work in process.
