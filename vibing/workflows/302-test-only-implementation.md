# Workflow: 302 - Test-Only Implementation

**Objective**: Implement test cases only when the implementation code is already complete. This workflow focuses exclusively on test automation without modifying source code, ensuring comprehensive test coverage for existing functionality.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

- Specific test scenario numbers (e.g., "Scenario 1.1, 1.2, 2.1")

## Validation Questions

1. **Implementation Status**: Is the source code implementation complete?

## Agents to Invoke

- [ ] Activate @vibing/agents/test-automation-engineer.md persona
- [ ] Consult with @vibing/agents/test-analyst.md for test scenario validation
- [ ] Consult with @vibing/agents/frontend-engineer.md for UI component testing patterns
- [ ] Consult with @vibing/agents/backend-engineer.md for API testing requirements

## Execute Checklist

**Prerequisites**

- [ ] **CRITICAL**: If test scenario doesn't match implementation, STOP and ask for clarification
- [ ] Ensure no changes to source code except accessibility labels

**Analysis**

- [ ] Read specific test scenarios from technical design document using provided scenario numbers
- [ ] Identify test scenario numbers and requirements provided by user
- [ ] Review test scenario requirements and expected behavior for specified scenarios
- [ ] Validate test scenarios align with implementation
- [ ] Verify implementation matches test scenario requirements
- [ ] Validate all required functionality is implemented

**Test Implementation**

- [ ] Create test files following established patterns
- [ ] Implement page object models for UI interactions
- [ ] Set up test data management using TestContext patterns
- [ ] Apply proper test tagging and organization
- [ ] Implement accessibility testing where required

**Quality Assurance**

- [ ] Type setup input functions (not just `any`) - let return type be inferred
- [ ] Clean up all unused variables and functions
- [ ] BaseData object is typed by `DataGenObject`
- [ ] Ensure all existing asserts are still present
- [ ] Add additional asserts only if they improve the test
- [ ] Follow DRY principles and clean code standards
- [ ] Apply proper accessibility testing patterns
- [ ] Use proper test data management patterns

**Validation**

- [ ] Run all tests in the file - they must pass
- [ ] Verify all existing E2E tests still pass
- [ ] Ensure no TypeScript errors
- [ ] TypeScript compliance maintained
- [ ] All tests pass consistently
- [ ] Validate test coverage meets requirements
- [ ] Ensure test performance is acceptable
- [ ] Validate test data management is efficient
- [ ] Test implementation follows established patterns and rules
- [ ] Test data management follows TestContext patterns
- [ ] Proper test organization and tagging applied
- [ ] Accessibility testing implemented where required

**Note**: All responses should follow the response formatting guidelines in AGENTS.md
