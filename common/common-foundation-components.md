---
description: Guidelines for creating and using foundation UI components
ruleType: components
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when creating or using foundation-level UI components that serve as building blocks for the application.

# Foundation Components Principles

## General Guidelines
- Create small, focused, and reusable components
- Follow the Single Responsibility Principle
- Keep components presentational when possible
- Ensure components are accessible by default
- Document component props and usage examples

## Component Structure

### File Organization
```
ComponentName/
  ├── ComponentName.tsx    # Main component
  ├── ComponentName.styles.ts  # Styled-components or CSS modules
  ├── ComponentName.test.tsx   # Component tests
  ├── ComponentName.stories.tsx # Storybook stories
  └── index.ts              # Exports
```

### Component Template
```tsx
import React from 'react';
import { StyledComponent } from './ComponentName.styles';

type ComponentNameProps = {
  /** Description of the prop */
  variant?: 'primary' | 'secondary';
  /** Click handler */
  onClick?: () => void;
  children: React.ReactNode;
};

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'primary',
  onClick,
  children,
}) => {
  return (
    <StyledComponent 
      variant={variant}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </StyledComponent>
  );
};
```

## Best Practices

### Props
- Use TypeScript interfaces for prop types
- Provide default values for optional props
- Destructure props at the top of the component
- Use prop spreading sparingly

### Styling
- Use CSS-in-JS or CSS Modules for component-scoped styles
- Leverage theme variables for consistent styling
- Implement responsive design at the component level
- Use CSS custom properties for dynamic theming

### Accessibility
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Support screen readers
- Provide text alternatives for non-text content
- Test with accessibility tools

### Performance
- Memoize expensive calculations
- Use React.memo for pure components
- Implement code splitting for large components
- Lazy load non-critical components

## Testing
- Test component rendering with different props
- Test user interactions
- Test edge cases and error states
- Use snapshot testing judiciously
- Test accessibility attributes

## Documentation
- Document component purpose and usage
- Include prop type documentation
- Provide code examples
- Document known limitations or gotchas
