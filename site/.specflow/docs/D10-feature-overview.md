# D10 — Feature Overview

**Product**: SpecFlow documentation site
**Last updated**: 2026-04-27

---

## Summary

See `.specflow/docs/D01-project-overview.md` for the full product framing.

This feature overview covers the first public release of the SpecFlow docs site.

---

## 🔵 C001 — Docs Foundation

_The shared structure that makes the site navigable, maintainable, and deployable._

### 🔵 F001 — Astro site scaffold

Create the static docs site foundation and local developer workflow.

- The repository includes a working Astro project with local dev, build, preview, lint, and test scripts.
- The site can be deployed to GitHub Pages without manual file copying.
- Shared layouts and reusable components exist for the homepage and docs pages.
- The implementation stays lightweight and avoids unnecessary framework complexity.

**Dependencies**: None

---

### 🔵 F002 — Shared docs shell

Provide the navigation and page structure used across the docs.

- Docs pages include a top nav, left sidebar, active-page highlighting, and previous/next navigation.
- A page-level table of contents appears when the screen size allows it.
- Breadcrumbs help users understand where they are in the docs hierarchy.
- The shell remains usable on mobile without losing access to the sidebar content.

**Dependencies**: F001

---

### 🔵 F003 — GitHub Pages deployment path

Make publishing the site a repeatable repository workflow.

- The repository includes a deployment workflow for GitHub Pages.
- The site config uses the correct public base path for repository hosting.
- Build output is compatible with static hosting only.
- Deployment guidance is visible in the repo documentation.

**Dependencies**: F001

---

## 🔵 C002 — Product Story

_The content that explains SpecFlow clearly and gets new users to a first successful run._

### 🔵 F004 — Homepage framing

Present the SpecFlow story in one short, credible pass.

- The homepage explains what SpecFlow is in plain language.
- The minimal path is visible without reading deep into the page.
- Optional and bonus skills are acknowledged without crowding the core story.
- Primary calls to action lead to Getting Started and Core Workflow.

**Dependencies**: F002

---

### 🔵 F005 — Getting started guide

Give new users the fastest route to trying SpecFlow successfully.

- The page explains what SpecFlow is, who it is for, and the core concepts.
- A realistic first-time example shows how the minimal path is invoked.
- The guide explains what files SpecFlow typically creates.
- Common clarifications are answered directly on the page.

**Dependencies**: F004

---

### 🔵 F006 — Core workflow reference

Explain the main path in a way that supports both reading and lookup.

- The site includes an overview page for the core workflow.
- Each core workflow has its own page with purpose, inputs, outputs, prompts, next steps, and misuse guidance.
- The sequence from 201 through 401 stays consistent across the homepage, getting started, and the reference pages.
- The reference remains concise enough for fast scanning.

**Dependencies**: F005

---

## 🔵 C003 — Broader Catalog

_The content that helps users grow past the minimal path without losing the system shape._

### 🔵 F007 — Full skill catalog

Publish the broader workflow system as a browsable reference.

- Skills are grouped into clear categories rather than one flat list.
- Each skill entry shows its purpose, when to use it, and whether it is core, optional, or bonus.
- Bonus skills remain visible but visually demoted from the core story.
- The catalog can be scanned quickly by returning users.

**Dependencies**: F002

---

### 🔵 F008 — Examples section

Show how teams actually invoke SpecFlow in realistic situations.

- The examples cover an existing project feature, greenfield planning, test-only work, cleanup work, and bonus skills.
- Each example includes a realistic prompt sequence.
- The examples reinforce when to stay on the minimal path and when to widen scope.
- The section remains practical rather than aspirational.

**Dependencies**: F005, F007

---

### 🔵 F009 — Concepts and FAQ

Answer the reasoning questions that come up after initial interest.

- Concepts pages explain Gherkin, why the docs are small, core vs optional workflows, project rules, and cleanup as a separate phase.
- FAQ answers the recurring objections and confusion points directly.
- The explanations support adoption without repeating the entire getting started guide.

**Dependencies**: F005, F006

---

## 🔵 C004 — Site Stewardship

_The guidance that keeps the docs site easy to extend over time._

### 🔵 F010 — Maintainer README

Document how the docs site is organized and maintained.

- The repository README explains how to run the site locally.
- It explains where content lives and how to add new pages.
- It includes deployment guidance for GitHub Pages.
- It keeps the existing SpecFlow product context intact rather than replacing it.

**Dependencies**: F001, F003
