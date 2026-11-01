---
name: 104-backend-architecture
description: >
  Use `104` to define the backend architecture, including API conventions, code boundaries, data
  access, and security patterns. Trigger it for prompts like "104", "backend architecture", "API
  design", or "service layer" when backend patterns need to be specified before coding.
---

# 104 - Backend Architecture

For human-facing Markdown, prefer headings and labeled bullets; use tables only for compact comparisons.
Keep required structured syntax unchanged.

Record the backend patterns needed to place the next change correctly: responsibilities, interface
conventions, data access, security, and relevant operations. Keep this a concise, skimmable reference,
not an endpoint catalog or implementation plan. Reference D01-D03 rather than repeating them.

D03 owns data definitions; D04 explains runtime access and where rules are enforced. Document the
actual or confirmed backend shape, whether framework handlers, serverless functions, services, or
another structure. No mandatory service/repository layers or default libraries.

**Output path**: `.specflow/docs/D04-backend-architecture.md`

---

## Required Inputs

1. **Runtime and execution environment** — language, framework, and hosting constraints from D02
2. **Interfaces** — API style, events, or other backend entry points and their consumers
3. **Access model** — authentication and authorization needs, including public or unauthenticated access
4. **Data and rules** — storage used, relevant D03 definitions, and rules requiring runtime enforcement
5. **Security and operational constraints** — sensitive data, compliance, and known reliability or scale needs

Background jobs, rate limiting, caching, and external integrations inform the document only when relevant.

---

## Steps

- [ ] **Step 1: Load project context.** If D04 exists, update it rather than create a competing copy.
  Read project guidance, D01, D02, and the existing D03 model when present:
  `D03-common-data-model.dbml`, `D03-common-data-model.md`, or both for mixed storage. Inspect relevant
  code and configuration for entry points, ownership, auth, validation, errors, and data access,
  using `@explore` when useful. Distinguish existing patterns from proposed changes.

- [ ] **Step 2: Resolve inputs.** Use `gap-check` for gaps that block architecture decisions, using
  loaded context before asking. Don't ask again about confirmed choices. Capture non-blocking
  uncertainties in Open Questions instead of inventing details.

- [ ] **Step 3: Resolve backend patterns.** Respect confirmed user decisions and binding project rules.
  Use relevant installed skills to guide unresolved choices, not override project constraints.
  Surface conflicts; for an undecided material choice, recommend an option with its tradeoff and ask
  for confirmation. Prefer established owners and conventions; don't introduce layers, dependencies,
  or numeric limits merely to fill the template. Give key decisions a brief rationale and source.

- [ ] **Step 4: Draft the document.** Use `./templates/T04 - Backend Architecture.md` as an adaptable
  structure, covering only applicable concerns:
  - **Backend Structure** — responsibilities, code locations, dependency direction, and shared owners
  - **API & Boundary Conventions** — interface conventions, validation, and error handling; versioning,
    pagination, and other boundary policies only when needed
  - **Data Access & Rule Enforcement** — runtime access, transaction ownership, and enforcement of
    D03 rules outside the database; connection handling or caching only where relevant
  - **Security** — trust boundaries, access enforcement, input protection, secrets, sensitive data,
    and any compliance-driven safeguards; state explicitly when access is public
  - **Operations** — relevant diagnostics, failure recovery, jobs, and integrations, without assuming
    infrastructure or tools the project doesn't need
  - **Open Questions** — unresolved decisions, their impact, and what would resolve them

- [ ] **Step 5: Quality check.** A new engineer can locate the right owner and follow the applicable
  conventions. Decisions trace to confirmed requirements, project evidence, or relevant standards;
  proposals remain labeled. Security and important rule enforcement have clear owners or explicit
  open questions. A model's rule notes are not proof of database or application enforcement. Don't
  duplicate schemas, stack decisions, or feature-specific contracts, and don't defer essential
  architecture to an assumed future document.

- [ ] **Step 6: Write and summarize.** Remove template instructions, examples, placeholders, and empty
  optional sections. Write the file, report material decisions and their sources and open questions,
  and suggest `105-frontend-architecture` or feature design only as needed.
