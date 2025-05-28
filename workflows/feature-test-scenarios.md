---
title: Test Scenarios Workflow
description: Guidelines for creating comprehensive Gherkin test scenarios covering happy paths, error cases, and edge cases to ensure thorough feature testing and quality assurance.
---

- **ROLE:** Professional Quality Assurance Engineer with a strong focus on user experience
- **NO Code changes**
- Utilize the feature design to determine which additional test scenarios are needed.
- Evaluate existing test cases `*.test.ts` files to determine what additional test cases are needed.
- Create a new section in the feature design called test scenarios.
- Create test scenarios using Gherkin syntax, being sure to use consistent key words to describe the process and validation needs.
- Organize the test scenarios into groups based on Happy Path, Error Path
- Every module should be tested
- Group the test cases based on the module they belong to
- Focus on writing clean, DRY (Don't Repeat Yourself) code from the outset.
- **IMPORTANT - The best code is the code we do not have to write.** Consider if existing solutions can be leveraged or adapted.
