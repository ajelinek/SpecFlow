---
name: context-manager
description: >
  Create or refresh `AGENTS.md` project guidance from repo evidence, adding nested `AGENTS.md`
  overlays or path-scoped `.claude/rules/` only where a subtree or file pattern genuinely differs.
  Trigger it when project guidance is missing, stale, or needs local overrides (first-time setup,
  monorepos). `initialize` mode writes `.specflow/AGENTS.md` once during SpecFlow setup.
argument-hint: "[generate|refresh|initialize]"
context: fork
---

# Context Manager

Create or refresh `AGENTS.md` guidance from actual repository evidence: a concise, trustworthy map of
structure, real commands, important boundaries, and justified local overrides.

**Output**: Root `AGENTS.md` (at `./AGENTS.md` or `./.claude/AGENTS.md`), plus nested
`<subtree>/AGENTS.md` or path-scoped `.claude/rules/*.md` only where conventions materially differ.

**Why `AGENTS.md`:** Claude Code reads `AGENTS.md` every session, and so do the other agents
(Codex, Cursor, Windsurf, etc.) — one tool-agnostic file serves every coding agent, so there is a
single source of truth. The filename is always `AGENTS.md`; write a `CLAUDE.md` only if the user
explicitly asks for Claude-only extras (plan-mode triggers, subagent usage, permission notes). If a
legacy `CLAUDE.md` already exists, fold its unique content into `AGENTS.md` and leave `CLAUDE.md`
behind only as an `@AGENTS.md` import plus those Claude-specific extras (or delete it if the user
prefers) — never maintain two diverging copies.

---

## `.specflow/AGENTS.md`

If the repo has `.specflow/` (SpecFlow's generated project memory: `context/`, `docs/`,
`features/<F-ID>-<slug>/`), it gets its own nested `AGENTS.md` with the standard content in
`./examples/specflow-AGENTS.md`. Its key job is the **feature isolation rule**: each feature folder is
a point-in-time snapshot of one feature, and Claude must not read or draw context from a sibling
feature folder unless the user explicitly asks — `features/` accumulates many siblings over time, and
nothing else in the repo states this boundary.

**`initialize` mode** — a fast path the user runs once while setting up SpecFlow (after installing
the skills, before the first feature). If `.specflow/AGENTS.md` exists, do nothing; otherwise write
the example content verbatim. No repo research, no `@explore`, no other file changes, and none of the
Steps below. No SpecFlow skill calls it automatically, to avoid re-checking on every feature.

In `generate`/`refresh` mode, Step 6 also ensures `.specflow/AGENTS.md` exists with at least the
standard content, and may enrich it with a short, current list of what exists (which D-docs, which
feature folders) as long as the isolation rule and folder descriptions stay intact and it stays short.

---

## Required Inputs

1. **Operation mode** — generate, refresh, or initialize
2. **Scope policy** — root only, nested `AGENTS.md` overlays, or `.claude/rules/` where justified
3. **Excluded paths** — directories that must not be analyzed or updated
4. **Project-specific constraints** — sensitive areas, forbidden commands, or deployment-critical
   paths not obvious from the repo

`initialize` needs only item 1. Otherwise default to refresh-if-present, root-only unless overlays are
clearly justified, and no exclusions beyond generated/dependency directories. This skill runs in a
forked context; if scope policy is genuinely unclear and the defaults don't fit, return the question
to the caller.

---

## Steps (`generate` / `refresh`)

- [ ] **Step 1: Inventory guidance files.** Existing root or nested `AGENTS.md` / legacy
  `CLAUDE.md` / `CLAUDE.local.md`, `.claude/rules/`, and other cross-agent sources (`.cursorrules`,
  `.windsurfrules`, `.devin/rules/`).

- [ ] **Step 2: Load existing context.** Current `AGENTS.md`/`CLAUDE.md` files plus high-signal
  context: `README.md`, workspace/package manifests, task/build config, CI workflows, relevant
  `.specflow/` docs.

- [ ] **Step 3: Research with `@explore`:** repo/workspace layout; main apps/packages, what they own,
  and whether each has its own owners/conventions; verified setup, test, lint, build, and run
  commands; docs worth referencing instead of copying; generated/vendor paths that get no guidance
  files; directories whose tooling truly differs (overlay candidates); file-pattern conventions (e.g.
  `**/migrations/**`) better suited to `.claude/rules/`.

- [ ] **Step 4: Decide the file plan.** The root file is `AGENTS.md`. With a legacy `CLAUDE.md`,
  merge its unique content into `AGENTS.md` first, then leave `CLAUDE.md` as `@AGENTS.md` plus any
  Claude-only extras (or drop it when the user agrees) — don't re-derive or keep two copies. Otherwise
  draft `AGENTS.md` directly. Default to root-only; add **nested `AGENTS.md`** when a directory's
  owners maintain their own conventions that should version with that code, or
  **`.claude/rules/*.md`** (with `paths:` frontmatter) when a rule spans scattered paths or the team
  wants conventions governed in one place.

- [ ] **Step 5: Draft the root file** with only repo-evidenced, specific, testable guidance ("run
  `npm test` before committing", not "write clean code"): what the project is and how it's organized;
  which directories matter most; commands agents can't guess (verified, executable as written); deeper
  docs pulled in with `@path/to/doc` imports instead of pasted; repo-wide boundaries, invariants, and
  generated-file rules; collaboration and response-formatting rules (these stay in the root unless a
  local exception is required). Keep it well under ~200 lines — it loads in full every session, and
  longer files measurably reduce adherence. Filter every line:

  | Include | Exclude |
  |---|---|
  | Commands agents can't guess | Anything derivable by reading the code |
  | Conventions that differ from language/framework defaults | Standard conventions agents already know |
  | Testing instructions and preferred test runners | Detailed API docs (link/import instead) |
  | Repo etiquette (branch naming, PR conventions) | Information that changes frequently |
  | Architectural decisions specific to this project | Long explanations or tutorials |
  | Non-obvious gotchas and quirks | File-by-file codebase descriptions |
  | Env vars or local setup quirks | Self-evident advice like "write clean code" |

- [ ] **Step 6: Draft overlays or rules only where justified.** A nested `AGENTS.md` loads
  automatically once Claude reads a file in that subtree, so it holds only local scope, commands,
  constraints, and integration points that differ from the root — never repeated root content. Each
  `.claude/rules/*.md` covers one topic, has a descriptive filename, and carries `paths:` frontmatter
  when it should load only for matching files. Include `.specflow/AGENTS.md` when `.specflow/` exists,
  even if nothing else is justified.

- [ ] **Step 7: Delegate only substantial synthesis.** If many overlapping docs need real synthesis,
  hand the drafting to the general agent with a narrow markdown brief — never for simple discovery or
  file listing.

- [ ] **Step 8: Review.** Every file is named `AGENTS.md` (no unrequested `CLAUDE.md`) and stays well
  under ~200 lines; an existing `CLAUDE.md` is merged, not duplicated; root guidance is broad and
  nested/rule guidance local; commands are real and verified; nothing conflicts across files; nothing
  large is copied from docs, legacy `CLAUDE.md`, or general standards; unknowns are stated explicitly
  rather than filled with assumptions.

- [ ] **Step 9: Write and summarize.** Files created or updated, whether a legacy `CLAUDE.md` was
  merged or left as an `@AGENTS.md` import, why overlays were nested `AGENTS.md` vs `.claude/rules/`
  (or skipped), the evidence behind them, and low-confidence areas.
