# D07 — UI Experience Overview

**Purpose**: Establishes the UX architecture and navigation strategy for the SpecFlow documentation site and inventories the public routes.

---

## Navigation & Interaction Patterns

- **Navigation Approach**: Top navigation for major sections; left sidebar for docs pages; right-side table of contents for heading-level page scanning on larger screens
- **Cross-Platform Patterns**: Desktop uses full docs shell; tablet and mobile collapse the sidebar into a disclosure panel and remove the right-side TOC
- **Role-Based Navigation**: No authenticated roles in v1; all public docs share the same navigation model
- **Core Interactions**: Move from homepage to Getting Started or Core Workflow in one click; browse section pages through the sidebar; use previous/next links for sequential reading; jump to headings through the page TOC
- **Accessibility**: Semantic landmarks, keyboard-reachable navigation, visible focus states, descriptive breadcrumb trail, and readable heading anchors
- **Error Handling**: Custom 404 page returns users to Getting Started; build-time content issues fail the site build rather than surfacing as runtime content errors

---

## Page Summary

| Page Name | Route | Description | Access |
|---|---|---|---|
| Home | `/` | Product overview with the minimal path and entry points into the docs | Public |
| Getting Started | `/getting-started/` | Fastest path from first read to first SpecFlow run | Public |
| Core Workflow | `/core-workflow/` | Overview of the main 201 -> 202 -> 301 -> 401 path | Public |
| 201 High-Level Design | `/core-workflow/201-high-level-design/` | Explains what 201 is for and how to invoke it well | Public |
| 202 Spec Design | `/core-workflow/202-spec-design/` | Explains how behavior specs are written in Gherkin | Public |
| 301 Spec Implementation | `/core-workflow/301-spec-implementation/` | Explains the main implementation workflow and validation model | Public |
| 401 Cleanup | `/core-workflow/401-cleanup/` | Explains deliberate cleanup after the code works | Public |
| Full Skill Catalog | `/skills/` | Groups the full workflow catalog by category and tier | Public |
| Examples | `/examples/` | Index of common adoption patterns and realistic prompt flows | Public |
| New Feature in Existing Project | `/examples/new-feature-existing-project/` | Walkthrough for the most common real-world starting case | Public |
| Greenfield Project with More Planning | `/examples/greenfield-project-with-more-planning/` | Shows when the 100-series is useful before feature work | Public |
| Test-Only Workflow | `/examples/test-only-workflow/` | Shows when to use 302 for missing automated coverage | Public |
| Cleanup Workflow | `/examples/cleanup-workflow/` | Shows how to use 401 on an already-changed scope | Public |
| Using Bonus Skills | `/examples/using-bonus-skills/` | Shows when agent-context and deep-research help without becoming the main story | Public |
| Concepts | `/concepts/` | Index of the main ideas behind SpecFlow | Public |
| Why SpecFlow Uses Gherkin | `/concepts/why-specflow-uses-gherkin/` | Explains why Gherkin improves review and discussion | Public |
| Why the Docs Stay Small | `/concepts/why-the-docs-stay-small/` | Explains the preference for short, reviewable artifacts | Public |
| Core vs Optional Workflows | `/concepts/core-vs-optional-workflows/` | Explains the system shape without flattening everything into one path | Public |
| Existing Project Rules | `/concepts/how-specflow-works-with-existing-project-rules/` | Explains how SpecFlow works with AGENTS.md and local standards | Public |
| Why Cleanup Is Separate | `/concepts/why-cleanup-is-a-separate-phase/` | Explains why cleanup is intentional and scoped | Public |
| FAQ | `/faq/` | Answers common objections and recurring confusion points | Public |
| 404 | `*` | Not-found page with a path back to Getting Started | Public |
