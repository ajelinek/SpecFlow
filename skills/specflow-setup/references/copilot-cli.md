# GitHub Copilot CLI adapter

**Research baseline: 2026-10-30. Refresh on every invocation.** Target the standalone `copilot` CLI,
not VS Code, the cloud coding agent, or SDK-only configuration fields.

## Official sources

- Agents: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli
- Skills: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills
- CLI reference: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
- Configuration: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference
- Programmatic use: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-programmatic-reference
- Permissions: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools
- Cross-surface fields: https://docs.github.com/en/copilot/reference/custom-agents-configuration
- Discovery: https://docs.github.com/en/copilot/how-tos/copilot-sdk/features/customization-locations
- Release evidence: https://github.com/github/copilot-cli/blob/main/changelog.md

## Discovery and translation

- Project agents: `.github/agents/<id>.agent.md`; user agents: `~/.copilot/agents/`.
  `.claude/agents/` is also discovered on supported releases. Avoid duplicate installations.
- CLI agent IDs derive from paths, not display `name`; nesting can alter the ID. At this baseline,
  personal agents override project agents. Resolve shadowing before claiming project setup works.
- Project skills include `.github/skills/`, `.agents/skills/`, and `.claude/skills/`; user discovery
  includes `~/.copilot/skills/` and `~/.agents/skills/`. Verify current priority and custom roots.
- User settings: `~/.copilot/settings.json`; repository settings:
  `.github/copilot/settings.json`; local overrides: `.github/copilot/settings.local.json`.
  Respect `COPILOT_HOME`. `config.json` is internal application state at the baseline, **not** the
  settings destination. Repository settings accept only a subset of user keys.
- Agent `description` is required. Use supported CLI tool names/aliases rather than copying Claude
  tool names verbatim. `strict-tools-list: true` is documented for avoiding implicit tool additions;
  verify it in the installed release before relying on restrictions.
- Set `include-custom-instructions: true` on delegated custom workers where supported, so repository
  guidance follows them. Main-session instructions are not necessarily inherited by built-in workers.

## Known official-documentation conflicts

At research time, official sources disagree on:

- Agent model fields: `model` vs. `models`; `modelPolicy` vs. `model-policy`;
  `reasoningEffort` vs. `reasoning-effort`.
- Default/max nesting: reference tables say 6/256; environment/changelog evidence says 4/128.
- Extra `agentDirectories`/`skillDirectories`: documented on a customization discovery page but
  omitted from the main repository-key table.

These conflicts are **not choices to guess**. Check installed help/release evidence and effective
discovery. Use only a verified supported mechanism, or mark the capability blocked/unverified.
Do not emit every spelling hoping one works. Do not assume SDK object fields work in CLI Markdown.

Discover models through `/model` and inspect `/subagents` overrides where available. User settings
document `subagents.agents.<id>.model` and `effortLevel` at this baseline. This may allow external
model routing without modifying agent Markdown; verify scope support. Required-model policy and Auto
mode affect fallback/overrides. Explain any mismatch between requested and actually resolved models.

## Skills and instructions

Skill invocation ordinarily loads into the invoking context. Claude-style `context: fork` is not an
established CLI isolation mechanism. Use explicit fresh-agent dispatch and complete briefs when
independence is required. Verify that the child can load the real skill; parent-loaded skills are not
a portable inheritance guarantee. `allowed-tools` grants approval rather than restricting tools.

CLI docs describe merged `AGENTS.md`, CLAUDE-family, and Copilot instructions. Preserve existing
sources, check what the worker actually inherits, and avoid duplicating shared guidance into every
file. Restart/reload behavior varies; adding agents may require restarting the CLI.

## Safety and validation

Do not write provider secrets or saved approvals. Do not emit Claude `permissions.allow` into
Copilot settings. Tool visibility, operation approvals, and project trust are separate mechanisms;
`--trust-folder` does not grant tool permissions. No `--yolo` or blanket shell approvals.

Start with `copilot --version`, `copilot --help`, and `copilot help config`. Where installed help
confirms support, inspect `copilot skill list --json`, `copilot instruction list --json`, and
`copilot config --list --json` (repository/local variants as needed). Do not print sensitive values.
Current live-session interfaces include `/env`, `/agent`, `/skills`, `/instructions`, `/model`,
`/subagents`, and the `/settings` Problems tab. No general `copilot agent validate` was established.
Do not use `copilot init` as inspection; it writes instructions. A live session requires approval.
