# 05 - Frontend Architecture Template

**Purpose**: This document outlines the specific architecture for the frontend application, including component structure, state management strategy, UI framework conventions, key libraries, and development patterns. It focuses on the **how** the frontend is structured and organized to deliver optimal user experience.

## 1. Core Frameworks & Libraries

**Default Technology Stack** (based on @vibing/rules):

- **Framework**: [To be determined based on project requirements]
- **Language**: TypeScript 5.0+ (enforced by @vibing/rules/common/foundation/typescript-guidelines.md)
- **UI Component Library**: Foundation components (per @vibing/rules/common/ui/ui-foundational-component-principles.md)
- **State Management**: Service-Repository pattern (per @vibing/rules/common/ui/ui-data-store-architecture.md)
- **Server State & Caching**: [Framework-specific: Apollo Client for GraphQL, SWR for REST APIs, SolidJS resources]
- **Styling**: CSS Modules with design token system (per @vibing/rules/common/ui/ui-styling-guidelines.md)
- **Form Handling**: Service-layer validation (per @vibing/rules/common/ui/ui-form-management.md)
- **Testing**: E2E > Integration > Unit (per @vibing/rules/common/testing/test-general.md)

**Project-Specific Customizations**:

[Specify any deviations from the default stack based on project requirements]

## 2. Directory Structure

**Standard Structure** (per @vibing/rules/common/ui/ui-project-structure.md):

```
/src
├── /components/         # Reusable UI Components
│   ├── /foundation/     # Base UI building blocks (per @vibing/rules/common/ui/ui-foundational-component-principles.md)
│   │   └── /Button/
│   │       ├── index.tsx
│   │       └── styles.module.css
│   ├── /layout/         # Layout components (Header, Sidebar, etc.)
│   └── /features/       # Feature-specific components
├── /pages/              # Page components, organized by route
├── /store/              # State management (Service-Repository pattern per @vibing/rules/common/ui/ui-data-store-architecture.md)
│   ├── /repository/     # External system interactions (API calls)
│   ├── /service/        # Business logic & state management
│   └── /config.ts       # System configuration
├── /styles/             # Global styles, tokens, and themes (per @vibing/rules/common/ui/ui-styling-guidelines.md)
│   ├── /tokens/         # Design token system
│   ├── /animations/     # Reusable animations
│   └── /themes/         # Theme definitions
└── /types/              # Shared TypeScript types (per @vibing/rules/common/foundation/typescript-guidelines.md)
```

**Framework-Specific Additions**:

[Add framework-specific directories as needed (e.g., /hooks for React, /routes for routing)]

## 3. Component Architecture

**Standard Component Hierarchy** (per @vibing/rules):

- **Foundation Components**: Smallest, indivisible UI elements with no business logic (per @vibing/rules/common/ui/ui-foundational-component-principles.md)

  - Located in `/components/foundation/`
  - Examples: `Button`, `Input`, `Alert`, `Icon`
  - Structure: `PascalCase/index.tsx` + `styles.module.css`

- **Layout Components**: Structural components for page layout

  - Located in `/components/layout/`
  - Examples: `Header`, `Sidebar`, `Footer`, `Navigation`
  - May have internal state but no business logic

- **Feature Components**: Business domain-specific components

  - Located in `/components/features/`
  - Handle data fetching via service layer
  - Compose foundation and layout components
  - Access state through service hooks only

- **Page Components**: Top-level route components
  - Located in `/pages/`
  - Compose features into complete pages
  - Handle routing and high-level state coordination

**Component Rules** (enforced by @vibing/rules):

- Single responsibility principle
- Service-layer data access only
- CSS Modules for styling
- TypeScript for all props and events
- Accessibility compliance (WCAG 2.1 AA)

## 4. State Management Strategy

**Service-Repository Pattern** (per @vibing/rules/common/ui/ui-data-store-architecture.md):

- **Local/Component State**: Framework-specific hooks for component-level state

  - React: `useState` for ephemeral state (per @vibing/rules/react/react-state-management.md)
  - SolidJS: `createSignal` for reactive state (per @vibing/rules/solid.js/solid-state-management.md)
  - URL state for shareable user interactions
  - localStorage for persistent user preferences

- **Global State**: Service-Repository architecture

  - **Repository Layer** (`/store/repository/`): Direct external system interactions (API calls, database)
  - **Service Layer** (`/store/service/`): Business logic and state management via custom hooks
  - Components access state through service hooks only (never direct repository access)

- **Server/Remote State**: Framework-specific data fetching
  - **GraphQL**: Apollo Client with service hooks (per @vibing/rules/apollo/apollo-react-state-integration.md)
  - **REST APIs**: SWR with service pattern (per @vibing/rules/react/react-state-with-swr.md)
  - **SolidJS**: `createResource` for async data (per @vibing/rules/solid.js/solid-state-management.md)

**State Rules** (enforced by @vibing/rules):

- No direct repository access from components
- Service hooks return consistent patterns: `{ data, error, isLoading, refetch }`
- Error handling via standardized categories
- Immutable state updates only

## 5. Optional Project-Specific Sections

**Include only if applicable to your project:**

### 5.1 Real-Time Features (if needed)

[Define WebSocket, Server-Sent Events, or polling implementation]

### 5.2 Internationalization (if needed)

[Define i18n library, translation management, and locale handling]

### 5.3 SEO Requirements (if applicable)

[Define meta tags, structured data, server-side rendering needs]

### 5.4 Mobile/PWA Considerations (if applicable)

[Define mobile-specific patterns, PWA features, offline capabilities]

### 5.5 Security Considerations (if specific needs)

[Define authentication patterns, data protection, security headers]

### 5.6 Integration Patterns (if specific needs)

[Define payment systems, analytics, third-party services]

**Remove any sections above that don't apply to the project.**
