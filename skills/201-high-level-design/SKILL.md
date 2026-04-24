---
name: 201-high-level-design
description: >
  Use this skill when you need to produce the high-level design document for a specific
  feature. Triggers on phrases like "high-level design", "201", "feature design", "HLD",
  "design the feature", "start the feature", or when a feature is ready to be fleshed out.
  The feature does not need to exist in D10 — this skill handles both cases. Produces a
  concise overview.md covering business purpose and the end-to-end user journey — nothing
  more. Detailed test scenarios and implementation design follow in 202 and 203.
---

# 201 — High-Level Design

Produce `.specflow/features/<feature-name>/overview.md`: a short, focused document that
gives any reviewer — engineer, designer, or stakeholder — a clear picture of what a single
feature does and how it flows, without drowning them in implementation detail.

The document covers two things only: what the feature does (business scope, out of scope)
and how it flows (a sequence diagram of the end-to-end journey).

**Output path**: `.specflow/features/<feature-name>/overview.md`

---

## Required Inputs

Before generating any content, confirm:

1. **Feature description** — What does this feature do? A name and a sentence of context
   is enough to start. An F-ID from D10 is helpful but not required.

If the user provides only a vague intent ("I want to add notifications"), ask one clarifying
question to establish the primary user action and outcome before proceeding.

---

## Steps

- [ ] **Step 1: Resolve the feature identity.** Read `.specflow/docs/D10-feature-overview.md`
      if it exists. Determine whether it contains an entry matching this feature.
  - **If the feature is in D10**: note its F-ID and behavior bullets — these become the
    scope anchor in Step 3.
  - **If the feature is not in D10**: ask the user whether they want to add it to D10 now
    (create an entry with the next available F-ID) or proceed without updating D10. Either
    answer is fine — the user's description becomes the scope anchor if they skip D10.
    If they want to update D10, do so before continuing.

  Note: D10 is a planning artifact that goes stale as features evolve. An F-ID is useful
  for cross-referencing (PRs, tickets, other design docs), but D10 does not need to be
  exhaustive or current to run this workflow.

- [ ] **Step 2: Load remaining context.** Read these files directly if they exist:
  - `.specflow/docs/D01-project-overview.md` — business goals and user types
  - `.specflow/docs/D02-system-architecture.md` — system boundaries and major components
  - `.specflow/docs/D07-ui-experience.md` — user journeys and affected pages
  - `.specflow/context/domain-knowledge.md` — industry workflows, regulations, or user
    behavior patterns relevant to this feature; use it to pressure-test scope and flow
  - `.specflow/features/<feature-name>/overview.md` — if a prior draft exists, load it
    before overwriting

  Skip files that do not exist. Note which are missing before proceeding.

- [ ] **Step 3: Draft the Feature Overview section.** Write a clear, brief description of
      the feature:
  - Open with 1–2 sentences: what the feature does and the business problem it solves.
    Write for a non-technical reader — no framework names, no implementation detail.
  - Follow with a bulleted **In Scope** list: the capabilities this feature includes —
    written as boundary statements ("Users can submit X", "The system supports Y").
    If the feature is in D10, draw from its bullet list and tighten the language.
    Aim for 3–6 bullets.
  - Add an **Out of Scope** list: capabilities explicitly excluded. Be specific.

  Keep the entire section readable in under a minute.

- [ ] **Step 3b: Draft the Acceptance Criteria section.** Write 3–5 verifiable outcome
      statements that confirm the feature works correctly — not that it exists.

  The rule: **if a criterion would be true the moment the capability is built at all, it
  belongs in In Scope, not here.** Acceptance Criteria must go further — they describe
  observable behavior that could fail even if the feature is technically present.

  Good criteria answer: "How do we know it works correctly?" not "What did we build?"

  - Write each criterion as a plain declarative sentence a non-engineer can evaluate
  - Focus on user-observable outcomes, edge-case handling, and cross-feature correctness
  - Omit any criterion that merely restates an In Scope bullet in different words
  - If no meaningful criteria exist beyond the scope bullets, skip this section

  **Key Constraints** — add a short list only if there are non-obvious constraints an
  engineer cannot infer from the scope or journey (e.g., offline support required, must
  not break an existing integration, performance threshold). Omit entirely if nothing
  meaningful applies — do not invent constraints to fill the section.

- [ ] **Step 4: Draft the User Journey section.** Write the happy-path flow as a bulleted
      list with sub-bullets. No diagrams — plain text only.

  **Structure rules:**
  - Each top-level bullet is a meaningful user interaction or system event in sequence
  - Sub-bullets add detail on what happens inside that step — but only for parts of the
    system this feature actually changes; interactions with unchanged systems get one
    brief sub-bullet at most
  - Lead with user-visible actions and outcomes wherever possible; technical steps (API
    calls, state updates) are sub-bullets under the user action that triggered them
  - Cover the primary scenario only — no error branches, no edge cases (those belong in 202)
  - Stop when the user has reached the end of the meaningful interaction; do not narrate
    the full system response chain if the tail is not relevant to this feature

  **Depth calibration:**
  - Parts of the flow this feature directly changes: 2–4 sub-bullets, specific enough
    that an engineer knows what to build
  - Parts of the flow this feature merely passes through: 0–1 sub-bullet, summarize and
    move on
  - If a top-level step has no user-visible component, prefix it with the system layer
    (e.g., "Backend:", "Frontend:") so reviewers can skim past it if needed

- [ ] **Step 5: Quality check before writing.**
  - The Feature Overview section reads clearly without engineering context
  - In Scope bullets are boundary statements — what is built; not verifiable outcomes
  - No Acceptance Criterion restates an In Scope bullet in different words
  - Each Acceptance Criterion could plausibly fail even if the feature is technically present
  - Key Constraints section is present only if genuine constraints exist
  - The Out of Scope list names at least one explicit exclusion
  - The User Journey leads with user interactions; system-internal steps are sub-bullets
  - Unchanged systems that the flow passes through are summarized briefly, not narrated
  - The feature name and F-ID (if assigned) appear in the document title consistently

- [ ] **Step 6: Write the output file.** Write `.specflow/features/<feature-name>/overview.md`
      using `./templates/overview.md` as the structure. Create the directory if it does not
      exist. Use the feature's slug name (lowercase, hyphenated) as the folder name.

  Set the front matter fields before writing:
  - `feature`: the slug name of the feature (e.g., `expense-submission`)
  - `fid`: the F-ID if one was assigned; otherwise omit or leave as `F000`
  - `status`: always `todo` when first created; the team advances this manually

  The `status` field tracks the feature's implementation lifecycle:
  - `todo` — overview written; implementation not yet started (default)
  - `implementing` — the feature is actively being built
  - `done` — all scenarios are passing and the feature is live

  Do not move the feature file between directories as status changes. Status lives in the
  front matter; the path stays stable for the lifetime of the feature.

- [ ] **Step 7: Summarize.** Report:
  - The output file path written
  - Any context documents that were missing and may affect accuracy
  - Suggest running `202-spec-design` next to define the Gherkin scenarios for
    this feature

---

## Additional Guidance

**On scope vs. acceptance criteria**: In Scope answers "what are we building?" — it draws
a boundary. Acceptance Criteria answers "how do we know we built it correctly?" — it
describes observable outcomes. A criterion that would be satisfied the moment the capability
exists at all is not a criterion; it's a scope bullet in disguise. Good criteria describe
correct behavior under real conditions: timing, sequencing, error states, cross-feature
interactions.

**On scope discipline**: The In Scope bullets must trace to either D10's behavior list or
the user's stated scope for this feature. If new scope surfaces during drafting, flag it
to the user rather than silently adding it. D10 does not need to be updated to reflect
every scope change — it is a planning artifact, not a maintained source of truth.

**On D10**: A feature does not need to be in D10 to be designed. D10 is useful for
initial planning and for generating F-IDs, but features discovered mid-delivery or
spawned from scope changes are common and valid. When a feature isn't in D10, the
F-ID is optional — only assign one if the team will reference this feature across
tickets, PRs, or other design docs and needs a stable identifier.

**On feature status**: The front matter `status` field is the single source of truth for where a
feature stands in the delivery lifecycle. It has three states: `todo` (designed, not started),
`implementing` (actively being built), and `done` (all scenarios passing, feature live). Status is
updated in place — the feature file never moves to a different directory. This keeps paths stable
across git history, CI configuration, D10 cross-references, and PR links. To find all features in a
given state, use: `grep -r "^status: todo" .specflow/features/`.

**On the user journey**: The bullet list is the most valuable part of this document for
engineers and reviewers. Lead every step from the user's perspective when possible. A
reviewer should be able to read the top-level bullets and understand what the user
experiences; they can drill into sub-bullets when they need to know what the system does.
Treat detail as a signal of ownership — high detail where this feature introduces change,
low detail where it merely passes through existing behavior.

**On unchanged systems**: If the feature calls an existing API, sends to an existing queue,
or reads from an existing table without modifying any of that behavior, one sub-bullet is
enough: "Backend persists the record via the existing expense API." Do not narrate the
internals of systems this feature does not change.
