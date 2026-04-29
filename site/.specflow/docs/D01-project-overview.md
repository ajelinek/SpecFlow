# D01 — Project Overview

## 1. Application Purpose & Value Proposition

The SpecFlow documentation site explains a lightweight, spec-driven workflow for building software with AI without forcing users through a heavyweight process. It gives engineers a clear starting path, a browsable workflow catalog, and practical examples that make adoption fast and credible.

---

## 2. Target Users & Their Goals

| User Type | Primary Goal |
|-----------|-------------|
| Evaluating engineer | Decide within one short session whether SpecFlow is worth trying in a real project |
| Adopting engineer | Run the minimal SpecFlow path on a feature without guessing which workflows matter |
| Returning user | Find the exact workflow, example, or concept page needed without reading the site linearly |

---

## 3. Key Business Scenarios

1. **Quick evaluation**: An engineer lands on the homepage, understands SpecFlow in simple terms, and can identify the minimal path without reading the full catalog. Success looks like the user reaching Getting Started or Core Workflow within one or two clicks.
2. **First successful run**: A new user reads Getting Started, copies a prompt sequence, and understands what files SpecFlow produces. Success looks like the user being able to try SpecFlow in an existing repo with minimal confusion.
3. **Core workflow lookup**: A user navigating a real feature can open a specific core workflow page and understand when to invoke it, what it produces, and what usually comes next. Success looks like fewer ambiguous prompts and less misuse.
4. **Catalog browsing**: A user who needs deeper planning or a specialized path can browse the full catalog without losing the distinction between core, optional, and bonus skills. Success looks like the broader system staying understandable rather than overwhelming.
5. **Operational handoff**: A contributor or maintainer can run the docs site locally, add content, and deploy to GitHub Pages using clear repository guidance. Success looks like low-friction site maintenance.

---

## 4. Technology Constraints & Preferences

- **Must have**: Static hosting support; Astro-based implementation; accessible semantic HTML; responsive desktop and mobile layouts
- **Preferred**: Content collections or structured markdown/MDX content; minimal dependencies; GitHub Pages deployment path
- **Constraints**: The site should stay docs-first, not marketing-first; the implementation should remain easy to maintain inside the existing SpecFlow repository

---

## 5. High-Level Feature Categories

- Homepage and product framing
- Getting started and onboarding
- Core workflow reference
- Full skill catalog and examples
- Concepts, FAQ, and contributor/deployment guidance

---

## 6. Open Questions

- [ ] Whether future contributor docs should become part of the primary navigation or remain secondary.
- [ ] Whether search should be introduced after the initial content structure proves stable.
