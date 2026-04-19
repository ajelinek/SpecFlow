---
name: 103-common-data-model
description: >
  Use this skill when you need to document the application's conceptual data model: what entities
  exist, what attributes they carry, how they relate to each other, and what business rules govern
  them. Triggers on phrases like "data model", "103", "document the data", "what data do we have",
  "entity relationships", "CDM", "conceptual data model", or when a user needs a shared
  understanding of the domain data before implementation begins. This document is
  implementation-independent — it defines the domain, not the database schema or state management
  approach. Run this after 102-system-architecture and before 104-backend-architecture or
  109-data-access-patterns.
---

# 103 — Common Data Model

Produce the conceptual data model document for a project. This document defines every entity in
the application's domain — what it is, what it carries, how it relates to other entities, and
what rules constrain it. It is written at the domain level, independent of implementation: not a
database schema, not a state management design, not an API contract. Each entity is documented
once. Where storage context is relevant (e.g., an entity is client-only), it is noted as a
property of the entity, not used to reorganize the document.

This document is the shared reference that downstream work — backend schema, API design, frontend
state, access patterns — aligns to.

Output path: `.specflow/docs/D03-common-data-model.md`

---

## Your Role

Approach this as a domain modeler. Your job is to identify and define the concepts the
application deals in — the nouns of the system — and express their structure and relationships
clearly. Avoid implementation language: no table names, no ORM conventions, no framework-specific
types unless they genuinely belong at the domain level. Write in terms a product manager and an
engineer can both read and agree on.

---

## Required Inputs

Before writing anything, confirm you have answers to all of the following. If any are missing,
ask for them now — do not invent entities or assume relationships.

1. **Core domain entities** — What are the main concepts the application works with? (e.g., users, projects, orders, messages, appointments)
2. **Entity relationships** — How do these entities relate? (ownership, membership, association, hierarchy — be specific about cardinality)
3. **Key attributes** — What does each entity need to carry? (name, type, required vs. optional, any notable constraints)
4. **Business rules** — What rules govern the data at the domain level, regardless of implementation? (e.g., "a project must have at least one owner", "an order cannot be modified after fulfillment")
5. **Sensitive data** — Which attributes contain PII, financial data, or other sensitive information?

Optional but useful: audit or history requirements, compliance constraints (GDPR, HIPAA), lifecycle states per entity.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all five required inputs are present. If any are
      missing, ask before continuing. Do not proceed with undefined entities or vague relationships —
      a conceptual data model built on assumptions produces contradictions in every downstream
      document.

- [ ] **Step 2: Load existing context.** Check whether `.specflow/docs/D03-common-data-model.md` already
      exists. If it does, treat it as a prior draft and update rather than replace. Read
      `.specflow/docs/D01-project-overview.md` if it exists — it names the business entities and
      workflows that the data model must support. Read `.specflow/docs/D02-system-architecture.md` if it
      exists — it may establish constraints (e.g., a document database that discourages certain
      relationship patterns) worth noting as implementation considerations.

- [ ] **Step 3: Explore if needed.** If the project has an existing codebase and you need to
      identify entities already in use, delegate discovery to the `@explore` agent. Ask it to locate
      and return: existing model or schema definitions, domain object classes, and any type
      definitions that represent core entities. Do not scan the codebase inline. Use what is found
      to inform the conceptual model — do not copy implementation details directly into the document.

- [ ] **Step 4: Identify and group entities.** List all entities that belong in the model. For
      each, determine:
  - Its domain purpose in one sentence
  - Its primary attributes and their types
  - Its relationships to other entities (direction and cardinality)
  - Any lifecycle states it moves through
  - Whether it is a first-class domain entity or a supporting concept (value object, lookup,
    configuration) — note this distinction; it affects how downstream work treats it

  If an entity is relevant at a specific storage boundary (e.g., it only exists on the client
  and is never persisted to the server), note that as a property of the entity. Do not reorganize
  the document around storage tiers.

- [ ] **Step 5: Draft the document.** Use the template at `./templates/T03 - Common Data Model.md`.
      Populate every section with specific content. For each entity:
  - State its purpose in one sentence
  - List its attributes with type, required/optional, and a brief description
  - Flag sensitive attributes
  - Note any lifecycle states
  - Note storage context only if it is non-obvious or constraining

  Write the ERD to show all entities and their relationships. Include cardinality. Keep the ERD
  focused on relationships — do not repeat every attribute from the schema tables.

  Write business rules as explicit, testable statements. "A project must have at least one owner"
  is a business rule. "project_id is not null" is an implementation constraint — do not include
  implementation constraints here unless they directly express a domain rule.

- [ ] **Step 6: Quality check.** Before writing the file, verify:
  - Is every entity defined exactly once?
  - Does the ERD include all entities and all relationships identified in Step 4?
  - Are all relationships labeled with direction and cardinality?
  - Are business rules stated at the domain level, not as schema constraints?
  - Are all sensitive attributes flagged?
  - Are implementation details (column names, ORM annotations, framework types) absent?
  - Are any open questions named explicitly rather than papered over?

- [ ] **Step 7: Write the output.** Write the completed document to
      `.specflow/docs/D03-common-data-model.md`. Create the `.specflow/docs/` directory if it does not exist.

- [ ] **Step 8: Summarize.** Report what was written, list the entities documented, call out
      any open questions, and suggest running `104-backend-architecture` or
      `109-data-access-patterns` as the next step.

---

## Additional Guidance

**On implementation independence**: This document describes the domain, not the implementation.
Whether `User` is a Postgres table, a Firestore document, a Redux slice, or all three is not
relevant here. A downstream document (`104-backend-architecture`, `105-frontend-architecture`)
maps the conceptual model to its implementation. Keep those concerns separate.

**On storage context as an annotation**: If an entity is client-only (e.g., a UI session
object that is never sent to a server) or server-only (e.g., an audit log the client never
reads), note this as a one-line storage annotation on the entity. Do not split the document
into storage-tier sections — that organization loses the relationships between entities and
forces readers to jump between sections to understand the domain.

**On supporting concepts**: Not everything is a first-class entity. An `Address` attached to
a `Customer` may be a value object with no independent identity. A `Status` may be an enum.
Label these distinctions — they matter for how engineers model them downstream.

**On business rules**: Write rules that a domain expert would recognize as true regardless of
how the system is built. Avoid rules that only make sense in a specific implementation. If a
rule is unclear, name it as an open question rather than guessing.
