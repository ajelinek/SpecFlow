# Workflow: 109 - Data Access Patterns and Objects

**Objective**: Create the `09 - Data Access Patterns and Objects.md` document that defines how data is accessed, transformed, and consumed throughout the application. This includes API patterns, internal data objects, query optimization, and user experience data flows.

## Agents

- @agents/data-architect.md
- @agents/frontend-architect.md
- @agents/backend-architect.md

## Template

- @templates/09 - Data Access Patterns and Objects.md

## Rules

- @rules/common/response-formatting.md
- @rules/common/user-clarification.md

## Context Files

- `_docs/design/01 - Project Overview.md`
- `_docs/design/02 - System Architecture.md`
- `_docs/design/03 - Data Model.md`

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @rules/common/user-clarification.md

1. **Primary Query Patterns**: What are the most frequent data access patterns (get user by email, list tasks by project, etc.)?
2. **Performance Requirements**: What are the performance requirements for data access (response times, concurrent users)?
3. **API Design**: What API patterns will be used (REST, GraphQL, tRPC) and how will data be structured?
4. **Data Transformation**: How will persisted data be transformed for different use cases (UI display, API responses, etc.)?
5. **Caching Strategy**: What data should be cached and at what levels (database, API, client)?
6. **Real-time Requirements**: Do you need real-time data synchronization or can data be eventually consistent?
7. **Data Aggregation**: Do you need pre-computed or aggregated data for reporting or dashboards?
8. **Search Requirements**: Do you need full-text search capabilities on any data?
9. **Access Control**: How will data access be controlled at the API and UI levels?
10. **Error Handling**: How will data access errors be handled and communicated?

---

## Execution Checklist

### 1. Invoke Data Architect Agent

- [ ] Activate @agents/data-architect.md persona
- [ ] Review `_docs/design/03 - Data Model.md` for persisted data structure
- [ ] Consult with @agents/frontend-architect.md for UI data needs
- [ ] Consult with @agents/backend-architect.md for API patterns

### 2. Research Data Access Patterns

- [ ] Use web search for latest data access patterns and best practices
- [ ] Use context7 for API framework documentation
- [ ] Verify caching and performance optimization techniques

### 3. Generate Data Access Patterns Document

- [ ] Use @templates/09 - Data Access Patterns and Objects.md structure
- [ ] Populate all sections with specific technical details
- [ ] Ensure patterns support business requirements and user experience
- [ ] Define internal data objects and transformation patterns

### 4. Apply Quality Standards

- [ ] Verify all access patterns support business workflows
- [ ] Validate performance requirements are addressed
- [ ] Confirm error handling and edge cases are covered

---

## Post-Validation Checklist

- [ ] All template sections populated with specific technical details
- [ ] Data access patterns clearly defined with performance considerations
- [ ] Internal data objects and transformation patterns documented
- [ ] Caching strategy defined for optimal performance
- [ ] API patterns and data structures documented
- [ ] Error handling and edge cases addressed
- [ ] Document aligns with system architecture and data model
- [ ] Store completed document in `_docs/design/09 - Data Access Patterns and Objects.md`

---

## Success Criteria

Complete when all pre-flight validation requirements are met, Data Architect agent has generated complete data access patterns and objects documentation, and document is stored in `_docs/design/09 - Data Access Patterns and Objects.md`.

---

## Note

This workflow will be implemented after the core data model (103) is complete. It focuses on how the persisted data is accessed, transformed, and consumed rather than the data structure itself.
