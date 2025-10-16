## Naming Convention Standards

### Technology Conventions

- **camelCase** - JavaScript/TypeScript, Java/C#, Go (exported), NoSQL/Document fields, GraphQL fields, REST JSON properties
- **snake_case** - Python, Rust, SQL/Relational tables and columns, NoSQL collections
- **PascalCase** - Java/C#/Rust/GraphQL types and classes
- **kebab-case** - REST API URLs

## Naming Principles

### Core Principles

- Use descriptive, context-specific names that clearly indicate content
- **NEVER use generic `id`** - always use entity-specific names:
  - `userId` not `id`
  - `projectId` not `id`
  - `clientId` not `id`
- Avoid abbreviations unless universally understood
- Make relationships and context explicit in names

### Descriptive Naming Best Practices

#### Action-based Naming

Use verbs to describe what the field represents:

- `upsertByUserId` (who performed the upsert operation)
- `assignedToUserId` (who the record is assigned to)
- `approvedByUserId` (who approved the record)

#### Context-specific Naming

Include business context in the name:

- `billingAddressId` not `addressId`
- `shippingAddressId` not `addressId`
- `primaryContactUserId` not `contactId`

#### State-based Naming

Clearly indicate the state or status:

- `isActive` not `active`
- `hasPermission` not `permission`
- `canEdit` not `edit`

#### Relationship Clarity

Make relationships explicit:

- `parentProjectId` not `parentId`
- `childTaskId` not `childId`
- `relatedDocumentId` not `relatedId`

## Field Type Conventions

### Boolean Fields

- Use `is`, `has`, `can` prefixes
- Examples: `isActive`, `hasPermission`, `canEdit`, `isEnabled`, `hasAccess`

### Timestamp Fields

- Use descriptive suffixes
- Standard fields: `insertTimestamp`, `updateTimestamp`, `endTimestamp`

### Identifier Fields

- Use entity-specific names with appropriate suffixes
- Examples: `userId`, `projectId`, `clientId`

### Foreign Key Fields

- Match the referenced table's primary key name
- Examples: `userId` references `users(userId)`

## Collection/Table Naming

- Use plural nouns (e.g., `users`, `projects`, `tasks`)
- Use descriptive, business-context names
- Prefix system collections/tables with `_` (e.g., `_system_config`)
- Prefix readonly tables with `summary_` or `metric_`
- Prefix lookup tables with `lookup_` (e.g., `lookup_status_types`)

## Constraint Naming

- Use descriptive constraint names: `fk_users_organization_id`
- Include table and column in constraint name
- Use consistent prefixes: `pk_`, `fk_`, `uk_`, `ck_`

## API Naming

- **REST**: kebab-case for URLs, camelCase for JSON properties
- **GraphQL**: camelCase for fields, PascalCase for types
- Use plural nouns for collections: `/users`, `/projects`
