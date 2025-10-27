## Document Structure Standards

### Document Design Principles

- Design documents for your application's read patterns, not write patterns
- Keep documents as small as possible while maintaining logical cohesion
- Avoid deeply nested structures (max 3-4 levels deep)
- Use subcollections for hierarchical data that grows unbounded
- Denormalize data that is read together frequently

### Document Size Limits

- Maximum document size: 1MB
- Maximum field name length: 1,500 bytes
- Maximum field value length: 1,048,487 bytes
- Maximum array size: 20,000 elements
- Maximum map depth: 20 levels

## Naming Conventions

See @vibing/rules/common/data-attribute-naming-conventions.md for comprehensive naming standards.

## Data Types & Standards

### Document IDs

- Use meaningful strings when possible
- Use UUIDs for sensitive data or when uniqueness is critical
- Use composite keys for hierarchical data
- Never use auto-incrementing numbers

### Text Fields

- Use strings for all text data
- No length constraints (handled by Firestore limits)
- Use structured data for complex text relationships

### Numeric Fields

- Use numbers for all numeric data
- Use integers for counts and IDs
- Use doubles for decimal values
- Use longs for large numbers

### Complex Data Types

- Use maps for structured data
- Use arrays for lists of similar items that don't need to be updated individually
- Use references for document relationships
- Use GeoPoints for location data

## Document Relationships

### One-to-One Relationships

- Embed data when it's always accessed together
- Use references when data is accessed independently
- Consider data size and update frequency

### One-to-Many Relationships

- Use subcollections for unbounded relationships
- Use arrays for small, bounded relationships
- Use references for large, independent datasets

### Many-to-Many Relationships

- Use junction documents in separate collections
- Denormalize frequently accessed data
- Consider using arrays for small, stable relationships

### Hierarchical Data

- Use subcollections for tree-like structures
- Use parent references for navigation
- Consider materialized paths for complex queries

## Query Optimization

### Indexing Strategy

- Design for your most common query patterns
- Use composite indexes for multi-field queries
- Avoid queries that require multiple index scans
- Use array-contains-any sparingly (expensive operation)

### Query Patterns

- Use equality filters before range filters
- Use limit() to reduce data transfer
- Use orderBy() on indexed fields only
- Avoid queries that scan entire collections

### Pagination

- Use cursor-based pagination with startAfter()
- Avoid offset-based pagination for large datasets
- Use limit() to control page size
- Consider using real-time listeners for live data

## Data Consistency

### Transaction Patterns

- Use transactions for atomic operations
- Keep transactions small and fast
- Avoid long-running transactions
- Use batch writes for multiple operations

## Security & Access Control

### Security Rules

- Write comprehensive security rules
- Use custom claims for role-based access
- Validate data structure in rules
- Test security rules thoroughly

### Data Access Patterns

- Implement least-privilege access
- Use subcollections for data isolation
- Consider data residency requirements

## Performance Optimization

### Data Transfer Optimization

- Minimize document size
- Use field selection in queries
- Consider using Cloud Functions for data aggregation

## Schema Evolution

### Versioning Strategy

- Plan for schema changes from the start
- Use version fields in documents
- Implement backward compatibility
- Document migration strategies

## Best Practices Summary

- Design for read patterns, not write patterns
- Keep documents small and focused
- Use appropriate data types and structures
- Implement proper security and validation
- Plan for schema evolution and data migration
- Use transactions and batch operations appropriately
