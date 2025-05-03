---
description: Apply when implementing form components, input handling, or form state management
globs: 
alwaysApply: false
---
---
description: Apply when implementing form components, input handling, or form state management
---
# Form Management Standards

## Core Principles
- Use the foundation utility `useFormManagement` for all forms
- Component layer handles data collection only
- ALL data validation is done in the service. 
- Form Component does not validate data, but ensures correct data types based on input types. 
- Service layer handles validation and submission
- Match form state types to service input types
- Maintain clean separation between UI and business logic

## Form Component Structure

```tsx
// Component using form management
import useFormManagement from '@/components/foundation/utils/useFormManagement';
import type { UserData } from '@/types';

function UserForm() {
  // Initialize with concise pattern
  const form = useFormManagement<UserData>(
    {
      name: '',
      email: '',
      preferences: {
        notifications: false
      }
    },
    (data) => operation.updateUser(data)
  );

  return (
    <form onSubmit={form.onSubmit}>
      <input 
        type="text" 
        name="name" 
        value={form.state.name} 
        onInput={form.onChange} 
      />
      
      <input 
        type="email" 
        name="email" 
        value={form.state.email} 
        onInput={form.onChange} 
      />
      
      <input 
        type="checkbox" 
        name="preferences.notifications" 
        checked={form.state.preferences.notifications} 
        onInput={form.onChange} 
      />
      
      <div class="form-actions">
        <button type="submit" disabled={!form.isDirty()}>
          Save
        </button>
        <button type="button" onClick={form.resetFormToInitialState}>
          Reset
        </button>
      </div>
    </form>
  );
}
```

## Required Patterns
- Use dot notation for nested fields (`name="preferences.notifications"`)
- Always use the onChange handler from useFormManagement
- Leverage isDirty to manage form submission state
- Utilize resetFormToInitialState for form clearing
- Use resetFormToNew when loading existing data

## Form-Service Integration
- Form submission handlers should call service methods
- Service methods handle validation and API interactions
- Services return errors to be displayed by components
- Form state types should match service input requirements

## Anti-Patterns
- Don't implement validation in form components
- Don't track loading/error states in form components
- Don't directly mutate form state outside onChange
- Don't mix form state management approaches