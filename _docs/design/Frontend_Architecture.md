# Frontend Architecture

**Purpose**: This document outlines the specific architecture for the frontend application, including component structure, state management strategy, UI framework conventions, key libraries, and development patterns.

## 1. Core Frameworks & Libraries

List the primary technologies that form the foundation of the frontend.

**Format**:

- **Framework**: [e.g., React.js with Next.js, Vue.js with Nuxt.js]
- **Language**: [e.g., TypeScript]
- **UI Component Library**: [e.g., Shadcn/ui, Material-UI, None]
- **State Management**: [e.g., Zustand, Redux Toolkit, Jotai]
- **Server State & Caching**: [e.g., React Query, SWR]
- **Styling**: [e.g., Tailwind CSS, CSS Modules, Styled-components]
- **Form Handling**: [e.g., React Hook Form, Formik]
- **Testing**: [e.g., Jest, React Testing Library, Playwright for E2E]

## 2. Directory Structure

Provide a high-level overview of the frontend's directory structure to ensure consistency.

**Example (Based on `react-project-structure.md`):**

```
/src
├── /components/         # Reusable UI Components
│   ├── /common/         # Composition of foundation ui components/building blocks
│   ├── /foundation/     # Base UI building blocks (Button, Input, etc.)
│   │   └── /Button/
│   │       ├── index.tsx
│   │       ├── Button.test.tsx
│   │       └── styles.module.css
│   ├── /layout/         # Layout components (Header, Sidebar, etc.)
│   └── /features/       # Feature-specific components (Auth, Dashboard, etc.)
├── /pages/              # Page components, organized by route
│   └── /Dashboard/
│       └── index.tsx
├── /routes/             # Application routing configuration
├── /store/              # State management (Service-Repository pattern)
│   ├── /repository/     # Handles direct external interactions (e.g., API calls)
│   └── /service/        # Manages business logic and exposes state via hooks
├── /hooks/              # Generic, reusable hooks
├── /styles/             # Global styles, tokens, and themes
└── /types/              # Shared TypeScript types and interfaces
```

## 3. Component Architecture

Define the methodology for structuring and building components.

**Example**:

- **UI (Atoms)**: The smallest, indivisible UI elements (e.g., `Button`, `Input`, `Label`). They have no application logic. Found in `/components/foundation`.
- **Common (Molecules/Organisms)**: Compositions of atoms and other molecules that form more complex, reusable components (e.g., `SearchForm`, `Header`). They may have some internal state but are generally unaware of the application's business logic. Found in `/components/common`.
- **Features (Templates/Pages)**: Components that are specific to a particular feature or page. They are responsible for fetching data, managing feature-specific state, and composing organisms into a cohesive UI. Found in `/components/features`.

## 4. State Management Strategy

Explain how different types of state are managed across the application.

**Format**:

- **Local/Component State**: [How component-level state is managed]
- **Shared/Global State**: [When and how to use global state stores]
- **Server/Remote State**: [How server cache and data fetching is handled]

**Example**:

- **Local/Component State**: Use React's `useState` for state confined to a single component (e.g., form inputs, modal visibility).
- **Shared/Global State**: Use `Zustand` for minimal, cross-component UI state that does not come from the server (e.g., UI theme, mobile nav visibility). Stores are defined in `/store` but accessed via service hooks.
- **Server/Remote State**: Managed via a layered architecture in the `/store`.
  - The **Repository Layer** (`/store/repository`) makes the actual API calls.
  - The **Service Layer** (`/store/service`) uses the repository and manages the server state using `React Query`.
  - Components consume this state and logic exclusively through **custom hooks** exposed by the Service Layer (e.g., `useProjects()`), ensuring a clean separation of concerns.

## 5. Styling Approach

Describe the conventions for applying styles to components.

**Example**:

- **Token-Based**: All styling is derived from a three-layer design token system defined in `/styles/tokens`.
  1.  **Global Tokens**: Base values (e.g., `--color-blue-500`).
  2.  **Semantic Tokens**: Contextual variables (e.g., `--color-background-brand` which maps to a global token).
  3.  **Component Tokens**: Scoped to individual components (e.g., `--button-background-color: var(--color-background-brand)`).
- **Utility-First**: Primarily use `Tailwind CSS` for applying styles directly in JSX.
- **Component-Specific Styles**: For complex styles, use `CSS Modules`. Import with `import s from './[ComponentName].module.css';` and use the `s.className` convention. These modules should leverage the established token system.
- **Theming**: Theme switching (e.g., light/dark mode) is handled by loading a different theme file from `/styles/themes` which redefines the values of the global CSS variables.

## 6. Testing Strategy

Outline the approach for ensuring code quality and application stability.

**Example**:

- **Unit/Integration Tests**: Use `Vitest` and `React Testing Library`. Tests are co-located with the code they test in a `__tests__` directory. They focus on testing business logic in services and component behavior in isolation.
- **End-to-End (E2E) Tests**: Use `Playwright` to test critical user flows from the user's perspective, running against a real browser.

---

## Guiding Questions

Before finalizing the architecture, ensure these questions are addressed:

### Framework & Libraries

1.  Why was this specific framework (e.g., Next.js) chosen over alternatives? What pain points does it solve for this project?
2.  How do we maintain consistency with our design system (e.g., spacing, colors, typography) within Tailwind?

### Component & State Architecture

3.  How do we decide when to create a new component versus modifying an existing one? What is our standard for component prop design?
4.  What is the clear boundary between server state (React Query) and global UI state (Zustand)? Provide an example of something that should _not_ go into the global store.
5.  What is our convention for organizing React Query keys? How do we handle data mutations and cache invalidation?
6.  What is our strategy for handling complex forms with validation?

### Development Workflow & Quality

7.  How is the user's authentication state managed on the frontend? How are authenticated routes and redirects handled?
8.  How are unexpected errors (e.g., API failures) communicated to the user? Is there a global error boundary?
9.  What is our strategy for code splitting, lazy loading, and optimizing image delivery?
10. What is our process for ensuring new components are accessible (e.g., keyboard navigable, screen reader friendly)?
