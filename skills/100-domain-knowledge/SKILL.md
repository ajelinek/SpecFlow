---
name: 100-domain-knowledge
description: >
  Use `100` to establish or refresh domain knowledge before project planning or feature design.
  Trigger it for prompts like "100", "domain knowledge", "domain research", "industry context",
  or when the project needs research-backed understanding of users, workflows, terminology,
  regulations, or differentiators.
argument-hint: "[product/domain description]"
context: fork
---

# 100 - Domain Knowledge

Produce a research-backed reference of the external context the team needs before product,
architecture, UX, or implementation decisions: users, workflows, terminology, constraints, market
expectations, and differentiation. Not a product spec or business plan. Keep it business-level and
decision-relevant: favor user workflows and decision-shaping constraints over market trivia, and
separate facts, interpretation, and recommendation.

**Output path**: `.specflow/context/domain-knowledge.md`

---

## Required Inputs

1. **Product concept**
2. **Target domain or industry**
3. **Target users**
4. **Known constraints** — regulatory, geographic, compliance, budget, timeline, or similar

Optional: named competitors, seed URLs, existing customer research, assumptions, a draft project
overview.

Resolve these from existing context — D01, prior domain knowledge, the invocation, repo exploration
— in that order. This workflow runs in a forked context and cannot reach the user, so it does not use
`gap-check`; anything unresolved after research is reported as an open question.

---

## Steps

- [ ] **Step 1: Validate inputs.** Product, domain, users, and major constraints must be defined well
  enough to research. If the concept or domain is too thin to research at all, stop and return that
  as the result — don't research a guess.

- [ ] **Step 2: Load existing context.** If `domain-knowledge.md` exists, treat it as a draft to
  update. Read D01 and D10 when present. For an existing repo, use `@explore` for a concise summary
  of high-signal files only.

- [ ] **Step 3: Define the research brief.** The domain to understand, the users or buyers that
  matter most, the product decisions this research should inform, differentiation questions, and
  explicit exclusions.

- [ ] **Step 4: Run the live research pass.** Required unless the user explicitly asked for a
  lightweight draft from known context. Use built-in research and web search across multiple current
  sources, preferring primary sources over model memory. Cover market context, user roles and real
  workflows, competitors and substitutes, regulatory/operational constraints, differentiation
  opportunities, and terminology. Produce an evidence-backed summary with citations and explicit
  uncertainty.

- [ ] **Step 5: Draft the document.** Use `./templates/T00 - Domain Knowledge.md`. Each section must
  be concrete and research-grounded:
  - **Domain Overview** — the market in plain language and the forces shaping it now
  - **User Landscape** — primary users or buyers, what they're trying to accomplish, what makes
    their environment difficult
  - **Domain Workflows & Decision Points** — real-world processes the product must fit or improve
  - **Market Expectations & Differentiation** — what users already expect, where this product can
    win, and what is risky or unproven
  - **Regulatory / Operational Constraints** — only those that materially affect product shape or
    delivery
  - **Domain Vocabulary & Concepts** — terms, entities, and distinctions later docs must use
    consistently
  - **Implications For This Project** — concrete guidance for D01 onward: what to prioritize, what
    not to copy blindly, which expectations must still be met

- [ ] **Step 6: Quality check.** Grounded in live research (unless a draft was requested); important
  claims cited; workflows reflect how users actually operate; differentiation covers opportunity and
  uncertainty; unknowns stated explicitly.

- [ ] **Step 7: Write and summarize.** Write the file, report the main market/user insights, weak
  evidence or open questions, and suggest `101-project-overview` next.
