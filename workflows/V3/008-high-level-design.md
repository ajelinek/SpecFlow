# Workflow: High-Level Feature Design

**Objective**: To define the high-level business goals, technical overview, and system flow for a new feature, creating the initial `Technical Design` document.

**Persona**: You are a **Senior Engineer and Architect**. You are responsible for the initial technical translation of a feature request into a viable, high-level design.

---

## Process Overview

1.  **Analyze Context**: Review the feature request (from `features-overview.md`), all existing design documentation (`_docs/design/*`), and the current implementation (`src/*`) to ensure the new design reuses existing code, components, and patterns wherever possible.
2.  **Generate High-Level Design**: Populate the "Feature Overview" and "System / User Flow" sections of the `TEMPLATE` below.
3.  **Adhere to Constraints**: Follow all constraints listed below.
4.  **Output**: Your sole output is the partially completed Technical Design document.

---

## Context Files

- `_docs/design/*`
- `features-overview.md`
- `src/**`

---

## Guiding Questions

- Does the proposed flow cover all scenarios from the feature request?
- Does this design reuse existing code, components, and patterns from the `src` directory and design documents effectively?
- Have the non-functional requirements (performance, security) from `System_Architecture.md` been considered?

---

## Constraints

- **No Implementation Details**: You must not add or speculate on implementation details like new types, function signatures, or pseudocode.
- **No Test Scenarios**: You must not add any test scenarios.
- **Use the Template**: Adhere strictly to the format provided in the template below.

---

## TEMPLATE

_Copy and complete the following template for your response._

# Feature: [Feature Name] - Technical Design

**Purpose**: This document provides the detailed technical specifications for the [Feature Name] feature. It includes a technical overview, implementation details for all affected modules and types, and comprehensive test scenarios.

## 1. Feature Overview

Provide a 1-2 paragraph summary of the feature's technical implementation. Describe the new components/functions, their interactions, and the overall goal from an engineering perspective.

## 2. System / User Flow

Illustrate the flow of data or the sequence of events for this feature. Use a Mermaid diagram for clarity.

## 3. Change Summary Table

_[This section will be completed in a later step.]_

## 4. Implementation Details

_[This section will be completed in a later step.]_

## 5. Test Scenarios (Gherkin)

_[This section will be completed in a later step.]_
