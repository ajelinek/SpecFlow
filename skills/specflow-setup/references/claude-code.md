# Claude Code adapter

**Research baseline: 2026-10-30. Refresh these official sources on every invocation.** Paths and
examples below are leads for the installed version, not an evergreen generated template.

## Official sources

- Index: https://code.claude.com/docs/llms.txt
- Agents: https://code.claude.com/docs/en/sub-agents.md
- Skills: https://code.claude.com/docs/en/skills.md
- Models: https://code.claude.com/docs/en/model-config.md
- Settings: https://code.claude.com/docs/en/settings.md
- Settings reference: https://code.claude.com/docs/en/settings-reference.md
- Permissions: https://code.claude.com/docs/en/permissions.md
- Instructions: https://code.claude.com/docs/en/memory.md
- CLI: https://code.claude.com/docs/en/cli-reference.md
- Validation: https://code.claude.com/docs/en/plugins/cli-reference.md
- Changelog: https://code.claude.com/docs/en/changelog.md

## Discovery and translation

- Project skills/agents: `.claude/skills/<id>/SKILL.md`, `.claude/agents/<id>.md`.
- User skills/agents: `~/.claude/skills/`, `~/.claude/agents/`.
- Settings: `.claude/settings.json` shared; `.claude/settings.local.json` local;
  `~/.claude/settings.json` user. Respect managed/CLI overrides and configured homes.
- Native agent Markdown uses `name`, `description`, `model`, `effort`, `tools`, `disallowedTools`,
  `permissionMode`, `maxTurns`, and `skills` where supported. The body is the worker instruction.
  Agent identity comes from `name`. Existing bundled agents are closest to this native format.
- `model: inherit` and family aliases are not version pins. Confirm availability and effort for the
  user's provider. Discover through `/model` or an already available SDK `supportedModels()` interface;
  there is no established universal `claude models list` command.
- Invocation-level models can override configured worker models. Inspect blanket subagent environment
  overrides, including FORCE behavior, without changing them silently. Report effective conflicts.

## Isolation, skills, and instructions

`context: fork` creates a fresh skill child, **not** a conversation-history clone. `agent:` selects
its worker persona; omitting it normally selects general-purpose. Agent `skills:` preloads bodies,
not an access allowlist. Children can load skills using their available Skill tool; parent-loaded
bodies are not automatically carried over. Reference skills stay inline.

Recent documentation describes forked skills as normally backgrounded; use the documented synchronous
mechanism (for example, `background: false` where supported) or explicitly await results. Sequential
review/fix/validation must not overlap because the skill returned early.

The research baseline documents three child layers by default and
`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` for supported versions. Older releases allowed only one layer.
Do not hardcode either default. SpecFlow's unflattened cleanup chain can need five child layers.
Prefer shallow routing; ask specifically before changing depth, without presenting the full setup plan.

Native `AGENTS.md` support is version-dependent. Current docs describe CLAUDE-family files suppressing
automatic AGENTS loading unless configured otherwise. A `CLAUDE.local.md` can therefore hide shared
guidance. Verify the installed behavior and existing files before adding a bridge. If required and
approved, a relative `@AGENTS.md` import avoids copying shared guidance. Verify nested
`.specflow/AGENTS.md` too; a root bridge is not proof of nested loading.

At this baseline project agents override user agents, but personal skills override project skills.
Check both collision rules live rather than assuming one precedence applies to everything.

## Safety and validation

Settings are strict JSON, not JSONC. Preserve permission arrays and deny/ask behavior; no blanket
`Bash(*)`, bypass mode, or broad Agent grants. A reviewer with Bash access is not sandboxed read-only.
Worker `permissionMode` is not necessarily stronger than its parent's mode.

Inspect `claude --version` and installed help first. Current docs describe `claude doctor` and
`claude plugin validate .claude/agents --strict --json` (similarly skills) on compatible releases.
Manifestless validation and JSON output were added at different versions; validate real directories
when symlinks are skipped. Do not invent a general settings-validation command.

Current `claude agents --json` lists background sessions, not custom definitions; `/agents` behavior
has changed across versions. Verify discovery through current supported interfaces, `/skills`,
`/context`, `/tasks`, or debug output as appropriate. Do not run `--init-only` as a harmless parser:
it can execute hooks. New agent directories or instruction changes may need a fresh session.
