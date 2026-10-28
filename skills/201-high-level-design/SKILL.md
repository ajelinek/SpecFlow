---
name: 201-high-level-design
description: >
  Use `201` to create a concise high-level design for a specific feature. It produces the feature
  overview and end-to-end user journey without going into test or implementation detail. Trigger
  it for prompts like "201", "high-level design", "feature design", or "HLD" when a feature needs
  a short overview before specs or implementation.
argument-hint: "[feature-name]"
---

# 201 - High-Level Design

Produce a short document covering only a feature's business scope and primary user journey — no test
detail, no implementation design.

**Output path**: `.specflow/features/<fid>-<feature-slug>/overview.md`

---

## Required Inputs

1. **Feature description** — a name plus enough context to identify the primary user action and
   outcome. If too vague, ask one clarifying question.

This skill runs in its caller's context so that question reaches the user. When invoked with no user
in the loop (e.g. `901-feature-loop` dispatching it into a subagent), the invocation should carry the
resolved feature identity; if the description is still too vague, return the question to the caller
unanswered instead of guessing.

---

## Feature Folder Rule

Every feature artifact (`overview.md`, `specs.feature`, `implementation.md`, …) lives in one stable
folder: `.specflow/features/<fid>-<feature-slug>/`. `fid` (e.g. `F013`) and `feature-slug` are
separate required values; the slug alone is never an acceptable folder name, even temporarily.

- `feature-slug`: the feature name in lowercase kebab-case, filler punctuation removed.
- The document heading keeps the human-readable title; the folder and front matter `feature` field
  use the slug.
- Example: `Expense Approval` + `F013` → `.specflow/features/F013-expense-approval/`

---

## Steps

- [ ] **Step 1: Resolve feature identity.** Read `.specflow/docs/D10-feature-overview.md` if it
  exists. If the feature is there, use its `F-ID` and behavior bullets as the scope anchor. If not,
  ask whether to add it to D10 first or explicitly assign an `F-ID` — never create the folder without
  one. Build the folder per the Feature Folder Rule and use that exact string for every path.

- [ ] **Step 2: Load context.** Read D01, D02, D07, `domain-knowledge.md`, and any existing
  `overview.md` draft when present. Note missing context.

- [ ] **Step 3: Draft the Feature Overview.** A 1-2 sentence summary for a non-technical reader; an
  **In Scope** list of 3-6 boundary statements; an **Out of Scope** list of explicit exclusions. In
  Scope bullets must trace to D10's behavior list or the user's stated scope; if new scope surfaces,
  flag it to the user rather than adding it silently. D10 need not be updated for every scope change —
  it's a planning artifact, not a maintained source of truth.

- [ ] **Step 4: Draft Acceptance Criteria and Key Constraints.** In Scope says what is built;
  Acceptance Criteria say how we know it works correctly. A criterion satisfied the moment the
  capability exists is a scope bullet in disguise — good criteria describe correct behavior under
  real conditions: timing, sequencing, error states, cross-feature interactions. Include 3-5 when they
  add value. Add **Key Constraints** only when non-obvious constraints matter.

- [ ] **Step 5: Draft the User Journey** — the most valuable part for engineers and reviewers. Write
  the happy path as plain bullets; no error or edge branches.
  - Top-level bullets are user-visible steps, from the user's perspective; a reviewer reading only
    those should understand the experience. Sub-bullets are what the system does.
  - Detail signals ownership: 2-4 sub-bullets where this feature changes behavior; at most one brief
    sub-bullet for unchanged systems (e.g. "Backend persists the record via the existing expense
    API") — never narrate internals this feature doesn't change.

- [ ] **Step 6: Quality check.** Scope is clear without engineering context; acceptance criteria are
  real outcomes, not renamed scope bullets; out-of-scope lists explicit exclusions; the journey leads
  with user-visible flow and stays on the primary path.

- [ ] **Step 7: Write and summarize.** Use `./templates/overview.md` with front matter `feature`
  (slug), `fid`, and `status: todo`. `status` is the feature lifecycle source of truth (`todo` →
  `implementing` → `done`), updated in place; the file never moves between directories. Report the
  resolved `fid`, `feature-slug`, exact output path, missing context that may affect accuracy, and
  suggest `202-spec-design` next.
