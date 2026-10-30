<!--
Check project conventions for the overall frontend design before drafting. Keep the project folder
structure and core rules explicit, using actual or confirmed paths and patterns, not a preset tree.
Use only applicable bullets, rows, and sections. No default libraries, state infrastructure, or layers.
Reference governing guidance and D02/D04 rather than repeat them; distinguish existing decisions from proposals.
Add specialist concerns only when relevant. Omit Open Questions when none remain.
Remove this block, examples, placeholders, and empty optional sections before writing the generated document.
-->

# D05 — Frontend Architecture

## 1. Frontend Structure & Rendering

**Governing conventions**: [Paths or links to the project guidance and frontend standards that govern this design; note any unresolved conflicts.]

- **Execution model**: [Framework and deployment reference from D02; frontend-specific constraints or confirmed exceptions.]
- **Rendering & routing**: [Static/server/client responsibilities, hydration where needed, and route composition/guard ownership. Product navigation and page inventory belong in D07.]

### Project Folder Structure

```text
[Project-specific folder tree with responsibility comments. Show frontend roots and meaningful
code locations, including tests; keep established or confirmed paths and label proposed additions.]
```

## 2. Component Boundaries & Core Rules

| Owner / Location | Responsibility | Boundary / Dependencies |
|------------------|----------------|-------------------------|
| [Project component or module boundary] | [What it owns] | [What it delegates to or must not own] |

### Core Rules

- **Naming & files**: [Project naming, file placement, and component conventions; link to detailed standards.]
- **Imports & dependencies**: [Public entry points, allowed dependency direction, and important forbidden patterns; enforcement if known.]
- **Reuse & ownership**: [Where shared UI lives, when to extend it, and where business logic and external access belong.]

## 3. State Ownership

| State / Concern | Owner & Mechanism | Lifetime / Sharing Boundary |
|-----------------|-------------------|-----------------------------|
| [Applicable component, URL, global, or remote state] | [Actual native primitive, framework facility, or confirmed library] | [What belongs here, what does not, and persistence or invalidation when relevant] |

## 4. Data & Backend Integration

- **Data flow**: [Where content fetching and mutations belong; reference backend contracts or other sources where relevant.]
- **Access & safety**: [Applicable auth/session boundaries, server-only work, and protection of secrets; no assumed authentication scheme.]
- **User-facing states**: [Ownership of loading, empty, and error handling.]
- **Caching & updates**: [Relevant caching, revalidation, or real-time lifecycle rules and their owner; omit if unnecessary.]

## 5. Styling & Accessibility

- **Styling ownership**: [Project stylesheet organization, token consumption, and component/theming conventions; visual direction belongs in D06.]
- **Accessibility**: [Confirmed target and relevant semantic, keyboard, focus, and responsive requirements; how they are checked.]

## 6. Frontend Verification

| Check | Tool / Method | Scope |
|-------|---------------|-------|
| [Relevant frontend check] | [Confirmed tool, command, or review method; reference D02 where applicable] | [Behavior, boundary, or risk it verifies] |

## 7. Open Questions

- [ ] [Unresolved decision or assumption, its impact, and what would resolve it.]
