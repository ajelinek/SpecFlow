## Normalization Standards

### Third Normal Form (3NF) Compliance

- All non-key attributes must be functionally dependent only on the primary key
- No transitive dependencies allowed
- Eliminate redundant data across tables
- Use junction tables for many-to-many relationships

### Denormalization Guidelines

- Only denormalize for proven performance requirements
- Document performance justification for denormalization
- Maintain data consistency through application logic or triggers
- Consider read replicas for reporting queries

## Naming Conventions

See @rules/common/data-attribute-naming-conventions.md for comprehensive naming standards.

## Data Types & Standards

### Primary Keys

- Use UUID for all primary keys
- Never use auto-incrementing integers

### Timestamps

- Use `TIMESTAMPTZ` (TIMESTAMP WITH TIME ZONE) for all date/time fields
- Standard timestamp fields:
  - `insert_timestamp` - record creation time
  - `update_timestamp` - last modification time
  - `end_timestamp` - soft delete timestamp (nullable)

### Text Fields

- Use `VARCHAR(n)` for strings with known maximum length (PostgreSQL best practice)
- Use `TEXT` for variable-length strings without length constraints
- Avoid `CHAR` unless fixed-length strings are required
- Use `JSONB` for structured data that needs querying

### Numeric Fields

- Use `DECIMAL` for monetary values
- Use `INTEGER` for counts and IDs
- Use `BIGINT` for large numbers or when in doubt

## Audit & System History

### Required Audit Fields

Every table MUST include:

```sql
insert_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
update_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
upsert_by_user_id NTEGER REFERENCES users(user_id)
```

### Soft Deletes

- Use `end_timestamp` for soft deletes
- Include `upsert_by_user_id` INTEGER when implementing soft deletes
- Create partial indexes on non-deleted records
- Implement cascade soft deletes for related records

### System History Tables

- If system history is needed follow Bi-Temporal best practices with a history table along with start and end timestamps where the end timestamp is high values for the active row.

## Referential Integrity

### Foreign Key Constraints

- All foreign keys MUST have explicit constraints
- Use appropriate cascade behaviors:
  - `CASCADE` for dependent data
  - `RESTRICT` for critical relationships
  - `SET NULL` for optional relationships
- Never use `SET DEFAULT` for foreign keys

### Unique Constraints

- Enforce uniqueness at database level, not just application level
- Create unique indexes for performance
- Use composite unique constraints for business rules
- Document uniqueness requirements clearly

## Query Optimization

- Design for common query patterns
- Avoid N+1 query problems
- Use appropriate JOIN types
- Consider materialized views for complex aggregations

## Schema Evolution

- Version all schema changes
- Write reversible migrations
