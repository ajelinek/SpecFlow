---
description: 'Use when implementing forms: input handling, validation, accessibility, submission UX, and state patterns.'
ruleType: forms
applyTo:
  - 'src/**/components/**/*.{tsx,astro}'
  - 'src/**/pages/**/*.{tsx,astro}'
alwaysApply: false
---

# Form Management Principles

- All form validations will be managed within the store service, not in the component
- All form fields require appropriate labels and validation
- Error messages must be clear and user-friendly
- All inputs must have appropriate HTML5 types
- All forms should have proper accessibility attributes

# Input Components

- Use foundation input components
- Every input must have a label
- Consistent styling for form states
- Support keyboard navigation
- Implement proper focus management
- Ensure screen reader compatibility

# Form Validation

- Form-level validation on submit via the store/service
- Clear error messages
- Error recovery guidance

# Form Submission

- Disable submit button during submission
- Show loading indicator during submission
- Handle network errors gracefully
- Display success confirmation
- Reset form or redirect after success
- Prevent multiple submissions
