# Workflow: 401 - Code Cleanup & Quality Improvement

**Objective**: Analyze recent code changes and apply DRY principles, improve readability, and ensure consistency with established coding standards. This workflow focuses on **SOURCE CODE ONLY** - no test code modifications are allowed.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

- Scope definition: what code should be analyzed (recent commits, staged changes, specific files, or directories)

## Validation Questions

1. **Cleanup Focus**: What specific areas need attention (DRY violations, code smells, performance, documentation)? **NOTE: Test code will NOT be modified**
2. **Preservation Requirements**: Are there any specific patterns or structures that must be preserved?

## Agents to Invoke

- [ ] Activate @vibing/agents/code-cleanup-specialist.md persona
- [ ] Consult with @vibing/agents/technical-architect.md for quality standards validation
- [ ] Consult with @vibing/agents/frontend-engineer.md for frontend-specific cleanup patterns
- [ ] Consult with @vibing/agents/backend-engineer.md for backend-specific cleanup patterns

## Execute Checklist

**Analysis**

- [ ] Identify scope of **SOURCE CODE ONLY** to analyze based on user input
- [ ] Scan for DRY violations and code duplication in source code
- [ ] Identify code smells and maintainability issues in source code
- [ ] Assess consistency with established coding standards
- [ ] Review existing documentation coverage and quality
- [ ] Document findings with specific examples and impact assessment
- [ ] **CRITICAL**: Do NOT analyze or modify any test files

**Planning**

- [ ] Prioritize cleanup tasks by impact and effort
- [ ] Plan module extraction opportunities (ask for approval before proceeding)
- [ ] Assess risk of changes and potential breaking points
- [ ] Create incremental refactoring plan for **SOURCE CODE ONLY**

**Implementation**

- [ ] Apply DRY principles to eliminate code duplication in **SOURCE CODE ONLY**
- [ ] Improve code readability and maintainability
- [ ] Consolidate similar functions and patterns
- [ ] Optimize component structure and organization
- [ ] Clean up unused imports, variables, and functions
- [ ] Create or update module-level AGENTS.md files
- [ ] Document public APIs and component interfaces

**Validation**

- [ ] Ensure all changes preserve existing functionality
- [ ] Verify all existing tests still pass after source code changes
- [ ] Ensure no breaking changes to public APIs that tests depend on
- [ ] Verify all functionality is preserved
- [ ] Ensure code follows established patterns and conventions
- [ ] Validate TypeScript compliance and proper typing
- [ ] Confirm all tests continue to pass
- [ ] Check build process completes successfully
- [ ] Verify no breaking changes to public APIs
- [ ] **CRITICAL**: Do NOT modify any test files
- [ ] **CRITICAL**: Do NOT plan any test code modifications

**Note**: All responses should follow the response formatting guidelines in AGENTS.md
