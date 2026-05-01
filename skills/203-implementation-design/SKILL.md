---
name: 203-implementation-design
description: >
  Use `203` to produce a codebase-grounded implementation plan for a feature. It maps the needed
  file changes and explains how the implementation should fit the existing code. Trigger it for
  prompts like "203", "implementation design", "technical design", or "how do I build this" when
  overview and spec artifacts already exist.
---

# 203 - Implementation Design

Produce `.specflow/features/<feature-name>/implementation.md`: a standalone implementation plan
that tells an engineer what files should change, why they change, and how the feature should fit
the existing codebase.

The core rule is reuse-first: prefer extending existing modules over creating new files. A new file
needs explicit justification.

**Output path**: `.specflow/features/<feature-name>/implementation.md`

---

## Detail Levels

Choose one before proceeding:

| Level | Tables include | Implementation details |
|:------|:---------------|:-----------------------|
| **High Level** | Core production files only; no CSS/style files; no tests | One sentence per module; no signatures |
| **Balanced** *(default)* | All production files except CSS/style files and tests | Module-level explanation; no signatures |
| **Detailed** | All production files including CSS/style files; no tests | Module details plus exported function/component signatures |

---

## Required Inputs

Before proceeding, confirm:

1. **Feature name**
2. **Detail level** — High Level, Balanced, or Detailed

If the feature name is missing, ask. If the detail level is omitted, use **Balanced**.

---

## Decision Precedence

Resolve implementation decisions in this order:

1. Loaded standards guidance relevant to the concern
2. Existing SpecFlow or project documentation
3. Existing codebase patterns confirmed via `@explore`
4. Explicit user decisions in this session

Stay generic only until the stack is known. After that, use the codebase's real technology terms.

---

## Steps

- [ ] **Step 1: Load feature context.** Read these files if they exist:
  - `.specflow/features/<feature-name>/overview.md`
  - `.specflow/features/<feature-name>/specs.feature`
  - `.specflow/features/<feature-name>/implementation.md`

  If `overview.md` is missing, ask for a short feature summary, primary user outcome, and known
  constraints. If `specs.feature` is missing, ask whether to run `202-spec-design` first or
  continue without it.

- [ ] **Step 2: Load architecture context.** Read relevant existing docs such as D01-D08 and
  `.specflow/context/domain-knowledge.md` when they exist. Skip missing files and note them.

- [ ] **Step 3: Research the codebase with `@explore`.** This step is required. Ask `@explore` to:
  - map the relevant source layout
  - find existing implementations of similar forms, routes, hooks, services, repositories,
    utilities, and state patterns
  - read a few concrete examples in full
  - identify reusable modules/helpers and repository conventions
  - flag inconsistent existing patterns worth consolidating instead of copying

  Load any relevant skills before moving on. From this point forward, describe the design in the
  concrete language of the project stack.

- [ ] **Step 4: Do the reuse-first assessment.** Explicitly list:
  - requirements satisfied by existing code with no change
  - requirements satisfied by small extensions to existing modules
  - requirements that genuinely need a new file

  The default answer to “should I create a new file?” is no. Justify every `New` file.

- [ ] **Step 5: Evaluate implementation approaches.** Identify 2-3 plausible structural approaches
  for the remaining decisions. For each, note:
  - what changes structurally
  - how many new files it requires versus existing files it extends
  - how well it matches existing patterns
  - major tradeoffs

  Choose the smallest clean approach that best matches the codebase. Do not optimize for
  performance unless the feature requires it.

- [ ] **Step 6: Produce the change summary tables.** Use separate frontend and backend sections.
  Exclude test/spec/fixture/mock/snapshot files from all tables. Include CSS/style files only in
  **Detailed** mode.

  Table columns:
  | Module/File Path | Item Name | Status | Description |

  - **Module/File Path**: exact path from project root, or `(path TBC)` if unknown
  - **Item Name**: primary export or item name
  - **Status**: `New`, `Updated`, or `Removed`
  - **Description**: one sentence stating what it is and why it changes

- [ ] **Step 7: Produce implementation details.** Follow the selected detail level:
  - **High Level**: one sentence per module
  - **Balanced**: module summary plus 1-2 sentences on what changes and why
  - **Detailed**: module summary plus exported function/component signatures and short notes

  For updated files, describe the change, not the whole file. Make sure every scenario in
  `specs.feature` is covered by at least one implementation detail.

- [ ] **Step 8: Assemble the document.** Use `./templates/implementation.md` and include these
  sections in order:
  - Title
  - Fallback Context *(only when `overview.md` is missing)*
  - Implementation Approach
  - Frontend Change Summary
  - Backend Change Summary
  - Frontend Implementation Details
  - Backend Implementation Details

  If `overview.md` exists, do not restate it here.

- [ ] **Step 9: Validate the design.** Confirm:
  - every `New` file is justified
  - existing helpers/modules are reused where possible
  - the selected approach follows loaded standards and repository patterns
  - no premature optimization is introduced without a real requirement
  - every scenario is addressable
  - the selected detail level is followed exactly
  - no Mermaid diagrams appear anywhere

- [ ] **Step 10: Write the file and summarize.** Report:
  - output path written
  - detail level used
  - new files versus existing files extended
  - selected approach and rejected alternatives
  - standards guidance consulted
  - missing context that may affect accuracy
  - assumptions that should be validated before implementation
  - suggest running `204-feature-validation` next

---

## Design Rules

1. Extend before creating.
2. Prefer the smallest additive change that still reads clearly.
3. A small rearchitecture is acceptable when it simplifies the overall result.
4. Do not introduce new abstraction layers unless they remove meaningful duplication.
5. This document is implementation design, not a rewrite of `overview.md`.
