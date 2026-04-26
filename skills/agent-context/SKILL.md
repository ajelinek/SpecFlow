---
name: agent-context
description: >
  Use this skill when you need to create or refresh `AGENTS.md` files for a project so coding
  agents can navigate the repo, follow verified commands, and honor local architectural
  boundaries. Use it for a first-time project setup, when agent guidance has gone stale, or when
  a monorepo needs root guidance plus a small number of directory-specific overrides.
disable-model-invocation: true
---

# Agent Context

Create or refresh the project's `AGENTS.md` guidance from actual repository evidence. The goal is
to give coding agents a concise, trustworthy map of the codebase: where to look first, which
commands are real, which architectural boundaries matter, and where local overrides apply.

Output path: `AGENTS.md` at the project root, plus optional nested `AGENTS.md` files only where a
subtree has materially different conventions.

---

## Required Inputs

Before proceeding, confirm these inputs:

1. **Operation mode** - Are you generating `AGENTS.md` guidance for the first time, or refreshing existing files?
2. **Scope policy** - Should this run create only the root `AGENTS.md`, or are nested overlays allowed where justified?
3. **Excluded paths** - Are there any directories that must not be analyzed or updated?
4. **Project-specific constraints** - Are there any sensitive areas, forbidden commands, or deployment-critical paths that the repo itself may not reveal clearly?

If the scope policy is unclear, ask one blocking question before continuing. If the other inputs
are missing, proceed with these defaults and state them in the summary: refresh if files already
exist, otherwise generate; allow overlays only when clearly justified; no excluded paths beyond
generated or dependency directories discovered during exploration.

---

## Steps

- [ ] **Step 1: Validate inputs and target files.** Confirm the operation mode, scope policy, excluded paths, and any repo-specific constraints. Check whether `AGENTS.md` already exists at the project root and whether any nested `AGENTS.md` files already exist in major app or package directories.

- [ ] **Step 2: Load existing project context.** Read the current root `AGENTS.md` and any nested `AGENTS.md` files if they exist. Read high-signal repo context that should shape the guidance, such as `README.md`, workspace manifests, package manifests, build or task runner config, CI workflows, and existing `.specflow/` docs if they are present.

- [ ] **Step 3: Research the repository with `@explore`.** Use `@explore` for repository discovery rather than scanning broadly in the main context. Ask it to return:
  - the actual repo or workspace layout
  - the main applications, packages, or modules and what they appear to own
  - verified build, test, lint, format, and local-run entrypoints
  - architecture docs, ADRs, or local docs worth referencing instead of duplicating
  - generated directories, vendor directories, or other paths that should not receive local guidance files
  - candidate directories for nested `AGENTS.md` overlays only if they have materially different tooling, workflows, or constraints

  Ask for a concise summary with exact paths and concrete evidence.

- [ ] **Step 4: Decide the file plan.** Choose one of these outcomes before drafting:
  - root `AGENTS.md` only
  - root `AGENTS.md` plus a small number of nested overlays

  Default to root-only. Create nested `AGENTS.md` files only when the closest-file-wins behavior would clearly improve local guidance, such as a package with its own commands, runtime, test stack, or architectural rules.

- [ ] **Step 5: Draft the root `AGENTS.md`.** Write architecture-first guidance that helps an agent make safe, informed changes. Include only content supported by repo evidence or explicit user input.

  The root file should usually cover:
  - what the project is and how it is organized
  - which directories matter most and what they contain
  - which commands are canonical for setup, testing, linting, building, and local development
  - where to find deeper architecture or domain docs
  - broad repo-wide constraints, invariants, and generated-file boundaries
  - collaboration preferences that materially improve agent usefulness, such as how to ask clarifying questions, how to present options, or how to format responses

  Keep the file concise. Do not restate generic language, framework, or testing advice that belongs in installed standards skills or existing project docs. If the project has explicit interaction preferences, preserve the ones that materially improve collaboration, but keep them in the root `AGENTS.md` only. Example: number every clarifying question or decision point so the user can reply item-by-item, assume an experienced engineer audience, and keep explanations short unless the user asks for more detail.

  When helpful, use `./examples/root-AGENTS.md` as a style reference for root-level collaboration guidance and section shape.

- [ ] **Step 6: Draft nested overlays only where justified.** If Step 4 identified local overlays, write each nested `AGENTS.md` as an override layer for that subtree only. Do not repeat root content unless the local directory genuinely diverges.

  Each nested file should focus on:
  - the local scope it governs
  - the directories or files that matter most in that subtree
  - local commands, test entrypoints, or workflows that differ from the root
  - local constraints, invariants, and integration points an agent must respect

  Do not copy root-level interaction style, response-formatting rules, or general collaboration preferences into nested overlays unless the user explicitly asks for a local exception.

- [ ] **Step 7: Use the general agent only for substantial markdown synthesis.** If the repo contains many overlapping docs and the output requires non-trivial synthesis across them, delegate the drafting pass to the general agent with a narrow brief focused on the markdown deliverable. Do not use the general agent for simple discovery or file listing work.

- [ ] **Step 8: Review for overlap, conflicts, and weak guidance.** Before writing files, verify:
  - `AGENTS.md` is used as the filename everywhere, not `AGENT.md`
  - root guidance is repo-wide, and nested guidance contains only local additions or overrides
  - response-formatting and collaboration rules appear only in the root `AGENTS.md` unless a local exception is explicitly required
  - no instructions conflict across root and nested files
  - commands are grounded in the repo's actual scripts, tasks, or docs
  - no large sections duplicate existing `.specflow/` docs, architecture docs, or installed standards-skill guidance
  - any response-formatting or collaboration rules included are specific, intentional, and useful for this project
  - unknowns are called out explicitly rather than guessed

- [ ] **Step 9: Write the files.** Create or update the root `AGENTS.md` and any approved nested overlays in the user's project. Do not create guidance files inside dependency directories, hidden directories, generated output directories, or other paths that are clearly not user-owned source areas.

- [ ] **Step 10: Summarize the result.** Report:
  - which `AGENTS.md` files were created or updated
  - why nested overlays were added or skipped
  - the main repo evidence that shaped the guidance
  - any low-confidence areas or follow-up questions that should be resolved later

---

## Quality Bar

- Use `AGENTS.md` as the canonical filename throughout.
- Base every section on actual repository evidence or explicit user direction.
- Keep the root file broad and keep nested files local.
- Prefer references to existing docs over copying large blocks into `AGENTS.md`.
- Focus on structure, commands, boundaries, invariants, and workflow-critical guidance.
- Exclude generic standards guidance that is better handled elsewhere.
- Make commands executable as written whenever possible.
- Preserve explicit collaboration rules that make agent interaction easier, such as numbering clarifying questions and decision options, but keep them in the root file by default.
- Prefer brevity over teaching. Generated guidance should assume an experienced engineer audience unless the user explicitly wants deeper explanation.
- Name unknowns explicitly instead of filling gaps with assumptions.
