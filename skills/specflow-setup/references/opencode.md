# OpenCode adapter

**Research baseline: 2026-10-30. Refresh on every invocation.** Distinguish V1 and V2 before choosing
configuration syntax. The shared live schema can contain both current and deprecated fields.

## Official sources

- V1: https://opencode.ai/docs/agents/ ; https://opencode.ai/docs/skills/
- V1 configuration: https://opencode.ai/docs/config/
- V1 models/CLI: https://opencode.ai/docs/models/ ; https://opencode.ai/docs/cli/
- V1 permissions/instructions: https://opencode.ai/docs/permissions/ ; https://opencode.ai/docs/rules/
- V2 agents/skills: https://opencode.ai/v2/docs/agents/ ; https://opencode.ai/v2/docs/skills/
- V2 configuration: https://opencode.ai/v2/docs/config/
- V2 migration: https://opencode.ai/v2/docs/migrate-v1/
- V2 models/CLI: https://opencode.ai/v2/docs/models/ ; https://opencode.ai/v2/docs/cli/commands/
- V2 instructions: https://opencode.ai/v2/docs/instructions/
- V2 permissions/policies: https://opencode.ai/v2/docs/permissions/ ; https://opencode.ai/v2/docs/policies/
- Live schema: https://opencode.ai/config.json

## Discovery and translation

Project agents: `.opencode/agents/<id>.md`; user: `~/.config/opencode/agents/`.
Project skills: `.opencode/skills/<id>/SKILL.md`; user: `~/.config/opencode/skills/`.
Both versions also document `.claude/skills/` and `.agents/skills/` families. Inspect existing
discovery before copying. Preserve complete skill directories and use explicit `mode: subagent`.

Prefer existing compatible configuration; do not migrate unrelated V1 files just to install workers.

| Mechanism | V1 | Native V2 baseline |
| --- | --- | --- |
| Agent map / prompt | `agent` / `prompt` | `agents` / `system` |
| Agent permissions | `permission` object | `permissions` ordered rule array |
| Shell / delegation action | `bash` / `task` | `shell` / `subagent` |
| Disabled field | `disable` | `disabled` |
| Depth | `subagent_depth` | `experimental.subagent_depth` |

Markdown bodies supply the prompt; do not duplicate them into frontmatter. Convert each agent entry
or file's frontmatter as a whole. V2 detects fields such as `permissions` as native syntax and then
ignores legacy `tools`/`permission` fields in the same entry. Accepted legacy schema does not imply
that every field still affects execution. V2 agent `request` settings are documented as preserved but
not sent; configure supported provider/model variants instead, only as approved.

Native V2 rule shape, **illustrative only**:

```json
{"action": "edit", "resource": "*", "effect": "deny"}
```

Later matching permission rules can win. Policies have different authority rules. Merge carefully;
do not append broad allows that undo restrictions. Child agents use their own permissions in V2:
restricting the parent is not proof its children have the same boundary.

## Routing, models, and instructions

An agent model may be `provider/model#variant`. Discover with the host's advertised model tool or
`opencode models` / `/models`; check supported flags rather than assuming `--refresh` exists.
Refreshing a cache is a mutation, not passive inspection. Selected session models and worker model
settings have distinct precedence; avoid global model changes. Validate model-specific variants.

Skill frontmatter is not a portable isolation policy. Use documented agent/command delegation or
explicit worker dispatch with complete skill briefs. Reference skills stay inline. Child contexts
are fresh; provide required skills/instructions explicitly. Never assume a generic worker may itself
delegate: at this baseline V2 `general` denies child launches, independent of the depth setting.

The documented default depth at this baseline is one child layer. Derive required depth from the
adapted workflow and check both depth and caller delegation permissions. V2 delegated commands can
background automatically; await completion before using artifacts or advancing gates.

V2 extra skill sources use a `skills` array; V1 uses a paths/URLs object. V2 relative sources resolve
from the active working directory, so default discovery may be safer. Duplicate skill IDs can shadow
one another. Keep explicit source paths stable and verify the effective skill body.

Use shared `AGENTS.md`. V2 does not currently load the old `CLAUDE.md` fallback. Nested instructions
load as relevant files/directories are accessed; point to `.specflow/AGENTS.md` where necessary and
verify actual worker loading. Preserve legacy guidance rather than removing or migrating it silently.

## Safety and validation

V1 and V2 differ in outside-project access defaults. Do not broaden access as a side effect of
translation. Edit denial cannot prevent shell writes. Supported V2 JSON/JSONC config sources merge;
managed settings/policies can override local choices. Do not restart/reload the shared service or
change configuration homes without approval.

Inspect `opencode --version`, `--help`, `debug --help`, and `models --help` first. Current leads:
`opencode debug paths`, `opencode debug config`; V1 `opencode agent list` and `debug skill`;
V2 `opencode debug agents`. Outputs/availability differ: V2 debug config can list sources rather
than a resolved object. No universal `opencode validate` was established. Schema/discovery checks
are not proof of nested dispatch, model access, or permission enforcement.
