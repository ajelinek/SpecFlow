---
name: 102-system-architecture
description: >
  Use this skill when a project needs a system architecture document that defines the technology
  stack, major components, architectural style, and testing strategy. Triggers on phrases like
  "create system architecture", "write the architecture doc", "define the tech stack", "102",
  "system architecture", or when a user is ready to make foundational technology decisions after
  establishing a project overview. Run this after 101-project-overview and before any backend,
  frontend, or data model work begins.
---

# 102 — System Architecture

Produce the system architecture document for a project. This document defines the high-level
structure of the system: architectural style, major components, technology stack, and testing
strategy. It is the foundational technical reference for every downstream SpecFlow workflow.

Output path: `.specflow/docs/system-architecture.md`

---

## Your Role

Act as a senior solutions architect for this workflow. Your job is to help the user make
deliberate, justified technology choices — not to invent a stack or assume defaults. Every
technology decision should reflect either an installed standards skill, a stated project
constraint, or an explicit choice made by the user in this session.

---

## Required Inputs

Before writing anything, confirm you have answers to all of the following. If any are missing or
ambiguous, ask before proceeding.

1. **Application components** — What are the major parts of the system? (e.g., web UI, mobile app, API backend, admin interface, background workers, scheduled jobs)
2. **Traffic and scale** — What are expected traffic patterns and peak load requirements?
3. **Deployment environment** — Where will this run? (cloud provider, on-premises, hybrid — be specific)
4. **Architecture drivers** — What are the primary constraints or goals shaping this? (e.g., team size, delivery timeline, cost, compliance, scalability)

Technology stack choices (frontend, backend, database, API style) are resolved in Step 2 using
installed standards skills. Do not ask about these upfront — discover them first.

---

## Steps

- [ ] **Step 1: Validate required inputs.** Confirm all four required inputs above are present.
  If any are missing, ask for them now. Do not proceed with incomplete information — architecture
  decisions made without understanding the deployment environment or scale requirements produce
  unreliable guidance.

- [ ] **Step 2: Discover installed standards skills and resolve technology choices.**

  This is the most important step. Check which standards skills are installed in this project's
  Claude Code environment. Look for skills covering:

  | Concern | Example skill names to look for |
  |---------|--------------------------------|
  | Language | `typescript`, `javascript`, `python`, `go`, `dotnet` |
  | Frontend framework | `react`, `vue`, `svelte`, `astro`, `solidjs`, `angular` |
  | Backend framework | `express`, `fastapi`, `nestjs`, `hono`, `django` |
  | Database | `postgres`, `mysql`, `mongodb`, `sqlite`, `supabase` |
  | API style | `graphql`, `trpc`, `rest` |
  | Testing | `testing`, `vitest`, `jest`, `playwright`, `cypress` |
  | Infrastructure | `aws`, `gcp`, `azure`, `vercel`, `fly` |
  | Full-stack | `frontend-ui`, `engineering-principles`, `data` |

  **For each technology concern**, apply the following logic:

  - **One relevant skill is installed** → Use that skill's technology as the default. State it
    clearly to the user: "I found the `react` skill installed — I'll use React for the frontend.
    Let me know if you want to override this."
  - **Multiple relevant skills are installed for the same concern** → Do not guess. Present the
    options and ask the user to choose:

    > "I found both `react` and `vue` installed. Which should I use for the frontend?"

  - **No relevant skill is installed for a concern** → Before asking the user, check for
    guidance in this order:

    1. **Project overview document** — Read `.specflow/docs/project-overview.md` (if it exists)
       and look for any stated technology preferences, constraints, or decisions. If the document
       names a technology for this concern, use it and note the source: "The project overview
       specifies React — I'll use that for the frontend."
    2. **Existing codebase** — If the project has existing code, delegate discovery to the
       `@explore` agent. Ask it to identify the frameworks, languages, and libraries already in
       use for this concern. If a technology is already in use, adopt it as the default: "I found
       Next.js already in the codebase — I'll use that for the frontend."
    3. **Ask the user** — Only if neither the project overview nor the existing codebase resolves
       the concern, ask the user directly using the standard options (frontend: React / Vue /
       Svelte / Astro / SolidJS; backend: Node.js / Python / Go / .NET; database: relational /
       document / graph / key-value; API style: REST / GraphQL / tRPC). Do not invent a choice.

  Collect all technology decisions before moving to the next step. Do not write the document
  until every technology concern is resolved.

- [ ] **Step 3: Load project context.** Check whether `.specflow/docs/project-overview.md`
  exists and read it. Ensure the architecture aligns with stated business requirements, success
  metrics, and technology constraints from that document. If no project overview exists, note
  this as an open question and proceed with what is known.

- [ ] **Step 4: Explore if needed.** If the project has an existing codebase and you need to
  understand its current structure (existing packages, frameworks in use, deployment config),
  delegate that discovery to the `@explore` agent and ask for a concise summary. Do not scan the
  codebase inline — keep this context focused on architecture decisions.

- [ ] **Step 5: Draft the document.** Apply the template at `./templates/T02 - System Architecture.md`.
  Populate all sections with specific, concrete content. For every technology choice, include a
  brief rationale — one sentence is enough. Do not leave rationale blank.

  Quality bar for each section:
  - **Architectural Style & Patterns**: Names the primary style (monolith, microservices,
    serverless, hybrid) and explains why it fits this project's scale and team size.
  - **Major System Components**: Lists each component with its specific responsibility — not
    generic labels like "backend" but "API Gateway: handles authentication, request routing,
    and rate limiting."
  - **Technology Stack**: Every layer is filled in. Every choice has a one-line rationale tied
    to a project requirement, installed skill, or explicit user decision.
  - **Testing Strategy**: Names the testing philosophy, specific tools for each test type, and
    which layers each test type covers.

- [ ] **Step 6: Quality check.** Before writing the file, verify:
  - Does every technology choice trace back to an installed skill, a stated constraint, or an
    explicit user decision made in this session?
  - Are single points of failure identified? If so, is there a mitigation noted?
  - Are security measures addressed at each layer (auth, transport, data at rest)?
  - Is the architecture consistent with the project overview's success metrics and scale
    requirements?
  - Are any unresolved decisions named explicitly as open questions?

- [ ] **Step 7: Write the output.** Write the completed document to
  `.specflow/docs/system-architecture.md`. Create the `.specflow/docs/` directory if it does
  not exist.

- [ ] **Step 8: Summarize.** Report what was written, list every technology choice and which
  source justified it (installed skill / stated constraint / user decision), call out any open
  questions, and suggest running `103-data-model` as the next step.

---

## Additional Guidance

**On installed skills as architecture inputs**: Installed standards skills represent real team
expertise and project conventions. Treat them as stronger signals than generic best-practice
recommendations. If `typescript` is installed, the stack is TypeScript throughout — do not
suggest a mixed-language approach unless the user explicitly asks for one.

**On conflicting skills**: If two installed skills appear to conflict (e.g., `rest` and `trpc`
both installed), surface this to the user rather than silently choosing one. Conflicts are data —
they reveal a decision that needs to be made.

**On missing context**: It is better to name an open question explicitly than to fill a section
with a plausible-sounding assumption. Architecture documents that contain hidden assumptions
create downstream confusion.

**On scope**: This document covers system-level structure only. Detailed backend patterns belong
in `104-backend-architecture`. Detailed frontend patterns belong in `105-frontend-architecture`.
Data schema belongs in `103-data-model`. Do not duplicate that detail here.
