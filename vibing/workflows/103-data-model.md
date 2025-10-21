# Workflow: 103 - Data Model Generation

**Objective**: Create the `D03 - Data Model.md` document that details the persisted data model, including entities, their attributes, relationships, and constraints. This focuses solely on the data structure and relationships independent of access patterns or user experience.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

## Validation Questions

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

## Agents to Invoke

- [ ] Activate @agents/data-architect.md persona
- [ ] Consult with @agents/system-architect.md for architecture alignment

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business entities and requirements
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints

## Execute Checklist

**Content Creation**

- [ ] Use @templates/T03 - Data Model.md structure
- [ ] Populate all 7 sections with specific technical details focused on persisted data
- [ ] Create Mermaid ERD diagram for entity relationships

**Quality Assurance**

- [ ] Verify data modeling patterns and performance optimization techniques
- [ ] Verify all entities have clear business purpose
- [ ] Validate relationships support business workflows
- [ ] Confirm security and privacy requirements are addressed
- [ ] Entity relationships clearly defined with proper constraints
- [ ] Data constraints and business rules documented
- [ ] Security and privacy measures defined for sensitive data
- [ ] Data model aligns with system architecture and business requirements

**Completion**

- [ ] Store completed document in `_docs/design/D03 - Data Model.md`

**Note**: All responses should follow @fragments/response-formatting.md
