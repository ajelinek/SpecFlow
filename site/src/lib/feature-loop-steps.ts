/**
 * feature-loop-steps.ts
 *
 * Pure data describing 901-feature-loop's 22-step run, grouped into phases,
 * for the FeatureLoopFlow.astro visualization. No Astro/DOM dependencies.
 *
 * Kept in lock-step with skills/901-feature-loop/SKILL.md — if that file's
 * Steps section changes, update this data to match.
 */

export type StepKind = 'normal' | 'gate' | 'consult' | 'loop';

export interface SkillRef {
  /** e.g. "201-high-level-design" */
  id: string;
  /** e.g. "always", "if a test fails" */
  when?: string;
}

export interface AgentRef {
  /** e.g. "@validator" or "general-purpose" */
  id: string;
  when?: string;
}

export interface LoopStepDetail {
  outerLabel: string;
  innerLabel: string;
  innerActions: string[];
  afterActions: string[];
}

export interface FeatureLoopStep {
  num: number;
  title: string;
  kind: StepKind;
  skills: SkillRef[];
  agents: AgentRef[];
  description: string;
  commit?: string;
  techNote?: string;
  loop?: LoopStepDetail;
}

export interface FeatureLoopPhase {
  id: string;
  label: string;
  title: string;
  steps: FeatureLoopStep[];
}

export interface LogEventType {
  type: string;
  writtenAt: string;
  fields: string;
  sample: string;
}

/**
 * `.specflow/features/<fid>-<feature-slug>/implementation-log.jsonl` — the run's own
 * append-only audit trail, one JSON object per line. Mirrors the event table in
 * skills/901-feature-loop/SKILL.md's "Implementation Log" section.
 */
export const implementationLogEvents: LogEventType[] = [
  {
    type: 'run_init',
    writtenAt: 'Step 4, once',
    fields: 'fid, feature, branch, base_branch, round_2_coverage',
    sample:
      '{"type":"run_init","ts":"2026-07-19T14:02:11Z","fid":"F013","feature":"invoice-approval","branch":"feature/F013-invoice-approval","base_branch":"main","round_2_coverage":"balanced"}',
  },
  {
    type: 'step_complete',
    writtenAt: 'after every top-level step',
    fields: 'step, phase, commit, summary',
    sample:
      '{"type":"step_complete","ts":"2026-07-19T14:11:47Z","step":6,"phase":"Phase 1","commit":"a1b2c3d","summary":"201 high-level design committed"}',
  },
  {
    type: 'decision_consult',
    writtenAt: 'every Decision Consult call',
    fields: 'step, question, decision, confidence',
    sample:
      '{"type":"decision_consult","ts":"2026-07-19T15:03:02Z","step":10,"question":"Module Check regression in TSM003","decision":"revised-approach retry","confidence":"high"}',
  },
  {
    type: 'feedback_pass',
    writtenAt: 'every Feedback Pass',
    fields: 'step, flavor, iterations, converged',
    sample:
      '{"type":"feedback_pass","ts":"2026-07-19T15:22:39Z","step":11,"flavor":"aggregate-cleanup","iterations":1,"converged":true}',
  },
  {
    type: 'resume',
    writtenAt: 'Step 3, when resuming a prior run',
    fields: 'step, phase, found',
    sample:
      '{"type":"resume","ts":"2026-07-19T16:47:10Z","step":8,"phase":"Phase 2","found":"round-1 specs already committed"}',
  },
  {
    type: 'terminal',
    writtenAt: 'Step 19 non-convergence',
    fields: 'step, reason',
    sample:
      '{"type":"terminal","ts":"2026-07-19T17:58:24Z","step":19,"reason":"lint non-convergence after widened retry"}',
  },
  {
    type: 'run_complete',
    writtenAt: 'Step 22, once',
    fields: 'step: 22',
    sample: '{"type":"run_complete","ts":"2026-07-19T18:04:56Z","step":22}',
  },
];

const loopStep10: LoopStepDetail = {
  outerLabel: 'Outer loop — repeat for every TSM# module in the happy-path set',
  innerLabel: 'Inner loop — repeat for every @TS### scenario inside that module',
  innerActions: [
    'Run 301-spec-implementation scoped to exactly that scenario',
    'Replace its status tag with @status_done in specs.feature',
  ],
  afterActions: [
    'Run one Module Check across the whole module',
    'Commit once for the whole module',
  ],
};

const loopStep16: LoopStepDetail = {
  outerLabel: 'Outer loop — repeat for every TSM# module Step 14 touched',
  innerLabel: 'Inner loop — repeat for every new @status_pending scenario in that module',
  innerActions: [
    'Run 301-spec-implementation scoped to exactly that scenario',
    'Replace its status tag with @status_done in specs.feature',
  ],
  afterActions: [
    'Run one Module Check across the whole module (including its already-done scenarios)',
    'Commit once for the whole module',
  ],
};

export const featureLoopPhases: FeatureLoopPhase[] = [
  {
    id: 'phase-0',
    label: 'Phase 0',
    title: 'Set Up',
    steps: [
      {
        num: 1,
        title: 'Verify a clean working tree',
        kind: 'consult',
        skills: [],
        agents: [{ id: '@decider', when: 'if the tree is dirty' }],
        description:
          '`git status --porcelain` must be empty. If not, the Decision Consult picks between a pre-run commit or `git stash push -u`; default is stash.',
      },
      {
        num: 2,
        title: 'Establish and confirm a green baseline',
        kind: 'gate',
        skills: [{ id: '402-test-correction', when: 'if a test fails' }],
        agents: [
          { id: '@validator' },
          { id: '@coder', when: 'lint/build repair' },
          { id: '@decider', when: 'standard fallback' },
        ],
        description:
          'A Green Check before any design or code work starts. A baseline that still can’t go green after consult-driven retries ends the run here with a terminal report — one of only two checkpoints (the other is Step 19) where ending without a merge is correct.',
      },
      {
        num: 3,
        title: 'Resolve feature identity',
        kind: 'consult',
        skills: [{ id: '201-high-level-design', when: 'borrows its identity rule' }],
        agents: [{ id: '@decider' }],
        description:
          'Uses `201`’s own resolution rule against `D10`. No entry → assign a new F-ID (default). `status: done` → start a new run for follow-on work (default). `status: implementing` → resume (default).',
      },
      {
        num: 4,
        title: 'Create the feature branch',
        kind: 'consult',
        skills: [],
        agents: [{ id: '@decider', when: 'if the branch name already exists' }],
        description:
          'Records the current branch as base, then creates and checks out `feature/<fid>-<feature-slug>`. This is the divergence point — everything from here runs on the feature branch.',
      },
      {
        num: 5,
        title: 'Resolve round-2 coverage',
        kind: 'normal',
        skills: [],
        agents: [],
        description: '`none`, `balanced`, or `comprehensive` — default `balanced` if unstated.',
      },
    ],
  },
  {
    id: 'phase-1',
    label: 'Phase 1',
    title: 'High-Level Design',
    steps: [
      {
        num: 6,
        title: 'Run 201-high-level-design',
        kind: 'normal',
        skills: [{ id: '201-high-level-design' }],
        agents: [],
        description: 'Directly, for the feature identity resolved in Step 3.',
        commit: '201: high-level design for <feature-slug>',
      },
      {
        num: 7,
        title: 'Feedback Pass — artifact refine on the overview',
        kind: 'normal',
        skills: [{ id: '900-feedback-loop' }],
        agents: [{ id: '@reviewer' }, { id: 'general-purpose', when: 'apply-fix, pinned sonnet' }],
        description:
          'Criteria: scope clarity, real acceptance criteria, explicit out-of-scope exclusions, a user-journey that leads with user-visible flow (201’s own quality checks). Iteration cap: 1.',
        commit: '900: refine 201 overview for <feature-slug>',
      },
    ],
  },
  {
    id: 'phase-2',
    label: 'Phase 2',
    title: 'Round 1 — Happy Path',
    steps: [
      {
        num: 8,
        title: 'Run 202-spec-design (Happy Path Only)',
        kind: 'normal',
        skills: [{ id: '202-spec-design' }],
        agents: [],
        description:
          'Produces `specs.feature` scenarios grouped into `TSM#` modules — the unit the build loop below batches against.',
        commit: '202: happy-path specs for <feature-slug>',
      },
      {
        num: 9,
        title: 'Feedback Pass — artifact refine on the specs',
        kind: 'normal',
        skills: [{ id: '900-feedback-loop' }],
        agents: [{ id: '@reviewer' }, { id: 'general-purpose', when: 'apply-fix, pinned sonnet' }],
        description: 'Criteria from 202’s own quality check. Iteration cap: 1.',
        commit: '900: refine 202 happy-path specs for <feature-slug>',
      },
      {
        num: 10,
        title: 'Build out each happy-path module, one scenario at a time',
        kind: 'loop',
        skills: [
          { id: '301-spec-implementation', when: 'once per scenario' },
          { id: '402-test-correction', when: 'if a test fails' },
        ],
        agents: [
          { id: '@validator', when: 'Module Check' },
          { id: '@coder', when: 'lint/build repair' },
          { id: '@decider', when: 'per-module fallback' },
        ],
        description:
          'The module — not the individual scenario — is the unit that gets checked and committed. Each scenario still gets its own full 301 tests-first pass; only the Module Check and the commit batch to the whole module.',
        commit: 'test cycle: <TSM###> implement + status',
        techNote:
          'Skips its own cleanup — Steps 11/12 clean these files in aggregate at round end.',
        loop: loopStep10,
      },
      {
        num: 11,
        title: 'Feedback Pass — aggregate cleanup on round-1 source',
        kind: 'normal',
        skills: [{ id: '900-feedback-loop' }, { id: '401-cleanup', when: 'called by 900’s apply-fix' }],
        agents: [{ id: '@reviewer' }, { id: 'general-purpose', when: 'apply-fix, pinned sonnet' }],
        description:
          'Scope: the round-1 source diff, `source-cleanup-only`, strictly bounded to round-1 files. Iteration cap: 2.',
        commit: '900: round-1 source cleanup',
      },
      {
        num: 12,
        title: 'Feedback Pass — aggregate cleanup on round-1 tests',
        kind: 'normal',
        skills: [{ id: '900-feedback-loop' }, { id: '401-cleanup', when: 'called by 900’s apply-fix' }],
        agents: [{ id: '@reviewer' }, { id: 'general-purpose', when: 'apply-fix, pinned sonnet' }],
        description: 'Same as Step 11, `test-cleanup-only`, round-1 test files. Iteration cap: 2.',
        commit: '900: round-1 test cleanup',
      },
      {
        num: 13,
        title: 'Run a Green Check to close out Round 1',
        kind: 'gate',
        skills: [{ id: '402-test-correction', when: 'if a test fails' }],
        agents: [{ id: '@validator' }, { id: '@coder', when: 'lint/build repair' }, { id: '@decider', when: 'standard fallback' }],
        description:
          'A failure here is a mid-run regression from Round 1’s own work, not a baseline issue.',
        commit: 'green check: round-1 fixes',
      },
    ],
  },
  {
    id: 'phase-3',
    label: 'Phase 3',
    title: 'Round 2 — Expanded Coverage',
    steps: [
      {
        num: 14,
        title: 'Run 202-spec-design again',
        kind: 'normal',
        skills: [{ id: '202-spec-design' }],
        agents: [],
        description: 'Coverage: the resolved round-2 level (balanced or comprehensive).',
        commit: '202: <level> specs for <feature-slug>',
      },
      {
        num: 15,
        title: 'Feedback Pass — artifact refine on the updated specs',
        kind: 'normal',
        skills: [{ id: '900-feedback-loop' }],
        agents: [{ id: '@reviewer' }, { id: 'general-purpose', when: 'apply-fix, pinned sonnet' }],
        description: 'Same as Step 9. Iteration cap: 1.',
      },
      {
        num: 16,
        title: 'Build out each newly touched module',
        kind: 'loop',
        skills: [
          { id: '301-spec-implementation', when: 'once per new scenario' },
          { id: '402-test-correction', when: 'if a test fails' },
        ],
        agents: [
          { id: '@validator', when: 'Module Check' },
          { id: '@coder', when: 'lint/build repair' },
          { id: '@decider', when: 'per-module fallback' },
        ],
        description:
          'Same shape as Step 10, scoped only to the TSM# modules Step 14 touched. A module’s round-1 @status_done scenarios aren’t rebuilt, but they’re still covered by that module’s Module Check.',
        commit: 'test cycle: <TSM###> implement + status',
        loop: loopStep16,
      },
      {
        num: 17,
        title: 'Feedback Pass — aggregate cleanup on final source',
        kind: 'normal',
        skills: [{ id: '900-feedback-loop' }, { id: '401-cleanup', when: 'called by 900’s apply-fix' }],
        agents: [{ id: '@reviewer' }, { id: 'general-purpose', when: 'apply-fix, pinned sonnet' }],
        description:
          'Scope: the entire feature-branch diff — this final round pre-authorizes scope expansion past 401’s normal approval gate. Iteration cap: 2.',
        commit: '900: final source cleanup',
      },
      {
        num: 18,
        title: 'Feedback Pass — aggregate cleanup on final tests',
        kind: 'normal',
        skills: [{ id: '900-feedback-loop' }, { id: '401-cleanup', when: 'called by 900’s apply-fix' }],
        agents: [{ id: '@reviewer' }, { id: 'general-purpose', when: 'apply-fix, pinned sonnet' }],
        description: 'Same expanded authorization as Step 17, test files. Iteration cap: 2.',
        commit: '900: final test cleanup',
      },
    ],
  },
  {
    id: 'phase-4',
    label: 'Phase 4',
    title: 'Finalize',
    steps: [
      {
        num: 19,
        title: 'Run the final Green Check',
        kind: 'gate',
        skills: [{ id: '402-test-correction', when: 'if a test fails' }],
        agents: [{ id: '@validator' }, { id: '@coder', when: 'lint/build repair' }, { id: '@decider', when: 'standard fallback' }],
        description:
          'Never merge on red. If consult-driven retries don’t converge, the run ends with a terminal report instead of merging — this and Step 2 are the only two points where the run ends without a merge.',
      },
      {
        num: 20,
        title: 'Update feature status',
        kind: 'normal',
        skills: [],
        agents: [],
        description:
          'Set `status: done` in `overview.md`. Update `D10-feature-overview.md` to 🟢 Done if that registry tracks this F-ID.',
      },
      {
        num: 21,
        title: 'Merge back',
        kind: 'gate',
        skills: [{ id: '402-test-correction', when: 'if a test fails during revalidation' }],
        agents: [
          { id: '@decider', when: 'merge conflict resolution' },
          { id: '@validator', when: 'post-merge revalidation' },
          { id: '@coder', when: 'lint/build repair' },
        ],
        description:
          '`git merge --no-ff` into the recorded base branch. A conflict routes to the Decision Consult (default: resolve favoring the feature branch), then the full Green Check reruns before this step counts as complete.',
      },
      {
        num: 22,
        title: 'Summarize',
        kind: 'normal',
        skills: [],
        agents: [],
        description:
          'Feature identity, branch name, round-2 coverage used, the full commit ledger, modules/scenarios per round, Feedback Pass iteration counts, final validation result, the merge commit, and every Decision Consult invoked with its resolution.',
      },
    ],
  },
];
