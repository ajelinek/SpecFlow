---
name: 106-ui-design
description: >
  Use `106` to define or refresh a project's visual direction: color, typography, spacing,
  component appearance, and motion. Trigger it for prompts like "106", "visual design", "ui design",
  "design system", or "color palette" when visual choices need to be agreed on or documented.
  Product navigation and interaction behavior belong in `107-ui-experience`.
---

# 106 - Visual Design

Record what the product should look and feel like in a short visual decision sheet. Make choices
specific enough for consistent UI work, without prescribing every component or copying a design
system's rulebook. Reuse an established visual system rather than invent a new one to fill a document.

D07 owns navigation, page inventory, and interaction behavior; D05 owns implementation conventions
and token organization. D06 owns visual presentation, including how states are distinguished visually.
Reference the project's accessibility standard rather than repeat it; record relevant visual decisions
and unresolved checks. D08 applies these decisions to an individual page.

`106` and `107` are independently optional and can run in either order. Use existing context when
sufficient; missing upstream documents are not a reason to generate the whole planning series.

**Output path**: `.specflow/docs/D06-ui-design.md`

---

## Required Inputs

1. **Audience and context** — who uses the product, their tasks, and relevant device/accessibility needs
2. **Visual intent** — desired tone, brand assets, or an established design system to preserve
3. **Constraints** — confirmed component library, theme support, and relevant technical or performance limits

References and competitors are useful when they clarify the direction, not required inputs. Resolve
what affects this run from project evidence first; this list is not a questionnaire.

---

## Steps

- [ ] **Step 1: Load project context.** Update an existing D06 rather than create a competing copy.
  Read `.specflow/context/domain-knowledge.md` when present, especially user needs, usage conditions,
  market expectations, differentiation, constraints, and implications for this project. Use these to
  identify the core design focus, not just a generic aesthetic. Load governing guidance, brand/design-system
  references, and relevant D01/D05/D07 decisions. Inspect representative UI and theme/token definitions
  in an existing product. Distinguish confirmed direction, current implementation, and proposed changes.

- [ ] **Step 2: Resolve inputs.** Use domain knowledge and loaded context to answer gaps before using
  `gap-check` for those that still block visual decisions. Don't ask again about confirmed choices.
  Keep non-blocking uncertainties, including uncertain or outdated research, in Open Questions;
  clarify blocking uncertainty rather than guess. Don't treat research recommendations as confirmed
  product decisions.

- [ ] **Step 3: Resolve visual direction.** Respect confirmed user decisions and binding project
  rules. Compare alternatives only when there is a meaningful unresolved choice; use as many as help
  explain the tradeoff, with no fixed count or required worker calls. Use `@designer` for a focused
  visual direction when useful, or work directly. Use the domain-informed design focus to judge
  audience fit, brand intent, readability, accessibility, and feasibility; include the relevant domain
  findings in any designer brief. Surface conflicts with existing decisions to the user before changing
  them; recommend and confirm material unresolved choices rather than silently rebrand.

- [ ] **Step 4: Draft the document.** Use `./templates/T06 - UI Design.md` as an adaptable, skimmable
  structure. Prefer short decisions with a brief reason where it isn't obvious:
  - **Visual Direction** — desired tone, audience fit, and core focus grounded in relevant domain
    findings; reference those findings and governing brand/design-system sources rather than copy them.
  - **Color & Typography** — semantic color roles, theme treatment, typefaces, and hierarchy. Reference
    existing values; make new choices concrete enough to apply, labeling proposals or unverified values.
  - **Layout & Component Appearance** — density, spacing rhythm, visual hierarchy, and component/state
    appearance. Cover responsive presentation without redefining navigation or interaction flows.
  - **Motion & Visual Accessibility** — motion purpose and reduced-motion treatment, contrast, focus
    visibility, and non-color cues as relevant. Reference standards and note what still needs checking;
    a written intention is not evidence of compliance.
  - **Alternatives Considered** — only meaningful options actually evaluated, with a short decision reason.
  - **Open Questions** — unresolved choices or checks and their impact; omit when none remain.
  Omit unused sections and avoid arbitrary sizes, breakpoints, palettes, or motion timings.

- [ ] **Step 5: Quality check.** Can someone apply the visual direction without guessing its core
  choices? Decisions trace to confirmed requirements, project references, or clearly labeled proposals.
  The result fits technical constraints, separates appearance from interaction behavior, and avoids
  duplicated standards, invented requirements, and unsupported accessibility claims.

- [ ] **Step 6: Write and summarize.** Remove template instructions, examples, placeholders, and empty
  optional sections. Write the file; report material decisions, sources, and open questions. Suggest
  `107-ui-experience`, `108-ui-page-design`, or feature work only when that work is needed.
