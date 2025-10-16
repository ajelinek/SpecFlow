# Playwright Page Object Pattern

## Core Rules

### MANDATORY Requirements

- **ALL page object methods must use `@step` decorators** (excluding locators)
- **Use single responsibility principle** - one page object per page/component
- **Centralize shared assertions** - common validations must be reusable
- **Cache locators in constructor** for performance
- **Use semantic selectors only** - prioritize accessibility and user-facing attributes. See @rules/common/accessibility-guidelines.md for accessibility testing requirements.
- **Expose actions, not locators** - methods should perform operations, not return elements

### Step Decorator Requirements

- **ALL page object helper functions** must use `@step` decorators
- **ALL assertion methods** must use `@step` decorators
- **ALL navigation methods** must use `@step` decorators
- **ALL form interaction methods** must use `@step` decorators
- **Use dynamic parameter injection** for descriptive step names

### Selector Priority (MANDATORY ORDER)

1. `getByRole()` - Best for accessibility and user-facing elements (see @rules/common/accessibility-guidelines.md)
2. `getByLabel()` - For form fields with labels
3. `getByText()` - For text content and buttons
4. `getByPlaceholder()` - For inputs with placeholder text
5. `getByAltText()` - For images
6. `getByTitle()` - For elements with title attributes
7. `getByTestId()` - Only as last resort for complex components - ASK BEFORE USING

### Locator Management Rules

- **ALL locators must be private anonymous functions** in page objects
- **Use descriptive method names** for locators

### Shared Assertions Pattern

Create reusable assertion methods in page objects for common validations:

- Page title verification
- URL pattern matching
- Element visibility checks
- Form validation states
- User authentication status

## Step Decorator Setup

Install the Cerios Playwright Step Decorator

```bash
pnpm add @cerios/playwright-step-decorator
```

Enable decorators in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Create a step decorator utility:

```typescript
// utils/step.ts
// Re-export the Cerios step decorator for consistency
export { step } from '@cerios/playwright-step-decorator'
```

### Page Object with Steps

Use `@step` decorator for methods with multiple actions or assertions:

```typescript
class LoginPage {
  constructor(private page: Page) {}
  private usernameInput = () => this.page.getByLabel('Username')
  private passwordInput = () => this.page.getByLabel('Password')
  private submitButton = () => this.page.getByRole('button', { name: 'Sign in' })

  @step('Login as user: {{credentials.username}}')
  async login(credentials) {
    await this.usernameInput().fill(credentials.username)
    await this.passwordInput().fill(credentials.password)
    await this.submitButton().click()
    return new DashboardPage(this.page)
  }

  @step('Navigate to user group: {{userGroupName}}')
  async gotoUserGroup(userGroupName: string) {
    await this.userMenu.click()
    await this.userGroupLink(userGroupName).click()
  }

  @step('Verify login form validation')
  async verifyValidation() {
    await expect(this.usernameInput()).toHaveAttribute('required')
    await expect(this.passwordInput()).toHaveAttribute('required')
    await expect(this.submitButton()).toBeDisabled()
  }
}
```

## Anti-Patterns

### FORBIDDEN Practices

- **NO conditional statements** (`if`, `switch`, ternary operators) in page objects
- **NO explicit waits** (`page.waitForTimeout()`, `page.waitForSelector()`)
- **NO direct locators in test files** - all locators must be in page objects
- **NO fragile selectors** (CSS classes, IDs, complex selectors)
- **NO locator exposure** - never return locators from page object methods

### Correct Selector Usage

```typescript
// ✅ REQUIRED - Semantic selectors with function syntax
private usernameInput = () => this.page.getByLabel('Username')
private submitButton = () => this.page.getByRole('button', { name: 'Sign in' })
private userMenu = () => this.page.getByRole('button', { name: 'User menu' })
private userGroupLink = (userGroupName: string) => this.page.getByText(userGroupName)
private deleteButton = (itemName: string) => this.page.getByRole('button', { name: `Delete ${itemName}` })
private searchInput = () => this.page.getByPlaceholder('Search...')
private avatarImage = () => this.page.getByAltText('User avatar')
private closeDialog = () => this.page.getByTitle('Close dialog')
```
