---
name: 106-ui-design
description: >
  Use `106` to establish the visual design system and UI strategy for a project. It covers the
  design philosophy, color system, typography, layout principles, and component visual language.
  Trigger it for prompts like "106", "ui design", "design system", "visual design", or "color
  palette" when the project needs a strategic visual foundation.
---

# 106 - UI Design

Record the visual decisions later UI work inherits: brand tone, color semantics, typography
strategy, spacing and layout philosophy, component visual language, and motion stance. A decision
record, not an implementation spec — but concrete enough to derive tokens, type scales, and
component styling rules later. "Clean and professional" is too vague.

**Output path**: `.specflow/docs/D06-ui-design.md`

---

## Required Inputs

1. **Brand personality** — emotional tone and visual identity
2. **Target audience** — including accessibility needs beyond WCAG 2.1 AA
3. **Device support** — mobile-first, desktop-first, or responsive
4. **Theme support** — light, dark, or both
5. **Competitive differentiation** — what the design should stand apart from

Optional: brand assets, chosen component library, performance constraints that affect font choices.

---

## Steps

- [ ] **Step 1: Validate inputs.** Resolve all five with `gap-check`, especially brand personality
  and audience.

- [ ] **Step 2: Load existing context.** If D06 exists, treat it as a draft to update. Read D01, D05,
  and `domain-knowledge.md` when present; reference them, don't restate them. Domain conventions can
  rule out whole directions early.

- [ ] **Step 3: Generate three design directions.** Required even when the direction seems obvious —
  comparison exposes hidden assumptions and often surfaces a clearly better approach. Spawn three
  `@designer` calls in parallel in one message (foreground), each independent and assigned one seed
  bet: restrained/functional, expressive/characterful, dense/information-forward. Give each the same
  context: confirmed inputs, relevant D01 excerpts, D05 styling/implementation constraints, and
  domain conventions that materially affect design.
  - Answer `@designer` clarifying questions from loaded context; ask the user only when it can't.
  - If a call flags a conflict with D06/D07, present the conflict and its proposed doc change to the
    user — never override silently. On approval, update the governing doc first, then continue; on
    rejection, adjust the brief and re-invoke.
  - If `@designer` is unavailable, generate the three directions yourself from the same context.

- [ ] **Step 4: Evaluate the directions** against brand alignment, audience fit, differentiation
  from named competitors, technical feasibility within D05, and accessibility without special
  workarounds. Recommend one and note exactly what to borrow from the runner-up. If two are too close
  to call, pass the two closest cards to one more `@designer` call framed as a judgment brief rather
  than defaulting to a generic pick.

- [ ] **Step 5: Draft the document.** Use `./templates/T06 - UI Design.md`: **Design Strategy &
  Brand Foundation**, **Color Strategy**, **Typography Strategy**, **Layout & Component Strategy**,
  and **Alternatives Considered** (rejected directions, briefly, so the decision is traceable).

- [ ] **Step 6: Quality check.** Every decision traces to confirmed inputs, prior docs, or explicit
  accessibility/performance principles; color and typography are specific enough to derive real
  tokens; the direction is feasible within technical and performance constraints; no filler.

- [ ] **Step 7: Write and summarize.** Write the file, report the selected direction, why the others
  lost, deferred questions, and the best next UI workflow.
