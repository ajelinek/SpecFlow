# Index of LLM-Optimized Documentation

This directory contains a sample set of LLM-optimized documentation. The goal of this documentation is to be concise, structured, and semantically rich, minimizing narrative prose and maximizing actionable data for LLM-driven development.

## Documents

*   [**`00_Project_Overview.md`**](./00_Project_Overview.md)
    *   **Purpose:** Provides the LLM with the absolute foundational context – the "why" and "what" at a high level. This is the first file any LLM interaction should reference.
    *   **Sections:** Application purpose, target users, technology stack, non-functional requirements, architectural style, feature list, technical decisions, development workflow, and success metrics.

*   [**`10_Data_Model.md`**](./10_Data_Model.md)
    *   **Purpose:** Defines the persistent data structures, critical for database schema, ORM models, and backend data handling.
    *   **Sections:** Conceptual entity relationships, detailed schema definitions, and enumerations/lookup values.

*   [**`20_System_Architecture.md`**](./20_System_Architecture.md)
    *   **Purpose:** Provides a deeper dive into the system's internal organization, component responsibilities, and key interactions.
    *   **Sections:** High-level system context, application containers, key architectural decisions, and folder structure conventions.

*   [**`30_Back_Office_Specification.md`**](./30_Back_Office_Specification.md)
    *   **Purpose:** Defines the backend services, APIs, and business logic specifications.
    *   **Sections:** API design, data processing, integration points, security, monitoring, and testing strategy.

*   [**`40_Frontend_Specification.md`**](./40_Frontend_Specification.md)
    *   **Purpose:** Defines the frontend architecture, UI/UX guidelines, and implementation details.
    *   **Sections:** Application structure, UI/UX guidelines, data handling, performance, testing, accessibility, internationalization, and developer experience.

*   [**`50_Features/`**](./50_Features/)
    *   **Purpose:** Contains individual feature specifications with detailed implementation details.
    *   **Example Files:**
        *   [01_User_Authentication.md](./50_Features/01_User_Authentication.md): User authentication and account management
        *   [02_Client_Management.md](./50_Features/02_Client_Management.md): Client CRUD operations and management
        *   [03_Deal_Tracking.md](./50_Features/03_Deal_Tracking.md): Sales pipeline and deal management

## How to Use This Documentation

1. Start with `00_Project_Overview.md` to understand the project at a high level.
2. Review `10_Data_Model.md` to understand the data structures.
3. Check `20_System_Architecture.md` for system design decisions.
4. Refer to `30_Back_Office_Specification.md` and `40_Frontend_Specification.md` for implementation details.
5. Look in `50_Features/` for specific feature implementations.

## Document Conventions

- **Code Blocks:** Used for all code examples, API specifications, and configuration.
- **Mermaid Diagrams:** Used for visualizing system architecture and data flows.
- **Gherkin Syntax:** Used for defining feature behaviors and test cases.
- **TypeScript Interfaces:** Used for defining data models and API contracts.
