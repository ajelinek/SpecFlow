---
name: 203-implementation-design
description: >
  Use `203` to produce a codebase-grounded implementation plan for a feature. It maps the needed
  file changes and explains how the implementation should fit the existing code. Trigger it for
  prompts like "203", "implementation design", "technical design", or "how do I build this" when
  overview and spec artifacts already exist.
argument-hint: "[feature-name] [detail-level]"
---

# 203 - Implementation Design

Produce a standalone plan telling an engineer which files change, why, and how the feature fits the
existing codebase. Reuse-first, governed by `engineering-principles`: extend existing modules before
creating new files, and prefer the smallest additive change that still reads clearly — though a
small rearchitecture is fine when it simplifies the overall result. This is implementation design,
not a rewrite of `overview.md`.

**Output path**: `.specflow/features/<fid>-<feature-slug>/implementation.md` (same feature folder as
the other artifacts)

---

## Detail Levels

| Level | Tables include | Implementation details |
|:------|:---------------|:-----------------------|
| **High Level** | Core production files only; no CSS/style files; no tests | One sentence per module; no signatures |
| **Balanced** *(default)* | All production files except CSS/style files and tests | Module summary plus 1-2 sentences on what changes and why; no signatures |
| **Detailed** | All production files including CSS/style files; no tests | Module details plus exported function/component signatures and short notes |

---

## Required Inputs

1. **Feature name** — ask if missing
2. **Detail level** — default **Balanced** if omitted

---

## Standards Resolution

Load relevant installed skills first (via supported skill-loading tools, not filesystem discovery),
then resolve each concern in this order: (1) loaded standards guidance, (2) existing SpecFlow or
project docs, (3) codebase patterns confirmed via `@explore`, (4) explicit user decisions. Judge
relevance by concern, not named technology; once the stack is known, use the codebase's real terms.
If loaded guidance offers conflicting directions, surface the conflict and ask — never choose
silently.

---

## Steps

- [ ] **Step 1: Load feature context.** Read the feature's `overview.md`, `specs.feature`, and any
  existing `implementation.md`. If `overview.md` is missing, ask for a short summary, primary user
  outcome, and known constraints. If `specs.feature` is missing, ask whether to run `202-spec-design`
  first or continue without it.

- [ ] **Step 2: Load architecture context.** Relevant D01-D08 and `domain-knowledge.md`; note
  missing files.

- [ ] **Step 3: Research the codebase with `@explore`** (required). Map the relevant source layout;
  find similar forms, routes, hooks, services, repositories, utilities, and state patterns and read a
  few in full; identify reusable modules and conventions; flag inconsistent patterns worth
  consolidating rather than copying. Load relevant skills, then describe the design in the project
  stack's concrete language from here on.

- [ ] **Step 4: Reuse-first assessment.** Load `engineering-principles` and apply its reuse ladder.
  List requirements met by existing code unchanged, by small extensions, and those genuinely needing
  a new file. The default answer to "new file?" is no: justify every `New` file against concrete
  candidates from Step 3. Name any new third-party dependency explicitly — an unnamed one is not
  approved for implementation.

- [ ] **Step 5: Evaluate 2-3 structural approaches** for the remaining decisions: what changes, new
  files vs files extended, fit with existing patterns, tradeoffs. Choose the smallest clean approach
  that best matches the codebase. No performance optimization unless the feature requires it.

- [ ] **Step 6: Produce the change summary tables**, separate for frontend and backend, never
  including test/spec/fixture/mock/snapshot files; CSS/style files only in Detailed.

  | Module/File Path | Item Name | Status | Description |
  - **Module/File Path** — exact path from project root, or `(path TBC)`
  - **Item Name** — primary export or item
  - **Status** — `New`, `Updated`, or `Removed`
  - **Description** — one sentence: what it is and why it changes

- [ ] **Step 7: Produce implementation details** at the selected level. For updated files, describe
  the change, not the whole file. Every `specs.feature` scenario must be covered by at least one
  detail.

- [ ] **Step 8: Assemble the document** from `./templates/implementation.md`, in order: Title,
  Fallback Context *(only when `overview.md` is missing)*, Implementation Approach, Frontend Change
  Summary, Backend Change Summary, Frontend Implementation Details, Backend Implementation Details.
  No Mermaid diagrams anywhere.

- [ ] **Step 9: Validate the design.** Every `New` file justified; nothing re-implements existing
  functionality; existing helpers reused; loaded standards and repo patterns followed; no new
  abstraction layer unless it removes meaningful duplication; no premature optimization; every
  scenario addressable; the Detail Levels table followed exactly; no test files in tables; no Mermaid.

- [ ] **Step 10: Write and summarize.** Report the path, detail level, new vs extended files, selected
  approach and rejected alternatives, standards consulted, missing context, assumptions to validate
  before implementation, and suggest `204-feature-validation` next.
