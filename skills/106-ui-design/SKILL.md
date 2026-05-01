---
name: 106-ui-design
description: >
  Use `106` to establish the visual design system and UI strategy for a project. It covers the
  design philosophy, color system, typography, layout principles, and component visual language.
  Trigger it for prompts like "106", "ui design", "design system", "visual design", or "color
  palette" when the project needs a strategic visual foundation.
---

# 106 - UI Design

Produce the UI design document for a project. This document records the visual decisions that later
UI work should inherit: brand tone, color semantics, typography strategy, spacing and layout
philosophy, component visual language, and motion stance.

It is a decision record, not an implementation spec.

**Output path**: `.specflow/docs/D06-ui-design.md`

---

## Required Inputs

Before generating directions or writing output, confirm:

1. **Brand personality** — emotional tone and visual identity
2. **Target audience** — including any accessibility needs beyond WCAG 2.1 AA
3. **Device support** — mobile-first, desktop-first, or responsive
4. **Theme support** — light, dark, or both
5. **Competitive differentiation** — what the design should stand apart from

Optional but useful: brand assets, chosen component library, performance constraints that affect
font choices.

If brand personality or audience is missing, stop and ask.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all five required inputs.

- [ ] **Step 2: Load existing context.** If D06 already exists, treat it as a draft to update. Read
  D01, D05, and `.specflow/context/domain-knowledge.md` when present. Reference these docs; do not
  restate them.

- [ ] **Step 3: Generate three design directions.** Use `@designer` when available. Pass only the
  relevant context:
  - confirmed inputs from Step 1
  - relevant excerpts from D01
  - styling and implementation constraints from D05
  - domain conventions from `domain-knowledge.md` when they materially affect design

  Ask for **three distinct directions** that differ in color philosophy, typography, density, and
  motion tone.

  Handling rules:
  - answer `@designer` clarifying questions from loaded context first
  - ask the user only when the context cannot answer them
  - if `@designer` flags a conflict with existing D06/D07 decisions, surface it instead of
    overriding silently
  - if the user approves a conflicting direction, update the governing doc first before treating
    that direction as resolved
  - if `@designer` is unavailable, generate the three directions yourself from the same context

- [ ] **Step 4: Evaluate the directions.** Score them against:
  - brand alignment
  - audience fit and accessibility
  - differentiation from named competitors
  - technical feasibility within D05 constraints
  - accessibility feasibility without special workarounds

  Choose one direction as the recommendation. If the runner-up has elements worth keeping, note
  exactly what to borrow.

- [ ] **Step 5: Draft the document.** Use `./templates/T06 - UI Design.md` and fill in:
  - **Design Strategy & Brand Foundation**
  - **Color Strategy**
  - **Typography Strategy**
  - **Layout & Component Strategy**
  - **Alternatives Considered**

- [ ] **Step 6: Quality check.** Confirm:
  - every decision traces to confirmed inputs, prior docs, or explicit accessibility/performance
    principles
  - color and typography guidance is specific enough to derive real tokens/values later
  - the chosen direction is feasible within the project's technical and performance constraints
  - the document contains no filler or placeholder language

- [ ] **Step 7: Write the file and summarize.** Write `.specflow/docs/D06-ui-design.md`, report the
  selected direction, why the others lost, any deferred questions, and the best next UI workflow.

---

## Guidance

- Three directions are required. The comparison is part of the workflow, not optional polish.
- Domain conventions can rule out entire directions early; use them.
- "Clean and professional" is too vague. Make choices concrete enough that later docs can turn them
  into tokens, type scales, and component styling rules.
- If an approved direction conflicts with an existing D06 or D07 decision, reconcile the governing
  doc first so later workflows do not inherit a silent fork.

---

## Additional Guidance

**On multi-direction exploration**: The three-direction exercise in Step 3 is not optional even
if the brand direction seems obvious. Comparing directions exposes hidden assumptions and often
surfaces a clearly superior approach that would not have been reached by drafting directly.
Document the rejected directions briefly in the output under an "Alternatives Considered" section
so the decision is traceable.

**On D06/D07 conflicts**: If `@designer` flags a conflict between the brief and an existing
decision in D06 or D07, do not override the existing decision silently. Present the conflict and
`@designer`'s proposed doc change to the user. If the user approves the change, update the
relevant document first, then ask `@designer` to continue. If the user rejects the change, adjust
the brief accordingly and re-invoke `@designer`.
