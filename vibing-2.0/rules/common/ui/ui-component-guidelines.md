# General Component Guidelines

- Leverage foundation components as building blocks.
- Foundational components include (input, icons, alerts, etc).
- Ensure consistency, composability, and use of foundational building blocks.
- Keep components small and single purpose.

# Accessibility and Semantic HTML Guidelines

- Follow all A11y practices. See @rules/common/accessibility-guidelines.md for comprehensive standards.
- Use semantic HTML elements (`<section>`, `<article>`, `<nav>`, etc.) instead of generic `<div>`.
- Add ARIA attributes to sections for semantic meaning (e.g., `<section aria-label="hero">`).
- Ensure all interactive elements have accessible names.

# File Structure

```
PascalCase/
├── index.tsx       # Main component logic and view
└── styles.module.css # CSS Modules for component-scoped styles
```

# Component Definition

Components should be clearly defined with typed props. The main component file (`index.tsx`) should export the component as a named export.

```typescript
// index.tsx
import styles from './styles.module.css'
type Props = {
  title: string
  onAction: () => void
}

export default function MyComponent(props: props) {}
// Framework-specific implementation here
```

_Note: The specific implementation inside `index.tsx` will vary by framework (e.g., `className` vs. `class`). Refer to framework-specific guidelines._

# Form Validation

- Input validation is handled by the store/service layer, not within presentation components.
- Components receive validation errors from service operations.

# Required Patterns

- **Use Foundation Components**: Always use established foundation components for base UI elements.
- **Type Everything**: All props and events must be strongly typed.
- **CSS Modules**: Use CSS Modules for all styling to ensure encapsulation.
- **A11y First**: Adhere to accessibility best practices. See @rules/common/accessibility-guidelines.md.
- **Presentation Logic Only**: Components should focus on presenting UI and delegating business logic to stores or services.
- **Default Exports**: Component should use default export of the component name

# Anti-Patterns to Avoid

- **Prop Drilling**: Avoid passing props down more than one level. Use state management or composition instead.
- **Inline Styles**: Do not use inline `style` attributes.
- **Direct DOM Manipulation**: Never manipulate the DOM directly.
- **Untyped Code**: Do not allow untyped components or props.
- **Complex JSX Logic**: Avoid ternary statements or complex logic directly within JSX. Use variables or helper functions.

# Performance Requirements

- **Lazy Load**: Lazy load large or infrequently used components.
- **Cleanup**: Implement proper cleanup for side effects to prevent memory leaks.
