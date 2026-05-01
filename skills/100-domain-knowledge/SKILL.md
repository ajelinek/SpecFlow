---
name: 100-domain-knowledge
description: >
  Use `100` to establish or refresh domain knowledge before project planning or feature design.
  Trigger it for prompts like "100", "domain knowledge", "domain research", "industry context",
  or when the project needs research-backed understanding of users, workflows, terminology,
  regulations, or differentiators.
---

# 100 - Domain Knowledge

Produce the domain knowledge document for a project. This document captures the external context
the team needs before making product, architecture, UX, or implementation decisions: users,
workflows, terminology, constraints, market expectations, and differentiation.

It is not a product spec or business plan. It is a research-backed reference for downstream
SpecFlow workflows.

**Output path**: `.specflow/context/domain-knowledge.md`

---

## Required Inputs

Before proceeding, confirm:

1. **Product concept**
2. **Target domain or industry**
3. **Target users**
4. **Known constraints** — regulatory, geographic, compliance, budget, timeline, or similar

Optional but useful: named competitors, seed URLs, existing customer research, assumptions, or a
draft project overview.

If any required input is missing, ask before researching.

---

## Steps

- [ ] **Step 1: Validate inputs.** Make sure the product, domain, users, and major constraints are
  defined well enough to research.

- [ ] **Step 2: Load existing project context.** If `.specflow/context/domain-knowledge.md` exists,
  treat it as a draft to update. Read D01 and D10 when present. If the repo already exists and you
  need product context, use `@explore` for a concise summary of high-signal files only.

- [ ] **Step 3: Define the research brief.** Narrow the run to:
  - the domain to understand
  - the users or buyers that matter most
  - the product decisions this research should inform
  - differentiation questions to answer
  - explicit exclusions or constraints

- [ ] **Step 4: Research with `deep-research`.** This step is required unless the user explicitly
  asks for a lightweight draft from known context only. Direct the research toward:
  - market context and current framing
  - user roles and real workflows
  - competitor and substitute patterns
  - regulatory or operational constraints
  - differentiation opportunities
  - terminology and domain concepts

  Ask for a concise, evidence-backed summary with citations and explicit uncertainty.

- [ ] **Step 5: Synthesize the domain reference.** Convert the research into concrete guidance for
  downstream workflows:
  - what the domain is and how it is changing
  - who the important users or buyers are
  - what workflows, decisions, and constraints shape their world
  - what makes a credible solution in this market
  - what appears differentiated, risky, or unproven about this project's direction
  - what terms, entities, and assumptions later docs must preserve

- [ ] **Step 6: Draft the document.** Use `./templates/T00 - Domain Knowledge.md` and fill all
  sections with concrete, research-grounded content.

- [ ] **Step 7: Quality check.** Confirm:
  - the document is grounded in live research unless the user explicitly asked for a draft
  - important claims are supported by cited sources
  - workflows reflect how users actually operate
  - differentiation covers both opportunity and uncertainty
  - unknowns are stated explicitly

- [ ] **Step 8: Write the file and summarize.** Write
  `.specflow/context/domain-knowledge.md`, then report the main market/user insights, weak evidence
  or open questions, and suggest `101-project-overview` next.

---

## Rules

1. Use live research for non-trivial domain claims unless the user explicitly asks for a draft.
2. Treat `deep-research` as the default path for this workflow.
3. Separate facts, interpretation, and recommendation.
4. Prefer user workflows and decision-shaping constraints over generic market trivia.
5. Keep the document business-level and decision-relevant.

## Additional Guidance

**On per-section quality expectations**: Each section in the domain knowledge document must contain
concrete, research-grounded content:
- **Domain Overview**: explains the market or industry in plain language and names the forces
  shaping it now
- **User Landscape**: identifies primary users or buyers, what they are trying to accomplish, and
  what makes their environment difficult
- **Domain Workflows & Decision Points**: describes real-world processes the product must fit into
  or improve
- **Market Expectations & Differentiation**: names what users already expect and where this product
  can win or must be careful
- **Regulatory / Operational Constraints**: includes only constraints that materially affect product
  shape or delivery
- **Domain Vocabulary & Concepts**: defines terms and distinctions later documents must use
  consistently
- **Implications For This Project**: translates research into concrete guidance for D01 and later
  workflows — this section should tell the team what to prioritize, what to avoid copying blindly,
  and what expectations must still be met
