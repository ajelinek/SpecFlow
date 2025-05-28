---
description: Guidelines for form management and validation across all projects
ruleType: form
globs: 
alwaysApply: false
---
## When to Use
Apply these guidelines when implementing forms in any project.

# Form Management Principles

## General Guidelines
- Keep forms focused on a single purpose
- Validate input as early as possible
- Provide clear error messages
- Support keyboard navigation
- Ensure forms are accessible (ARIA labels, proper focus management)

## Form Structure
- Group related fields in `fieldset` elements
- Use `legend` for fieldset labels
- Associate labels with inputs using `htmlFor` and `id`
- Use appropriate input types (email, tel, number, etc.)

## Validation
- Client-side validation for immediate feedback
- Server-side validation for security
- Show validation errors near the relevant field
- Disable submit button until form is valid

## State Management
- Track form state (pristine, dirty, valid, etc.)
- Handle loading and submission states
- Support form reset functionality

## Accessibility
- Ensure all form controls have accessible names
- Provide error messages that are announced by screen readers
- Use `aria-invalid` for invalid fields
- Ensure proper focus management after form submission
