You are implementing foundational UI components for a React application. These components serve as the building blocks used throughout the application and must be consistent, accessible, and reusable.

Goals:

- Create a comprehensive set of foundational UI components that can be used across the entire application
- Ensure all components follow consistent patterns for props, styling, and accessibility
- Provide form management hooks that integrate seamlessly with form components
- Establish clear interfaces and functionality requirements for each component
- Maintain type safety and proper React patterns throughout

Constraints:

- React 18+ with TypeScript
- CSS Modules for styling (styles.module.css per component)
- forwardRef pattern for components that need ref forwarding
- Semantic HTML and ARIA attributes for accessibility
- Mobile-first responsive design
- Theme-aware using CSS custom properties (CSS variables)

Implement:

## 1. Base Component Props Interface

All foundational components must extend a base props interface that provides common functionality:

```typescript
export type BaseComponentProps = {
  className?: string
  children?: ReactNode
}
```

This interface ensures:
- Consistent className handling across all components
- Support for composition via children prop
- Type safety for common props

## 2. Input Component

### Core Interface

```typescript
export type InputType = 'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | 'search'

export type InputProps = BaseComponentProps &
  InputHTMLAttributes<HTMLInputElement> & {
    type?: InputType
    label?: string
    errorMessage?: string
  }
```

### Functional Requirements

1. **Ref Forwarding**: Must use `forwardRef<HTMLInputElement, InputProps>` to support ref access to the underlying input element

2. **ID Generation**: 
   - Use React's `useId()` hook to generate unique IDs
   - Accept optional `id` prop for external control
   - Format: `id || `input-${generatedId}``

3. **Label Association**:
   - When `label` prop is provided, render a `<label>` element
   - Use `htmlFor` attribute matching the input's `id`
   - Label must be visually associated with the input

4. **Error State**:
   - When `errorMessage` prop is provided:
     - Apply error styling class to input element
     - Set `aria-invalid={true}` on input element
     - Render error message in a `<span>` with `role="alert"`
     - Error message must be visually distinct and accessible

5. **Class Name Composition**:
   - Base class: `s.input`
   - Error class: `s.error` (when errorMessage exists)
   - Custom class: `className` prop
   - Join with space: `[s.input, errorMessage && s.error, className].filter(Boolean).join(' ')`

6. **Wrapper Structure**:
   - Wrap in a container div with class `s.wrapper`
   - Container uses flexbox column layout
   - Maintains consistent spacing between label, input, and error message

7. **Accessibility**:
   - All native input attributes must be spread via `{...props}`
   - Support for `required`, `disabled`, `aria-*` attributes
   - Proper focus management and keyboard navigation

8. **Display Name**: Set `Input.displayName = 'Input'` for React DevTools

### Styling Requirements

- Use CSS custom properties for theming (colors, spacing, borders, etc.)
- Focus state: visible outline with theme color
- Disabled state: reduced opacity and not-allowed cursor
- Error state: distinct border color for error indication
- Responsive: full width, appropriate min-height for touch targets (minimum 44px)
- Transitions: smooth transitions for border-color and box-shadow on focus

### Rules Reference

- @vibing/rules/common/ui/ui-component-guidelines.md - Component structure and file organization
- @vibing/rules/common/ui/ui-accessibility-guidelines.md - Accessibility requirements
- @vibing/rules/common/ui/ui-form-management.md - Form input patterns
- @vibing/rules/react/react-component-guidelines.md - React-specific patterns

## 3. Button Component

### Core Interface

```typescript
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = BaseComponentProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
    isBusy?: boolean
  }
```

### Functional Requirements

1. **Ref Forwarding**: Must use `forwardRef<HTMLButtonElement, ButtonProps>` to support ref access

2. **Variant System**:
   - `primary`: Main action button with primary theme color background
   - `secondary`: Secondary action with border and background
   - `ghost`: Minimal styling, transparent background
   - `danger`: Destructive action with error/warning color
   - Default: `'primary'`

3. **Size System**:
   - `sm`: Small button for compact spaces
   - `md`: Medium button (default)
   - `lg`: Large button for prominent actions
   - Default: `'md'`

4. **Busy/Loading State**:
   - When `isBusy={true}`:
     - Disable the button (combine with `disabled` prop)
     - Display loading spinner component inside button
     - Spinner should appear before button text/children
   - `isDisabled = disabled || isBusy`

5. **Class Name Composition**:
   - Base class: `s.button`
   - Variant class: `s[variant]`
   - Size class: `s[size]`
   - Custom class: `className` prop
   - Join: `[s.button, s[variant], s[size], className].filter(Boolean).join(' ')`

6. **Native Attributes**:
   - Spread all `ButtonHTMLAttributes` via `{...props}`
   - Support `type`, `onClick`, `disabled`, `aria-*` attributes
   - Proper form integration (`submit`, `reset`, `button` types)

7. **Display Name**: Set `Button.displayName = 'Button'` for React DevTools

### Styling Requirements

- Minimum touch target: 44x44px (WCAG AA requirement)
- Focus state: visible outline with `outline-offset` for accessibility
- Disabled state: reduced opacity and not-allowed cursor
- Hover states: distinct hover styles for each variant (except disabled)
- Transitions: smooth transitions for background-color, color, border-color
- Flexbox: use `inline-flex` with `align-items: center` and `justify-content: center`
- Typography: consistent font-weight and size per size variant

### Rules Reference

- @vibing/rules/common/ui/ui-component-guidelines.md - Component structure
- @vibing/rules/common/ui/ui-accessibility-guidelines.md - Accessibility and touch targets
- @vibing/rules/react/react-component-guidelines.md - React patterns

## 4. useFormManagement Hook

### Core Interface

```typescript
export type UseFormManagementReturn<Data, OnSubmitReturn = void> = {
  state: Data
  isDirty: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => OnSubmitReturn
  updateState: (updatedData: Partial<Data>) => Data
  resetFormToInitialState: () => void
  resetFormToNew: (next: Data) => void
}

export default function useFormManagement<Data, OnSubmitReturn = void>(
  initialState: Data,
  formSubmitCb: (data: Data) => OnSubmitReturn
): UseFormManagementReturn<Data, OnSubmitReturn>
```

### Functional Requirements

1. **Initial State Management**:
   - Accept `initialState` of generic type `Data`
   - Store initial state in `useRef` using `structuredClone` for deep cloning
   - Store current state in `useState` using `structuredClone` for deep cloning
   - This ensures mutations don't affect the initial reference

2. **Dirty State Tracking**:
   - Compute `isDirty` using `useMemo`
   - Use `fast-deep-equal` library for efficient deep equality comparison
   - Compare current `state` against `initialRef.current`
   - Returns `true` when form has been modified from initial state

3. **onChange Handler**:
   - Accept `ChangeEvent<HTMLInputElement>` from React
   - Extract field path from `e.currentTarget.name` (supports dot notation: `"field.nested"`)
   - Extract value from `e.currentTarget.value`
   - Use `setDeep` helper to immutably update nested state
   - Memoized with `useCallback` (empty dependency array - stable reference)

4. **onSubmit Handler**:
   - Accept `FormEvent<HTMLFormElement>` from React
   - Call `e.preventDefault()` to prevent default form submission
   - Call `formSubmitCb(state)` with current form state
   - Return the result of `formSubmitCb` (supports async operations)
   - Memoized with `useCallback` (dependencies: `[state, formSubmitCb]`)

5. **updateState Method**:
   - Accept `Partial<Data>` for partial updates
   - Merge with current state using spread operator
   - Update state via `setState`
   - Return the new state value
   - Memoized with `useCallback` (dependency: `[state]`)

6. **resetFormToInitialState Method**:
   - Reset current state to `initialRef.current`
   - Does not modify the initial reference
   - Memoized with `useCallback` (empty dependency array)

7. **resetFormToNew Method**:
   - Accept new `Data` value
   - Update both `initialRef.current` and current state
   - Useful for loading new data into form
   - Memoized with `useCallback` (empty dependency array)

8. **setDeep Helper Function**:
   - Private helper function for nested state updates
   - Accepts object, path array, and value
   - Uses `structuredClone` to create deep copy
   - Traverses path array, creating nested objects as needed
   - Sets value at final path segment
   - Returns new object (immutable update)

### Integration Pattern

```typescript
// Component usage example
const form = useFormManagement(initialState, async (data) => {
  // Validation and submission logic
  return await submitForm(data)
})

// In JSX
<form onSubmit={form.onSubmit}>
  <Input
    name="email"
    value={form.state.email}
    onChange={form.onChange}
    errorMessage={errors.email}
  />
  <Button type="submit" disabled={!form.isDirty || isSubmitting}>
    Submit
  </Button>
</form>
```

### Rules Reference

- @vibing/rules/common/ui/ui-form-management.md - Form handling patterns
- @vibing/rules/react/react-component-guidelines.md - React hooks patterns
- @vibing/rules/common/foundation/typescript-guidelines.md - TypeScript patterns

## 5. Core Reusable Components List

The following components should be implemented as foundational building blocks. Each follows the same patterns as Input and Button (BaseComponentProps, forwardRef where needed, CSS Modules, accessibility).

### 5.1 AlertMessage

**Purpose**: Display notification messages, errors, warnings, or success messages

**Core Interface**:
```typescript
export type AlertMessageProps = {
  message: string | null | undefined
  variant?: 'info' | 'success' | 'warning' | 'error'
  dismissible?: boolean
  onDismiss?: () => void
}
```

**Key Features**:
- Auto-hide when message becomes null/undefined
- Dismissible variant with close button
- Role="alert" for screen readers
- Variant-based styling (info, success, warning, error)

**Rules**: @vibing/rules/common/ui/ui-component-guidelines.md, @vibing/rules/common/ui/ui-accessibility-guidelines.md

### 5.2 Loading / LoadingSpinner

**Purpose**: Display loading states during async operations

**Core Interface**:
```typescript
export type LoadingSpinnerProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export type PageLoadingIndicatorProps = {
  message?: string
  className?: string
}
```

**Key Features**:
- Multiple size variants
- ARIA attributes: `role="status"`, `aria-live="polite"`, `aria-busy="true"`
- Spinner icon component integration
- Full-page loading variant with message

**Rules**: @vibing/rules/common/ui/ui-component-guidelines.md, @vibing/rules/common/ui/ui-accessibility-guidelines.md

### 5.3 Modal / Dialog

**Purpose**: Display modal dialogs and overlays

**Core Interface**:
```typescript
export type ModalProps = BaseComponentProps & {
  onClose: () => void
  title?: string
  closeButtonLabel?: string
}
```

**Key Features**:
- Native `<dialog>` element with `showModal()` API
- Focus trap and escape key handling
- Backdrop click to close
- ARIA labels and title association
- Header with title and close button
- Body content area

**Rules**: @vibing/rules/common/ui/ui-component-guidelines.md, @vibing/rules/common/ui/ui-accessibility-guidelines.md, @vibing/rules/react/react-component-guidelines.md

### 5.4 Typography

**Purpose**: Consistent typography components for headings and text

**Core Interface**:
```typescript
type TypographyProps = {
  className?: string
  children?: ReactNode
} & HTMLAttributes<HTMLElement>

// Exports: H1, H2, H3, H4, H5, H6
```

**Key Features**:
- Semantic HTML elements (h1-h6)
- Consistent styling per heading level
- Support for all HTML attributes
- Theme-aware typography scales

**Rules**: @vibing/rules/common/ui/ui-component-guidelines.md, @vibing/rules/common/ui/ui-theme.md

### 5.5 ToggleSlider / Switch

**Purpose**: Toggle/switch input for boolean values

**Core Interface**:
```typescript
export type ToggleSliderProps = BaseComponentProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
    label?: string
    size?: 'sm' | 'md' | 'lg'
  }
```

**Key Features**:
- Native checkbox input with custom styling
- Visual slider/track appearance
- Label association
- Size variants
- Disabled state support

**Rules**: @vibing/rules/common/ui/ui-component-guidelines.md, @vibing/rules/common/ui/ui-accessibility-guidelines.md, @vibing/rules/common/ui/ui-form-management.md

### 5.6 Icon / IconButton

**Purpose**: Icon components and icon buttons

**Core Interface**:
```typescript
export type IconProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export type IconButtonProps = BaseComponentProps &
  ButtonHTMLAttributes<HTMLButtonElement>
```

**Key Features**:
- SVG icon components
- Size variants
- IconButton wraps icon in accessible button
- ARIA labels for icon-only buttons
- Consistent styling with Button component

**Rules**: @vibing/rules/common/ui/ui-component-guidelines.md, @vibing/rules/common/ui/ui-accessibility-guidelines.md

### 5.7 NotFound / EmptyState

**Purpose**: Display empty states and 404/not found messages

**Core Interface**:
```typescript
export type NotFoundProps = BaseComponentProps & {
  message?: string
  action?: ReactNode
}

export type EmptyStateProps = BaseComponentProps & {
  heading?: string
  message?: string
  action?: ReactNode
}
```

**Key Features**:
- Consistent messaging for empty states
- Optional call-to-action
- Accessible heading structure
- Theme-aware styling

**Rules**: @vibing/rules/common/ui/ui-component-guidelines.md, @vibing/rules/common/ui/ui-accessibility-guidelines.md

## 6. Component Implementation Patterns

### 6.1 File Structure

Each component follows this structure:
```
ComponentName/
├── index.tsx          # Component implementation
└── styles.module.css  # Component-scoped styles
```

### 6.2 Component Definition Pattern

```typescript
import { forwardRef } from 'react'
import s from './styles.module.css'
import type { BaseComponentProps } from '../../types/foundation'

export type ComponentProps = BaseComponentProps & {
  // Component-specific props
}

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = [s.base, className].filter(Boolean).join(' ')
    
    return (
      <element ref={ref} className={classes} {...props}>
        {children}
      </element>
    )
  }
)

Component.displayName = 'Component'
```

### 6.3 Styling Pattern

- Use CSS Modules for style encapsulation
- CSS custom properties for theming
- Mobile-first responsive design
- Consistent spacing using theme variables
- Transitions for interactive states
- Focus-visible for keyboard navigation

### 6.4 Accessibility Pattern

- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Minimum 44px touch targets
- Color contrast compliance (WCAG AA)

## 7. Rules Reference Summary

When implementing foundational UI components, reference these rules:

**Component Structure**:
- @vibing/rules/common/ui/ui-component-guidelines.md
- @vibing/rules/common/ui/ui-foundational-component-principles.md
- @vibing/rules/react/react-component-guidelines.md

**Accessibility**:
- @vibing/rules/common/ui/ui-accessibility-guidelines.md

**Forms**:
- @vibing/rules/common/ui/ui-form-management.md

**Styling**:
- @vibing/rules/common/ui/ui-styling-guidelines.md
- @vibing/rules/common/ui/ui-theme.md

**TypeScript**:
- @vibing/rules/common/foundation/typescript-guidelines.md

**General**:
- @vibing/rules/common/foundation/general-rules.md

## 8. Validation Checklist

Before considering a foundational component complete, verify:

- [ ] Extends `BaseComponentProps` or equivalent base interface
- [ ] Uses `forwardRef` if ref forwarding is needed
- [ ] Sets `displayName` for React DevTools
- [ ] Implements proper TypeScript types
- [ ] Uses CSS Modules for styling
- [ ] Follows accessibility guidelines (WCAG AA)
- [ ] Supports keyboard navigation
- [ ] Has proper focus management
- [ ] Uses theme variables (CSS custom properties)
- [ ] Mobile-first responsive design
- [ ] Minimum 44px touch targets for interactive elements
- [ ] Proper ARIA attributes where needed
- [ ] Semantic HTML elements
- [ ] Error states handled appropriately
- [ ] Disabled states handled appropriately
- [ ] Loading/busy states handled appropriately
- [ ] Exported from component index file

## 9. Integration with Forms

When using Input components with useFormManagement:

1. Input `name` attribute must match form state path (supports dot notation for nested)
2. Input `value` comes from `form.state.fieldName`
3. Input `onChange` uses `form.onChange`
4. Input `errorMessage` comes from validation errors (service layer)
5. Form `onSubmit` uses `form.onSubmit`
6. Submit button disabled state can use `!form.isDirty` to prevent unnecessary submissions
7. Form validation occurs in service layer, not component layer

This pattern ensures:
- Separation of concerns (presentation vs. business logic)
- Consistent form handling across application
- Proper error handling and user feedback
- Type-safe form state management

