## React State Management Rules

## 1. Storage Strategy

### 1.1. User State Storage

- **URL State**: Store user navigation state, filters, search queries, and view preferences in URL parameters
- **Session Storage**: Use for temporary user interactions that should persist across page refreshes but not across browser sessions
- **Local Storage**: Store persistent user preferences, theme settings, and application configuration

### 1.2. State Persistence Guidelines

- **URL Parameters**: Query strings, route parameters, hash fragments for shareable state
- **Session Storage**: Form drafts, temporary selections, multi-step process state
- **Local Storage**: User preferences, theme, language, notification settings

## 2. Local Component State

- **Use `useState`** for component-local ephemeral state
- **Use `useMemo`** for derived values when performance requires it
- **Flatten state structures** instead of deeply nesting objects
- **Return cleanup functions** in `useEffect` for subscriptions/timers

## 3. State Management Integration

- **Apollo Client**: Follow @rules/apollo/apollo-react-state-integration.md for GraphQL server state
- **SWR**: Follow @rules/react/react-state-with-swr.md` for REST API state management
- **Firebase SDK**: Follow @rules/common/firebase-integration.md for Firebase Server Data
- **Local State**: Use React hooks for component-specific state

## 4. Required Practices

- **DO** use URL state for shareable user interactions
- **DO** use localStorage for persistent user preferences
- **DO** use sessionStorage for temporary state that survives page refresh
- **DO** use `useState` for component-local state
- **DO** implement proper cleanup in `useEffect`

## 5. Prohibited Practices

- **DO NOT** store sensitive data in localStorage or sessionStorage
- **DO NOT** manipulate DOM directly
- **DO NOT** store large objects in URL parameters
- **DO NOT** use global state for component-specific data
- **DO NOT** duplicate server data in client storage (keep server data in SWR, Apollo, or Firebase SDKs only)
