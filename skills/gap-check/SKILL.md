---
name: gap-check
description: >
  Resolve a workflow's declared Required Inputs by checking existing project context first, then
  asking about only the inputs that remain unresolved — one question at a time, with a recommended
  answer, before the invoking workflow proceeds. Referenced by name from other skills' input
  validation steps (most of SpecFlow's 100-series). Not for open-ended plan interrogation — for
  stress-testing a plan or decision end to end, use `grilling` instead.
argument-hint: "[required inputs checklist]"
---

# Gap Check

Close every gap on a fixed checklist of required inputs provided by the invoking skill, with minimum
friction: answer from context first, ask only about genuine gaps, and hand back a resolved answer set
— nothing more.

Run in the invoking workflow's own context, never in a forked or background subagent: it must reach
the user directly and needs whatever context the workflow already loaded.

---

## When To Use vs `grilling`

- **`gap-check`** — a workflow has a short, known list of Required Inputs (e.g. pain point,
  differentiation, target users) to resolve before proceeding. Bounded; stops once the list is
  satisfied. Example: `101` needs pain point, differentiation, users, scenarios, and metrics before
  drafting.
- **`grilling`** — the user wants a plan, decision, or idea stress-tested end to end: open-ended,
  walks every branch, keeps pushing on plausible answers. Example: "Stress-test my plan for migrating
  the auth system."

Never use `gap-check` to interrogate a plan the user didn't ask to have stress-tested, and never use
`grilling` inside an input-validation step — it over-asks and stalls the workflow. For open-ended
research rather than a fixed input list, use built-in research and web search.

---

## Inputs

1. The Required Inputs checklist — each item's name and what it must capture. If none is passed
   explicitly, use the invoking skill's own "Required Inputs" section.
2. Whatever project context the invoking skill has or can load (prior docs, domain knowledge, repo
   state).

---

## Steps

- [ ] **Step 1: Resolve from context.** Check everything the invoking skill loaded or can load (prior
  docs, `.specflow/context/domain-knowledge.md`, repo exploration). Mark each input resolved (with
  its source) or unresolved. An input is unresolved only if genuinely undetermined from available
  context — not merely unstated so far in the conversation. Never ask what context could answer.

- [ ] **Step 2: Ask about each unresolved input** in checklist order:
  - Use `AskUserQuestion` for every gap, never plain prose — even open-ended ones (its "Other" choice
    keeps free text available).
  - Exactly one question per call; wait for the answer before the next. Never batch gaps.
  - Put what's missing and why it matters for this document in the question text.
  - Lead with a recommended option labeled "(Recommended)", its `description` giving the reasoning
    from available context (even partial); cover realistic alternatives with the other options.
  - Resolve an input that constrains another first. If an answer makes an already-resolved input
    stale, re-resolve it before continuing.
  - Stay within the checklist — no tangents or exhaustive interviewing.

- [ ] **Step 3: Hand back the resolved set** only once every input is resolved from context or
  confirmed by the user — never let the workflow proceed with an open or silently assumed gap.

```markdown
## Resolved Inputs
- **<Input name>**: <value> — _source: <doc/context, or "confirmed by user">_
```
