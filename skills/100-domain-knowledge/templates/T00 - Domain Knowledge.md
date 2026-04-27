# T00 — Domain Knowledge

> **Purpose**: Capture the market, user, workflow, and regulatory context the team must understand before planning the product. This document explains the domain the product must fit into, what users already expect, what differentiates a strong solution, and what downstream SpecFlow documents should preserve.
>
> Instructions: Replace all placeholder text with specific content grounded in current research. Remove this instruction block before committing.

---

## 1. Domain Overview

**Project**: [Project or working product name]

**Domain**: [Industry, market, or problem space]

**Last updated**: [Date]

**Research date**: [Date the external research was performed]

**Bottom line**: [2-4 sentences summarizing the domain, what users need most, and what this project should focus on to be credible and differentiated.]

---

## 2. Market Context

[Summarize how this market or domain is currently structured, what pressures or trends shape it, and what users or buyers generally expect from solutions in this space. Keep this grounded and specific rather than encyclopedic.]

- **Current state**: [How the market operates today]
- **Important trends**: [What is changing and why it matters]
- **Relevant substitutes**: [Competing products, manual workflows, or adjacent tools users compare against]

---

## 3. User Landscape

| User or Buyer Type | Primary Goal | Main Friction or Constraint | What They Care About Most |
|---|---|---|---|
| [Example: Operations manager] | [Keep a workflow moving without manual reconciliation] | [Works across disconnected tools and approval steps] | [Reliability, visibility, speed] |
| [Example: Frontline end user] | [Complete a recurring task quickly and correctly] | [Context switching, unclear terminology, high error cost] | [Clarity, low effort, confidence] |
| [Optional additional role] | [Goal] | [Constraint] | [Priority] |

---

## 4. Domain Workflows & Decision Points

[Describe the real-world workflows the product must fit into or improve. Focus on what users actually do today, not the idealized product flow.]

1. **[Workflow name]**: [Who performs it, what triggers it, the major steps, and what counts as a successful outcome.]
2. **[Workflow name]**: [Who performs it, what triggers it, the major steps, and what counts as a successful outcome.]
3. **[Workflow name]**: [Who performs it, what triggers it, the major steps, and what counts as a successful outcome.]

**Decision points that matter**:

- [A moment where a user, approver, or system has to make a consequential decision]
- [Another domain-specific branching point or dependency]

---

## 5. Market Expectations & Differentiation

### What users already expect

- [Baseline capability or quality bar already established by incumbents or substitutes]
- [Another expectation the product must satisfy just to be credible]
- [A workflow, reporting, trust, or compliance expectation that cannot be ignored]

### Where this project can differentiate

- [A focused area where the proposed product direction can be meaningfully better]
- [Another advantage or wedge supported by the research]
- [A constraint-aware focus area the build should prioritize early]

### Risks to the current thesis

- [Assumption that still looks weak, unproven, or risky]
- [Area where the market may be more crowded or harder to displace than first assumed]

---

## 6. Regulatory / Operational Constraints

[Include only constraints that materially affect product shape, trust model, rollout, or delivery. Remove this section if nothing meaningful applies.]

- **Regulatory**: [Relevant laws, standards, or approval requirements]
- **Operational**: [Procurement, audit, integration, staffing, or workflow realities]
- **Geographic or market-specific**: [Regional differences that matter]

---

## 7. Domain Vocabulary & Concepts

[Define the terms, entities, and distinctions that downstream documents should use consistently. Prefer terms users in the domain actually use.]

- **[Term or concept]**: [Plain-language meaning and why it matters]
- **[Term or concept]**: [Plain-language meaning and why it matters]
- **[Term or concept]**: [Plain-language meaning and why it matters]

---

## 8. Implications For This Project

[Translate the research into concrete guidance for the build and later SpecFlow workflows.]

- **Implications for `101-project-overview`**: [What value proposition, user framing, or scope choices D01 should reflect]
- **Implications for architecture and data**: [Constraints or workflow realities D02-D05 must respect]
- **Implications for UX and UI**: [Mental models, terminology, density, trust, or workflow expectations D06-D08 should reflect]
- **Implications for feature planning**: [Which capabilities or feature slices deserve early attention]

---

## 9. Sources & Confidence Notes

[List the most important sources used and note any material uncertainty or thin evidence.]

- [Source title] — [Publisher/site], [date or version if available], [why it matters]
- [Source title] — [Publisher/site], [date or version if available], [why it matters]
- [Source title] — [Publisher/site], [date or version if available], [why it matters]

**Open questions**:

- [ ] [Important unresolved question the team should validate]
- [ ] [Important unresolved question the team should validate]
