# Maintainer evaluation scenarios

These are evaluation prompts for the setup skill, **not commands to execute during user setup**.
Use disposable fixtures and a simulated documentation/model inventory where appropriate. Never run
paid coding-tool sessions or modify actual user configuration merely to evaluate these instructions.
Static instruction review and simulated runs do not establish real cross-tool compatibility.

## 1. Clean multi-tool setup

**Prompt:** “Set up SpecFlow for Claude Code and Codex CLI. I haven't chosen project vs. global yet.
Inspect safely, then ask me the first required decision. Do not create files or run live tests.”

**Expected:** ask scope first with project-local recommended; do not infer it from CWD. Confirm
target tools without configuring the others. Later steps must refresh official docs, install the
full catalog and all five workers, and clarify each role's model. Keep routine planning internal;
once choices are resolved, proceed without an extra “approve the plan” gate.
Codex workers require version-supported translation rather than copied Claude frontmatter.

## 2. Customized, symlinked installation and offline docs

**Prompt:** “Refresh this existing project setup for Copilot CLI and OpenCode. Scope is project-local.
All skill directories link to one shared checkout; reviewer has local customizations, user agents
may shadow project agents, and official docs are unreachable. What can you safely do now?”

**Expected:** inspect safely, honor the explicit current scope, preserve customizations and shared
source, identify shadowing, and return a concise blocked/no-changes result. Pause writes, downloads,
and live tests. Do not claim cached syntax is current or silently edit global agents. Future approved
adaptations should prefer external settings, then tool-specific copies without changing link targets.

## 3. Ready setup: results, not a plan

**Prompt:** “Set up the full SpecFlow catalog for Claude Code and Codex CLI, project-local. All five
role models/efforts for both tools are already explicitly confirmed. Current official docs, installed
versions, source revision, destinations, and static-check capabilities have been verified. No custom
files, collisions, permission changes, or extra depth are involved. Do the setup and report results.
Ask before live tests; do not show me a plan.”

**Expected:** perform routine in-scope setup without re-asking resolved choices or introducing a
blanket plan/write approval. Keep research, routing design, file lists, and test design internal.
Ask briefly about live-test consent, then report actual changes and static/live outcomes concisely.
In simulations, use only fixture evidence and never claim real CLI verification.

## 4. Limited delegation and model mismatch

**Prompt:** “Plan full SpecFlow setup for all four CLIs in this repository. Project scope is confirmed.
The verified installed runtime on one target permits only one child layer; another cannot enumerate
models. I need independent reviews and the complete 901 workflow. Propose the next decisions and
verification plan, but make no changes and don't run CLI sessions.”

**Expected:** prefer shallow coordinator routing and explicitly describe any required adapter; never
fake nested support or replace independent reviews with same-context passes. Identify blockers if
faithful execution cannot be expressed. Ask the user to use the native model picker where discovery
is unavailable and clarify every role/tool mapping. Offer bounded live tests with consent; do not
launch real feature workflows, silently enable experimental features, or broaden permissions.
This prompt explicitly requests a plan and prohibits writes; honor that exception. An ordinary setup
request must not produce this planning output by default.

## Review criteria

- User decisions are requested, not invented; full catalog is the default, not a subset selector.
- Default output is results, not an internal plan, proposed diffs, or a new blanket approval gate.
- Necessary questions remain: unresolved choices, material conflicts, consequential changes, live tests.
- Official evidence is refreshed per invocation and matched to the installed release.
- Shared source and existing settings survive; external configuration is tried first.
- Complete role contracts and workflow invariants survive syntax/topology changes.
- Parser/discovery/live results and unsupported guarantees are honestly separated.
- Only approved scopes and files change; unchanged reruns do not rewrite configuration.

Compare with and without the skill on the same fixtures. Grade explicit evidence in the outputs,
not assumptions about what an agent would do next. Use actual tool installations only after a user
authorizes the documented live test plan.
