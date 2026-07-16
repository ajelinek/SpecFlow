---
name: 900-feedback-loop
description: >
  Use `900` to run a bounded apply-fix/review convergence cycle around a piece of work
  that already happened. It runs the Step 1 (apply-fix) and Step 2 (review) roles in separate,
  isolated subagent contexts and repeats them until Step 2 returns a clean verdict or a safety
  cap is hit. Trigger it for prompts like "900", "feedback loop", "review this and fix it until
  it's clean", or when another workflow needs a reusable review-and-converge step around a
  specific artifact or change set.
argument-hint: "[step-1-apply-fix-brief] [step-2-review-brief]"
disable-model-invocation: true
context: fork
---

# 900 - Feedback Loop

Run a two-role convergence loop: Step 1 applies fixes, Step 2 reviews the result against explicit
criteria, and the loop repeats until Step 2 reports clean or the iteration cap is hit. This skill
does not perform the original work itself — the caller does that beforehand and hands this skill
the review criteria plus how to apply fixes when there are any.

**Output**: No new `.specflow/` artifact of its own. Updates whatever files the Step 1 brief scopes
in on later iterations. Returns a convergence report in chat.

---

## Required Inputs

Before proceeding, confirm:

1. **Step 1 brief** — the apply-fix objective, exact files/artifacts in scope, and how to apply
   review feedback when there is any. If the real creation work already happened outside this
   skill, say so explicitly here rather than leaving Step 1 undefined; the first pass is then a
   no-op until Step 2 finds something.
2. **Step 2 brief** — the exact artifact/scope to review and the concrete criteria to judge it
   against.
3. **Agent for each step** *(optional)* — defaults to `general-purpose` for Step 1 and `@reviewer`
   for Step 2. The caller may name a different agent for either role (for example `@coder` for
   Step 1 when the fix is a real code change).
4. **Iteration cap** *(optional)* — defaults to 5 apply-fix/review pairs.

If either brief is missing its scope or its criteria, ask one blocking question before starting.

---

## Execution Protocol

- Step 1 and Step 2 always run in separate, freshly spawned subagent contexts. Never reuse one
  subagent's context for the other role, and never reuse a subagent across iterations.
- This skill's own working state stays tiny: the two briefs, the current iteration count, and the
  latest verdict. Do not accumulate subagent transcripts turn over turn.
- Step 2's verdict is the sole authority on convergence. Do not override a `CHANGES_REQUIRED`
  verdict because iterating further is expensive or slow.

---

## Steps

- [ ] **Step 1: Freeze the loop packet.** Record the Step 1 brief and agent, the Step 2 brief and
  agent, the iteration cap (default 5), and set the iteration counter to 0.

- [ ] **Step 2: Run Step 1.** Spawn the named Step 1 agent (default `general-purpose`) with the
  Step 1 brief. On iteration 0 this may be a no-op pass-through if the brief says so. On later
  iterations, replace the brief's instruction with exactly the feedback items Step 2 just returned.
  Keep only its summary once it returns; discard the rest.

- [ ] **Step 3: Run Step 2.** Spawn the named Step 2 agent (default `@reviewer`) with the Step 2
  brief. From iteration 1 onward, include the prior iteration's feedback items verbatim in the
  brief so the reviewer checks resolution status instead of free-reviewing from a blank slate.
  Keep only its verdict once it returns; discard the rest.

- [ ] **Step 4: Branch on the verdict.**
  - `CLEAN` → go to Step 6.
  - `CHANGES_REQUIRED` → increment the iteration counter. If it now exceeds the cap, go to Step 7.
    Otherwise, go to Step 2 with the new feedback items.
  - Blocking questions from either subagent, or an unparseable verdict → stop and surface them to
    the caller instead of guessing.

- [ ] **Step 5: (loop point)** Steps 2-4 repeat until Step 6 or Step 7 is reached.

- [ ] **Step 6: Report convergence.** Summarize total iterations run, what changed across them if
  anything, and the final clean verdict.

- [ ] **Step 7: Escalate on cap.** Report the iteration history (what feedback recurred or kept
  changing), the final outstanding feedback items, and stop. Do not force-accept the current state
  and do not silently give up — hand the decision back to whatever invoked this skill.

---

## Rules

1. Step 1 and Step 2 never share a subagent context, and no subagent persists across iterations.
2. Every iteration's Step 1 brief must be explicit about what it is doing, even when it is a
   no-op — never leave Step 1 ambiguous.
3. Step 2 is authoritative on whether the loop continues.
4. Escalate rather than guess when the cap is hit, when a subagent returns blocking questions, or
   when a verdict cannot be parsed as `CLEAN` or `CHANGES_REQUIRED`.
5. Keep this skill's own context small: briefs, iteration count, and latest verdict only.
6. Default agents are `general-purpose` (Step 1) and `@reviewer` (Step 2); the caller may override
   either when the work needs a more specialized worker.
