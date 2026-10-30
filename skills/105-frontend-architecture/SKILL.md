---
name: 105-frontend-architecture
description: >
  Use `105` to define frontend architecture grounded in project conventions: folder structure,
  core rules, rendering, component boundaries, state, and integration patterns. Trigger it for
  prompts like "105", "frontend architecture", "component structure", or "state management"
  when frontend patterns need to be specified before UI design.
---

# 105 - Frontend Architecture

Record the frontend patterns needed to place the next change correctly. Check project conventions
for the overall frontend design before proposing structure or rules. Keep an annotated project
folder tree and concise core rules explicit, without prescribing a framework, library, or layering
scheme. Use the confirmed framework's vocabulary and document meaningful boundaries, not every file.

D02 owns stack and system-level testing choices; D04 owns backend contracts and security enforcement.
D05 explains their frontend application. D06 owns visual direction; D07 owns product navigation and
page inventory. Reference those decisions when present rather than repeat them. Upstream documents
are useful context, not prerequisites when the relevant decisions are already known.

**Output path**: `.specflow/docs/D05-frontend-architecture.md`

---

## Required Inputs

1. **Project conventions** — governing guidance, established folder structure, and core frontend rules
2. **Framework and execution model** — confirmed framework, rendering approach, and deployment constraints
3. **Data and interaction needs** — content sources, backend integration, and state that needs ownership
4. **Audience and constraints** — access model, accessibility, device support, and known performance needs

Real-time updates, localization, SEO, offline support, and external integrations inform the document
only when relevant. Inputs can come from existing project evidence; they are not a questionnaire or
a requirement to choose new tools.

---

## Steps

- [ ] **Step 1: Load project context.** Update an existing D05 rather than create a competing copy.
  Read project guidance (`AGENTS.md` or equivalent), frontend conventions, D01, D02, D04, and other
  directly relevant docs when present. Inspect actual folders, representative components, routing,
  state/data owners, styling, package/config files, and tests; use `@explore` when useful. Distinguish
  established conventions from incidental code patterns and proposed changes.

- [ ] **Step 2: Resolve inputs.** Use `gap-check` for gaps that block architecture decisions, using
  loaded context before asking. Don't ask again about confirmed choices. Keep non-blocking
  uncertainties in Open Questions rather than inventing decisions.

- [ ] **Step 3: Resolve frontend patterns.** Respect confirmed user decisions and binding project rules.
  Use relevant installed skills to guide unresolved choices, not override project conventions.
  Surface conflicts between guidance and code; don't silently redesign the frontend. For an undecided
  material choice, recommend an option with its tradeoff and ask for confirmation. In a new project,
  propose the smallest suitable structure, clearly labeled until confirmed. Don't add libraries,
  folders, layers, or numeric policies just to fill the template.

- [ ] **Step 4: Draft the document.** Use `./templates/T05 - Frontend Architecture.md` as an adaptable,
  skimmable structure:
  - **Frontend Structure & Rendering** — governing convention paths, framework/hosting references,
    static/server/client responsibilities, hydration and routing/guard ownership where applicable.
    Include an annotated project folder tree: frontend roots and the meaningful locations for routes,
    components, shared code, state/data, styles, and tests where they exist or are confirmed. Show where
    new code belongs, not an exhaustive file listing or a mandatory folder scheme.
  - **Component Boundaries & Core Rules** — responsibility boundaries and a short set of project-specific
    rules for naming, imports, dependency direction, and reuse. Identify the shared UI owner and where
    logic and external access belong; include important forbidden patterns and enforcement when known.
    Reference detailed standards rather than copy their full rulebooks.
  - **State Ownership** — Component, URL, global, and remote state are a thinking aid, not four required
    libraries. Explain ownership, lifetime, and sharing for applicable state; native primitives,
    framework loaders, or "not needed" are valid. Note a meaningful exclusion briefly rather than
    inventing infrastructure.
  - **Data & Backend Integration** — applicable data access, mutations, auth/session handling,
    errors, loading/empty states, and caching ownership. Reference D04 where available; don't assume
    token-based auth or a custom backend. Keep secrets and server-only work out of client code.
  - **Styling & Accessibility** — stylesheet/token ownership, component styling, theming where needed,
    and the confirmed accessibility target and checks; leave visual choices to D06.
  - **Frontend Verification** — frontend-specific checks, tools, and risks covered, referencing D02
    rather than repeating its strategy. No required testing layers or blanket coverage exclusions.
  Add real-time, i18n, SEO, or other concerns only where they materially change these patterns; use a
  short dedicated section if it makes them easier to find.

- [ ] **Step 5: Quality check.** A new engineer can follow the folder tree and core rules to place a
  change correctly. Decisions trace to project conventions, confirmed requirements, or code evidence;
  conflicts and proposals are visible. State and rendering boundaries are clear where relevant,
  integration matches the actual backend, and no stack, directory tree, or policy is invented merely
  to complete the document.

- [ ] **Step 6: Write and summarize.** Remove template instructions, examples, placeholders, and empty
  optional sections. Write the file, report governing convention sources, material decisions, and open
  questions, and suggest `106-ui-design` or feature work only as needed.
