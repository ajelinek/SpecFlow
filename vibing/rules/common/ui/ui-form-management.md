# Form Management Principles

- All form validations will be managed within the store service, not in the component
- All form fields require appropriate labels and validation
- Error messages must be clear and user-friendly
- All inputs must have appropriate HTML5 types
- All forms should have proper accessibility attributes. See @vibing/rules/common/ui/ui-accessibility-guidelines.md for comprehensive form accessibility standards.

# Input Components

- Use foundation input components
- Every input must have a label
- All labels and input boxes must be tied together using a unique generated id
- Consistent styling for form states
- Support keyboard navigation and proper focus management. See @vibing/rules/common/ui/ui-accessibility-guidelines.md for detailed keyboard navigation requirements.
- Labels must have an id tied to the input
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
