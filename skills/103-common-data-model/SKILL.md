---
name: 103-common-data-model
description: >
  Use `103` to define the project's data model: one DBML file for relational schema design,
  Markdown for non-relational entities, or both for mixed storage. Trigger it for "103",
  "data model", "DBML", "conceptual data model", or "entity relationships" when data structure
  and rules need a shared reference.
---

# 103 - Common Data Model

For human-facing Markdown, prefer headings and labeled bullets; use tables only for compact comparisons.
Keep required structured syntax unchanged.

Model the project's data and the rules that govern it. Use DBML for relational schema design;
retain domain-level Markdown modeling for non-relational data. This skill authors the model, not
migrations, database enforcement code, ORM models, or API contracts.

## Outputs

- **Relational**: `.specflow/docs/D03-common-data-model.dbml` — one file for the whole project.
- **Non-relational**: `.specflow/docs/D03-common-data-model.md`.
- **Mixed**: Both files, each defining only its own data; cross-reference shared concepts.

The DBML holds the schema, business-rule notes, and open questions. No companion Markdown model
for relational data and no per-feature, per-schema, or per-domain DBML files.

## Required Inputs

1. **Storage approach** — relational, non-relational, or mixed; database engine for relational data
2. **Core entities and relationships** — including cardinality and ownership
3. **Key attributes** — types, requiredness, and identity
4. **Business rules** — constraints and meaningful lifecycle transitions
5. **Sensitive data** — what needs protection and any known handling requirements

Known access patterns, audit/history needs, and compliance constraints inform the model when relevant.

## Steps

- [ ] **Step 1: Load existing context.** Read D01, D02, project guidance, and any existing data model
  when present. Inspect schemas and types in an existing repo as evidence. Update an existing model
  rather than create a competing copy. Confirm format changes or consolidation with the user before
  replacing older Markdown, GraphQL, or split DBML models; preserve their rules and unresolved questions.

- [ ] **Step 2: Resolve inputs.** Use `gap-check` for gaps that block modeling. Respect confirmed
  project choices; don't select a database engine silently. Record non-blocking uncertainties as
  open questions rather than inventing details.

- [ ] **Step 3: Shape the model.** Identify entities, value objects, and enums; clarify identity,
  relationships, cardinality, and rules. For mixed storage, assign each definition to one file and
  describe cross-store references without implying database-enforced foreign keys.

- [ ] **Step 4: Draft the applicable outputs.** Use `./templates/T03 - Common Data Model.dbml`
  for relational data, following the guidance below. For non-relational data, use
  `./templates/T03 - Common Data Model.md`: domain purposes, logical attributes, requiredness,
  sensitive-data handling, relationships, a relationship-focused ERD, and business rules. Include
  lifecycle or storage annotations only when meaningful; value objects and enums need no invented ID.

- [ ] **Step 5: Review and validate.** Check that definitions are unique, references resolve,
  cardinality and requiredness agree, rules are preserved, and sensitive data is marked. For DBML,
  use an available compatible parser and fix reported errors. If unavailable, review structure and
  references manually and report that parser validation was not run. Parsing does not prove that
  business rules are enforced. Don't install dependencies or upload the model just to validate it.

- [ ] **Step 6: Write and summarize.** Remove template instructions, examples, placeholders, and
  empty optional sections. Keep headings, notes, and labeled entries concise and project-specific. Report
  paths, material decisions, open questions, and validation performed; suggest `104` or `105` as needed.

## Relational DBML

- Use concrete types appropriate to the confirmed database, primary and foreign keys, nullability,
  uniqueness, defaults, and checks where justified by the requirements. Model many-to-many tables
  explicitly when designing their keys and attributes.
- Include indexes for known access patterns, not speculative optimization. Explain non-obvious choices.
- Keep every relational definition in the one project DBML file; don't split the model or import other DBML files.
- Group related tables under prominent comment headings with separator lines. Start each section
  with a group-level note explaining its purpose and shared rules; keep table-specific detail by its table.
- Place local enums beside the tables that use them; put shared, global enums at the bottom of the file.
- Put purpose and rule notes next to the relevant table or column. Use project-level or standalone
  notes for cross-table rules and open questions. Mark sensitive fields and their handling requirements.
- Distinguish representable constraints from rules needing later enforcement, such as authorization,
  triggers, or partial indexes. Notes describe intent; they do not enforce it. Don't disguise a
  partial index as an unconditional unique constraint or invent SQL functions to complete the model.
- Follow project naming and modeling conventions. The template illustrates syntax, not a required
  database, ID strategy, table count, or set of fields. No separate relational ERD is needed.
