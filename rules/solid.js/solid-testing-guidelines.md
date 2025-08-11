---
description: 'SolidJS-specific testing guidelines using Vitest and Solid Testing Library.'
ruleType: testing
globs:
alwaysApply: false
---

# Solid Testing Library Guidelines

- Prefer e2e tests using Playwright over unit-level component tests.
- Avoid component tests whenever possible.
- Test reusable primitives and stores when appropriate.
- Test behavior, not implementation details.
- Query elements as a user would (using `screen.getByRole`, etc.).
- Avoid querying by test IDs when possible.
- Prefer `user-event` over `fireEvent` for simulating user interactions.
- Test user flows, not component internals.
- Mock external dependencies (like APIs), but not SolidJS itself.
- Wrap tests in appropriate Context Providers if needed.
- Avoid nesting tests within `describe` blocks to keep test structure flat and readable.
- Use setup functions to prepare component renders for each test, rather than using `beforeEach` hooks.

## Solid Component Test Structure

Tests should be co-located with the component under test in a `*.test.tsx` file. Use Vitest as the test runner and Solid Testing Library for rendering.

- Use a flat test structure without `describe` blocks.
- Render the component inside each test to ensure tests run in isolation.
- Solid Testing Library automatically handles cleanup, so manual cleanup calls are not typically needed.

```tsx
// MyComponent.test.tsx
import { render, screen } from '@testing-library/solid'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

it('renders correctly', () => {
  // The render function takes a function that returns the component
  render(() => <MyComponent />)
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
})

it('handles user interaction', async () => {
  render(() => <MyComponent />)
  const button = screen.getByRole('button', { name: /submit/i })
  await userEvent.click(button)
  expect(screen.getByText(/success/i)).toBeInTheDocument()
})
```

# Testing Primitives (Hooks)

- Use `renderHook` from `@testing-library/solid`.
- Test the primitive's behavior, not its implementation.
- Include tests for the entire lifecycle (creation, updates, and cleanup).
- Provide necessary context providers via the `wrapper` option if the primitive depends on them.

```tsx
// useCounter.test.ts
import { renderHook, act } from '@testing-library/solid'
import { createCounter } from './createCounter'

it('increments the counter', () => {
  const { result } = renderHook(() => createCounter())

  // Act is used to wrap state updates
  act(() => {
    result.increment()
  })

  // Access signal values by calling them as functions
  expect(result.count()).toBe(1)
})
```

# Mocking

- Use Mock Service Worker (MSW) for mocking API requests to ensure realistic network behavior in tests.

# Solid Test Performance

- Minimize the size and complexity of the component tree rendered in each test.
- Use helper functions for test setup to avoid repetition.
- Cleanup is handled automatically by Solid Testing Library.
