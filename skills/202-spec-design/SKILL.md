---
name: 202-spec-design
description: >
  Use `202` to write Gherkin behavior scenarios for a feature. It produces a structured
  `specs.feature` file with coverage sized to the task. Trigger it for prompts like "202", "test
  spec", "gherkin", "BDD scenarios", or "write specs" when the next step is defining behavior to
  test.
argument-hint: "[feature-name] [coverage-level]"
---

# 202 - Test Scenario Design

Produce a Gherkin file of numbered scenarios grouped into `TSM#` modules and tagged for path and
status tracking. `overview.md` defines feature scope; `specs.feature` defines behavior coverage —
don't duplicate the overview here. The file lives in the feature folder defined by
`201-high-level-design` (`<fid>-<feature-slug>`).

**Output path**: `.specflow/features/<fid>-<feature-slug>/specs.feature`

---

## Required Inputs

1. **Feature name**
2. **Coverage level** — **Happy Path Only**, **Balanced**, or **Comprehensive**. Never assume one;
   "core flow only" or similar means Happy Path Only.

If either is missing, ask. This skill runs in its caller's context so the question reaches the user.
When invoked with no user in the loop (`301-spec-implementation` routing a spec revision here, or
`901-feature-loop` dispatching it into a subagent), the invocation should carry both inputs; if one is
still missing, return the question to the caller unanswered.

---

## Steps

- [ ] **Step 1: Load feature context.** Read the feature's `overview.md`, D01, D07, and
  `domain-knowledge.md` when present. If `overview.md` is missing, ask for a short feature summary and
  primary user outcome as fallback context.

- [ ] **Step 2: Review existing specs.** If `specs.feature` exists, continue its `TS#`/`TSM#`
  numbering (never renumber). Otherwise start at `TS001` and `TSM001`.

- [ ] **Step 3: Plan coverage before writing.** Don't default to a new scenario per coverage item.
  For each item decide:
  - **Update existing scenario** — when it already exercises the same workflow, outcome, or
    `Scenario Outline`; name the `TS#` and the assertions/example rows to add. This keeps the spec
    compact.
  - **Add new scenario** — only when the behavior deserves its own setup, action, path tag, or
    failure signal; say why. Assign its `TSM#` module now — an existing one sharing its business
    context, or a new one. No scenario is ever ungrouped.

  Coverage expectations:
  - **Happy Path Only** — primary success workflows; no error or edge scenarios
  - **Balanced** — happy paths plus the most important error states and 1-2 meaningful edge cases
  - **Comprehensive** — balanced plus lower-probability edge cases, boundary conditions, and other
    important path variations

- [ ] **Step 4: Write the Gherkin file** from `./templates/specs.feature`, preserving its `TSM#`
  grouping, `TS#` numbering, path tags, and status tags exactly:
  - minimal `Feature:` header; restate nothing from `overview.md` (only a short fallback summary when
    it's missing)
  - **Prefer longer business-outcome scenarios over many narrow ones.** Submitting a form through to
    receiving the confirmation email beats three scenarios for validation, storage, and dispatch.
    Split only when a scenario gets so long failures become hard to diagnose.
  - each scenario independently runnable; `Scenario Outline` when a flow varies only by data
  - every new scenario has a path tag (`@happyPath`, `@errorPath`, `@edgePath`) and `@status_pending`;
    status tags track lifecycle in place: `@status_pending` → `@status_implementing` → `@status_done`
  - `Given` preconditions, `When` the primary user action, `Then`/`And` observable outcomes
  - **steps describe behavior, not implementation**: "The user sees a confirmation message" is valid;
    "The component re-renders with success state" is not
  - **`TSM#` modules group by business context, not technical layer**: "TSM002: Expense Submission —
    Error Handling", not "TSM002: API Error Responses"

- [ ] **Step 5: Quality check.** Every scenario validates a user-observable outcome; existing
  scenarios were extended where cleaner; no new `TS#` gaps or duplicates; all new scenarios are
  `@status_pending`; scenario kinds match the coverage level; valid Gherkin; every scenario sits in a
  `TSM#` module.

- [ ] **Step 6: Write and summarize.** Update existing scenarios in place, then append truly new
  modules/scenarios. Report the path, `TS#` scenarios updated, new scenarios and their `TS#` range,
  coverage level, missing context that may affect coverage, a suggested later pass if coverage was
  Happy Path Only, and suggest `203-implementation-design` next.
