# Workflow: 204 - Plan Evaluation and Validation

**Objective**: Evaluate technical design plans for completeness, accuracy, and implementation readiness without writing production code. Provide structured assessment with actionable recommendations for plan improvement.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding.

- Specific feature file path for evaluation (e.g., `_docs/features/in-progress/feature-name-technical-design.md`)

## Validation Questions

1. **Design Document**: What technical design document needs to be evaluated?
2. **Evaluation Scope**: What specific aspects need validation (completeness, accuracy, implementation readiness)?
3. **Architecture Context**: Are all relevant architecture documents available for reference?
4. **Codebase Access**: Can the current codebase be accessed for validation?
5. **Success Criteria**: What defines a successful evaluation outcome?

## Agents to Invoke

- [ ] Activate @vibing/agents/technical-architect.md as workflow driver
- [ ] Consults with @vibing/agents/backend-architect.md for API design and business logic validation
- [ ] Consults with @vibing/agents/data-architect.md for schema changes and data access patterns validation
- [ ] Consults with @vibing/agents/frontend-engineer.md for component architecture and integration points validation
- [ ] Consults with @vibing/agents/backend-engineer.md for API design and business logic implementation validation
- [ ] Consults with @vibing/agents/data-engineer.md for schema design and data access implementation validation

## Design Context

- [ ] Use @vibing/templates/T12 - Technical Design Validation.md for evaluation report format
- [ ] Analyze document against @vibing/templates/T11 - Technical Design.md structure
- [ ] Review `_docs/design/D01 - Project Overview.md` for business context, user goals, and success metrics
- [ ] Review `_docs/design/D02 - System Architecture.md` for technical constraints
- [ ] Review `_docs/design/D03 - Data Model.md` for data access patterns
- [ ] Review `_docs/design/D04 - Backend Architecture.md` for API design patterns
- [ ] Review `_docs/design/D05 - Frontend Architecture.md` for component architecture
- [ ] Review `_docs/design/D06 - UI Design.md` for design system guidelines
- [ ] Review `_docs/design/D07 - UI Experience Overview.md` for user journey architecture and navigation patterns
- [ ] Review relevant `_docs/ui-flows/[page-name].md` files for impacted screens
- [ ] Review `_docs/features/[feature-name]-Overview.md` for feature-specific business requirements
- [ ] Review completed `_docs/features/[feature-name]-Technical_Design.md` for feature overview and system flow

**Document Structure Validation**

- [ ] Clear purpose, scope, and problem statement
- [ ] Complete `Change Summary Table` (workflow 203)
- [ ] Sufficient `Implementation Details` (no production code, workflow 203)
- [ ] Feature Overview section present and complete (workflow 201)
- [ ] System/User Flow section with Mermaid diagram (workflow 201)
- [ ] Test Scenarios section with Gherkin syntax (workflow 202)
- [ ] Document follows @vibing/templates/T11 - Technical Design.md structure

**Technical Validation**

- [ ] **Frontend**: Validate component patterns and state management
- [ ] **Backend**: Validate API design and business logic
- [ ] **Data**: Validate schema changes and data access patterns
- [ ] **Frontend**: Validate component architecture and integration points
- [ ] **Backend**: Validate API design and business logic implementation
- [ ] **Data**: Validate schema design and data access implementation
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

**Testing & Quality Validation**

- [ ] Gherkin scenarios comprehensive and map to flow (workflow 009)
- [ ] Edge/boundary cases covered
- [ ] Integration points have test coverage
- [ ] E2E tests align with existing patterns
- [ ] All scenarios tagged with @status_pending and @status_complete (workflow 009 requirement)
- [ ] Scenarios use Example tables for DRY patterns (workflow 009 requirement)
- [ ] Scenarios follow the @vibing/rules/common/test-gherkin-definition.md

**Risk Assessment**

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

**Evaluation & Reporting**

- [ ] Evaluate completeness of implementation specifications
- [ ] Assess technical feasibility and architectural alignment
- [ ] Validate testing strategy comprehensiveness
- [ ] Identify potential risks and mitigation strategies
- [ ] Determine implementation order and dependencies
- [ ] Generate evaluation report using @vibing/templates/T12 - Technical Design Validation.md format
- [ ] Provide Executive Summary with high-level assessment
- [ ] List all issues with severity classifications (🔴 High, 🟡 Medium, 🔵 Low)
- [ ] Provide specific, actionable recommendations for each issue
- [ ] Deliver clear overall assessment (Ready/Needs Work/Not Ready)
- [ ] Include Severity Classifications reference in report
- [ ] All document sections analyzed for completeness and accuracy
- [ ] Technical accuracy verified against codebase and architecture
- [ ] Implementation readiness assessed with clear recommendations
- [ ] Risk assessment completed with mitigation strategies
- [ ] Final response must be numbered as per template requirements

**Note**: All responses should follow the response formatting guidelines in AGENT.md

**Output Format**: Final evaluation report must use @vibing/templates/T12 - Technical Design Validation.md structure
