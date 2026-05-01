---
name: 101-project-overview
description: >
  Use `101` to define the project's core product framing: problem, users, differentiation, and
  success criteria. Trigger it for prompts like "101", "project overview", "create project
  overview", or when a new product idea needs a structured foundation before architecture or
  feature work.
---

# 101 - Project Overview

Produce the foundational product document for a project. This document captures business purpose,
target users, differentiation, key scenarios, and success criteria. It is the main product-level
reference for downstream SpecFlow workflows.

**Output path**: `.specflow/docs/D01-project-overview.md`

---

## Required Inputs

Before proceeding, confirm:

1. **Pain point**
2. **Differentiation**
3. **Target users**
4. **Key scenarios** — 3-5 important user journeys
5. **Success metrics**

Optional but useful: technology constraints, compliance requirements, and scale expectations.

If required inputs are missing, ask before proceeding.

---

## Steps

- [ ] **Step 1: Validate inputs.** Do not proceed on vague product framing.

- [ ] **Step 2: Load existing context.** If D01 already exists, treat it as a draft to update. Read
  `domain-knowledge.md` when present so the overview uses the right terminology and user framing.

- [ ] **Step 3: Explore existing repo context if needed.** Use `@explore` for a concise summary of
  existing docs or repo shape when that helps ground the product framing.

- [ ] **Step 4: Draft the document.** Use `./templates/T01 - Project Overview.md` and fill:
  - **Purpose & Value Proposition**
  - **Target Users & Goals**
  - **Key Business Scenarios**
  - **Technology Constraints** *(only if real and known)*
  - **High-Level Feature Categories**

- [ ] **Step 5: Quality check.** Confirm:
  - the value proposition is specific to this product
  - user goals are measurable or concrete
  - scenarios are clear enough to guide prioritization
  - language stays business-level
  - open questions are named explicitly

- [ ] **Step 6: Write the file and summarize.** Write
  `.specflow/docs/D01-project-overview.md`, report what was written, call out any unresolved
  questions, and suggest `102-system-architecture` next.

---

## Rules

1. Focus on product framing, not implementation.
2. Write for non-technical stakeholders as well as engineers.
3. Keep scenarios concrete and user-centered.
4. Name unknowns explicitly instead of filling gaps with guesses.
