---
name: 108-ui-page-design
description: >
  Use `108` to design or refine a page or related page family with high-fidelity HTML, selectable
  states, responsive previews, and a maintained page/route index. Trigger it for prompts like
  "108", "page design", "wireframe", "design the [page] page", or "update the page design index".
argument-hint: "[page-name]"
---

# 108 - UI Page Design

For human-facing Markdown, prefer headings and labeled bullets; use tables only for compact comparisons.
Keep required structured syntax unchanged.

Design one page or a closely related page family per run, for one solution. Related routes can
share a mockup when that makes the experience easier to review; unrelated pages stay separate.
Preserve successful existing designs and preview patterns rather than regenerate them by default.

- `mockup.html` — high-fidelity HTML with review controls, realistic content, and simulated states.
  The primary visual reference, not production implementation or proof of accessibility compliance.
- `overview.md` — the context the visual can't carry: purpose, routes and parameters, access rules,
  data sources, interaction outcomes, and unresolved decisions. Don't narrate the visible layout.
- `index.html` — the solution's complete page/route catalog and stable entry point for design review.

**Page output**: `.specflow/docs/D08-ui-pages/<page-name>/{overview.md,mockup.html}`

**Shared index**: `.specflow/docs/D08-ui-pages/index.html`

Every run creates or refreshes the shared index, not a new index per run. Both page artifacts
(`overview.md` and `mockup.html`) link back to it. Follow project path overrides while keeping one
stable entry link. An index-only request reconciles the catalog without redesigning pages.

---

## Required Inputs

1. **Scope** — page/family, known routes, purpose, and primary user actions; or index-only maintenance
2. **Users and data** — access/role differences and what users see, enter, or change
3. **Design constraints** — established visual/interaction patterns and relevant device needs

Resolve these from project evidence before asking. Missing D06/D07 documents are not a reason to
generate the planning series; existing UI, known routes, and confirmed user intent can be sufficient.

---

## Steps

- [ ] **Step 1: Load project context.** Read governing guidance and relevant D01/D03/D05/D06/D07
  decisions, the existing index, this page's artifacts, and representative D08 patterns. Read relevant
  `.specflow/context/domain-knowledge.md` findings to ground terminology, workflows, and state choices.
  Inspect actual route definitions in an existing app, not the whole implementation. Treat existing
  designs as drafts to refine; distinguish confirmed intent, current behavior, and proposals.

- [ ] **Step 2: Resolve scope and gaps.** Use loaded context before `gap-check` for blocking gaps.
  Confirm which related routes share this design and which remain outside it. Surface conflicts with
  existing decisions to the user before changing them. Confirm material new routes or product behavior;
  update an existing D07 inventory for approved navigation changes. Keep non-blocking uncertainties in
  Open Questions, not guessed requirements. For index-only maintenance, continue at Step 6.

- [ ] **Step 3: Compare three designs.** For page-design runs, invoke three fresh, independent
  `@designer` subagents in parallel (general design workers if `@designer` is unavailable). Give each
  the same confirmed brief: user goals, routes/parameters, data, roles, responsive needs, D06/D07 rules,
  relevant domain findings, existing designs, and required state coverage. Assign distinct starting
  approaches: content-led, spatial/layout-led, and action-led. Require concrete layout/hierarchy and
  interaction proposals, not just color changes or renamed versions of one idea. Keep confirmed product
  and visual decisions intact; return a conflict rather than invent differences that violate them.
  - Evaluate all three for task completion, hierarchy, state coverage, role differences, responsive
    usability, accessibility, D06/D07 consistency, and reuse. Select the strongest approach; record why
    each other direction lost and any specific elements worth borrowing. Rework near-duplicate candidates
    before selecting. The invoking skill owns comparison and the selected HTML artifact; three full
    HTML deliverables are not required. If independent subagents are unavailable, stop and report the
    limitation rather than claim an independent comparison.
  - Cover relevant loading, empty, error, success, validation, permission, and overlay states without
    inventing a feature or enumerating every combination of roles, data, and devices. Preserve existing
    state views and preview controls; removing or merging a distinct state requires user approval.

- [ ] **Step 4: Produce or refine `mockup.html`.** Preserve the fidelity that makes design review
  useful: full layout, realistic synthetic content, established typography/colors, and important
  interactive states. Use self-contained HTML/CSS and local JavaScript for simulation, with no backend
  calls, CDN/runtime dependencies, or build step. Inline styles/scripts and SVG are appropriate for
  this design artifact; they are not production engineering conventions.
  - Put a clearly labeled preview toolbar at the top, not part of the product UI. Make the designed
    views/states selectable there, with role/theme/data controls only where they clarify real differences.
    Include an **All page designs** link to `../index.html`.
  - Every documented state must be rendered and selectable in the HTML, not just described in Markdown.
    Include applicable dialogs, drawers, sheets, menus, and confirmations, along with error and recovery
    views. A state that cannot be triggered through a simulated flow still needs a direct preview control.
  - Simulate primary actions and transitions enough to review outcomes. Clearly label actions outside
    the prototype's scope; don't imply that a preview sends messages, saves real data, or enforces access.
  - Show the primary and secondary device layouts through responsive resizing, a viewport selector,
    or side-by-side frames. Use semantic HTML, labeled controls, visible focus, and relevant accessible
    interaction behavior; avoid hard-coded device sizes unless grounded in project decisions.
  - Give each represented route/view and meaningful review state a stable preview deep link (a hash
    preset is fine). Fresh loads and browser Back/Forward restore the selection and toolbar state.
    Preserve existing working preview links. Show the displayed application URL for the current view,
    including applicable path/search parameters, separately from mockup-only controls and hash presets.
  - Immediately after the opening `<html>` tag, keep this exact disclaimer:

  ```html
  <!-- DESIGN MOCKUP ONLY: This file is a static layout prototype. It does not reflect
       production code structure, component architecture, or engineering best practices.
       Do not use as a code reference or parse for implementation patterns. -->
  ```

- [ ] **Step 5: Update `overview.md`.** Use `./templates/T08 - UI Page Design.md` as an adaptable,
  skimmable structure: **Page Context**, **Routes & Parameters**, **Key Data**, **States & Interactions**,
  **Alternatives Considered**, and optional **Open Questions**. Record behavioral rules and sources,
  not pixel-by-pixel descriptions or a duplicate data model. Include each route's preview link and
  parameter meaning/defaults where known. Remove template instructions, examples, placeholders, and
  empty optional sections before writing.

- [ ] **Step 6: Reconcile the shared index.** Follow `./references/page-index.md`. Use
  `./templates/T08 - Page Index.html` for a new index; preserve an existing index's useful presentation
  and working links. Reconcile the whole known inventory, not just this run's page. Every route/view
  stays individually discoverable even when several share a single diagram. Refresh links back to
  the index in touched page artifacts; don't redesign unrelated mockups to update the catalog.

- [ ] **Step 7: Verify the result.** Check route coverage against the known inventory and verify
  every generated/changed link's path, fragment, and preset, including return links. Open the index
  and mockup in a browser when available: follow index links, test fresh route/state deep links and
  Back/Forward, primary transitions, error recovery, overlay opening/closing, and representative narrow/wide
  layouts. Check that every documented state is reachable and role differences are explicit; confirm
  the design still follows D06/D07 and the disclaimer is present. Check displayed application
  URLs against the route/parameter notes. Fix broken links or controls before reporting completion.
  If a browser is unavailable, perform file/link checks and state that browser verification was not run;
  do not claim visual or interactive validation from source inspection alone.

- [ ] **Step 8: Summarize.** Return the stable index link first, then the page mockup/overview links,
  routes and states added or changed, checks actually performed, and unresolved decisions. Suggest a
  next page only when useful. No production code, implementation tasks, or automatic commits.
