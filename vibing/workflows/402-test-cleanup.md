# Workflow: 402 - Test Cleanup & Quality Improvement

**Objective**: Analyze recent test code changes and apply DRY principles, improve test readability, and ensure consistency with established testing standards. This workflow focuses on **TEST CODE ONLY** - no source code modifications are allowed.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/foundation/general-rules.md for coding standards
- [ ] Review @rules/common/foundation/typescript-guidelines.md for TypeScript standards
- [ ] Review @rules/common/foundation/error-handling-guidelines.md for error management patterns
- [ ] Review @rules/common/testing/test-general.md for testing standards
- [ ] Review @rules/common/testing/test-e2e.md for E2E testing patterns
- [ ] Review @rules/common/testing/test-context.md for test data management
- [ ] Review framework-specific testing rules based on chosen technology stack

### Required Inputs

**CRITICAL**: This workflow cannot execute without the following required inputs:

1. **Scope Definition**: What test code should be analyzed (recent commits, staged changes, specific test files, or directories)?

### Validation Questions

1. **Test Cleanup Focus**: What specific test areas need attention (DRY violations, test organization, test data management, test utilities)? **NOTE: Source code will NOT be modified**
2. **Test Preservation Requirements**: Are there any specific test patterns or structures that must be preserved?

---

## Execution Checklist

### 1. Invoke Test Cleanup Specialist Agent

- [ ] Activate @agents/test-cleanup-specialist.md persona
- [ ] Review `_docs/design/D01 - Project Overview.md` for business context
- [ ] Review `_docs/design/D02 - System Architecture.md` for architectural constraints
- [ ] Review `_docs/design/D04 - Backend Architecture.md` for backend patterns
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for frontend patterns
- [ ] Review `_docs/design/D06 - UI Design.md` for design system constraints
- [ ] Consult with @agents/technical-architect.md for quality standards validation
- [ ] Consult with @agents/test-automation-engineer.md for test-specific cleanup patterns
- [ ] Consult with @agents/frontend-engineer.md for frontend test patterns
- [ ] Consult with @agents/backend-engineer.md for backend test patterns

### 2. Execute Test Cleanup Process

- [ ] Delegate test code analysis to @agents/test-cleanup-specialist.md
- [ ] Ensure agent follows established test cleanup principles
- [ ] Validate agent applies appropriate testing standards
- [ ] **CRITICAL**: Confirm agent focuses on **TEST CODE ONLY**
- [ ] **REQUIRE APPROVAL**: Agent must ask for explicit approval before extracting test utilities into new modules
- [ ] **FILE STRUCTURE**: Ensure `setUp` function is first, helper utilities at bottom of file

### 2.1. Verify Test Data Patterns

- [ ] Confirm tests use standardized `setUp` function pattern
- [ ] Verify tests leverage TestContext for data management (`ctx` fixture)
- [ ] Check that tests use `ctx.setupEnv()` for initial data setup
- [ ] Validate tests use `ctx.selector` methods for data access
- [ ] Check that tests avoid direct `TestContext.create()` calls
- [ ] Validate tests use `ctx.scenario` for additional data creation during execution
- [ ] Validate tests follow minimal data specification principles
- [ ] Ensure tests use shorthand ID conventions
- [ ] **CRITICAL**: Verify NO manual test data cleanup (new data generated per test)
- [ ] **CRITICAL**: Verify tests follow additive data pattern (no cleanup between tests)
- [ ] **CRITICAL**: Verify tests do NOT use `beforeEach`/`afterEach` for data setup/cleanup
- [ ] **CRITICAL**: Verify tests do NOT manually delete users or test data
- [ ] **CRITICAL**: Verify tests let environment handle cleanup automatically

### 3. Validate Test Changes & Quality Standards

- [ ] Verify all existing tests still pass after test code changes
- [ ] Ensure no breaking changes to test utilities that other tests depend on
- [ ] **CRITICAL**: Do NOT modify any source code files - only validate tests still work
- [ ] Verify all test functionality is preserved
- [ ] Ensure test code follows established patterns and conventions
- [ ] Validate TypeScript compliance and proper typing in test files
- [ ] Confirm all tests continue to pass
- [ ] Check build process completes successfully
- [ ] Verify no breaking changes to test APIs or utilities

---

## Post-Validation Checklist

- [ ] All test cleanup tasks completed with clear rationale
- [ ] DRY principles applied appropriately to test code without over-abstraction
- [ ] Test code readability and maintainability improved
- [ ] Test organization and coverage optimized
- [ ] Test utility modules created or updated
- [ ] Test documentation comprehensive and up-to-date
- [ ] All existing test functionality preserved
- [ ] TypeScript compliance maintained in test files
- [ ] All tests pass without source code modification
- [ ] Build process completes successfully
- [ ] No breaking changes to test utilities or APIs

---

## Key Constraints

- **TEST CODE ONLY**: This workflow modifies **ONLY** test files and test utilities
- **NO SOURCE MODIFICATIONS**: Source code files are **NEVER** modified - only validated
- **PRESERVE TEST COVERAGE**: All changes must maintain existing test behavior and coverage
- **VALIDATION REQUIRED**: All changes must pass build and test validation
- **UTILITY EXTRACTION APPROVAL**: Test utilities must NOT be extracted into new modules without explicit approval
- **FILE STRUCTURE**: `setUp` function must be first in file, helper utilities at bottom

---

**Note**: All responses should follow established response formatting guidelines
