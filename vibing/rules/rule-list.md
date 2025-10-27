# Rules List

This document provides a comprehensive list of all available rules organized by type to help LLMs understand which rule files to read for specific tasks.

## Foundation Rules

**Core engineering principles and fundamental guidelines**

- @vibing/rules/common/foundation/general-rules.md - General coding standards including remove failed attempts, generate minimum code, avoid unnecessary updates, respect existing patterns, focus on task, no git commands, minimize comments, avoid inventing changes, clear variable names, prioritize security, readable code, accuracy first, and explain as needed. Use for all coding tasks to maintain code quality and consistency

- @vibing/rules/common/foundation/typescript-guidelines.md - TypeScript-specific coding standards including strict checking, prefer types over interfaces, explicit typing, favor composition, utilize type inference, export shared types, document complex types, and keep types within modules. Use for all TypeScript development to ensure type safety and consistency

- @vibing/rules/common/foundation/error-handling-guidelines.md - Comprehensive error handling patterns with consistent machine-readable categories (UNAUTHENTICATED, FORBIDDEN, BAD_USER_INPUT, NOT_FOUND, CONFLICT, RATE_LIMITED, INTERNAL_SERVER_ERROR), user-safe messages, normalized error shapes, and proper logging. Use for all error handling implementation across client, service, and API layers

## Technology-Specific Rules

### Apollo GraphQL

**GraphQL client and server implementation rules**

- @vibing/rules/apollo/apollo-client-guidelines.md - Apollo Client setup with keyFields for all entities, helpers for pagination (offsetLimitPagination, relayStylePagination), possibleTypes for unions/interfaces, and server response object wrappers. Use when implementing GraphQL clients for caching policies, performance optimization, and component integration patterns

- @vibing/rules/apollo/apollo-server-guidelines.md - Apollo Server implementation with flat Query/Mutation/Subscription structure, graphql-codegen setup, context management, DataLoader usage, GraphQLError handling with stable error codes, and security measures. Use when building GraphQL APIs, implementing resolvers, error handling, and server-side architecture

- @vibing/rules/apollo/apollo-store-architecture.md - Apollo cache architecture patterns, state management, and store design principles for scalable GraphQL applications

- @vibing/rules/apollo/apollo-react-state-integration.md - React-Apollo integration patterns, hooks, and service-hook patterns for seamless GraphQL and React state management

- @vibing/rules/apollo/apollo-api-change-rules.md - Guidelines for managing GraphQL API changes, versioning strategies, and breaking change handling in GraphQL schemas

### React

**React-specific component and state management rules**

- @vibing/rules/react/react-component-guidelines.md - React component structure, patterns, and best practices including component organization, prop typing, and framework-specific implementation patterns

- @vibing/rules/react/react-state-management.md - React state management patterns, anti-patterns, and strategies for managing component and application state effectively

- @vibing/rules/react/react-state-with-swr.md - SWR integration patterns for data fetching, caching, and state synchronization in React applications

- @vibing/rules/react/react-testing-guidelines.md - React testing strategies, component testing patterns, and testing best practices for React applications

### Solid.js

**Solid.js-specific component and state management rules**

- @vibing/rules/solid.js/solidjs-component-guidelines.md - Solid.js component patterns, reactive principles, and component architecture for building reactive user interfaces

- @vibing/rules/solid.js/solid-state-management.md - Solid.js state management, reactivity patterns, and state handling strategies for Solid applications

- @vibing/rules/solid.js/solid-testing-guidelines.md - Solid.js testing strategies, component testing approaches, and testing patterns for Solid applications

### Astro.js

**Astro.js-specific project structure and component rules**

- @vibing/rules/astro.js/astro-component-guidelines.md - Astro component patterns, island architecture, and component development for static site generation and server-side rendering

- @vibing/rules/astro.js/astro-project-structure.md - Astro project organization, file structure, and architectural patterns for scalable Astro applications

## UI/UX Rules

**User interface and experience guidelines**

- @vibing/rules/common/ui/ui-component-guidelines.md - General component guidelines including foundation component usage, accessibility, semantic HTML, file structure (PascalCase/index.tsx/styles.module.css), component definition with typed props, form validation delegation to services, and performance requirements like lazy loading and cleanup

- @vibing/rules/common/ui/ui-foundational-component-principles.md - Foundation component design principles including consistency, composability, single-purpose components, and building block patterns for UI development

- @vibing/rules/common/ui/ui-project-structure.md - UI project organization, file structure patterns, and architectural guidelines for scalable interface development

- @vibing/rules/common/ui/ui-styling-guidelines.md - CSS and styling standards including methodology, naming conventions, responsive design, and styling best practices

- @vibing/rules/common/ui/ui-theme.md - Theme system, design token guidelines, color palettes, typography scales, and theming architecture for consistent visual design

- @vibing/rules/common/ui/ui-form-management.md - Form handling and validation patterns including form state management, validation strategies, and user input handling approaches

- @vibing/rules/common/ui/ui-data-store-architecture.md - UI data store patterns, state management approaches, and data flow architecture for user interface components

- @vibing/rules/common/ui/ui-accessibility-guidelines.md - Comprehensive accessibility standards including WCAG 2.1 AA compliance, color contrast requirements (4.5:1 for normal text, 3:1 for large text), keyboard navigation support, screen reader compatibility, semantic HTML usage, ARIA attributes, focus management, and testing requirements

## Backend Rules

**Backend architecture and integration patterns**

- @vibing/rules/common/backend/firebase-integration.md - Firebase integration patterns, best practices, security rules, and implementation guidelines for Firebase backend services

## Data Rules

**Data architecture and management patterns**

- @vibing/rules/common/data/data-attribute-naming-conventions.md - Data attribute naming standards, conventions, and consistency patterns for database schemas and data models

- @vibing/rules/common/data/data-object-store-persistent.md - Object store persistence patterns, NoSQL database design, and document storage strategies

- @vibing/rules/common/data/data-relational-persistent.md - Relational database persistence patterns, schema design, normalization strategies, and SQL optimization approaches

## Testing Rules

**Comprehensive testing guidelines**

- @vibing/rules/common/testing/test-general.md - General testing philosophy preferring E2E > Integration > Unit tests, avoiding mocks, using real implementations, TestContext for data management, Given-When-Then patterns, and comprehensive testing strategies for all application layers

- @vibing/rules/common/testing/test-context.md - TestContext patterns for data management requiring TestContext object existence, centralized test environment setup, universal setup patterns, Playwright fixtures, user management, shorthand ID systems (U1, O1, G1), centralized initial data setup, and additive data patterns

- @vibing/rules/common/testing/test-e2e.md - End-to-end testing strategies, patterns, and implementation guidelines for comprehensive user workflow testing

- @vibing/rules/common/testing/test-e2e-page-object.md - Page Object Model patterns, design principles, and implementation strategies for maintainable E2E test automation

- @vibing/rules/common/testing/test-e2e-tags.md - E2E test tagging, organization, categorization, and management strategies for scalable test suites

- @vibing/rules/common/testing/test-gherkin-definition.md - Gherkin syntax, BDD test definitions, scenario structure, and behavior-driven development patterns

- @vibing/rules/common/testing/test-setup-examples.md - Test setup patterns, examples, and implementation templates for various testing scenarios
