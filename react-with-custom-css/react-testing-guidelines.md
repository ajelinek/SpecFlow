---
description: React-specific testing guidelines and best practices
ruleType: testing
globs:
alwaysApply: false
---

## When to Use

Apply these guidelines when writing tests for React components and hooks.

# React Testing Library Guidelines

- Test behavior, not implementation details
- Query elements as a user would (using screen.getByRole, etc.)
- Avoid querying by test IDs when possible
- Prefer user-event over fireEvent for interactions
- Test user flows, not component internals
- Mock external dependencies but not React itself
- Wrap tests in appropriate context providers

## React Component Test Structure

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

# Testing with Context

- Create test providers for context
- Use wrapper option to provide context
- Create test utilities for common provider needs

# Mocking

- Mock API calls and services
- Mock browser APIs when needed
- Use jest.mock for external dependencies
- Consider using MSW for API mocking

# React Test Performance

- Minimize full component renders
- Use beforeEach for test setup
- Clean up after tests
- Mock heavy dependencies
