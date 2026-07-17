<!--
INSTRUCTION BLOCK — remove before committing

This template covers two cases:

- Single domain (the default — most projects start here, and stay here unless there's
  a clear bounded-context signal): this file IS the domain overview. Fill in the
  Domain and Entities sections directly, and skip the Domains table.
- Multiple domains (only when the project genuinely has separate bounded contexts):
  this file becomes the root index instead. Keep it short — name each domain, a
  one-line description, and a link to `<domain>/README.md`, which then uses this same
  template shape for its own overview. Field-level detail never lives here, only in
  the schema files, to avoid drift between duplicated descriptions.

Remove this instruction block when the document is complete.
-->

# Common Data Model — GraphQL

**Purpose**: This document defines the domain entities of the application as GraphQL
SDL — a documentation-only schema, never deployed as an API. It is the single
authoritative reference for the application's domain concepts, entity relationships,
access rules, and data quality rules. Downstream documents (backend architecture, API
design, frontend state, data access patterns) align to this model.

**Roles**: *(List the access roles resolved via gap-check, e.g. ADMIN, USER — these
back the `Role` enum in [`_directives.graphql`](./_directives.graphql).)*

---

## Domain: <DomainName>

*(Single-domain case: one or two sentences on what this domain covers, then go
straight to Entities below.)*

<!-- Multi-domain case: replace the section above with this one instead —

## Domains

| Domain | Description |
|--------|--------------|
| [`<domain>`](./<domain>/README.md) | One-line description |

-->

## Entities

| Entity | Type | Description | Schema |
|--------|------|--------------|--------|
| `EntityName` | Entity / Value object / Join type | One-sentence purpose | [`schema.graphql`](./schema.graphql) |

> **Type column**: *Entity* = has its own `id`, independently meaningful — own
> table/collection candidate. *Value object* = no `id`, embeds with its parent —
> document/JSON-blob candidate. *Join type* = an entity that exists to make a
> many-to-many relationship explicit. No directive marks any of this — it's read
> straight off whether the type has an `id` field in `schema.graphql`.

---

## Visualizing

```
cd <path-to-this-skill>/scripts && npm install && node generate-voyager.mjs <path-to-this-D03-folder>
```

Opens `build/voyager.html` (gitignored) in a browser — an interactive diagram of
every entity and relationship across every domain, built from the combined schema.
`npm install` only writes into the skill's own `scripts/` folder and only needs to
run once; it never touches this project.

Voyager opens on an empty placeholder `Query` type by design (this CDM has no real
root query — list fields live on the entities themselves). Use the root-type dropdown
at the bottom of the page to switch to any real entity and explore from there.

---

## Open Questions

- [ ] *(Domain-level open questions that don't belong in a specific entity's
  description.)*
