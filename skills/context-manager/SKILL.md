---
name: context-manager
description: >
  Create or refresh `AGENTS.md` project guidance from repo evidence, adding nested `AGENTS.md`
  overlays only where a subtree genuinely differs.
  Trigger it when project guidance is missing, stale, or needs local overrides (first-time setup,
  monorepos). `initialize` mode writes `.specflow/AGENTS.md` once during SpecFlow setup.
argument-hint: "[generate|refresh|initialize]"
context: fork
---

# Context Manager

For human-facing Markdown, prefer headings and labeled bullets; use tables only for compact comparisons.
Keep required structured syntax unchanged.

Create or refresh `AGENTS.md` guidance from actual repository evidence: a concise, trustworthy map of
structure, real commands, important boundaries, and justified local overrides.

**Output**: Root `./AGENTS.md`, plus nested `<subtree>/AGENTS.md` only where conventions materially
differ. Do not put the root guide under `.claude/` or generate `.claude/rules/` by default.

**Why `AGENTS.md`:** Keep shared project guidance in one tool-agnostic source of truth. The filename
is always `AGENTS.md`; support for automatic discovery and nested scope varies by agent. Do not
assume Claude Code or every other agent loads it automatically. Create or update a Claude-specific
compatibility file only when the user explicitly requests it.

If a legacy `CLAUDE.md` already exists, carry its applicable project guidance into `AGENTS.md` at
the same scope. Resolve conflicts rather than copying contradictory instructions. Leave legacy
files unchanged unless the user authorizes migration cleanup; then replace shared content with an
`@AGENTS.md` import (relative to that file) or remove the file as agreed. Keep Claude-only extras
separate from shared guidance, and report any legacy copies that remain.

---

## `.specflow/AGENTS.md`

If the repo has `.specflow/` (SpecFlow's generated project memory: `context/`, `docs/`,
`features/<F-ID>-<slug>/`), it gets its own nested `AGENTS.md` with the standard content in
`./examples/specflow-AGENTS.md`. Its key job is the **feature isolation rule**: each feature folder is
a point-in-time snapshot of one feature, and agents must not read or draw context from a sibling
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
2. **Scope policy** — root only or nested `AGENTS.md` overlays where justified
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
  `**/migrations/**`) that should be stated with explicit scope in the nearest common `AGENTS.md`.

- [ ] **Step 4: Decide the file plan.** The root file is `AGENTS.md`. With a legacy `CLAUDE.md`,
  carry its applicable project guidance into `AGENTS.md` at the same scope. Do not rewrite or remove
  the legacy file without authorization. Otherwise draft `AGENTS.md` directly. Default to root-only;
  add **nested `AGENTS.md`** when a directory's owners maintain their own conventions that should
  version with that code. For rules spanning scattered paths, state the matching paths explicitly in
  their nearest common `AGENTS.md`. Tool-specific rules or compatibility files require an explicit
  user request and must not duplicate shared guidance.

- [ ] **Step 5: Draft the root file** with only repo-evidenced, specific, testable guidance ("run
  `npm test` before committing", not "write clean code"): what the project is and how it's organized;
  which directories matter most; commands agents can't guess (verified, executable as written); deeper
  docs referenced with relative Markdown links instead of pasted or tool-specific imports;
  repo-wide boundaries, invariants, and
  generated-file rules; collaboration and response-formatting rules (these stay in the root unless a
  local exception is required). Keep it well under ~200 lines so agents can load it without crowding
  out task context. Filter every line:

  - **Include**: commands agents can't guess; non-default conventions; testing instructions and preferred
    runners; repo etiquette (branch naming, PR conventions); project-specific architectural decisions;
    non-obvious gotchas; environment variables and local setup quirks.
  - **Exclude**: facts derivable from code; standard conventions; detailed API docs (link instead);
    frequently changing information; long explanations/tutorials; file-by-file descriptions;
    self-evident advice like "write clean code".

- [ ] **Step 6: Draft overlays only where justified.** A nested `AGENTS.md` holds only local scope,
  commands, constraints, and integration points that differ from the root, never repeated root
  content. State its subtree scope explicitly and link to it from the root guide so agents can find
  it even without automatic discovery. Include `.specflow/AGENTS.md` when `.specflow/` exists, even
  if nothing else is justified.

- [ ] **Step 7: Delegate only substantial synthesis.** If many overlapping docs need real synthesis,
  hand the drafting to the general agent with a narrow markdown brief — never for simple discovery or
  file listing.

- [ ] **Step 8: Review.** Every generated guide is named `AGENTS.md` and stays well under ~200 lines;
  the root guide is at `./AGENTS.md`; no unrequested `CLAUDE.md`, `CLAUDE.local.md`, or
  `.claude/rules/` files were created or changed; applicable legacy guidance is preserved at its
  original scope; root guidance is broad and nested guidance local; commands are real and verified;
  nothing conflicts across active guides; nothing
  large is copied from docs, legacy `CLAUDE.md`, or general standards; unknowns are stated explicitly
  rather than filled with assumptions.

- [ ] **Step 9: Write and summarize.** Files created or updated, whether a legacy `CLAUDE.md` was
  used as migration input or changed with authorization, any remaining duplicate guidance, why nested
  `AGENTS.md` overlays were added (or skipped), the evidence behind them, and low-confidence areas.
