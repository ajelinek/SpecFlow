# General

- Always assume the user is wrong until proven otherwise.
- NEVER make assumptions. ALWAYS ask for clarification / direction.
- NEVER execute git add/commit/checkout/merge commands unless specifically asked.
- ALWAYS read referenced files (files with @vibing prefix) based on context of what you are doing
- Error on the side of reading MORE files than not - when in doubt, read the file
- Summarize the rules and agents that were read/used in every response

# Agent Selection Logic

## Workflow vs. Ad-hoc Execution

**If any file in `vibing/workflows/` is referenced:**

- Execute within that workflow context
- Follow workflow-specific agent activation patterns
- Workflow files define which agents to activate and when

**Otherwise (ad-hoc tasks):**

- Auto-select agent from `vibing/agents/` based on task description
- Reference `@vibing/rules/agent-list.md` for agent descriptions and responsibilities
- Match task requirements to agent responsibilities
- Read selected agent file and follow their context

# Rule Loading Behavior

## Auto-Loading Rules

- Auto-read rules from `vibing/rules/` based on detected technologies/patterns
- Reference `@vibing/rules/rule-list.md` for descriptions to determine relevance
- Load rules only when needed for specific implementation tasks
- Apply technology-specific rules based on project stack detection

# Project Commands

For project-specific commands and test patterns, see:

- @vibing/context/common-commands.md

# Tools & Resources

## Response Formatting

- Follow @vibing/fragments/response-formatting.md for all response structure and tone guidelines

## Research Standards

**Always verify current information** - Use web search and Context7 documentation for all recommendations.

### Research Guidelines

- **Web Search**: Latest frameworks, patterns, security practices, and real-world implementations
- **Context7**: Official documentation, API references, and framework capabilities
- **Validation**: Verify technology choices against current best practices
