---
name: 107-ui-experience
description: >
  Use `107` to define or refresh product navigation, user flows, interaction and recovery patterns,
  and the page/route inventory. Trigger it for prompts like "107", "user experience", "UX design",
  "navigation design", "interaction patterns", or "information architecture" when users' paths
  through the product need clarity. Visual presentation belongs in `106-ui-design`.
---

# 107 - UX & Navigation

Record how users accomplish their tasks: entry points, navigation, shared interaction behavior,
recovery, and pages/routes. Keep a short experience model and page table, not a screen-by-screen
script or a speculative sitemap for the whole future product.

D06 owns visual presentation; D05 owns routing, state, and component implementation conventions.
D07 describes user-facing behavior and access expectations, not a security enforcement mechanism;
reference actual access enforcement in D04/D05 where applicable. Reference the project's accessibility
standard and record interaction-specific decisions rather than repeat its checklist. D08 applies
these decisions to an individual page.

`106` and `107` are independently optional and can run in either order. Use existing context when
sufficient; missing upstream documents are not a reason to generate the whole planning series.

**Output path**: `.specflow/docs/D07-ui-experience.md`

---

## Required Inputs

1. **Users and tasks** — primary goals, relevant roles/access expectations, and workflows in scope
2. **Current structure** — known pages, routes, entry points, or a rough initial inventory
3. **Constraints** — device/accessibility needs and established navigation or routing conventions

An existing product can supply these inputs directly. Research, onboarding needs, and competitor
patterns help when relevant; they are not prerequisites or reasons to invent extra pages.

---

## Steps

- [ ] **Step 1: Load project context.** Update an existing D07 rather than create a competing copy.
  Read `.specflow/context/domain-knowledge.md` when present, especially user roles, real workflows,
  decision points, friction, terminology, constraints, and implications for this project. Use these to
  identify the core tasks and experience gaps the design should address. Load governing guidance,
  relevant product goals, and D04/D05/D06 decisions. Inspect actual routes, navigation, and representative
  flows in an existing product; use focused exploration when useful. Distinguish established behavior
  from proposed changes.

- [ ] **Step 2: Resolve inputs.** Use domain knowledge and loaded context to answer gaps before using
  `gap-check` for those that still block experience decisions. Don't ask again about confirmed choices.
  Keep non-blocking uncertainties, including uncertain or outdated research, in Open Questions;
  clarify blocking uncertainty rather than guess. Don't treat research recommendations as confirmed
  product decisions.

- [ ] **Step 3: Resolve the experience model.** Respect confirmed user decisions and binding project
  rules. Compare alternatives only when there is a meaningful unresolved choice; use as many as help
  explain the tradeoff, with no fixed count or required worker calls. Work directly or use focused
  research/review when useful. Use the domain-informed design focus to judge task completion,
  discoverability, role needs, device support, accessibility, and feasibility; use domain terminology
  for navigation labels and include relevant findings in any delegated brief. Surface conflicts with
  existing decisions to the user before changing them; recommend and confirm material unresolved
  product choices.

- [ ] **Step 4: Draft the document.** Use `./templates/T07 - UI Experience Overview.md` as an adaptable,
  skimmable structure:
  - **Experience Model** — agreed scope, domain-grounded task priorities and experience gaps, and
    entry-to-outcome paths. Reference relevant domain findings and detailed feature journeys rather
    than duplicate them; keep cross-page flows short.
  - **Navigation** — hierarchy, entry/exit relationships, role differences, responsive navigation,
    and user-facing deep-link/back behavior where relevant. Leave router and state wiring to D05.
  - **Interaction & Recovery** — shared action/feedback conventions, relevant loading/empty/error
    behavior, preserving input and recovery, and keyboard/focus expectations. Describe outcomes,
    not component appearance or a complete accessibility checklist.
  - **Pages & Routes** — page/view name, route, purpose/primary action, and access. Cover workflows
    in the agreed scope, not every possible future capability. Preserve known routes; label proposed
    routes or unresolved paths instead of presenting guesses as existing behavior. Modals, drawers,
    and inline states stay with their owning view unless they are independently navigable views.
  - **Alternatives Considered** — only meaningful options actually evaluated, with a short decision reason.
  - **Open Questions** — unresolved choices or checks and their impact; omit when none remain.
  Keep unaffected inventory entries when updating an existing D07. Don't add pages, roles, or patterns
  merely to fill the template.

- [ ] **Step 5: Quality check.** Can the intended users complete the scoped tasks through the named
  pages and transitions? Routes, navigation, and access expectations agree with confirmed requirements
  and implementation constraints. Decisions and proposals are distinguishable; recovery paths are
  understandable; visual rules and implementation details remain in their owning sources.

- [ ] **Step 6: Write and summarize.** Remove template instructions, examples, placeholders, and empty
  optional sections. Write the file; report material decisions, inventory changes, sources, and open
  questions. Suggest `106-ui-design`, `108-ui-page-design`, or feature work only when that work is needed.
