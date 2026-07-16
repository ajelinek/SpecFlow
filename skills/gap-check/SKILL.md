---
name: gap-check
description: >
  Resolve a workflow's declared Required Inputs by checking existing project context first, then
  asking about only the inputs that remain unresolved — one question at a time, with a recommended
  answer, before the invoking workflow proceeds. Referenced by name from other skills' input
  validation steps (most of SpecFlow's 100-series). Not for open-ended plan interrogation — for
  stress-testing a plan or decision end to end, use `grilling` instead.
argument-hint: "[required inputs checklist]"
disable-model-invocation: true
context: fork
---

# Gap Check

Close every gap on a fixed, invoking-skill-provided checklist of required inputs, with minimum
friction for the user. Try to answer everything from context first; ask only about genuine gaps.

This is not an open-ended interview. The invoking skill hands `gap-check` a specific, bounded list
of required inputs — the job here is to resolve every item on that list and hand back a resolved
answer set, nothing more.

---

## When To Use vs `grilling`

- **`gap-check`** — a workflow has a short, known list of Required Inputs (for example: pain point,
  differentiation, target users) and needs them resolved before it can proceed. Bounded,
  checklist-driven, stops as soon as the list is satisfied.
- **`grilling`** — the user wants a plan, decision, or idea stress-tested end to end. Open-ended,
  exhaustive, walks every branch of a decision tree deliberately, keeps pushing even when an answer
  sounds plausible.

Do not use `gap-check` to interrogate a plan the user hasn't asked to have stress-tested. Do not use
`grilling` inside a workflow's input-validation step — it will over-ask and stall the workflow.

---

## Inputs

The invoking skill provides:

1. The Required Inputs checklist — each item's name and what it needs to capture.
2. Whatever project context it already has or knows how to load (prior docs, domain knowledge,
   repo state).

If invoked without an explicit checklist, treat the invoking skill's own "Required Inputs" section
as the checklist.

---

## Core Rules

1. **Resolve from context first.** Before asking about any input, check whatever the invoking skill
   already loaded or can load (prior docs, `.specflow/context/domain-knowledge.md`, repo
   exploration) for an answer. Only put an input on the "to ask" list if it is genuinely
   undetermined from available context — not just unstated so far in the conversation.
2. **One question at a time.** For inputs that remain unresolved, ask a single question, then wait
   for the user's answer before asking the next. Do not batch remaining gaps into one message.
3. **Recommend, don't just ask.** For each question, propose a recommended answer — and the
   reasoning behind it, grounded in whatever context is available — then let the user confirm or
   override it.
4. **Stop at the checklist boundary.** Resolve exactly the declared Required Inputs. Do not expand
   into an exhaustive interview or chase tangents the checklist didn't name — that is `grilling`'s
   job, not this one.
5. **Follow dependencies within the checklist.** If two inputs are related, resolve the one that
   constrains the other first, and re-check whether a later answer makes an already-resolved item
   stale before moving on.
6. **Don't let the workflow proceed with an open gap.** Every required input must be either resolved
   from context or confirmed by the user before handing control back to the invoking workflow.

---

## Workflow

- [ ] **Step 1: Load the checklist.** Take the Required Inputs list from the invoking skill, or its
  "Required Inputs" section if no explicit list was passed.

- [ ] **Step 2: Attempt to resolve every input from context.** Read whatever prior docs, domain
  knowledge, or repo state the invoking skill has access to. Mark each input resolved (with its
  source) or unresolved.

- [ ] **Step 3: Ask about unresolved inputs, one at a time.** For each unresolved input, in
  checklist order (respecting dependencies from Rule 5):
  - state what's still missing and why it matters for this document
  - propose a recommended answer when one can be reasoned out from context, even partial context
  - wait for the user's reply before moving to the next unresolved input
  - if an answer changes a previously resolved input, re-resolve that input before continuing

- [ ] **Step 4: Hand back the resolved set.** Once every input is resolved, return a compact list —
  each input, its resolved value, and its source — so the invoking workflow can proceed.

---

## Output

```markdown
## Resolved Inputs
- **<Input name>**: <value> — _source: <doc/context, or "confirmed by user">_
- **<Input name>**: <value> — _source: ..._
```

---

## Examples

**Use this skill:**

- `101-project-overview` Step 1 needs pain point, differentiation, target users, key scenarios, and
  success metrics resolved before drafting.
- `106-ui-design` Step 1 needs brand personality, audience, device support, theme support, and
  differentiation resolved before generating design directions.

**Do not use this skill:**

- "Stress-test my plan for migrating the auth system." Use `grilling`.
- A workflow step that needs open-ended research rather than a fixed input list. Use
  `deep-research`.

---

## Final Checks

- Every checklist item is either resolved from context or confirmed by the user — none are silently
  assumed.
- No question was asked that available context could have answered.
- No two questions were batched together.
- The invoking workflow was not allowed to proceed with a gap still open.
