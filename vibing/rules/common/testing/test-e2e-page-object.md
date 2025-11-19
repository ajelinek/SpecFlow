# Playwright Page Object Pattern

## Core Rules

### MANDATORY Requirements

- **ALL page object methods must use `@step` decorators** (excluding locators)
- **Use single responsibility principle** - one page object per page/component
- **Only centralize multi-step reusable assertions** - assertion methods in page objects only for multi-step assertions used across multiple tests (see Assertion Functions section below)
- **Cache locators in constructor** for performance
- **Use semantic selectors only** - prioritize accessibility and user-facing attributes. See @vibing/rules/common/ui/ui-accessibility-guidelines.md for accessibility testing requirements.
- **Expose actions, not locators** - methods should perform operations, not return elements

### Step Decorator Requirements

- **ALL page object helper functions** must use `@step` decorators
- **ALL multi-step assertion methods** must use `@step` decorators
- **ALL navigation methods** must use `@step` decorators
- **ALL form interaction methods** must use `@step` decorators
- **Use dynamic parameter injection** for descriptive step names

## Page Object Structure

Page objects must follow this exact order:

1. **Selectors** (at the top)
2. **Action Functions**
3. **Assertion Functions**

### Selectors

**MANDATORY**: All selectors must be defined at the top of the page object class, grouped by category.

#### Selector Priority (MANDATORY ORDER)

1. `getByRole()` - Best for accessibility and user-facing elements (see @vibing/rules/common/ui/ui-accessibility-guidelines.md)
2. `getByLabel()` - For form fields with labels
3. `getByText()` - For text content and buttons
4. `getByPlaceholder()` - For inputs with placeholder text
5. `getByAltText()` - For images
6. `getByTitle()` - For elements with title attributes
7. `getByTestId()` - Only as last resort for complex components - ASK BEFORE USING

#### Locator Management Rules

- **ALL locators must be private anonymous functions** in page objects
- **Use descriptive method names** for locators
- **Group common selectors together** (e.g., form fields, buttons, navigation elements)

#### Selector Structure Example

```typescript
class LoginPage {
  // Form Fields (grouped)
  private usernameInput = () => this.page.getByLabel('Username')
  private passwordInput = () => this.page.getByLabel('Password')
  private emailInput = () => this.page.getByLabel('Email')

  // Buttons (grouped)
  private submitButton = () => this.page.getByRole('button', { name: 'Sign in' })
  private cancelButton = () => this.page.getByRole('button', { name: 'Cancel' })
  private forgotPasswordLink = () => this.page.getByRole('link', { name: 'Forgot password' })

  // Navigation (grouped)
  private userMenu = () => this.page.getByRole('button', { name: 'User menu' })
  private userGroupLink = (userGroupName: string) => this.page.getByText(userGroupName)

  // Actions (grouped)
  private deleteButton = (itemName: string) => this.page.getByRole('button', { name: `Delete ${itemName}` })
  private editButton = (itemName: string) => this.page.getByRole('button', { name: `Edit ${itemName}` })

  // Common UI Elements (grouped)
  private searchInput = () => this.page.getByPlaceholder('Search...')
  private avatarImage = () => this.page.getByAltText('User avatar')
  private closeDialog = () => this.page.getByTitle('Close dialog')

  // Action Functions
  // ... (see Action Functions section)

  // Assertion Functions
  // ... (see Assertion Functions section)
}
```

### Action Functions

Action functions perform operations on the page. They must come after selectors and before assertion functions.

#### Action Function Rules

- **ALL action functions must use `@step` decorators**
- **Action functions perform operations** - they click, type, navigate, etc.
- **Do NOT return locators** - perform the action directly
- **Use descriptive method names** that describe what the action does

#### Action Function Examples

```typescript
@step('Navigate to login page')
async navigateToLogin() {
  await this.page.goto('/login')
}

@step('Fill username field with {username}')
async fillUsername(username: string) {
  await this.usernameInput().fill(username)
}

@step('Fill password field')
async fillPassword(password: string) {
  await this.passwordInput().fill(password)
}

@step('Click submit button')
async clickSubmit() {
  await this.submitButton().click()
}

@step('Click delete button for {itemName}')
async clickDelete(itemName: string) {
  await this.deleteButton(itemName).click()
}
```

### Assertion Functions

Assertion functions verify page state. They must come after action functions.

#### Assertion Placement Rules

**CRITICAL**: Only put multi-step assertions in page objects if they are reused across multiple tests. Single-line assertions should be done directly in tests using page object locators.

- **Multi-step reusable assertions** → Put in page object methods with `@step` decorators
- **Single-line assertions** → Put directly in test file using `expect()` with page object locators

**Examples of multi-step reusable assertions** (put in page object):

- Complex form validation checks (multiple fields, multiple states)
- Multi-element page state verification (title + URL + multiple elements)
- Authentication flow verification (multiple checks across the flow)

**Examples of single-line assertions** (put in test file using locators):

- Single element visibility checks
- Single attribute checks
- Single text content checks
- Any one-line assertion - use the locator directly in the test

**Locators are always reusable** - All locators must be in page objects, never in test files. Use locators directly in tests for single-line assertions.

#### Assertion Function Examples

```typescript
@step('Verify login form is displayed')
async verifyLoginFormDisplayed() {
  await expect(this.usernameInput()).toBeVisible()
  await expect(this.passwordInput()).toBeVisible()
  await expect(this.submitButton()).toBeVisible()
}

@step('Verify user is authenticated')
async verifyUserAuthenticated() {
  await expect(this.page).toHaveURL(/\/dashboard/)
  await expect(this.userMenu()).toBeVisible()
  await expect(this.page.locator('text=Welcome')).toBeVisible()
}
```

#### Single-Line Assertion Usage in Tests

```typescript
// ✅ CORRECT - Use locator directly in test
test('username field is visible', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await expect(loginPage.usernameInput()).toBeVisible()
})

// ❌ WRONG - Don't create single-line assertion methods in page object
```

## Step Decorator Setup

- Install `@cerios/playwright-step-decorator`
- Enable `experimentalDecorators` and `emitDecoratorMetadata` in `tsconfig.json`
- Create `utils/step.ts` that re-exports the step decorator
- Use `@step` decorator for all page object methods (excluding locators)

## Anti-Patterns

### FORBIDDEN Practices

- **NO conditional statements** (`if`, `switch`, ternary operators) in page objects
- **NO explicit waits** (`page.waitForTimeout()`, `page.waitForSelector()`)
- **NO direct locators in test files** - all locators must be in page objects
- **NO fragile selectors** (CSS classes, IDs, complex selectors)
- **NO locator exposure** - never return locators from page object methods
- **NO single-line assertion methods** - only create assertion methods in page objects for multi-step assertions reused across multiple tests
- **NO mixing selector/action/assertion order** - must follow: Selectors → Actions → Assertions
