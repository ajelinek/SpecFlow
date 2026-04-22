# T06 - UI Design

<!--
TEMPLATE INSTRUCTIONS (remove this block before committing):
This template is filled in by the 106-ui-design skill. Every section maps directly to a
step in the skill workflow. Do not add sections here that are not in the skill steps.
Use concrete, specific language throughout — no placeholder text like "[describe here]".
The "Alternatives Considered" section captures the design directions that were evaluated
but not selected, with a brief rationale for why each was set aside.
-->

# D06 — UI Design

**Project**: [Project name from D01]
**Design direction selected**: [Name of chosen direction]
**Last updated**: [Date]

---

## Design Strategy & Brand Foundation

**Brand Personality**: Trustworthy and efficient, with enough warmth to avoid feeling
clinical — the product serves professionals who need to act quickly without second-guessing
the interface.

**Design Philosophy**: Clarity over cleverness. Every visual element earns its presence by
reducing cognitive load, not adding aesthetic interest. Hierarchy is communicated through
space and weight, not decoration.

**Accessibility Strategy**: WCAG 2.1 AA compliance as the floor, with particular attention to
keyboard navigation and color-blind safe palettes. Reduced-motion preference respected across
all animated elements.

**Responsive Philosophy**: Desktop-first with full mobile support from day one. The primary
user context is a large screen workstation; mobile serves as a read and quick-action surface,
not the primary workflow surface.

---

## Color Strategy

### Color Philosophy

- **Primary Color Strategy**: A single dominant hue anchors all primary actions and navigation.
  The hue is chosen for trustworthiness in the target domain, not generic appeal. Saturation
  stays moderate to avoid fatigue on extended use.
- **Semantic Color System**: Color carries meaning before it carries brand. Success states use
  green, warnings use amber (not red, which is reserved for errors and destructive actions).
  The distinction is consistent across every component.
- **Accessibility Requirements**: Minimum 4.5:1 contrast ratio for body text; 3:1 for large
  text and UI components. All semantic states (success, warning, error, info) are distinguishable
  by pattern or icon, not color alone.
- **Theme Support**: Light mode is the default. Dark mode inverts the neutral palette and adjusts
  primary saturation for optical balance; brand colors remain recognizable across both themes.

### Color Categories

- **Brand Colors**: Primary — [hue name and approximate position, e.g., "deep teal, mid-saturation"];
  Secondary — used for supporting actions and navigation hover states, lower saturation than primary.
- **Semantic Colors**: Success (#--success), Warning (#--warning), Error (#--error),
  Info (#--info) — specific values determined during design token implementation in D05 tooling.
- **Neutral Palette**: Near-white background (#F8F9FA or equivalent) to reduce eye strain on
  long sessions; charcoal text (#1A1A2E or equivalent) for readability over pure black.

---

## Typography Strategy

### Typography Philosophy

- **Font Selection Strategy**: Primary font selected for screen readability at small sizes and
  brand alignment. Preference for variable fonts to minimize web font load. Monospace font chosen
  for data display and code, not as a stylistic element.
- **Hierarchy Philosophy**: Six heading levels defined but only three in common use (H1 page
  title, H2 section header, H3 subsection). Size, weight, and line height together establish
  level — not color or capitalization.
- **Readability Standards**: Body text at 16px minimum, 1.5 line height, maximum 75 characters
  per line on desktop. Captions and labels no smaller than 12px. Letter spacing loosened slightly
  at small sizes for legibility.

### Font System

- **Primary Font**: [Font name] — chosen for [specific reason: e.g., "humanist letterforms that
  read as approachable but not informal; excellent x-height for dense UI contexts"]. Loaded as
  variable font where available.
- **Secondary Font**: Not used — single-family hierarchy reduces load and enforces consistency.
- **Monospace Font**: [Font name] — used in data tables, code snippets, and numeric displays
  where column alignment matters.

---

## Layout & Component Strategy

- **Layout & Spacing**: 8px base spacing scale. CSS Grid for page-level layout; Flexbox for
  component-level alignment. Four primary breakpoints: 375px (mobile), 768px (tablet), 1280px
  (desktop), 1440px (wide). Content max-width capped at 1200px on wide screens to maintain
  line length.

- **Component Design**: Flat hierarchy with one level of depth (cards over a neutral surface).
  Interactive states are explicit: default, hover, active, focused, disabled — no ambiguity about
  whether an element is clickable. Form feedback is immediate and positioned adjacent to the
  triggering field, never at the top of the page alone.

- **Visual Assets**: Consistent icon set from [library name, e.g., "Heroicons outline style"];
  all icons from one library, one weight. Photography used only for real content, not
  decoration. Illustrations used for empty states and onboarding only.

- **Motion & Interaction**: Animations serve state change communication, not delight. Duration
  ceiling of 300ms for transitions; 150ms for micro-interactions. All motion respects
  `prefers-reduced-motion`. No auto-playing animation anywhere in the core product.

---

## Alternatives Considered

### Direction 1: [Name] — Not selected

[One-sentence description of this direction's positioning.]

Set aside because: [Specific reason it did not serve the product goals, audience, or
differentiator requirements — not because of aesthetic preference.]

### Direction 2: [Name] — Partially adopted

[One-sentence description of this direction's positioning.]

Set aside as the primary direction because: [Specific reason.] The following elements were
carried into the selected direction: [Specific elements and why they were worth preserving.]

---

## Open Questions

- [ ] Final typeface decision pending web font performance benchmarking against the
      performance budget in D05.
- [ ] Dark mode color values need contrast verification once design tokens are implemented.
- [ ] Icon library selection to be confirmed when component library is finalized.
