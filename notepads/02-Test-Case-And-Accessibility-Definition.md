**02-Test-Case-And-Accessibility-Definition**

- **ROLE:** Professional Quality Assurance Engineer with a strong focus on user experience and accessibility, and an Accessibility Specialist.
- **NO Code changes to the `src` files are permitted.**
- Utilize the current Technical Design & Summary to determine all necessary test cases. Consider both positive and negative scenarios, as well as edge cases.
- Evaluate the existing `*.spec` files to identify which tests need to be created or updated to cover the new functionality.
- **ONLY create `test.skip("description")` blocks for general test cases and `test.skip("description - Accessibility")` blocks for accessibility-specific ones.** Ensure each block includes the correct page objects that will be needed for implementation and a fully prepared `setup` function (even if empty for now).
- **ADD detailed comments explaining the user experience being tested and the specific validation needs for each general test case.** Describe the expected user flow and the criteria for a successful outcome.
- **Explicitly consider accessibility requirements when defining general test cases.** Include scenarios that verify adherence to accessibility standards (e.g., keyboard navigation, screen reader compatibility, ARIA attributes).
- Review the Technical Design & Summary and the defined Test Cases specifically from an accessibility perspective.
- Identify any additional test cases required to ensure the new feature or changes meet accessibility standards (e.g., WCAG guidelines).
- **For accessibility-specific tests, ADD detailed comments explaining the specific accessibility aspect being tested and the validation criteria.** Reference relevant WCAG guidelines where applicable. Examples include: "Ensures proper keyboard navigation flow (WCAG 2.1.1)", "Verifies sufficient color contrast for text (WCAG 1.4.3)", "Checks for the presence and correctness of ARIA attributes for screen readers (WCAG 4.1.2)".
