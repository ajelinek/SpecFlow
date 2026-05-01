---
name: 103-common-data-model
description: >
  Use `103` to define the conceptual data model: entities, relationships, and business rules.
  Trigger it for prompts like "103", "data model", "conceptual data model", "entity
  relationships", or when the team needs a shared domain model before implementation choices.
---

# 103 - Common Data Model

Produce the conceptual data model document for a project. This document defines the application's
domain entities, their attributes, relationships, lifecycle states, and domain rules.

It is implementation-independent: not a database schema, ORM design, API contract, or frontend
state model.

**Output path**: `.specflow/docs/D03-common-data-model.md`

---

## Required Inputs

Before proceeding, confirm:

1. **Core domain entities**
2. **Entity relationships** — including cardinality where known
3. **Key attributes**
4. **Business rules**
5. **Sensitive data** — PII, financial data, or similar

Optional but useful: lifecycle states, audit/history requirements, and compliance constraints.

If required inputs are missing, ask before proceeding.

---

## Steps

- [ ] **Step 1: Validate inputs.** Do not proceed with undefined entities or vague relationships.

- [ ] **Step 2: Load existing context.** If D03 already exists, treat it as a draft to update. Read
  D01 and D02 when present.

- [ ] **Step 3: Explore existing code if needed.** Use `@explore` to find existing models, schemas,
  domain objects, or type definitions when the repo already exists. Use them as evidence, not as a
  source of implementation detail to copy into the document.

- [ ] **Step 4: Identify and classify entities.** For each entity, determine:
  - its domain purpose
  - attributes and types
  - required vs optional fields
  - relationships and cardinality
  - lifecycle states
  - whether it is a first-class entity or a supporting concept such as a value object, enum, or
    lookup

  If storage context matters, note it as an attribute of the entity rather than reorganizing the
  document by storage tier.

- [ ] **Step 5: Draft the document.** Use `./templates/T03 - Common Data Model.md`. For each entity:
  - state purpose in one sentence
  - list attributes with type and required/optional status
  - flag sensitive attributes
  - note lifecycle states when relevant
  - include storage context only when it is meaningful

  Include an ERD with all entities and relationships, but keep it focused on structure, not full
  attribute repetition.

- [ ] **Step 6: Quality check.** Confirm:
  - each entity is defined once
  - all important relationships are present and labeled
  - business rules are domain rules, not implementation constraints
  - sensitive attributes are flagged
  - implementation details are absent
  - open questions are called out explicitly

- [ ] **Step 7: Write the file and summarize.** Write
  `.specflow/docs/D03-common-data-model.md`, list the entities documented, call out open questions,
  and suggest `104-backend-architecture` next.

---

## Rules

1. Describe the domain, not the implementation.
2. Storage context is an annotation, not the organizing structure.
3. Supporting concepts should be labeled as such.
4. If a rule is unclear, name it as an open question instead of guessing.

## Additional Guidance

**On implementation independence**: This document describes the domain, not the implementation.
Whether `User` is a Postgres table, a Firestore document, a Redux slice, or all three is not
relevant here. A downstream document (`104-backend-architecture`, `105-frontend-architecture`)
maps the conceptual model to its implementation. Keep those concerns separate.

**On storage context as an annotation**: If an entity is client-only (e.g., a UI session object
that is never sent to a server) or server-only (e.g., an audit log the client never reads), note
this as a one-line storage annotation on the entity. Do not split the document into storage-tier
sections — that organization loses the relationships between entities and forces readers to jump
between sections to understand the domain.

**On supporting concepts**: Not everything is a first-class entity. An `Address` attached to a
`Customer` may be a value object with no independent identity. A `Status` may be an enum. Label
these distinctions — they matter for how engineers model them downstream.

**On business rules**: Write rules that a domain expert would recognize as true regardless of how
the system is built. "A project must have at least one owner" is a business rule. "project_id is
not null" is an implementation constraint — do not include implementation constraints unless they
directly express a domain rule. If a rule is unclear, name it as an open question rather than
guessing.
