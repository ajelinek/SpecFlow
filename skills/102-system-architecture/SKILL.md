---
name: 102-system-architecture
description: >
  Use `102` to define the system architecture, stack, major components, and testing approach.
  Trigger it for prompts like "102", "system architecture", "architecture doc", or "define the
  tech stack" when the project is ready for foundational technical decisions.
---

# 102 - System Architecture

Produce the system architecture document: architectural style, major components, technology stack,
and testing strategy. Keep it system-level; backend, frontend, and data detail belong in D03-D05.

**Output path**: `.specflow/docs/D02-system-architecture.md`

---

## Required Inputs

1. **Application components** — major system parts
2. **Traffic and scale** — expected traffic and peak load
3. **Deployment environment** — cloud, on-prem, hybrid, etc.
4. **Architecture drivers** — constraints or goals such as team size, cost, compliance, or time

Don't ask about specific stack choices upfront; those are resolved in Step 2 via Standards
Resolution, not through `gap-check`.

---

## Standards Resolution

Load relevant installed skills first (via supported skill-loading tools, not filesystem discovery),
then resolve each concern in this order: (1) loaded standards guidance, (2) existing SpecFlow or
project docs, (3) codebase patterns confirmed via `@explore`, (4) explicit user decisions. Judge
relevance by concern, not named technology; once a concern resolves to a technology, use its real
terms from then on. If loaded guidance conflicts, or nothing resolves a concern, ask the user —
never choose silently or guess. Prefer loaded standards and project evidence over generic best
practice.

---

## Steps

- [ ] **Step 1: Validate required inputs.** Resolve items 1-4 with `gap-check`.

- [ ] **Step 2: Resolve technology choices.** Apply Standards Resolution to each relevant concern:
  language/runtime, UI/client, service/API, data/storage, testing/quality, deployment/operations,
  security/privacy. Omit concerns that don't apply.

- [ ] **Step 3: Load project context.** Read D01 if it exists and align with its business goals,
  constraints, and success metrics. For an existing repo, use `@explore` to identify packages,
  frameworks, and deployment/config patterns.

- [ ] **Step 4: Draft the document.** Use `./templates/T02 - System Architecture.md`, covering
  **Architectural Style & Patterns**, **Major System Components**, **Technology Stack**, and
  **Testing Strategy**. Make every technology choice concrete, each with a one-line rationale tied to
  loaded standards, project constraints, codebase evidence, or an explicit user decision.

- [ ] **Step 5: Quality check.** Every important choice has a traceable justification; major single
  points of failure are identified with mitigation when relevant; security is addressed at each
  meaningful layer; consistent with D01 success metrics and scale when D01 exists; unresolved
  decisions are named as open questions rather than filled with assumptions; no duplication of
  D03-D05.

- [ ] **Step 6: Write and summarize.** Write the file, report key stack decisions and their sources
  and open questions, and suggest `103-common-data-model` next.
