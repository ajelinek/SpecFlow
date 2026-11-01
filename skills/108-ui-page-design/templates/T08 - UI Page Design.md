<!--
Use only applicable bullets and sections. Keep decisions short and project-specific.
The mockup owns visual detail; this document owns page-specific route/parameter and behavior notes.
List each represented route/view, even when several share the mockup. Preview links select that view.
Parameters: distinguish path from search/query; record meaning/type, requiredness, defaults, and relevant
history/invalid-value behavior where known. Use "None" only when confirmed; otherwise mark unknowns.
Preview hash presets are review controls, not application URL parameters.
Cover every named flow, not only the happy path. Include applicable loading, empty, error, success,
validation, permission, and overlay states with links to rendered HTML previews, not prose substitutes.
Reference D03/D06/D07 and domain findings rather than repeat their content.
Record all three design directions briefly, the selected approach, and why the others lost.
Omit Open Questions when there is nothing meaningful to record.
Remove this block, examples, placeholders, and empty optional sections before writing.
-->

# [Page / Page Family] — Page Design

[All page designs](../index.html) · [Mockup](mockup.html)

## 1. Page Context

[One or two sentences: users, purpose, and primary actions. Name the related views covered by this design.]

- **Entry & exit**: [Where users come from and go next; reference shared navigation.]
- **Access & role differences**: [Who can view/change what; reference actual enforcement separately.]
- **Design references**: [Governing visual/interaction decisions and relevant domain findings.]
- **Preview controls**: [How to select states and responsive/role variants; note simulation limits.]

## 2. Routes & Parameters

### [Page / View]

- **Application route**: [Route pattern; mark proposals.]
- **Path parameters**: [Name, meaning/type, and requiredness; or None/Unknown.]
- **Search parameters**: [Name, meaning/type, requiredness, and default/omission behavior; or None/Unknown.]
- **Preview**: [Open view](mockup.html#[working-preset])
- **URL behavior**: [Relevant entry defaults, invalid/missing values, Back/return behavior, and which state is not in the application URL.]

## 3. Key Data

- **[Displayed, entered, or submitted data]**:
  - **Source**: [Known source; reference contracts instead of inventing endpoints.]
  - **Behavior / rule**: [Requiredness, formatting, or non-obvious constraint.]

## 4. States & Interactions

### [Flow / State]

- **Entry / action**: [How the user reaches this state or flow.]
- **Outcome / recovery**: [What changes, how failures recover, and whether input is preserved.]
- **Role differences**: [Relevant visibility or editability differences; omit if none.]
- **Preview**: [Open state](mockup.html#[working-preset])

## 5. Alternatives Considered

- **Selected — [Direction]**: [Why it best serves the brief.]
- **[Other direction]**: [Why it was not selected; any element borrowed.]
- **[Other direction]**: [Why it was not selected; any element borrowed.]

## 6. Open Questions

- [ ] [Unresolved choice or unverified check, its impact, and what would resolve it.]
