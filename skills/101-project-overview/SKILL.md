---
name: 101-project-overview
description: >
  Use this skill when starting a new software project and you need to establish the foundational
  product document: what problem it solves, who it's for, how it differentiates, and what success
  looks like. Triggers on phrases like "create project overview", "write the project overview doc",
  "let's start the project documentation", "101", "project overview", or when a user describes a
  new app idea and wants structured documentation. This is always the first SpecFlow workflow
  to run on a new project — before system architecture, data model, or any feature work.
---

# 101 — Project Overview

Produce the foundational product document for a new project. This document captures business
purpose, target users, differentiation, key scenarios, and success criteria. It is the single
source of truth for *why* the product exists and provides context for every downstream SpecFlow
workflow.

Output path: `.specflow/docs/project-overview.md`

---

## Your Role

Act as a senior product manager for this workflow. Your job is to extract and articulate clear
product thinking — not to describe technical architecture. Everything you write should be legible
to a non-technical stakeholder. Focus on the problem being solved, who is solving it for, and how
success will be measured. Do not introduce implementation details.

---

## Required Inputs

Before writing anything, confirm you have answers to all five questions below. If any are missing,
ask for them now — do not invent answers or leave sections blank.

1. **Pain point** — What specific problem does this application solve that existing solutions do not address well?
2. **Differentiation** — Who are the direct competitors (or solution categories) and how will this application stand apart?
3. **Target users** — Who are the primary user types and what are their main goals when using the product?
4. **Key scenarios** — What are the 3–5 most important user journeys that represent the core value of the product?
5. **Success metrics** — How will you know the product is succeeding? Quantifiable signals preferred.

Optional but valuable: technology constraints, compliance/regulatory requirements, scalability expectations.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all five required inputs are present. If any are missing, ask clarifying questions before proceeding. Do not proceed with incomplete information — a vague project overview creates unclear foundations for everything that follows.

- [ ] **Step 2: Load existing context.** Check whether `.specflow/docs/project-overview.md` already exists. If it does, treat it as a prior draft and update rather than replace. Check whether `.specflow/context/domain-knowledge.md` exists — if so, read it to ensure the document reflects established domain terminology and user patterns.

- [ ] **Step 3: Explore if needed.** If the project has an existing codebase or documentation (README, package.json, etc.) and you need to understand its current shape, delegate that discovery to the `@explore` agent and ask for a concise summary. Do not scan the codebase yourself — keep this context focused on product thinking.

- [ ] **Step 4: Draft the document.** Use the template at `./templates/T01 - Project Overview.md`. Populate every section with specific, concrete content.

  Write each section like this:
  - **Purpose & Value Proposition**: One to two sentences. Problem + unique solution + who benefits. No buzzwords.
  - **Target Users & Goals**: Name each user type with a specific, measurable goal — not a job title or role description.
  - **Key Business Scenarios**: 3–5 user journeys. Each names the user, what they are trying to accomplish, and what a successful outcome looks like. These are the scenarios that must work for the product to deliver value.
  - **Technology Constraints**: Only what is real and known. Leave blank if none apply.
  - **High-Level Feature Categories**: Name the major functional domains (e.g., "Scheduling", "Notifications", "Reporting"). Avoid listing individual features — detailed feature work belongs in the feature overview workflow.

- [ ] **Step 5: Quality check.** Before writing the file, verify:
  - Is the value proposition specific to this product, not generic to the category?
  - Are user goals measurable, not just role labels?
  - Are key scenarios concrete enough that an engineer could use them to prioritize features?
  - Is the language business-level throughout — no implementation details?
  - Are any unknowns named explicitly as open questions rather than glossed over?

- [ ] **Step 6: Write the output.** Write the completed document to `.specflow/docs/project-overview.md`. Create the `.specflow/docs/` directory if it does not exist.

- [ ] **Step 7: Summarize.** Report what was written, call out any sections left as open questions due to missing input, and suggest running `102-system-architecture` as the next step.
