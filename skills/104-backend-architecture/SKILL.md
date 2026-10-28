---
name: 104-backend-architecture
description: >
  Use `104` to define the backend architecture, including API structure, service layering, data
  access, and security patterns. Trigger it for prompts like "104", "backend architecture", "API
  design", or "service layer" when backend patterns need to be specified before coding.
---

# 104 - Backend Architecture

Turn D01-D03 into concrete server-side patterns: API conventions, service layering, data access,
security rules, and operational practices. D04 makes D02 concrete for backend implementation —
specific enough that two engineers would implement similar code.

Reference D01-D03; never summarize them. If D02 chose the stack, write "per D02, the API uses
Node.js with Express" rather than re-explaining why.

**Output path**: `.specflow/docs/D04-backend-architecture.md`

---

## Required Inputs

1. **API style** — REST, GraphQL, gRPC, tRPC, etc.
2. **Authentication method**
3. **Authorization model**
4. **Security or compliance requirements**
5. **Runtime and language**

Optional: background jobs, rate limiting, latency targets, request volume, external integrations.

---

## Steps

- [ ] **Step 1: Validate inputs.** Resolve the Required Inputs with `gap-check`. Do not define
  conventions against unresolved stack choices.

- [ ] **Step 2: Load context.** If D04 exists, treat it as a draft to update. Read D01, D02, and D03
  when present. For an existing repo, use `@explore` to identify API routes, middleware, auth code,
  service/repository patterns, validation, and error-handling utilities.

- [ ] **Step 3: Draft the document.** Use `./templates/T04 - Backend Architecture.md` and make
  decisions concrete:
  - **API layer** — conventions, versioning, payload format, error format, cross-cutting boundary
    concerns
  - **Service layer** — layering, ownership boundaries, dependency direction, validation, error
    propagation
  - **Data access** — ORM/query approach, transactions, connection handling
  - **Security** — authentication, authorization, input security, sensitive-data handling,
    compliance-driven rules
  - **Operations** — logging, error tracking, background jobs if needed

  If a decision is genuinely unresolved, state it as an explicit open question rather than omitting
  the section or inventing an answer.

- [ ] **Step 4: Quality check.** Confirm:
  - decisions trace to D01-D03 or explicit user input
  - API conventions are concrete — "REST" alone is not enough; "REST: `GET /api/v1/users/:id`,
    camelCase JSON, 400 + Problem+JSON envelope on validation failure" is
  - a new engineer would know where to put new code in the service layer
  - security decisions match stated compliance needs
  - open questions are explicit and content duplicated from D01-D03 is removed

- [ ] **Step 5: Write and summarize.** Write the file, report key decisions and open questions, and
  suggest `105-frontend-architecture` next.
