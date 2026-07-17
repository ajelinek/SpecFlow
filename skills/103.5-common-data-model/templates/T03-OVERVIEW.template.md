<!--
INSTRUCTION BLOCK — remove before committing

This file holds the domain knowledge schema.graphql can't express on its own:
what the domain is, and business rules that span multiple fields or entities.
Entity, relationship, access-rule, and field-constraint detail all live only in
schema.graphql — never duplicated here, to avoid drift.

- Single domain (the default — most projects start here, and stay here unless
  there's a clear bounded-context signal): this file IS the domain overview. Fill
  in Domain and Business Rules directly, skip the Domains table.
- Multiple domains (only when the project genuinely has separate bounded
  contexts): this file becomes the root index instead. Keep it short — name each
  domain, a one-line description, and a link to `<domain>/OVERVIEW.md`, which
  then uses this same template for its own overview.

Remove this instruction block when the document is complete.
-->

# <DomainName>

*(One or two sentences: what this domain covers.)*

<!-- Multi-domain case: replace the section above with this one instead —

## Domains

| Domain | Description |
|--------|--------------|
| [`<domain>`](./<domain>/OVERVIEW.md) | One-line description |

-->

## Business Rules

*(Rules a domain expert would recognize as true that don't map to a single field
or directive in schema.graphql — e.g. "An order must have at least one line
item." Field-level constraints belong in schema.graphql as `@validate`, not
here.)*

- ...

## Open Questions

- [ ] *(Domain-level open questions that don't belong to one entity or business
  rule.)*
