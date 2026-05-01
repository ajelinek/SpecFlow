---
name: agent-context
description: >
  Create or refresh `AGENTS.md` guidance so coding agents can navigate a repository safely.
  Trigger it when repo guidance is missing, stale, or needs local subtree overrides, especially
  for first-time setup or monorepos with different conventions by directory.
---

# Agent Context

Create or refresh `AGENTS.md` guidance from actual repository evidence. The goal is a concise,
trustworthy map of the repo: structure, real commands, important boundaries, and any justified
local overrides.

**Output**: `AGENTS.md` at the project root, plus nested `AGENTS.md` files only where a subtree has
materially different conventions.

---

## Required Inputs

Before proceeding, confirm:

1. **Operation mode** — generate or refresh
2. **Scope policy** — root file only or nested overlays allowed where justified
3. **Excluded paths** — directories that must not be analyzed or updated
4. **Project-specific constraints** — sensitive areas, forbidden commands, or deployment-critical
   paths not obvious from the repo

If scope policy is unclear, ask. Otherwise, default to refresh-if-present, root-only unless
overlays are clearly justified, and no extra exclusions beyond generated/dependency directories.

---

## Steps

- [ ] **Step 1: Validate inputs and target files.** Check whether root or nested `AGENTS.md` files
  already exist.

- [ ] **Step 2: Load existing project context.** Read current `AGENTS.md` files if present, plus
  high-signal repo context such as `README.md`, workspace/package manifests, task/build config, CI
  workflows, and relevant `.specflow/` docs.

- [ ] **Step 3: Research the repository with `@explore`.** Ask for:
  - actual repo/workspace layout
  - main apps/packages and what they own
  - verified setup, test, lint, build, and local-run commands
  - architecture docs or local docs worth referencing
  - generated/vendor paths that should not receive guidance files
  - candidate directories for nested overlays only when local tooling/workflows truly differ

- [ ] **Step 4: Decide the file plan.** Choose:
  - root `AGENTS.md` only, or
  - root `AGENTS.md` plus a small number of nested overlays

  Default to root-only.

- [ ] **Step 5: Draft the root file.** Include only repo-evidenced guidance such as:
  - what the project is and how it is organized
  - which directories matter most
  - canonical commands
  - where deeper docs live
  - repo-wide boundaries, invariants, and generated-file rules
  - collaboration rules that materially help agent work

- [ ] **Step 6: Draft nested overlays only where justified.** Each nested file should contain only
  local scope, commands, constraints, and integration points that genuinely differ from the root.

- [ ] **Step 7: Review for overlap and weak guidance.** Confirm:
  - filename is always `AGENTS.md`
  - root guidance is broad and nested guidance is local
  - commands are real
  - instructions do not conflict
  - large sections are not copied from existing docs or general standards
  - unknowns are stated explicitly

- [ ] **Step 8: Write the files and summarize.** Report which files were created or updated, why
  overlays were added or skipped, the repo evidence that shaped them, and any low-confidence areas.

---

## Rules

1. Base every section on repo evidence or explicit user direction.
2. Keep root guidance broad and nested guidance local.
3. Prefer references to existing docs over copying them.
4. Exclude generic standards guidance that belongs elsewhere.
5. Prefer brevity over teaching.
