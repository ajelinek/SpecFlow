# Project Agent Guide

> Scope: Repository root. These instructions apply across the project unless a deeper `AGENTS.md` overrides local implementation details.

## Collaboration Rules

- Keep responses concise and engineering-focused.
- Do not explain basics unless asked.
- Assume the user is an experienced engineer.
- Ask clarifying questions only when they unblock real decisions.
- Number every question and every decision list so replies can be given item-by-item.
- Challenge incorrect assumptions directly and briefly.
- Prefer concrete conclusions over long option dumps.
- Keep chatter low.
- Do not volunteer deep background or tutorials unless requested.

## Repo Map

- `apps/` - deployable applications
- `packages/` - shared libraries and reusable modules
- `docs/` - architecture notes, ADRs, and operating guidance
- `.specflow/` - generated planning and design artifacts when SpecFlow is in use

## Working Rules

- Start from existing code and docs before proposing new structure.
- Prefer the smallest correct change.
- Reuse established commands, helpers, and patterns before adding new ones.
- Treat generated output, vendored code, and dependency directories as read-only unless the task explicitly targets them.

## Commands

- Install dependencies: `<replace with actual command>`
- Run tests: `<replace with actual command>`
- Run lint: `<replace with actual command>`
- Build the project: `<replace with actual command>`

## Source Of Truth

- Read architecture and domain docs before making structural changes.
- Follow package- or app-local `AGENTS.md` files for subtree-specific commands or constraints.
- If project docs and code disagree, trust the current code and call out the mismatch.

## Delivery

- Summarize what changed, affected files, and any remaining risks.
- Keep follow-up recommendations short and only include them when they are useful.
