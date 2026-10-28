---
name: 107-ui-experience
description: >
  Use `107` to define the UX architecture: navigation, interaction patterns, accessibility,
  error handling, and the page inventory. Trigger it for prompts like "107", "user experience",
  "navigation design", "interaction patterns", or "information architecture" before per-page
  design work begins.
---

# 107 - UI Experience Overview

Define how users move through the product: navigation model, cross-platform interaction patterns,
accessibility commitments, error handling, and a complete page inventory with routes and role
access. The product's UX architecture, not a per-page layout spec.

**Output path**: `.specflow/docs/D07-ui-experience.md`

---

## Required Inputs

1. **User roles** — including whether roles need different navigation structures or access scopes
2. **Device targets** — platforms and form factors
3. **Initial page inventory** — a rough list is enough
4. **Accessibility requirements** — anything beyond WCAG 2.1 AA
5. **Navigation constraints** — routing, deep-linking, or structural constraints from prior docs

Optional: existing research, competitor navigation patterns, onboarding needs, UI conventions fixed
in D06.

---

## Steps

- [ ] **Step 1: Validate inputs.** Resolve all five with `gap-check`, especially roles and device
  targets.

- [ ] **Step 2: Load existing context.** If D07 exists, treat it as a draft to update. Read D01, D02,
  D05, D06, and `domain-knowledge.md` when present; delegate retrieval to `@explore` if it keeps
  context tight. Domain conventions can eliminate bad directions early.

- [ ] **Step 3: Generate three UX directions** (required). Spawn three `@designer` calls in parallel
  in one message (foreground), each independent and assigned one seed bet: role-segmented
  navigation, a unified single structure, a task-first workflow structure. Give each the same
  context: roles and workflows (Step 1, D01), device/form-factor constraints, routing constraints
  from D02/D05, D06 visual conventions, and domain mental models that affect navigation.
  - Answer `@designer` clarifying questions from loaded context; ask the user only when it can't.
  - If a call flags a conflict with D06 or another established doc, present it and the proposed doc
    change to the user — never override silently. On approval, update the governing doc first so
    later page work inherits one source of truth; on rejection, adjust the brief and re-invoke.
  - If `@designer` is unavailable, use `@explore` to research three plausible navigation approaches
    for the product type and evaluate those.

- [ ] **Step 4: Evaluate the directions** against user-goal alignment, role differentiation, device
  feasibility, technical feasibility within D05, accessibility, and cognitive load. Recommend one and
  note what to keep from the runner-up. If two are too close to call, pass the two closest cards to
  one more `@designer` call framed as a judgment brief.

- [ ] **Step 5: Build the page inventory.** For each page: name, route path, one-line purpose and
  primary action, roles with access. A page is a distinct route-level view — never a modal, drawer,
  inline toggle, or other component state. Cover every D01 workflow.

- [ ] **Step 6: Draft the document.** Use `./templates/T07 - UI Experience Overview.md`:
  **Navigation & Interaction Patterns**, **Page Summary**, **Alternatives Considered**.

- [ ] **Step 7: Quality check.** Navigation decisions trace to inputs, prior docs, or explicit
  UX/accessibility principles; the model is concrete enough to implement; the inventory covers D01
  workflows; consistent with D05 and D06; no filler.

- [ ] **Step 8: Write and summarize.** Write the file, report the selected direction, why the others
  lost, deferred questions, and suggest `108-ui-page-design` next.
