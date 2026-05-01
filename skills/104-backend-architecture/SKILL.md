---
name: 104-backend-architecture
description: >
  Use `104` to define the backend architecture, including API structure, service layering, data
  access, and security patterns. Trigger it for prompts like "104", "backend architecture", "API
  design", or "service layer" when backend patterns need to be specified before coding.
---

# 104 - Backend Architecture

Produce the backend architecture document for a project. This document turns D01-D03 into concrete
server-side patterns: API conventions, service layering, data-access approach, security rules, and
operational practices.

Do not repeat D01-D03. Reference them and add backend-specific structure only.

**Output path**: `.specflow/docs/D04-backend-architecture.md`

---

## Required Inputs

Before proceeding, confirm:

1. **API style** — REST, GraphQL, gRPC, tRPC, etc.
2. **Authentication method**
3. **Authorization model**
4. **Security or compliance requirements**
5. **Runtime and language**

Optional but useful: background jobs, rate limiting, latency targets, request volume, and external
integrations.

If required inputs are missing, ask before proceeding.

---

## Steps

- [ ] **Step 1: Validate inputs.** Do not define conventions against unresolved stack choices.

- [ ] **Step 2: Load context.** If D04 already exists, treat it as a draft to update. Read D01,
  D02, and D03 when present. Reference them instead of repeating them.

- [ ] **Step 3: Explore existing backend code if needed.** Use `@explore` to identify existing API
  routes, middleware, auth code, service/repository patterns, validation, and error-handling
  utilities when the repo already exists.

- [ ] **Step 4: Draft the document.** Use `./templates/T04 - Backend Architecture.md` and make
  decisions concrete.

  Cover:
  - **API layer** — conventions, versioning, payload format, error format, cross-cutting boundary
    concerns
  - **Service layer** — layering, ownership boundaries, dependency direction, validation, and error
    propagation
  - **Data access** — ORM/query approach, transactions, connection handling
  - **Security** — authentication, authorization, input security, sensitive-data handling,
    compliance-driven rules
  - **Operations** — logging, error tracking, background jobs if needed

- [ ] **Step 5: Quality check.** Confirm:
  - decisions trace to D01, D02, D03, or explicit user input
  - API conventions are concrete enough to guide implementation
  - service-layer boundaries are clear enough that a new engineer would know where code belongs
  - security decisions match stated compliance needs
  - open questions are explicit
  - duplicate content from D01-D03 is removed

- [ ] **Step 6: Write the file and summarize.** Write
  `.specflow/docs/D04-backend-architecture.md`, report key decisions, open questions, and suggest
  `105-frontend-architecture` or `109-data-access-patterns` next.

---

## Rules

1. D04 makes D02 concrete for backend implementation.
2. Backend conventions should be specific enough that two engineers would implement similar code.
3. Reference prior docs instead of re-explaining them.
4. If a backend decision is unresolved, state it as an open question instead of inventing an answer.
