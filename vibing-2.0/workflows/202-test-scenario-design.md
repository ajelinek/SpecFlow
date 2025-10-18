# Workflow: 202 - Test Scenario Design Generation

**Objective**: Create comprehensive Gherkin test scenarios for a feature based on its high-level design, ui-flows, project overview, ensuring complete coverage of user workflows, business logic, and edge cases.

## Agents

- @agents/test-analyst.md
- @agents/product-manager.md
- @agents/frontend-architect.md

## Template

- @templates/11 - Technical Design.md

## Rules

- @rules/common/testing/test-general.md
- @rules/common/testing/test-setup-examples.md
- @rules/common/test-gherkin-definition.md
- @rules/common/test-e2e-tags.md

## Context Files

- `_docs/design/01 - Project Overview.md`
- `_docs/design/07 - UI Experience Overview.md`
- `_docs/ui-flows/[page-name].md` (relevant user flow pages)
- `_docs/features/[feature-name]-Technical_Design.md` (partially completed)

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Scenario Design Principles

Before proceeding, understand the key principles for creating comprehensive test scenarios:

- [ ] **Favor Larger Scenarios**: Design comprehensive scenarios that cover entire user workflows rather than small, isolated tests
- [ ] **Multiple Assertions**: Include multiple assertions within each scenario to validate various aspects of the user journey
- [ ] **Business-Focused**: Focus on user behavior and business outcomes, not technical implementation details
- [ ] **User Journey Coverage**: Ensure scenarios reflect real-world user interactions and decision points

### Validation Questions

1. **Feature Scope**: What is the complete business scope and user value of the feature being tested?
2. **User Personas**: Who are the primary and secondary users, and what are their specific goals?
3. **Business Rules**: What are the key business rules, validation requirements, and decision points?
4. **User Journeys**: What are the complete user workflows from start to finish?
5. **Business Outcomes**: What business results should be achieved at each step of the user journey?
6. **Error Scenarios**: What business error conditions and user-facing failure modes exist?
7. **User Decision Points**: Where do users make choices and what are the business implications?
8. **Accessibility Requirements**: What accessibility standards need to be validated for user experience?

---

## Execution Checklist

### 1. Invoke Test Analyst Agent

- [ ] Activate @agents/test-analyst.md persona
- [ ] Review `_docs/design/01 - Project Overview.md` for business context, user goals, and success metrics
- [ ] Review `_docs/design/07 - UI Experience Overview.md` for user journey architecture and navigation patterns
- [ ] Review relevant `_docs/ui-flows/[page-name].md` files for specific user interactions and page flows
- [ ] Review `_docs/features/[feature-name]-Overview.md` for feature-specific business requirements
- [ ] Review partially completed `_docs/features/[feature-name]-Technical_Design.md` for feature overview and system flow
- [ ] Consult with @agents/product-manager.md for business requirements and acceptance criteria

### 2. Analyze Feature Requirements

- [ ] Extract all user journeys from the system/user flow diagram
- [ ] Identify all business rules and validation requirements
- [ ] Map out all integration points and external dependencies
- [ ] Identify error conditions and edge cases
- [ ] Determine data requirements and test data scenarios

### 3. Generate Test Scenarios

- [ ] Use @templates/11 - Technical Design.md structure
- [ ] Populate the "Test Scenarios (Gherkin)" section with comprehensive scenarios
- [ ] **Design Large, Comprehensive Scenarios**: Create scenarios that cover entire user workflows with multiple assertions
- [ ] **Include Multiple Assertions**: Each scenario should validate various aspects of the user journey
- [ ] **Organize into Test Modules**: Group scenarios using TSM# identifiers with descriptive module names
- [ ] **Unique Scenario Numbers**: Each scenario must have a unique TS# identifier (TS001, TS002, etc.)
- [ ] **Apply Tagging System**: Use appropriate tags from @rules/common/test-e2e-tags.md
- [ ] **Status Tracking**: Include @status_pending tags for implementation tracking
- [ ] **Use Example Tables**: Keep scenarios DRY where appropriate
- [ ] **Follow Gherkin Standards**: Use valid Gherkin syntax in markdown code blocks

### 4. Apply Quality Standards

- [ ] Verify all user journeys are covered by test scenarios
- [ ] Ensure business rules and validation requirements are tested
- [ ] Validate error conditions and edge cases are comprehensive
- [ ] Confirm integration points have appropriate test coverage
- [ ] Check that scenarios follow Gherkin best practices

---

## Post-Validation Checklist

- [ ] All user journeys from system flow diagram covered by test scenarios
- [ ] Business rules and validation requirements comprehensively tested
- [ ] Error conditions and edge cases identified and tested
- [ ] Integration points have appropriate test coverage
- [ ] Test scenarios organized into logical modules with clear naming
- [ ] Each scenario has unique TS# identifier and proper tagging
- [ ] Gherkin syntax is valid and follows best practices
- [ ] Example tables used to keep scenarios DRY where appropriate
- [ ] All scenarios tagged with @status_pending for implementation tracking
- [ ] Store completed document in `_docs/features/[feature-name]-Technical_Design.md`

---

## Constraints

- **No Code**: You must not write or suggest any implementation code or pseudocode
- **Do Not Modify Other Sections**: You must only add content to the "Test Scenarios (Gherkin)" section. Leave all other sections unchanged
- **Use Gherkin**: All scenarios must be written in valid Gherkin syntax inside a markdown code block
- **Business-Focused**: Focus on user behavior and business outcomes, not technical implementation details
- **Comprehensive Coverage**: Ensure scenarios cover complete user workflows with multiple assertions

---

## Test Scenario Requirements

### Scenario Design Philosophy

- **Comprehensive Workflows**: Design large scenarios that cover entire user journeys from start to finish
- **Multiple Assertions**: Include multiple Then statements to validate various aspects of the user experience
- **Business-Focused**: Focus on user behavior and business outcomes, not technical implementation
- **Real-World Interactions**: Scenarios should reflect actual user workflows and decision points

### Scenario Organization

- **Test Modules**: Group related scenarios using TSM# identifiers with descriptive names
- **Scenario Numbering**: Each scenario must have unique TS# identifier (TS001, TS002, etc.)
- **Tagging System**: Apply appropriate tags from @rules/common/test-e2e-tags.md
- **Status Tracking**: All scenarios must include @status_pending tag

### Coverage Requirements

- **Complete User Journeys**: Cover entire user workflows with multiple validation points
- **Business Decision Points**: Test all user decision points and their business implications
- **Error Conditions**: Test user-facing error scenarios and recovery paths
- **Edge Cases**: Include boundary conditions and unusual user inputs
- **Cross-Feature Integration**: Test interactions between different features and user flows

### Gherkin Standards

- **Valid Syntax**: All scenarios must use proper Gherkin syntax in markdown code blocks
- **Clear Steps**: Use Given-When-Then pattern with descriptive, business-focused steps
- **Multiple Assertions**: Include multiple Then statements to validate comprehensive user experience
- **DRY Principle**: Use Example tables to avoid scenario duplication where appropriate
- **Readable**: Scenarios should be understandable by non-technical stakeholders

## Template Structure

The workflow uses the following template structure for test scenarios:

```gherkin
Feature: [Feature Name]

  #---------------------------------------------------------------------------
  # TSM001: [Test Module Name]
  #---------------------------------------------------------------------------

  @TS001 @happyPath @status_pending
  Scenario: [Describe a success case]
    Given [a specific precondition]
    When [an action is performed]
    Then [a successful outcome is observed]
    And [additional expected outcomes]

  @TS002 @errorPath @status_pending
  Scenario: [Describe a failure case]
    Given [a specific precondition that will lead to an error]
    When [an action is performed]
    Then [an error result is observed]
    And [additional error outcomes]

  #---------------------------------------------------------------------------
  # TSM002: [Another Test Module Name]
  #---------------------------------------------------------------------------

  @TS003 @happyPath @status_pending
  Scenario: [Describe another success case]
    Given [a specific precondition]
    When [an action is performed]
    Then [a successful outcome is observed]
    And [additional expected outcomes]
```

---

**Note**: All responses should follow @fragments/response-formatting.md
