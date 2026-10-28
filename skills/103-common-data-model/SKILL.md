---
name: 103-common-data-model
description: >
  Use `103` to define the conceptual data model: entities, relationships, and business rules.
  Trigger it for prompts like "103", "data model", "conceptual data model", "entity
  relationships", or when the team needs a shared domain model before implementation choices.
---

# 103 - Common Data Model

Produce the conceptual data model: domain entities, attributes, relationships, lifecycle states, and
domain rules. Describe the domain, not the implementation — not a database schema, ORM design, API
contract, or frontend state model. Whether `User` is a Postgres table, a Firestore document, or a
Redux slice is irrelevant here; `104`/`105` map this model to implementation.

**Output path**: `.specflow/docs/D03-common-data-model.md`

---

## Required Inputs

1. **Core domain entities**
2. **Entity relationships** — including cardinality where known
3. **Key attributes**
4. **Business rules**
5. **Sensitive data** — PII, financial data, or similar

Optional: lifecycle states, audit/history requirements, compliance constraints.

---

## Steps

- [ ] **Step 1: Validate inputs.** Resolve the Required Inputs with `gap-check`. Do not proceed with
  undefined entities or vague relationships.

- [ ] **Step 2: Load existing context.** If D03 exists, treat it as a draft to update. Read D01 and
  D02 when present. For an existing repo, use `@explore` to find models, schemas, domain objects, or
  type definitions — as evidence, not implementation detail to copy in.

- [ ] **Step 3: Identify and classify entities.** For each: domain purpose, attributes and types,
  required vs optional, relationships and cardinality, lifecycle states, and whether it is a
  first-class entity or a supporting concept. Label supporting concepts — they matter for downstream
  modeling: an `Address` on a `Customer` may be a value object with no identity; a `Status` may be an
  enum or lookup.

- [ ] **Step 4: Draft the document.** Use `./templates/T03 - Common Data Model.md`. Per entity: purpose
  in one sentence, attributes with type and required/optional, sensitive attributes flagged,
  lifecycle states when relevant. Include an ERD of all entities and relationships focused on
  structure, not repeated attributes.
  - **Storage context is a one-line annotation, never the organizing structure.** Note client-only
    (e.g. a UI session object) or server-only (e.g. an audit log) on the entity itself; splitting the
    document by storage tier loses the relationships between entities.
  - **Business rules are domain rules.** Write what a domain expert would recognize regardless of how
    the system is built: "a project must have at least one owner" is a rule; "project_id is not
    null" is an implementation constraint and is excluded unless it directly expresses a domain rule.
    If a rule is unclear, name it as an open question instead of guessing.

- [ ] **Step 5: Quality check.** Each entity defined once; all important relationships present and
  labeled; rules are domain rules; sensitive attributes flagged; no implementation detail; open
  questions explicit.

- [ ] **Step 6: Write and summarize.** Write the file, list the entities documented and open
  questions, and suggest `104-backend-architecture` next.
