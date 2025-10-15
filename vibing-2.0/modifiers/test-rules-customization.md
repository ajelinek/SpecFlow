# Test Rules Customization Modifier

## Purpose

This modifier updates the test-related rules (`@rules/common/test-context.md`, `@rules/common/test-general.md`, `@rules/common/test-setup-examples.md`, `@rules/common/test-e2e.md`) for specific projects by replacing entity references, relationships, ID conventions, and feature tags with project-specific ones.

## What Changes

### 1. Entity References

Replace generic entity names with your project's entities:

- `users` → `yourEntityName`
- `organizations` → `yourParentEntity`
- `userGroups` → `yourGroupEntity`

### 2. ID Conventions

Update shorthand ID patterns:

- `U1, U2, U3...` → `YE1, YE2, YE3...` (Your Entities)
- `O1, O2, O3...` → `PE1, PE2, PE3...` (Parent Entities)
- `G1, G2, G3...` → `GE1, GE2, GE3...` (Group Entities)

### 3. Relationships

Update foreign key references:

- `orgId: 'O1'` → `parentId: 'PE1'`
- `userId: 'U1'` → `entityId: 'YE1'`

### 4. Feature Tags

Update E2E test feature tags in `@rules/common/test-e2e.md`:

Replace generic feature tags with your project's features:

- `@auth` → `@yourAuthFeature`
- `@dashboard` → `@yourDashboardFeature`
- `@service-management` → `@yourServiceFeature`
- `@service-entry` → `@yourEntryFeature`
- `@targets` → `@yourTargetFeature`
- `@user-groups` → `@yourGroupFeature`
- `@user-settings` → `@yourSettingsFeature`
- `@navigation` → `@yourNavigationFeature`
- `@services` → `@yourServicesFeature`
- `@sponsors` → `@yourSponsorFeature`

## Implementation

### Step 1: Update Entity References

Find and replace entity names throughout all four files:

- `@rules/common/test-context.md`
- `@rules/common/test-general.md`
- `@rules/common/test-setup-examples.md`
- `@rules/common/test-e2e.md`

### Step 2: Update ID Conventions

Replace all shorthand ID patterns with your conventions.

### Step 3: Update Relationships

Replace foreign key references to match your entity relationships.

### Step 4: Update Feature Tags

Replace feature tags in `@rules/common/test-e2e.md` with your project's specific features.

## Example

### Before:

```typescript
const MODULE_BASE_DATA = {
  orgs: [{ _id: 'O1' }],
  users: [{ _id: 'U1', orgId: 'O1' }],
  userDetails: [{ _id: 'U1' }],
}
```

### After:

```typescript
const MODULE_BASE_DATA = {
  companies: [{ _id: 'C1' }],
  employees: [{ _id: 'E1', companyId: 'C1' }],
  employeeProfiles: [{ _id: 'E1' }],
}
```

### Feature Tags Example:

#### Before:

```typescript
// E2E test with generic tags
test('should login and view dashboard @auth @happyPath @TS1')
test('should create new service @service-management @create @TS2')
```

#### After:

```typescript
// E2E test with project-specific tags
test('should login and view dashboard @employee-auth @happyPath @TS1')
test('should create new project @project-management @create @TS2')
```
