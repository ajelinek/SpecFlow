# 302 - Test-Only Implementation

## Purpose

This workflow is for implementing test cases only when the implementation code is already complete. This is NOT for implementing feature changes - only for updating test cases.

## Workflow Steps

### 1. Analyze Test Requirements

- Read the specific test scenario from the technical design document
- The user will provide the test case or test case ids that need to be implemented.
- Review the test scenario requirements and expected behavior

### 2. Review Implementation

- Verify the implementation matches the test scenario requirements
- !! IMPORTANT!! - If test scenario doesn't match implementation, STOP and ask for clarification
- Ensure no changes to src code except accessibility labels

### 3. Implement Tests Following Rules

Reference these rule files:

- @.cursor/rules/common-testing-guidelines.mdc
- @.cursor/rules/common-test-context-data-rules.mdc
- @.cursor/rules/common-e2e-testing-guidelines.mdc
- @.cursor/rules/common-general-guidelines.mdc

### 4. Test Implementation Checklist

- [ ] All tests in the file must pass when complete
- [ ] Verify all existing asserts are still present
- [ ] Add additional asserts only if they improve the test
- [ ] Type setup input functions (not just `any`) - let return type be inferred
- [ ] Clean up all unused variables and functions
- [ ] BaseData object is typed by `DataGenObject`
- [ ] Add playwright tags to group tests together
- [ ] Ensure no TypeScript errors
- [ ] Write clean, DRY code

### 5. Test Context Patterns

- If no testData needed for specific tests, don't pass it in
- Call the const base data `baseData` so it can be passed directly into `@TestContext.ts`
- Use proper typing for setup functions
- Follow TestContext patterns from the provided example rule files

### 6. Code Quality Standards

- Focus on CLEAN, DRY code
- NO data-ids usage
- Proper accessibility labels only
- TypeScript compliance
- Follow established patterns

### 7. Validation

- Run all tests in the file - they must pass
- Verify all existing e2e tests still pass
- Mark test scenario as complete when all tests pass

### 8. Cleanup Evaluation

Once tests are passing, evaluate cleanup opportunities following:

- @.cursor/workflows/402-test-cleanup.md instructions

## Key Constraints

- NO changes to src code except accessibility labels
- NO data-ids usage
- Implementation must match test scenario or ask for clarification
- All tests must pass before marking complete
- Follow all referenced rule files
- Maintain clean, typed code

