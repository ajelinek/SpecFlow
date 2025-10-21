# Workflow: 204 - Plan Evaluation and Validation

**Objective**: Evaluate technical design plans for completeness, accuracy, and implementation readiness without writing production code. Provide structured assessment with actionable recommendations for plan improvement.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

- Specific feature file path for evaluation (e.g., `_docs/features/in-progress/feature-name-technical-design.md`)

## Validation Questions

1. **Design Document**: What technical design document needs to be evaluated?
2. **Evaluation Scope**: What specific aspects need validation (completeness, accuracy, implementation readiness)?
3. **Architecture Context**: Are all relevant architecture documents available for reference?
4. **Codebase Access**: Can the current codebase be accessed for validation?
5. **Success Criteria**: What defines a successful evaluation outcome?

## Agents to Invoke

- [ ] Activate @agents/technical-architect.md as workflow driver
- [ ] Review technical design document for structure and completeness
- [ ] Analyze document against @templates/T11 - Technical Design.md structure
- [ ] Coordinate with specialized architect agents for domain-specific validation
- [ ] Coordinate with engineer agents for implementation pattern validation

## Execute Checklist

- [ ] **Frontend**: Activate @agents/frontend-architect.md, review `_docs/design/D05 - Frontend Architecture.md`, validate component patterns and state management
- [ ] **Backend**: Activate @agents/backend-architect.md, review `_docs/design/D04 - Backend Architecture.md`, validate API design and business logic
- [ ] **Data**: Activate @agents/data-architect.md, review `_docs/design/D03 - Data Model.md`, validate schema changes and data access patterns
- [ ] **Frontend**: Activate @agents/frontend-engineer.md, validate component architecture and integration points
- [ ] **Backend**: Activate @agents/backend-engineer.md, validate API design and business logic implementation
- [ ] **Data**: Activate @agents/data-engineer.md, validate schema design and data access implementation
- [ ] Clear purpose, scope, and problem statement
- [ ] Complete `Change Summary Table` (workflow 010)
- [ ] Sufficient `Implementation Details` (no production code, workflow 010)
- [ ] Feature Overview section present and complete (workflow 008)
- [ ] System/User Flow section with Mermaid diagram (workflow 008)
- [ ] Test Scenarios section with Gherkin syntax (workflow 009)
- [ ] Document follows @templates/T11 - Technical Design.md structure
- [ ] All existing file paths referenced exist in repository
- [ ] Function/module names are correct and discoverable
- [ ] Data model changes align with `Data_Model.md`
- [ ] Firestore schema/index implications identified
- [ ] Path aliases comply with conventions
- [ ] New files clearly marked with sufficient implementation details
- [ ] Existing files that should be modified but aren't mentioned are identified
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
- [ ] Gherkin scenarios comprehensive and map to flow (workflow 009)
- [ ] Edge/boundary cases covered
- [ ] Integration points have test coverage
- [ ] E2E tests align with existing patterns
- [ ] All scenarios tagged with @status_pending and @status_complete (workflow 009 requirement)
- [ ] Scenarios use Example tables for DRY patterns (workflow 009 requirement)
- [ ] Scenarios follow the @rules/common/test-gherkin-definition.md
- [ ] Potential failure points identified
- [ ] Security implications addressed
- [ ] Data loss risks assessed
- [ ] User experience impact evaluated
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
- [ ] Create structured evaluation report with severity classifications
- [ ] Provide specific, actionable recommendations for each issue
- [ ] Deliver clear overall assessment (Ready/Needs Work/Not Ready)
- [ ] All document sections analyzed for completeness and accuracy
- [ ] Technical accuracy verified against codebase and architecture
- [ ] Implementation readiness assessed with clear recommendations
- [ ] Risk assessment completed with mitigation strategies
- [ ] Evaluation report generated with severity classifications
- [ ] Actionable recommendations provided for all identified issues
- [ ] Overall assessment delivered with clear next steps

**Note**: All responses should follow @fragments/response-formatting.md
