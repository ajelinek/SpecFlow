# E2E Test Tagging System

## Overview

All E2E tests must use consistent tags for organization, filtering, and execution control.

## Required Tags

Every test must include at least one **feature tag** and one **test type tag**:

### Feature Tags (Required - Choose One)

- `@auth` - Authentication and authorization flows
- `@dashboard` - Dashboard display and navigation
- `@service-management` - Service creation, editing, deletion
- `@service-entry` - Service entry form and validation
- `@targets` - Target display and progress tracking
- `@user-groups` - User group management and switching
- `@user-settings` - User account settings and preferences
- `@navigation` - Page navigation and routing
- `@services` - Services listing and filtering
- `@sponsors` - Sponsor display and rotation

### Test Type Tags (Required - Choose One)

- `@happyPath` - Standard user workflow testing
- `@errorPath` - Error handling and edge cases
- `@integration` - Cross-component integration testing
- `@navigation` - Navigation and routing testing
- `@list` - List display and data presentation
- `@filter` - Filtering and search functionality
- `@export` - Data export functionality
- `@empty-state` - Empty state handling
- `@create` - Creation functionality
- `@edit` - Editing functionality
- `@delete` - Deletion functionality
- `@email` - If it uses email capabilities

## Tagging Rules

- **All tags must be at the END of the test description**
- **Test case numbers**: Tags must include a test case number `@TS#` to allow for easy filtering
- **Email Integration Tests**: Add `@email` tag to any test that:
  - Sends actual emails (password reset, welcome emails, etc.)
  - Calls email service APIs (Mailgun, etc.)
  - Tests email delivery or content
  - Tests user group member addition/removal that triggers emails
- **Test Naming**: Use descriptive names that include the feature and test type
- **Multiple Tags**: Use multiple tags when a test covers multiple aspects

## Usage Examples

```typescript
// Basic test with required tags
test('should login and view dashboard @auth @happyPath @TS1')

// Test with multiple feature aspects
test('should create new service and send notification @service-management @create @email @TS2')

// Error path testing
test('should handle invalid login credentials @auth @errorPath @TS3')

// Integration testing
test('should sync data across multiple components @service-management @integration @TS4')
```
