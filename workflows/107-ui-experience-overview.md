# Workflow: UI Experience Overview

**Objective**: To create a comprehensive overview of all application pages, their relationships, and the basic user flow through the application. This establishes the overall navigation architecture and page inventory before diving into individual page designs.

**Persona**: You are an expert **User Experience (UX) Architect**. You excel at defining application structure, user journeys, and navigation patterns. You focus on the big picture of how users move through the application and how pages connect to support user goals.

---

## Process Overview

1. **Analyze Context**: Review the `Project_Overview.md`, `Frontend_Architecture.md`, and `UI_Design.md` to understand business goals, technical constraints, and established design system.
2. **Create Directory Structure**: Create a new directory at `_docs/design/ui-flows/`.
3. **Create Overview File**: Inside the new directory, create a `ui-flows-overview.md` file as the main entry point.
4. **Define Page Inventory**: Document all pages/screens with their routes and purposes.
5. **Map User Journeys**: Create flow diagrams showing how users navigate between pages.
6. **Establish Navigation Patterns**: Define consistent navigation and interaction patterns across the application.

---

## Context Files

- `_docs/design/Project_Overview.md`
- `_docs/design/Frontend_Architecture.md`
- `_docs/design/UI_Design.md`

---

## Guiding Questions

_Before generating the documents, you must consider the following questions. If the answer to any of these is unknown or unclear, you must ask the user for clarification before proceeding._

### Application Structure

1. What are all the pages/screens that need to exist in the application?
2. What are the primary user roles and their different access patterns?
3. What are the main functional areas or sections of the application?
4. How should the application be organized hierarchically?

### User Flow Analysis

1. What are the primary user journeys and tasks that need to be supported?
2. What are the entry and exit points for each major user flow?
3. How should users navigate between different sections of the application?
4. What are the most critical user interactions that need to be optimized?

### Navigation Architecture

1. What navigation patterns should be consistent across all pages?
2. How should users understand where they are in the application?
3. What are the primary and secondary navigation elements?
4. How should the application handle deep linking and direct page access?

### User Experience Goals

1. What are the primary user goals for the overall application?
2. How can we reduce cognitive load in navigation?
3. What accessibility considerations apply to the overall navigation?
4. How should the experience support both novice and expert users?

---

## File Content Specifications

### `_docs/design/ui-flows/ui-flows-overview.md`

This file serves as the high-level summary and navigation hub for the entire application.

- **Section 1: Application Overview**

  - Brief description of the application's purpose and primary user goals
  - Key user roles and their different access patterns
  - Main functional areas or sections

- **Section 2: Page & Screen Inventory**

  - Create a markdown table with three columns: `Page/Screen Name`, `Route`, and `Description`
  - Each row represents one page
  - The `Page/Screen Name` column must contain a relative markdown link to the page folder's overview file (e.g., `[Login](./Login/Login-overview.md)`)

- **Section 3: Navigation Architecture**

  - Primary navigation structure and patterns
  - Secondary navigation elements
  - Breadcrumb and location indicators
  - Search and filtering capabilities

- **Section 4: Screen Flow Diagram**

  - Create a `mermaid` graph (`graph TD`) that illustrates the primary navigation paths between the application's screens
  - Use descriptive labels on the connectors to indicate the action that causes the transition (e.g., `-->|"Successful Login"|`)
  - Include different user roles and their access patterns

- **Section 5: User Journey Mapping**

  - Identify and document the primary user journeys through the application
  - Map out the emotional and functional touchpoints for each journey
  - Include success criteria and pain points

- **Section 6: Design System Integration**
  - How the established UI design system applies to navigation
  - Consistent patterns and components used across pages
  - Responsive behavior and mobile considerations

---

## Success Criteria

- All pages are identified and documented with clear purposes
- User journeys are mapped with clear entry/exit points
- Navigation patterns are consistent and intuitive
- The overview serves as a reliable reference for individual page design
- The structure supports both current needs and future expansion
