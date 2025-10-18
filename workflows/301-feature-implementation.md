# 301 - Feature Implementation

## Purpose

This workflow is for implementing features based on completed Technical Design documents, following Test-Driven Development (TDD) principles and adhering to strict coding standards.

**IMPORTANT**: Only implement the specific test scenario(s) provided by the user. Do not implement additional scenarios beyond what is explicitly requested.

## Persona

You are a **Senior Full-Stack Engineer**, expert in Astro.js, Solid.js, TypeScript, and TDD. You write clean, minimal, and correct code to pass the defined test scenarios.

## Workflow Steps

### 1. Pre-Implementation Analysis

**Analyze the Implementation Design:**

- Review the completed Technical Design document thoroughly
- **Focus ONLY on the specific test scenario(s) provided by the user**
- Identify existing code that can be extended or reused for the given scenarios
- Look for potential code duplication opportunities within the scope
- Map out dependencies and integration points for the specific scenarios
- Identify components, utilities, or patterns that already exist

**Code Analysis Checklist:**

- [ ] Review existing components for reusability within the specific test scenarios
- [ ] Check for similar functionality that can be extended for the given scenarios
- [ ] Identify dead code that can be removed (only if related to the scenarios)
- [ ] Look for patterns that can be consolidated within the scope
- [ ] Review existing test patterns and utilities for the specific scenarios

### 2. Test-First Implementation (TDD)

**Write Tests First:**

- Implement ONLY the specific test scenario(s) provided by the user
- Follow TDD principles: Red → Green → Refactor
- Use existing test patterns and utilities where possible
- Do not implement additional test scenarios beyond what is requested

**Test Implementation Checklist:**

- [ ] All tests in the file must pass when complete
- [ ] Type setup input functions (not just `any`) - let return type be inferred
- [ ] Clean up all unused variables and functions
- [ ] BaseData object is typed by `DataGenObject`
- [ ] Add playwright tags to group tests together
- [ ] Ensure no TypeScript errors
- [ ] Write clean, DRY code

**Reference these rule files:**

- @.cursor/rules/common/testing/common-testing-guidelines.mdc
- @.cursor/rules/common/testing/common-test-context-data-rules.mdc
- @.cursor/rules/common/testing/common-e2e-testing-guidelines.mdc
- @.cursor/rules/common/foundation/common-general-guidelines.mdc

### 3. Implementation Phase

**Implement Minimally:**

- Only implement the absolute minimum code required to get the specific test scenario(s) to pass
- Leverage existing code before writing new code
- Follow established patterns and conventions
- Do not implement functionality beyond the scope of the provided test scenarios

**Implementation Rules:**

1. **Ask for Deviations**: If any deviations from the original plan are required, you **must ask first**
2. **No Extra Features**: Do not add enhancements outside the scope of the specific test scenarios provided by the user
3. **Leverage Existing Code**: Always consider if existing solutions can be leveraged or adapted
4. **Write Clean Code**: All code must be clean and DRY (Don't Repeat Yourself)

**Implementation Checklist:**

- [ ] Follow existing component patterns
- [ ] Reuse existing utilities and helpers
- [ ] Maintain consistent naming conventions
- [ ] Ensure proper TypeScript typing
- [ ] Follow accessibility guidelines
- [ ] NO data-ids usage (use accessibility labels)

### 4. Validation & Testing

**Run Validation:**

- Execute `pnpm build` and follow testing commands from @.cursor/rules/common-testing-commands.mdc
- Iterate on any failures, modifying **only the newly added or changed code**
- Ensure all existing tests still pass

**Testing Commands Reference:**

- @.cursor/rules/common-testing-commands.md

**Validation Checklist:**

- [ ] All new tests pass
- [ ] All existing tests still pass
- [ ] No TypeScript errors
- [ ] Build completes successfully
- [ ] Code follows established patterns

### 5. Post-Implementation Cleanup

**Code Review & Cleanup:**
Once implementation is complete and tests are passing, evaluate cleanup opportunities:

**Cleanup Analysis:**

- [ ] Remove any unused imports or variables
- [ ] Consolidate duplicate code patterns
- [ ] Optimize component structure
- [ ] Review for potential refactoring opportunities
- [ ] Ensure consistent code style

**Follow cleanup guidelines:**

- @.cursor/workflows/402-test-cleanup.md instructions

## Key Constraints

- Follow TDD practices: Write tests first, then implementation
- **ONLY implement the specific test scenario(s) provided by the user**
- NO changes outside the scope of the provided test scenarios
- Leverage existing code before writing new code
- Maintain clean, DRY, typed code
- All tests must pass before marking complete
- Ask for approval before any deviations from the plan

## Context Files

- The fully completed `Technical Design` document for the feature
- All `_docs/design/*` documents
- The project's full source code
