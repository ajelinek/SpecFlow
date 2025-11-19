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

## Design Context

- [ ] Use @vibing/templates/T12 - Technical Design Validation.md for evaluation report format
- [ ] Analyze document against @vibing/templates/T11c - Implementation Design.md structure
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

## Execute Checklist

**Document Structure Validation**

- [ ] Feature Overview section present and complete (section 1, workflow 201)
- [ ] User Journey sequence diagram present (section 2, workflow 201)
- [ ] Component Architecture diagrams complete (section 2.5, workflow 203)
- [ ] Frontend Change Summary Table complete (section 3, workflow 203)
- [ ] Backend Change Summary Table complete (section 4, workflow 203)
- [ ] Frontend Implementation Details sufficient (section 5, workflow 203)
- [ ] Backend Implementation Details sufficient (section 6, workflow 203)
- [ ] Test Scenarios section with Gherkin syntax present (section 7, workflow 202)
- [ ] Document follows @vibing/templates/T11c - Implementation Design.md structure

**Technical Validation**

- [ ] Component Architecture diagrams accurately represent all components/modules from Change Summary Tables
- [ ] Frontend State Flow diagram stops at backend boundary showing API calls and returns but not backend internals
- [ ] All frontend items in Change Summary Table have corresponding Implementation Details **EXCEPT** style modules
- [ ] All backend items in Change Summary Table have corresponding Implementation Details
- [ ] Implementation details use interface signatures as headings with Purpose and Constraints
- [ ] No duplication of existing functionality identified
- [ ] Implementation aligns with established architecture patterns
- [ ] Test scenarios address all user journeys and business rules

**Quality Assurance**

- [ ] Diagrams are compact and focused
- [ ] Change Summary Tables are complete and accurate
- [ ] Implementation details focus on WHAT and WHY, not HOW
- [ ] All test scenarios follow Gherkin standards and are properly tagged
- [ ] Critical risks and dependencies identified

**Evaluation & Reporting**

- [ ] Generate evaluation report using @vibing/templates/T12 - Technical Design Validation.md format
- [ ] Provide Executive Summary with high-level assessment
- [ ] List issues with severity classifications (🔴 High, 🟡 Medium, 🔵 Low)
- [ ] Provide specific, actionable recommendations for each issue
- [ ] Deliver clear overall assessment (Ready/Needs Work/Not Ready)

**Completion**

- [ ] Store evaluation report in appropriate location (e.g., `_docs/features/in-progress/[feature-name]-validation.md` or append to technical design document)

**Note**: All responses should follow the response formatting guidelines in AGENTS.md
