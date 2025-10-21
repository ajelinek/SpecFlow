# Workflow: 101 - Project Overview Generation

**Objective**: Create the foundational `D01 - Project Overview.md` document that establishes core business purpose, target users, and success criteria for the project.

## Required Inputs

**MUST STOP** if any required information is missing. Ask for clarification before proceeding. @fragments/user-clarification.md

## Validation Questions

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

## Agents to Invoke

- [ ] Activate @agents/product-manager.md persona
- [ ] Consult with @agents/domain-expert.md for domain expertise

## Execute Checklist

- [ ] Use @templates/T01 - Project Overview.md structure
- [ ] Create 3-5 critical user journeys
- [ ] Establish measurable success metrics
- [ ] Ensure business clarity (no technical jargon)
- [ ] Check logical flow and organization
- [ ] Value proposition clearly differentiates from competitors
- [ ] User goals are specific and measurable
- [ ] Success metrics are quantifiable and relevant
- [ ] All 6 template sections populated with specific content
- [ ] Store completed document in `_docs/design/Project_Overview.md`

**Note**: All responses should follow @fragments/response-formatting.md
