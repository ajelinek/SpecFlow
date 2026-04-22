---
name: 106-ui-design
description: >
  Use this skill when you need to establish the visual design system and UI strategy for a
  project: design philosophy, color system, typography, layout principles, and component design
  approach. Triggers on phrases like "ui design", "design system", "106", "visual design",
  "brand and design", "color palette", "typography strategy", or when the project needs a
  strategic design foundation before page-level or component-level work begins. Run this after
  105-frontend-architecture and before 107-ui-experience or 108-ui-page-design.
---

# 106 — UI Design

Produce the UI design document for a project. This document establishes the strategic design
decisions that govern all visual output: brand personality and design philosophy, the color
system and its semantic meaning, the typography hierarchy, and the layout and component design
approach. It is a decision record, not an implementation spec — design tokens and CSS variables
are addressed in the frontend architecture; this document explains the *why* behind them.

This document does not repeat what is in D01–D05. It draws on the project overview for brand
intent and user goals, the system architecture for constraints, and the frontend architecture
for component and styling boundaries. Everything in D06 must trace to one of those sources or
to a validated design principle.

Output path: `.specflow/docs/D06-ui-design.md`

---

## Your Role

Approach this as a UI design strategist: your job is to make design decisions concrete enough
that any designer or engineer working on the product arrives at consistent visual output without
needing to negotiate each choice. Where the project overview says "professional and approachable,"
this document specifies what that means in typefaces, contrast ratios, color philosophy, and
spatial rhythm.

---

## Required Inputs

Before generating design options or writing any output, confirm you have answers to all of the
following. If any are missing, ask now — do not infer brand personality or assume design defaults.

1. **Brand personality** — What emotional tone and visual identity should the product project?
   (e.g., professional, playful, minimal, bold, trustworthy, energetic)

2. **Target audience** — Who are the primary users, and are there accessibility requirements
   beyond WCAG 2.1 AA?

3. **Device support** — Mobile-first, desktop-first, or responsive? What are the critical
   breakpoints or device categories?

4. **Theme support** — Light only, dark only, or both? If both, which is the default?

5. **Competitive differentiation** — Which products or brands are the main competitors, and how
   should this design stand apart?

Optional but useful: existing brand assets (logo, color swatches, typefaces already in use),
design system or component library already chosen in D05, performance budget that constrains
web font choices.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all five required inputs are present. If brand
      personality or target audience is missing, stop and ask — these drive every downstream
      decision. Do not invent a brand direction.

- [ ] **Step 2: Load existing context.** Check whether `.specflow/docs/D06-ui-design.md`
      already exists. If it does, treat it as a prior draft and update rather than replace. Read:
  - `.specflow/docs/D01-project-overview.md` — business goals, user workflows, success metrics
  - `.specflow/docs/D05-frontend-architecture.md` — component library in use, styling approach,
    CSS methodology, accessibility baseline already committed to
  - `.specflow/context/domain-knowledge.md` — if it exists, read it for domain-specific
    terminology, user mental models, and any industry-specific design conventions that apply

  Reference these documents; do not re-describe their content in D06.

- [ ] **Step 3: Generate multiple design directions using `@designer`.** Delegate to the
      `@designer` agent. Pass the following context in the prompt — do not ask `@designer` to
      fetch these itself:

  - **Brand personality and emotional tone** — from Step 1 confirmed inputs
  - **Target audience and accessibility requirements** — from Step 1 confirmed inputs
  - **Device support and theme requirements** — from Step 1 confirmed inputs
  - **Competitive differentiation brief** — from Step 1 confirmed inputs
  - **Relevant excerpts from D01** — business goals, user workflows, and success metrics
    that bear on visual tone; do not paste the entire document
  - **Styling constraints from D05** — component library in use, CSS methodology, any
    performance budget that constrains web font choices
  - **Domain conventions from `domain-knowledge.md`** — if the file exists and contains
    design-relevant conventions (e.g., healthcare color semantics, financial data density)

  Ask `@designer` to produce **three distinct design directions**, each differing across
  color philosophy, typography, layout density, and motion tone.

  **Handling `@designer` clarifying questions**: If `@designer` returns clarifying questions
  before generating directions, attempt to answer each question from the documents loaded in
  Step 2. For any question you cannot answer from context, present it to the user and wait
  for their answer before continuing. Do not pass unanswered questions back to `@designer`.

  **Handling D06/D07 conflicts**: If `@designer` flags a conflict between the brief and an
  existing decision in D06 or D07, do not override the existing decision silently. Present the
  conflict and `@designer`'s proposed doc change to the user. If the user approves the change,
  update the relevant document first, then ask `@designer` to continue. If the user rejects
  the change, adjust the brief accordingly and re-invoke `@designer`.

  If `@designer` is not available, generate the three directions yourself using the extracted
  context above as grounding.

- [ ] **Step 4: Evaluate directions against product goals.** Score each design direction against
      the criteria below. Use the project overview (D01), domain knowledge (if present), and the
      confirmed required inputs as the evaluation frame — not personal aesthetic preference.

  | Criterion | What to assess |
  |---|---|
  | Brand alignment | Does the direction match the confirmed brand personality and emotional tone? |
  | Audience fit | Does it serve the target users' context, literacy, and accessibility needs? |
  | Differentiation | Does it stand apart from the named competitors in a meaningful way? |
  | Technical feasibility | Can it be implemented within the styling approach confirmed in D05? |
  | Accessibility | Does it support WCAG 2.1 AA or better without special workarounds? |

  Select one direction as the recommendation. Document the rationale. If a second direction has
  strengths worth preserving, note which specific elements to borrow and why.

- [ ] **Step 5: Draft the document.** Use the template at `./templates/T06 - UI Design.md`.
      Populate every section from the selected design direction and any borrowed elements:

  **Design Strategy & Brand Foundation**: The chosen design philosophy in plain language.
  Brand personality, accessibility commitment, responsive philosophy. One paragraph plus
  tight bullets — no generic descriptions of what a design system is.

  **Color Strategy**: The color philosophy and how it maps to semantic meaning. Primary color
  rationale. Semantic color categories (success, warning, error, info) and their usage context.
  Neutral palette approach. Theme handling if applicable. Contrast ratios committed to.

  **Typography Strategy**: Font selection and the reason each choice serves the brand and the
  audience. The hierarchy — how heading levels, body, captions, and code type differ in weight,
  size, and purpose. Line height and spacing standards that ensure readability at target
  breakpoints.

  **Layout & Component Strategy**: Grid system and spacing scale. Component design philosophy
  — what principles govern how components look and feel. Icon and imagery approach. Motion
  philosophy — when animation is used, what it communicates, and how it respects reduced-motion
  preferences.

- [ ] **Step 6: Quality check.** Before writing the file, verify:
  - Does every design decision trace to a confirmed input, a document in D01–D05, or an
    explicit accessibility or performance principle? If not, add the reason or move to Open Questions.
  - Is the color section specific enough to derive actual hex values or design tokens, or is it
    still vague strategy? Push to specific if possible.
  - Are the typography choices feasible within the performance budget (web font load cost)?
  - Does the selected direction clearly differentiate from the named competitors?
  - Are there any placeholder sections, empty bullets, or generic filler text? Remove them.
  - Can each section be scanned quickly without reading full paragraphs?

- [ ] **Step 7: Write the output.** Write the completed document to
      `.specflow/docs/D06-ui-design.md`. Create the `.specflow/docs/` directory if it does not
      exist.

- [ ] **Step 8: Summarize.** Report what was written, which design direction was selected and
      why the others were set aside, any open questions deferred to later steps, and suggest
      running `107-ui-experience` (UX patterns and flows) or `108-ui-page-design` (per-page
      layouts) as the next step.

---

## Additional Guidance

**On multi-direction exploration**: The three-direction exercise in Step 3 is not optional even
if the brand direction seems obvious. Comparing directions exposes hidden assumptions and often
surfaces a clearly superior approach that would not have been reached by drafting directly.
Document the rejected directions briefly in the output under an "Alternatives Considered" section
so the decision is traceable.

**On domain knowledge**: If `.specflow/context/domain-knowledge.md` exists, read it before
generating directions. Domain-specific conventions (e.g., healthcare products using specific
color semantics, financial products requiring high data density) can eliminate entire design
directions before you spend time on them.

**On specificity**: "A clean, professional color palette" is not a design decision. "Primary
color anchored to a blue-green that reads as trustworthy and digital-native; warning states use
amber rather than red to avoid alarm in a non-emergency context; neutral background uses
near-white (#F8F9FA) not pure white to reduce eye strain on extended use" is a design decision.

**On the `@designer` agent**: `@designer` honors established design decisions — if D06 already
exists, it will work within it, not override it. If this run is creating D06 for the first time,
`@designer` has full creative latitude within the brief you pass. Pass only what is relevant and
confirmed — do not dump entire documents. The synthesis, evaluation, conflict resolution, and
final document are your responsibility.
