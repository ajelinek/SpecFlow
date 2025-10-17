# Gherkin Scenario Definition Guidelines

## Core Principles

### Business-Focused Scenarios

- Write from the user's perspective, focusing on _what_ the system should do, not _how_
- Use business language that stakeholders can understand
- Avoid technical jargon and implementation details
- Design large scenarios that cover entire user journeys from start to finish
- Include multiple assertions to validate complete user experience

## Scenario Structure

### Given-When-Then Format

```gherkin
Given [initial context and preconditions]
When [user action or business event]
Then [expected business outcome]
And [additional expected outcomes]
```

### Organization

- **TSM# Identifiers**: Group related scenarios using descriptive module names
- **TS# Identifiers**: Each scenario must have a unique identifier (TS01, TS02, etc.)
- **Tags**: See @rules/common/test-e2e-tags.md for complete tagging system

## Writing Guidelines

### DO Include

- **Specific Assertions**: Exact error messages, numerical values, precise text content, dates/times, visual states
- **User-Visible Elements**: What users can actually see and verify on screen
- **Complete Workflows**: Entire user journeys with multiple validation points
- **Business Language**: Terminology that stakeholders understand

### DON'T Include

- Technical implementation details or system internals
- UI-specific language (clicks, buttons, forms)
- Vague assertions like "should work" or "user sees appropriate message"
- Single-step scenarios that don't represent complete workflows

### Example: Specific vs. Vague

```gherkin
# VAGUE - Don't do this
Then the user should see a success message
And the data should be updated
And the user should be redirected

# SPECIFIC - Do this instead
Then the success message "Profile updated successfully" should be displayed
And the user's name should show "John Smith" in the header
And the user should be redirected to the profile page
And the last updated timestamp should show "Updated 2 minutes ago"
```

## Scenario Outline for Parameterized Testing

Use `Scenario Outline` when testing multiple input values for the same business workflow:

```gherkin
Scenario Outline: User login with valid credentials
  Given the user is on the login page
  When they enter "<username>" and "<password>"
  Then they should be redirected to the dashboard
  And the welcome message "Hello <display_name>" should be displayed

  Examples:
    | username    | password | display_name |
    | john.doe    | pass123  | John Doe     |
    | jane.smith  | secret   | Jane Smith   |
    | admin.user  | admin    | Administrator|
```

## Example Structure

```gherkin
Feature: User Account Management

  #---------------------------------------------------------------------------
  # TSM001: User Registration and Onboarding
  #---------------------------------------------------------------------------

  @TS001 @happyPath @status_pending
  Scenario: New user successfully creates account and completes onboarding
    Given a new user visits the registration page
    When they provide valid registration information and submit the form
    Then the success message "Account created successfully" should be displayed
    And they should receive a welcome email at "user@example.com"
    And they should be redirected to the onboarding flow page
    And the onboarding progress should show "Step 1 of 3"
    And they should be able to complete their profile setup

  @TS002 @errorPath @status_pending
  Scenario: User registration fails due to invalid email format
    Given a new user visits the registration page
    When they enter an invalid email address "invalid-email" and submit the form
    Then the error message "Please enter a valid email address" should be displayed
    And the email field should be highlighted in red
    And the account should not be created
    And they should remain on the registration page
    And the form should retain the entered data except for the invalid email
```
