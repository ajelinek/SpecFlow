---
name: 100-domain-knowledge
description: >
  Use this skill when you need to establish or refresh the project's domain knowledge before
  planning, architecture, or feature design. Triggers on phrases like "domain knowledge",
  "domain research", "market analysis", "industry context", "what makes this product unique",
  "100", or when a project needs research-backed understanding of its users, workflows,
  terminology, regulations, and differentiators. Run this before 101-project-overview when the
  domain is unfamiliar, regulated, competitive, or terminology-heavy.
---

# 100 — Domain Knowledge

Produce the domain knowledge document for a project. This document captures the external context
the team must understand before making product, architecture, UX, or implementation decisions:
the market the product sits in, the users it serves, the workflows it must respect, the language
the domain uses, and the constraints that shape what a good solution looks like.

This is not a business plan and not a product spec. It is a research-backed reference that helps
every downstream SpecFlow workflow use the right terminology, prioritize the right problems, and
avoid designing against a false understanding of the domain.

Output path: `.specflow/context/domain-knowledge.md`

---

## Your Role

Approach this as a product and domain researcher. Your job is to turn a vague market or industry
description into a grounded, decision-useful domain reference. Focus on the real world the product
must fit into: user mental models, industry workflows, regulatory constraints, market expectations,
and what differentiates a strong solution from a generic one.

---

## Required Inputs

Before writing anything, confirm you have answers to all of the following. If any are missing,
ask before proceeding.

1. **Product concept** — What is the product or solution being built? A short description is enough.
2. **Target domain or industry** — What market, vertical, or problem space does it belong to?
3. **Target users** — Who are the primary users or buyer roles?
4. **Known constraints** — Are there regulatory, geographic, compliance, budget, or timeline constraints that should shape the research?

Optional but valuable: named competitors, seed URLs, assumptions the team is making, existing customer research, or a draft project overview.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm the product concept, target domain, target users, and known constraints are present. If the user only has a rough idea, ask focused questions that establish what is being built, for whom, and in what market context. Do not start research against an undefined domain.

- [ ] **Step 2: Load existing project context.** Check whether `.specflow/context/domain-knowledge.md` already exists. If it does, treat it as a prior draft and update rather than replace. Read these files if they exist:
  - `.specflow/docs/D01-project-overview.md` — to align research with the current product framing
  - `.specflow/docs/D10-feature-overview.md` — to identify workflows or capabilities the team already believes matter

  If the project has an existing codebase or docs and you need more context on the current product shape, use `@explore` to retrieve only high-signal evidence such as `README.md`, package manifests, and architecture docs. Ask for a concise summary focused on what the product appears to do today. Do not scan the codebase broadly in the main context.

- [ ] **Step 3: Define the research brief.** Before researching, write a short internal brief for this run:
  - the domain or market to understand
  - the target users and buyer roles
  - the decision this research should support
  - the likely differentiation questions to answer
  - any explicit exclusions or constraints

  Use this brief to keep the research narrow and decision-relevant.

- [ ] **Step 4: Research with `deep-research`.** This step is required unless the user explicitly asks for a lightweight draft from known context only.

  Load and use the bundled `deep-research` skill to perform live research. The goal is not generic background reading. The goal is to answer the specific domain questions that will shape the product.

  Direct the research to cover these lanes:
  - **Market context** — what category this product sits in, what users expect, and how the space is currently framed
  - **User roles and workflows** — how the target users actually work today, where friction appears, and what outcomes they care about
  - **Competitor and substitute patterns** — what existing products or manual workflows users compare against
  - **Regulatory or operational constraints** — any rules, approval flows, procurement realities, or compliance obligations that materially shape the solution
  - **Differentiation opportunities** — where the product could win by focusing differently from incumbents or generic tools
  - **Terminology and domain concepts** — the vocabulary, entities, and distinctions downstream docs must use correctly

  Ask `deep-research` to return a concise evidence-backed summary with citations, emphasizing current sources, primary sources where available, and explicit trade-offs or uncertainty.

- [ ] **Step 5: Synthesize the domain model.** Convert the research into a domain reference for downstream workflows. Capture:
  - what the domain is and how it is changing
  - who the key user or buyer groups are
  - the important workflows, decisions, and constraints they operate under
  - what makes a credible solution in this market
  - what makes this project's proposed direction distinctive or risky
  - what terminology, entities, and assumptions other SpecFlow documents must preserve

  Keep this synthesis decision-oriented. It should help later workflows choose priorities and language, not just summarize articles.

- [ ] **Step 6: Draft the document.** Use the template at `./templates/T00 - Domain Knowledge.md`. Populate every section with concrete content grounded in the research and any supplied project context.

  Quality expectations per section:
  - **Domain Overview**: explains the market or industry context in plain language and names the forces shaping it now
  - **User Landscape**: identifies primary users or buyers, what they are trying to accomplish, and what makes their environment difficult
  - **Domain Workflows & Decision Points**: describes the real-world processes the product must fit into or improve
  - **Market Expectations & Differentiation**: names what users already expect from available solutions and where this product can win or must be careful
  - **Regulatory / Operational Constraints**: includes only constraints that materially affect product shape or delivery
  - **Domain Vocabulary & Concepts**: defines the terms and distinctions later documents must use consistently
  - **Implications For This Project**: translates the research into concrete guidance for D01 and later workflows

- [ ] **Step 7: Quality check.** Before writing the file, verify:
  - The document is grounded in current research rather than model memory alone
  - Important factual claims are supported by cited sources in the document
  - The differentiation section explains both what appears unique and what still looks unproven
  - Domain workflows reflect how users actually operate, not how the product team hopes they operate
  - Terms, constraints, and assumptions are precise enough for D01, D06-D08, and 2xx workflows to reuse directly
  - Unknowns are named explicitly instead of being smoothed over

- [ ] **Step 8: Write the output.** Write the completed document to `.specflow/context/domain-knowledge.md`. Create the `.specflow/context/` directory if it does not exist.

- [ ] **Step 9: Summarize.** Report what was written, list the main market or user insights that should shape the build, call out any weak evidence or open questions, and suggest running `101-project-overview` next.

---

## Quality Bar

- Use live research for non-trivial domain claims unless the user explicitly asks for a draft from known context only.
- Treat `deep-research` as the default research path for this workflow, not an optional extra.
- Separate facts, interpretation, and recommendation. Do not blur them together.
- Prefer user workflows, buying constraints, and domain terminology that materially affect product shape over generic market trivia.
- Make the differentiation analysis useful to the build: what the product should focus on, what it should avoid copying blindly, and what expectations it must still satisfy.
- Keep the document business-level and decision-relevant. Do not drift into implementation design.
