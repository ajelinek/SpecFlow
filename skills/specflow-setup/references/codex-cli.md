# Codex CLI adapter

**Research baseline: 2026-10-30. Refresh on every invocation.** Current and older Codex releases
differ substantially in agent definitions, profiles, and multi-agent controls.

## Official sources

- Subagents: https://developers.openai.com/codex/agent-configuration/subagents
- Skills: https://developers.openai.com/codex/build-skills
- Instructions: https://developers.openai.com/codex/agent-configuration/agents-md
- Config basics: https://developers.openai.com/codex/config-file/config-basic
- Advanced config: https://developers.openai.com/codex/config-file/config-advanced
- Reference: https://developers.openai.com/codex/config-file/config-reference
- Schema: https://developers.openai.com/codex/config-schema.json
- Models: https://developers.openai.com/codex/models
- CLI: https://developers.openai.com/codex/cli/reference
- Approvals: https://developers.openai.com/codex/agent-approvals-security
- Release-matched schema/source when needed: https://github.com/openai/codex/releases

## Discovery and translation

- Current project agents: `.codex/agents/*.toml`; personal: `~/.codex/agents/*.toml`.
  Respect `CODEX_HOME` and current discovery rules.
- Each standalone agent requires nonempty `name`, `description`, and `developer_instructions`.
  Translate the complete canonical Markdown contract into a correctly escaped TOML string.
  `name` is identity, not filename; avoid overriding built-ins accidentally.
- Current skills: `.agents/skills/<id>/SKILL.md` in repository scopes and
  `~/.agents/skills/` for the user. Do not assume `.codex/skills/` is the current authoring path.
  Existing symlinked skills can work; adaptations must not mutate their shared source.
- `agents/openai.yaml` inside a skill is skill metadata/policy, **not** a custom subagent definition.
- Configuration: `.codex/config.toml` and `$CODEX_HOME/config.toml`. Trusted project layers and
  managed requirements affect effective behavior. Do not grant project trust automatically.

Illustrative standalone-agent skeleton; fill it with the actual contract and confirmed model:

```toml
name = "reviewer"
description = "Review the supplied scope and criteria without fixing findings."
developer_instructions = """
The complete translated reviewer contract goes here.
"""
```

This is **not** a complete installable worker. Older releases may instead require explicit
`[agents.<role>]` / `config_file` declarations. Select the installed mechanism; do not generate both
unnecessarily or feed standalone metadata to a schema that only describes session configuration.

## Models, skills, and delegation

Discover account-accessible choices with `/model`, current `codex debug models` where supported,
or an already available initialized app-server `model/list` interface. Follow pagination and supported
reasoning-effort metadata. A bundled model catalog or public API model list is not access proof.

Current custom files support `model` and `model_reasoning_effort`. Agent-file settings can override
spawn/default routing. A file setting only model can preserve an already resolved, incompatible effort:
choose/confirm a compatible effort too. Preserve the main-session model and existing defaults.

Current docs say multi-agent is enabled by default; do not blindly enable an experimental flag from
old recipes. Skills can request subagents, but skill loading alone is not isolation. Children inherit
skills subject to runtime controls; verify which instructions and required standards they actually get.
Use current collaboration tools, not nested `codex exec` processes as a substitute for agent spawning.

Nesting is version/backend-sensitive. The official `rust-v0.162.1` source describes `agents.max_depth`
as V1-only, ignored by V2; narrative docs do not establish a universal depth guarantee. Do not assume
that a parsed max_depth setting enables the needed nesting. Check the installed release and smoke-test
the actual adapted chain if approved. Concurrency and depth are different limits.

## Instructions and safety

`AGENTS.override.md` can replace `AGENTS.md` at the same scope. Guidance discovery, size budgets,
and session startup timing matter. Verify root and `.specflow/` instructions in worker context;
do not assume every nested file is eagerly read from the project root. Restart may be needed.

Custom workers inherit parent sandbox/approval/provider/MCP boundaries. Putting `sandbox_mode` or
`approval_policy` in the agent file does not establish a stricter child sandbox. Read-only developer
instructions are behavioral constraints, not an enforced security boundary. Current supported feature
reductions may narrow tools; consult the release's agent docs before using them.

Existing `.agents` and `.codex` directories can be protected read-only even in workspace-write mode.
Explain and request the specific protected-path write rather than changing sandbox policy. Do not use
`--yolo`, obsolete `--full-auto`, or fabricate approvals. Provider/auth changes are out of scope.

## Validation

Start with `codex --version`, `--help`, and help for any proposed debug command. Current leads include
`codex debug models`, `codex features list`, `/status`, `/debug-config`, `/warnings`, and `/skills`.
No general `codex config validate` was established. Use a matching parser/schema where available;
configuration and standalone agent files need their respective validation rules.

An authorized read-only ephemeral model run can test discovery/delegation but still consumes tokens,
can contact services, and can update local runtime state. Explicitly constrain it to inert tasks;
do not execute a real SpecFlow feature. Static parse success is not behavioral verification.
