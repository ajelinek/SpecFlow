---
name: 202-spec-design
description: >
  Use `202` to write Gherkin behavior scenarios for a feature. It produces a structured
  `specs.feature` file with coverage sized to the task. Trigger it for prompts like "202", "test
  spec", "gherkin", "BDD scenarios", or "write specs" when the next step is defining behavior to
  test.
---

# 202 - Test Scenario Design

Produce `.specflow/features/<fid>-<feature-slug>/specs.feature`: a Gherkin file containing
numbered scenarios grouped into `TSM#` modules and tagged for path and status tracking.

`overview.md` remains the canonical feature definition. If it exists, do not duplicate it here.

**Output path**: `.specflow/features/<fid>-<feature-slug>/specs.feature`

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
  - `.specflow/features/<fid>-<feature-slug>/overview.md`
  - `.specflow/docs/D01-project-overview.md`
  - `.specflow/docs/D07-ui-experience.md`
  - `.specflow/context/domain-knowledge.md`

  If `overview.md` is missing, ask for a short feature summary and primary user outcome, then use
  that as fallback context.
  Derive the feature folder as `<fid>-<feature-slug>` and keep all feature artifacts in that same
  folder.

- [ ] **Step 2: Review existing specs first.** Read `.specflow/features/<fid>-<feature-slug>/specs.feature`
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
  - every new scenario must include at least one path tag: `@happyPath`, `@errorPath`, or `@edgePath`
  - use `Given` for preconditions, `When` for the primary user action, and `Then`/`And` for
    observable outcomes
  - step text must describe behavior, not implementation details
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
2. The feature folder name must stay stable across the feature lifecycle: `<fid>-<feature-slug>`.
3. Longer business-outcome scenarios are preferred over many narrow, unit-style scenarios.
4. `TSM#` modules group by business context, not technical layer.
5. Steps describe behavior, not implementation details.
6. Status tags track lifecycle in place: `@status_pending`, `@status_implementing`, `@status_done`.

## Additional Guidance

**On scenario length**: Longer scenarios that prove end-to-end business value are preferred over
many short scenarios that test individual steps. A scenario that takes a user from submitting a
form through to receiving a confirmation email is more valuable than three separate scenarios that
check form validation, submission storage, and email dispatch separately. Balance confidence with
maintenance burden — if a scenario becomes so long that failures are impossible to diagnose, split
it.

**On updating existing specs**: Do not default to creating new scenarios for every new coverage
request. If an existing scenario already exercises the same workflow, it is often better to add
assertions there so the spec stays compact and easier to maintain. Create a new scenario only when
the behavior deserves its own setup, action, path tag, or failure signal.

**On step language**: Steps describe behavior, not implementation. "The user sees a confirmation
message" is a valid assertion. "The component re-renders with success state" is not — it is an
implementation detail that would need rewriting if the UI framework changes.

**On test modules (TSM#)**: Modules group scenarios by business context, not by technical layer.
"TSM002: Expense Submission — Error Handling" is correct. "TSM002: API Error Responses" is not —
it groups by implementation layer rather than user experience.
