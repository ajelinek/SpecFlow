---
name: 102-system-architecture
description: >
  Use `102` to define the system architecture, stack, major components, and testing approach.
  Trigger it for prompts like "102", "system architecture", "architecture doc", or "define the
  tech stack" when the project is ready for foundational technical decisions.
---

# 102 - System Architecture

Produce the system architecture document for a project. This document defines the high-level
structure of the system: architectural style, major components, technology stack, and testing
strategy.

**Output path**: `.specflow/docs/D02-system-architecture.md`

---

## Required Inputs

Before proceeding, confirm:

1. **Application components** — major system parts
2. **Traffic and scale** — expected traffic and peak load
3. **Deployment environment** — cloud, on-prem, hybrid, etc.
4. **Architecture drivers** — constraints or goals such as team size, cost, compliance, or time

Do not ask about specific stack choices upfront if they can be resolved from loaded guidance, prior
docs, or existing code.

---

## Decision Precedence

Resolve architecture decisions in this order:

1. Loaded standards guidance relevant to the concern
2. Existing SpecFlow or project documentation
3. Existing codebase patterns confirmed via `@explore`
4. Explicit user decisions in this session

If a concern remains unresolved after that, ask rather than guessing.

---

## Steps

- [ ] **Step 1: Validate required inputs.** Do not proceed without enough information about
  components, scale, deployment, and architecture drivers.

- [ ] **Step 2: Resolve technology choices.** For each relevant concern, use the decision order
  above before asking the user. Common concerns include:
  - language/runtime
  - UI/client
  - service/API
  - data/storage
  - testing/quality
  - deployment/operations
  - security/privacy

  Omit concerns that do not apply to the project.

- [ ] **Step 3: Load project context.** Read D01 if it exists and align the architecture with the
  project's business goals, constraints, and success metrics.

- [ ] **Step 4: Explore existing code if needed.** Use `@explore` to identify existing packages,
  frameworks, and deployment/config patterns when the repo already exists.

- [ ] **Step 5: Draft the document.** Use `./templates/T02 - System Architecture.md` and make every
  technology choice concrete. For each choice, include a one-line rationale tied to loaded
  standards, project constraints, codebase evidence, or an explicit user decision.

  The document should cover:
  - **Architectural Style & Patterns**
  - **Major System Components**
  - **Technology Stack**
  - **Testing Strategy**

- [ ] **Step 6: Quality check.** Confirm:
  - every important choice has a traceable justification
  - major single points of failure are identified with mitigation when relevant
  - security is addressed at each meaningful layer
  - unresolved decisions are named explicitly as open questions
  - the document stays at system level and does not duplicate D03, D04, or D05

- [ ] **Step 7: Write the file and summarize.** Write
  `.specflow/docs/D02-system-architecture.md`, then report what was written, key stack decisions
  and their sources, open questions, and suggest `103-common-data-model` next.

---

## Rules

1. Prefer loaded standards and existing project evidence over generic best practice.
2. Surface conflicts instead of silently choosing between them.
3. Name open questions explicitly instead of filling sections with assumptions.
4. Keep this document system-level; backend, frontend, and data detail belong in later docs.
