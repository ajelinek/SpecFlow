---
description: "SolidJS-specific rules for components, including signals, control flow, and data fetching within an Astro project."
globs: *
alwaysApply: false
---

These guidelines supplement the `common-component-guidelines.md`. Please review the common guidelines first.

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
