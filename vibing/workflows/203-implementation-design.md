# Workflow: 203 - Implementation Design Generation

**Objective**: Create detailed technical implementation specifications that define specific code changes, types, functions, and design approaches required to satisfy feature requirements and test scenarios while ensuring architectural consistency and code quality.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

- Specific feature ID/name from Feature Overview document

## Validation Questions

1. **Feature Context**: What specific feature is being designed for implementation?
2. **Test Scenarios**: Are Gherkin test scenarios already defined for this feature?
3. **Architecture Alignment**: How does this feature align with existing system architecture?
4. **Integration Points**: What are the key integration points with existing components?
5. **Data Requirements**: What data model changes or new data access patterns are needed?
6. **API Requirements**: What new API endpoints or modifications are required?
7. **UI Components**: What new UI components or modifications are needed?
8. **Security Considerations**: What security measures need to be implemented?

## Agents to Invoke

- [ ] Activate @agents/technical-architect.md persona as workflow driver
- [ ] Consult with @agents/frontend-engineer.md for UI components and state management requirements
- [ ] Consult with @agents/backend-engineer.md for API endpoints and business logic requirements
- [ ] Consult With @agents/data-engineer.md for schema changes and data access patterns

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

- [ ] Use @templates/T11c - Implementation Design.md structure
- [ ] **ONLY populate sections 3-4**: Change Summary Table and Implementation Details
- [ ] **Read existing sections 1-2 and 5** from the file (Feature Overview, System/User Flow, and Test Scenarios)
- [ ] **Leave sections 1-2 and 5 unchanged** - do not modify Feature Overview, System/User Flow, or Test Scenarios
- [ ] Populate Change Summary Table with all required modifications
- [ ] Define detailed implementation specifications for each component using module/function format
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

- [ ] Verify Change Summary Table completeness and accuracy
- [ ] Ensure implementation details focus on WHAT and WHY, not HOW
- [ ] Verify implementation details follow WHAT/WHY documentation standards
- [ ] **No Code Duplication**: Verify no existing functionality is being duplicated
- [ ] Implementation details address all test scenarios and requirements
- [ ] Implementation follows established architectural patterns
- [ ] Comprehensive error handling and testing strategies defined
- [ ] Change Summary Table and Implementation Details validation completed
- [ ] **VERIFY**: Only sections 3-4 are populated, sections 1-2 and 5 remain unchanged

**Completion**

- [ ] Store completed document in `_docs/features/in-progress/[feature-name]-technical-design.md`

**Note**: All responses should follow @fragments/response-formatting.md
