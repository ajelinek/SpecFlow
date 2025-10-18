# Workflow: 204 - Plan Evaluation and Validation

**Objective**: Evaluate technical design plans for completeness, accuracy, and implementation readiness without writing production code. Provide structured assessment with actionable recommendations for plan improvement.

## Agents

- @agents/technical-architect.md (Primary - drives evaluation process)
- @agents/frontend-architect.md, @agents/backend-architect.md, @agents/data-architect.md (Architecture validation)
- @agents/frontend-engineer.md, @agents/backend-engineer.md, @agents/data-engineer.md (Code pattern validation)

## Template & Rules

- @templates/11 - Technical Design.md (Reference for structure validation)
- @rules/\* - Evaluate all project rules

## Context Files

- **REQUIRED**: Specific feature file to evaluate (must be provided)
- Technical design document to evaluate
- `_docs/design/*` - Architecture documents
- All `*/AGENT.md` files - Implementation patterns and architectural context related to the changes.

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @rules/common/user-clarification.md

### Validation Questions

1. **Feature File**: What specific feature file needs to be evaluated? (REQUIRED - must be provided)
2. **Design Document**: What technical design document needs to be evaluated?
3. **Evaluation Scope**: What specific aspects need validation (completeness, accuracy, implementation readiness)?
4. **Architecture Context**: Are all relevant architecture documents available for reference?
5. **Codebase Access**: Can the current codebase be accessed for validation?
6. **Success Criteria**: What defines a successful evaluation outcome?

### Critical Requirements

**STOP IMMEDIATELY** if:

- No specific feature file is provided for evaluation
- Feature file does not exist in `_docs/features/in-progress/` or `_docs/features/`
- Feature file is not accessible or readable

---

## Execution Checklist

### 1. Primary Coordination

- [ ] Activate @agents/technical-architect.md as workflow driver
- [ ] Review technical design document for structure and completeness
- [ ] Analyze document against @templates/11 - Technical Design.md structure
- [ ] Coordinate with specialized architect agents for domain-specific validation
- [ ] Coordinate with engineer agents for implementation pattern validation

### 2. Architecture Validation

- [ ] **Frontend**: Activate @agents/frontend-architect.md, review `_docs/design/05 - Frontend Architecture.md`, validate component patterns and state management
- [ ] **Backend**: Activate @agents/backend-architect.md, review `_docs/design/04 - Backend Architecture.md`, validate API design and business logic
- [ ] **Data**: Activate @agents/data-architect.md, review `_docs/design/03 - Data Model.md`, validate schema changes and data access patterns

### 3. Code Pattern Validation

- [ ] **Frontend**: Activate @agents/frontend-engineer.md, validate component architecture and integration points
- [ ] **Backend**: Activate @agents/backend-engineer.md, validate API design and business logic implementation
- [ ] **Data**: Activate @agents/data-engineer.md, validate schema design and data access implementation

### 4. Document Structure Verification

- [ ] Clear purpose, scope, and problem statement
- [ ] Complete `Change Summary Table` (workflow 010)
- [ ] Sufficient `Implementation Details` (no production code, workflow 010)
- [ ] Feature Overview section present and complete (workflow 008)
- [ ] System/User Flow section with Mermaid diagram (workflow 008)
- [ ] Test Scenarios section with Gherkin syntax (workflow 009)
- [ ] Document follows @templates/11 - Technical Design.md structure

### 5. Technical Accuracy Verification

- [ ] All existing file paths referenced exist in repository
- [ ] Function/module names are correct and discoverable
- [ ] Data model changes align with `Data_Model.md`
- [ ] Firestore schema/index implications identified
- [ ] Path aliases comply with conventions
- [ ] New files clearly marked with sufficient implementation details
- [ ] Existing files that should be modified but aren't mentioned are identified

**CRITICAL**: New files planned for creation are expected to not exist yet - only flag existing files that should be modified but aren't mentioned.

### 6. Codebase Impact Assessment

- [ ] All affected existing files listed
- [ ] All new files to be created are identified
- [ ] Change descriptions are accurate for existing files
- [ ] Implementation details sufficient for new files (function signatures, patterns, integration)
- [ ] Hidden dependencies and shared utilities identified
- [ ] Code deduplication opportunities identified
- [ ] Existing code that can be removed or simplified
- [ ] DRY implementation strategy documented
- [ ] Code smells and technical debt addressed
- [ ] Dependencies between changes mapped
- [ ] Circular dependencies identified
- [ ] Optimal implementation order determined
- [ ] External dependencies checked
- [ ] Implementation follows workflow 010 patterns (types, functions, modules structure)

### 7. Testing Strategy Validation

- [ ] Gherkin scenarios comprehensive and map to flow (workflow 009)
- [ ] Edge/boundary cases covered
- [ ] Integration points have test coverage
- [ ] E2E tests align with existing patterns
- [ ] All scenarios tagged with @status_pending and @status_complete (workflow 009 requirement)
- [ ] Scenarios use Example tables for DRY patterns (workflow 009 requirement)
- [ ] Scenarios follow the @rules/common/test-gherkin-definition.md

### 8. Risk Assessment

- [ ] Potential failure points identified
- [ ] Security implications addressed
- [ ] Data loss risks assessed
- [ ] User experience impact evaluated

### 9. Implementation Readiness Assessment

- [ ] All prerequisites identified
- [ ] Implementation order logical and dependency-aware
- [ ] Dependencies between changes clear
- [ ] External dependencies verified
- [ ] Internal API contracts validated
- [ ] Implementation timeline realistic
- [ ] Evaluate completeness of implementation specifications
- [ ] Assess technical feasibility and architectural alignment
- [ ] Validate testing strategy comprehensiveness
- [ ] Identify potential risks and mitigation strategies
- [ ] Determine implementation order and dependencies

### 10. Generate Evaluation Report

- [ ] Create structured evaluation report with severity classifications
- [ ] Provide specific, actionable recommendations for each issue
- [ ] Deliver clear overall assessment (Ready/Needs Work/Not Ready)

---

## Post-Validation Checklist

- [ ] All document sections analyzed for completeness and accuracy
- [ ] Technical accuracy verified against codebase and architecture
- [ ] Implementation readiness assessed with clear recommendations
- [ ] Risk assessment completed with mitigation strategies
- [ ] Evaluation report generated with severity classifications
- [ ] Actionable recommendations provided for all identified issues
- [ ] Overall assessment delivered with clear next steps

---

# Report Template (Return in chat)

## **CRITICAL**: New files that don't exist yet are NOT "missing" - they are planned for creation.

## Evaluation Report Template

**CRITICAL**: Final response must be numbered.

### Executive Summary

Provide high-level assessment of plan completeness, accuracy, and readiness for implementation.

### Issues

#### I1. 🔴|🟡|🔵 [Describe what is wrong]

_Action_: [Exact, concise fix]

#### I2. 🔴|🟡|🔵 [...]

_Action_: [...]

#### I3. 🔴|🟡|🔵 [...]

_Action_: [...]

### Risk Assessment

#### R1. 🔴|🟡|🔵 [Describe the risk]

_Mitigation_: [Action to reduce risk]

#### R2. 🔴|🟡|🔵 [...]

_Mitigation_: [...]

### Conclusion

## **Overall Assessment**: [Ready/Needs Work/Not Ready]

## Severity Classifications

- 🔴 **High**: Blocks implementation or significantly impacts correctness, security, or architecture
- 🟡 **Medium**: High-impact gaps or inaccuracies; should be resolved in current iteration
- 🔵 **Low**: Clarity or documentation issues; can be scheduled
