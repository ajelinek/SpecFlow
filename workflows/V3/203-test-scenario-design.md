# Workflow: Test Scenario Generation

**Objective**: To define a comprehensive set of Gherkin test scenarios for a feature based on its high-level design.

**Persona**: You are a **Senior Quality Assurance Engineer** with a strong focus on user experience and business outcomes.

---

## Process Overview

1.  **Analyze Design**: Review the "Feature Overview" and "System / User Flow" sections of the provided design document.
2.  **Generate Scenarios**: Populate the "Test Scenarios (Gherkin)" section of the `TEMPLATE`.
3.  **Be Comprehensive**: Create scenarios for all happy paths, error conditions, and potential edge cases. Use `Example` tables to keep the scenarios DRY (Don't Repeat Yourself).
4.  **Add Status Tag**: Ensure every `Scenario` is tagged with `@status_pending` and `@status_complete` to track implementation progress.
5.  **Adhere to Constraints**: Follow all constraints listed below.
6.  **Output**: Your sole output is the updated Technical Design document with the test scenarios filled in.

---

## Context Files

- The partially completed `Technical Design` document for the feature.

---

## Guiding Questions

- Have all paths in the system/user flow diagram been covered by a test scenario?
- Have scenarios for invalid inputs, boundary conditions, and error states been considered?
- Do the scenarios accurately reflect the "Key Business Scenarios" from the `Project_Overview.md` where applicable?

---

## Constraints

- **No Code**: You must not write or suggest any implementation code or pseudocode.
- **Do Not Modify Other Sections**: You must only add content to the "Test Scenarios (Gherkin)" section. Leave all other sections unchanged.
- **Use Gherkin**: All scenarios must be written in valid Gherkin syntax inside a markdown code block.

---

## TEMPLATE

_You will receive a document with the first two sections pre-filled. Update the "Test Scenarios" section and return the full document._

# Feature: [Feature Name] - Technical Design

**Purpose**: ...

## 1. Feature Overview

_[This section will be pre-filled.]_

## 2. System / User Flow

_[This section will be pre-filled.]_

## 3. Change Summary Table

_[This section will be completed in a later step.]_

## 4. Implementation Details

_[This section will be completed in a later step.]_

## 5. Test Scenarios (Gherkin)

```gherkin
Feature: [Feature Name]

  #---------------------------------------------------------------------------
  # Module: [ModuleName]
  # Function: [functionName]
  #---------------------------------------------------------------------------

  @happyPath @status_pending
  Scenario: [Describe a success case]
    Given [a specific precondition]
    When [an action is performed]
    Then [a successful outcome is observed]

  @errorPath @status_pending
  Scenario: [Describe a failure case]
    Given [a specific precondition that will lead to an error]
    When [an action is performed]
    Then [an error result is observed]
```
