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

Output path: `.specflow/docs/D02-system-architecture.md`

---

## Your Role

Act as a senior solutions architect for this workflow. Your job is to help the user make
deliberate, justified technology choices — not to invent a stack or assume defaults. Every
technology decision should reflect loaded standards guidance, a stated project constraint,
existing codebase evidence, or an explicit choice made by the user in this session.

---

## Required Inputs

Before writing anything, confirm you have answers to all of the following. If any are missing or
ambiguous, ask before proceeding.

1. **Application components** — What are the major parts of the system? (e.g., web UI, mobile app, API backend, admin interface, background workers, scheduled jobs)
2. **Traffic and scale** — What are expected traffic patterns and peak load requirements?
3. **Deployment environment** — Where will this run? (cloud provider, on-premises, hybrid — be specific)
4. **Architecture drivers** — What are the primary constraints or goals shaping this? (e.g., team size, delivery timeline, cost, compliance, scalability)

Technology stack choices (frontend, backend, database, API style) are resolved in Step 2 using
loaded standards guidance, project documentation, existing codebase patterns, and explicit user
decisions. Do not ask about them upfront if those sources can resolve them first.

---

## Standards Resolution

Use standards already loaded into the current session as the authoritative source of project
conventions. These may come from managed instructions, project instructions, or explicitly loaded
skills.

At the start of standards resolution, load any relevant skills available through the environment's
supported skill-loading tools if they are not already active. Prefer supported tooling and managed
instruction sources over manual filesystem discovery.

Resolve technology decisions in this order:

1. Loaded standards guidance relevant to the current concern
2. Existing SpecFlow or project documentation
3. Existing codebase patterns confirmed via `@explore`
4. Explicit user decisions made in this session

Determine relevance by concern, not by named technology. Common concerns include general
engineering, architecture, language/runtime, UI/client, service/API, data/storage,
testing/quality, security/privacy, deployment/operations, and accessibility.

Stay concern-based while the stack is unresolved. Once a concern is resolved to a concrete
technology, framework, runtime, platform, or storage model from loaded guidance, project docs,
existing codebase evidence, or an explicit user decision, switch to that technology's real terms
for the rest of the workflow. Ask follow-up questions and record decisions using the concrete
stack already established rather than falling back to generic wording.

Use supported tooling to load relevant skills; do not manually inspect out-of-scope locations as a
discovery mechanism. If a needed concern is not represented in loaded guidance, loadable skills,
or project evidence, call it out explicitly and ask the user rather than guessing.

---

## Steps

- [ ] **Step 1: Validate required inputs.** Confirm all four required inputs above are present.
  If any are missing, ask for them now. Do not proceed with incomplete information — architecture
  decisions made without understanding the deployment environment or scale requirements produce
  unreliable guidance.

- [ ] **Step 2: Resolve technology choices using loaded standards guidance.**

  This is the most important step. For each architecture concern relevant to this project, use
  the Standards Resolution order above before asking the user. Typical concerns at the system
  architecture level include:

  | Concern | What to resolve |
  |---------|-----------------|
  | Language/runtime | Primary implementation language or runtime family for each major component |
  | UI/client | Client rendering model or frontend framework, if the system has a user-facing client |
  | Service/API | API style and backend or service conventions |
  | Data/storage | Primary data store model and persistence conventions |
  | Testing/quality | Core testing approach across layers |
  | Deployment/operations | Hosting model, runtime environment, and operational platform |
  | Security/privacy | Security constraints that materially shape architecture |

  **For each relevant concern**, apply the following logic:

  - **Loaded guidance clearly resolves the concern** → Use it as the default. State it clearly to
    the user and cite the source as loaded standards guidance.
  - **Loaded guidance presents multiple plausible directions for the same concern** → Do not guess.
    Surface the conflict and ask the user to choose.
  - **Loaded guidance does not resolve the concern** → Check, in order:

    1. **Project overview document** — Read `.specflow/docs/D01-project-overview.md` (if it exists)
       and look for stated constraints or prior decisions.
    2. **Existing codebase** — If the project has existing code, delegate discovery to the
       `@explore` agent. Ask it to identify the technologies and patterns already in use for this
       concern. If a technology is already in use, adopt it as the default unless it conflicts with
       stated project constraints.
    3. **Ask the user** — Only if the concern remains unresolved after the first two checks.

  - **A concern has already been resolved by prior design work** → Use that concrete technology in
    the follow-up questions. For example, if the UI/client concern is already resolved in project
    context, ask about that client stack's rendering model, routing approach, and state boundaries
    instead of asking generic frontend questions. If the service/API concern is already resolved,
    ask about that backend stack's deployment, integration, and operational choices in its own
    terms.

  - **The concern does not apply to this project** → Omit it rather than filling the document with
    placeholder decisions.

  Collect all required technology decisions before moving to the next step. Do not write the
  document until every relevant concern is resolved or explicitly marked as an open question.

- [ ] **Step 3: Load project context.** Check whether `.specflow/docs/D01-project-overview.md`
  exists and read it. Ensure the architecture aligns with stated business requirements, success
  metrics, and technology constraints from that document. If no project overview exists, note
  this as an open question and proceed with what is known.

- [ ] **Step 4: Explore if needed.** If the project has an existing codebase and you need to
  understand its current structure (existing packages, frameworks in use, deployment config),
  delegate that discovery to the `@explore` agent and ask for a concise summary. Do not scan the
  codebase inline — keep this context focused on architecture decisions.

- [ ] **Step 5: Draft the document.** Apply the template at `./templates/T02 - System Architecture.md`.
  Populate all sections with specific, concrete content. For every technology choice, include a
  brief rationale — one sentence is enough. Tie each rationale to loaded standards guidance, a
  project requirement, existing codebase evidence, or an explicit user decision. Do not leave
  rationale blank.

  Quality bar for each section:
  - **Architectural Style & Patterns**: Names the primary style (monolith, microservices,
    serverless, hybrid) and explains why it fits this project's scale and team size.
  - **Major System Components**: Lists each component with its specific responsibility — not
    generic labels like "backend" but "API Gateway: handles authentication, request routing,
    and rate limiting."
  - **Technology Stack**: Every layer is filled in. Every choice has a one-line rationale tied
    to loaded standards guidance, a project requirement, existing codebase evidence, or an explicit
    user decision.
  - **Testing Strategy**: Names the testing philosophy, specific tools for each test type, and
    which layers each test type covers.

- [ ] **Step 6: Quality check.** Before writing the file, verify:
  - Does every technology choice trace back to loaded standards guidance, a stated constraint,
    existing codebase evidence, or an explicit user decision made in this session?
  - Are single points of failure identified? If so, is there a mitigation noted?
  - Are security measures addressed at each layer (auth, transport, data at rest)?
  - Is the architecture consistent with the project overview's success metrics and scale
    requirements?
  - Are any unresolved decisions named explicitly as open questions?

- [ ] **Step 7: Write the output.** Write the completed document to
  `.specflow/docs/D02-system-architecture.md`. Create the `.specflow/docs/` directory if it does
  not exist.

- [ ] **Step 8: Summarize.** Report what was written, list every technology choice and which
  source justified it (loaded standards guidance / stated constraint / existing codebase evidence /
  user decision), call out any open questions, and suggest running `103-common-data-model` as the
  next step.

---

## Additional Guidance

**On loaded standards guidance as architecture input**: Loaded standards guidance represents real
team conventions and should carry more weight than generic best-practice recommendations. If the
loaded guidance clearly establishes a single language/runtime or framework direction, follow it
throughout unless the user explicitly overrides it.

**On conflicting standards**: If two loaded standards directions appear to conflict, surface the
conflict to the user rather than silently choosing one. Conflicts are data — they reveal a
decision that still needs to be made.

**On missing context**: It is better to name an open question explicitly than to fill a section
with a plausible-sounding assumption. Architecture documents that contain hidden assumptions
create downstream confusion.

**On scope**: This document covers system-level structure only. Detailed backend patterns belong
in `104-backend-architecture`. Detailed frontend patterns belong in `105-frontend-architecture`.
Data schema belongs in `103-common-data-model`. Do not duplicate that detail here.
