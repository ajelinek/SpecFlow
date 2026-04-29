---
name: 202-spec-design
description: >
  Use `202` to write Gherkin behavior scenarios for a feature. It produces a structured
  `specs.feature` file with coverage sized to the task. Trigger it for prompts like "202", "test
  spec", "gherkin", "BDD scenarios", or "write specs" when the next step is defining behavior to
  test.
---

# 202 — Test Scenario Design

Produce `.specflow/features/<feature-name>/specs.feature`: a Gherkin specification file
containing numbered test scenarios that validate the feature's business outcomes. Scenarios
are written from the user's perspective, grouped into named test modules, and tagged for
filtering and status tracking.

The output is a `.feature` file (not `.md`) so that IDEs with a Cucumber extension render
full Gherkin syntax highlighting, and so that test tooling can parse and execute the scenarios
directly without any reformatting. `overview.md` remains the canonical feature definition;
when it exists, this file should avoid duplicating it.

**Output path**: `.specflow/features/<feature-name>/specs.feature`

---

## Required Inputs

Before generating any scenarios, confirm:

1. **Feature name** — which feature are we writing tests for?
2. **Coverage level** — choose one:
   - **Happy Path Only** — critical user journeys and primary success flows only. Use this
     for a first pass; additional scenarios can be added later.
   - **Balanced** _(default)_ — happy paths plus critical edge cases and common error states.
   - **Comprehensive** — full coverage including low-probability edge cases, boundary
     conditions, and minor UI state variations.

If either is missing, ask before proceeding. Do not assume a coverage level.

If the user says "just happy paths for now" or "start with the core flow", treat that as
**Happy Path Only** and note that a second pass can add edge cases later.

---

## Steps

- [ ] **Step 1: Load feature context.** Read the following files if they exist:
  - `.specflow/features/<feature-name>/overview.md` — the feature scope and user journey
     produced by `201-high-level-design`. This is the primary input when available.
  - `.specflow/docs/D01-project-overview.md` — business goals and user types
  - `.specflow/docs/D07-ui-experience.md` — navigation patterns and affected pages
  - `.specflow/context/domain-knowledge.md` — domain rules that constrain valid behavior

  If `overview.md` does not exist, do not block the workflow. Ask the user for a short feature
  summary and the primary user outcome, then use that as fallback context for this run.

  Skip files that do not exist and note which are missing.

- [ ] **Step 2: Review existing specs before planning new ones.** Read
      `.specflow/features/<feature-name>/specs.feature` if it exists.

  If the file exists:
  - Note the highest TS# identifier already present (e.g., TS007). New scenarios must continue
    from the next available number.
  - Also check for existing TSM# module identifiers and continue the numbering sequence.
  - Review existing scenarios to find gaps that can be covered by updating them in place.
  - Prefer extending an existing scenario when the missing coverage is an additional observable
    outcome of the same user workflow, can be expressed as extra `Then`/`And` assertions, or can
    be handled by adding rows to an existing `Scenario Outline`.
  - Only create a new scenario when the behavior is materially distinct: different user intent,
    different preconditions, different path classification (`@happyPath`, `@errorPath`,
    `@edgePath`), or a separate workflow whose failures should be diagnosed independently.

  If the file does not exist, start at TS001 and plan all coverage as new scenarios.

- [ ] **Step 3: Identify scenario candidates and update targets.** Based on the feature context,
      any existing specs, and the requested coverage level, list what should be updated versus
      added before writing any Gherkin:
  - **Happy Path Only**: one scenario per primary user journey defined in overview.md.
     Cover each distinct success path the user can take. Do not include error states.
  - **Balanced**: happy paths from above, plus the top 3–5 error states that a user is
     most likely to encounter, and 1–2 boundary or state-transition edge cases.
  - **Comprehensive**: all of the above, plus low-probability edge cases, input boundary
     tests, concurrent-access scenarios if applicable, and minor UI state validations.

  For each coverage item, explicitly decide one of:
  - **Update existing scenario** — name the TS# and the additional assertions or example rows to add.
  - **Add new scenario** — explain why the behavior should stand alone instead of extending an
    existing scenario.

- [ ] **Step 4: Write the Gherkin scenarios.** Use `./templates/specs.feature` as the
      structure. Apply these rules throughout:

  **Feature header**
  - If `overview.md` exists: use only the `Feature:` title unless a one-line description is strictly
    needed for readability. Do not restate the feature summary, scope, acceptance criteria, or journey.
  - If `overview.md` does not exist: include a short 1–2 line feature summary based on the user's
    provided fallback context so the file remains understandable on its own.
  - Do not restate full scope, acceptance criteria, or the full user journey here.
  - Pull only the minimum context needed for a test reader to understand the behavior under test.

  **Scenario design**
  - Write scenarios that test complete user workflows, not isolated steps. A scenario should
     prove a business outcome, not verify a click happened.
  - Each scenario must be independently runnable — no implicit state shared between scenarios.
  - Prefer longer, multi-assertion scenarios for E2E coverage over many narrow unit-style tests.
  - When an existing scenario already covers the workflow, prefer adding assertions to that
    scenario over creating a near-duplicate new one.
  - Use `Scenario Outline` + `Examples` tables when the same flow runs with multiple data sets.

  **Numbering and organization**
  - Group scenarios into test modules using `TSM#` comment headers (e.g., `TSM001: User
Registration — Happy Paths`). TSM numbers reflect logical groupings, not file position.
  - Assign each scenario a unique `TS#` tag (e.g., `@TS001`). Numbers are sequential across
    the entire file and never reused, even if a scenario is later deleted.
  - New scenarios in a second pass continue the existing TS# and TSM# sequences.

  **Tagging**
  - Every new scenario must include `@status_pending` at the time it is written.
  - Status tags follow a three-state lifecycle and are updated in place as the feature progresses:
    - `@status_pending` — scenario written; implementation has not started
    - `@status_implementing` — the scenario's functionality is actively being built
    - `@status_done` — the scenario has a passing automated test run
  - Never remove a status tag; always replace it with the next state.
  - Add at least one path tag per scenario: `@happyPath`, `@errorPath`, or `@edgePath`.
  - Add domain or feature tags as needed for filtering (e.g., `@authentication`, `@payments`).

  **Gherkin syntax**
  - Use `Given` for preconditions (state the system and user must be in before the action).
  - Use `When` for the single user action being tested in this scenario.
  - Use `Then` for all observable outcomes — use multiple `And` steps to cover related
    assertions in the same scenario.
  - Avoid implementation detail in step text: "the user submits the expense form" not
    "the user clicks the POST /expenses button".
  - Background blocks are permitted when all scenarios in a module share a precondition.

- [ ] **Step 5: Quality check before writing the file.**
  - Every scenario tests a user-observable business outcome, not an implementation detail.
  - Existing scenarios were updated where that was the simpler and clearer way to add coverage.
  - The TS# sequence has no gaps or duplicates (accounting for any existing scenarios).
  - Each scenario is independently runnable — no shared mutable state between scenarios.
  - Coverage level is reflected in the scenario count and types:
    - Happy Path Only: no `@errorPath` or `@edgePath` scenarios.
    - Balanced: at least 2 `@errorPath` scenarios present.
    - Comprehensive: `@edgePath` scenarios are present and cover boundary conditions.
  - All new scenarios are tagged `@status_pending`.
  - Gherkin syntax is valid: no missing `Feature:`, no orphaned steps.

- [ ] **Step 6: Write the output file.**
  - If `specs.feature` does not exist: write the full file using `./templates/specs.feature`
    as the structure.
  - If `specs.feature` already exists:
    - First update existing scenarios in place where Step 3 identified additional assertions or
      examples to add.
    - Then append new test modules and scenarios only for coverage that truly requires a new
      scenario. Do not renumber existing TS# identifiers.
    - Add a comment line before newly appended modules: `# --- Added: <Coverage Level> Pass ---`.

- [ ] **Step 7: Summarize.** Report:
  - The output file path written
  - Which existing TS# scenarios were updated and what assertions or example rows were added
  - Total new scenarios written and their TS# range
  - Coverage level applied
  - Any context documents that were missing and may have affected coverage
  - If **Happy Path Only** was used: explicitly suggest returning to `202-spec-design` with
    Balanced or Comprehensive coverage to add additional scenarios
  - Suggest running `203-implementation-design` next

---

## Additional Guidance

**On scenario status tags**: Status tags are the single source of truth for scenario readiness. The
three states — `@status_pending`, `@status_implementing`, `@status_done` — track progress in place
without moving files. This matches the approach used by Serenity BDD, Cucumber, and SpecFlow
reporting tools, all of which filter and aggregate by tag. To find all pending scenarios across
features: `grep -r "@status_pending" .specflow/features/`. When a feature's `overview.md` advances
to `status: done`, all its scenarios should be `@status_done`.

**On the two-pass approach**: Starting with Happy Path Only and returning for a second pass
is a valid and encouraged workflow. The first pass establishes confidence in the core user
journey. The second pass adds resilience. Communicating the coverage level in scenario tags
and the file header makes the current coverage state explicit to anyone reading the file.

**On scenario length**: Longer scenarios that prove end-to-end business value are preferred
over many short scenarios that test individual steps. A scenario that takes a user from
submitting a form through to receiving a confirmation email is more valuable than three
separate scenarios that check the form validates, the submission is stored, and the email
is sent. Balance confidence with maintenance burden — if a scenario becomes so long that
it is impossible to diagnose failures, split it.

**On updating existing specs**: Do not default to creating new scenarios for every new coverage
request. If a current scenario already exercises the same workflow, it is often better to add one
or more assertions there so the spec stays compact and easier to maintain. Extend existing
scenarios when the added checks are part of the same business outcome. Create a new scenario only
when the behavior deserves its own setup, action, path tag, or failure signal.

**On step language**: Steps describe behavior, not implementation. "The user sees a
confirmation message" is a valid assertion. "The component re-renders with success state"
is not — it is an implementation detail that would require rewriting if the UI framework
changes.

**On test modules (TSM#)**: Modules group scenarios by business context, not by technical
layer. A module named "TSM002: Expense Submission — Error Handling" is correct. A module
named "TSM002: API Error Responses" is not — it groups by implementation layer rather than
user experience.
