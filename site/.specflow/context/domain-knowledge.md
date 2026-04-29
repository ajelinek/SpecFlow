# Domain Knowledge

## 1. Domain Overview

**Project**: SpecFlow documentation website

**Domain**: Developer documentation for AI-assisted software delivery workflows

**Last updated**: 2026-04-27

**Research date**: 2026-04-27

**Bottom line**: Engineers evaluating workflow tooling want the same thing they want from a good developer tool: a clear mental model, a fast first success, and a reference they can trust when they come back later. In this domain, the product story has to be visible on the homepage, but credibility comes from docs structure, examples, and practical specificity rather than marketing copy. For SpecFlow, that means making the minimal feature path obvious, keeping optional workflows visibly optional, and publishing the full catalog in a way that supports direct lookup.

---

## 2. Market Context

The site sits at the intersection of two expectations: modern developer documentation patterns and rising interest in structured AI-assisted software workflows. The audience is already familiar with docs-heavy tools, so the site is judged less like a launch page and more like a reference manual.

- **Current state**: Strong developer tools use documentation-first product surfaces. Official Astro, Starlight, Docusaurus, Nextra, and Vite docs all bias toward fast task-oriented navigation, clear sidebars, and direct examples instead of heavy marketing claims.
- **Important trends**: AI-assisted coding tools are creating demand for more explicit workflow guidance, but engineers remain skeptical of hype-heavy product sites. Credibility comes from concrete examples, constrained claims, and clear separation between core paths and optional depth.
- **Relevant substitutes**: Project README files, ad hoc prompting patterns, generic internal engineering playbooks, and documentation systems such as Docusaurus, Nextra, and Starlight that set the usability baseline for developer-facing sites.

---

## 3. User Landscape

| User or Buyer Type | Primary Goal | Main Friction or Constraint | What They Care About Most |
|---|---|---|---|
| Evaluating engineer | Understand what SpecFlow is and whether it is worth trying | Limited time, skepticism toward AI-process claims | Clarity, credibility, quick scanability |
| Adopting engineer | Run the smallest useful workflow in an existing project | Too many possible skills, unclear start point | Fast onboarding, exact prompts, minimal ceremony |
| Returning contributor | Look up a workflow or prompt pattern quickly | Needs direct access, not a long narrative | Navigation, consistency, reference quality |

---

## 4. Domain Workflows & Decision Points

1. **Initial evaluation**: An engineer lands on the homepage, decides whether the system is lightweight enough to try, then looks for a fastest-path page or core workflow reference.
2. **First adoption pass**: A user reads Getting Started, copies a realistic prompt sequence, and wants to know what files will be produced and what comes next.
3. **Reference lookup**: A returning user navigates directly to a workflow page, example, concept, or FAQ answer rather than re-reading the site linearly.

**Decision points that matter**:

- Whether the minimal path is obvious within seconds of landing on the site.
- Whether optional and bonus skills are clearly separated from the core story.
- Whether the docs support both sequential reading and direct lookup without changing the mental model.

---

## 5. Market Expectations & Differentiation

### What users already expect

- A left-sidebar docs shell with active page highlighting and predictable hierarchy.
- Concise getting-started guidance with copyable prompts and concrete outputs.
- Clear deployment, build, and contribution instructions for the site itself.

### Where this project can differentiate

- By making the core SpecFlow story intentionally smaller than the full catalog.
- By treating optional and bonus skills as support structure instead of the headline.
- By using a docs-first homepage that feels like a serious developer tool, not a startup landing page.

### Risks to the current thesis

- The workflow catalog can overwhelm new users if the site does not visually subordinate the optional paths.
- A custom docs shell can drift into generic design patterns if the content hierarchy is not strong enough.

---

## 6. Regulatory / Operational Constraints

- **Operational**: The site should remain simple to host and maintain, with static deployment to GitHub Pages and minimal dependency weight.
- **Geographic or market-specific**: No region-specific product constraints were identified for this documentation build.

---

## 7. Domain Vocabulary & Concepts

- **Minimal path**: The smallest SpecFlow sequence most users should start with: `201 -> 202 -> 301 -> 401`.
- **Core skill**: A workflow that belongs to the main SpecFlow story and should be visually emphasized.
- **Optional skill**: A workflow that helps when more planning, stronger design, or broader project definition is needed.
- **Bonus skill**: A support capability that is useful, but not part of the central feature workflow story.
- **Docs-first site**: A product site where the primary job is explanation and reference, not conversion copy.

---

## 8. Implications For This Project

- **Implications for `101-project-overview`**: The value proposition should emphasize fast onboarding, credible workflow structure, and direct applicability to real engineering work.
- **Implications for architecture and data**: A static Astro site with content collections is a good fit because the content is structured, mostly static, and benefits from typed metadata.
- **Implications for UX and UI**: The homepage should behave like an opinionated table of contents. Docs pages should support scanning first, reading second. Dark mode should exist, but visual tone should stay restrained.
- **Implications for feature planning**: The earliest slices should cover the homepage, getting started, core workflow pages, skill catalog, and deployment guidance. Search can wait.

---

## 9. Sources & Confidence Notes

- Astro Content Collections — Astro Docs, current docs, important because it confirms a typed content model is the right fit for structured markdown and MDX.
- Deploy your Astro Site to GitHub Pages — Astro Docs, current docs, important because it defines the correct `site`, `base`, and GitHub Actions deployment setup.
- Starlight Getting Started — Starlight Docs, current docs, important because it establishes the baseline for docs-first navigation patterns in the Astro ecosystem.
- Docusaurus Introduction — Docusaurus Docs, current docs, important because it reflects the market expectation that documentation tools should focus on content and task completion.
- Nextra Introduction — Nextra Docs, current docs, important because it reinforces modern docs conventions around content-first structure.
- Vite Getting Started — Vite Docs, current docs, important because it shows how developer tools communicate setup with direct commands and low-friction onboarding.

**Open questions**:

- [ ] Whether site search should be added in a later pass once the information architecture stabilizes.
- [ ] Whether contributor docs need a dedicated public section or should remain secondary to the main user journey.
