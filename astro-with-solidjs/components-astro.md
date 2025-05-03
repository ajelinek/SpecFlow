---
description: Apply when implementing server-rendered UI components with minimal client-side JavaScript
globs: 
alwaysApply: false
---
---
description: Apply when implementing server-rendered UI components with minimal client-side JavaScript
---
# File Structure
- kebab-case.astro naming
- CSS modules pattern: styles.module.css
- Props interface at top of file
- Component logic in frontmatter

# Component Rules
- Static content only
- No client-side JavaScript
- Server-side rendering
- No state management
- Use slots for content projection

# Styling
- CSS modules only
- No inline styles
- Use design tokens
- Mobile-first approach
- CSS Grid/Flexbox preferred

# Optimization
- Asset optimization
- Image optimization using Astro built-ins
- Partial hydration when needed
- Static extraction where possible

# Integration
- Clear separation from Solid components
- Island architecture patterns
- Proper hydration directives
- Static-only data fetching
