---
description: Testing guidelines for Astro with SolidJS applications
ruleType: testing
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when writing tests for Astro pages and SolidJS components.

# Testing Strategy

## Astro Components
- Test static content with snapshot tests
- Verify component exports and props
- Test client-side interactivity with Playwright

## SolidJS Components
- Use `@solidjs/testing-library` for unit tests
- Test component rendering and interactions
- Mock external dependencies and APIs
- Test reactivity and effects

## E2E Testing
- Use Playwright for end-to-end tests
- Test critical user flows
- Include accessibility testing
- Test responsive behavior

## Test Structure
```ts
// SolidJS Component Test
import { render, screen } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(() => <Component />);
    // assertions
  });

  it('handles interactions', async () => {
    const user = userEvent.setup();
    render(() => <Component />);
    // interact and assert
  });
});
```

## Best Practices
- Test components in isolation
- Mock browser APIs and external services
- Test error boundaries
- Include accessibility tests
- Keep tests maintainable and focused
