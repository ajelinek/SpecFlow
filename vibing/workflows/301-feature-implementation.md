# Workflow: 301 - Feature Implementation

**Objective**: Implement features based on completed Technical Design documents, following Test-Driven Development (TDD) principles and adhering to strict coding standards. This workflow coordinates frontend and backend engineers with test automation to deliver complete, tested features.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

- Specific test scenario ID(s) from Technical Design document (e.g., TS001, TS002, TS003)
- Completed Technical Design document with test scenarios

## Validation Questions

1. **Existing Code**: What existing components, utilities, or patterns can be leveraged?

## Agents to Invoke

- [ ] Activate @agents/technical-architect.md for implementation validation
- [ ] Activate @agents/test-automation-engineer.md for test implementation
- [ ] Activate @agents/frontend-engineer.md for frontend development
- [ ] Activate @agents/backend-engineer.md for backend development
- [ ] Activate @agents/data-engineer.md for data layer implementation

## Design Context

- [ ] Review referenced Technical Design document thoroughly

## Execute Checklist

**Prerequisites**

**Planning**

- [ ] **Focus ONLY on specific test scenario(s) with provided IDs**
- [ ] Identify existing code for reuse/extension
- [ ] Map dependencies and integration points

**Test Implementation** (Test Automation Engineer)

- [ ] Activate @agents/test-automation-engineer.md for test implementation
- [ ] Implement test scenarios for specific test scenario ID(s)
- [ ] Follow TDD principles: Red → Green → Refactor
- [ ] Use existing test patterns and utilities
- [ ] Type `setup` input functions (not `any`) - let return type be inferred
- [ ] BaseData object typed by `DataGenObject`
- [ ] Add playwright tags to group tests
- [ ] Follow existing test patterns and utilities
- [ ] Implement minimum test code required for test scenario(s) to pass
- [ ] **SCOPE CONSTRAINT**: No additional code created outside test scenario scope - only code needed for test scenario. Less code is more.

**Source Code Implementation**

**Frontend Source Code** (Frontend Engineer)

- [ ] Activate @agents/frontend-engineer.md for frontend development
- [ ] Implement ONLY specific test scenario(s) with provided IDs
- [ ] Follow existing component patterns
- [ ] Reuse existing utilities and helpers
- [ ] NO data-ids usage (use accessibility labels)
- [ ] Implement minimum code required for test scenario(s) to pass
- [ ] Leverage existing code before writing new code
- [ ] Follow established patterns and conventions
- [ ] **SCOPE CONSTRAINT**: No additional code created outside test scenario scope - only code needed for test scenario. Less code is more.

**Backend Source Code** (Backend Engineer)

- [ ] Activate @agents/backend-engineer.md for backend development
- [ ] Implement backend services and APIs for test scenarios
- [ ] Follow established backend architecture patterns
- [ ] Follow existing API patterns and conventions
- [ ] Implement proper input validation and error handling
- [ ] Follow security best practices
- [ ] Ensure proper error handling and validation
- [ ] **SCOPE CONSTRAINT**: No additional code created outside test scenario scope - only code needed for test scenario. Less code is more.

**Data Source Code** (Data Engineer)

- [ ] Activate @agents/data-engineer.md for data layer implementation
- [ ] Implement data layer changes for test scenarios
- [ ] **SCOPE CONSTRAINT**: No additional code created outside test scenario scope - only code needed for test scenario. Less code is more.

**Code Quality Assurance** (All Engineers)

- [ ] Clean up unused variables and functions
- [ ] Ensure proper TypeScript typing
- [ ] Ensure all code follows DRY principles
- [ ] Follow accessibility guidelines
- [ ] Maintain consistent naming conventions
- [ ] Remove unused imports or variables
- [ ] Consolidate duplicate code patterns
- [ ] Optimize component structure

**Final Validation**

- [ ] Validate specific test scenario(s) are working correctly
- [ ] Execute `pnpm build` and cleanup all errors
- [ ] Ensure all existing tests still pass
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Code follows established patterns

**Note**: All responses should follow @fragments/response-formatting.md
