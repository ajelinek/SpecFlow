---
name: run-log
description: >
  SpecFlow's shared run-log protocol: one append-only `events.jsonl` per workflow run that carries
  the brief, phase state, worker dispatches, and worker results, so every subagent starts in a fresh
  context and picks up from the log instead of a resumed session. Load it in any SpecFlow skill that
  dispatches a subagent, before the first dispatch. Workers follow the short version in their agent
  file and do not load this skill.
---

# Run Log

Every subagent call is a **fresh context**. Never resume, fork, or continue a worker session. The
log is the only memory shared between calls: the orchestrator writes the brief and the assignment,
the worker reads only what its assignment names and appends one result. Requires `jq`.

---

## Location

```sh
ROOT="${TMPDIR:-/tmp}/specflow/$(basename "$(git rev-parse --show-toplevel 2>/dev/null || pwd)")"
RUN="$ROOT/<YYYYMMDD-HHMM>-<skill>-<slug>"      # e.g. 20261114-0910-301-cart-persist
LOG="$RUN/events.jsonl"
mkdir -p "$RUN" && touch "$LOG"
```

- **One log per run.** A run is one top-level invocation. A skill invoked by another skill (for
  example `301` or `900` under `901`, `402` under `502`) uses the caller's `LOG` path and never creates
  its own. Only a skill with no caller log creates a run.
- The directory name is the run ID; no session ID is needed. If it already exists and you are not
  resuming it, add `-2`, `-3`, and so on.
- Command output goes in `$RUN/logs/<dispatch id>-<label>.log` (e.g. `d4-test.log`). The OS cleans
  the temp directory; don't delete a run directory yourself, so it stays available for look-back.
- Durable project records (`901`'s `implementation-log.jsonl`, D11, specs, overviews) stay where
  their skills put them. The run log is the run's working record, not a committed artifact.

---

## Schema

One compact JSON object per line. Four types only. Omit empty or unused fields; never add others.

| `type` | Writer | Fields |
|---|---|---|
| `brief` | orchestrator | `brief`, `goal`, `design`, `refs`, `owners`, `rules`, `checks`, `base`?, `why`? |
| `state` | orchestrator | `brief`, `status`, `phase`, `next`?, `caps`? |
| `dispatch` | orchestrator | `id`, `role`, `brief`, `do`, `in`?, `skills`? |
| `result` | worker | `re`, `status`, `files`?, `checks`?, `findings`?, `asks`?, `notes`?, `out`? |

- **`brief`** — `"<scope>@<rev>"`, e.g. `"cart-persist@2"`. A revision is a new full `brief` line,
  never a patch, so each design change stays readable on its own and earlier ones stay for
  look-back. Several scopes can share one log (`901` modules, `502` defects). Each dispatch pins one
  revision. `why` (rev ≥ 2) is the one-line reason, e.g. `"@1 superseded: user chose option B"`.
- **`design`** — the full working context as one string (`\n` line breaks): approach, module
  responsibilities, integration points, contracts, state transitions, scenario → source → test
  mapping, resolved assumptions, open questions, or a designer brief. Everything a fresh worker
  needs that the repo doesn't already say.
- **`refs`** — pointers to repo content: `specs/F013/specs.feature:12-48`, `overview.md#Scope`.
  Content with no repo home (synthesized scenarios) goes in `design`.
- **`owners`** — reuse decisions: `"src/cart.service.ts: extend (owns persistence)"`.
- **`rules`** — edit boundaries, constraints, non-goals, `pre-existing: <paths>` (dirty before the
  run; exclude from diffs and reviews).
- **`checks`** — the check plan as prefixed lines: `behavior:` outcomes and regressions, `owner:`
  test paths/fixtures to reuse or add, `base:`/`dev:` baseline and red/green commands, `accept:`
  acceptance test/lint/build commands, `why:` selection evidence, `expand:` triggers and the broader
  check each requires. In a result: one line per check run, `"<cmd>: pass 12/12"` or
  `"<cmd>: fail — <test> — <reason>"`.
- **`base`** — git SHA the scope's diff is measured from (`git diff <base>`, minus `pre-existing`).
- **`status`** — state: `active|blocked|done|abandoned`. Result: coder/general `done|blocked`;
  reviewer `clean|changes|blocked` (the verdicts `CLEAN` / `CHANGES_REQUIRED`); validator
  `pass|fail|blocked`; decider `decided|unanswerable` (`UNANSWERABLE`). Skill text naming the
  uppercase verdicts means these values.
- **State `brief`** — the scope's brief ID, or `"run"` for the top-level skill's run-wide state.
  Only a `run` state of `done` or `abandoned` closes the run; scope states close only their scope.
- **`phase`, `next`, `caps`** — short strings: `"review"`, `"dispatch d6 repair F2"`, `"review 1/2"`.
- **`id`** — `d1`, `d2`, … in dispatch order. **`re`** — the dispatch ID being answered.
- **`do`** — the objective, including what kind of pass (implement, repair F2/F4, recheck d5).
- **`in`** — dispatch IDs whose results this worker must read, e.g. `["d4","d5"]`.
- **`findings`** — every finding, none dropped:
  `"F1 high src/a.ts:42 — problem — evidence — consequence — criterion — smallest fix"`.
- **`asks`** — `[BLOCKING]` questions and conflict notes. **`notes`** — `[WARN]`/`[INFO]` notes,
  key decisions, do-not-redo items. **`out`** — the answer (decider choice, designer output).

**Content rules:** no size or item caps — completeness beats brevity, because the next worker has
only the log. But never diffs, file contents, raw command output, stack traces, or copies of other
lines; point to the file, `git diff`, or `logs/` path instead. Array items are one line each.

---

## Commands

```sh
# Append — the only write. jq parses all input first: anything but exactly one valid object
# appends nothing.
jq -cs 'if length==1 and (.[0]|type)=="object" then .[0] else error("one object") end' >> "$LOG" <<'EOF'
{"type":"result","re":"d3","status":"done","files":["src/cart.service.ts: modified — extend save()"]}
EOF

# Brief with a multi-line design — let jq escape it
jq -cn --arg design "$(cat <<'EOF'
Approach: …
EOF
)" '{type:"brief",brief:"cart-persist@2",goal:"…",design:$design,why:"…"}' >> "$LOG"

# Next dispatch ID (orchestrator)
echo "d$(( $(grep -c '"type":"dispatch"' "$LOG") + 1 ))"

# Reads — select exactly what's needed; never cat the log
jq -c 'select(.type=="dispatch" and .id=="d7")' "$LOG"
jq -c 'select(.type=="brief" and .brief=="cart-persist@2")' "$LOG"
jq -r 'select(.type=="brief" and .brief=="cart-persist@2") | .design' "$LOG"   # readable design
jq -c --argjson in '["d4","d5"]' 'select(.type=="result" and (.re as $r | $in | index($r)))' "$LOG"
jq -c 'select(.type=="brief") | {brief,why}' "$LOG"                            # revision history
jq -c 'select(.type=="state" and .brief=="run")' "$LOG" | tail -1            # run-wide
jq -c 'select(.type=="state" and (.brief|startswith("cart-persist@")))' "$LOG" | tail -1   # one scope

# Watch and search (people and orchestrators)
tail -f "$LOG" | jq -c '{type,id,re,role,brief,status}'
rg '"status":"blocked"' "$ROOT"/*/events.jsonl
```

---

## Orchestrator Protocol

1. **Start or resume.** With a caller `LOG`, use it. Otherwise look for an unfinished run of this
   skill and slug (`ls -dt "$ROOT"/*-<skill>-<slug>`, last `run` state not `done`/`abandoned`) and
   resume it; else create one and append a `run` state. Nested skills write state for their own
   scope only.
2. **Brief.** Append a `brief` before the first dispatch for that scope. Any material change (design,
   scope, user decision, contract) is a new revision with `why`. A changed feature contract is a new
   run: append a `run` state `abandoned` with the reason in `next`, then start over.
3. **Dispatch.** Append the `dispatch`, then call the worker with only:
   `Run log: <absolute LOG path> · dispatch: <id>. Follow your run-log protocol.`
   Parallel workers: append every dispatch line first, then make the calls.
4. **Collect.** Read the result line (`re` = the ID); use only that, not the worker's reply text.
   For a worker without shell access or without the protocol (designer, `@explore`, general agents),
   paste the dispatch line, its pinned brief line, and the result lines named in `in` into the
   prompt, list the result fields its role uses (see Schema), and append its reply as the result
   yourself. If a worker ends without a result, append
   `{"type":"result","re":"<id>","status":"blocked","notes":["no result: interrupted"]}`.
5. **Continue.** Unfinished or repaired work is a new dispatch with `in` naming the earlier IDs and
   `do` saying exactly what remains, including any decisions the worker must apply (e.g.
   `fix F1,F3; F2 rejected — <reason>`). Never resume the old session; never re-brief what the log holds.
6. **State.** Append a `state` at every phase change, cap change, and stop, so an interrupted run
   resumes from the last `state` plus any dispatch that has no result.
7. **Before reading test failures as code defects**, if most of a suite fails at once, dispatch a
   validator check of the environment (emulators, ports, services) first.

Keep your own context small too: work from the log and `git diff`, not from earlier replies.
Calls a worker makes internally as part of one assignment (the decider's three voters) belong to that
worker's single result and are not logged.

---

## Worker Protocol

Embedded in each SpecFlow agent file; listed here for reference.

1. Read your `dispatch` line, the pinned `brief` line, and the results named in `in` (skip that read
   when `in` is absent). If the pinned brief is missing, return `blocked`.
2. Do the assignment from the current code (`git diff <base>` when `base` is set).
3. **Look-back.** When a repair, recheck, or correction can't be settled from those lines (why a
   finding was rejected, what an earlier revision decided, which test failed before), you may read
   specific earlier lines by ID or revision, a `logs/<id>-*.log` excerpt, or the skill's durable log
   (`implementation-log.jsonl`). Select by ID; never read whole logs. Cite what you used in `notes`.
4. Append exactly one `result` with `re` set to your dispatch ID, then reply with one line:
   `<id> <status>`.
