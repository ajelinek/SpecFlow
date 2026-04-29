---
name: specflow
description: A lightweight, spec-driven workflow for designing, implementing, and cleaning up software with AI. Use it when you want one installable entrypoint that routes you to the right SpecFlow skill or workflow phase.
---

# SpecFlow

SpecFlow is a small, structured workflow for building software with AI without turning the work
into heavyweight process.

Treat this as the umbrella entrypoint for the full SpecFlow catalog.

## Core Path

For most feature work, use this sequence:

1. `201-high-level-design`
2. `202-spec-design`
3. `301-spec-implementation`
4. `401-cleanup`

If you only use one part of SpecFlow, use that path.

## What This Skill Does

Use this skill when the user wants the overall SpecFlow workflow rather than a single narrow
skill.

This umbrella skill should:

1. Recognize whether the user needs project setup, feature design, implementation, cleanup, or a
   support skill.
2. Route the work to the smallest appropriate SpecFlow skill instead of trying to do everything in
   one pass.
3. Prefer the core feature path unless the task clearly needs broader planning or support work.

## Routing Guide

- Use `201-high-level-design` to define a feature.
- Use `202-spec-design` to write Gherkin behavior scenarios.
- Use `203-implementation-design` when a codebase-grounded implementation plan is needed before
  coding.
- Use `204-feature-validation` to review feature artifacts before implementation.
- Use `301-spec-implementation` for the main implementation pass.
- Use `302-test-implementation` when behavior already exists and tests are missing or incomplete.
- Use `401-cleanup` for a scoped cleanup pass on changed source files or changed test files.

## Optional Project Setup Skills

Use the 100-series when the task needs stronger project context before feature work:

- `100-domain-knowledge`
- `101-project-overview`
- `102-system-architecture`
- `103-common-data-model`
- `104-backend-architecture`
- `105-frontend-architecture`
- `106-ui-design`
- `107-ui-experience`
- `108-ui-page-design`
- `110-feature-overview`

## Bonus Skills

Use these only when they materially help the task:

- `agent-context`
- `deep-research`

## Worker Agents

SpecFlow also includes supporting worker agents in `agents/`, such as `coder`, `designer`, and
`execution-agent`.

These are not the main public interface and may require separate agent-specific installation.
