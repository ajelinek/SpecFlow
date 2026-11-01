---
name: 101-project-overview
description: >
  Use `101` to define the project's core product framing: problem, users, differentiation, and
  success criteria. Trigger it for prompts like "101", "project overview", "create project
  overview", or when a new product idea needs a structured foundation before architecture or
  feature work.
---

# 101 - Project Overview

For human-facing Markdown, prefer headings and labeled bullets; use tables only for compact comparisons.
Keep required structured syntax unchanged.

Produce the foundational product document: business purpose, target users, differentiation, key
scenarios, and success criteria. It is the main product-level reference for downstream SpecFlow
workflows. Focus on product framing, not implementation, and write for non-technical stakeholders
as well as engineers.

**Output path**: `.specflow/docs/D01-project-overview.md`

---

## Required Inputs

1. **Pain point** — what specific problem this solves that existing solutions do not address well
2. **Differentiation** — direct competitors (or solution categories) and how this stands apart
3. **Target users** — primary user types and their main goals
4. **Key scenarios** — the user journeys that represent the core value; no fixed count
5. **Success signals** — observable outcomes that show the product is succeeding; use numeric
   targets and timeframes when known, not invented precision

Optional: technology constraints, compliance/regulatory requirements, scale expectations.

---

## Steps

- [ ] **Step 1: Validate inputs.** Resolve the Required Inputs with `gap-check`. Do not proceed on
  vague product framing.

- [ ] **Step 2: Load existing context.** If D01 exists, treat it as a draft to update. Read
  `domain-knowledge.md` when present for terminology and user framing. Use `@explore` for a concise
  summary of existing docs or repo shape when that helps ground the framing.

- [ ] **Step 3: Draft the document.** Use `./templates/T01 - Project Overview.md` as a concise,
  skimmable structure. Keep the core framing explicit; omit optional sections that don't apply.
  - **Purpose & Value Proposition** — one to two sentences: problem + unique solution + who
    benefits. Under **Differentiation**, name the current alternatives and the specific advantage
    this product offers. Reference domain research rather than repeating it; label unvalidated claims.
  - **Target Users & Goals** — each user type with a specific, measurable goal, not just a role label.
  - **Key Business Scenarios** — enough journeys to explain the core value, each naming the user,
    what they're trying to accomplish, and what a successful outcome looks like. Don't pad the list.
  - **Success Signals** — observable product outcomes and how to assess them. Include confirmed
    targets and timeframes when available; record unresolved measurement decisions as open questions.
    These are product-level signals, not feature acceptance tests.
  - **Technology Constraints & Preferences** — only real, known limits or strong preferences, with
    their reasons. Omit the section if none apply; leave stack selection to `102`.
  - **High-Level Feature Categories** — major functional domains, not individual features. Note
    explicit out-of-scope boundaries when they materially clarify the product's scope.
  - **Open Questions** — unresolved assumptions or decisions only; omit when there are none.

- [ ] **Step 4: Quality check.** Value proposition is specific to this product; user goals are
  measurable or concrete; differentiation and success signals are easy to find; scenarios guide
  prioritization without a quota; language stays business-level. Name unknowns instead of guessing.
  Remove template instructions, placeholders, and empty optional sections before writing.

- [ ] **Step 5: Write and summarize.** Write the file, report what was written and unresolved
  questions, and suggest `102-system-architecture` next.
