# High-Level Agent Design Construct v2

At a high level, we will have multiple agents who specialize in different phases of the projects. The agents will be built from a CLAUDE perspective; however, they should also work as workflows within tools like Cursor, allowing the agent "orchestration" to be done manually via the command line versus a more automated approach. This is just an assumption that Cursor would not be able to manage things.

## Folder Structure

To keep things organized, we will use the following overall structure to manage our context and agents. This assumes a mono-repo style.

- `_docs`
  - `design`
    - `Project_Overview.md` - Has the general overview of the project and what it is going to accomplish.
    - `System_Architecture.md` - Overall architecture for the system that explains how it works, technology stack, and overall project structure.
    - `Frontend_Architecture.md` - Higher level overview of the frontend architecture. It takes things down another level from the system architecture.
    - `Backend_Architecture.md` - Higher level overview of the backend architecture. It will take things down another level from the systems architecture.
    - `Data_Model.md` - This should have the conceptual data model for the application.
    - `UI Design.md` - Outlines the UI design for the overall website, this includes colors, typgraphs, patterns, etc. This will be turned into css design tokens.
  - `ui-flows` - Draw.IO and/or SVG wire diagrams. Each page will have its own folder, the folder represents the page, within the folder there will be the diagrams along with a pagename.md file which outlines the overall features of the page, the actions the user can take, along with interaction details.
  - `features`
    - `##-feature-name` - A file outlining the business purpose, the test scenarios, and the implementation details for a given feature
    - `feature-overview.md` - An overview of all the features and sub-features that make up a user experience feature.
- `apps/packages`
  - `UI`
    - `CLAUDE.md` - Additional details and rules for the frontend, outline the overall structure, patterns and details
    - `store`
      - `CLAUDE.md` - Details and rules for the store implementation, outline how the service, repository, and everything related works.
  - `API`
    - `CLAUDE.md` - Additional details and rules for the API, outlining the overall structure, patterns, and details
  - `E2E`
    - `CLAUDE.md` - Additional details related to the E2E tests patterns
    - `pages`
      - `CLAUDE.md` - Details and rules related to selectors
    - `specs`
      - `CLAUDE.md` - Additional details related to the E2E tests patterns
  - `data`
    - `CLAUDE.md` - Additional details related to the database setup, data generation, etc.
- `CLAUDE.md` - General project details and coding rules and standards for the full application.

## Agent Overview

| Agent                        | Description                                 | When to Use                                                                                             |
| ---------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Domain Expert**            | Business domain and requirements specialist | When you need business domain knowledge, requirements validation, or stakeholder alignment              |
| **Product Manager**          | Project planning and business alignment     | For project overview creation, business requirements, success metrics, and timeline management          |
| **System Architect**         | High-level system design                    | When defining system architecture, technology stack decisions, or integration patterns                  |
| **Data Architect**           | Data modeling and storage design            | For database schema design, data flow architecture, or data governance decisions                        |
| **Backend Architect**        | Backend service architecture                | When designing APIs, service patterns, server architecture, or backend security                         |
| **Frontend Architect**       | Frontend architecture and patterns          | For component architecture, UI framework decisions, or frontend performance planning                    |
| **UI Designer**              | User interface design specialist            | When defining look and feel, creating design documentation, or visual design alignment                  |
| **UX Designer**              | User experience design specialist           | For user flows, wireframes, interaction design, or accessibility compliance                             |
| **Test Analyst**             | Test strategy and scenarios                 | When creating Gherkin test scenarios, acceptance criteria, or test coverage planning                    |
| **Frontend Engineer**        | Frontend development specialist             | For React, Solid, and Astro component development, state management, and frontend ecosystem integration |
| **Backend Engineer**         | Server-side development specialist          | When implementing APIs, server logic, business rules, or backend security                               |
| **Data Engineer**            | Data and GraphQL specialist                 | For database design, GraphQL schema design, Apollo implementation, and data layer optimization          |
| **Technical Architect**      | Design validation and quality assurance     | For technical plan evaluation, feasibility assessment, or risk identification                           |
| **Test Automation Engineer** | End-to-end testing specialist               | When implementing Playwright E2E tests, user journey testing, or test automation                        |
| **Code Cleanup Specialist**  | Code quality and refactoring specialist     | For DRY principles, code refactoring, technical debt reduction, or maintainability improvement          |
| **Test Cleanup Specialist**  | Test quality and organization specialist    | When organizing test code, optimizing test coverage, or improving test maintainability                  |

## Agent Workflow Responsibilities

### Agent Workflow Mapping

| Agent                        | Owns Workflows | Consults On Workflows | Consults With                                              |
| ---------------------------- | -------------- | --------------------- | ---------------------------------------------------------- |
| **Domain Expert**            | None           | 101, 201, 202         | None (provides domain expertise to others)                 |
| **Product Manager**          | 101, 201, 202  | 203                   | Domain Expert                                              |
| **System Architect**         | 102            | 103, 104, 105         | Product Manager                                            |
| **Data Architect**           | 103            | 105, 204, 301         | System Architect, Product Manager                          |
| **Backend Architect**        | 104            | 105, 204, 301         | System Architect, Frontend Architect, Data Architect       |
| **Frontend Architect**       | 105            | 104, 106, 204, 301    | System Architect, Backend Architect                        |
| **UI Designer**              | 106            | 107                   | Frontend Architect                                         |
| **UX Designer**              | 107            | 204, 301              | UI Designer, Frontend Architect                            |
| **Test Analyst**             | 203            | 301.2                 | Product Manager                                            |
| **Frontend Engineer**        | 204, 301       | None                  | Frontend Architect, UX Designer                            |
| **Backend Engineer**         | 204, 301       | None                  | Backend Architect, Data Architect                          |
| **Technical Architect**      | 205            | None                  | Frontend/Backend/Data Architect, Frontend/Backend Engineer |
| **Test Automation Engineer** | 302            | 301                   | Test Analyst, Frontend and Backend Engineer(s)             |
| **Code Cleanup Specialist**  | 401            | None                  | Framework-Specific Engineer                                |
| **Test Cleanup Specialist**  | 402            | None                  | Test Automation Engineer                                   |
