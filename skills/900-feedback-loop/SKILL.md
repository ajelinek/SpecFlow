---
name: 900-feedback-loop
description: >
  Use `900` to run a bounded review/apply-fix convergence cycle around work that already happened:
  Review and Apply-Fix run in separate, isolated subagents and repeat until Review is clean or a cap
  is hit. Trigger it for prompts like "900", "feedback loop", "review this and fix it until it's
  clean", or when another workflow needs a reusable review-and-converge step.
argument-hint: "[review-brief] [apply-fix-brief]"
context: fork
---

# 900 - Feedback Loop

**Review** checks completed work against explicit criteria; **Apply-Fix** fixes exactly what Review
flagged; repeat until Review reports clean or the iteration cap is hit. The caller already did the
work — this skill only judges and patches it.

**Output**: A convergence report in chat. No artifacts of its own (no tracking docs, `.specflow/`
files, or scratch reports). Apply-Fix edits only in-scope files, going outside scope solely when a
specific finding requires it (e.g. a missing test the finding names) — never speculatively or as
general cleanup.

---

## Required Inputs

1. **Review brief** — the exact completed artifact/scope and the criteria to judge it against. If the
   work isn't done yet, send the caller back to finish it; this skill never performs it.
2. **Apply-Fix brief** — in-scope files and any constraints on how fixes are made.
3. **Agents** *(optional)* — default `@reviewer` for Review, `general-purpose` for Apply-Fix; override
   for a specialist (e.g. `@coder` for real code fixes).
4. **Iteration cap** *(optional)* — default 5 review/apply-fix pairs.

This skill runs in a forked context: if either brief lacks scope or criteria, return that as a
blocking question to the caller before starting.

---

## Steps

Working state stays tiny — the two briefs, agents, cap, iteration counter (starting at 0), and latest
verdict. Every Review and Apply-Fix is a freshly spawned subagent, never shared or reused across
iterations, and no transcripts are carried forward.

- [ ] **Step 1: Run Review** with the review brief. From iteration 2 on, include a summary of the
  last fix pass so it checks resolution rather than re-reviewing from scratch. Keep only the verdict
  and feedback items.

- [ ] **Step 2: Branch on the verdict.** Review is the sole authority on continuing — never override
  `CHANGES_REQUIRED` because another pass is slow or costly.
  - `CLEAN` → Step 4.
  - `CHANGES_REQUIRED` → increment the counter; over the cap → Step 5, else Step 3.
  - Blocking questions or an unparseable verdict → stop and return them to the caller.

- [ ] **Step 3: Run Apply-Fix** with the apply-fix brief, its instruction replaced by exactly
  Review's latest feedback items — never a general "improve this". Scope changes to the files those
  items point at; no unrelated cleanup, no new files unless an item requires one. Keep only its
  summary, then return to Step 1.

- [ ] **Step 4: Report convergence** — iterations run, what changed, the final clean verdict.

- [ ] **Step 5: Escalate on cap** — iteration history (which feedback recurred or kept changing) and
  the outstanding items. Hand the decision back to the caller; never force-accept or silently give up.
