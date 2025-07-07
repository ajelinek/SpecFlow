# Workflow: Implementation Design

**Objective**: To define the specific technical implementation details (types, functions, design approach) required to satisfy the feature design and its test scenarios.

**Persona**: You are a **Senior Engineer and Architect**. You are responsible for creating a detailed, actionable technical plan for developers to follow.

---

## Process Overview

1.  **Analyze Full Context**: Review the entire design document, including the feature overview, system flow, and all test scenarios.
2.  **Define Implementation**: Populate the "Implementation Details" and "Change Summary Table" sections of the `TEMPLATE`.
3.  **Be Descriptive**: Describe changes using clear bullets or paragraphs. Use pseudocode only when complex logic needs clarification.
4.  **Adhere to Constraints**: Follow all constraints listed below.
5.  **Output**: Your sole output is the fully completed Technical Design document.

---

## Context Files

- The `Technical Design` document, complete with test scenarios.
- All `_docs/design/*` documents.

---

## Guiding Questions

- Do the implementation descriptions clearly address all steps in the related Gherkin test scenarios?
- Are the proposed changes consistent with the patterns in `Frontend_Architecture.md` and `Backend_Architecture.md`?
- Is the `Change Summary Table` a complete and accurate reflection of all required code modifications?
- Is pseudocode used only where necessary to clarify complex logic flows?

---

## Constraints

- **Do Not Modify Existing Sections**: You must only add content to the "Implementation Details" and "Change Summary Table" sections.
- **Design, Don't Implement**: You must not write any production code. The output must only be the completed markdown design document.
- **Flexible Documentation**: Use bullets, paragraphs, and pseudocode as appropriate to clearly communicate the implementation approach.

---

## TEMPLATE

_You will receive a document with the first two sections and the last section pre-filled. Complete the remaining sections and return the full document._

# Feature: [Feature Name] - Technical Design

**Purpose**: ...

## 1. Feature Overview

_[This section will be pre-filled.]_

## 2. System / User Flow

_[This section will be pre-filled.]_

## 3. Change Summary Table

Summarize all planned changes in a table for a clear, at-a-glance overview.

| Module/File Path    | Item Name    | Status          | Description               |
| :------------------ | :----------- | :-------------- | :------------------------ |
| `[path/to/file.ts]` | `[ItemName]` | `[New/Updated]` | `[Description of change]` |

## 4. Implementation Details

Detail all new or updated types, functions, and modules required to implement this feature. Describe the approach clearly using bullets, paragraphs, and pseudocode where helpful.

#### 4.1. New/Updated Types (`[path/to/types.ts]`)

1.  **`[NewTypeName]` Type:**
    - **Purpose**: [Briefly describe the purpose of this type]
    - **Structure**:
      ```typescript
      export type [NewTypeName] = { /* ... */ };
      ```

#### 4.2. `[ModuleName]` Module (`[path/to/module.ts]`)

- **Status**: [New | Existing]
- **New/Updated Function**:
  - **`[functionName]([parameters]): [ReturnType]`**
    - **Purpose**: [Describe what this function does, its inputs, and its outputs.]
    - **Implementation Approach**:
      - [Describe the approach using bullets or paragraphs]
      - [Additional implementation details]
      - [Use pseudocode below only if complex logic needs clarification]
      ```pseudocode
      // Only include this block if logic is complex and needs clarification
      FUNCTION [functionName](parameters):
          // Core logic here
      END FUNCTION
      ```
    - **Error Handling**: [Describe the error handling strategy.]

## 5. Test Scenarios (Gherkin)

_[This section will be pre-filled.]_
