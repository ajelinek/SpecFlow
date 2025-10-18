# Customizing Testing Rules for Your Project

This prompt guides you through customizing the three testing rule files (`common/testing/common-test-context-data-rules.md`, `common/testing/common-e2e-testing-guidelines.md`, and `common/testing/common-testing-guidelines.md`) to match your specific project's data model and requirements.

## Overview

The testing rules are designed to be project-agnostic templates that need customization based on your specific:

- Data model and entity relationships
- Authentication system
- Database schema
- Business domain concepts

## Files to Customize

### 1. `common-test-context-data-rules.md`

**Primary customization target** - This file contains the most project-specific content.

#### Sections to Update:

**A. Entity ID Conventions (Lines ~186-195)**

```typescript
// Replace with your project's entities
- **O1, O2, O3...** - Organizations
- **U1, U2, U3...** - Users
- **G1, G2, G3...** - User Groups
// Add your entities:
- **P1, P2, P3...** - Products
- **C1, C2, C3...** - Customers
- **O1, O2, O3...** - Orders
```

**B. Entity Relationship Map (Lines ~218-239)**

```mermaid
// Update the mermaid diagram to reflect your data model
graph TD
    O[Organization] --> U[User]
    O --> G[UserGroup]
    // Replace with your relationships:
    C[Customer] --> O[Order]
    P[Product] --> O[Order]
    O --> OI[OrderItem]
```

**C. Required Relationships (Lines ~241-251)**

```typescript
// Update the 9 relationship rules to match your domain
1. **User → UserDetail**: Every user must have a corresponding user detail record
2. **User → Organization**: Users must belong to an organization
// Replace with your relationships:
1. **Customer → CustomerProfile**: Every customer must have a profile
2. **Order → Customer**: Orders must belong to a customer
3. **OrderItem → Order + Product**: Order items must reference valid order and product
```

**D. Relationship Validation Patterns (Lines ~255-266)**

```typescript
// Update the example to use your entities
const MODULE_BASE_DATA = {
  orgs: [{ _id: 'O1' }],
  users: [{ _id: 'U1', orgId: 'O1' }],
  userDetails: [{ _id: 'U1' }],
  // Replace with your entities:
  customers: [{ _id: 'C1' }],
  products: [{ _id: 'P1' }],
  orders: [{ _id: 'O1', customerId: 'C1' }],
  orderItems: [{ orderId: 'O1', productId: 'P1', quantity: 1 }],
}
```

**E. Test Data Setup Patterns (Lines ~195-233)**

```typescript
// Update Pattern 1 and 2 to use your core entities
// Pattern 1: Minimal Setup
const MODULE_BASE_DATA = {
  customers: [{ _id: 'C1' }],
  products: [{ _id: 'P1' }],
}

// Pattern 2: Complete Setup
const MODULE_BASE_DATA = {
  customers: [{ _id: 'C1' }, { _id: 'C2' }],
  products: [{ _id: 'P1' }, { _id: 'P2' }],
  orders: [{ _id: 'O1', customerId: 'C1' }],
  orderItems: [
    { orderId: 'O1', productId: 'P1', quantity: 2 },
    { orderId: 'O1', productId: 'P2', quantity: 1 },
  ],
}
```

**F. Universal Setup Pattern Examples (Lines ~52-93)**

```typescript
// Update baseData to use your entities
async function setUp(ctx: TestContext, testData: DataGenObject = {}) {
  const baseData = {
    customers: [{ _id: 'C1' }],
    products: [{ _id: 'P1' }],
    // Add your core entities
  }
  // Rest remains the same
}
```

### 2. `common/testing/common-e2e-testing-guidelines.md`

**Minimal customization needed** - Mostly Playwright-specific patterns.

#### Sections to Update:

**A. Test Setup Pattern Examples (Lines ~22-40)**

```typescript
// Update baseData to match your entities
async function setUp(page: Page, ctx: TestContext, testData: DataGenObject = {}) {
  const baseData = {
    customers: [{ _id: 'C1' }],
    products: [{ _id: 'P1' }],
    // Replace with your core entities
  }
  // Rest remains the same
}
```

**B. Example Test Suite (Lines ~36-40)**

```typescript
// Update test data to use your entities
test('should display recent activities', async ({ page, ctx }) => {
  const testData = {
    orders: [{ _id: 'O1', customerId: 'C1' }],
    // Replace with your test-specific data
  }
  // Rest remains the same
})
```

### 3. `common/testing/common-testing-guidelines.md`

**Minimal customization needed** - Mostly generic testing principles.

#### Sections to Update:

**A. Integration Test Example (Lines ~160-198)**

```typescript
// Update baseData and service to match your domain
async function setUp(ctx: TestContext, testData = {}) {
  const baseData = {
    customers: [{ _id: 'C1' }],
    products: [{ _id: 'P1' }],
    // Replace with your entities
  }

  const { selector } = await ctx.setupEnv(baseData, testData)
  const orderService = new OrderService(ctx.db) // Replace with your service

  return { selector, orderService }
}
```

## Customization Process

### Step 1: Analyze Your Data Model

1. **Identify core entities** - What are your main business objects?
2. **Map relationships** - How do entities relate to each other?
3. **Define hierarchies** - What are the parent-child relationships?
4. **Identify required relationships** - What relationships are mandatory?

### Step 2: Update Entity Conventions

1. **Create shorthand ID patterns** - Use consistent prefixes (C1, C2 for Customers, P1, P2 for Products)
2. **Document all entities** - List every entity type in your system
3. **Define relationship rules** - What relationships must always be maintained?

### Step 3: Update Examples

1. **Replace generic examples** - Use your actual entities in all code examples
2. **Update baseData patterns** - Show realistic data structures for your domain
3. **Customize service examples** - Use your actual service classes

### Step 4: Validate Relationships

1. **Test relationship rules** - Ensure all examples follow your relationship constraints
2. **Verify ID conventions** - Make sure shorthand IDs are consistent
3. **Check data integrity** - Ensure examples don't create invalid relationships

## Example: E-commerce Project

If your project is an e-commerce system, you might customize it like this:

```typescript
// Entity ID Conventions
- **C1, C2, C3...** - Customers
- **P1, P2, P3...** - Products
- **O1, O2, O3...** - Orders
- **OI1, OI2, OI3...** - Order Items
- **CAT1, CAT2, CAT3...** - Categories

// Required Relationships
1. **Customer → CustomerProfile**: Every customer must have a profile
2. **Order → Customer**: Orders must belong to a customer
3. **OrderItem → Order + Product**: Order items must reference valid order and product
4. **Product → Category**: Products must belong to a category

// Base Data Pattern
const MODULE_BASE_DATA = {
  customers: [{ _id: 'C1' }],
  categories: [{ _id: 'CAT1' }],
  products: [{ _id: 'P1', categoryId: 'CAT1' }],
  orders: [{ _id: 'O1', customerId: 'C1' }],
  orderItems: [{ orderId: 'O1', productId: 'P1', quantity: 1 }],
}
```

## Validation Checklist

After customization, verify:

- [ ] All entity types are documented with shorthand ID patterns
- [ ] Relationship map reflects your actual data model
- [ ] All code examples use your entities
- [ ] Base data patterns are realistic for your domain
- [ ] Required relationships are clearly defined
- [ ] Anti-patterns are relevant to your system
- [ ] Setup patterns work with your authentication system

## Notes

- **Keep the structure** - Don't change the overall organization of the files
- **Maintain consistency** - Use the same entity names and ID patterns throughout
- **Test your examples** - Ensure all code examples would actually work
- **Document assumptions** - Add comments explaining domain-specific requirements
- **Update as needed** - Revisit these files when your data model evolves
