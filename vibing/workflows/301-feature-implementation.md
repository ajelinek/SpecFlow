# Workflow: 301 - Feature Implementation

**Objective**: Implement features based on completed Technical Design documents, following Test-Driven Development (TDD) principles and adhering to strict coding standards. This workflow coordinates frontend and backend engineers with test automation to deliver complete, tested features.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Required Inputs

**CRITICAL**: This workflow cannot execute without the following required inputs:

1. **Test Scenario IDs**: Specific test scenario ID(s) from the Technical Design document (e.g., TS001, TS002, TS003)
2. **Technical Design Document**: Completed Technical Design document with test scenarios

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/typescript-guidelines.md for TypeScript standards
- [ ] Review @rules/common/test-e2e.md for test automation patterns
- [ ] Review @rules/common/test-e2e-page-object.md for page object patterns
- [ ] Review @rules/common/test-context.md for test data management
- [ ] Review framework-specific rules based on chosen technology stack

### Validation Questions

1. **Test Scenario IDs**: Which specific test scenario ID(s) should be implemented? (REQUIRED - e.g., TS001, TS002, TS003)
2. **Existing Code**: What existing components, utilities, or patterns can be leveraged?

---

## Common Validation Steps

**Apply these validation steps after each implementation phase:**

- [ ] Execute `pnpm build` and cleanup all errors
- [ ] Ensure all existing tests still pass
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Code follows established patterns
- [ ] Ensure proper TypeScript typing
- [ ] Ensure all code follows DRY principles
- [ ] Follow accessibility guidelines
- [ ] Maintain consistent naming conventions

**Note**: When you see "Apply Common Validation Steps" in the workflow, execute all 9 validation steps above.

---

## Execution Checklist

### 1. Pre-Implementation Analysis

- [ ] **VERIFY**: Test scenario ID(s) provided (e.g., TS001, TS002, TS003)
- [ ] **VERIFY**: Completed Technical Design document available
- [ ] Review context files: `_docs/design/01 - Project Overview.md`, `_docs/design/02 - System Architecture.md`, `_docs/design/03 - Data Model.md`, `_docs/design/04 - Backend Architecture.md`, `_docs/design/05 - Frontend Architecture.md`, `_docs/design/06 - UI Design.md`
- [ ] Review `_docs/design/09 - Data Access Patterns.md` for data access requirements
- [ ] Activate @agents/technical-architect.md for implementation validation
- [ ] Review Technical Design document thoroughly
- [ ] **Focus ONLY on specific test scenario(s) with provided IDs**
- [ ] Identify existing code for reuse/extension
- [ ] Map dependencies and integration points

### 2. Test-First Implementation (TDD)

- [ ] **VERIFY**: Test scenario ID(s) clearly identified
- [ ] Activate @agents/test-automation-engineer.md for test implementation
- [ ] Implement ONLY specific test scenario(s) with provided IDs
- [ ] Follow TDD principles: Red → Green → Refactor
- [ ] Use existing test patterns and utilities
- [ ] Type setup input functions (not `any`) - let return type be inferred
- [ ] Clean up unused variables and functions
- [ ] BaseData object typed by `DataGenObject`
- [ ] Add playwright tags to group tests
- [ ] **Apply Common Validation Steps**

### 3. Frontend Implementation

- [ ] Activate @agents/frontend-engineer.md for frontend development
- [ ] Implement minimum code required for test scenario(s) to pass
- [ ] Leverage existing code before writing new code
- [ ] Follow established patterns and conventions
- [ ] Follow existing component patterns
- [ ] Reuse existing utilities and helpers
- [ ] NO data-ids usage (use accessibility labels)
- [ ] **Apply Common Validation Steps**

### 4. Backend Implementation

- [ ] Activate @agents/backend-engineer.md for backend development
- [ ] Implement backend services and APIs for test scenarios
- [ ] Follow established backend architecture patterns
- [ ] Ensure proper error handling and validation
- [ ] Follow existing API patterns and conventions
- [ ] Implement proper input validation and error handling
- [ ] Follow security best practices
- [ ] **Apply Common Validation Steps**

### 5. Integration and Validation

- [ ] Validate specific test scenario(s) are working correctly
- [ ] **Apply Common Validation Steps**

### 6. Post-Implementation Cleanup

- [ ] Remove unused imports or variables
- [ ] Consolidate duplicate code patterns
- [ ] Optimize component structure
- [ ] **Apply Common Validation Steps**

---

## Key Constraints

- **REQUIRED INPUT**: Test scenario ID(s) must be provided (e.g., TS001, TS002, TS003)
- **REQUIRED INPUT**: Completed Technical Design document must be available
- Follow TDD practices: Write tests first, then implementation
- **ONLY implement specific test scenario(s) with provided IDs**
- NO changes outside test scenario scope
- Leverage existing code before writing new code
- Maintain clean, DRY, typed code
- All tests must pass before marking complete
- Ask for approval before any deviations from the plan

---

**Note**: All responses should follow @fragments/response-formatting.md
