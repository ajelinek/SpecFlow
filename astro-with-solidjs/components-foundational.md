---
description: Apply when creating or using base-level UI primitives like buttons, inputs, or dialogs
globs: *
alwaysApply: false
---
---
description: Apply when creating or using base-level UI primitives like buttons, inputs, or dialogs
---
# Foundation Component Requirements

## Core Principles
- Single responsibility per component
- Composition over inheritance
- Full accessibility compliance
- Mobile-first design
- Performance optimized
- Type-safe interfaces
- Consistent API patterns

## Required Base Components
- Alert (notifications, errors)
- Button (actions)
- Dialog (modals, popups)
- Dropdown (selection menus)
- Icon (wrapped SVG components)
- Input (form fields)
- List (data display)
- Loading (spinners, skeletons)
- Table (data grids)

## Component Properties
- Must extend BaseProps type
- Consistent variant patterns
- CSS module classes

## Accessibility Requirements
- ARIA roles and states
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance
- Motion reduction support
- Error announcements
- Label associations
- Description text
- Input validation

## Style Requirements
- CSS modules only
- Design token usage
- Responsive design
- Grid/Flexbox layouts
- Mobile-first approach
- No inline styles
- BEM-like class naming
- z-index management

## Performance Rules
- Lazy loading
- Render optimization