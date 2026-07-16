---
name: context-manager
description: >
  Create or refresh `CLAUDE.md` guidance — Claude Code's native project-memory file — so Claude can
  navigate a repository safely. Adds nested `CLAUDE.md` overlays or path-scoped `.claude/rules/`
  only where a subtree or file pattern genuinely differs. Trigger it when project guidance is
  missing, stale, or needs local overrides, especially for first-time setup or monorepos.
argument-hint: "[generate|refresh]"
context: fork
---

# Context Manager

Create or refresh `CLAUDE.md` guidance from actual repository evidence. The goal is a concise,
trustworthy map of the repo: structure, real commands, important boundaries, and any justified
local overrides — written the way Claude Code actually loads and weighs project memory.

**Output**: `CLAUDE.md` at the project root, plus nested `CLAUDE.md` files or path-scoped
`.claude/rules/*.md` only where a subtree or file pattern has materially different conventions. If
the repo already carries an `AGENTS.md` that other coding agents rely on, `CLAUDE.md` imports it
with `@AGENTS.md` instead of duplicating it.

---

## Why `CLAUDE.md`, not `AGENTS.md`

Claude Code reads `CLAUDE.md` at the start of every session. It does not read `AGENTS.md`
natively — a bare `AGENTS.md` with no `CLAUDE.md` is invisible to Claude Code until something
points at it. `AGENTS.md` is the open, tool-agnostic convention other agents (Codex, Cursor,
Windsurf, etc.) read instead. This skill's job is to make sure Claude Code has real project memory,
while staying compatible with any cross-agent file the repo already maintains.

---

## Required Inputs

Before proceeding, confirm:

1. **Operation mode** — generate or refresh
2. **Scope policy** — root file only, nested `CLAUDE.md` overlays, or `.claude/rules/` where
   justified
3. **Excluded paths** — directories that must not be analyzed or updated
4. **Project-specific constraints** — sensitive areas, forbidden commands, or deployment-critical
   paths not obvious from the repo

If scope policy is unclear, ask. Otherwise, default to refresh-if-present, root-only unless
overlays are clearly justified, and no extra exclusions beyond generated/dependency directories.

---

## Steps

- [ ] **Step 1: Validate inputs and target files.** Check whether root or nested `CLAUDE.md` /
  `CLAUDE.local.md` files already exist, whether `.claude/rules/` is in use, and whether an
  `AGENTS.md` (or `.cursorrules`, `.windsurfrules`, `.devin/rules/`) already exists as a
  cross-agent source of truth.

- [ ] **Step 2: Load existing project context.** Read current `CLAUDE.md`/`AGENTS.md` files if
  present, plus high-signal repo context such as `README.md`, workspace/package manifests,
  task/build config, CI workflows, and relevant `.specflow/` docs.

- [ ] **Step 3: Research the repository with `@explore`.** Ask for:
  - actual repo/workspace layout
  - main apps/packages and what they own, and whether each has its own owner/conventions
  - verified setup, test, lint, build, and local-run commands
  - architecture docs or local docs worth referencing instead of copying
  - generated/vendor paths that should not receive guidance files
  - candidate directories for nested overlays only when local tooling/workflows truly differ
  - any file-pattern-scoped conventions (e.g. all `**/migrations/**`) that would fit
    `.claude/rules/` better than a directory overlay

- [ ] **Step 4: Decide the file plan.**
  - If an `AGENTS.md` already exists and is current, make it the source of truth: root
    `CLAUDE.md` starts with `@AGENTS.md` and adds only Claude-specific instructions below the
    import (plan-mode triggers, subagent usage, permissions). Do not re-derive its content by
    hand.
  - If no `AGENTS.md` exists, draft `CLAUDE.md` directly.
  - Choose root-only, root + nested `CLAUDE.md` overlays, or root + `.claude/rules/`:
    - **Nested `CLAUDE.md`** when a directory/package owner maintains their own conventions and
      the instructions should live and version alongside that code.
    - **`.claude/rules/*.md`** (with `paths:` frontmatter) when the same rule spans scattered
      paths, or the team wants every convention governed from one place.
  - Default to root-only.

- [ ] **Step 5: Draft the root file.** Include only repo-evidenced guidance such as:
  - what the project is and how it is organized (repo/monorepo layout, where each package lives)
  - which directories matter most
  - canonical commands Claude can't guess (setup, test, lint, build, run)
  - where deeper docs live, pulled in with `@path/to/doc` imports instead of pasted
  - repo-wide boundaries, invariants, and generated-file rules
  - collaboration rules that materially help agent work

  Apply the content filter below to every candidate line, and keep the file well under ~200
  lines — Claude Code loads `CLAUDE.md` in full every session, and longer files measurably reduce
  instruction adherence.

  | Include | Exclude |
  |---|---|
  | Commands Claude can't guess | Anything derivable by reading the code |
  | Conventions that differ from language/framework defaults | Standard conventions Claude already knows |
  | Testing instructions and preferred test runners | Detailed API docs (link/import instead) |
  | Repo etiquette (branch naming, PR conventions) | Information that changes frequently |
  | Architectural decisions specific to this project | Long explanations or tutorials |
  | Non-obvious gotchas and quirks | File-by-file codebase descriptions |
  | Env vars or local setup quirks | Self-evident advice like "write clean code" |

- [ ] **Step 6: Draft nested overlays or rules only where justified.** Each nested `CLAUDE.md`
  should contain only local scope, commands, constraints, and integration points that genuinely
  differ from the root — Claude Code loads it automatically once it reads a file in that
  subdirectory, so it must not repeat root content. Each `.claude/rules/*.md` should cover one
  topic, use a descriptive filename, and carry `paths:` frontmatter when it should only load for
  matching files.

- [ ] **Step 7: Use the general agent only for substantial markdown synthesis.** If the repo has
  many overlapping docs and the output requires real synthesis, delegate the drafting pass with a
  narrow markdown brief. Do not use the general agent for simple discovery or file listing.

- [ ] **Step 8: Review for overlap and weak guidance.** Confirm:
  - filename is `CLAUDE.md` everywhere (never `AGENTS.md`, unless the user explicitly asked for a
    cross-agent file)
  - if `AGENTS.md` exists, `CLAUDE.md` imports it rather than duplicating it
  - root guidance is broad and nested/rule guidance is local
  - every file stays comfortably under ~200 lines
  - commands are real and verified
  - instructions do not conflict across root, nested, and rule files
  - large sections are not copied from existing docs, `AGENTS.md`, or general standards — link or
    `@import` instead
  - response-formatting and collaboration rules stay in the root file unless a local exception is
    genuinely required
  - unknowns are stated explicitly

- [ ] **Step 9: Write the files and summarize.** Report which files were created or updated,
  whether an `AGENTS.md` import was used, why overlays were added as nested `CLAUDE.md` vs.
  `.claude/rules/` (or skipped), the repo evidence that shaped them, and any low-confidence areas.

---

## Rules

1. Base every section on repo evidence or explicit user direction.
2. The filename is always `CLAUDE.md` — root at `./CLAUDE.md` (or `./.claude/CLAUDE.md`), nested
   at `<subtree>/CLAUDE.md`. Only produce `AGENTS.md` if the user explicitly asks for cross-agent
   guidance.
3. If an `AGENTS.md` already exists, make `CLAUDE.md` import it with `@AGENTS.md` and add
   Claude-specific instructions below the import — never fork the content into two copies.
4. Keep root guidance broad and nested/rule guidance local; keep every file well under ~200 lines.
5. Prefer `@imports` and references to existing docs over copying them.
6. Exclude generic standards guidance and anything Claude can derive by reading the code.
7. Prefer brevity over teaching; write specific, testable instructions ("run `npm test` before
   committing") instead of aspirational ones ("write clean code").
8. Keep collaboration and response-formatting rules in the root file unless a local exception is
   required.
9. Make commands executable as written whenever possible; verify before including.
10. Name unknowns explicitly instead of filling gaps with assumptions.
