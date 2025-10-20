---
description: 'Use when authoring or modifying SolidJS components (.tsx): signals, control flow, data fetching, cleanup, and error boundaries. Applies to component/page implementation and refactors.'
applyTo:
  - 'src/**/components/**/*.tsx'
  - 'src/**/pages/**/*.tsx'
alwaysApply: false
---

Supplements `common/ui/common-component-guidelines.md`; review that first.

# State and Signals

- Use `createSignal` for fine-grained reactive state.
- Use `createMemo` for deriving computed values from signals.
- Use `createEffect` to run side effects in response to signal changes.
- Use `batch()` to group multiple signal updates into a single, synchronous update.

# Control Flow

- Use the built-in `<Show>` and `<Switch>` components for conditional rendering.
- Use the built-in `<For>` component for efficiently rendering lists.

# Error Handling

- Use `<ErrorBoundary>` to catch and handle errors within a component subtree.

# Required Patterns

- **Cleanup**: Use `onCleanup` for any necessary cleanup logic when a component or effect is disposed.

# Anti-Patterns to Avoid

- **Nested Signal Updates**: Avoid nested signal updates within effects that could lead to infinite loops.

# Performance Requirements

- **Data Fetching**: Use `createResource` for declarative, asynchronous data fetching that integrates with Suspense.

# Form Validation

- Input validation is done by the store/service layer
- Errors come from service operations
- Errors are displayed by the Alert component within the foundation
