---
name: 900-feedback-loop
description: >
  Use `900` to run a bounded review/apply-fix convergence cycle around a piece of work that
  already happened. It runs the Review and Apply-Fix roles in separate, isolated subagent
  contexts and repeats them until Review returns a clean verdict or a safety cap is hit. Trigger
  it for prompts like "900", "feedback loop", "review this and fix it until it's clean", or when
  another workflow needs a reusable review-and-converge step around a specific artifact or change
  set.
argument-hint: "[review-brief] [apply-fix-brief]"
context: fork
---

# 900 - Feedback Loop

Two-role convergence loop: **Review** checks the work against explicit criteria, **Apply-Fix**
fixes exactly what Review flagged, and the cycle repeats — review, fix, review — until Review
reports clean or the iteration cap is hit. The caller has already done the original work; this
skill only judges it and patches what's wrong with it.

**Output**: A convergence report in chat, nothing else. This skill creates no artifacts of its
own — no tracking docs, no `.specflow/` files, no scratch reports. Apply-Fix only edits files
already in scope, touching anything outside it solely when a specific Review finding requires it
(e.g. a missing test the finding names) — never speculatively, never as general cleanup.

---

## Required Inputs

Before proceeding, confirm:

1. **Review brief** — the exact artifact/scope to review, already completed, and the
   criteria to judge it against. If the work isn't done yet, send the caller back to finish it
   first — this skill never performs it.
2. **Apply-Fix brief** — which files are in scope and any constraints on how fixes should
   be made. Every fix pass is driven entirely by Review's latest feedback, never a general
   "improve this."
3. **Agents** *(optional)* — default `@reviewer` for Review, `general-purpose` for Apply-Fix.
   Override either when the work needs a specialist (e.g. `@coder` for real code fixes).
4. **Iteration cap** *(optional)* — default 5 review/apply-fix pairs.

If either brief is missing its scope or criteria, ask one blocking question before starting.

---

## Steps

- [ ] **Step 1: Freeze the loop packet.** Record both briefs and agents, the iteration cap, and
  set the iteration counter to 0.

- [ ] **Step 2: Run Review.** Spawn a fresh Review subagent with the review brief and scope.
  From iteration 2 on, also include a summary of the last fix pass so it checks resolution instead
  of re-reviewing from a blank slate. Keep only the verdict and feedback items; discard the rest.

- [ ] **Step 3: Branch on the verdict.**
  - `CLEAN` → go to Step 6.
  - `CHANGES_REQUIRED` → increment the iteration counter. If it now exceeds the cap, go to Step 7;
    otherwise go to Step 4.
  - Blocking questions from Review, or an unparseable verdict → stop and surface them to the
    caller instead of guessing.

- [ ] **Step 4: Run Apply-Fix.** Spawn a fresh Apply-Fix subagent with the apply-fix brief, its
  instruction replaced by exactly Review's feedback items. Scope changes to the files those items
  point at — no unrelated cleanup, no new files unless a specific item requires one. Keep only its
  summary; discard the rest.

- [ ] **Step 5: Loop.** Return to Step 2. Steps 2-4 repeat until Step 6 or Step 7 is reached.

- [ ] **Step 6: Report convergence.** Summarize iterations run, what changed across them if
  anything, and the final clean verdict.

- [ ] **Step 7: Escalate on cap.** Report the iteration history (what feedback recurred or kept
  changing) and the final outstanding items, then stop. Hand the decision back to the caller
  rather than force-accepting the current state or silently giving up.

---

## Rules

1. Review and Apply-Fix always run in separate, freshly spawned subagent contexts — never shared,
   never reused across iterations.
2. Review runs first every cycle and is the sole authority on whether the loop continues; never
   override a `CHANGES_REQUIRED` verdict because another pass is slow or costly.
3. Apply-Fix's instruction is always exactly Review's latest feedback items — never vague, and
   never scoped beyond what those items name.
4. Keep this skill's own working state tiny: the two briefs, iteration count, and latest verdict —
   no subagent transcripts carried forward between iterations.
5. Escalate rather than guess: a cap hit, blocking questions, or an unparseable verdict all stop
   the loop for caller input.
