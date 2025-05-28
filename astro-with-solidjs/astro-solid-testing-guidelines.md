---
description: Guidelines for testing Astro components, Solid.js components, and integration between them
ruleType: testing
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when writing tests for Astro components, Solid.js components, or their integration.

# Astro Component Testing
- Test Astro components using component testing libraries
- Test static HTML output for Astro components
- Mock Solid.js islands when testing Astro components
- Verify correct props are passed to islands

# Solid.js Component Testing
- Use Solid Testing Library for component tests
- Test behavior, not implementation details
- Mock signals and stores when needed
- Test component lifecycle (creation, updates, disposal)

```tsx
import { render, screen, fireEvent } from 'solid-testing-library'
import { Counter } from './Counter'

describe('Counter', () => {
  it('increments count when button is clicked', async () => {
    const { getByRole } = render(() => <Counter />)
    const button = getByRole('button')
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
    await fireEvent.click(button)
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })
})
```

# Astro + Solid Integration Testing
- Test Astro pages with Solid islands using end-to-end testing
- Use Playwright for E2E tests covering the full stack
- Test island hydration and client-side interactivity
- Verify SSR output and client hydration

# Store and Service Testing
- Test store services in isolation
- Mock repository dependencies
- Test store service lifecycle and reactivity
- Verify correct data transformations and state updates

# Testing Solid Signals and Effects
- Test signal creation and updates
- Verify createEffect and onCleanup behavior
- Test computed values with createMemo
- Ensure proper cleanup in onCleanup

# Component Testing Best Practices
- Focus on user-visible behavior
- Test accessibility features
- Test component props and slot behavior
- Verify error states and loading indicators
- Test responsive behavior where relevant

# Test Organization
```
tests/
├── unit/
│   ├── components/
│   │   ├── astro/
│   │   └── solid/
│   └── store/
├── integration/
│   └── pages/
└── e2e/
    └── specs/
```
