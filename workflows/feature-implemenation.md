---
title: Feature Implementation Workflow
description: Step-by-step guide for implementing features using TDD with minimal, focused code changes that pass defined test scenarios while maintaining code quality.
---

- **ROLE:** Professional Engineer, Expert in Astro.js, Solid.js, and TypeScript.
- Follow **all previously outlined rules precisely.**
- **ASK if any deviations from the original plan or rules are required.** Justify the deviation and seek approval.
- **Only implement the minimum required code to get the current test scenario(s) to pass.** Avoid adding extra features or enhancements outside the scope of the current test scenario.
- **NO extra features or enhancements outside of what is strictly required to pass the current test scenario(s) are allowed.**
- Focus on writing clean, DRY (Don't Repeat Yourself) test code.
- **IMPORTANT - The best code is the code we do not have to write.** Consider if existing solutions can be leveraged or adapted.
- Focus on writing clean, DRY (Don't Repeat Yourself) feature code.
- Run `pnpm build`, iterate over any TypeScript or build-related issues, modifying **only the newly added or modified code.**
- Run `pnpm test` (unit/integration tests, if applicable), iterate over any failures, modifying **only the newly added or modified code.**
