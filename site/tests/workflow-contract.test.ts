/** Static instruction contracts, not proof of agent runtime behavior. */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect, it } from 'vitest';

const ROOT = path.resolve(__dirname, '../..');

function readWorkflow(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function implementationWorkflow(): string {
  return readWorkflow('skills/301-spec-implementation/SKILL.md').replace(/\s+/g, ' ');
}

it('101 carries differentiation and success signals from its workflow into the template and docs', () => {
  const workflow = readWorkflow('skills/101-project-overview/SKILL.md');
  const template = readWorkflow('skills/101-project-overview/templates/T01 - Project Overview.md');
  const docs = readWorkflow('site/src/content/docs/project-foundation/101-project-overview.mdx');
  expect(workflow).toMatch(/\*\*Differentiation\*\*/);
  expect(workflow).toMatch(/\*\*Success Signals\*\*/);
  expect(template).toMatch(/^### Differentiation$/m);
  expect(template).toMatch(/^## \d+\. Success Signals$/m);
  expect(docs).toMatch(/differentiation from current alternatives/);
  expect(docs).toMatch(/Observable success signals/);
});

it('101 sizes scenarios to core value instead of requiring a scenario quota', () => {
  const paths = [
    'skills/101-project-overview/SKILL.md',
    'skills/101-project-overview/templates/T01 - Project Overview.md',
    'site/src/content/docs/project-foundation/101-project-overview.mdx',
  ];
  for (const relativePath of paths) {
    const content = readWorkflow(relativePath);
    expect(content, relativePath).toMatch(/no fixed|without a fixed/);
    expect(content, relativePath).not.toMatch(/3[-–]5/);
  }
});

it('101 names the generated document consistently and removes empty optional sections before writing', () => {
  const workflow = readWorkflow('skills/101-project-overview/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/101-project-overview/templates/T01 - Project Overview.md');
  expect(template).toMatch(/^# D01 — Project Overview$/m);
  expect(template).not.toMatch(/^# T01/m);
  expect(workflow).toMatch(/Remove template instructions, placeholders, and empty optional sections before writing/);
  expect(template).toMatch(/Omit Technology Constraints & Preferences and Open Questions when they don't apply/);
});

it('102 loads project evidence before resolving technology choices and respects confirmed constraints', () => {
  const workflow = readWorkflow('skills/102-system-architecture/SKILL.md').replace(/\s+/g, ' ');
  expect(workflow).toMatch(/Step 1: Load project context.*Step 2: Validate inputs.*Step 3: Resolve technology choices/);
  expect(workflow).toMatch(/Respect confirmed user decisions and binding project rules/);
  expect(workflow).toMatch(/installed skills.*not override project constraints/);
  expect(workflow).toMatch(/Surface conflicts/);
  expect(workflow).toMatch(/recommend an option.*ask for confirmation/);
  expect(workflow).toMatch(/Defer non-blocking decisions to Open Questions/);
});

it('102 sizes architecture and testing to the project instead of requiring every layer', () => {
  const workflow = readWorkflow('skills/102-system-architecture/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/102-system-architecture/templates/T02 - System Architecture.md');
  const docs = readWorkflow('site/src/content/docs/project-foundation/102-system-architecture.mdx');
  expect(workflow).toMatch(/without quotas or mandatory layers/);
  expect(template).toMatch(/only applicable bullets and rows/);
  expect(template).not.toMatch(/Every layer filled in|\*\*(?:Frontend|Backend|Database|Unit Testing|Integration Testing|End-to-End Testing)\*\*/);
  expect(docs).toMatch(/no fixed counts or required testing layers/);
  expect(docs).not.toMatch(/first from installed skills/);
});

it('102 uses a consistent document title and keeps risks, testing scope, and unresolved decisions visible', () => {
  const workflow = readWorkflow('skills/102-system-architecture/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/102-system-architecture/templates/T02 - System Architecture.md');
  expect(template).toMatch(/^# D02 — System Architecture$/m);
  expect(template).toMatch(/Risks & safeguards/);
  expect(template).toMatch(/Check \| Tool \/ Method \| Scope/);
  expect(template).toMatch(/Omit Open Questions when none remain/);
  expect(workflow).toMatch(/Remove template instructions, placeholders, and empty optional sections before writing/);
});

it('removes retired design workflows and their template', () => {
  expect(fs.existsSync(path.join(ROOT, 'skills/203-implementation-design/SKILL.md'))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, 'skills/203-implementation-design/templates/implementation.md'))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, 'skills/204-feature-validation/SKILL.md'))).toBe(false);
});

it('active workflow consumers do not require retired skills or a standard implementation artifact', () => {
  const consumers = [
    'skills/201-high-level-design/SKILL.md',
    'skills/202-spec-design/SKILL.md',
    'skills/301-spec-implementation/SKILL.md',
    'skills/302-test-implementation/SKILL.md',
    'skills/901-feature-loop/SKILL.md',
    'skills/engineering-principles/SKILL.md',
    'skills/context-manager/examples/specflow-AGENTS.md',
  ];
  for (const consumer of consumers) {
    expect(readWorkflow(consumer), consumer).not.toMatch(/\b20[34]\b|implementation\.md/);
  }
});

it('301 orders preparation, design, independent design reviews, coding, refinement, and final validation', () => {
  const content = readWorkflow('skills/301-spec-implementation/SKILL.md');
  const phases = [...content.matchAll(/^### Phase (\d) - (.+)$/gm)];
  expect(phases.map((phase) => phase[1])).toEqual(['0', '1', '2', '3', '4', '5']);
  expect(phases.map((phase) => phase[2]).join(' → ')).toMatch(
    /Prepare.*Design Brief.*Independent Design Review.*Tests-First.*Review and Refinement.*Final Validation/,
  );
});

it('301 synthesizes missing upstream context inline without implicit artifact creation or coverage defaults', () => {
  const content = implementationWorkflow();
  expect(content).toMatch(/201.*202.*guidance/);
  expect(content).toMatch(/no folders or artifacts.*unless.*requested/);
  expect(content).toMatch(/coverage.*existing.*request/);
  expect(content).toMatch(/coverage.*blocking question/);
  expect(content).toMatch(/material scenario revisions.*202-spec-design/);
  expect(content).toMatch(/inline context.*handoff/);
});

it('301 implements existing selected scenarios without requiring a coverage-level classification', () => {
  const content = implementationWorkflow();
  expect(content).toMatch(/Implementing existing selected scenarios does not require classifying their coverage level/);
  expect(content).toMatch(/coverage choice is needed only when synthesizing or materially revising scenarios/i);
  expect(content).toMatch(/generation or revision.*request or context.*blocking question/);
});

it('301 gives independent read-only reviewers the same complete frozen revision, not inherited memory or sibling conclusions', () => {
  const content = implementationWorkflow();
  expect(content).toMatch(/two fresh, independent, read-only/);
  expect(content).toMatch(/same complete frozen brief revision/);
  expect(content).toMatch(/Never rely on inherited memory/);
  expect(content).toMatch(/no sibling conclusions/);
  expect(content).toMatch(/walkthrough.*completeness.*integration.*reuse/i);
  expect(content).toMatch(/adversarial.*failure.*security.*concurrency.*compatibility/i);
});

it('301 blocks coding on every unresolved readiness criterion and resolves evidence rather than votes', () => {
  const content = implementationWorkflow();
  expect(content).toMatch(/any unresolved readiness criterion blocks coding/i);
  expect(content).toMatch(/evidence, not votes/);
  expect(content).toMatch(/severity.*evidence.*smallest fix/);
  expect(content).toMatch(/advisories.*explicit disposition/);
  expect(content).toMatch(/accepted revision.*coder/);
});

it('301 caps repair rounds and invalidates design approval on material discoveries', () => {
  const content = implementationWorkflow();
  expect(content).toMatch(/at most two repair rounds after the initial reviews/);
  expect(content).toMatch(/both roles.*shared assumptions/);
  expect(content).toMatch(/terminal design blocker/);
  expect(content).toMatch(/Material design discoveries invalidate approval/);
  expect(content).toMatch(/rechecks before further implementation/);
  expect(content).toMatch(/same repair-round budget, never a fresh cap/);
});

it('301 rebuilds interrupted design context and preserves consumed repair rounds', () => {
  const content = implementationWorkflow();
  expect(content).toMatch(/resuming.*rebuild.*current artifacts and code/);
  expect(content).toMatch(/rerun both independent readiness reviews/);
  expect(content).toMatch(/Carry forward consumed repair rounds/);
  expect(content).toMatch(/repair history cannot be recovered, stop/);
});

it('301 preserves tests-first checkpoints, fresh diff review, and one final multi-mode validator', () => {
  const content = implementationWorkflow();
  expect(content).toMatch(/one implementation coder/i);
  expect(content).toMatch(/Pre-existing failures are a blocking question/);
  expect(content).toMatch(/No production code is written before failing/);
  expect(content).toMatch(/actual scoped diff/);
  expect(content).toMatch(/Preserve assertions and coverage/);
  expect(content).toMatch(/does not invoke `401-cleanup`/);
  expect(content).toMatch(/One `@validator` assignment, `modes: \[test, lint, build\]`/);
});

it('301 distinguishes whole-feature completion from partial-scope completion', () => {
  const content = readWorkflow('skills/301-spec-implementation/SKILL.md');
  const completion = content.slice(content.indexOf('**Step 19:'), content.indexOf('**Step 20:')).replace(/\s+/g, ' ');
  expect(completion).toMatch(/only when.*explicit.*whole feature.*all acceptance gates pass/);
  expect(completion).toMatch(/partial scope.*`implementing`.*scope complete/i);
  expect(completion).toMatch(/Under `901`.*caller owns.*Step 20/);
});

it('reviewer preserves the strict 900 verdict contract while supporting 301 review roles', () => {
  const content = readWorkflow('agents/reviewer.md').replace(/\s+/g, ' ');
  expect(content).toContain('## Verdict: CLEAN');
  expect(content).toContain('## Verdict: CHANGES_REQUIRED');
  expect(content).toMatch(/any unresolved item, however\s+small, means `CHANGES_REQUIRED`/);
  expect(content).toMatch(/301.*walkthrough/i);
  expect(content).toMatch(/adversarial/i);
  expect(content).toMatch(/Out-of-criteria observations/);
  expect(content).toMatch(/For `301`, include the reviewed revision even when clean/);
});

it('901 treats 301 design blockers as terminal, with no waiver or retry-reset', () => {
  const content = readWorkflow('skills/901-feature-loop/SKILL.md').replace(/\s+/g, ' ');
  expect(content).toMatch(/301.*terminal exception/);
  expect(content).toMatch(/cap exhaustion.*unresolved material design blocker/);
  expect(content).toMatch(/leave the branch unmerged/);
  expect(content).toMatch(/Never consult for a waiver or re-invoke.*reset/);
  expect(content).toMatch(/pending `301`.*rebuild.*re-review/);
  expect(content).toMatch(/prior ledger.*not design approval/);
  expect(content).toMatch(/includes.*independent design reviews/);
});

it('901 checks pending and terminal ledger state before treating an overview as completed', () => {
  const content = readWorkflow('skills/901-feature-loop/SKILL.md');
  const identity = content.slice(content.indexOf('**Step 3:'), content.indexOf('**Step 4:')).replace(/\s+/g, ' ');
  expect(identity).toMatch(/inspect.*`implementation-log\.jsonl`.*before interpreting.*`status: done`/i);
  expect(identity).toMatch(/incomplete.*overrides.*`status: done`/i);
  expect(identity).toMatch(/301.*terminal.*leave the branch unmerged/);
  expect(identity).toMatch(/Never consult.*new `F-ID`.*reset.*cap/);
  expect(identity).toMatch(/consumed repair rounds.*not reset/i);
});

it('901 owns whole-feature completion only after its final gate', () => {
  const content = readWorkflow('skills/901-feature-loop/SKILL.md');
  const completion = content.slice(content.indexOf('**Step 20:'), content.indexOf('**Step 21:')).replace(/\s+/g, ' ');
  expect(completion).toMatch(/Only after Step 19.*whole feature.*`status: done`/);
  expect(content.replace(/\s+/g, ' ')).toMatch(/901.*owns whole-feature completion.*not.*per-scenario `301`/);
});
