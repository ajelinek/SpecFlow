# Evidence and decision criteria for local SpecFlow development

As of **28 October 2026**. Scope: a developer using coding agents against a local working tree, not cloud issue-to-PR automation. “Local” describes the development loop; it does not require on-device inference. These notes assess evidence and propose a decision method, not an audit of SpecFlow’s implementation. No study below directly compares this SpecFlow repository with current native agents.

## 1. What does empirical productivity evidence actually establish?

### Takeaway

There is no defensible universal productivity multiplier to apply to SpecFlow. The useful evidence supports measuring accepted outcomes and human effort locally, while keeping historical RCTs, biased follow-ups, surveys, and bounded agent benchmarks separate.

### Cited Findings

- **Historical controlled field evidence, now explicitly outdated:** METR’s July 10, 2025 study randomized 246 real tasks from 16 experienced open-source developers to AI-allowed or AI-disallowed conditions. AI use increased completion time by 19%; participants nevertheless believed it had helped. The current original page explicitly says these results are out of date and no longer reflect current models’ impact. This remains evidence that perceived speed and measured speed can diverge, not evidence that October 2026 agents slow developers by 19%. [METR original study and current warning](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).

- **Updated experiment, unreliable estimate:** METR’s February 24, 2026 continuation reports 57 developers, 143 repositories, and 800+ tasks. Its raw duration estimates are:

  | Population | Estimated change in task duration with AI | Reported confidence interval |
  | --- | --- | --- |
  | Returning developers | −18% | [−38%, +9%] |
  | Newly recruited developers | −4% | [−15%, +9%] |

  Negative duration change means faster completion. Both intervals include no change and some slowdown. More importantly, METR calls this an **unreliable signal**: AI enthusiasts declined participation; 30–50% of surveyed participants withheld some tasks because they did not want a no-AI assignment; pay fell from $150/hour to $50/hour; concurrent agents made time accounting difficult. METR believes speedup has likely increased, but explicitly describes its evidence about the size as very weak. The raw estimates are neither proof of uplift nor reliable population lower bounds. [METR design update](https://metr.org/blog/2026-02-24-uplift-update/).

- **Newer but not causal:** METR’s May 11 survey covers 349 technical workers, including 87 software engineers. Median self-reported value multipliers range from 1.4× to 2× across questions; median self-reported speed change is 3×. Recruitment was a convenience sample, email response was approximately 2%, and METR warns that counterfactual self-reports may overstate gains. These are beliefs about AI generally, not measured effects of a spec framework. [METR early-2026 usage survey](https://metr.org/blog/2026-05-11-ai-usage-survey/).

- **Recent controlled practitioner experiment, commercially interested author:** Naresh Jain’s October 13 experiment compared 10 paired runs per model on one greenfield Java API service, using the same detailed brief and an independent 178-check acceptance suite. GPT-6 Sol passed 10/10 with and without the behavioral harness; mean runtime rose from 6m51s to 19m53s and estimated inference cost from $0.406 to $2.679 with the harness. GPT-6 Luna passed 3/10 without it and 10/10 with it; runtime rose from 15m56s to 35m and estimated cost from $0.086 to $0.273. This is a concrete example of model-dependent overhead versus reliability. The author founded Specmatic, which implemented the harness. Authoring/maintenance, human repair costs, long-term quality, and a final-gate-only treatment were not measured. Ten successes are not proof of a 100% long-run success rate. [Are Harnesses Worth the Cost?](https://martinfowler.com/articles/are-harnesses-worth-the-cost.html).

### Inferences

- **Decision implication:** compare **native agent versus native agent plus SpecFlow**, not AI versus no AI. METR cannot settle that incremental question.
- Benchmark pass rate, generation time, developer attention, accepted-change lead time, and business value are different outcomes. More code, documents, tests, commits, or agent-hours are not sufficient evidence of productivity.
- The October experiment makes a useful hypothesis concrete: a strong model may need less process during construction, while independent acceptance checks remain useful. It does not establish that SpecFlow is unnecessary, or that replacing frontier models with cheaper ones saves total local development effort.

### Gaps

- No direct controlled evaluation of this SpecFlow versus October 2026 native workflows was found in the sources reviewed.
- No credible numerical estimate of this developer’s attention savings, defect reduction, maintenance burden, or long-term return follows from these studies.
- This is a bounded evidence review, not a systematic literature review. Search results advertising spec-driven development were not treated as causal evidence.

## 2. Which context, skill, specification, and coordination mechanisms are supported?

### Takeaway

Evidence favors selective, task-relevant procedural help and verification over assuming that more instructions, documents, or agents improve results. The distinction is between useful information or feedback and redundant process, not “specs good” versus “specs bad.”

### Cited Findings

#### Repository context: use the September revision, not February headlines

- **Controlled coding benchmark:** *Evaluating AGENTS.md* is pinned here to **arXiv:2602.11988v3, September 29, 2026**, not February v1. It evaluates SWE-bench Lite’s 300 tasks and CTXbench’s 138 tasks from 12 Python repositories, comparing no context, LLM-generated context, and developer-provided context where available. Its main conclusion is **no statistically significant improvement in task resolution**, rather than a blanket claim that human context is harmful. Developer-provided context has a small positive mean change, but its no-context comparison is nonsignificant (p=.21); generated-context comparisons are also nonsignificant. Generated files raise inference cost about 20% on SWE-bench and 23% on CTXbench. The paper’s aggregate language about cost should not be turned into a universal “every human-written file costs 20% more.” [ETH paper v3, §§3–4](https://arxiv.org/html/2602.11988v3).

- Agents followed context instructions, performing more testing, exploration, and repository-specific tool use. Repository overviews did not meaningfully accelerate discovery of relevant files. An ablation removing other documentation found generated context more useful, consistent with **redundancy**, not all context being intrinsically bad. Context-file length alone showed no clear performance/cost dependency. Its limitations explicitly exclude conclusions about security and code efficiency; it studies Python and test-defined issue resolution, not longitudinal human maintenance. [ETH paper v3, §§4–5 and Appendix B](https://arxiv.org/html/2602.11988v3).

#### Skills: positive paired results, with important transfer limits

- **Controlled benchmark by its creators:** use **SkillsBench 1.1 / arXiv:2602.12670v4, June 14, 2026**. The pinned paper evaluates **87 tasks across eight domains and 18 model–harness configurations**. Curated skills raise aggregate pass rate from **33.9% to 50.5%, +16.6 percentage points**. These are not the original February task/configuration counts or a live leaderboard fleet average. [SkillsBench paper v4](https://arxiv.org/abs/2602.12670v4).

- The release report describes matched with/without-skill runs, three trials per task, and deterministic verifiers. Its **software-engineering subset is 16 tasks**, with mean resolution moving **37.6% → 49.2%, +11.6 points**. Thirteen of 87 tasks have negative aggregate skill lift. Self-generated skills underperform no skills in the three reported configurations. Bundles of 2–3 skills show more lift than bundles of 4+, and exhaustive material less than focused material. Those quantity/length comparisons are task-group associations, not a randomized proof of an optimal module count. [SkillsBench 1.1 release report, June 16](https://www.skillsbench.ai/blogs/skillsbench-1-1).

- **Transfer limit:** SkillsBench tests curated task-specific expertise, including scripts/reference material, not the cost of a developer authoring and maintaining a broad lifecycle framework. The mixed-domain aggregate is mechanism evidence only for this decision; even the small coding subset does not establish human productivity or SpecFlow superiority. These findings do not contradict ETH: task-specific procedural help and largely redundant repository-wide summaries are different interventions. [SkillsBench v4](https://arxiv.org/abs/2602.12670v4); [ETH v3](https://arxiv.org/html/2602.11988v3).

#### Multi-agent coordination: current paper adds coding, but evidence remains bounded

- **Version trap:** Google’s January 28 article describes **180 configurations/four benchmarks**, reporting large gains on decomposable finance tasks and losses on sequential planning. The current **arXiv:2512.08296v3, April 8, 2026** instead covers **260 configurations/six benchmarks**, adding SWE-bench Verified and Terminal-Bench. The current paper reports cross-validated R²=.373, or .413 using task-grounded capability, rather than the older blog’s .513. Do not mix these versions or present the January noncoding results as coding productivity evidence. [Google January article](https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/); [paper v3](https://arxiv.org/html/2512.08296v3).

- In v3’s coding subset, all multi-agent architectures have lower mean SWE-bench resolution than the single-agent baseline: **52.2% single; 51.1% hybrid; 50.6% centralized; 49.4% decentralized; 44.4% independent**. However, these are only **20 SWE-bench instances per configuration**, with broad per-cell intervals, typically about ±20 percentage points. The authors say individual comparisons are underpowered. Terminal-Bench results are mixed. These are bounded autonomous runs under matched budgets, not a trial of human-led feature design, isolated review agents, or this SpecFlow implementation. [Paper v3, §4.2, §5, Appendix F](https://arxiv.org/html/2512.08296v3).

- The directionally useful mechanisms are communication/coordination overhead, fragmented context, sequential dependencies, and diminishing returns when one agent already succeeds. Some regression effects weaken under cluster-robust inference; the paper identifies capability saturation as the most robust result. The often-quoted **17.2× versus 4.4× error amplification** is a **trace-level work/propagation measure**, not a multiplier on escaped software defects. Neither its ~45% threshold nor its architecture-selection accuracy should become a production routing rule without local validation. [Paper v3, §§3.1, 4.3–4.5, 5](https://arxiv.org/html/2512.08296v3).

#### Specifications: practitioner rationale, not framework superiority

- **Independent-of-these-tool-vendors practitioner critique:** Birgitta Böckeler’s October 15, 2025 exploration distinguishes **spec-first**, **spec-anchored**, and **spec-as-source**. She found excessive/repetitive Markdown and disproportionate process for small brownfield changes, plus ignored instructions and duplicated existing code despite research artifacts. She also says she often carefully specifies work herself. These are transparent personal observations from a small exploration, not randomized comparisons or a verdict on current tool versions. [Understanding Spec-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html).

- **Positive practitioner experience:** Wei Zhang and Jessie Xia’s April 28, 2026 SPDD report advocates versioned intent, domain concepts, constraints, reusable norms, and iterative review. It supplies a worked billing-engine example and a prompt/code synchronization workflow. It explicitly identifies overhead and poor fit for disposable scripts, spikes, and hotfixes. The example’s “~99% intent alignment” is an author assertion, not an independently measured effect or controlled superiority result. This is a plausible account of governance and knowledge-retention benefits, especially across people and repeated business logic; it does not quantify benefits for one local developer. [Structured-Prompt-Driven Development](https://martinfowler.com/articles/structured-prompt-driven).

### Inferences

- **Provisional simplification target:** retain concise behavior/acceptance criteria, actual non-obvious domain or repository constraints, task-sized planning, and executable checks. Make durable specifications earn their synchronization cost through real reuse.
- Treat broad context duplication, generated prose to review, mandatory phase transitions, and always-on multi-agent handoffs as **hypotheses requiring evidence**, not best practices validated by these papers.
- Use delegation when work is genuinely separable or an independent review addresses a known failure mode. A bounded reviewer is different from several agents jointly editing interdependent code. No source here proves that every isolated review pass is wasteful or beneficial.
- Context instructions can implement desired conventions without raising benchmark pass rate. Conversely, passing tests does not demonstrate security, maintainability, or correct interpretation of omitted requirements. The local quality rubric must cover what the studies omit.

### Gaps

- No reviewed study isolates the marginal value of Gherkin versus a short acceptance checklist, separate design artifacts versus one plan, or a persistent spec versus readable tests for this workflow.
- SkillsBench and agent-system papers are benchmark evidence, not independent longitudinal studies of framework ownership. Public creator-authored evaluations should not be relabeled independent replications.
- Whether SpecFlow avoids these costs already, and which of its individual skills change outcomes, requires repository analysis and local traces outside this assignment.

## 3. What would a fair keep/simplify/retire decision look like?

### Takeaway

**Provisional recommendation: simplify by default, retain the valuable constraints and quality gates, and run a 2–4-week native-versus-SpecFlow comparison before retiring the framework.** This is a decision proposal, not a research finding; historical investment and reassuring artifacts are not sufficient reasons to keep mandatory orchestration.

### Cited Findings

- METR’s task withholding, abandonment, concurrent-agent timing, and perceived-versus-measured gaps explain why task selection, complete time accounting, and recording failures matter. [February design update](https://metr.org/blog/2026-02-24-uplift-update/); [historical perception gap](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
- SkillsBench’s paired conditions illustrate holding the task/environment/model–harness combination constant. The October harness experiment illustrates separating development guidance from an independent acceptance gate, but also the danger of excluding authoring and maintenance costs. [SkillsBench release method](https://www.skillsbench.ai/blogs/skillsbench-1-1); [October experiment and limitations](https://martinfowler.com/articles/are-harnesses-worth-the-cost.html).
- Böckeler’s critique and SPDD’s fit assessment both support distinguishing task sizes and intentions rather than treating every change as the same workflow. This is practitioner judgment, not an experimentally established task-size cutoff. [SDD critique](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html); [SPDD fit assessment](https://martinfowler.com/articles/structured-prompt-driven).

### Inferences

#### Proposed trial design (all numbers and thresholds below are subjective operating choices)

1. **Prepare, then freeze.** Give the developer a short unscored native-workflow familiarization period. Record exact agent/harness version, model version, reasoning setting, tool access, permissions, repository state, and SpecFlow revision. Use the **same model and settings in both arms**. Do not compare old-model SpecFlow with newer-model native, or quietly route SpecFlow’s subtasks to different models. Test cheaper-model strategies separately later.
2. **Define a strong baseline.** Native means the agent’s normal planning, search, editing, testing, and available native features, with shared project docs, essential safety/convention instructions, and existing useful domain skills. It is not “one vague prompt, no tests.” The treatment is that baseline **plus the frozen SpecFlow workflow and its incremental artifacts/coordination**. Inventory overlaps first; record exactly what is added. Keep product requirements, repository access, acceptance criteria, and quality standards equal.
3. **Sample real work prospectively.** For 2–4 working weeks, aim for roughly 12–20 completed tasks if the normal workload allows. Pre-register eligible tasks before assigning an arm. Block by bug/feature/refactor and rough size, risk, ambiguity, and repository familiarity; randomly assign within comparable blocks. Include small fixes and substantial brownfield changes. Keep inherently unsuitable or high-risk tasks outside the experiment, but record the exclusion rule and the resulting scope limit.
4. **Avoid replay and leakage.** Do not implement the same task twice sequentially and call it a fair comparison: the second attempt benefits from learning. Use comparable different real tasks. Start fresh sessions and prevent trial-generated SpecFlow artifacts from entering a later native task unless they have become genuinely shared product documentation; log carryover explicitly. Share the same preexisting documentation in both arms rather than deleting legitimate context to handicap either one.
5. **Use equal acceptance rules and comparable stopping budgets.** Decide what accepted means before implementation: behavior, relevant regression tests, build/type/lint checks, necessary security/data/accessibility checks, and a human maintainability/scope review. Existing deterministic tests and independent checks remain available in both arms. Do not allow either agent to redefine expected behavior or weaken checks to manufacture success. Any developer rescue, switch of arm, timeout, or abandoned change stays in the assigned arm’s record.
6. **Count lifecycle work.** Start the clock at task clarification, not first code generation. Include spec authoring/review, planning, routing, approvals, reading handoffs, implementation, verification, document sync, corrections, and framework debugging. Keep task-specific setup and recurring framework maintenance visible; report one-time onboarding separately and amortize it under an explicit expected future usage period. Sunk past investment is not a future operating cost.
7. **Follow accepted work for 7–14 days.** Record regressions, requirement misses, reopenings, and repair/review minutes. A 2–4-week implementation trial needs that additional follow-up for its last tasks; do not report immature tasks as defect-free. Changes with no real usage cannot establish long-term quality.

#### Measurements

| Measure | Proposed operational definition |
| --- | --- |
| **Human attention (primary)** | Active minutes clarifying, prompting, reviewing specs/code, responding to agents, diagnosing failures, testing, repairing, and maintaining workflow artifacts. Track interventions/context switches separately. |
| **Time to accepted change** | Elapsed working time from clarification start to passing the common acceptance gate; report blocked external time and unattended agent wait separately. Also report post-acceptance repairs rather than hiding them. |
| **Rework** | Correction/review minutes before acceptance plus defect/reopening count and repair minutes during the following 7–14 days. Label severity and cause. |
| **Cost** | Actual measured inference/tool cost or subscription usage/quota consumption, plus recurring maintenance attention. Include failed runs and every delegated agent. Do not infer billed dollars from tokens alone. |
| **Quality guardrail** | Same required checks; reviewer rubric for correctness, unwanted changes, security, maintainability, test adequacy, and requirement coverage; escaped defects by severity. Reviewer blind to arm where practical. |
| **Secondary experience** | Per-task confidence, control, fatigue, and satisfaction. Useful for sustainability, but not substitutes for measured outcomes. |

Track non-overlapping attention intervals: concurrent agents do not create extra human hours, but all their compute costs count. Avoid double-counting overlapping task wall time as developer labor. A native arm that saves attention but finishes later may still be valuable; keep the two measures distinct.

#### Proposed decision rules

Use within-size/type comparisons, task-level records, medians and ranges, and the count of comparable blocks favoring each arm. Include unfinished tasks and absolute minutes, not only percentages. With a small, heterogeneous single-user sample, do not call nonsignificance equivalence or claim a universal causal effect.

- **Keep a substantial workflow** where it saves about **15% or more human attention**, or shows a clear reduction in consequential defects/rework on complex changes, without unacceptable delay or cost. Quality improvements can justify slower generation, but the trade-off must be explicit. Require the benefit to recur beyond one unusually successful task.
- **Simplify** where benefits cluster in a few steps or high-risk task classes. Retain those steps and bypass the rest for routine work. For example, keep requirements/examples and the final gate while making extra design documents, repeated review loops, or delegation opt-in. Validate the resulting lightweight workflow on a follow-up block; do not assume removing several steps preserves all benefits.
- **Retire mandatory SpecFlow orchestration** if native meets the same quality guardrail and full SpecFlow repeatedly uses roughly **15–20% more attention** or materially more accepted-change time/cost, without an offsetting quality or reuse benefit. Archive reusable domain guidance, tests, decisions, and exceptional-case playbooks rather than deleting useful knowledge.
- **Hold judgment** if results are mixed, defects are too rare to assess, task balance is poor, or the model changes mid-trial. Extend the sample or decide only for the observed task class. A single serious framework-attributable safety failure can pause that workflow regardless of average speed; a similar native failure deserves the same response.

The percentages above are **proposed local materiality thresholds**, not thresholds supplied by METR, ETH, SkillsBench, or Google. Choose them in advance based on how much maintenance burden and risk this developer is willing to accept.

### Gaps

- A 2–4-week trial can support a practical single-user operating decision, not establish rare-defect safety, six-month maintainability, or portability to other developers/models.
- Quality equivalence is difficult to demonstrate with few tasks. Preserve deterministic gates and record uncertainty even if no regressions appear.
- Durable specifications may pay back only when features are revisited. If that benefit is central, schedule a later maintenance/re-entry task and measure the cost of understanding and updating it; do not book an unobserved future saving as a current result.
