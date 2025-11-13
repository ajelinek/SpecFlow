# Workflow: 203 - Implementation Design Generation

**Objective**: Create detailed technical implementation specifications that define specific code changes, types, functions, and design approaches required to satisfy feature requirements and test scenarios while ensuring architectural consistency and code quality.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

- Specific feature ID/name from Feature Overview document

## Validation Questions

1. **Feature Context**: What specific feature is being designed for implementation?
2. **Architecture Alignment**: How does this feature align with existing system architecture?
3. **Integration Points**: What are the key integration points with existing components?
4. **Data Requirements**: What data model changes or new data access patterns are needed?
5. **API Requirements**: What new API endpoints or modifications are required?
6. **UI Components**: What new UI components or modifications are needed?

## Agents to Invoke

- [ ] Activate @vibing/agents/technical-architect.md persona as workflow driver
- [ ] Consult with @vibing/agents/frontend-engineer.md for UI components and state management requirements
- [ ] Consult with @vibing/agents/backend-engineer.md for API endpoints and business logic requirements
- [ ] Consult With @vibing/agents/data-engineer.md for schema changes and data access patterns

## Design Context

- [ ] Review `_docs/design/D01 - Project Overview.md` for business context, user goals, and success metrics
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D03 - Data Model.md` for data access patterns
- [ ] Review `_docs/design/D04 - Backend Architecture.md` for API design patterns
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for component architecture
- [ ] Review `_docs/design/D06 - UI Design.md` for design system guidelines
- [ ] Review `_docs/design/D07 - UI Experience Overview.md` for user journey architecture and navigation patterns
- [ ] Review relevant `_docs/ui-flows/[page-name].md` files for impacted screens
- [ ] Review `_docs/features/[feature-name]-Overview.md` for feature-specific business requirements
- [ ] Review partially completed `_docs/features/[feature-name]-Technical_Design.md` for feature overview and system flow

## Execute Checklist

**Component Definition**

- [ ] **Frontend**: Define new UI components and state management requirements
- [ ] **Backend**: Define new API endpoints and business logic requirements
- [ ] **Data**: Define schema changes and data access patterns

**Content Creation**

- [ ] Use @vibing/templates/T11c - Implementation Design.md structure
- [ ] **ONLY populate sections 3-6**: Frontend Change Summary Table, Backend Change Summary Table, Frontend Implementation Details, and Backend Implementation Details
- [ ] **Read existing sections 1-2 and 7** from the file (Feature Overview, System/User Flow, and Test Scenarios)
- [ ] **Leave sections 1-2 and 7 unchanged** - do not modify Feature Overview, System/User Flow, or Test Scenarios
- [ ] Populate Frontend Change Summary Table (section 3) with all required frontend modifications
- [ ] Populate Backend Change Summary Table (section 4) with all required backend modifications
- [ ] Populate Frontend Implementation Details (section 5) for all items in Frontend Change Summary Table
- [ ] Populate Backend Implementation Details (section 6) for all items in Backend Change Summary Table
- [ ] For each module/file, provide a Module Description explaining its purpose
- [ ] For each function/component, use interface signature as heading: `functionName(params: Type) => ReturnType`
- [ ] Include Purpose and Constraints for each function/component
- [ ] Include Implementation Details only for complex scenarios and business rules
- [ ] Ensure all test scenarios are addressed in implementation details

**Architecture Validation**

- [ ] Ensure no duplication of existing functionality across all layers
- [ ] Verify all implementation decisions align with established architecture
- [ ] Ensure no code duplication across system components
- [ ] Validate implementation supports future expansion requirements
- [ ] Confirm clean patterns and maintainable code structure
- [ ] Ensure comprehensive error handling and testing coverage
- [ ] All integration points properly designed and documented
- [ ] **Architectural Consistency**: All implementations align with established patterns
- [ ] **Future Expansion**: Design supports future feature requirements
- [ ] **Clean Patterns**: Follow established coding standards and maintainability principles
- [ ] **Integration Validation**: All cross-component integration points are properly designed
- [ ] **Testing Coverage**: Comprehensive testing strategy for all implementation components

**Quality Assurance**

- [ ] Verify Frontend Change Summary Table (section 3) completeness and accuracy
- [ ] Verify Backend Change Summary Table (section 4) completeness and accuracy
- [ ] Ensure implementation details focus on WHAT and WHY, not HOW
- [ ] Verify all functions/components use interface signature as heading format
- [ ] Verify Module Descriptions are provided for each module/file
- [ ] Verify Implementation Details section only populated for complex scenarios and business rules
- [ ] **No Code Duplication**: Verify no existing functionality is being duplicated
- [ ] Implementation details address all test scenarios and requirements
- [ ] Implementation follows established architectural patterns
- [ ] Comprehensive error handling and testing strategies defined
- [ ] Change Summary Tables and Implementation Details validation completed
- [ ] **VERIFY**: Only sections 3-6 are populated, sections 1-2 and 7 remain unchanged

**Completion**

- [ ] Store completed document in `_docs/features/in-progress/[feature-name]-technical-design.md`

**Note**: All responses should follow the response formatting guidelines in AGENTS.md
