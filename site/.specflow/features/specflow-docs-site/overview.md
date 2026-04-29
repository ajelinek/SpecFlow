---
feature: specflow-docs-site
fid: F011
status: done
---

# SpecFlow Docs Site (F011) — High-Level Design

## 1. Feature Overview

This feature builds the first public documentation website for SpecFlow using Astro. It explains the product in simple terms, makes the minimal path obvious, and gives users a clean reference for the full workflow catalog.

### In Scope

- Users can understand what SpecFlow is and see the minimal path on the homepage.
- Users can reach a fast onboarding guide with realistic prompts and expected outputs.
- The site publishes dedicated core workflow pages for `201`, `202`, `301`, and `401`.
- The full workflow catalog is grouped by category and clearly marks core, optional, and bonus skills.
- The site includes examples, concepts, FAQ content, and repository guidance for running and deploying the docs.

### Out of Scope

- Full-text site search
- Authenticated areas or user accounts
- Runtime analytics, comments, or editing workflows

---

## 2. Acceptance Criteria

- A new visitor can identify `201 -> 202 -> 301 -> 401` as the recommended starting path without reading the entire homepage.
- Docs pages expose stable navigation, active-page context, and previous/next traversal without broken links.
- The skills catalog distinguishes core, optional, and bonus skills consistently with the README.
- The site builds successfully for static deployment to GitHub Pages with the repository base path configured.

### Key Constraints

- Must use Astro and keep the implementation simple and maintainable.
- Must keep the homepage docs-first rather than marketing-first.

---

## 3. User Journey

- **User lands on the homepage**
  - The page explains SpecFlow in one sentence and shows the minimal path immediately.
  - Frontend renders clear calls to action for Getting Started and Core Workflow.

- **User chooses a path into the docs**
  - If the user is new, they open Getting Started and see a first-time example, core concepts, and file outputs.
  - If the user wants reference material, they open Core Workflow or the Full Skill Catalog.

- **User browses deeper documentation**
  - The docs shell shows the current section in the sidebar and exposes heading-level page navigation where useful.
  - Users can move linearly with previous/next links or jump directly through the sidebar.

- **User returns to the repository**
  - The README explains how to run, extend, and deploy the site.
  - GitHub Pages deployment provides a repeatable publishing path.
