---
name: 402-test-correction
description: >
  Use `402` to investigate and correct a failing automated test by deciding whether the right fix is
  in the test, in production code, or in the expected behavior itself. Trigger it for prompts like
  "402", "fix this failing test", "is this a test issue or a product bug", or "triage the
  failing spec".
argument-hint: "[failing-test]"
context: fork
---

# 402 - Test Correction

Start from a failing test, classify why it fails, explain why, and only then apply the smallest
correct fix. A red test doesn't say whether the problem is a stale test, a real source defect, or an
intentional behavior change — never assume every red test means broken product code, or that every
selector or UI-structure mismatch means the test should change.

**Output**: Corrected test and/or source files, or a blocking decision when the failure exposes an
intended behavior change or product-capability ambiguity.

---

## Required Inputs

1. **Failure anchor** — failing test name, file, command, stack trace, CI link, failure screenshot,
   or an existing `.specflow/docs/D11-exploratory-defects.md` entry (`DEF-###`)
2. **Execution surface** — UI, API, integration, unit, or mixed
3. **Change window** — recent commits, diff range, PR, or changed files likely related
4. **Decision boundary** — tests only, source only, or either once classified

**Blocking questions.** This skill runs in a forked context and can't reach the user. When the
failing scope is too vague, or the failure is a behavior-intent question (Step 7), stop and return
the question to the caller.

---

## Execution Protocol

You are the orchestrator. `@explore` for focused discovery of test context, similar patterns, and
recent code movement; `@validator` to reproduce and validate; `@coder` only once the classification
justifies a specific edit path. Keep a compact working model: failure anchor, suspected files, recent
changes, current classification, allowed edit boundary, rationale.

---

## Classification Model

Classify before any broad editing:

- **Test defect** — product behavior is still correct; the assertion, setup, timing, fixture,
  selector, or expectation is wrong or stale
- **Source defect** — the test exposes a real regression or missing guard
- **Behavior change / ambiguous intent** — behavior changed in a possibly intentional way, or the
  failure is a business-capability question rather than a clear defect

The third bucket is mandatory — don't force every failure into "test bug" or "source bug".

---

## Steps

- [ ] **Step 1: Anchor the failing signal** — the smallest reproducible unit (single test, scenario,
  spec block, or command), with the exact failure text and location.

- [ ] **Step 2: Reproduce with `@validator`** using the narrowest useful command, whenever feasible
  before changing code. Confirm the failure is current and not superseded by unrelated breakage;
  record pre-existing failures that weaken confidence.

- [ ] **Step 3: Load intent sources** — the test name and body, `.feature` file, feature
  `overview.md`, implementation doc, inline comments, nearby assertions, adjacent tests — to
  understand what the test protects.

- [ ] **Step 4: Inspect recent code movement** — required before deciding the fix path. Review recent
  commits and changed files around the area: changes to the test, selectors, contracts, UX copy,
  rendering structure, validation rules, state transitions, business logic. Build a plausible
  explanation of why it started failing.

- [ ] **Step 5: Compare against 2-3 similar tests or helpers** — did the test drift from established
  patterns, or did the implementation drift from its feature family?

- [ ] **Step 6: Classify the failure** by the evidence:
  - selector drift alone isn't a product defect if the same capability still works and the behavior
    contract didn't change
  - a changed business outcome, validation rule, state transition, or user-visible capability is not
    just a "test fix" — a still-broken capability is never a harmless test defect; treat it as a
    likely source defect or behavior-change question
  - if test and implementation both look reasonable but disagree on intended behavior, go to Step 7

- [ ] **Step 7: Stop on business-intent questions.** If the failure comes from a real functionality
  change, a product decision, or unclear intent, patch neither side. Return: what changed, why it
  looks intentional or ambiguous, why it isn't just a selector or harness issue, and the two plausible
  correction paths.

- [ ] **Step 8: Freeze the correction boundary** in a task packet: classification, files allowed to
  change, read-only references, forbidden edits, and the justifying evidence.

- [ ] **Step 9: Minimal correction with `@coder`.**
  - **Test defect**: smallest fix to setup, assertions, fixtures, selectors, waits, or helpers;
    preserve the business assertion. Never weaken the test, delete meaningful coverage, or swap
    business assertions for implementation-detail checks just to pass.
  - **Source defect**: smallest production fix that satisfies the existing intended assertion,
    reusing or extending existing code per `engineering-principles`. Change tests only when the fix
    legitimately changes observable output or setup. Never reinterpret a regression as a test issue to
    avoid touching source.

- [ ] **Step 10: Validate with `@validator`** — the failing test first, then the strongest nearby
  surface. If the fix doesn't converge, reassess the classification rather than iterating blindly.

- [ ] **Step 11: Record rationale.** Why this classification, the supporting evidence, and residual
  fragility. If triggered by a D11 `DEF-###` entry, append a triage note (classification and outcome)
  to it. Never create a `DEF-###` entry (only `501-browser-qa-analyst` does) and never change its
  status — `502-defect-resolution` applies status when it dispatched this run; otherwise status is
  left to whoever reads the note.

- [ ] **Step 12: Summarize.** Failing test scope; reproduction command; commits or files reviewed;
  classification (`test defect`, `source defect`, or `behavior change / ambiguous intent`) and why it
  won; files changed and whether tests, source, or both; final validation result; any decision that
  was required; if D11-triggered, confirmation the triage note was appended.
