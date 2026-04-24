<!--
INSTRUCTION BLOCK (remove before committing)
============================================
This template is filled in by the 201-high-level-design skill.

Status lifecycle — set the `status` field in the front matter block below:
  todo         → overview written; implementation not yet started
  implementing → feature is actively being built
  done         → all scenarios passing; feature is live

In Scope = boundary ("what we're building") — capability statements
Acceptance Criteria = outcomes ("how we know it works") — verifiable behavior that could
  fail even if the feature exists. Do not restate In Scope bullets here.
Key Constraints = non-obvious hard limits an engineer can't infer from scope or journey.
  Omit entirely if nothing meaningful applies.

User Journey depth rule:
- Parts of the flow this feature changes → 2–4 sub-bullets, specific
- Parts of the flow this feature passes through unchanged → 1 sub-bullet, summarized
- Lead from the user's perspective; system-internal steps are sub-bullets

Remove this instruction block before writing the file to the project.
============================================
-->

---
feature: [feature-name]
fid: F000
status: todo
---

# [Feature Name] (F000) — High-Level Design

## 1. Feature Overview

[1–2 sentences: what this feature does and the business problem it solves.]

### In Scope

- [Capability boundary statement — "Users can submit X", "The system supports Y"]
- [Capability boundary statement]
- [Capability boundary statement]

### Out of Scope

- [Explicitly excluded capability — be specific]
- [Explicitly excluded capability]

---

## 2. Acceptance Criteria

- [Observable outcome that could fail even if the feature is built — e.g., "A submitted
  expense appears in the history list immediately, without a page refresh"]
- [Edge-case or correctness outcome — e.g., "Submitting with a missing required field
  shows an inline error; the form does not clear the user's input"]
- [Cross-feature or integration outcome if applicable]

### Key Constraints

- [Non-obvious hard limit — e.g., "Must reuse the existing auth session; no new login flow"]
- [Omit this sub-section entirely if no real constraints exist]

---

## 3. User Journey

- **User opens the [screen/form/page]**
  - [What the user sees or does to initiate the flow]
  - Frontend: [what the UI renders or validates — detail here if this is new behavior]

- **User submits [the action]**
  - Frontend calls `POST /api/[endpoint]` with [key fields]
  - Backend validates and stores the record via the [existing/new] [service/table]
  - [Any new backend behavior gets its own sub-bullet with specifics]

- **User sees the result**
  - [What the UI shows in response — success state, updated data, navigation]
  - [Any secondary effect the user experiences — notification, redirect, etc.]

