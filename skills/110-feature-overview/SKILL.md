---
name: 110-feature-overview
description: >
  Use this skill when you need to define, organize, and prioritize the features that will be
  built for this product. Triggers on phrases like "feature overview", "110", "feature list",
  "feature backlog", "what features should we build", "capabilities", "feature planning",
  or when the team needs a structured, reviewable breakdown of what to build and in what order.
  Run this after the architecture documents (101–108) are complete or sufficiently drafted.
  Produces a concise document grouping features under capabilities — each feature is a thin
  vertical slice through the architecture, not necessarily a complete end-user capability.
---

# 110 — Feature Overview

Produce `D10-feature-overview.md`: a concise, scannable plan that organizes work into
thin vertical slices grouped under **capabilities**. A capability is a named, marketable
area of product functionality — something that can be shipped, announced, and understood
by a customer or stakeholder without engineering context. Each feature within a capability
is a thin slice small enough to design and implement in a focused iteration.

The document is intentionally brief — it captures *what* needs to be built and *why it
matters*, not *how* to build it. Detailed design happens in the 2xx skills when a feature
is actually planned out.

Features do not need to represent a complete user experience on their own. A thin slice
that traverses the full stack — UI through API through data — is the right unit of work,
even if it delivers only part of a larger user goal. This lets the team ship incrementally,
validate assumptions early, and keep individual features tractable.

**Output path**: `.specflow/docs/D10-feature-overview.md`

---

## Required Inputs

Before generating any content, confirm:

1. **Scope** — Is this a full-product feature overview, or is it scoped to a specific area
   of the product? If scoped, what is the boundary?

2. **Existing architecture docs** — Which of the following are available to draw from?
   Minimum: D01 (project overview) and D02 (system architecture). Helpful additions:
   D03–D08 for data, backend, frontend, and UI context.

3. **Any known features or priorities** — Are there features the user has already named,
   scoped, or ranked? Capture these before generating new ones so they anchor the output.

If any of the above are missing, ask before proceeding.

---

## Steps

- [ ] **Step 1: Validate inputs.** Confirm all required inputs are present. If no
      architecture docs exist yet, warn the user that the feature overview will be
      speculative and will need revision once the architecture is documented.

- [ ] **Step 2: Load context from existing SpecFlow docs.** Use `@explore` to retrieve:
  - `.specflow/docs/D01-project-overview.md` — business goals, user types, success metrics
  - `.specflow/docs/D02-system-architecture.md` — system boundaries, major components,
    integration points that constrain or enable features
  - `.specflow/docs/D03-data-model.md` — if it exists; key entities that features will
    create, read, update, or delete
  - `.specflow/docs/D07-ui-experience.md` — if it exists; user journeys and page inventory
    that suggest natural feature boundaries

  Ask `@explore` for the full content of each file that exists. Skip files that are not
  yet written — note which are missing at the end of this step.

- [ ] **Step 3: Identify capabilities.** Based on the loaded context and user-provided
      priorities, define the top-level capability groupings. Each capability:

  - Is named after what the product *does* in that area — customer-facing language, not
    technical layer names (e.g., "Expense Tracking", not "Data Entry Module")
  - Represents a coherent area of product functionality that could be described in a
    release note or product announcement
  - Contains 3–8 features; if a capability would have more than 10, split it

  Aim for 3–7 capabilities for a typical product. Present the proposed capability names to
  the user for confirmation before proceeding to feature decomposition. Adjust based on
  feedback.

- [ ] **Step 4: Decompose each capability into thin vertical slices.** For each capability,
      identify the individual features. Each feature must:

  - Traverse the full stack (UI → API → data) — it is not a frontend-only or backend-only task
  - Be scoped to a single, focused behavior that can be designed and implemented in one iteration
  - Be small enough that a skilled developer can complete it in a few days to a week
  - Not need to be a complete user-facing experience on its own — partial slices are fine

  For each feature, draft:
  - A short name (3–6 words)
  - A one-sentence description of what it delivers
  - 3–6 bullets covering what the feature must do and how it should behave — at the product
    level, not the implementation level
  - Any features it depends on (by feature ID)

  Lean toward more, smaller features over fewer, larger ones. A feature that feels too big
  should be split.

- [ ] **Step 5: Assign IDs, status, and ordering.** Apply the following ID conventions:

  - **Capabilities** get sequential IDs: `C001`, `C002`, etc.
  - **Features** get globally unique F-prefixed IDs: `F001`, `F002`, `F003`, continuing from
    whatever the highest existing F-number is in the document. Feature IDs are never reset
    per capability and never reused if a feature is removed.
  - All new capabilities and features start with status **🔵 To Do**.

  Order features within each capability so that foundational slices come before dependent
  ones. Features with no dependencies on each other can be ordered by estimated value.

- [ ] **Step 6: Quality check before writing.** Verify:
  - Each feature is a genuine vertical slice — not a layer task ("build the auth API") or a
    chore ("set up the database")
  - No feature's bullet list contains implementation detail (frameworks, file names, SQL
    queries) — bullets describe behavior, not construction
  - Dependencies are real — a feature only depends on another feature if it cannot be built
    without it; reference dependencies by F-ID (e.g., F001, F003)
  - Capabilities are meaningfully distinct — no significant overlap between groups
  - The document is scannable in under 5 minutes — if it reads like a spec, it is too long
  - Any feature the user explicitly named in Required Inputs is present and correctly scoped

- [ ] **Step 7: Write the output file.** Write `.specflow/docs/D10-feature-overview.md`
      using `./templates/T10 - Feature Overview.md` as the structure. Each capability gets
      its own section. Each feature gets a subsection with name, one-line description,
      behavior bullets, and dependencies.

- [ ] **Step 8: Summarize.** Report:
  - Capabilities and feature counts produced
  - Any architecture docs that were missing and may cause the feature list to shift once
    they are written
  - Features with no dependencies (good candidates to start immediately)
  - Suggest running `201-high-level-design` on the first feature the team wants to build

---

## Additional Guidance

**On brevity**: The feature overview is a planning and communication tool, not a requirements
document. Each feature's bullet list should be tight — 3 to 6 items that give a reviewer
enough to understand scope without needing to read a spec. If bullets are getting long or
numerous, the feature is probably too big.

**On thin slices vs. complete experiences**: A feature does not need to be end-to-end
useful by itself. "User can enter a single expense with a name, amount, and date" is a
valid feature even if users cannot yet submit or view their expenses. The goal is testable,
reviewable progress through the full stack — not a shippable user experience at every step.

**On status**: Both capabilities and features carry a status emoji — 🔵 To Do, 🟡 In Progress,
🟢 Done. Update status in place as work progresses; do not create a separate status table.
When all features within a capability are Done, mark the capability Done.

**On IDs**: Feature IDs (`F001`, `F002`, …) are globally unique across the entire project and
never reset between capabilities. This means any other document — design docs, PRs, tickets —
can reference `F014` unambiguously without needing to know which capability it belongs to.
Capability IDs (`C001`, `C002`, …) are scoped to this document only. Never reuse an
F-ID once assigned, even if the feature is removed.

**On dependencies**: Only mark a dependency when the feature genuinely cannot be built
without the other. Avoid treating "logically related" as "dependent." Loose coupling in
the feature list enables more parallel work.

**On living document**: This document will be revised. Features get added, removed, or
resplit as the team learns. The feature overview is correct for today — it will be wrong
in four weeks and that is fine. Encourage the user to update it when the shape of the
product changes rather than trying to get it perfect on the first pass.
