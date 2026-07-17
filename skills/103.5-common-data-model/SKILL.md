---
name: 103.5-common-data-model
description: >
  Use `103.5` to define the conceptual data model as GraphQL SDL instead of markdown
  tables — entities, relationships, business rules, access rules, and data quality
  rules captured in a documentation-only schema that doubles as diagram source for an
  interactive visualizer. Trigger it for prompts like "103.5", "graphql data model",
  "graphql cdm", or when the team wants the common data model to be parseable and
  visualizable, not just prose. This is an alternative to 103-common-data-model for
  the same D03 slot in the pipeline — a project uses one or the other, not both.
---

# 103.5 - Common Data Model (GraphQL)

Produce the conceptual data model for a project as GraphQL SDL: a documentation-only
schema that is never deployed as an API. It captures the same domain knowledge as
`103-common-data-model` (entities, relationships, business rules) plus two things
markdown tables express poorly — role-based access rules and field-level validation
constraints — in a format with mature parsing, diffing, and visualization tooling
already built for it.

It is implementation-independent, same as `103`: not a database schema, ORM design,
API contract, or frontend state model. The physical implementation (relational,
NoSQL, event-based) is a downstream decision informed by, not dictated by, this
schema.

**This is an alternative engine for the same D03 slot as `103-common-data-model`, not
an addition to it.** A project uses one or the other. Downstream skills that reference
"D03" generically keep working either way.

**Output path**: `.specflow/docs/D03-common-data-model/` — a folder, not a single
file (see Step 5).

---

## Required Inputs

Before proceeding, confirm:

1. **Core domain entities**
2. **Entity relationships** — including cardinality where known
3. **Key attributes** — required-ness is expressed with GraphQL's own `!` marker, not
   tracked separately
4. **Business rules**
5. **Sensitive data** — PII, financial data, or similar
6. **Access roles** — the actual actors that read or write this data (e.g. admin,
   member, viewer). These populate the `Role` enum in `_directives.graphql`; don't
   default to generic "admin/user" unless that's genuinely what the project has.

Optional but useful: lifecycle states, whether the project has real bounded contexts
(multiple domains) or is a single domain, audit/history requirements, compliance
constraints.

Resolve these with `gap-check`: it tries to answer them from existing context before
asking, then asks about anything still open one question at a time with a recommended
answer.

---

## Steps

- [ ] **Step 1: Validate inputs.** Run `gap-check` against the Required Inputs above.
  Do not proceed with undefined entities, vague relationships, or unresolved roles.

- [ ] **Step 2: Load existing context.** Check `.specflow/docs/` for an existing D03
  in *either* format:
  - If `.specflow/docs/D03-common-data-model.md` (the markdown form from `103`)
    exists, this is a switch from one CDM engine to the other. Confirm that's
    intentional with the user, then treat its content as source material to translate
    into GraphQL — don't discard it and don't leave both forms in place afterward.
  - If `.specflow/docs/D03-common-data-model/` (this skill's own folder form)
    already exists, treat it as a draft to update.
  Read D01 and D02 when present.

- [ ] **Step 3: Explore existing code if needed.** Use `@explore` to find existing
  models, schemas, domain objects, type definitions, or a real GraphQL API already in
  the repo when the project already exists. Use these as evidence, not as
  implementation detail to copy in — a live API's resolvers, N+1 concerns, or
  pagination implementation are not domain facts.

- [ ] **Step 4: Identify and classify entities, and resolve structure.** For each
  entity, determine:
  - its domain purpose, attributes and types, required vs. optional fields
    (`!` vs. no `!`)
  - relationships and cardinality
  - whether it's a first-class entity (gets an `id`) or a value object (no `id`,
    embeds with its parent) — see the nesting/identity test in Additional Guidance
  - whether any plural cross-entity relationship is really many-to-many and needs an
    explicit join type

  Also decide:
  - **Domain split**: default to a single domain named after the project. Only split
    into multiple domain subfolders on a clear signal — distinct services, distinct
    team ownership, or the user explicitly describing separate bounded contexts. Don't
    ask by default; only raise it if a real signal is present.
  - **Roles**: finalize the `Role` enum's values from Required Input 6.

- [ ] **Step 5: Draft the files.** Use the templates in `./templates/`:
  - `_directives.graphql` (from `T03-directives.template.graphql`) — copy as-is
    except filling in the project's actual `Role` enum values. Everything else in
    this file is fixed boilerplate; see Additional Guidance for why.
  - One `README.md` per domain (from `T03-README.template.md`) — single-domain
    projects get one at the D03 root; multi-domain projects get a root index plus one
    per domain subfolder.
  - One `schema.graphql` per domain (from `T03-schema.template.graphql`) — replace
    the example entities with the project's real ones, following the directive
    vocabulary and schema-level conventions in Additional Guidance.
  - `.gitignore` (from `T03-gitignore`) — copy once to the D03 root as-is.

  Folder shape (single-domain projects omit the domain subfolder and put
  `README.md`/`schema.graphql` directly under the D03 root):

  ```
  .specflow/docs/D03-common-data-model/
    .gitignore
    _directives.graphql
    README.md
    <domain>/
      README.md
      schema.graphql
  ```

- [ ] **Step 6: Quality check.** Confirm:
  - each entity is defined once, with an unambiguous entity-vs-value-object status
  - every important relationship is present, including many-to-many join types
  - business rules are domain rules, not implementation constraints
  - sensitive attributes carry `@validate(sensitivity: ...)`
  - every type/field that needs explanation uses a `"""..."""` description, not a `#`
    comment (only descriptions survive into the visualizer)
  - mutations use `extend type Mutation` against the placeholder root, never
    `type Mutation`
  - open questions are called out explicitly
  - **the schema actually parses**: run the Step 5 files through the generator (see
    Visualizing in Additional Guidance) — a build failure here is a real defect in
    the authored SDL, not just a missed visualization, and must be fixed before this
    step is done

- [ ] **Step 7: Write the files and summarize.** Write the full
  `.specflow/docs/D03-common-data-model/` folder, list the entities documented per
  domain, call out open questions, note the command to regenerate the visualization,
  and suggest `104-backend-architecture` next.

---

## Rules

1. Documentation only — this schema is never deployed as an executable API.
2. Describe the domain, not the implementation. Physical shape (relational vs. NoSQL,
   indexes, partitioning) is a downstream decision the schema implies, never dictates.
3. The directive vocabulary is exactly two directives: `@access` and `@validate`. Only
   decorate a type or field when it deviates from a sensible default — a plain field
   or type with nothing special to say stays bare.
4. Entity-vs-value-object status is signaled purely by the presence or absence of an
   `id` field — never by a directive.
5. Required-ness is signaled purely by GraphQL's `!` — never duplicated as a
   `@validate` argument.
6. Use `"""..."""` descriptions for anything meant to be read in the visualizer. `#`
   comments are author-only asides, invisible to introspection.
7. Mutations always attach via `extend type Mutation { ... }` against the placeholder
   root in `_directives.graphql` — never declare `type Mutation` in a domain file.
8. If a rule, relationship, or role is unclear, name it as an open question instead of
   guessing.

## Additional Guidance

**On the directive vocabulary.** There are exactly two directives, both declared once
in `_directives.graphql`:

- `@access(rules: [AccessRule!]!)` — usable on a type (sets the default for all its
  fields) or a field (overrides the type's default; field-level always wins when
  present, same logic as CSS specificity). `AccessRule` pairs a `Role` (project-specific
  enum, filled in at Step 4) with an `AccessLevel` (`READ_WRITE` / `READ_ONLY` /
  `NONE`, fixed). Prefer entity-level `@access` wherever possible; only drop to
  field-level for genuine exceptions (e.g. PII on an otherwise-normal type).

  ```graphql
  type Customer @access(rules: [{ role: ADMIN, level: READ_WRITE }, { role: USER, level: READ_ONLY }]) {
    id: ID!
    ssn: String @access(rules: [{ role: ADMIN, level: READ_ONLY }, { role: USER, level: NONE }])
  }
  ```

- `@validate(...)` — field-level typed constraints: `minLength`, `maxLength`,
  `pattern`, `format`, `startsWith`, `endsWith`, `contains`, `notContains`, `min`,
  `max`, `exclusiveMin`, `exclusiveMax`, `multipleOf`, `minItems`, `maxItems`, and
  `sensitivity`. Only include the arguments that actually apply to a field — a string
  field never gets `min`/`max`. `sensitivity` uses `"pii"` / `"financial"` /
  `"confidential"` by convention, with a freeform fallback if none fit.

  ```graphql
  email: String! @validate(format: "email", sensitivity: "pii")
  quantity: Int! @validate(min: 1)
  ```

  There is no `@entity` directive, and `@validate` has no `required` argument —
  domain (folder location) and required-ness (`!`) are both already expressed
  natively by the schema's own structure. A directive that just repeats what the
  schema already says is noise that can drift out of sync with the thing it's
  repeating.

**On the nesting/identity test.** A nested type with its own `id` field is a
first-class entity — independently meaningful, an own-table/collection candidate. A
nested type with no `id` is a value object that embeds with its parent — a
document/JSON-blob candidate. No directive needed; the presence of `id` *is* the
signal:

```graphql
"""No independent identity — embeds with its parent."""
type Address { line1: String! city: String! }

"""Independently meaningful — gets its own identity."""
type LineItem { id: ID! sku: String! }
```

**On many-to-many relationships.** Give them an explicit join type (its own entity,
with an `id`) instead of a bare `[OtherEntity!]!` list on each side — otherwise the
relationship is invisible:

```graphql
type CustomerTag { id: ID! customer: Customer! tag: Tag! assignedAt: String! }
```

**On mutations.** Single input object in, single payload object out, always:

```graphql
input UpdateCustomerInput { id: ID! email: String }
type UpdateCustomerPayload { customer: Customer errors: [String!] }
extend type Mutation { updateCustomer(input: UpdateCustomerInput!): UpdateCustomerPayload! }
```

**On other schema-level conventions** (established GraphQL practice, doubling as
signals for physical modeling later):
- Type names are singular (`Customer`, not `Customers`).
- Enum values are `SCREAMING_SNAKE_CASE` — an enum signals a bounded set of values
  enforced somewhere, a check constraint or lookup table downstream.
- List fields with pagination arguments (`first`, `after`) signal a high-volume
  access pattern — an indexing candidate (relational) or its own top-level collection
  (NoSQL).

**On cross-domain references.** If an entity in one domain references a type defined
in another domain's `schema.graphql`, just reference it by name with a
`# defined in ../<domain>/schema.graphql` comment — no stub type needed. Neither file
is valid SDL in isolation, and that's fine: the generator concatenates every `*.graphql`
file under the D03 folder before validating, so the reference resolves at generation
time even though no single file resolves it alone.

**On `_directives.graphql`.** With the enum-based `@access` design, this file is
almost entirely fixed boilerplate — `@access`, `@validate`, `AccessLevel`,
`AccessRule`, and the placeholder `Query`/`Mutation` roots never change between
projects. The only project-specific line is the `Role` enum's values. Copy the
template as-is and fill those in; don't otherwise hand-edit this file per domain.

**Visualizing.** From this skill's own `scripts/` folder:

```
cd <path-to-this-skill>/scripts
npm install
node generate-voyager.mjs <path-to-the-project's-D03-common-data-model-folder>
```

This writes `build/introspection.json` and `build/voyager.html` inside the project's
D03 folder (gitignored by the `.gitignore` dropped there in Step 5). `npm install`
only writes into this skill's own `scripts/` folder — never into the project — and
only needs to run once; rerunning it is fast and harmless. Open `build/voyager.html`
in a browser; it opens on the placeholder `Query` type by design (there is no real
root query in a documentation-only CDM), so use the root-type dropdown at the bottom
of the page to switch to any real entity and explore from there.

**On implementation independence and business rules.** Same guidance as `103`: write
rules a domain expert would recognize as true regardless of how the system is built.
"A project must have at least one owner" is a business rule; "project_id NOT NULL" is
not. If a rule is unclear, name it as an open question rather than guessing.
