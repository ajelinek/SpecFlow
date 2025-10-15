Supplements @rules/common/component-guidelines.md, be sure to review first.

# Component Definition

```tsx
// index.tsx
import s from './styles.module.css'
import type { ExampleProps } from './types'

export function Example({ title }: ExampleProps) {
  return <div className={s.container}>{title}</div>
}
```

# State and Hooks

- Use React's `useState` for component-level state.
- Use `useMemo` for expensive, memoized calculations.
- Use `useEffect` for handling side effects, with proper dependency arrays and cleanup functions.

# Control Flow

- Use standard JavaScript operators for conditional rendering (`&&`, ternary operators outside of complex JSX).
- Use the `.map()` method for rendering lists of elements.

# Props

- Destructure props in the function signature; avoid accessing via `props.` inside the component body.

# Error Handling

- Use React Error Boundaries to catch and handle errors in the component tree.

# Anti-Patterns to Avoid

- **Nested State Updates**: Avoid complex or nested state updates that are hard to read.
- **Overuse of `useMemo`**: Avoid over use of useMemo and only use for complex/expansive operations.
- **Prop Drilling**: Avoid passing props through multiple layers. Use Context API or state management solutions instead.
- **Over-Nesting Components**: Keep component hierarchy flat. Break down complex components into smaller, manageable ones.
- **Over-Reliance on State**: Use state only when necessary. Rely on props as much as possible to avoid unnecessary re-renders.
- **Declaring Components Within Components**: Define components separately to avoid redefinition on every render.
- **Premature Memoization**: Don't use `useMemo` and `useCallback` without clear performance bottlenecks.
- **Overusing Context for Global State**: Use dedicated state management libraries for complex state needs.
- **Abusing Higher-Order Components (HOCs)**: Use HOCs judiciously. Consider render props or hooks as alternatives.
- **Abusing Render Props**: Use render props pattern only when it's the best solution for the problem.
- **Using `cloneElement` Instead of Composition**: Use composition pattern instead of `cloneElement` for better maintainability.
- **Putting Everything in a Single Component**: Break code into smaller, focused components handling specific concerns.

# Performance Requirements

- Keep components focused and composable.
