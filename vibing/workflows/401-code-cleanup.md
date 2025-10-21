# Workflow: 401 - Code Cleanup & Quality Improvement

**Objective**: Analyze recent code changes and apply DRY principles, improve readability, and ensure consistency with established coding standards. This workflow focuses on **SOURCE CODE ONLY** - no test code modifications are allowed.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

### Rule Evaluation

Before proceeding, evaluate the referenced rules to understand established patterns:

- [ ] Review @rules/common/foundation/general-rules.md for coding standards
- [ ] Review @rules/common/foundation/typescript-guidelines.md for TypeScript standards
- [ ] Review @rules/common/foundation/error-handling-guidelines.md for error management patterns
- [ ] Review @rules/common/ui/ui-component-guidelines.md for component patterns
- [ ] Review @rules/common/testing/test-general.md for testing standards
- [ ] Review @rules/common/testing/test-e2e.md for E2E testing patterns
- [ ] Review framework-specific rules based on chosen technology stack

### Required Inputs

**CRITICAL**: This workflow cannot execute without the following required inputs:

1.  **Scope Definition**: What code should be analyzed (recent commits, staged changes, specific files, or directories)?

### Validation Questions

1. **Cleanup Focus**: What specific areas need attention (DRY violations, code smells, performance, documentation)? **NOTE: Test code will NOT be modified**
2. **Preservation Requirements**: Are there any specific patterns or structures that must be preserved?

---

## Execution Checklist

###12. Invoke Code Cleanup Specialist Agent

- [ ] Activate @agents/code-cleanup-specialist.md persona
- [ ] Review `_docs/design/D01 - Project Overview.md` for business context
- [ ] Review `_docs/design/D02 - System Architecture.md` for architectural constraints
- [ ] Review `_docs/design/D04 - Backend Architecture.md` for backend patterns
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for frontend patterns
- [ ] Review `_docs/design/D06 - UI Design.md` for design system constraints
- [ ] Consult with @agents/technical-architect.md for quality standards validation
- [ ] Consult with @agents/frontend-engineer.md for frontend-specific cleanup patterns
- [ ] Consult with @agents/backend-engineer.md for backend-specific cleanup patterns

### 2. Analyze Source Code Quality

- [ ] Identify scope of **SOURCE CODE ONLY** to analyze based on user input
- [ ] Scan for DRY violations and code duplication in source code
- [ ] Identify code smells and maintainability issues in source code
- [ ] Assess consistency with established coding standards
- [ ] Review existing documentation coverage and quality
- [ ] Document findings with specific examples and impact assessment
- [ ] **CRITICAL**: Do NOT analyze or modify any test files

### 3. Plan Source Code Refactoring Strategy

- [ ] Prioritize cleanup tasks by impact and effort
- [ ] Plan module extraction opportunities (ask for approval before proceeding)
- [ ] Assess risk of changes and potential breaking points
- [ ] Create incremental refactoring plan for **SOURCE CODE ONLY**
- [ ] Verify tests after each incremental change.
- [ ] **CRITICAL**: Do NOT plan any test code modifications

### 5. Implement Source Code Cleanup

- [ ] Apply DRY principles to eliminate code duplication in **SOURCE CODE ONLY**
- [ ] Improve code readability and maintainability
- [ ] Consolidate similar functions and patterns
- [ ] Optimize component structure and organization
- [ ] Clean up unused imports, variables, and functions
- [ ] Create or update module-level AGENT.md files
- [ ] Document public APIs and component interfaces
- [ ] Ensure all changes preserve existing functionality
- [ ] **CRITICAL**: Do NOT modify any test files

### 6. Validate Test Compatibility

- [ ] Verify all existing tests still pass after source code changes
- [ ] Ensure no breaking changes to public APIs that tests depend on
- [ ] **CRITICAL**: Do NOT modify any test files - only validate they still work

### 7. Apply Quality Standards

- [ ] Verify all functionality is preserved
- [ ] Ensure code follows established patterns and conventions
- [ ] Validate TypeScript compliance and proper typing
- [ ] Confirm all tests continue to pass
- [ ] Check build process completes successfully
- [ ] Verify no breaking changes to public APIs

---

## Post-Validation Checklist

- [ ] All code cleanup tasks completed with clear rationale
- [ ] DRY principles applied appropriately without over-abstraction
- [ ] Code readability and maintainability improved
- [ ] Test organization and coverage optimized
- [ ] Module-level documentation created or updated
- [ ] AGENT.md files created or updated for modules
- [ ] API documentation comprehensive and up-to-date
- [ ] All existing functionality preserved
- [ ] TypeScript compliance maintained
- [ ] All tests pass without modification (unless explicitly approved)
- [ ] Build process completes successfully
- [ ] No breaking changes introduced

---

## Key Constraints

- **SOURCE CODE ONLY**: This workflow modifies **ONLY** source code files
- **NO TEST MODIFICATIONS**: Test files are **NEVER** modified - only validated
- **PRESERVE FUNCTIONALITY**: All changes must maintain existing behavior
- **VALIDATION REQUIRED**: All changes must pass build and test validation
- **DOCUMENTATION STANDARDS**: All modules must have comprehensive documentation
- **API DOCUMENTATION**: All public APIs must be properly documented with examples

---

**Note**: All responses should follow @fragments/response-formatting.md
