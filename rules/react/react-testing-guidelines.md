---
description: 'Use when writing tests for React components, hooks, and pages: RTL usage, structure, mocking, and performance. Applies to .test.tsx and .test.ts colocated with React code.'
ruleType: testing
applyTo:
  - 'src/**/*.{test,spec}.tsx'
  - 'src/**/*.{test,spec}.ts'
alwaysApply: false
---

# React Testing Library Guidelines

- Prefer e2e tests using playwright over unit level component tests.
- Avoid component tests whenever possible.
- Test reusable hooks and state components when appropriate
- Test behavior, not implementation details
- Query elements as a user would (using screen.getByRole, etc.)
- Avoid querying by test IDs when possible
- Prefer user-event over fireEvent for interactions
- Test user flows, not component internals
- Mock external dependencies but not React itself
- Wrap tests in appropriate context providers
- Avoid nesting tests within `describe` blocks.
- Use setup functions to prepare component renders for each test, rather than using `beforeEach` hooks.

## React Component Test Structure

- Use a flat test structure. Do not use `describe` blocks.
- Render the component inside each test to ensure tests are isolated.
- React Testing Library automatically unmounts components after each test, so manual cleanup is not usually necessary.

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

it('renders correctly', () => {
  render(<MyComponent />)
  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
})

it('handles user interaction', async () => {
  render(<MyComponent />)
  const button = screen.getByRole('button', { name: /submit/i })
  await userEvent.click(button)
  expect(screen.getByText(/success/i)).toBeInTheDocument()
})
```

# Testing Hooks

- Use renderHook from @testing-library/react-hooks
- Test hook behavior, not implementation
- Include hook lifecycle tests (mount, update, unmount)
- Provide necessary context providers in wrapper

```tsx
import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from './useCounter'

it('increments counter', () => {
  const { result } = renderHook(() => useCounter())
  act(() => {
    result.current.increment()
  })
  expect(result.current.count).toBe(1)
})
```

# Mocking

- Use MSW for API mocking

# React Test Performance

- Minimize full component renders
- Use helper functions for test setup
- Cleanup is handled automatically by React Testing Library.
