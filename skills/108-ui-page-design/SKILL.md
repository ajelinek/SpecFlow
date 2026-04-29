---
name: 108-ui-page-design
description: >
  Use `108` to design a specific page or view in detail, including layout, mockup, interactions,
  and responsive behavior. Trigger it for prompts like "108", "page design", "wireframe", or
  "design the [page] page" when a single route or view needs a detailed design spec.
---

# 108 — UI Page Design

Produce the design specification and HTML mockup for a single application page. This skill
runs once per page and outputs two files: a minimal markdown spec that documents page
context, data requirements, and interaction flows; and a static HTML mockup that is the
primary visual reference for implementation. The HTML mockup is the authoritative design
artifact — the markdown supports it with context that cannot be read from the visual alone.

The HTML mockup is a pure design tool. It uses inline styles and placeholder data to
communicate layout and interaction intent. It does not reflect production code structure,
component architecture, or engineering best practices, and must not be used as a code
starting point.

Every design decision must trace to D01 (user goals), D06 (design system), or D07 (navigation
and page inventory). This skill does not establish new design system rules — it applies them.

Output path: `.specflow/docs/D08-ui-pages/<page-name>/`
- `overview.md` — page context, data attributes, interaction flows
- `mockup.html` — primary layout reference, including responsive states and key interactions

---

## Required Inputs

Before generating any design directions or writing any output, confirm:

1. **Page name** — Which page is being designed? Must match a route in D07's page inventory.
   If the page is not in D07, confirm whether this is a new page being added to the inventory
   before proceeding.

2. **Page purpose and primary user action** — What is the user trying to accomplish on this
   page? One sentence is sufficient if D07 already describes it; confirm it is still accurate.

3. **User roles with access** — Which user roles can reach this page? What content or actions
   differ by role? Confirm from D07 if already documented.

4. **Key data** — What data does this page display, accept as input, or submit? A rough list
   is sufficient; Step 4 will formalize it.

5. **Responsive priority** — Which form factor is primary for this page, and what must degrade
   gracefully on smaller screens? Confirm from D07 if already documented.

If any of the above are missing and cannot be resolved from D01/D06/D07, stop and ask before
proceeding.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all five required inputs are present or resolvable
      from existing SpecFlow docs. If the page is not in D07's inventory, flag this to the user
      before continuing — do not design a page that isn't accounted for in the UX architecture.

- [ ] **Step 2: Load existing context.** Check whether a design for this page already exists
      at `.specflow/docs/D08-ui-pages/<page-name>/`. If it does, treat it as a prior draft and
      update rather than replace. Use `@explore` to retrieve:
  - `.specflow/docs/D01-project-overview.md` — user workflows and goals this page must serve
  - `.specflow/docs/D06-ui-design.md` — design system: color, typography, component philosophy,
    spacing scale, motion rules
  - `.specflow/docs/D07-ui-experience.md` — navigation model, this page's entry points and
    exit routes, interaction conventions, accessibility commitments
  - `.specflow/docs/D08-ui-pages/` — list any pages already designed; scan for patterns or
    components that should be reused rather than re-invented
  - `.specflow/context/domain-knowledge.md` — if it exists, read for domain-specific display
    conventions, data sensitivity rules, or user mental models relevant to this page

  Ask `@explore` for the full contents of each file. Do not re-summarize their content in the
  output — reference them.

- [ ] **Step 3: Generate multiple layout directions using `@designer`.** Delegate to the
      `@designer` agent. Pass the following context directly — do not ask `@designer` to fetch
      files itself:

  - **Page purpose and primary user action** — from Step 1 confirmed inputs
  - **User roles and role-differentiated content** — from Step 1 and D07
  - **Responsive priority and breakpoint constraints** — from Step 1 and D07
  - **Relevant design system rules from D06** — grid, spacing, component approach, motion
    philosophy; excerpt only what governs layout decisions for this page type
  - **Navigation entry points and exit routes from D07** — how the user arrives and where they
    go next; this informs header/nav placement and primary CTA positioning
  - **Key data the page must display or collect** — from Step 1 confirmed inputs
  - **Patterns already established in D08-ui-pages** — list any reusable components or layout
    conventions seen in already-designed pages; `@designer` must extend these, not replace them
  - **Domain conventions from `domain-knowledge.md`** — if the file exists and contains
    display or layout conventions relevant to this page

  Ask `@designer` to produce **three distinct layout directions** for this page, each differing
  in information hierarchy, content density, and primary action placement. For each direction,
  describe the layout in enough detail to evaluate it — no HTML at this stage.

  **If `@designer` is not available**, use `@explore` to search for layout patterns relevant
  to this page type and user goal. Ask `@explore`: "Find layout patterns for a [page type]
  page in a [product type] product. Return three distinct approaches that differ in information
  hierarchy, content density, and primary action placement." Use those findings as the three
  directions to evaluate.

  **Handling `@designer` clarifying questions**: Answer from the documents loaded in Step 2.
  For any question you cannot resolve from context, ask the user and wait for the answer before
  continuing.

  **Handling design system conflicts**: If `@designer` proposes a layout that conflicts with
  D06 or D07, do not silently override the existing decision. Present the conflict to the user.
  If approved, update the relevant document first. If rejected, adjust the brief and re-invoke.

- [ ] **Step 4: Evaluate layout directions against product goals.** Score each direction against
      the criteria below. Use D01 (user goals), D06 (design system), D07 (UX architecture), and
      domain knowledge as the evaluation frame — not aesthetic preference.

  | Criterion | What to assess |
  |---|---|
  | User goal alignment | Does the layout surface the primary user action without friction? |
  | Design system compliance | Does it apply the grid, spacing, and component approach from D06? |
  | Navigation consistency | Does it integrate with the navigation model established in D07? |
  | Role differentiation | Does it handle role-based content variation cleanly? |
  | Responsive viability | Does it degrade gracefully to the lower-priority form factor? |
  | Pattern reuse | Does it extend existing D08 patterns rather than introducing new ones? |
  | Accessibility | Can keyboard users reach all primary actions in logical tab order? |

  Select one direction as the recommendation. Document rationale. If a second direction has
  elements worth preserving, note which specific aspects to borrow.

- [ ] **Step 5: Formalize the data and interaction inventory.** From the selected layout
      direction and the confirmed inputs, produce:

  - **Key data attributes**: Every data field or value the page displays, accepts, or submits.
    For each: name, source (API endpoint, user input, computed), and display format if relevant.
  - **Interaction flows**: Every named user flow on this page (e.g., "Submit form", "Filter
    results", "Open detail modal"). For each flow: how the user enters it, the step-by-step
    actions, and the expected outcome or next state.

- [ ] **Step 6: Produce the HTML mockup using `@designer`.** Delegate to `@designer` again.
      Pass:
  - The selected layout direction description from Step 4
  - The data and interaction inventory from Step 5
  - Responsive priority and any secondary breakpoint state that must be shown
  - Design system colors, typography, and spacing values from D06

  Ask `@designer` to produce a single self-contained `mockup.html` file that shows:
  - The complete page layout at the primary form factor
  - A responsive state at the secondary form factor, either via a CSS media query or an
    inset callout section at the bottom of the page
  - Major interactive states rendered as visible sections or toggleable tabs within the
    same file: open menus, modal dialogs, empty states, loading states if they meaningfully
    affect layout
  - Annotations (as styled comment blocks or visible labels) for role-differentiated areas

  The HTML file must:
  - Be fully self-contained — no external stylesheets, no JavaScript frameworks, no imports
  - Use inline styles or a single `<style>` block; use placeholder colors and spacing that
    approximate D06 values
  - Contain realistic placeholder content — not lorem ipsum; use domain-appropriate labels,
    values, and copy that reflect actual data from Step 5
  - Include the following HTML comment immediately after the opening `<html>` tag:
    ```html
    <!-- DESIGN MOCKUP ONLY: This file is a static layout prototype. It does not reflect
         production code structure, component architecture, or engineering best practices.
         Do not use as a code reference or parse for implementation patterns. -->
    ```

  **If `@designer` is not available**, generate the HTML mockup directly using the selected
  layout direction and data inventory as the specification. Apply the same requirements above.
  Use semantic HTML elements for structure (nav, main, section, aside, footer) even though
  this is a mockup — it makes the layout intent clearer for implementers reading the file.

- [ ] **Step 7: Quality check.** Before writing files, verify:
  - Does the HTML mockup show every primary user action from the interaction inventory?
  - Does the layout apply the color, typography, and spacing conventions from D06?
  - Are role-differentiated areas explicitly annotated in the mockup?
  - Does the mockup HTML comment appear immediately after the opening `<html>` tag?
  - Does the markdown spec contain only context not visible in the mockup? Remove any
    section that merely restates what the HTML already shows.
  - Are there placeholder items, empty flows, or unresolved data attributes? Resolve or flag
    explicitly as open questions.
  - Is this page consistent with the visual and structural patterns of already-designed pages
    in D08-ui-pages?

- [ ] **Step 8: Write the output files.** Create the directory
      `.specflow/docs/D08-ui-pages/<page-name>/` if it does not exist. Write:
  - `overview.md` — using `./templates/T08 - UI Page Design.md` as the structure
  - `mockup.html` — the HTML mockup produced in Step 6

- [ ] **Step 9: Summarize.** Report what was written, which layout direction was selected and
      why, any open questions or data attributes that need resolution, and suggest which page to
      design next based on the D07 page inventory — or suggest `109-data-access-patterns` if
      all pages with complex data needs have been designed.

---

## Additional Guidance

**On the HTML mockup as primary artifact**: The `mockup.html` file is the implementation
reference, not the markdown. The markdown exists to carry context that cannot be read from
the visual — data sources, role rules, interaction outcomes. Do not duplicate mockup content
in prose.

**On the mockup disclaimer**: Every `mockup.html` must include the HTML comment block
immediately after the opening `<html>` tag. This keeps the warning invisible to human
readers in the browser while signaling to any LLM or automated tool parsing the file that
it must not treat the HTML as an implementation pattern.

**On pattern reuse**: Before proposing any new layout pattern, check what is already established
in `.specflow/docs/D08-ui-pages/`. Extending a proven pattern is always preferred over
introducing a new one. If a new pattern is genuinely needed, note it explicitly so it can be
adopted as a standard for subsequent pages.

**On multi-direction exploration**: Three directions are required even for pages that seem
straightforward. The comparison exercise surfaces hidden assumptions. Document the rejected
directions briefly in `overview.md` under "Alternatives Considered."

**On domain knowledge**: If `.specflow/context/domain-knowledge.md` exists, read it before
generating directions. Domain conventions — data density requirements, regulatory display
rules, user population literacy levels — can eliminate entire layout directions before time
is spent on them.

**On per-page invocation**: This skill runs once per page. Do not attempt to design multiple
pages in a single run — the mockup quality and consistency checks depend on focused,
single-page scope. Use the D07 page inventory to sequence which pages to design in what order.
