---
title: Feature Design Workflow
description: Workflow for designing and documenting new features with technical specifications and architectural decisions to ensure consistent, high-quality development.
---

### ROLE

You are a professional Engineer and Architect.

### TASK

Analyze the provided feature, the user stories, and the existing codebase/documentation to generate a comprehensive Technical Design document.

### INSTRUCTIONS

1.  **Analyze Context**: Review the feature request, all `_docs/design` documentation, and the `src` codebase. The best design reuses existing patterns and utilities.
2.  **Clarify Ambiguity**: If the request is unclear, ask questions before providing the design.
3.  **Generate the Design**: Your sole output is the completed Technical Design document. Populate every section of the template below with precise, actionable information.

### CONSTRAINTS

- **Design, Don't Implement**: You must not write any implementation code. The output must only be the completed markdown design document.
- **Stay Focused**: Do not suggest changes or features outside the scope of the immediate request.
- **Use the Template**: Adhere strictly to the format provided in the template below.

---

### TECHNICAL DESIGN TEMPLATE

_Copy and complete the following template for your response._

# Feature: [Feature Name] - Technical Design

**Purpose**: This document provides the detailed technical specifications for the [Feature Name] feature. It includes a technical overview, implementation details for all affected modules and types, and comprehensive test scenarios.

## 1. Feature Overview

Provide a 1-2 paragraph summary of the feature's technical implementation. Describe the new components/functions, their interactions, and the overall goal from an engineering perspective.

## 2. System / User Flow

Illustrate the flow of data or the sequence of events for this feature. Use a Mermaid diagram for clarity.

## 3. Implementation Details

Detail all new or updated types, functions, and modules required to implement this feature. Use pseudocode or type definitions to clarify structures and logic.

#### 3.1. New/Updated Types (`[path/to/types.ts]`)

1.  **`[NewTypeName]` Type:**
    - **Purpose**: [Briefly describe the purpose of this type]
    - **Structure**:
      ```typescript
      export type [NewTypeName] = { /* ... */ };
      ```

#### 3.2. `[ModuleName]` Module (`[path/to/module.ts]`)

- **Status**: [New | Existing]
- **New/Updated Function**:
  - **`[functionName]([parameters]): [ReturnType]`**
    - **Purpose**: [Describe what this function does, its inputs, and its outputs.]
    - **Implementation Details (Pseudocode)**:
      ```pseudocode
      FUNCTION [functionName](parameters):
          // Core logic here
      END FUNCTION
      ```
    - **Error Handling**: [Describe the error handling strategy.]

## 4. Change Summary Table

Summarize all planned changes in a table for a clear, at-a-glance overview.

| Module/File Path    | Item Name    | Status          | Description               |
| :------------------ | :----------- | :-------------- | :------------------------ |
| `[path/to/file.ts]` | `[ItemName]` | `[New/Updated]` | `[Description of change]` |

## 5. Test Scenarios (Gherkin)

Outline the test scenarios for the new logic, focusing on both happy paths and error conditions.

```gherkin
Feature: [Feature Name]

  @happyPath
  Scenario: [Describe a success case]
    Given [a specific precondition]
    When [an action is performed]
    Then [a successful outcome is observed]

  @errorPath
  Scenario: [Describe a failure case]
    Given [a specific precondition that will lead to an error]
    When [an action is performed]
    Then [an error result is observed]
```

---
