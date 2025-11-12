# Playwright Page Object Pattern

## Core Rules

### MANDATORY Requirements

- **ALL page object methods must use `@step` decorators** (excluding locators)
- **Use single responsibility principle** - one page object per page/component
- **Only centralize multi-step reusable assertions** - assertion methods in page objects only for multi-step assertions used across multiple tests (see Assertion Placement Rules below)
- **Cache locators in constructor** for performance
- **Use semantic selectors only** - prioritize accessibility and user-facing attributes. See @vibing/rules/common/ui/ui-accessibility-guidelines.md for accessibility testing requirements.
- **Expose actions, not locators** - methods should perform operations, not return elements

### Step Decorator Requirements

- **ALL page object helper functions** must use `@step` decorators
- **ALL multi-step assertion methods** must use `@step` decorators
- **ALL navigation methods** must use `@step` decorators
- **ALL form interaction methods** must use `@step` decorators
- **Use dynamic parameter injection** for descriptive step names

### Selector Priority (MANDATORY ORDER)

1. `getByRole()` - Best for accessibility and user-facing elements (see @vibing/rules/common/ui/ui-accessibility-guidelines.md)
2. `getByLabel()` - For form fields with labels
3. `getByText()` - For text content and buttons
4. `getByPlaceholder()` - For inputs with placeholder text
5. `getByAltText()` - For images
6. `getByTitle()` - For elements with title attributes
7. `getByTestId()` - Only as last resort for complex components - ASK BEFORE USING

### Locator Management Rules

- **ALL locators must be private anonymous functions** in page objects
- **Use descriptive method names** for locators

### Assertion Placement Rules

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
  **NO single-line assertion methods** - only create assertion methods in page objects for multi-step assertions reused across multiple tests
