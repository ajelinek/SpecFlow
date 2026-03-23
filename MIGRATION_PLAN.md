# Migration Plan: Transforming @vibing into an Open-Source Framework

This document outlines the strategic roadmap to transform the internal `@vibing` project into a stack-agnostic, open-source orchestration engine for AI-driven engineering.

## 1. Terminology & Construct Refactoring

To align with emerging industry standards (Gemini CLI, Cursor, OpenCode), we will refactor internal terms to use more functional constructs.

| Current Term | New Open-Source Term | Logic |
| :--- | :--- | :--- |
| **Agents** | **Personas** | Clarifies that these are "roles" rather than autonomous software agents. |
| **Rules** | **Protocols** | Emphasizes that these are strict standards for the AI to follow. |
| **Workflows** | **Blueprints** | Positions them as reusable patterns for project execution. |
| **Modifiers** | **Skills** | Aligns with the Gemini CLI `activate_skill` construct. These become high-level "meta-capabilities" (e.g., `skill-stack-analyzer`). |
| **Templates** | **Schemas** | Focuses on the data structure of design documents. |

## 2. Architectural Shift: Decoupling

The project must move from a "built-in" model to a "pluggable" model.

### Phase A: Internal Decoupling
- **Action**: Extract all Firebase, Astro, Apollo, and React rules from `@vibing/rules/common` into `@vibing/packs/[tech-name]`.
- **Goal**: The core `@vibing` folder should contain ZERO stack-specific logic.

### Phase B: The `vibe` CLI
- **Action**: Build a CLI tool (`vibe`) that replaces manual modifier execution.
- **Functions**:
    - `vibe init`: Scaffolds the basic folder structure and `AGENTS.md`.
    - `vibe add [pack]`: Fetches protocols from the registry.
    - `vibe sync`: Runs the "Stack Analyzer" skill to update project context.

## 3. Rule Registry & External Fetching

Instead of maintaining a massive internal library of framework rules, Vibing will act as a **Rule Orchestrator**.

### Primary Rule Source
- **Target**: **[cursor.directory](https://cursor.directory)**
- **Reason**: It is the largest community-driven repository of AI coding rules.
- **Fetch Logic**: A `vibe add [tech]` command will scrape/fetch Markdown from `cursor.directory` and format it into a Vibing Protocol (`.md` file with standard Vibing headers).

### Secondary Rule Source
- **Target**: **PatrickJS/awesome-cursorrules**
- **Use Case**: Best-in-class foundation protocols (SOLID, DRY, Git standards).

## 4. Custom Rules: The "Rule Forge" Skill

We will implement an AI-driven modifier script (`vibe forge`) that allows users to provide raw intent which is then converted into a valid Protocol.

**The Workflow:**
1.  **User Input**: "I want a rule that says all database queries must be wrapped in a transaction and logged to Winston."
2.  **Forge Skill**: Analyzes the request, determines if it belongs in `backend/database.md` or a new file, and generates the Markdown with the correct `@vibing` tags.
3.  **Placement**: Automatically places it in `protocols/custom/` and updates the `rule-list.md`.

## 5. Migration Roadmap

### Iteration 1: Cleanup & Namespacing
- [ ] Rename `vibing/modifiers/` to `vibing/skills/`.
- [ ] Group all current rules under `vibing/rules/registry/internal`.
- [ ] Create `MIGRATION_MAP.json` to track file moves.

### Iteration 2: Protocol Standardization
- [ ] Standardize all `.md` files to use Frontmatter (YAML headers) for metadata like `appliesTo`, `techStack`, and `priority`.

### Iteration 3: The CLI Prototype
- [ ] Implement `vibe init` and `vibe sync` logic in a local script.

## 6. Pending Decisions

1.  **Language of CLI**: Should the CLI be written in **TypeScript** (idiomatic for current project) or **Go** (for performance/distribution)?
2.  **Skill Activation**: Do we use the native Gemini CLI `activate_skill` mechanism or maintain our own "Modifier" execution pattern for cross-IDE support (Cursor/OpenCode)?
3.  **Conflict Resolution**: How should the CLI handle cases where an external `cursor.directory` rule conflicts with an internal Vibing protocol?
4.  **Registry Hosting**: Will we host our own `vibing-registry` repo or rely entirely on community repos?

## 7. Best Registry Library to Fetch
**Winner: `cursor.directory`**
*   **Why**: It is the current "source of truth" for the community.
*   **Implementation**: We should create a scraper/wrapper that allows `vibe add nextjs` to pull from `https://cursor.directory/nextjs`.
