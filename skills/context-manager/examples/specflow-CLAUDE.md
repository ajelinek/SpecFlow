# .specflow/ Directory Guide

This folder holds SpecFlow's generated project memory. See root `CLAUDE.md` for repo-wide guidance.

- `context/` — reusable domain knowledge (e.g. `domain-knowledge.md`). Safe to read across any work.
- `docs/` — project-level design docs (`D01`-`D11`: architecture, data model, UI, etc.). Read the
  docs relevant to the task at hand.
- `features/<F-ID>-<slug>/` — one folder per feature (`overview.md`, `specs.feature`,
  `implementation.md`), each a point-in-time snapshot.

## Feature Isolation Rule

Each `features/` folder belongs to exactly one feature. When working on a feature, read and write
only inside that feature's own folder. Do not open, read, or draw context from a different
feature's folder unless the user explicitly asks you to compare or reference it — sibling features
may be stale, superseded, or simply irrelevant to the one in progress.
