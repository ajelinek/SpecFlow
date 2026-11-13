# .specflow/ Directory Guide

This folder holds SpecFlow's generated project memory. See root `AGENTS.md` for repo-wide guidance.

- `context/` — reusable domain knowledge (e.g. `domain-knowledge.md`). Available across features;
  read the relevant findings when business terminology or constraints are unresolved, not by default.
- `docs/` — project-level design docs (`D01`-`D11`: architecture, data model, UI, etc.). Read the
  docs relevant to the task at hand.
- `features/<F-ID>-<slug>/` — one folder per documented feature (`overview.md`, `specs.feature`).
  `301` keeps code-grounded design and its reviews in memory unless persistence is requested.

## Context and Updates

Start from the request, selected feature, applicable project rules, and scoped code/tests. Open a doc
section for a specific governing decision or unresolved question, not simply because it exists.
Default subjects (honor project path overrides): D01 product; D02 system shape; D03 data; D04 backend;
D05 frontend; D06 visual rules; D07 navigation/interactions; D08 page designs; D10 feature planning;
D11 exploratory defects. Do not create a second index merely to route reads.

Docs own governing decisions and active requirements; code/schema/config own current implementation.
Tests check intended behavior; historical feature plans/mockups are snapshots, not global rules.
Do not synchronize documents for every code change. Update only a relied-on governing decision,
active requirement, command, or reference invalidated by an approved change; keep the correction
narrow or record an explicit approved exception. Resolve conflicts rather than treating code drift
as approval. Preserve lifecycle/status updates and audit records required by the running workflow.

## Feature Isolation Rule

Each `features/` folder belongs to exactly one feature. When working on a feature, read and write
only inside that feature's own folder. Do not open, read, or draw context from a different
feature's folder unless the user explicitly asks you to compare or reference it — sibling features
may be stale, superseded, or simply irrelevant to the one in progress.
