# Workflow: 109 - Data Access Patterns and Objects

**Objective**: Create the `D09 - Data Access Patterns and Objects.md` document that defines data access patterns, derived data objects, and API data structures required to support optimal user experience across all UI pages. This workflow analyzes UI flows to identify data requirements and bridges the gap between persisted data models and UI data needs.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

## Validation Questions

1. **Real-time Requirements**: Do any UI pages require real-time data updates?
2. **Search Requirements**: Do any UI pages require search functionality?
3. **Aggregation Requirements**: Do any UI pages display calculated or aggregated data?
4. **Access Control**: What are the data access control requirements across different user types?

## Agents to Invoke

- [ ] Activate @vibing/agents/data-architect.md persona
- [ ] Consult with @vibing/agents/frontend-architect.md for UI data consumption patterns
- [ ] Consult with @vibing/agents/backend-architect.md for API design patterns

## Design Context

- [ ] Review `_docs/design/D03 - Data Model.md` for current persisted data structure

## Execute Checklist

**Analysis Phase**

- [ ] Review all UI flow documents in `_docs/ui-flows/` directory
- [ ] Extract data attributes from each page's "Data Attributes & Requirements" section
- [ ] Identify common data patterns across multiple pages
- [ ] Map UI data needs to current data model entities
- [ ] Identify gaps between UI requirements and current data model

**Content Creation**

- [ ] Use @vibing/templates/T09 - Data Access Patterns and Objects.md template structure
- [ ] Populate all 4 sections with specific technical details based on UI flow analysis
- [ ] Define core data access patterns identified from UI requirements (including pagination/filter conventions)
- [ ] Create data object tables with field definitions, sources, and derivation logic
- [ ] Establish real-time data requirements based on UI interaction needs

**Quality Assurance**

- [ ] Identify data model gaps between UI needs and current data model
- [ ] Define performance optimization strategies for identified query patterns
- [ ] Verify all data access patterns support business requirements and user experience goals
- [ ] Validate performance requirements are addressed with appropriate strategies
- [ ] Ensure data security and access control are comprehensive
- [ ] Confirm derived data objects optimize UI performance and user experience
- [ ] Data access patterns clearly defined based on UI flow analysis
- [ ] Data object tables created with field definitions, sources, and derivation logic
- [ ] Each data object has its own table with clear field definitions
- [ ] Document aligns with system architecture, data model, and frontend architecture

**Completion**

- [ ] Store completed document in `_docs/design/D09 - Data Access Patterns and Objects.md`

**Note**: All responses should follow the response formatting guidelines in AGENTS.md
