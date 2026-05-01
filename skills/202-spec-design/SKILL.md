---
name: 202-spec-design
description: >
  Use `202` to write Gherkin behavior scenarios for a feature. It produces a structured
  `specs.feature` file with coverage sized to the task. Trigger it for prompts like "202", "test
  spec", "gherkin", "BDD scenarios", or "write specs" when the next step is defining behavior to
  test.
---

# 202 - Test Scenario Design

Produce `.specflow/features/<feature-name>/specs.feature`: a Gherkin file containing numbered
scenarios grouped into `TSM#` modules and tagged for path and status tracking.

`overview.md` remains the canonical feature definition. If it exists, do not duplicate it here.

**Output path**: `.specflow/features/<feature-name>/specs.feature`

---

## Required Inputs

Before writing scenarios, confirm:

1. **Feature name**
2. **Coverage level** — one of:
   - **Happy Path Only**
   - **Balanced**
   - **Comprehensive**

If either is missing, ask. Do not assume a coverage level. If the user says “core flow only” or
similar, treat it as **Happy Path Only**.

---

## Steps

- [ ] **Step 1: Load feature context.** Read these files if they exist:
  - `.specflow/features/<feature-name>/overview.md`
  - `.specflow/docs/D01-project-overview.md`
  - `.specflow/docs/D07-ui-experience.md`
  - `.specflow/context/domain-knowledge.md`

  If `overview.md` is missing, ask for a short feature summary and primary user outcome, then use
  that as fallback context.

- [ ] **Step 2: Review existing specs first.** Read `.specflow/features/<feature-name>/specs.feature`
  if it exists.

  If it exists:
  - continue the existing `TS#` and `TSM#` numbering
  - prefer updating an existing scenario when the new coverage belongs to the same workflow,
    outcome, or `Scenario Outline`
  - create a new scenario only when the behavior is materially distinct and should fail
    independently

  If it does not exist, start at `TS001` and `TSM001`.

- [ ] **Step 3: Plan coverage before writing.** For each coverage item, decide whether to:
  - **Update existing scenario** — name the `TS#` and what assertion/example rows to add
  - **Add new scenario** — explain briefly why it needs a separate workflow or path

  Coverage expectations:
  - **Happy Path Only**: primary success workflows only; no error or edge scenarios
  - **Balanced**: happy paths plus the most important error states and 1-2 meaningful edge cases
  - **Comprehensive**: balanced coverage plus lower-probability edge cases, boundary conditions,
    and other important path variations

- [ ] **Step 4: Write the Gherkin file.** Use `./templates/specs.feature` and follow these rules:
  - keep the `Feature:` header minimal
  - if `overview.md` exists, do not restate its summary, scope, or journey
  - if `overview.md` is missing, include only a short fallback summary
  - scenarios should validate complete user workflows and business outcomes, not implementation
    details
  - each scenario must be independently runnable
  - prefer adding assertions to an existing scenario over creating near-duplicates
  - use `Scenario Outline` when the same flow varies only by data
  - preserve `TSM#` grouping, `TS#` numbering, path tags, and status tags exactly as the template
    requires

- [ ] **Step 5: Quality check.** Confirm:
  - every scenario validates a user-observable outcome
  - existing scenarios were extended where that was the cleaner choice
  - `TS#` numbering has no gaps or duplicates beyond what already existed
  - all new scenarios use `@status_pending`
  - coverage level is reflected in the kinds of scenarios present
  - Gherkin syntax is valid

- [ ] **Step 6: Write the file and summarize.** If the file exists, update scenarios in place first
  and append only truly new modules/scenarios after that. Do not renumber existing `TS#` tags.

  Report:
  - output file path
  - existing `TS#` scenarios updated
  - total new scenarios and their `TS#` range
  - coverage level used
  - missing context that may affect coverage
  - if coverage was **Happy Path Only**, suggest a second pass later
  - suggest running `203-implementation-design` next

---

## Rules

1. `overview.md` defines feature scope; `specs.feature` defines behavior coverage.
2. Longer business-outcome scenarios are preferred over many narrow, unit-style scenarios.
3. `TSM#` modules group by business context, not technical layer.
4. Steps describe behavior, not implementation details.
5. Status tags track lifecycle in place: `@status_pending`, `@status_implementing`, `@status_done`.
