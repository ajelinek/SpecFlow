# Workflow: 402 - Test Cleanup & Quality Improvement

**Objective**: Analyze recent test code changes and apply DRY principles, improve test readability, and ensure consistency with established testing standards. This workflow focuses on **TEST CODE ONLY** - no source code modifications are allowed.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

- Scope definition: what test code should be analyzed (recent commits, staged changes, specific test files, or directories)

## Validation Questions

1. **Test Cleanup Focus**: What specific test areas need attention (DRY violations, test organization, test data management, test utilities)? **NOTE: Source code will NOT be modified**
2. **Test Preservation Requirements**: Are there any specific test patterns or structures that must be preserved?

## Agents to Invoke

- [ ] Activate @agents/test-cleanup-specialist.md persona
- [ ] Consult with @agents/technical-architect.md for quality standards validation
- [ ] Consult with @agents/test-automation-engineer.md for test-specific cleanup patterns
- [ ] Consult with @agents/frontend-engineer.md for frontend test patterns
- [ ] Consult with @agents/backend-engineer.md for backend test patterns

## Execute Checklist

**Delegation**

- [ ] Delegate test code analysis to @agents/test-cleanup-specialist.md
- [ ] Ensure agent follows established test cleanup principles
- [ ] Validate agent applies appropriate testing standards
- [ ] **CRITICAL**: Confirm agent focuses on **TEST CODE ONLY**
- [ ] **REQUIRE APPROVAL**: Agent must ask for explicit approval before extracting test utilities into new modules

**Test Pattern Validation**

- [ ] **FILE STRUCTURE**: Ensure `setUp` function is first, helper utilities at bottom of file
- [ ] Confirm tests use standardized `setUp` function pattern
- [ ] Verify tests leverage TestContext for data management (`ctx` fixture)
- [ ] Check that tests use `ctx.setupEnv()` for initial data setup
- [ ] Validate tests use `ctx.selector` methods for data access
- [ ] Check that tests avoid direct `TestContext.create()` calls
- [ ] Validate tests use `ctx.scenario` for additional data creation during execution
- [ ] Validate tests follow minimal data specification principles
- [ ] Ensure tests use shorthand ID conventions

**Data Management Validation**

- [ ] **CRITICAL**: Verify NO manual test data cleanup (new data generated per test)
- [ ] **CRITICAL**: Verify tests follow additive data pattern (no cleanup between tests)
- [ ] **CRITICAL**: Verify tests do NOT use `beforeEach`/`afterEach` for data setup/cleanup
- [ ] **CRITICAL**: Verify tests do NOT manually delete users or test data
- [ ] **CRITICAL**: Verify tests let environment handle cleanup automatically

**Validation**

- [ ] Verify all existing tests still pass after test code changes
- [ ] Ensure no breaking changes to test utilities that other tests depend on
- [ ] **CRITICAL**: Do NOT modify any source code files - only validate tests still work
- [ ] Verify all test functionality is preserved
- [ ] Ensure test code follows established patterns and conventions
- [ ] Validate TypeScript compliance and proper typing in test files
- [ ] Confirm all tests continue to pass
- [ ] Check build process completes successfully
- [ ] Verify no breaking changes to test APIs or utilities

**Cleanup Results**

- [ ] All test cleanup tasks completed with clear rationale
- [ ] DRY principles applied appropriately to test code without over-abstraction
- [ ] Test code readability and maintainability improved
- [ ] Test organization and coverage optimized
- [ ] Test utility modules created or updated
- [ ] Test documentation comprehensive and up-to-date

**Note**: All responses should follow @fragments/response-formatting.md
