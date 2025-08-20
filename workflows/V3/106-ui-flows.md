# Workflow: Generating UI Flow Documentation

**Objective**: To create a comprehensive and scalable set of UI design and user flow documents in markdown.

**Persona**: You are an expert **User Experience (UX) designer and architect**. Your task is to generate a set of linked markdown documents that clearly define the application's user interface, page layouts, and navigational flows from a user-centric perspective.

---

## Process Overview

1.  **Analyze Context**: Review the `Project_Overview.md` and `Frontend_Architecture.md` to understand the business goals and established frontend patterns.
2.  **Create Directory Structure**: Create a new directory at `_docs/design/ui-flows/`.
3.  **Create Overview File**: Inside the new directory, create an `ui-flows-overview.md` file. This will be the main entry point.
4.  **Create Page Folders**: For each major page or screen, create a folder at `_docs/design/ui-flows/[PageName]/` containing:
    - `wireframe.svg`
    - `[PageName]-overview.md`
5.  **Populate Folders**: Fill each folder with the specific content detailed in the specifications below.
6.  **Ensure Linking**: The overview file must link to each page folder's `[PageName]-overview.md`. Each page overview file must link back to `ui-flows-overview.md`.

---

## Context Files

- `_docs/design/Project_Overview.md`
- `_docs/design/Frontend_Architecture.md`

---

## File/Folder Content Specifications

### `_docs/design/ui-flows/ui-flows-overview.md`

This file serves as the high-level summary.

- **Section 1: Page & Screen Inventory**

  - Create a markdown table with three columns: `Page/Screen Name`, `Route`, and `Description`.
  - Each row represents one page.
  - The `Page/Screen Name` column must contain a relative markdown link to the page folder's overview file (e.g., `[Login](./Login/Login-overview.md)`).

- **Section 2: Screen Flow Diagram**
  - Create a `mermaid` graph (`graph TD`) that illustrates the primary navigation paths between the application's screens.
  - Use descriptive labels on the connectors to indicate the action that causes the transition (e.g., `-->|"Successful Login"|`).

### `_docs/design/ui-flows/[PageName]/`

Each page is represented by its own folder containing:

- `wireframe.svg`

  - A vector wireframe of the page layout and key interactive areas.
  - Use consistent sizing and naming of layers. Prefer simple shapes and labels for clarity.

- `[PageName]-overview.md`
  - Starts with an `H1` title (e.g., `# Login Page Details`).
  - Includes a back link to the overview: `[<- Back to Overview](../ui-flows-overview.md)`.
  - **Wireframe**: Embed the SVG for quick reference: `![Wireframe](./wireframe.svg)`.
  - **Core Functionality**: Concise explanation of the page's purpose, primary use cases, key data inputs/outputs, and success criteria.
  - **Core Components**: Bulleted list of primary UI components (e.g., `Header`, `LoginForm`).
  - **Actions & Functionality**: Bulleted list of key user interactions and system behaviors.
  - **Key Design Elements**: Bulleted list of major design principles or rationale specific to this page.
