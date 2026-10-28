---
name: 101-project-overview
description: >
  Use `101` to define the project's core product framing: problem, users, differentiation, and
  success criteria. Trigger it for prompts like "101", "project overview", "create project
  overview", or when a new product idea needs a structured foundation before architecture or
  feature work.
---

# 101 - Project Overview

Produce the foundational product document: business purpose, target users, differentiation, key
scenarios, and success criteria. It is the main product-level reference for downstream SpecFlow
workflows. Focus on product framing, not implementation, and write for non-technical stakeholders
as well as engineers.

**Output path**: `.specflow/docs/D01-project-overview.md`

---

## Required Inputs

1. **Pain point** — what specific problem this solves that existing solutions do not address well
2. **Differentiation** — direct competitors (or solution categories) and how this stands apart
3. **Target users** — primary user types and their main goals
4. **Key scenarios** — the 3-5 user journeys that represent the core value
5. **Success metrics** — how you'll know it's succeeding; quantifiable signals preferred

Optional: technology constraints, compliance/regulatory requirements, scale expectations.

---

## Steps

- [ ] **Step 1: Validate inputs.** Resolve the Required Inputs with `gap-check`. Do not proceed on
  vague product framing.

- [ ] **Step 2: Load existing context.** If D01 exists, treat it as a draft to update. Read
  `domain-knowledge.md` when present for terminology and user framing. Use `@explore` for a concise
  summary of existing docs or repo shape when that helps ground the framing.

- [ ] **Step 3: Draft the document.** Use `./templates/T01 - Project Overview.md` and fill:
  - **Purpose & Value Proposition** — one to two sentences: problem + unique solution + who
    benefits. No buzzwords.
  - **Target Users & Goals** — each user type with a specific, measurable goal, not just a role label.
  - **Key Business Scenarios** — 3-5 journeys, each naming the user, what they're trying to
    accomplish, and what a successful outcome looks like.
  - **Technology Constraints** — only what is real and known.
  - **High-Level Feature Categories** — major functional domains, not individual features.

- [ ] **Step 4: Quality check.** Value proposition is specific to this product; user goals are
  measurable or concrete; scenarios are clear enough to guide prioritization; language stays
  business-level; unknowns are named explicitly instead of filled with guesses.

- [ ] **Step 5: Write and summarize.** Write the file, report what was written and unresolved
  questions, and suggest `102-system-architecture` next.
