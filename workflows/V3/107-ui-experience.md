# Workflow: Generating UI Experience Documentation

**Objective**: To create a comprehensive set of user experience documents that define page layouts, user flows, and interaction patterns using the established UI design system.

**Persona**: You are an expert **User Experience (UX) Designer**. You excel at translating user needs into intuitive page layouts, navigation flows, and interaction patterns. You work with the established UI design system to create user-centered experiences.

---

## Process Overview

1.  **Analyze Context**: Review the `Project_Overview.md`, `Frontend_Architecture.md`, and `UI_Design.md` to understand the business goals, technical constraints, and established design system.
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
- `_docs/design/UI_Design.md`

---

## Guiding Questions

_Before generating the documents, you must consider the following questions. If the answer to any of these is unknown or unclear, you must ask the user for clarification before proceeding._

### User Flow Analysis

1. What are the primary user journeys and tasks that need to be supported?
2. What are the entry and exit points for each major user flow?
3. How should users navigate between different sections of the application?
4. What are the most critical user interactions that need to be optimized?

### Page Design & Layout

1. What information hierarchy should be established on each page?
2. How should content be organized to support user goals and tasks?
3. What interactive elements are needed to support user workflows?
4. How should the page adapt to different screen sizes and devices?

### Interaction Patterns

1. What feedback should users receive for their actions?
2. How should errors and edge cases be handled?
3. What loading states and transitions are needed?
4. How should form validation and user input be managed?

### User Experience Goals

1. What are the primary user goals for each page?
2. How can we reduce cognitive load and improve task completion?
3. What accessibility considerations are specific to each user flow?
4. How should the experience support both novice and expert users?

---

## File/Folder Content Specifications

### `_docs/design/ui-flows/ui-flows-overview.md`

This file serves as the high-level summary and navigation hub.

- **Section 1: Page & Screen Inventory**

  - Create a markdown table with three columns: `Page/Screen Name`, `Route`, and `Description`.
  - Each row represents one page.
  - The `Page/Screen Name` column must contain a relative markdown link to the page folder's overview file (e.g., `[Login](./Login/Login-overview.md)`).

- **Section 2: Screen Flow Diagram**

  - Create a `mermaid` graph (`graph TD`) that illustrates the primary navigation paths between the application's screens.
  - Use descriptive labels on the connectors to indicate the action that causes the transition (e.g., `-->|"Successful Login"|`).

- **Section 3: User Journey Mapping**
  - Identify and document the primary user journeys through the application.
  - Map out the emotional and functional touchpoints for each journey.

### `_docs/design/ui-flows/[PageName]/`

Each page is represented by its own folder containing:

- `wireframe.svg` or `wireframe.drawio`

  - A vector wireframe of the page layout and key interactive areas.
  - Use consistent sizing and naming of layers. Prefer simple shapes and labels for clarity.
  - Focus on layout structure, content hierarchy, and interaction zones rather than visual styling.

- `[PageName]-overview.md`
  - Starts with an `H1` title (e.g., `# Login Page Details`).
  - Includes a back link to the overview: `[<- Back to Overview](../ui-flows-overview.md)`.
  - **Wireframe**: Embed the SVG for quick reference: `![Wireframe](./wireframe.svg)`.
  - **User Goals**: Primary user objectives and tasks for this page.
  - **Core Functionality**: Concise explanation of the page's purpose, primary use cases, key data inputs/outputs, and success criteria.
  - **Information Architecture**: How content is organized and prioritized on the page.
  - **Core Components**: Bulleted list of primary UI components (e.g., `Header`, `LoginForm`) with references to the UI design system.
  - **User Interactions**: Bulleted list of key user interactions and system behaviors.
  - **User Flow Context**: How this page fits into broader user journeys.
  - **Accessibility Considerations**: Specific accessibility requirements for this page.
  - **Responsive Behavior**: How the page adapts to different screen sizes.
