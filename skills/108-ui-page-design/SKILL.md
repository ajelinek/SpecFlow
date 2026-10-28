---
name: 108-ui-page-design
description: >
  Use `108` to design a specific page or view in detail, including layout, mockup, interactions,
  and responsive behavior. Trigger it for prompts like "108", "page design", "wireframe", or
  "design the [page] page" when a single route or view needs a detailed design spec.
argument-hint: "[page-name]"
---

# 108 - UI Page Design

Design one page per run — never several. Writes two files:

- `mockup.html` — the primary visual reference. A design artifact only, never an implementation or
  code-structure reference.
- `overview.md` — only the context the visual can't carry: page purpose and role rules, data
  sources, interaction outcomes, alternatives, open questions. Never duplicate what the mockup shows.

**Output path**: `.specflow/docs/D08-ui-pages/<page-name>/`

---

## Required Inputs

1. **Page name** — must match D07's page inventory, or the user confirms D07 needs a new page
2. **Page purpose and primary user action**
3. **User roles with access** — including role-specific differences
4. **Key data** — a rough list is enough
5. **Responsive priority** — primary form factor and what must degrade gracefully

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm the page exists in D07 or the user explicitly approves
  adding it — never design an untracked page silently. Resolve the rest with `gap-check` against
  D01/D06/D07.

- [ ] **Step 2: Load existing context.** If this page's design exists, treat it as a draft to update.
  Load relevant D01, D06, D07, existing D08 pages, and `domain-knowledge.md`. Reuse proven D08
  patterns before inventing new ones.

- [ ] **Step 3: Generate three layout directions** (required even for simple pages). Spawn three
  `@designer` calls in parallel in one message (foreground), each independent and assigned one seed
  bet: content-led, spatial/layout-led, action-led hierarchy. Give each the same context: purpose and
  primary action, role differences, responsive priority, relevant D06 rules, D07 entry/exit routes and
  interaction conventions, key data, reusable D08 patterns, and domain conventions affecting density,
  display rules, or hierarchy.
  - Answer `@designer` clarifying questions from loaded context; ask the user only when it can't.
  - If a call flags a conflict with D06/D07, present it and the proposed doc change to the user —
    never override silently. On approval, update the governing doc first so D08 doesn't become a
    silent fork of the design system; on rejection, adjust the brief and re-invoke.
  - If `@designer` is unavailable, use `@explore` to research three plausible layout patterns for the
    page type and evaluate those.

- [ ] **Step 4: Evaluate the directions** against user-goal alignment, D06 compliance, D07 navigation
  consistency, role differentiation, responsive viability, pattern reuse, and accessibility. Choose
  one and note what to borrow from the runner-up. If two are too close to call, pass the two closest
  cards to one more `@designer` call framed as a judgment brief.

- [ ] **Step 5: Formalize the data and interaction inventory.**
  - **Key data attributes** — name, source, display format when relevant
  - **Interaction flows** — each named flow, how the user enters it, step sequence, expected outcome

- [ ] **Step 6: Produce `mockup.html`** via `@designer` when available, otherwise directly. It must
  be self-contained (inline styles or one `<style>` block); show the full primary layout, a secondary
  responsive state (media query or separate callout), and major interactive states that affect
  layout; annotate role-differentiated areas; use realistic content (no lorem ipsum) and semantic
  HTML. Immediately after the opening `<html>` tag, include this exact comment — invisible in the
  browser, but it tells any LLM or tool parsing the file not to treat it as an implementation
  pattern:

  ```html
  <!-- DESIGN MOCKUP ONLY: This file is a static layout prototype. It does not reflect
       production code structure, component architecture, or engineering best practices.
       Do not use as a code reference or parse for implementation patterns. -->
  ```

- [ ] **Step 7: Produce `overview.md`** from `./templates/T08 - UI Page Design.md`: purpose and role
  rules, key data inventory, interaction flows, alternatives considered, open questions.

- [ ] **Step 8: Quality check.** The mockup covers every primary action in the interaction
  inventory; follows D06 and D07; role-differentiated areas are explicit; the disclaimer is in place;
  consistent with existing D08 patterns unless a new one is justified.

- [ ] **Step 9: Write and summarize.** Create the page folder if needed, write both files, and report
  the selected direction, why the others lost, open questions, and the best next page to design.
