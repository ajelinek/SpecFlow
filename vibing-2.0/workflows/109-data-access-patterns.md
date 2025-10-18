# Workflow: 109 - Data Access Patterns and Objects

**Objective**: Create the `09 - Data Access Patterns and Objects.md` document that defines data access patterns, derived data objects, and API data structures required to support optimal user experience across all UI pages. This workflow analyzes UI flows to identify data requirements and bridges the gap between persisted data models and UI data needs.

## Agents

- @agents/data-architect.md
- @agents/frontend-architect.md
- @agents/backend-architect.md
- @agents/product-manager.md

## Template

- @templates/09 - Data Access Patterns and Objects.md

## Rules

- @rules/common/response-formatting.md
- @rules/common/user-clarification.md
- @rules/common/data-attribute-naming-conventions.md

## Context Files

- `_docs/design/01 - Project Overview.md`
- `_docs/design/02 - System Architecture.md`
- `_docs/design/03 - Data Model.md`
- `_docs/design/05 - Frontend Architecture.md`
- `_docs/design/06 - UI Design.md`
- `_docs/ui-flows/*.md` (all UI flow markdown documents)

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @rules/common/user-clarification.md

### Validation Questions

1. **Performance Requirements**: What are the performance requirements for data access (response times, concurrent users)?
2. **Real-time Requirements**: Do any UI pages require real-time data updates?
3. **Search Requirements**: Do any UI pages require search functionality?
4. **Aggregation Requirements**: Do any UI pages display calculated or aggregated data?
5. **Access Control**: What are the data access control requirements across different user types?
6. **Caching Strategy**: What caching approach is preferred (client-side, server-side, database-level)?

---

## Execution Checklist

### 1. Invoke Data Architect Agent

- [ ] Activate @agents/data-architect.md persona
- [ ] Review `_docs/design/03 - Data Model.md` for current persisted data structure
- [ ] Consult with @agents/frontend-architect.md for UI data consumption patterns
- [ ] Consult with @agents/backend-architect.md for API design patterns

### 2. Analyze UI Flow Data Requirements

- [ ] Review all UI flow documents in `_docs/ui-flows/` directory
- [ ] Extract data attributes from each page's "Data Attributes & Requirements" section
- [ ] Identify common data patterns across multiple pages
- [ ] Map UI data needs to current data model entities
- [ ] Identify gaps between UI requirements and current data model

#### Data Access Pattern Analysis Considerations

**Single Entity Patterns**:

- Direct entity lookup by ID or unique field
- Entity with related data pre-loaded
- Entity with computed/derived attributes

**Collection Patterns**:

- Filtered lists with specific criteria
- Paginated results for large datasets
- Search results with full-text or field matching
- Sorted collections by specific criteria

**Aggregation Patterns**:

- Dashboard statistics from multiple entities
- Activity feeds with time-ordered events
- Summary views with condensed information
- Report data with complex aggregations

**Performance Considerations**:

- Avoid N+1 query problems
- Minimize over-fetching and under-fetching
- Design for critical path loading
- Implement appropriate caching strategies

### 4. Generate Data Access Patterns Document

- [ ] Use @templates/09 - Data Access Patterns and Objects.md template structure
- [ ] Populate all 5 sections with specific technical details based on UI flow analysis
- [ ] Define core data access patterns identified from UI requirements
- [ ] Create data object tables with field definitions, sources, and derivation logic
- [ ] Identify data model gaps between UI needs and current data model
- [ ] Define performance optimization strategies for identified query patterns
- [ ] Establish real-time data requirements based on UI interaction needs

### 5. Apply Quality Standards

- [ ] Verify all data access patterns support business requirements and user experience goals
- [ ] Validate performance requirements are addressed with appropriate strategies
- [ ] Ensure data security and access control are comprehensive
- [ ] Confirm derived data objects optimize UI performance and user experience

---

## Post-Validation Checklist

- [ ] All 5 template sections populated with specific technical details
- [ ] Data access patterns clearly defined based on UI flow analysis
- [ ] Data object tables created with field definitions, sources, and derivation logic
- [ ] Data model gaps identified with proposed solutions
- [ ] Performance optimization strategies identified for query patterns
- [ ] Real-time data requirements defined with appropriate delivery methods
- [ ] Each data object has its own table with clear field definitions
- [ ] Document aligns with system architecture, data model, and frontend architecture
- [ ] Store completed document in `_docs/design/09 - Data Access Patterns and Objects.md`

---

## Success Criteria

Complete when all pre-flight validation requirements are met, Data Architect agent has analyzed all UI flows, generated complete data access patterns and objects documentation, and document is stored in `_docs/design/09 - Data Access Patterns and Objects.md`.
