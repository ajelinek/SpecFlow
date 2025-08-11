# Workflow: Plan Evaluation and Validation

**Objective**: Evaluate technical design plans for completeness, accuracy, and implementation readiness without writing production code.

**Persona**: Senior Technical Architect with expertise in system design and code analysis.

---

## Process

1. **Analyze Plan Structure**: Review document completeness, organization, and template conformance
2. **Verify Technical Accuracy**: Cross-reference file paths, function names, and data models against codebase
3. **Assess Codebase Impact**: Identify all affected files, dependencies, and missing elements
4. **Validate Testing Strategy**: Ensure comprehensive test coverage including edge cases
5. **Evaluate Risks**: Identify failure points and ensure adequate mitigation strategies
6. **Output**: Provide structured evaluation report with actionable recommendations

**IMPORTANT**: New files that are planned to be created should NOT be flagged as "missing" - only existing files that should be modified but aren't mentioned should be flagged.

---

## Context Files

- Technical design document to evaluate
- `_docs/design/*` (architecture documents)
- `src/**` (frontend implementation)
- `functions/**` (Cloud Functions, triggers, processors)
- `e2e/**` (test patterns and fixtures)
- `packages/models/**` and `src/models/**` (collections/constants)
- `_docs/guides/path-aliases.md` (import conventions)
- `.cursor/workflows/008-high-level-design.md` (high-level design workflow)
- `.cursor/workflows/009-test-scenario-design.md` (test scenario workflow)
- `.cursor/workflows/010-implementation-design.md` (implementation design workflow)

---

## Evaluation Process

### Step 1: Document Structure Analysis

- [ ] Clear purpose, scope, and problem statement
- [ ] Logical section organization following templates from workflow 008/009/010
- [ ] Complete `Change Summary Table` (from workflow 010)
- [ ] Sufficient `Implementation Details` (no production code, from workflow 010)
- [ ] Feature Overview section present and complete (from workflow 008)
- [ ] System/User Flow section present with Mermaid diagram (from workflow 008)
- [ ] Test Scenarios section present with Gherkin syntax (from workflow 009)

### Step 2: Technical Accuracy Verification

- [ ] All existing file paths referenced exist in repository
- [ ] Collection names match `packages/models/src/collections.ts`
- [ ] Function/module names are correct and discoverable
- [ ] Data model changes align with `Data_Model.md`
- [ ] Firestore schema/index implications identified
- [ ] Path aliases comply with conventions
- [ ] New files are clearly marked as new with sufficient implementation details
- [ ] Existing files that should be modified but aren't mentioned are identified
- [ ] Workarounds or temporary solutions are documented

**NOTE**: New files planned for creation are expected to not exist yet - only flag existing files that should be modified but aren't mentioned.

### Step 3: Codebase Impact Assessment

- [ ] All affected existing files listed
- [ ] All new files to be created are identified
- [ ] Change descriptions are accurate for existing files
- [ ] Implementation details sufficient for new files (function signatures, patterns, integration)
- [ ] Hidden dependencies and shared utilities identified
- [ ] Cloud Functions changes included when relevant
- [ ] Code deduplication opportunities identified
- [ ] Existing code that can be removed or simplified
- [ ] DRY implementation strategy documented
- [ ] Code smells and technical debt addressed
- [ ] Dependencies between changes mapped
- [ ] Circular dependencies identified
- [ ] Optimal implementation order determined
- [ ] External dependencies checked
- [ ] Implementation follows workflow 010 patterns (types, functions, modules structure)
- [ ] No production code in Implementation Details (workflow 010 constraint)

### Step 4: Testing Strategy Validation

- [ ] All test files to be added/updated identified
- [ ] Gherkin scenarios comprehensive and map to flow (following workflow 009)
- [ ] Edge/boundary cases covered
- [ ] Integration points have test coverage
- [ ] E2E tests align with existing patterns
- [ ] Performance implications considered
- [ ] Test data generation addressed
- [ ] Test workarounds needing fixes identified
- [ ] All scenarios tagged with @status_pending and @status_complete (workflow 009 requirement)
- [ ] Scenarios use Example tables for DRY patterns (workflow 009 requirement)

### Step 5: Risk Assessment

- [ ] Potential failure points identified
- [ ] Performance impacts considered
- [ ] Security implications addressed
- [ ] Data loss risks assessed
- [ ] User experience impact evaluated

### Step 6: Implementation Readiness

- [ ] All prerequisites identified
- [ ] Implementation order logical and dependency-aware
- [ ] Dependencies between changes clear
- [ ] External dependencies verified
- [ ] Internal API contracts validated
- [ ] Implementation timeline realistic

---

## Severity Tags

- 🔴 High: Blocks implementation or significantly impacts correctness, security, or architecture
- 🟡 Medium: High-impact gaps or inaccuracies; should be resolved in current iteration
- 🔵 Low: Clarity or documentation issues; can be scheduled

---

## Common Issues

### Missing Elements

- Existing files that should be modified but aren't mentioned
- New files without sufficient implementation details
- Test scenarios not covered
- Edge cases not addressed
- Migration steps missing
- Rollback procedures not documented
- Missing required sections from workflows 008/009/010
- Implementation details that violate workflow constraints

**CRITICAL**: Do NOT flag new files as "missing" if they are planned to be created. Only flag existing files that should be modified but aren't mentioned.

### Inaccurate Information

- Incorrect file paths for existing files
- Wrong function names
- Inaccurate change descriptions
- Missing dependencies
- Incorrect data model changes
- New files marked as existing
- Existing files marked as new
- Violations of workflow 008/009/010 constraints
- Implementation details that don't follow workflow patterns

**CRITICAL**: New files that don't exist yet are NOT "missing" - they are planned for creation.

### Implementation Gaps

- Unclear implementation order
- Missing prerequisites
- Undefined success criteria
- Incomplete testing strategy
- Insufficient risk mitigation
- Missing code deduplication strategy
- No plan for removing existing code
- Code smells not addressed

---

## Success Criteria

Plan is complete and accurate when:

1. All affected existing files correctly identified and described
2. All new files have sufficient implementation details for senior engineer implementation
3. All change types accurately specified
4. All dependencies mapped and ordered
5. All test scenarios covered
6. All risks identified and mitigated
7. Implementation can proceed without discovery of missing elements
8. Rollback procedures clear and tested
9. Performance and security implications addressed
10. Code deduplication opportunities identified and planned
11. Existing code removal/simplification documented
12. DRY implementation strategy clear
13. Code smells and technical debt addressed
14. Plan follows workflow 008/009/010 structure and constraints
15. All required sections from workflows are present and complete

## **CRITICAL**: New files that don't exist yet are NOT "missing" - they are planned for creation.

## TEMPLATE

**CRITICAL**: Final response must be numbered.

## Executive Summary

Provide high-level assessment of plan completeness, accuracy, and readiness for implementation.

## Issues

### I1. 🔴|🟡|🔵 [Describe what is wrong]

_Action_: [Exact, concise fix]

### I2. 🔴|🟡|🔵 [...]

_Action_: [...]

### I3. 🔴|🟡|🔵 [...]

_Action_: [...]

## Risk Assessment

### R1. 🔴|🟡|🔵 [Describe the risk]

_Mitigation_: [Action to reduce risk]

### R2. 🔴|🟡|🔵 [...]

_Mitigation_: [...]

## Conclusion

## **Overall Assessment**: [Ready/Needs Work/Not Ready]
