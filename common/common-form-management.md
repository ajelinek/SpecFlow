---
description: Form handling, validation, and state management patterns
ruleType: forms
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when implementing forms, input handling, validation, or state management for user input.

# Form Management Principles
- Form state should be managed by a dedicated form library or custom hook
- Validation should be defined with schema-based validation
- All form fields require appropriate labels and validation
- Error messages must be clear and user-friendly
- All inputs must have appropriate HTML5 types
- All forms should have proper accessibility attributes

# Input Components
- Use foundation input components
- Every input must have a label
- Every input must show validation state (error, success)
- Consistent styling for form states
- Support keyboard navigation
- Implement proper focus management
- Ensure screen reader compatibility

# Form Validation
- Schema-based validation
- Client-side validation for UX
- Server-side validation for security
- Inline validation on blur
- Form-level validation on submit
- Clear error messages
- Error recovery guidance
- Real-time validation feedback
- Input formatting and masking

# Form Submission
- Disable submit button during submission
- Show loading indicator during submission
- Handle network errors gracefully
- Display success confirmation
- Reset form or redirect after success
- Prevent multiple submissions
- Session/token handling for security

# Form State Management
- Centralized form state
- Use libraries or custom hooks for complex forms
- Track dirty/pristine state
- Track touched/untouched state
- Track validation state
- Handle nested form state
- Support multi-step forms
- Support form arrays/collections
