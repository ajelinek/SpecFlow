# Workflow: 302 - Test-Only Implementation

**Objective**: Implement test cases only when the implementation code is already complete. This workflow focuses exclusively on test automation without modifying source code, ensuring comprehensive test coverage for existing functionality.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

- Specific test scenario numbers (e.g., "Scenario 1.1, 1.2, 2.1")

## Validation Questions

1. **Implementation Status**: Is the source code implementation complete and functional?

## Agents to Invoke

- [ ] Activate @agents/test-automation-engineer.md persona
- [ ] Consult with @agents/test-analyst.md for test scenario validation
- [ ] Consult with @agents/frontend-engineer.md for UI component testing patterns
- [ ] Consult with @agents/backend-engineer.md for API testing requirements

## Design Context

- [ ] Review feature documentation for test scenario requirements

## Execute Checklist

- [ ] Read specific test scenarios from technical design document using provided scenario numbers
- [ ] Identify test scenario numbers and requirements provided by user
- [ ] Review test scenario requirements and expected behavior for specified scenarios
- [ ] Validate test scenarios align with implementation
- [ ] Verify implementation matches test scenario requirements
- [ ] **CRITICAL**: If test scenario doesn't match implementation, STOP and ask for clarification
- [ ] Ensure no changes to source code except accessibility labels
- [ ] Validate all required functionality is implemented
- [ ] Create test files following established patterns
- [ ] Implement page object models for UI interactions
- [ ] Set up test data management using TestContext patterns
- [ ] Apply proper test tagging and organization
- [ ] Implement accessibility testing where required
- [ ] Type setup input functions (not just `any`) - let return type be inferred
- [ ] Clean up all unused variables and functions
- [ ] BaseData object is typed by `DataGenObject`
- [ ] Verify all tests pass when complete
- [ ] Ensure all existing asserts are still present
- [ ] Add additional asserts only if they improve the test
- [ ] Follow DRY principles and clean code standards
- [ ] Ensure no TypeScript errors
- [ ] Apply proper accessibility testing patterns
- [ ] Use proper test data management patterns
- [ ] Run all tests in the file - they must pass
- [ ] Verify all existing E2E tests still pass
- [ ] Validate test coverage meets requirements
- [ ] Ensure test performance is acceptable
- [ ] Validate test data management is efficient
- [ ] All test scenarios implemented and passing
- [ ] Test implementation follows established patterns and rules
- [ ] No source code changes except accessibility labels
- [ ] Test data management follows TestContext patterns
- [ ] Proper test organization and tagging applied
- [ ] TypeScript compliance maintained
- [ ] Accessibility testing implemented where required
- [ ] All tests pass consistently
- [ ] Test coverage meets requirements

**Note**: All responses should follow @fragments/response-formatting.md
