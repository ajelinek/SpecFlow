---
name: 501-browser-qa-analyst
description: >
  Use `501` to explore a live site in a real, visible Chrome browser like a QA analyst — click
  through flows, judge behavior against what a reasonable user would expect, and log defects with
  repro steps to the D11 defect backlog. Trigger it for prompts like "501", "browser QA", "QA
  analyst pass", "explore this site for bugs", or "find defects on this site".
argument-hint: "[starting-url] [credentials?] [priority-features?]"
context: fork
---

# 501 - Browser QA Analyst

Drive a real, visible Chrome browser through every reachable page and flow of a live site, judge
each against a rubric and against what a reasonable user would expect, and log failures as defects
with exact repro steps.

This skill only explores and logs. It never writes Gherkin, never fixes anything, and never invokes
`202`, `301`, `402`, or `502` — turning entries into fixes is a separate, manually triggered pass
(`502-defect-resolution`, or `202`/`301`).

**Output**: `.specflow/docs/D11-exploratory-defects.md` — one running backlog updated in place across
runs. Its template (`./templates/D11-exploratory-defects.md`) defines statuses, severities, entry
fields, section placement, and the `Not a Defect` rationale rule; follow it. D11 is not a general
defect log: defects found outside a `501` run are fixed and documented in the commit/PR, not appended.

---

## Required Inputs

1. **Starting URL** — required.
2. **Test credentials** *(optional)* — for sites requiring login.
3. **Priority features/flows** *(optional)* — biases exploration order only; never caps coverage.

Assume a safe/staging environment with no destructive-action restrictions: submit forms, complete
flows, and interact the way a real user would.

**Blocking questions.** This skill runs in a forked context and can't reach the user. If the starting
URL is missing, or a login wall blocks the surface and no credentials were given, stop and return the
request to the caller (with any progress so far) rather than guessing or silently skipping the
authenticated surface.

---

## Execution Protocol

- Explore directly in this context — never delegate exploration to a subagent; the value is live,
  watchable judgment.
- Always drive a real, visible Chrome window via `claude-in-chrome`, never a headless or scripted
  driver. Load the browser tools in one batch before the first action: `tabs_context_mcp`,
  `navigate`, `computer`, `find`, `read_page`, `tabs_create_mcp`, `form_input`,
  `read_console_messages`, `read_network_requests`.
- Narrate briefly what's being tried and what happened, for whoever's watching; the narration isn't
  persisted.
- Keep working state compact: the discovery map, raw findings so far, and the backlog's highest
  `DEF-###` id — not page dumps or tool transcripts.

---

## Steps

- [ ] **Step 1: Open the browser.** Call `tabs_context_mcp`, create a new tab, navigate to the
  starting URL. At a login wall, sign in with the given credentials.

- [ ] **Step 2: Build a discovery map as you go** — every distinct page, flow, and feature surfaced by
  navigation, buttons, and forms. Stay within the starting URL's domain: note outbound third-party
  links (payment, external auth, social share) without following them. Visit priority items first,
  otherwise go breadth-first.

- [ ] **Step 3: Exercise and judge each page or flow.** Interact as a real user would — click
  through, fill plausible sample data, submit where natural — and check two things:
  - **Rubric** (objective, repeatable): console errors, failed network requests, broken links, dead
    or unresponsive controls, failed submits.
  - **Judgment** (subjective): form a quick read of what the feature is evidently for — checkout gets
    someone to a completed order with minimal friction; settings make a change stick reliably — and
    judge behavior against that purpose, not an abstract UI checklist. No separate research phase.

  Never stop the run over one defect — log it and keep going.

- [ ] **Step 4: Capture a raw finding** for anything failing either check: page/flow and exact repro
  steps, expected vs actual, severity (per the template legend, estimated from the user's
  perspective, not fix difficulty), and detection mode (`Rubric`/`Judgment`). Get the mode right —
  `502` grants different autonomy per mode. Rubric hits can be logged plainly; for judgment calls,
  write expected-vs-actual precisely enough that someone who didn't watch the run can see it's a real
  problem, not taste. Hold findings in memory; don't touch D11 yet.

- [ ] **Step 5: Continue until the discovered surface is covered** — every page/flow in the discovery
  map exercised at least once. That, not a timer or defect count, is the completion condition.

- [ ] **Step 6: Reconcile against the backlog** — only now, once, read D11 if it exists. Never
  pre-filter exploration by what's already logged. Two findings are the same defect when they share
  flow/page and failure mode, even if click path or data differ slightly; when unsure, keep them
  distinct — collapsing unrelated issues loses detail a fix pass needs. For each raw finding:
  - matches an `Open`/`In Progress`/`Reopened` entry → leave it; fold in a cleaner repro if found; no
    duplicate
  - matches a `Fixed` or `Won't Fix` entry → set `Reopened`, note that it recurred this run
  - matches a `Not a Defect` entry → compare against its **Rationale**, checking whether the
    conditions it describes still hold, not just that the failure mode recurred:
    - consistent (same trigger, same conditions, outcome the rationale covers) → leave it suppressed;
      optionally add a dated "recurred, still matches" note
    - diverges (different trigger or conditions — e.g. now happens for non-archived records too —
      a materially worse outcome, or the stated reason no longer holds), or the rationale is too vague
      to judge → set `Reopened` with a note stating how this finding differs (or asking for a more
      specific rationale). Never guess in favor of suppression.
  - matches nothing → append as `Open` with the next sequential `DEF-###`

  Leave entries not re-encountered untouched — not revisiting a flow isn't evidence it's fixed. If an
  `Open`/`In Progress` entry's flow was re-exercised and now behaves correctly, add a note that it
  appeared resolved and needs confirmation; never set `Fixed`. A `501` run only ever sets `Open` or
  `Reopened` — never `Fixed`, `Won't Fix`, or `Not a Defect`. Flag any `Not a Defect` entry missing a
  rationale as incomplete.

- [ ] **Step 7: Write the file** — from the template if new, otherwise in place. Every entry has all
  template fields (no partial entries); ids stay stable and are never renumbered; entries whose status
  changed move to the matching section per the template.

- [ ] **Step 8: Summarize.** Pages/flows covered; new defects (ids, severities); reopened entries
  (separating those reopened because a `Not a Defect` rationale no longer matched); `Not a Defect`
  recurrences left suppressed; current open/in-progress backlog size. If anything was logged or
  reopened, offer to run `502-defect-resolution` next — never run it automatically.
