<!--
INSTRUCTION BLOCK — remove before committing
This template is filled in by the 108-ui-page-design skill. It is the overview.md file
that accompanies mockup.html in the same page directory.

Section map:
  "Mockup" ← Step 6 (HTML mockup produced by @designer or generated directly)
  "Page Context" ← Step 1–2 confirmed inputs + D07 page inventory entry
  "Key Data Attributes" ← Step 5 data inventory
  "User Interaction Flows" ← Step 5 interaction inventory
  "Alternatives Considered" ← Step 4 rejected directions with brief rationale

Rules:
  - The mockup is the primary artifact. This document supports it — do not repeat
    layout or visual decisions that are already visible in mockup.html.
  - Key Data Attributes: list every data field the page displays, accepts, or submits.
    Include source (API endpoint, user input, computed from other data).
  - Interaction Flows: cover every named user flow, not just the happy path.
  - Alternatives Considered: one sentence per rejected direction — enough to understand
    why it was set aside, not a full redesign.
  - Replace every placeholder below with project-specific content.
-->

# Dashboard Page Design

**Purpose**: Minimal design specification. The primary visual reference is `mockup.html`.
Refer to D06 for design system patterns and D07 for navigation and interaction standards.

---

## Mockup

Open `mockup.html` in a browser to view the full interactive layout.

---

## Page Context

- **Purpose**: Primary landing view after authentication. Surfaces key project metrics,
  recent activity, and quick-access actions so users can orient and begin work within
  one click.
- **User Journey Position**: Entry point from login and from top navigation "Home" link.
  Users proceed to Projects list, a specific Project Detail, or Settings from here.
- **Key Actions**:
  - View summary metrics for active projects
  - Open the most recent activity item
  - Navigate to any active project
  - Dismiss or action a pending notification

---

## Key Data Attributes

- **Active project count**: Integer. Source: `GET /api/projects?status=active`. Displayed
  in summary metric card; zero state shows "Start your first project" prompt.
- **Recent activity feed**: Array of activity events (max 20). Source:
  `GET /api/activity?limit=20`. Each event: type, actor display name, target resource
  name, timestamp. Empty state if no activity in the last 30 days.
- **Pending notifications**: Array. Source: `GET /api/notifications?unread=true`. Count
  displayed in nav badge; list shown in notification panel (slide-in).
- **User display name and avatar URL**: Source: session context. Shown in top-right nav
  profile element.
- **Admin flag**: Boolean. Source: session context. Controls visibility of admin summary
  card (total user count, system status).

---

## User Interaction Flows

### View and navigate to a project

- **Entry**: User lands on Dashboard after login or clicks "Home" in top navigation.
- **Actions**: Scans the active projects summary card → clicks project name or "View all
  projects" link.
- **Outcome**: Navigates to `/projects` or directly to `/projects/:id`.

### Open and action a notification

- **Entry**: User clicks notification bell icon in top navigation (badge shows unread count).
- **Actions**: Notification panel slides in from right → user scans notification list →
  clicks a notification item.
- **Outcome**: Panel closes and user is routed to the relevant resource (e.g., a comment
  thread on a project). Notification marked as read via `PATCH /api/notifications/:id`.

### Empty state — no active projects

- **Entry**: Authenticated user with zero active projects.
- **Actions**: Dashboard shows empty-state illustration and "Create your first project" CTA.
  User clicks CTA.
- **Outcome**: Navigates to project creation flow at `/projects/new`.

---

## Alternatives Considered

- **Card-grid layout with equal-weight metric tiles**: Rejected — no clear visual priority
  guides the user to the most actionable item; the activity feed was buried below the fold.
- **Single-column feed (activity-first)**: Rejected — summary metrics were not visible
  without scrolling; users with many projects had no quick-jump affordance.
