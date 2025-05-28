---
description: React-specific testing guidelines and best practices
ruleType: testing
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when writing tests for React components and hooks.

# React Testing Library

## General Guidelines
- Use `@testing-library/react` for component testing
- Prefer `screen` queries over destructuring `render` results
- Use `userEvent` over `fireEvent` for better simulation of user interactions
- Test components in isolation
- Mock external dependencies

## Component Testing
- Test component rendering with different props
- Test user interactions (clicks, form submissions, etc.)
- Test component behavior, not implementation details
- Use `data-testid` as a last resort for querying elements

## Hooks Testing
- Use `@testing-library/react-hooks` for testing custom hooks
- Test hook return values and side effects
- Test error boundaries and error states

## Test Structure
```tsx
describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    // assertions
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);
    // interact and assert
  });
});
```

## Mocking
- Use `jest.mock()` for module mocks
- Create manual mocks for external dependencies
- Mock browser APIs when needed
- Clean up mocks in afterEach/afterAll

## Best Practices
- Test component outputs, not internal state
- Use `toMatchSnapshot()` sparingly
- Test edge cases and error states
- Keep tests maintainable and readable
