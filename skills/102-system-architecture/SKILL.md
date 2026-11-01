---
name: 102-system-architecture
description: >
  Use `102` to define the system architecture, stack, major components, and testing approach.
  Trigger it for prompts like "102", "system architecture", "architecture doc", or "define the
  tech stack" when the project is ready for foundational technical decisions.
---

# 102 - System Architecture

For human-facing Markdown, prefer headings and labeled bullets; use tables only for compact comparisons.
Keep required structured syntax unchanged.

Record the system shape, major components, technology decisions, and testing approach in a concise,
skimmable reference. Include only what the project needs; backend, frontend, and data detail belong
in D03-D05.

**Output path**: `.specflow/docs/D02-system-architecture.md`

---

## Required Inputs

1. **Application components** — known system parts and external integrations
2. **Traffic and scale** — expected demand; use estimates or targets when known, not invented precision
3. **Deployment environment** — where the system runs or is intended to run
4. **Architecture drivers** — constraints or goals such as team size, cost, compliance, or time

Resolve stack choices separately through Standards Resolution; don't ask again about confirmed choices.

---

## Standards Resolution

Respect confirmed user decisions and binding project rules. Ground choices in current project docs
and codebase evidence; load relevant installed skills through supported skill-loading tools to guide
unresolved choices, not override project constraints. Surface conflicts rather than silently choosing
a winner. For an undecided choice, recommend an option with its tradeoff and ask for confirmation.
Defer non-blocking decisions to Open Questions; don't present proposals as settled choices.

---

## Steps

- [ ] **Step 1: Load project context.** If D02 exists, treat it as a draft to update. Read D01 when
  present for business goals, constraints, and success signals. Inspect relevant packages and
  deployment/config patterns, using `@explore` when useful. Distinguish the existing architecture
  from proposed changes.

- [ ] **Step 2: Validate inputs.** Resolve the Required Inputs with `gap-check`, using loaded context
  before asking questions.

- [ ] **Step 3: Resolve technology choices.** Apply Standards Resolution to relevant concerns:
  language/runtime, UI/client, service/API, data/storage, testing/quality, deployment/operations,
  security/privacy. Omit concerns that don't apply.

- [ ] **Step 4: Draft the document.** Use `./templates/T02 - System Architecture.md`, covering
  **Architectural Style & Patterns**, **Major System Components**, **Technology Stack**, and
  **Testing Strategy**. Give key choices a brief rationale and source. Capture deployment,
  integrations, material risks, and security safeguards where they affect the system shape. Size
  components and testing coverage to the project, without quotas or mandatory layers. Reference
  existing decisions rather than repeating D01 or D03-D05.

- [ ] **Step 5: Quality check.** Key choices fit the product goals, scale, and confirmed constraints;
  material risks have safeguards or explicit open questions. Keep unresolved decisions visible.
  Remove template instructions, placeholders, and empty optional sections before writing.

- [ ] **Step 6: Write and summarize.** Write the file, report key stack decisions and their sources
  and open questions, and suggest `103-common-data-model` next.
