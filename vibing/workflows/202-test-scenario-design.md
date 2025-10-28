# Workflow: 202 - Test Scenario Design Generation

**Objective**: Create comprehensive Gherkin test scenarios for a feature based on its high-level design, ui-flows, project overview, ensuring complete coverage of user workflows, business logic, and edge cases.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

- Specific feature ID/name from Feature Overview document

## Validation Questions

1. **Feature Scope**: What is the complete business scope and user value of the feature being tested?
2. **Business Rules**: What are the key business rules, validation requirements, and decision points?
3. **User Journeys**: What are the complete user workflows from start to finish?
4. **Business Outcomes**: What business results should be achieved at each step of the user journey?
5. **Error Scenarios**: What business error conditions and user-facing failure modes exist?

## Agents to Invoke

- [ ] Activate @vibing/agents/test-analyst.md persona
- [ ] Consult with @vibing/agents/product-manager.md for business requirements and acceptance criteria

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

**Analysis Phase**

- [ ] Extract all user journeys from the system/user flow diagram
- [ ] Identify all business rules and validation requirements
- [ ] Map out all integration points and external dependencies
- [ ] Identify error conditions and edge cases
- [ ] Determine data requirements and test data scenarios

**Content Creation**

- [ ] Use @vibing/templates/T11b - Test Scenario Design.md structure
- [ ] **ONLY populate section 5**: Test Scenarios (Gherkin)
- [ ] **Read existing sections 1-2** from the file (Feature Overview and System/User Flow)
- [ ] **Leave sections 3-4 as TODO placeholders** - do not populate Change Summary Table or Implementation Details
- [ ] Populate the "Test Scenarios (Gherkin)" section with comprehensive scenarios
- [ ] **Design Large, Comprehensive Scenarios**: Create scenarios that cover entire user workflows with multiple assertions
- [ ] **Include Multiple Assertions**: Each scenario should validate various aspects of the user journey
- [ ] **Organize into Test Modules**: Group scenarios using TSM# identifiers with descriptive module names
- [ ] **Unique Scenario Numbers**: Each scenario must have a unique TS# identifier (TS001, TS002, etc.)
- [ ] **Apply Tagging System**: Use appropriate tags from @vibing/rules/common/test-e2e-tags.md
- [ ] **Status Tracking**: Include @status_pending tags for implementation tracking
- [ ] **Use Example Tables**: Keep scenarios DRY where appropriate
- [ ] **Follow Gherkin Standards**: Use valid Gherkin syntax in markdown code blocks

**Quality Assurance**

- [ ] Verify all user journeys are covered by test scenarios
- [ ] Ensure business rules and validation requirements are tested
- [ ] Validate error conditions and edge cases are comprehensive
- [ ] Confirm integration points have appropriate test coverage
- [ ] Check that scenarios follow Gherkin best practices
- [ ] Test scenarios organized into logical modules with clear naming
- [ ] Each scenario has unique TS# identifier and proper tagging
- [ ] Gherkin syntax is valid and follows best practices
- [ ] Example tables used to keep scenarios DRY where appropriate
- [ ] All scenarios tagged with @status_pending for implementation tracking
- [ ] **VERIFY**: Only section 5 is populated, sections 3-4 remain as TODO placeholders

**Completion**

- [ ] Store completed document in `_docs/features/[feature-name]-Technical_Design.md`

**Note**: All responses should follow the response formatting guidelines in AGENT.md
