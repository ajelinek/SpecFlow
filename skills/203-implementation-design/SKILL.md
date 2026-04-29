---
name: 203-implementation-design
description: >
  Use `203` to produce a codebase-grounded implementation plan for a feature. It maps the needed
  file changes and explains how the implementation should fit the existing code. Trigger it for
  prompts like "203", "implementation design", "technical design", or "how do I build this" when
  overview and spec artifacts already exist.
---

# 203 — Implementation Design

Produce `.specflow/features/<feature-name>/implementation.md`: a standalone implementation design
document that defines which files change, what each does, and the reasoning behind every structural
decision. The output gives implementers a clear, codebase-grounded plan before a single line of
production code is written.

The guiding principle is: **the best code is the code not written.** This workflow always looks
for the smallest additive change that satisfies the feature requirements. A new file is a last
resort, not a first instinct. Where a small rearchitecture of an existing module produces a
simpler result than adding new code alongside it, prefer the rearchitecture.

This skill is **language-agnostic and standards-aware**: it does not prescribe a technology stack
or coding style of its own. Instead, it honors standards already loaded into the current session
for the codebase's relevant concerns — architecture, language/runtime, UI/client, service/API,
data/storage, testing/quality, security/privacy, and deployment/operations.

**Output path**: `.specflow/features/<feature-name>/implementation.md`

---

## Detail Levels

Choose one before proceeding. The level controls depth in the Change Summary tables and
Implementation Details sections.

| Level | Tables include | Implementation Details |
|:------|:--------------|:-----------------------|
| **High Level** | Core files created or modified; excludes CSS/style files and test files | Module-level only — one sentence per file describing purpose or change; no function signatures |
| **Balanced** *(default)* | All production files except CSS/style files and test files | Module-level + 1–2 sentences per module explaining what is changing and why; no function signatures |
| **Detailed** | All production files including CSS/style files; excludes test files | Full detail — every function/component with interface signature and 1–2 sentence description |

If the user does not specify a level, use **Balanced**.

---

## Required Inputs

Before proceeding, confirm:

1. **Feature name** — which feature is being designed for implementation?
2. **Detail level** — High Level, Balanced, or Detailed? (default: Balanced)

If the feature name is missing, ask before proceeding. If the detail level is not specified,
proceed with Balanced and note the default in the summary.

---

## Standards Resolution

Use standards already loaded into the current session as the authoritative source of project
conventions. These may come from managed instructions, project instructions, or explicitly loaded
skills.

At the start of standards resolution, load any relevant skills available through the environment's
supported skill-loading tools if they are not already active. Prefer supported tooling and managed
instruction sources over manual filesystem discovery.

Resolve implementation decisions in this order:

1. Loaded standards guidance relevant to the current concern
2. Existing SpecFlow or project documentation
3. Existing codebase patterns confirmed via `@explore`
4. Explicit user decisions made in this session

Determine relevance by concern, not by named technology. Typical concerns include general
engineering, architecture, language/runtime, application layer, UI/client, service/API,
data/storage, testing/quality, security/privacy, deployment/operations, and accessibility.

Stay concern-based while the implementation context is still unresolved. Once the relevant stack is
known from D02-D08, loaded guidance, the existing codebase, or the user's input, switch to the
real technology terms for the remainder of this workflow. Ask clarifying questions, describe
changes, and evaluate reuse opportunities in the concrete language of the codebase rather than in
generic cross-stack phrasing.

Use supported tooling to load relevant skills; do not manually inspect out-of-scope locations as a
discovery mechanism. If a needed concern is not represented in loaded guidance, loadable skills,
or project evidence, state that explicitly and continue using repository evidence or user input.

---

## Steps

- [ ] **Step 1: Load feature context.** Read the following files directly if they exist:
  - `.specflow/features/<feature-name>/overview.md` — feature scope, acceptance criteria, and user journey (primary input)
  - `.specflow/features/<feature-name>/specs.feature` — Gherkin scenarios the implementation must satisfy
  - `.specflow/features/<feature-name>/implementation.md` — if a prior draft exists, load it before overwriting

  If `overview.md` does not exist, do not block the workflow. Ask the user for a short feature
  summary, the primary user outcome, and any known constraints, then use that as fallback context
  for this run.
  If `specs.feature` does not exist, ask whether to run `202-spec-design` first or proceed without it.

  Skip missing files and note which are missing before continuing.

- [ ] **Step 2: Load architecture context.** Read these files if they exist:
  - `.specflow/docs/D01-project-overview.md` — business goals, user types, success metrics
  - `.specflow/docs/D02-system-architecture.md` — system boundaries, technology choices, constraints
  - `.specflow/docs/D03-common-data-model.md` — canonical data structures
  - `.specflow/docs/D04-backend-architecture.md` — API patterns, service layer conventions
  - `.specflow/docs/D05-frontend-architecture.md` — component architecture, state management strategy
  - `.specflow/docs/D06-ui-design.md` — design system, component library conventions
  - `.specflow/docs/D08-ui-pages/<relevant-page>.md` — page-level structure for any screens this feature touches
  - `.specflow/context/domain-knowledge.md` — domain rules that constrain implementation choices

  Skip files that do not exist. Note which are missing.

- [ ] **Step 3: Research the codebase with `@explore`.** This step is not optional. Use `@explore`
      to examine the existing codebase before designing anything. The goal is to understand *how
      the code actually works today* — what patterns exist, where they live, and how this feature's
      requirements can be satisfied by extending what is already there.

  Ask `@explore` to:
  - Map the directory structure of the frontend and backend source
  - Find every file that implements a pattern similar to what this feature needs — existing forms,
    API routes, state slices, hooks, services, repositories, utility functions
  - Read 2–3 concrete examples of each relevant pattern in full — not summaries
  - Find any utility functions, helpers, or shared modules that could be reused or extended rather
    than duplicated
  - Identify repository-level conventions, architecture docs, linting rules, or configuration that
    show how standards are expressed in practice
  - Flag areas where the same pattern exists in multiple inconsistent forms — these are candidates
    for consolidation, not additional variation

  Return: a concise factual summary — which files implement which patterns, exact paths, and any
  inconsistencies observed.

  Before moving on, load any relevant skills available through supported tooling for the concerns
  touched by this feature if they are not already active.

  **After `@explore` returns**, identify which loaded standards guidance concerns apply to the
  parts of the system this feature touches, then apply that guidance for the remainder of this
  workflow.

  If the codebase and prior design docs already establish a concrete stack, use that stack's
  vocabulary in the rest of the workflow. Ask any remaining clarifying questions in terms of the
  actual framework, runtime, testing approach, and architectural patterns already in play.

- [ ] **Step 4: Challenge the scope — find what already exists.** Before designing anything,
      review the codebase research from Step 3 and answer:

  - Which parts of this feature's requirements can be satisfied by an existing module with zero
    modification? List them.
  - Which parts can be satisfied by a small extension to an existing module (adding one function,
    one prop, one route entry)? List them.
  - Which parts genuinely require a new file because no suitable existing module exists and no
    reasonable rearchitecture would produce one?

  Document this assessment explicitly. The goal is to minimize the file count in the Change
  Summary. If the assessment surfaces a small rearchitecture that produces a cleaner result
  than adding new code (e.g., extracting a shared utility used by both old and new behavior),
  prefer that rearchitecture.

  **The default answer to "should I create a new file?" is no — justify new files explicitly.**

- [ ] **Step 5: Evaluate implementation approaches.** Identify 2–3 distinct structural approaches
      for the decisions that remain after Step 4. For each option:
  - Describe the approach in 1–2 sentences
  - Note how many new files it requires vs. how many existing files it extends
  - Note its alignment with patterns found in Step 3
  - Note its impact on readability and long-term maintainability
  - Note any tradeoffs

  Select the approach that:
  - Requires the fewest new files while still being clean
  - Best matches the existing codebase's patterns and conventions
  - Is most readable to someone unfamiliar with the feature
  - Is simplest to change or extend later

  **Do not optimize for performance** unless the feature's acceptance criteria specify a
  performance threshold. Premature optimization produces harder-to-read code with no measured
  benefit. Optimizations are introduced after profiling identifies a real problem.

  Summarize the selected approach and explain in 2–3 sentences why alternatives were rejected,
  before generating any file lists.

- [ ] **Step 6: Produce the Frontend Change Summary table.** List every frontend production file
      this feature creates, modifies, or removes. Apply these rules:

  **Always exclude**: test, spec, fixture, mock, and snapshot files.

  **High Level**: Core production modules only — components, hooks, state, routes, API helpers.
  No CSS/style files.

  **Balanced**: All production files except CSS/style files and test files.

  **Detailed**: All production files including CSS/style files. Exclude test files only.

  Table columns:
  | Module/File Path | Item Name | Status | Description |
  - **Module/File Path**: exact path from project root; mark `(path TBC)` if unconfirmed
  - **Item Name**: primary export name
  - **Status**: `New`, `Updated`, or `Removed`
  - **Description**: what it is and why — 1 sentence, present tense

  Scrutinize every `New` entry: confirm it cannot be an `Updated` entry on an existing module.

- [ ] **Step 7: Produce the Backend Change Summary table.** Same rules as Step 6 for backend
      production files. Leave the backend section blank if there are no backend architecture changes.

- [ ] **Step 8: Produce Implementation Details.** Format varies by detail level:

  **High Level** — one sentence per module, no function signatures:
  ```
  ### 🟢 NEW: `path/to/module.ts`
  What this module is responsible for and why it exists.

  ### 🟡 UPDATED: `path/to/module.ts`
  What is changing in this module and why.
  ```

  **Balanced** — module description plus 1–2 additional sentences on what specifically changes,
  still no function signatures.

  **Detailed** — module description plus each exported function/component:
  ```
  ### 🟢 NEW: `path/to/module.ts`
  What this module does and why it exists.

  #### `functionName(params: ParamType): ReturnType`
  What this function does, why it's needed, key constraints — 1–2 sentences.
  ```
  - For Updated items: describe the change, not the existing behavior
  - Add implementation notes only for complex business rules an engineer cannot infer from the signature
  - Confirm every test scenario in specs.feature is addressable by at least one entry here

  Apply the same format for backend implementation details in a separate section.

- [ ] **Step 9: Assemble the document structure.** Use `./templates/implementation.md`
      as the structure and populate every section. The document is standalone and should be
      understandable without opening the template source.

  Required sections, in this order:
  - Title
  - Fallback Context *(only when `overview.md` is missing)*
  - Implementation Approach
  - Frontend Change Summary
  - Backend Change Summary
  - Frontend Implementation Details
  - Backend Implementation Details

  If `overview.md` exists: do not restate anything from `overview.md` in `implementation.md`.
  Treat `overview.md` as the canonical feature definition.

  If `overview.md` does not exist: add a short fallback summary so `implementation.md` remains
  understandable on its own.

  Record only:
  - a short summary only when `overview.md` is missing
  - implementation design decisions
  - the file-level change plan

- [ ] **Step 10: Validate the design.** Before writing the file, confirm all of these:

  **Extend-first discipline**
  - [ ] Every `New` file entry has a written justification for why no existing module could be extended
  - [ ] No functionality from an existing module is re-implemented in a new one
  - [ ] Utility functions and shared helpers are reused, not duplicated
  - [ ] The total file count is as small as possible for the feature's requirements

  **Architecture consistency**
  - [ ] All integration points use existing established patterns from the codebase
  - [ ] No new abstraction layer exists unless it eliminates meaningful duplication
  - [ ] No performance optimization is present without a measured need

  **Coverage**
  - [ ] Every test scenario in specs.feature is addressable by at least one implementation detail
  - [ ] Error handling is addressed at the origin point (API boundary, async call) — not scattered
  - [ ] No section duplicates `overview.md` when it exists
  - [ ] If `overview.md` is missing, the fallback summary is short and sufficient to orient the reader

  **Loaded standards compliance**
  - [ ] The design honors all loaded standards guidance relevant to this feature's concerns

  **Detail level correctness**
  - [ ] High Level: no CSS files, no function signatures
  - [ ] Balanced: no CSS files, no function signatures, 1–2 sentences per module
  - [ ] Detailed: CSS files included, function signatures present for every exported item

  **Prohibitions**
  - [ ] No Mermaid diagrams anywhere in the output
  - [ ] No test/spec/fixture/mock/snapshot files in any table

- [ ] **Step 11: Write the output file.**
  - Write `.specflow/features/<feature-name>/implementation.md` using
    `./templates/implementation.md` as the structure.
  - If an existing `implementation.md` draft exists, replace it fully with the updated standalone
    document rather than preserving obsolete sections from older layouts.
  - Keep the content aligned to the selected detail level.

- [ ] **Step 12: Summarize.** Report:
  - Output file path written
  - Detail level applied
  - File count: new files created vs. existing files extended
  - Implementation approach selected and alternatives rejected
  - Loaded standards guidance consulted
  - Any context documents missing that may affect accuracy
  - Any assumptions requiring validation before implementation begins
  - Suggest running `204-feature-validation` next

---

## Design Principles

**The best code is the code not written.** Every new file is a maintenance burden, a new surface
for bugs, and another thing a new team member must learn. Extend what exists before adding what
is new. A small rearchitecture that simplifies the overall codebase is better than layering new
code on top of what's already there.

**Small and additive.** The goal is the smallest change that cleanly satisfies the requirements.
If a feature can be delivered by modifying three existing files instead of creating five new ones,
the three-file approach wins — even if the five-file approach feels more structured or organized.

**Extend, don't proliferate.** A new file is justified only when it introduces a genuinely
distinct responsibility with no natural home in the existing codebase. "It would be cleaner"
is not sufficient justification — clean comes from the patterns already in the codebase, not
from adding new layers.

**No premature optimization.** Do not add caching, memoization, lazy loading, or other performance
patterns unless the feature's acceptance criteria specify a performance requirement. These add
complexity without a measured benefit. Optimization is introduced after profiling reveals a
real problem.

**Honor loaded standards guidance.** Every codebase has conventions encoded in managed
instructions, project instructions, and explicitly loaded skills. This design follows the guidance
already active in the session. When loaded standards guidance conflicts with anything generated
during this workflow, the loaded guidance wins unless the user explicitly overrides it.

**Language-agnostic.** This skill does not impose technology-specific rules. It reads the codebase
and applies the loaded standards guidance relevant to the concerns in play. Two projects using
different frameworks should produce structurally different designs that still follow the same
decision process.
