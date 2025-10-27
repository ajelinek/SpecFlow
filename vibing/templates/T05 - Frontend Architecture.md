# 05 - Frontend Architecture Template

**Purpose**: This document outlines the specific architecture for the frontend application, including component structure, state management strategy, UI framework conventions, key libraries, and development patterns. It focuses on the **how** the frontend is structured and organized to deliver optimal user experience.

## 1. Core Frameworks & Libraries

[Define the primary technologies that form the foundation of the frontend application.]

**Format**:

- **Framework**: [e.g., React.js with Next.js, Vue.js with Nuxt.js, SolidJS, Astro]
- **Language**: [e.g., TypeScript, JavaScript]
- **UI Component Library**: [e.g., Shadcn/ui, Material-UI, Headless UI, None]
- **State Management**: [e.g., Zustand, Redux Toolkit, Jotai, SolidJS stores]
- **Server State & Caching**: [e.g., React Query, SWR, Apollo Client, SolidJS resources]
- **Styling**: [e.g., Tailwind CSS, CSS Modules, Styled-components, UnoCSS]
- **Form Handling**: [e.g., React Hook Form, Formik, SolidJS form libraries]
- **Testing**: [e.g., Jest, Vitest, React Testing Library, SolidJS Testing Library, Playwright for E2E]

**Example**:

- **Framework**: React.js with Next.js 14 (App Router)
- **Language**: TypeScript 5.0+
- **UI Component Library**: Shadcn/ui with Radix UI primitives
- **State Management**: Zustand for global state, React Query for server state
- **Server State & Caching**: React Query (TanStack Query) with optimistic updates
- **Styling**: Tailwind CSS with CSS Modules for complex components
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Vitest for unit tests, React Testing Library for component tests, Playwright for E2E

## 2. Directory Structure

[Provide a high-level overview of the frontend's directory structure to ensure consistency.]

**Example**:

```
/src
├── /components/         # Reusable UI Components
│   ├── /common/         # Composition of foundation components
│   ├── /foundation/     # Base UI building blocks (Button, Input, etc.)
│   │   └── /Button/
│   │       ├── index.tsx
│   │       ├── Button.test.tsx
│   │       └── styles.module.css
│   ├── /layout/         # Layout components (Header, Sidebar, etc.)
│   └── /features/       # Feature-specific components
├── /pages/              # Page components, organized by route
│   └── /Dashboard/
│       └── index.tsx
├── /routes/             # Application routing configuration
├── /store/              # State management (Service-Repository pattern)
│   ├── /repository/     # Handles direct external interactions (API calls)
│   └── /service/        # Manages business logic and exposes state via hooks
├── /hooks/              # Generic, reusable hooks
├── /styles/             # Global styles, tokens, and themes
└── /types/              # Shared TypeScript types and interfaces
```

## 3. Component Architecture

[Define the methodology for structuring and building components.]

**Format**:

- **Foundation Components**: [Smallest, indivisible UI elements with no business logic]
- **Common Components**: [Compositions of foundation components for reusability]
- **Feature Components**: [Feature-specific components that handle business logic]
- **Page Components**: [Top-level components that compose features into pages]

**Example**:

- **Foundation Components**: The smallest, indivisible UI elements (e.g., `Button`, `Input`, `Label`). They have no application logic and are found in `/components/foundation`.
- **Common Components**: Compositions of foundation components that form more complex, reusable components (e.g., `SearchForm`, `Header`). They may have internal state but are generally unaware of business logic. Found in `/components/common`.
- **Feature Components**: Components specific to a particular feature or business domain. They handle data fetching, feature-specific state, and compose common components. Found in `/components/features`.
- **Page Components**: Top-level components that compose features into complete pages. They handle routing, layout, and high-level state coordination. Found in `/pages`.

## 4. State Management Strategy

[Explain how different types of state are managed across the application.]

**Format**:

- **Local/Component State**: [How component-level state is managed]
- **Shared/Global State**: [When and how to use global state stores]
- **Server/Remote State**: [How server cache and data fetching is handled]

**Example**:

- **Local/Component State**: Use React's `useState` for state confined to a single component (e.g., form inputs, modal visibility, UI toggles).
- **Shared/Global State**: Use `Zustand` for minimal, cross-component UI state that doesn't come from the server (e.g., UI theme, mobile nav visibility, user preferences). Stores are defined in `/store` but accessed via service hooks.
- **Server/Remote State**: Managed via a layered architecture in the `/store`:
  - The **Repository Layer** (`/store/repository`) makes actual API calls and handles HTTP concerns
  - The **Service Layer** (`/store/service`) uses the repository and manages server state using `React Query`
  - Components consume this state exclusively through **custom hooks** exposed by the Service Layer (e.g., `useProjects()`), ensuring clean separation of concerns

## 4. Styling & User Experience

[Describe styling conventions, performance optimization, accessibility, and user experience standards.]

**Format**:

- **Design System**: [Design tokens, styling method, component styling, theming approach]
- **Performance & Optimization**: [Code splitting, lazy loading, caching strategy, bundle optimization]
- **Accessibility & UX**: [WCAG compliance, UX patterns, responsive design, error handling]

**Example**:

- **Design System**: Three-layer design token system (global → semantic → component), Tailwind CSS for utility classes, CSS Modules for complex components, theme switching via CSS variables
- **Performance & Optimization**: Route-based code splitting with Next.js dynamic imports, lazy load non-critical components, React Query for server state caching, tree shaking and bundle analysis
- **Accessibility & UX**: WCAG 2.1 AA compliance with semantic HTML and ARIA labels, consistent loading states and error handling, mobile-first responsive design with Tailwind CSS

## 5. Testing Strategy

[Outline the approach for ensuring code quality and application stability.]

**Format**:

- **Unit/Integration Tests**: [Testing approach for components and business logic]
- **End-to-End Tests**: [Testing approach for user workflows]
- **Test Organization**: [How tests are structured and organized]
- **Test Data Management**: [How test data is generated and managed]

**Example**:

- **Unit/Integration Tests**: Use `Vitest` and `React Testing Library`. Tests are co-located with code in `__tests__` directories. Focus on testing business logic in services and component behavior in isolation
- **End-to-End Tests**: Use `Playwright` to test critical user flows from the user's perspective, running against real browsers
- **Test Organization**: Tests co-located with components, standardized setup patterns, page objects for E2E tests
- **Test Data Management**: Use TestContext system for consistent, realistic test data generation across all test types
