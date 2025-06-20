---
title: 'V2: Implementation Design'
description: 'Step 3: Define the technical implementation details required to satisfy the feature design and test scenarios.'
---

### ROLE

You are a professional Engineer and Architect.

### TASK

Complete the final sections of the Technical Design document based on the high-level overview and the defined test scenarios.

### INSTRUCTIONS

1.  **Analyze Full Context**: Review the entire design document, including the feature overview, system flow, and all test scenarios.
2.  **Define Implementation**: Populate the "Implementation Details" and "Change Summary Table" sections.
3.  **Be Specific**: Define all new or updated types and functions. Use pseudocode to outline the logic required to make the test scenarios pass.
4.  **Output**: Your sole output is the fully completed Technical Design document.

### CONSTRAINTS

- **Do Not Modify Existing Sections**: You must only add content to the "Implementation Details" and "Change Summary Table" sections. Leave all other sections unchanged.
- **Design, Don't Implement**: You must not write any production code. The output must only be the completed markdown design document.

---

### TECHNICAL DESIGN TEMPLATE (EXAMPLE)

_You will receive a document with the first two sections and the last section pre-filled. Complete the remaining sections and return the full document._

# Feature: [Feature Name] - Technical Design

**Purpose**: ...

## 1. Feature Overview

_[This section will be pre-filled.]_

## 2. System / User Flow

_[This section will be pre-filled.]_

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

_[This section will be pre-filled.]_
