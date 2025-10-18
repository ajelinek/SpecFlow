# Workflow: 103 - Data Model Generation

**Objective**: Create the `03 - Data Model.md` document that details the persisted data model, including entities, their attributes, relationships, and constraints. This focuses solely on the data structure and relationships independent of access patterns or user experience.

## Agents

- @agents/data-architect.md
- @agents/system-architect.md

## Template

- @templates/03 - Data Model.md

## Rules

- @rules/common/response-formatting.md
- @rules/common/user-clarification.md

## Context Files

- `_docs/design/01 - Project Overview.md`
- `_docs/design/02 - System Architecture.md`

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @rules/common/user-clarification.md

### Validation Questions

1. **Core Business Entities**: What are the main business entities that need to be stored (users, projects, orders, etc.)?
2. **Entity Relationships**: How do these entities relate to each other (one-to-many, many-to-many, etc.)?
3. **Data Attributes**: What specific attributes does each entity need (name, email, status, dates, etc.)?
4. **Business Rules**: What are the business rules and constraints for each entity (required fields, value ranges, uniqueness)?
5. **Data Volume**: What are the expected data volumes and growth patterns?
6. **Sensitive Data**: What data is considered sensitive and requires special protection?
7. **Data Retention**: How long should different types of data be retained?
8. **Data Validation**: What validation rules need to be enforced at the data level?
9. **Audit Requirements**: Do you need to track who changed what data and when?
10. **Compliance Requirements**: Are there specific compliance requirements (GDPR, HIPAA, etc.)?
11. **Data Migration**: Do you have existing data that needs to be migrated?
12. **Data Archival**: How should old or inactive data be handled?

---

## Execution Checklist

### 1. Invoke Data Architect Agent

- [ ] Activate @agents/data-architect.md persona
- [ ] Review `_docs/design/01 - Project Overview.md` for business entities and requirements
- [ ] Review `_docs/design/02 - System Architecture.md` for technical constraints
- [ ] Consult with @agents/system-architect.md for architecture alignment

### 2. Research Data Modeling Patterns

- [ ] Verify data modeling patterns and performance optimization techniques

### 3. Generate Data Model

- [ ] Use @templates/03 - Data Model.md structure
- [ ] Populate all 7 sections with specific technical details focused on persisted data
- [ ] Ensure data model supports business requirements and system architecture
- [ ] Create Mermaid ERD diagram for entity relationships

### 4. Apply Quality Standards

- [ ] Verify all entities have clear business purpose
- [ ] Validate relationships support business workflows
- [ ] Confirm security and privacy requirements are addressed

---

## Post-Validation Checklist

- [ ] All 7 template sections populated with specific technical details focused on persisted data
- [ ] Entity relationships clearly defined with proper constraints
- [ ] Data constraints and business rules documented
- [ ] Security and privacy measures defined for sensitive data
- [ ] Data lifecycle and schema management documented
- [ ] Mermaid ERD diagram accurately represents entity relationships
- [ ] Data model aligns with system architecture and business requirements
- [ ] Store completed document in `_docs/design/03 - Data Model.md`

---

## Success Criteria

Complete when all pre-flight validation requirements are met, Data Architect agent has generated complete persisted data model with ERD diagram, and document is stored in `_docs/design/03 - Data Model.md`.
