---
name: 202-spec-design
description: >
  Use this skill when you need to write Gherkin test scenarios for a specific feature.
  Triggers on phrases like "test scenarios", "test spec", "202", "write tests", "gherkin",
  "BDD scenarios", "add test coverage", "write specs", or when a feature's overview.md
  exists and the next step is defining what to test. Produces a .feature file containing
  organized, numbered Gherkin scenarios grouped into test modules. Supports three coverage
  levels — Happy Path, Balanced, and Comprehensive — and a two-pass flow where happy path
  scenarios are written first, then additional coverage is added in a second pass.
---

# 202 — Test Scenario Design

Produce `.specflow/features/<feature-name>/specs.feature`: a Gherkin specification file
containing numbered test scenarios that validate the feature's business outcomes. Scenarios
are written from the user's perspective, grouped into named test modules, and tagged for
filtering and status tracking.

The output is a `.feature` file (not `.md`) so that IDEs with a Cucumber extension render
full Gherkin syntax highlighting, and so that test tooling can parse and execute the scenarios
directly without any reformatting.

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
    produced by `201-high-level-design`. This is the primary input. If it does not exist,
    ask the user whether to run `201-high-level-design` first or provide a description now.
  - `.specflow/docs/D01-project-overview.md` — business goals and user types
  - `.specflow/docs/D07-ui-experience.md` — navigation patterns and affected pages
  - `.specflow/context/domain-knowledge.md` — domain rules that constrain valid behavior

  Skip files that do not exist and note which are missing.

- [ ] **Step 2: Determine the existing scenario count.** Read
      `.specflow/features/<feature-name>/specs.feature` if it exists. Note the highest TS#
      identifier already present (e.g., TS007). New scenarios must continue from the next
      available number. If the file does not exist, start at TS001.

  Also check for existing TSM# module identifiers and continue the numbering sequence.

- [ ] **Step 3: Identify scenario candidates.** Based on the feature context and the
      requested coverage level, list the scenario candidates before writing any Gherkin:
  - **Happy Path Only**: one scenario per primary user journey defined in overview.md.
    Cover each distinct success path the user can take. Do not include error states.
  - **Balanced**: happy paths from above, plus the top 3–5 error states that a user is
    most likely to encounter, and 1–2 boundary or state-transition edge cases.
  - **Comprehensive**: all of the above, plus low-probability edge cases, input boundary
    tests, concurrent-access scenarios if applicable, and minor UI state validations.

- [ ] **Step 4: Write the Gherkin scenarios.** Use `./templates/specs.feature` as the
      structure. Apply these rules throughout:

  **Scenario design**
  - Write scenarios that test complete user workflows, not isolated steps. A scenario should
    prove a business outcome, not verify a click happened.
  - Each scenario must be independently runnable — no implicit state shared between scenarios.
  - Prefer longer, multi-assertion scenarios for E2E coverage over many narrow unit-style tests.
  - Use `Scenario Outline` + `Examples` tables when the same flow runs with multiple data sets.

  **Numbering and organization**
  - Group scenarios into test modules using `TSM#` comment headers (e.g., `TSM001: User
Registration — Happy Paths`). TSM numbers reflect logical groupings, not file position.
  - Assign each scenario a unique `TS#` tag (e.g., `@TS001`). Numbers are sequential across
    the entire file and never reused, even if a scenario is later deleted.
  - New scenarios in a second pass continue the existing TS# and TSM# sequences.

  **Tagging**
  - Every scenario must include `@status_pending` until the scenario has a passing test run.
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
  - If `specs.feature` already exists (second-pass scenario): append the new test modules
    and scenarios to the existing file. Do not renumber existing TS# identifiers. Add a
    comment line before new modules: `# --- Added: <Coverage Level> Pass ---`.

- [ ] **Step 7: Summarize.** Report:
  - The output file path written
  - Total scenarios written and their TS# range
  - Coverage level applied
  - Any context documents that were missing and may have affected coverage
  - If **Happy Path Only** was used: explicitly suggest returning with
    `202-test-scenario-design --balanced` or `--comprehensive` to add additional coverage
  - Suggest running `203-implementation-design` next

---

## Additional Guidance

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

**On step language**: Steps describe behavior, not implementation. "The user sees a
confirmation message" is a valid assertion. "The component re-renders with success state"
is not — it is an implementation detail that would require rewriting if the UI framework
changes.

**On test modules (TSM#)**: Modules group scenarios by business context, not by technical
layer. A module named "TSM002: Expense Submission — Error Handling" is correct. A module
named "TSM002: API Error Responses" is not — it groups by implementation layer rather than
user experience.
