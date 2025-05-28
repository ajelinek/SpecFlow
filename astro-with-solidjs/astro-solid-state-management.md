---
description: State management guidelines for Astro with SolidJS applications
ruleType: state-management
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when implementing state management in Astro with SolidJS.

# State Management Strategy

## State Management Options
1. **SolidJS Stores** - For reactive state
2. **Context API** - For dependency injection
3. **Signals** - Fine-grained reactivity
4. **Global Stores** - For application-wide state

## SolidJS Stores

### Creating Stores
```ts
// store/counter.ts
import { createStore } from 'solid-js/store';

export const [state, setState] = createStore({
  count: 0,
  increment() {
    setState('count', c => c + 1);
  },
  decrement() {
    setState('count', c => c - 1);
  }
});
```

### Using Stores in Components
```tsx
import { state } from '../store/counter';

export function Counter() {
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={state.increment}>+</button>
      <button onClick={state.decrement}>-</button>
    </div>
  );
}
```

## Context API

### Creating Context
```tsx
// context/ThemeContext.tsx
import { createContext, useContext } from 'solid-js';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>();

export function ThemeProvider(props: { children: any }) {
  const [theme, setTheme] = createSignal<Theme>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme: theme(), toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
```

## Best Practices

### State Organization
- Group related state together
- Keep state as local as possible
- Lift state up when needed
- Use selectors for derived state

### Performance
- Use `createMemo` for expensive computations
- Batch updates when possible
- Use `createEffect` for side effects
- Clean up effects with `onCleanup`

### Testing
- Test stores in isolation
- Mock context values in tests
- Test state transitions
- Test edge cases and error states

## Astro-Specific Considerations
- Use SolidJS for interactive components only
- Pass data as props from Astro to Solid components
- Use `client:load` for components that need hydration
- Keep Astro components as static as possible

## Error Handling
- Handle errors at the component level
- Provide fallback UIs
- Log errors appropriately
- Consider error boundaries for critical errors
