---
name: 103.5-common-data-model
description: >
  Use `103.5` to define the conceptual data model as documentation-only GraphQL SDL (entities,
  relationships, business, access, and data-quality rules) that doubles as source for an
  interactive diagram. Trigger it for "103.5", "graphql data model", "graphql cdm", or when the
  model should be parseable and visualizable. Alternative to `103` for the same D03 slot — use one,
  not both.
---

# 103.5 - Common Data Model (GraphQL)

Produce the conceptual data model as GraphQL SDL: a documentation-only schema, never deployed as an
API. It captures what `103-common-data-model` does (entities, relationships, business rules) plus
role-based access rules and field-level validation constraints, in a format with mature parsing,
diffing, and visualization tooling.

Like `103`, it describes the domain, not the implementation: not a database schema, ORM design, API
contract, or frontend state model. Physical shape (relational vs. NoSQL, indexes, partitioning) is a
downstream decision the schema informs, never dictates. Rules a domain expert would recognize are
business rules ("a project must have at least one owner"); "project_id NOT NULL" is not.

**This is an alternative engine for the same D03 slot as `103`, not an addition.** Downstream skills
that reference "D03" generically work either way.

**Output path**: `.specflow/docs/D03-common-data-model/` — a folder (see Step 5).

---

## Required Inputs

1. **Core domain entities**
2. **Entity relationships** — including cardinality where known
3. **Key attributes** — required-ness is GraphQL's own `!`, not tracked separately
4. **Business rules**
5. **Sensitive data** — PII, financial data, or similar
6. **Access roles** — the actual actors that read or write this data (e.g. admin, member, viewer).
   These populate the `Role` enum; don't default to generic "admin/user" unless that's genuinely
   what the project has.

Optional: lifecycle states, whether the project has real bounded contexts (multiple domains),
audit/history requirements, compliance constraints.

---

## Steps

- [ ] **Step 1: Validate inputs.** Resolve the Required Inputs with `gap-check`. Do not proceed with
  undefined entities, vague relationships, or unresolved roles.

- [ ] **Step 2: Load existing context.** Check `.specflow/docs/` for D03 in either format:
  - `D03-common-data-model.md` (`103`'s markdown form) → this is an engine switch. Confirm it's
    intentional with the user, then translate its content into GraphQL — don't discard it, and
    don't leave both forms in place afterward.
  - `D03-common-data-model/` (this skill's folder) → treat as a draft to update.

  Read D01 and D02 when present. For an existing repo, use `@explore` to find models, schemas, type
  definitions, or a real GraphQL API — as evidence only. A live API's resolvers, N+1 concerns, or
  pagination are not domain facts.

- [ ] **Step 3: Identify and classify entities, and resolve structure.** For each entity: domain
  purpose, attributes and types, required (`!`) vs optional, relationships and cardinality,
  entity-vs-value-object status (see the identity test below), and whether any plural cross-entity
  relationship is really many-to-many and needs a join type. Also decide:
  - **Domain split** — default to a single domain named after the project. Split into domain
    subfolders only on a clear signal: distinct services, distinct team ownership, or the user
    describing separate bounded contexts. Don't ask by default.
  - **Roles** — finalize the `Role` enum's values from Required Input 6.

- [ ] **Step 4: Draft the files** from `./templates/`:
  - `_directives.graphql` (from `T03-directives.template.graphql`) — copy as-is except the `Role`
    enum values. Everything else (`@access`, `@validate`, `AccessLevel`, `AccessRule`, placeholder
    `Query`/`Mutation` roots) is fixed boilerplate; don't hand-edit it per domain except to extend
    the vocabulary (below).
  - One `OVERVIEW.md` per domain (from `T03-OVERVIEW.template.md`) — at the D03 root for a single
    domain; a root index plus one per domain subfolder otherwise. Holds only what the schema can't:
    the domain summary and cross-field/cross-entity business rules. Entity, relationship, access, and
    field-constraint detail live only in `schema.graphql`, to avoid drift.
  - One `schema.graphql` per domain (from `T03-schema.template.graphql`) — replace the example
    entities with the project's real ones, following the conventions below.
  - `.gitignore` (from `T03-gitignore`) — copy once to the D03 root.

  ```
  .specflow/docs/D03-common-data-model/
    .gitignore
    _directives.graphql
    OVERVIEW.md
    <domain>/          # omitted for single-domain projects
      OVERVIEW.md
      schema.graphql
  ```

- [ ] **Step 5: Quality check.** Confirm:
  - each entity is defined once, with unambiguous entity-vs-value-object status
  - every important relationship is present, including many-to-many join types
  - business rules are domain rules, not implementation constraints
  - sensitive attributes carry `@validate(sensitivity: ...)`
  - any project-specific `@validate` argument or new directive is documented at its declaration
  - everything meant to be read in the visualizer uses `"""..."""` descriptions; `#` comments are
    author-only and invisible to introspection
  - mutations use `extend type Mutation`, never `type Mutation`
  - unclear rules, relationships, or roles are named as open questions, not guessed
  - **the schema parses**: run the generator (see Visualizing). A build failure is a real defect in
    the authored SDL and must be fixed before this step is done.

- [ ] **Step 6: Write and summarize.** Write the folder, list entities per domain, call out open
  questions, give the command to regenerate the visualization, and suggest
  `104-backend-architecture` next.

---

## Schema Conventions

**Directive vocabulary.** Exactly two directives, both declared in `_directives.graphql`, whose
inline descriptions are the full argument reference. Decorate a type or field only when it deviates
from a sensible default; a plain field stays bare.

- `@access(rules: [AccessRule!]!)` — on a type (default for all its fields) or a field (overrides
  the type; field-level always wins). `AccessRule` pairs a `Role` with an `AccessLevel`
  (`READ_WRITE` / `READ_ONLY` / `NONE`). Prefer entity-level; drop to field-level only for genuine
  exceptions such as PII on an otherwise-normal type.

  ```graphql
  type Customer @access(rules: [{ role: ADMIN, level: READ_WRITE }, { role: USER, level: READ_ONLY }]) {
    id: ID!
    ssn: String @access(rules: [{ role: ADMIN, level: READ_ONLY }, { role: USER, level: NONE }])
  }
  ```

- `@validate(...)` — field-level typed constraints (string length/pattern/format/substring, numeric
  ranges and `multipleOf`, list item counts, and `sensitivity`). Include only arguments that apply to
  the field's type.

  ```graphql
  email: String! @validate(format: "email", sensitivity: "pii")
  quantity: Int! @validate(min: 1)
  ```

  There is no `@entity` directive and no `required` argument: domain (folder location) and
  required-ness (`!`) are already expressed natively, and a directive repeating the schema can drift
  from it. Likewise, entity-vs-value-object status is never a directive.

**Extending the vocabulary.** Never invent a one-off directive or argument; pick the right extension
point, edit the project's own `_directives.graphql` (never this skill's template), and document the
addition at its declaration — an undocumented argument is worse than none.

- **New single-field "is this input valid?" constraint** → add a typed argument to `@validate`
  (e.g. `equals: String`, `oneOf: [String!]` for a set too small for an enum, `divisibleBy: Int`),
  stating its meaning and applicable field types.
- **New semantic category that isn't an input constraint** → add a new directive, but only if the
  category recurs across fields or entities; a one-off note goes in the field's `"""..."""`
  description. Canonical example, a derived field:

  ```graphql
  """Marks a field as derived from sibling fields rather than stored. `from` names the fields read;
  `description` states the derivation (distinct from the field's own description of what it means)."""
  directive @computed(from: [String!]!, description: String!) on FIELD_DEFINITION

  type Order {
    id: ID!
    lineItems: [LineItem!]!
    """Grand total across every line item."""
    totalCents: Int! @computed(from: ["lineItems"], description: "Sum of unitPriceCents * quantity across all lineItems.")
  }
  ```

- **Rule spanning multiple fields or entities** (e.g. "an order must have at least one line item")
  → `OVERVIEW.md`'s Business Rules, not a directive.

**Identity test.** A nested type with its own `id` is a first-class entity (own table/collection
candidate); without `id` it is a value object that embeds with its parent (document/JSON-blob
candidate). The presence of `id` is the only signal.

```graphql
"""No independent identity — embeds with its parent."""
type Address { line1: String! city: String! }

"""Independently meaningful — gets its own identity."""
type LineItem { id: ID! sku: String! }
```

**Many-to-many.** Give it an explicit join type with its own `id` instead of bare lists on each
side, which hide the relationship:

```graphql
type CustomerTag { id: ID! customer: Customer! tag: Tag! assignedAt: String! }
```

**Mutations.** Single input object in, single payload out, always attached with `extend`:

```graphql
input UpdateCustomerInput { id: ID! email: String }
type UpdateCustomerPayload { customer: Customer errors: [String!] }
extend type Mutation { updateCustomer(input: UpdateCustomerInput!): UpdateCustomerPayload! }
```

**Other conventions** (also signals for later physical modeling): singular type names (`Customer`);
`SCREAMING_SNAKE_CASE` enum values (a bounded set → check constraint or lookup table); list fields
with pagination arguments (`first`, `after`) signal a high-volume access pattern → index candidate
(relational) or own top-level collection (NoSQL).

**Cross-domain references.** Reference a type from another domain by name with a
`# defined in ../<domain>/schema.graphql` comment — no stub type. No single file is valid SDL alone,
which is fine: the generator concatenates every `*.graphql` under the D03 folder before validating.

---

## Visualizing

From this skill's `scripts/` folder:

```
cd <path-to-this-skill>/scripts
npm install
node generate-voyager.mjs <path-to-the-project's-D03-common-data-model-folder>
```

This writes `build/introspection.json` and `build/voyager.html` in the project's D03 folder
(gitignored by Step 4's `.gitignore`). `npm install` writes only into this skill's `scripts/` folder,
needs to run once, and is harmless to rerun. Open `build/voyager.html` in a browser. Because the
placeholder `Query` root would render as an empty box, the generator starts Voyager at the first
first-class entity (first object type with an `id`, in file order) and logs which one; a hint bar
points to the dropdown at the bottom of the page for jumping to any other entity.
