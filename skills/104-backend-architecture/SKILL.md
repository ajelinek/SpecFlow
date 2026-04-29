---
name: 104-backend-architecture
description: >
  Use `104` to define the backend architecture, including API structure, service layering, data
  access, and security patterns. Trigger it for prompts like "104", "backend architecture", "API
  design", or "service layer" when backend patterns need to be specified before coding.
---

# 104 — Backend Architecture

Produce the backend architecture document for a project. This document specifies how the
server-side of the application is structured: the API style and conventions, how business logic
is layered, how the service layer organizes code, how data is accessed, and how security concerns
are handled. It translates the decisions recorded in the system architecture and data model into
concrete backend patterns that engineers can implement directly.

This document does not repeat what is in D01, D02, or D03. It references those documents for
business requirements, technology choices, and entity definitions, then adds the layer-by-layer
design that is specific to the backend.

Output path: `.specflow/docs/D04-backend-architecture.md`

---

## Your Role

Approach this as a backend architect: your job is to make the structural decisions concrete.
Where the system architecture document says "REST API with JWT authentication", this document
specifies the URL naming convention, error envelope format, token lifecycle, and validation
approach. Decisions should be specific enough that two engineers asked to implement the same
endpoint would produce consistent code.

---

## Required Inputs

Before writing anything, confirm you have answers to all of the following. If any are missing,
ask for them now — do not invent conventions or assume patterns.

1. **API style** — REST, GraphQL, gRPC, or tRPC? (Check D02 if it exists; confirm or correct.)
2. **Authentication method** — JWT, session-based, OAuth, API keys, or a combination?
3. **Authorization model** — RBAC, ABAC, ownership-based, or something custom?
4. **Security or compliance requirements** — GDPR, HIPAA, SOC 2, or other obligations that affect
   how data is handled, logged, or retained?
5. **Runtime and language** — Node.js, Python, Go, Java, etc.? (Check D02 if it exists.)

Optional but useful: background job requirements, rate limiting needs, expected request volume
or latency targets, third-party integrations that affect backend design.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all five required inputs are present. If any are
      missing, ask before continuing. Do not draft architecture patterns against unstated technology
      choices — the resulting document will require immediate revision and will confuse downstream
      work.

- [ ] **Step 2: Load existing context.** Check whether `.specflow/docs/D04-backend-architecture.md`
      already exists. If it does, treat it as a prior draft and update rather than replace. Read:
  - `.specflow/docs/D01-project-overview.md` — business requirements and intended user workflows
  - `.specflow/docs/D02-system-architecture.md` — technology choices, deployment topology,
    integration points
  - `.specflow/docs/D03-common-data-model.md` — entities and relationships the backend must serve

  Reference these documents; do not re-describe their content in D04.

- [ ] **Step 3: Explore if needed.** If the project has an existing backend codebase, delegate
      discovery to the `@explore` agent. Ask it to locate and return: existing API route definitions,
      middleware configuration, authentication code, service or repository class patterns, and any
      shared validation or error-handling utilities. Use what is found to document existing patterns
      accurately — do not invent a new architecture on top of an existing one without flagging the
      divergence.

- [ ] **Step 4: Draft the document.** Use the template at `./templates/T04 - Backend Architecture.md`.
      Populate every section with specific decisions:

  **API layer**: API style and its conventions (URL structure, schema organization); versioning
  strategy; payload conventions (field naming, date formats, pagination); error response format
  with an example; cross-cutting concerns at the API boundary (CORS, rate limiting, request
  logging).

  **Service layer**: How the codebase is layered, named explicitly; what each layer owns and
  does not own; how dependencies flow between layers; where input validation occurs and what
  approach is used; how errors propagate from data access to API response.

  **Data access**: ORM, query builder, or raw queries — and why; how transactions are managed;
  connection pooling. If D09 will be produced later, this section establishes the approach and
  D09 will specify per-entity query patterns.

  **Security**: Authentication — how credentials are verified, tokens issued and validated,
  expiry and rotation; authorization — how access control decisions are made and where they are
  enforced; input security — injection, malformed payloads, oversized requests; sensitive data
  handling; any compliance obligations from Required Input 4.

  **Operations**: Logging framework, what is always and never logged; error tracking; background
  processing — if needed, name the framework, job lifecycle, and retry behavior; if not needed,
  state that explicitly.

- [ ] **Step 5: Quality check.** Before writing the file, verify:
  - Does every decision trace back to a requirement in D01, a constraint in D02, or a user-
    supplied input? If a decision exists without a reason, either add the reason or flag it as
    an open question.
  - Are the API conventions specific enough to guide implementation? ("REST" is not specific.
    "REST: `GET /api/v1/users/:id`, camelCase JSON, 400 + Problem+JSON envelope on validation
    failure" is specific.)
  - Does the service layer description tell a new engineer where to put new code?
  - Are security decisions complete for the compliance requirements stated?
  - Are any open questions named explicitly rather than papered over?
  - Is there any content that duplicates D01, D02, or D03 without adding backend-specific
    detail? Remove it.

- [ ] **Step 6: Write the output.** Use the template at `./templates/T04 - Backend Architecture.md`.
      Write the completed document to `.specflow/docs/D04-backend-architecture.md`. Create the
      `.specflow/docs/` directory if it does not exist.

- [ ] **Step 7: Summarize.** Report what was written, list the key decisions documented, call
      out any open questions, and suggest running `105-frontend-architecture` or
      `109-data-access-patterns` as the next step.

---

## Additional Guidance

**On not repeating prior documents**: D04 references D01–D03; it does not summarize them.
If a technology choice was documented in D02, write "per D02, the API uses Node.js with Express"
— do not re-explain why. If a decision is genuinely unresolved, name it as an explicit open
question in the document rather than omitting the section or inventing an answer.
