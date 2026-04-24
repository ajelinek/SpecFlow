<!--
INSTRUCTION BLOCK (remove before committing)
============================================
This template is filled in by the 203-implementation-design skill.

This is a standalone implementation design document. It does not preserve or embed the numbered
sections from `overview.md`, and it does not inline the full contents of `specs.feature`.

Use `overview.md` and `specs.feature` as source inputs:
- If `overview.md` exists, do not duplicate it
- If `overview.md` does not exist, add a short fallback summary so this document can stand on its own
- Match the selected detail level: High Level, Balanced, or Detailed

Always exclude test, spec, fixture, mock, and snapshot files from change-summary tables.
Include CSS/style files only for Detailed output.

Remove this instruction block before writing the file to the project.
============================================
-->

# [Feature Name] — Implementation Design

## 1. Fallback Context

<!-- Include this section only when overview.md does not exist. Keep it to 1-2 short sentences. -->

[Short fallback summary of the feature behavior and primary user outcome. Omit this section entirely
when overview.md exists.]

---

## 2. Implementation Approach

[2–3 sentences describing the selected approach, why it was chosen, and what alternatives
were considered and rejected. Example: "State stays in the existing page-level form hook
rather than moving into the global store because the behavior is local to a single route.
A shared-store option was rejected because it would add new surface area without improving
reuse or clarity."]

---

## 3. Frontend Change Summary

<!-- High Level: core production files only, no CSS/style files -->
<!-- Balanced: all production files except CSS/style files -->
<!-- Detailed: all production files including CSS/style files -->

| Module/File Path | Item Name | Status | Description |
|:----------------|:----------|:-------|:------------|
| `src/features/expense-submission/ExpenseForm.tsx` | `ExpenseForm` | `New` | Form component that collects expense details and invokes submission — the primary UI entry point for this feature. |
| `src/features/expense-submission/useExpenseForm.ts` | `useExpenseForm` | `New` | Hook that manages form state, validation, and submission lifecycle for the expense form. |
| `src/api/expenses.ts` | `submitExpense` | `Updated` | Adds the POST /expenses call used by the new form; existing GET methods remain unchanged. |

## 4. Backend Change Summary

<!-- Leave blank if the feature has no backend architecture changes -->

| Module/File Path | Item Name | Status | Description |
|:----------------|:----------|:-------|:------------|
| `src/routes/expenses.ts` | `POST /expenses` | `New` | API route that validates and persists a new expense record before delegating to the service layer. |
| `src/services/ExpenseService.ts` | `ExpenseService` | `Updated` | Adds `createExpense` to enforce business rules and coordinate persistence for expense creation. |

---

## 5. Frontend Implementation Details

<!-- High Level: module description only, no function signatures -->
<!-- Balanced: module description + 1–2 sentences on what is changing and why -->
<!-- Detailed: module description + function/component signatures + 1–2 sentences each -->

### 🟢 NEW: `src/features/expense-submission/ExpenseForm.tsx`

Renders the expense submission form, wires inputs to `useExpenseForm`, and displays
inline validation errors and the submission result state.

#### `ExpenseForm(props: ExpenseFormProps): JSX.Element`

Renders the controlled form and delegates business logic to `useExpenseForm`. This keeps
presentation separate from validation and submission behavior so the UI can evolve without
rewriting the feature logic.

---

### 🟢 NEW: `src/features/expense-submission/useExpenseForm.ts`

Owns field state, validation state, and the submission lifecycle for the expense form.
It centralizes feature-specific UI behavior so page components stay small and readable.

#### `useExpenseForm(options?: ExpenseFormOptions): ExpenseFormState`

Returns field values, validation errors, and submit handlers for the form. It coordinates
client-side validation with the API submission flow and preserves user input on failure.

---

### 🟡 UPDATED: `src/api/expenses.ts`

Adds the new expense-submission request without changing the behavior of existing read APIs.
This keeps expense-related HTTP interactions in the same module rather than creating a parallel client.

#### `submitExpense(payload: NewExpensePayload): Promise<Expense>`

Posts the expense payload to the backend and returns the created expense record. It normalizes
error handling so callers receive typed failures instead of raw response parsing logic.

---

## 6. Backend Implementation Details

<!-- Leave blank if the feature has no backend architecture changes -->

### 🟢 NEW: `src/routes/expenses.ts`

Adds the route entry for expense creation and keeps request validation at the API boundary.
The route delegates business decisions to the service layer instead of mixing validation,
persistence, and response shaping together.

#### `handleCreateExpense(req: Request, res: Response): Promise<void>`

Validates the incoming request body, delegates to `ExpenseService.createExpense`, and returns
the created record or a structured validation error response.

---

### 🟡 UPDATED: `src/services/ExpenseService.ts`

Extends the existing service with creation behavior rather than introducing a new service type.
This keeps expense business rules in one place and avoids splitting related logic across files.

#### `createExpense(payload: NewExpensePayload): Promise<Expense>`

Applies domain validation, persists the record through the existing repository layer, and returns
the hydrated expense object. Business rule failures raise domain-specific errors that the route can
translate into user-facing responses.
