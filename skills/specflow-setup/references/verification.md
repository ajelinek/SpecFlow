# Verification and handoff

Verify each target independently. A valid file is not proof that the intended tool loaded it, that
the chosen model was used, or that a workflow preserves independence.

## Static acceptance

Use already available parsers and the installed/version-matched schema/help; do not install a test
dependency, run setup hooks, or start a paid model session as a “static check.” If a diagnostic may
start a service or mutate runtime state, explain it and obtain approval first.

- All source catalog skills are installed with their complete support directories; no broken relative
  references or unintended duplicate IDs. Setup remains interactive, standards stay inline.
- Five real worker definitions are discoverable through supported inspection where available. Confirm
  effective IDs, collision precedence, complete role contracts, supported fields, models, and efforts.
- Settings parse in their actual format (JSON vs. JSONC vs. TOML/YAML); comments and unrelated settings
  survive. Do not invent `validate` commands or treat unknown-field acceptance as support.
- Required project/user instruction sources are discoverable; managed restrictions and trust decisions
  remain intact. Check agent-specific inheritance and `.specflow/` feature isolation.
- Routing covers all skills and called phases; count actual nesting and concurrency. Async phases
  have completion gates. No generated adapter contradicts its source execution statements.
- Inspect the scoped diff: no unrelated edits, source-link mutation, credentials, blanket permissions,
  tool installation, or application-version changes. Review a no-change rerun by comparison rather
  than writing a timestamp or new report into settings.

Keep exact evidence internally and summarize static checks as passed, failed, blocked, or not available. Inspection
that requires a live session belongs in the next section, not a fabricated static result.

## Live tests — ask before running

Ask briefly whether to run bounded live checks for the configured tools, mentioning model-token cost
and possible session/log/cache effects. Keep the detailed test design internal unless requested.
The opt-in covers only the described inert checks, not an open-ended test run. Declining does not block file generation,
but leaves runtime behavior **unverified**. No real feature implementation, git operations, browser
installation, dependency install, or permission bypass is part of a smoke test.

Use a temporary fixture only if its creation/location and any external-path access were approved.
Otherwise use read-only named fixtures at approved paths. Do not read unrelated user files.

1. **Discover and dispatch:** launch each configured role with a tiny appropriate task. Confirm the
   actual custom worker was selected, requested vs. resolved model/effort where observable, and the
   effective instruction/skill sources. If routing metadata is unavailable, say unverified rather
   than inferring success from an agent claiming its own identity.
2. **Skill loading:** have an appropriate worker load `engineering-principles` or another required
   harmless reference and identify a scoped rule. Confirm loaded content via available runtime
   evidence; do not assume parent context inheritance.
3. **Boundaries:** reviewer reports on a supplied inert artifact without editing it; designer returns
   one direction from a complete brief; coder returns a scoped plan without edits for this test;
   validator runs only an approved harmless check and never applies repairs. Inspect resulting diffs.
   These test behavioral compliance, not a mathematical proof of sandbox enforcement.
4. **Independent judgment:** use a synthetic brief for two fresh review contexts and, where needed,
   three decider voters. Pass no sibling conclusions or inherited conversation. Check the verdict,
   revision, decision, and `UNANSWERABLE` contracts without exercising a real headless workflow.
5. **Topology:** exercise the deepest **adapted** dispatch/return chain with inert tasks, explicit
   waiting, and the actual routing mechanism. Verify result handoff and depth/concurrency support.
   Do not merely ask a worker whether it thinks nesting is allowed.

Keep probes small and bounded: no retry loop to force a pass. On failure, group diagnostics, show
the specific blocker, and get approval for additional calls or consequential changes outside the
agreed test scope. Routine non-conflicting setup repairs within the selected scope need no new plan gate.
Do not weaken isolation, substitute an unapproved model, or widen permissions to get green output.
Never launch a whole `901`, `502`, or `301` merely to test setup.

## Final report

Lead with the outcome, not the plan or steps taken. Default to a few short bullets:

- **Configured:** selected tools and scope, full catalog and five workers, with a compact summary of
  actual changes. If nothing changed, say “No configuration changes needed.”
- **Models:** concise confirmed role mappings; mention exceptions or unexpected resolution, not the
  full recommendation process. Never infer authenticated access from catalog presence alone.
- **Checks:** static and live outcomes separately; mark declined, blocked, or unavailable tests and
  unsupported workflows honestly. “Configured; runtime unverified” is valid when live tests are declined.
- **Action needed:** only actual blockers, consequential unresolved choices, or documented user
  reload/restart steps. Omit this bullet when none remain. Do not restart services silently.

Use per-tool status when outcomes differ: configured, verified, partial, or blocked. “Verified” needs
relevant live evidence. If official docs are unreachable, report that setup was paused and no files
changed; do not output a draft plan instead. If the user requested planning only, respect that limit
and provide the requested plan rather than claiming setup happened.

Keep source revision, documentation access dates/URLs, installed versions, exact changed paths,
adapter deltas, ownership, depth, command outputs, and security limitations available as evidence.
Surface material warnings immediately; otherwise provide these details only on request. Do not dump
capability tables, call graphs, future steps, proposed file lists, or diffs into the default report.

An unchanged rerun still refreshes evidence internally and reports verification status briefly.
A saved setup report is optional, must be requested, and needs an agreed destination.
