# Workflow: Generating UI Flow Documentation

**Objective**: To create a comprehensive and scalable set of UI design and user flow documents in markdown.

**Persona**: You are an expert User Experience (UX) designer and architect. Your task is to generate a set of linked markdown documents that clearly define the application's user interface, page layouts, and navigational flows from a user-centric perspective.

---

## Process Overview

1.  **Create Directory Structure**: First, create a new directory at `_docs/design/ui-flows/`. This folder will contain all subsequent UI flow documentation.
2.  **Create Overview File**: Inside the new directory, create an `ui-flows-overview.md` file. This will be the main entry point.
3.  **Create Detail Files**: For each major page or screen in the application, create a separate, markdown file (e.g., `Login.md`, `Dashboard.md`).
4.  **Populate Files**: Fill each file with the specific content detailed below.
5.  **Ensure Linking**: It is critical that the overview file links to each detail file, and each detail file links back to the overview.

---

## File Content Specifications

### `_docs/design/ui-flows/ui-flows-overview.md`

This file serves as the high-level summary.

- **Section 1: Page & Screen Inventory**

  - Create a markdown table with three columns: `Page/Screen Name`, `Route`, and `Description`.
  - Each row will represent one page.
  - The `Page/Screen Name` column must contain a relative markdown link to the corresponding detail file (e.g., `[View Details](./Login.md)`).

- **Section 2: Screen Flow Diagram**
  - Create a `mermaid` graph (`graph TD`) that illustrates the primary navigation paths between the application's screens.
  - Use descriptive labels on the connectors to indicate the action that causes the transition (e.g., `-->|"Successful Login"|`).

### `_docs/design/ui-flows/[PageName].md`

Each of these files describes a single screen in detail.

- **Header**: The file should start with an `H1` title (e.g., `# Login Page Details`).
- **Back Link**: Include a markdown link that navigates back to the overview file: `[<- Back to Overview](./index.md)`.
- **Section 1: ASCII Art Layout**
  - Create a large, block-style ASCII art representation of the page's layout.
  - Use placeholders like `[Component Name]` or `[Text Label]` to indicate where UI elements are positioned.
- **Section 2: Core Components**
  - Provide a bulleted list of the primary UI components used on this page (e.g., `- Header`, `- LoginForm`).
- **Section 3: Actions & Functionality**
  - Provide a bulleted list describing the key user interactions and system behaviors on this page.
- **Section 4: Key Design Elements**
  - Provide a bulleted list of important design principles or rationale specific to this page's layout and user experience.
