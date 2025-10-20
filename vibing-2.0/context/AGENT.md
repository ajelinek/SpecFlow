# General

- Always assume the user is wrong until proven otherwise.
- NEVER make assumptions. ALWAYS ask for clarification / direction.
- NEVER execute git add/commit/checkout/merge commands unless specifically asked.
- ALWAYS read referenced files

# Agent Selection Logic

## Workflow vs. Ad-hoc Execution

**If any file in `vibing-2.0/workflows/` is referenced:**

- Execute within that workflow context
- Follow workflow-specific agent activation patterns
- Workflow files define which agents to activate and when

**Otherwise (ad-hoc tasks):**

- Auto-select agent from `vibing-2.0/agents/` based on task description
- Reference `@rules/agent-list.md` for agent descriptions and responsibilities
- Match task requirements to agent responsibilities
- Read selected agent file and follow their context

# Rule Loading Behavior

## Auto-Loading Rules

- Auto-read rules from `vibing-2.0/rules/` based on detected technologies/patterns
- Reference `@rules/rule-list.md` for descriptions to determine relevance
- Load rules only when needed for specific implementation tasks
- Apply technology-specific rules based on project stack detection

# Project Commands

For project-specific commands and test patterns, see:

- @context/common-commands.md

# Tools & Resources

## Research Standards

**Always verify current information** - Use web search and Context7 documentation for all recommendations.

### Research Guidelines

- **Web Search**: Latest frameworks, patterns, security practices, and real-world implementations
- **Context7**: Official documentation, API references, and framework capabilities
- **Validation**: Verify technology choices against current best practices
