# Workflow: Generating the UI Design

**Objective**: To create the `UI_Design.md` document, which outlines the comprehensive visual design system, user interface patterns, and design deliverables for the application.

**Persona**: You are a **Senior UI Designer**. You excel at creating cohesive design systems, establishing visual hierarchies, and translating business requirements into intuitive user interfaces.

---

## Process Overview

1.  **Analyze Context**: Review the `Project_Overview.md`, `System_Architecture.md`, `Data_Model.md`, `Backend_Architecture.md`, and `Frontend_Architecture.md` to understand the full business and technical context.
2.  **Design UI System**: Define the comprehensive design system including visual design elements, component patterns, and user interface guidelines. Your design must align with the established architecture and business goals.
3.  **Answer Guiding Questions**: Before writing the document, you must have clear answers to the questions below. If any information is missing, you must ask the user for it.
4.  **Use Template**: Populate the `TEMPLATE` section below. Your output should be only the completed markdown document.

---

## Context Files

- `_docs/design/Project_Overview.md`
- `_docs/design/Frontend_Architecture.md`

---

## Guiding Questions

_Before generating the document, you must consider the following questions. If the answer to any of these is unknown or unclear, you must ask the user for clarification before proceeding. The quality of the final document depends on having clear answers to these questions._

### Design System & Branding

1. What is the brand personality and tone of voice for this application?
2. Who are the primary competitors, and how should the design differentiate from them?
3. What are the accessibility requirements and target user demographics?
4. Should the design support both light and dark themes?

### Visual Design Elements

1. What color palette best represents the brand and supports the user experience goals?
2. What typography choices will ensure readability and establish visual hierarchy?
3. What iconography style and approach will be most effective for the target users?
4. How should spacing, layout, and visual rhythm be established?

### Component Design

1. What are the most critical user interface components that need detailed specifications?
2. How should interactive states (hover, focus, active, disabled) be designed?
3. What animation and transition patterns will enhance the user experience?
4. How should responsive design be implemented across different screen sizes?

### User Experience Patterns

1. What navigation patterns will best support the user flows identified in the project overview?
2. How should data visualization and complex information be presented?
3. What feedback patterns (loading states, error messages, success confirmations) are needed?
4. How should form design and validation be handled?

### Design Implementation

1. How will the design system be implemented in the chosen frontend framework?
2. What design tokens and CSS variables need to be established?
3. How should the design system scale as new features are added?
4. What tools and processes will be used for design handoff to development?

---

## TEMPLATE

_Copy and complete the following template for your response._

# UI Design

**Purpose**: This document outlines the comprehensive visual design system, user interface patterns, and design deliverables for the application. It serves as the single source of truth for all visual design decisions and implementation guidelines.

## 1. Design System Overview

Define the foundational design principles and brand guidelines that will guide all visual design decisions.

**Format**:

- **Brand Personality**: [Describe the brand's character, values, and emotional attributes]
- **Design Philosophy**: [Core design principles and approach to user experience]
- **Accessibility Standards**: [WCAG compliance level and accessibility requirements]
- **Responsive Strategy**: [Approach to designing across different screen sizes and devices]

**Example**:

- **Brand Personality**: Professional yet approachable, trustworthy, and efficient
- **Design Philosophy**: Clean, intuitive interfaces that prioritize user productivity and reduce cognitive load
- **Accessibility Standards**: WCAG 2.1 AA compliance, supporting screen readers and keyboard navigation
- **Responsive Strategy**: Mobile-first design with progressive enhancement for larger screens

## 2. Color System

Define the complete color palette with semantic meaning and usage guidelines.

**Format**:

### Primary Colors

- **Primary**: [Hex code] - [Usage description]
- **Primary Variants**: [Hex codes] - [Usage descriptions]

### Secondary Colors

- **Secondary**: [Hex code] - [Usage description]
- **Secondary Variants**: [Hex codes] - [Usage descriptions]

### Semantic Colors

- **Success**: [Hex code] - [Usage description]
- **Warning**: [Hex code] - [Usage description]
- **Error**: [Hex code] - [Usage description]
- **Info**: [Hex code] - [Usage description]

### Neutral Colors

- **Background**: [Hex codes for different levels] - [Usage descriptions]
- **Text**: [Hex codes for different emphasis levels] - [Usage descriptions]
- **Borders**: [Hex codes] - [Usage descriptions]

### Color Usage Guidelines

- [Specific rules for color application]
- [Contrast requirements]
- [Accessibility considerations]

## 3. Typography System

Define the typography hierarchy, font choices, and text styling guidelines.

**Format**:

### Font Family

- **Primary Font**: [Font name] - [Usage context]
- **Secondary Font**: [Font name] - [Usage context]
- **Monospace Font**: [Font name] - [Usage context]

### Type Scale

- **Display Large**: [Size/weight] - [Usage description]
- **Display Medium**: [Size/weight] - [Usage description]
- **Headline Large**: [Size/weight] - [Usage description]
- **Headline Medium**: [Size/weight] - [Usage description]
- **Headline Small**: [Size/weight] - [Usage description]
- **Title Large**: [Size/weight] - [Usage description]
- **Title Medium**: [Size/weight] - [Usage description]
- **Title Small**: [Size/weight] - [Usage description]
- **Body Large**: [Size/weight] - [Usage description]
- **Body Medium**: [Size/weight] - [Usage description]
- **Body Small**: [Size/weight] - [Usage description]
- **Label Large**: [Size/weight] - [Usage description]
- **Label Medium**: [Size/weight] - [Usage description]
- **Label Small**: [Size/weight] - [Usage description]

### Typography Guidelines

- [Line height and spacing rules]
- [Text alignment guidelines]
- [Readability considerations]

## 4. Spacing & Layout System

Define the spacing scale and layout principles.

**Format**:

### Spacing Scale

- **4px**: [Usage description]
- **8px**: [Usage description]
- **12px**: [Usage description]
- **16px**: [Usage description]
- **24px**: [Usage description]
- **32px**: [Usage description]
- **48px**: [Usage description]
- **64px**: [Usage description]
- **96px**: [Usage description]

### Layout Grid

- **Container Max Width**: [Maximum width for content containers]
- **Grid Columns**: [Number of columns for different breakpoints]
- **Gutters**: [Spacing between grid columns]
- **Margins**: [Outer spacing for containers]

### Breakpoints

- **Mobile**: [Width range] - [Layout considerations]
- **Tablet**: [Width range] - [Layout considerations]
- **Desktop**: [Width range] - [Layout considerations]
- **Large Desktop**: [Width range] - [Layout considerations]

### Interactive Components

#### Buttons

- **Primary Button**: [Visual description, states, usage]
- **Secondary Button**: [Visual description, states, usage]
- **Tertiary Button**: [Visual description, states, usage]
- **Icon Button**: [Visual description, states, usage]

#### Form Elements

- **Text Input**: [Visual description, states, validation styles]
- **Select Dropdown**: [Visual description, states, options display]
- **Checkbox**: [Visual description, states, usage]
- **Radio Button**: [Visual description, states, usage]
- **Toggle Switch**: [Visual description, states, usage]

#### Navigation

- **Navigation Menu**: [Visual description, states, responsive behavior]
- **Breadcrumbs**: [Visual description, states, usage]
- **Pagination**: [Visual description, states, usage]
- **Tabs**: [Visual description, states, usage]

## 6. Iconography & Imagery

Define the icon system and image guidelines.

**Format**:

### Icon System

- **Icon Style**: [Description of icon design approach]
- **Icon Library**: [Specific icon set or custom icons]
- **Icon Sizes**: [Standard icon sizes and usage]
- **Icon Colors**: [Color application rules for icons]

### Image Guidelines

- **Image Style**: [Photography or illustration approach]
- **Image Formats**: [Supported formats and optimization]
- **Image Sizes**: [Standard image dimensions]
- **Image Accessibility**: [Alt text and accessibility requirements]

## 7. Animation & Motion

Define animation principles and motion guidelines.

### Animation Principles

- **Purpose**: [When and why animations are used]
- **Duration**: [Standard animation durations]
- **Easing**: [Easing functions for different interactions]
- **Performance**: [Animation performance considerations]

### Motion Patterns

- **Page Transitions**: [Animation approach for page changes]
- **Component States**: [Animation for component state changes]
- **Loading Animations**: [Animation for loading states]
- **Micro-interactions**: [Small animations for user feedback]
