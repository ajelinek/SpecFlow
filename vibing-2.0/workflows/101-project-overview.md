# Workflow: 101 - Project Overview Generation

**Objective**: Create the foundational `01 - Project Overview.md` document that establishes core business purpose, target users, and success criteria for the project.

## Agents

- @agents/product-manager.md
- @agents/domain-expert.md

## Template

- @templates/project-overview.md

## Rules:

- @rules/common/response-formatting.md
- @rules/common/user-clarification.md

---

## Pre-Flight Validation

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @rules/common/user-clarification.md

1. **Pain Point**: What specific problem does this application solve that existing solutions don't address well?
2. **Competitive Differentiation**: Who are direct competitors and how will this application differentiate itself?
3. **User Workflows**: What are the most common user workflows in your target domain?
4. **User Personas**: Are there different user personas within each user type that have distinct needs?
5. **Platform Access**: What devices/platforms will users primarily access this application from?
6. **Minimum Viable Features**: What's the minimum viable feature set needed to deliver core value?
7. **User Feedback**: How will you measure user satisfaction and gather feedback?
8. **System Integration**: Are there existing systems this application needs to integrate with?
9. **Scalability Requirements**: What are your scalability requirements (expected user volume, data size, geographic distribution)?
10. **Security/Compliance**: Are there specific security, compliance, or regulatory requirements?
11. **Deployment Environment**: What's your preferred deployment environment and infrastructure setup?

---

## Execution Checklist

### 1. Invoke Product Manager Agent

- [ ] Activate @agents/product-manager.md persona
- [ ] Consult with @agents/domain-expert.md for domain expertise

### 2. Generate Project Overview

- [ ] Use @templates/project-overview.md structure
- [ ] Populate all 6 sections with specific content
- [ ] Create 3-5 critical user journeys
- [ ] Establish measurable success metrics

### 3. Apply Quality Standards

- [ ] Ensure business clarity (no technical jargon)
- [ ] Verify all sections populated with specific content
- [ ] Check logical flow and organization

---

## Post-Validation Checklist

- [ ] All 6 template sections populated with specific content
- [ ] Value proposition clearly differentiates from competitors
- [ ] User goals are specific and measurable
- [ ] Success metrics are quantifiable and relevant
- [ ] Document follows @rules/common/response-formatting.md
- [ ] Store completed document in `_docs/design/Project_Overview.md`

---

## Success Criteria

Complete when all pre-flight validation requirements are met, Product Manager agent has generated complete project overview, and document is stored in `_docs/design/Project_Overview.md`.
