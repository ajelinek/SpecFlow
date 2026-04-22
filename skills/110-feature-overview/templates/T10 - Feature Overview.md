<!--
  TEMPLATE INSTRUCTIONS (remove this block before committing the filled document)

  This template structures D10-feature-overview.md.
  - Add one section per capability, identified by C001, C002, etc.
  - Add one subsection per feature, identified by F-prefixed IDs (F001, F002, ...)
  - Feature IDs are globally unique across the entire project — never reset per capability
  - Assign the next available F-number when adding a new feature; never reuse a retired ID
  - Status: use 🔵 To Do | 🟡 In Progress | 🟢 Done for both capabilities and features
  - Bullets: 3–6 items per feature; each describes a behavior or rule, not an implementation task
  - Dependencies: list F-IDs only (e.g., F001, F003); use "None" if there are none
  - No implementation detail anywhere (no frameworks, SQL, file names)
  - Capability names must use customer-facing language, not technical layer names
-->

# D10 — Feature Overview

**Product**: [Product name from D01]
**Last updated**: [Date]

---

## Summary

See `.specflow/docs/D01-project-overview.md` for the full product vision and value proposition.

[One sentence: the specific scope of this feature overview — full product, or a named area.]

---

## 🔵 C001 — [Capability Name]

_[One sentence: what this capability covers and why it matters to users or the business.]_

### 🔵 F001 — Feature Name

[One sentence: what this feature delivers.]

- [Behavior the feature must satisfy]
- [What happens when the user does X]
- [Constraint, validation, or permission rule that shapes the feature]
- [How the result surfaces to the user — brief, not a layout spec]
- [Edge case or error state the feature must handle]

**Dependencies**: None

---

### 🔵 F002 — Feature Name

[One sentence: what this feature delivers.]

- [Behavior the feature must satisfy]
- [What happens when the user does X]
- [Data the feature reads, creates, or modifies]
- [Constraint or rule that shapes behavior]

**Dependencies**: F001

---

## 🔵 C002 — [Next Capability Name]

_[One sentence: scope and value of this capability.]_

### 🔵 F003 — Feature Name

[One sentence: what this feature delivers.]

- [Behavior]
- [Behavior]
- [Constraint or rule]

**Dependencies**: F002

---

<!--
  Continue this pattern for each capability.
  Features within a capability: foundational slices first, dependent features after.
  Aim for 3–8 features per capability. If a capability has more than 10, split it.
  Total capabilities for a typical product: 3–7.

  Status key:
  🔵 To Do | 🟡 In Progress | 🟢 Done
-->
