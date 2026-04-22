<!--
INSTRUCTION BLOCK — remove before committing
This template is filled in by the 107-ui-experience skill. Every section here maps to a step
in SKILL.md. Do not add sections not covered by the skill.

Section map:
  "Navigation & Interaction Patterns" ← Step 6 (from selected UX direction, Step 3–4)
  "Page Summary" ← Step 6 (from page inventory built in Step 5)

Placeholder text below is illustrative — replace every example with project-specific content.
Use tight bullet lists in "Navigation & Interaction Patterns"; do not write paragraphs.
The Page Summary table must list every distinct route in the product.
-->

# D07 — UI Experience Overview

**Purpose**: Establishes the UX architecture and navigation strategy that governs how users
move through the product, and provides a complete inventory of all pages and their routes.

---

## Navigation & Interaction Patterns

- **Navigation Approach**: Persistent top navigation bar with role-filtered items; secondary
  navigation via left sidebar for resource-dense sections; breadcrumbs for depth > 2 levels
- **Cross-Platform Patterns**: Sidebar collapses to bottom tab bar on mobile (≤ 768 px);
  top navigation condenses to hamburger menu; touch targets minimum 44 × 44 px
- **Role-Based Navigation**: Authenticated users see full navigation; unauthenticated users
  see only public routes; admin users see an additional Settings section in sidebar
- **Core Interactions**: In-page filtering via URL-persisted query params; form submission
  with optimistic updates and inline validation; infinite scroll for list views on mobile,
  pagination on desktop
- **Accessibility**: Full keyboard navigation via Tab / Shift-Tab / Enter / Escape; ARIA
  landmarks on every page; skip-to-content link present on all layouts; focus trapping in
  modal dialogs
- **Error Handling**: Inline field validation on blur; toast notifications for async errors
  (auto-dismiss 5 s, dismissable); full-page error boundary for unrecoverable states with
  retry action; 404 and 403 pages with navigation back to safe state

---

## Page Summary

| Page Name | Route | Description | Access |
|---|---|---|---|
| Dashboard | `/` | Primary landing view showing summary metrics and recent activity | Authenticated |
| Login | `/login` | Credential entry and authentication flow | Public |
| Sign Up | `/signup` | New account registration | Public |
| Forgot Password | `/forgot-password` | Password reset request | Public |
| Reset Password | `/reset-password` | Password reset confirmation with token | Public |
| Projects | `/projects` | List of all projects the user has access to | Authenticated |
| Project Detail | `/projects/:id` | Single project view with tabs for overview, activity, and settings | Authenticated |
| Settings — Profile | `/settings/profile` | User profile and notification preferences | Authenticated |
| Settings — Account | `/settings/account` | Email, password, and account deletion | Authenticated |
| Admin — Users | `/admin/users` | User management table with search and role assignment | Admin |
| Admin — Audit Log | `/admin/audit` | Chronological log of all system events | Admin |
| 404 | `*` | Not-found page with navigation to dashboard | Public |
