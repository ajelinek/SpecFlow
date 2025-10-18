# Workflow: 203 - Implementation Design Generation

**Objective**: Create detailed technical implementation specifications that define specific code changes, types, functions, and design approaches required to satisfy feature requirements and test scenarios while ensuring architectural consistency and code quality.

## Agents

- @agents/frontend-engineer.md (Drives frontend changes)
- @agents/backend-engineer.md (Drives backend changes)
- @agents/data-engineer.md (Drives database/schema changes)
- @agents/technical-architect.md (Validates and ensures consistency)

## Template

- @templates/11 - Technical Design.md

## Rules

- @rules/common/general-rules.md
- @rules/common/typescript-guidelines.md
- @rules/common/error-handling-guidelines.md
- @rules/common/test-general.md
- @rules/common/test-e2e.md
- @rules/common/ui-component-guidelines.md
- @rules/common/ui-project-structure.md
- @rules/common/ui-data-store-architecture.md
- @rules/common/data-attribute-naming-conventions.md
- @rules/apollo/apollo-client-guidelines.md
- @rules/apollo/apollo-server-guidelines.md
- @rules/apollo/apollo-store-architecture.md
- @rules/react/react-component-guidelines.md
- @rules/react/react-state-management.md
- @rules/solid.js/solidjs-component-guidelines.md
- @rules/solid.js/solid-state-management.md
- @rules/astro.js/astro-component-guidelines.md
- @rules/astro.js/astro-project-structure.md

## Context Files

- `_docs/design/01 - Project Overview.md`
- `_docs/design/02 - System Architecture.md`
- `_docs/design/03 - Data Model.md`
- `_docs/design/04 - Backend Architecture.md`
- `_docs/design/05 - Frontend Architecture.md`
- `_docs/design/06 - UI Design.md`
- '\_docs/design/ui-flows/\* (for the specific page in scope)
- `_docs/features/in-progress/*` - Current feature being designed
- All `*/AGENT.md` files - Implementation patterns and architectural context across all project packages

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Validation Questions

1. **Feature Context**: What specific feature is being designed for implementation?
2. **Test Scenarios**: Are Gherkin test scenarios already defined for this feature?
3. **Architecture Alignment**: How does this feature align with existing system architecture?
4. **Integration Points**: What are the key integration points with existing components?
5. **Data Requirements**: What data model changes or new data access patterns are needed?
6. **API Requirements**: What new API endpoints or modifications are required?
7. **UI Components**: What new UI components or modifications are needed?
8. **Security Considerations**: What security measures need to be implemented?

---

## Execution Checklist

### 1. Invoke Technical Architect Agent (Primary)

- [ ] Activate @agents/technical-architect.md persona as workflow driver
- [ ] Review all context files to understand current architecture and patterns
- [ ] Analyze feature requirements and test scenarios
- [ ] Coordinate with specialized engineer agents for implementation details
- [ ] Validate implementation plan against architectural constraints

### 2. Coordinate with Specialized Engineer Agents

#### Frontend Engineer Coordination

- [ ] Activate @agents/frontend-engineer.md for frontend implementation details
- [ ] Review `_docs/design/05 - Frontend Architecture.md` for component patterns
- [ ] Review `UI/AGENT.md` for existing frontend patterns
- [ ] Define new UI components and state management requirements
- [ ] Ensure no duplication of existing frontend functionality

#### Backend Engineer Coordination

- [ ] Activate @agents/backend-engineer.md for backend implementation details
- [ ] Review `_docs/design/04 - Backend Architecture.md` for service patterns
- [ ] Review `API/AGENT.md` for existing backend patterns
- [ ] Define new API endpoints and business logic requirements
- [ ] Ensure no duplication of existing backend functionality

#### Data Engineer Coordination

- [ ] Activate @agents/data-engineer.md for data layer implementation details
- [ ] Review `_docs/design/03 - Data Model.md` for data requirements
- [ ] Review `API/AGENT.md` for existing data patterns
- [ ] Define schema changes and data access patterns
- [ ] Ensure no duplication of existing data functionality

### 4. Generate Implementation Design

- [ ] Use @templates/11 - Technical Design.md structure
- [ ] Populate Change Summary Table with all required modifications
- [ ] Define detailed implementation specifications for each component using module/function format
- [ ] Ensure all test scenarios are addressed in implementation details
- [ ] Validate implementation against architectural constraints
- [ ] Verify Change Summary Table completeness and accuracy
- [ ] Ensure implementation details focus on WHAT and WHY, not HOW

### 5. Validate Implementation Changes

#### Change Summary Table Validation

- [ ] Every entry in Change Summary Table has corresponding implementation details
- [ ] No duplicate entries for the same file/function across the table
- [ ] All changes trace back to test scenarios and business requirements
- [ ] Status (New/Updated/Removed) accurately reflects the actual change being made
- [ ] File paths are correct and follow project structure conventions
- [ ] Item names are specific and unambiguous

#### Implementation Details Validation

- [ ] All components/functions focus on WHAT and WHY, not HOW
- [ ] Every component has clear purpose and business rationale
- [ ] Interfaces are properly defined with TypeScript signatures
- [ ] Dependencies are documented and justified
- [ ] Constraints (architectural, performance, security) are noted
- [ ] Integration points with other system components are clearly specified
- [ ] Module organization follows established patterns

### 6. Apply Quality Standards

- [ ] Verify all implementation decisions align with established architecture
- [ ] Ensure no code duplication across system components
- [ ] Validate implementation supports future expansion requirements
- [ ] Confirm clean patterns and maintainable code structure
- [ ] Ensure comprehensive error handling and testing coverage
- [ ] Validate Change Summary Table accuracy and completeness
- [ ] Verify implementation details follow WHAT/WHY documentation standards
- [ ] Ensure all integration points are properly documented

### 7. Quality Assurance Validation

- [ ] **No Code Duplication**: Verify no existing functionality is being duplicated
- [ ] **Architectural Consistency**: All implementations align with established patterns
- [ ] **Future Expansion**: Design supports future feature requirements
- [ ] **Clean Patterns**: Follow established coding standards and maintainability principles
- [ ] **Integration Validation**: All cross-component integration points are properly designed
- [ ] **Testing Coverage**: Comprehensive testing strategy for all implementation components

---

## Post-Validation Checklist

- [ ] All template sections populated with specific implementation details
- [ ] Implementation details address all test scenarios and requirements
- [ ] No duplication of existing functionality across system components
- [ ] Implementation follows established architectural patterns
- [ ] Future expansion requirements are considered in design
- [ ] Clean patterns and maintainable code structure are ensured
- [ ] Comprehensive error handling and testing strategies defined
- [ ] All integration points properly designed and documented
- [ ] Change Summary Table and Implementation Details validation completed
- [ ] Store completed document in `_docs/features/in-progress/[feature-name]-technical-design.md`

---

## Success Criteria

Complete when Technical Architect agent has coordinated with all specialized engineer agents, generated comprehensive implementation design that addresses all test scenarios, ensures architectural consistency, prevents code duplication, and document is stored in the appropriate feature directory.

---

**Note**: All responses should follow @fragments/response-formatting.md
