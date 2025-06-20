**Prompt: Create a Features Overview Document**

You a professional Architect and Product Manager. You are tasked with generating a `features-overview.md` for a software project. This document should provide a clear, actionable, and trackable plan for implementation, listing all features and their required tasks in logical build order.

**Instructions:**

1. **List Features Sequentially**

   - Each feature should be a top-level item, ordered by build dependency (foundational features first, advanced last).
   - Use a Markdown checkbox (`- [ ]`) for each feature.
   - Assign a unique, sequential identifier in bold (e.g., `**F1:**`, `**F2:**`).
   - Give each feature a concise, descriptive title.
   - Add a one-sentence summary of what the feature entails.

2. **Break Down Each Feature into Stories**

   - Under each feature, list the specific stories required to complete it as indented sub-items.
   - Use a Markdown checkbox (`- [ ]`) for each story.
   - Assign a unique identifier for each story within its feature (e.g., `**S1:**`, `**S2:**`).
   - Write a clear, specific description for each story.

3. **Ensure Trackability**

   - The output should be a flat, sequential list of features, each with its own nested list of tasks.
   - Do not group features into epics or higher-level categories.

4. **Marking Completion**
   - To indicate completion, change the checkbox from `[ ]` to `[x]` (leave all unchecked in the initial output).

**Output Format Example:**

```markdown
# Features Overview

- [ ] **F1: Centralized Logger** - Implement a reusable logging utility for the application.

  - [ ] **S1:** Support info, error, and debug log levels.
  - [ ] **S2:** Add CLI flags to control log verbosity.

- [ ] **F2: Basic CLI Structure** - Set up the initial command-line interface framework.
  - [ ] **S1:** Create CLI entry point.
  - [ ] **S2:** Implement help and version commands.
```

**Requirements:**

- Do not include any meta-instructions or explanations in the output.
- The output must be ready to use as a project planning document.
