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
- [ ] Review context files: `_docs/design/D01 - Project Overview.md`, `_docs/design/D02 - System Architecture.md`, `_docs/design/D03 - Data Model.md`, `_docs/design/D04 - Backend Architecture.md`, `_docs/design/D05 - Frontend Architecture.md`, `_docs/design/D06 - UI Design.md`
- [ ] Review `_docs/design/D09 - Data Access Patterns.md` for data access requirements
- [ ] Review Technical Design document thoroughly

## Execute Checklist

- [ ] **VERIFY**: Test scenario ID(s) provided (e.g., TS001, TS002, TS003)
- [ ] **VERIFY**: Completed Technical Design document available
- [ ] **Focus ONLY on specific test scenario(s) with provided IDs**
- [ ] Identify existing code for reuse/extension
- [ ] Map dependencies and integration points
- [ ] **VERIFY**: Test scenario ID(s) clearly identified
- [ ] Activate @agents/test-automation-engineer.md for test implementation
- [ ] Implement ONLY specific test scenario(s) with provided IDs
- [ ] Follow TDD principles: Red → Green → Refactor
- [ ] Use existing test patterns and utilities
- [ ] Type setup input functions (not `any`) - let return type be inferred
- [ ] Clean up unused variables and functions
- [ ] BaseData object typed by `DataGenObject`
- [ ] Add playwright tags to group tests
- [ ] Execute `pnpm build` and cleanup all errors
- [ ] Ensure all existing tests still pass
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Code follows established patterns
- [ ] Ensure proper TypeScript typing
- [ ] Ensure all code follows DRY principles
- [ ] Follow accessibility guidelines
- [ ] Maintain consistent naming conventions
- [ ] Activate @agents/frontend-engineer.md for frontend development
- [ ] Implement minimum code required for test scenario(s) to pass
- [ ] Leverage existing code before writing new code
- [ ] Follow established patterns and conventions
- [ ] Follow existing component patterns
- [ ] Reuse existing utilities and helpers
- [ ] NO data-ids usage (use accessibility labels)
- [ ] Execute `pnpm build` and cleanup all errors
- [ ] Ensure all existing tests still pass
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Code follows established patterns
- [ ] Ensure proper TypeScript typing
- [ ] Ensure all code follows DRY principles
- [ ] Follow accessibility guidelines
- [ ] Maintain consistent naming conventions
- [ ] Activate @agents/backend-engineer.md for backend development
- [ ] Implement backend services and APIs for test scenarios
- [ ] Follow established backend architecture patterns
- [ ] Ensure proper error handling and validation
- [ ] Follow existing API patterns and conventions
- [ ] Implement proper input validation and error handling
- [ ] Follow security best practices
- [ ] Execute `pnpm build` and cleanup all errors
- [ ] Ensure all existing tests still pass
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Code follows established patterns
- [ ] Ensure proper TypeScript typing
- [ ] Ensure all code follows DRY principles
- [ ] Follow accessibility guidelines
- [ ] Maintain consistent naming conventions
- [ ] Validate specific test scenario(s) are working correctly
- [ ] Execute `pnpm build` and cleanup all errors
- [ ] Ensure all existing tests still pass
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Code follows established patterns
- [ ] Ensure proper TypeScript typing
- [ ] Ensure all code follows DRY principles
- [ ] Follow accessibility guidelines
- [ ] Maintain consistent naming conventions
- [ ] Remove unused imports or variables
- [ ] Consolidate duplicate code patterns
- [ ] Optimize component structure
- [ ] Execute `pnpm build` and cleanup all errors
- [ ] Ensure all existing tests still pass
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Code follows established patterns
- [ ] Ensure proper TypeScript typing
- [ ] Ensure all code follows DRY principles
- [ ] Follow accessibility guidelines
- [ ] Maintain consistent naming conventions

**Note**: All responses should follow @fragments/response-formatting.md
