# Workflow: 302 - Test-Only Implementation

**Objective**: Implement test cases only when the implementation code is already complete. This workflow focuses exclusively on test automation without modifying source code, ensuring comprehensive test coverage for existing functionality.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/testing/test-general.md for testing strategy
- [ ] Review @rules/common/testing/test-e2e.md for E2E testing patterns
- [ ] Review @rules/common/testing/test-context.md for test data management
- [ ] Review @rules/common/testing/test-e2e-page-object.md for page object patterns
- [ ] Review @rules/common/testing/test-e2e-tags.md for test organization
- [ ] Review @rules/common/foundation/typescript-guidelines.md for TypeScript standards
- [ ] Review @rules/common/ui/ui-accessibility-guidelines.md for accessibility testing

### Validation Questions

1. **Scenario Numbers**: What specific test scenario numbers need to be implemented (e.g., "Scenario 1.1, 1.2, 2.1")?
2. **Implementation Status**: Is the source code implementation complete and functional?

---

## Execution Checklist

### 1. Invoke Test Automation Engineer Agent

- [ ] Activate @agents/test-automation-engineer.md persona
- [ ] Review `_docs/design/D01 - Project Overview.md` for business requirements
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D03 - Data Model.md` for data access patterns
- [ ] Review `_docs/design/D04 - Backend Architecture.md` for API testing patterns
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for UI testing patterns
- [ ] Review feature documentation for test scenario requirements
- [ ] Consult with @agents/test-analyst.md for test scenario validation
- [ ] Consult with @agents/frontend-engineer.md for UI component testing patterns
- [ ] Consult with @agents/backend-engineer.md for API testing requirements

### 2. Analyze Test Requirements

- [ ] Read specific test scenarios from technical design document using provided scenario numbers
- [ ] Identify test scenario numbers and requirements provided by user
- [ ] Review test scenario requirements and expected behavior for specified scenarios
- [ ] Validate test scenarios align with implementation

### 3. Review Implementation

- [ ] Verify implementation matches test scenario requirements
- [ ] **CRITICAL**: If test scenario doesn't match implementation, STOP and ask for clarification
- [ ] Ensure no changes to source code except accessibility labels
- [ ] Validate all required functionality is implemented

### 4. Implement Test Automation

- [ ] Create test files following established patterns
- [ ] Implement page object models for UI interactions
- [ ] Set up test data management using TestContext patterns
- [ ] Apply proper test tagging and organization
- [ ] Implement accessibility testing where required
- [ ] Type setup input functions (not just `any`) - let return type be inferred
- [ ] Clean up all unused variables and functions
- [ ] BaseData object is typed by `DataGenObject`

### 5. Apply Quality Standards

- [ ] Verify all tests pass when complete
- [ ] Ensure all existing asserts are still present
- [ ] Add additional asserts only if they improve the test
- [ ] Follow DRY principles and clean code standards
- [ ] Ensure no TypeScript errors
- [ ] Apply proper accessibility testing patterns
- [ ] Use proper test data management patterns

### 6. Test Implementation Validation

- [ ] Run all tests in the file - they must pass
- [ ] Verify all existing E2E tests still pass
- [ ] Validate test coverage meets requirements
- [ ] Ensure test performance is acceptable
- [ ] Validate test data management is efficient

---

## Post-Validation Checklist

- [ ] All test scenarios implemented and passing
- [ ] Test implementation follows established patterns and rules
- [ ] No source code changes except accessibility labels
- [ ] Test data management follows TestContext patterns
- [ ] Proper test organization and tagging applied
- [ ] TypeScript compliance maintained
- [ ] Accessibility testing implemented where required
- [ ] All tests pass consistently
- [ ] Test coverage meets requirements

---

## Key Constraints

- **REQUIRED**: Specific scenario numbers must be provided (e.g., "Scenario 1.1, 1.2, 2.1")
- **NO source code changes** except accessibility labels
- **NO data-ids usage** - use proper accessibility selectors
- Implementation must match test scenario or ask for clarification
- All tests must pass before marking complete
- Follow all referenced rule files and patterns
- Maintain clean, typed, DRY code
- Focus on test automation, not feature implementation

---

**Note**: All responses should follow @fragments/response-formatting.md
