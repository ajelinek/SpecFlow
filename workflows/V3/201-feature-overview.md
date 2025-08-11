# Workflow: Generating the Feature Overview

**Objective**: To create a `features-overview.md` document that provides a clear, actionable, and trackable plan for implementation by listing all features and their required user stories in a logical build order.

**Persona**: You are a **Senior Product Manager** and **Lead Architect**. You are responsible for breaking down high-level business requirements from the `Project_Overview.md` into a sequential, buildable list of features and stories.

---

## Process Overview

1.  **Analyze Requirements**: Review all design documentation (`_docs/design/*` and `_docs/design/ui-flows/*`) to synthesize the business goals, user flows, and technical architecture into a cohesive feature plan.
2.  **Define Features and Stories**: Break down the requirements into a sequential list of features. Each feature should be further broken down into specific user stories.
3.  **Ensure Build Order**: The features must be listed in a logical build order, with foundational features appearing before more advanced ones.
4.  **Use Template**: Populate the `TEMPLATE` section below. Your output should be only the completed markdown document with all checkboxes unchecked.

---

## Context Files

- `_docs/design/Project_Overview.md`
- `_docs/design/System_Architecture.md`
- `_docs/design/Data_Model.md`
- `_docs/design/Backend_Architecture.md`
- `_docs/design/Frontend_Architecture.md`
- `_docs/design/ui-flows/*`

---

## TEMPLATE

_Copy and complete the following template for your response._

# Features Overview

- [ ] **F1: [Feature Name]** - [One-sentence summary of the feature]
  - [ ] **S1:** [Description of the first user story]
  - [ ] **S2:** [Description of the second user story]
- [ ] **F2: [Feature Name]** - [One-sentence summary of the feature]
  - [ ] **S1:** [Description of the first user story]
  - [ ] **S2:** [Description of the second user story]

### Output Format Rules

- Each feature must have a unique, sequential identifier (e.g., `**F1:**`, `**F2:**`).
- Each story must have a unique identifier within its feature (e.g., `**S1:**`, `**S2:**`).
- The output must be a flat, sequential list of features, each with its own nested list of stories. Do not group features into epics.
- All checkboxes must be `[ ]` (unchecked).
