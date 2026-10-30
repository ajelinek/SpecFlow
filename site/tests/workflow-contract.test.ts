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

it('103 selects DBML, Markdown, or both without duplicating definitions', () => {
  const workflow = readWorkflow('skills/103-common-data-model/SKILL.md').replace(/\s+/g, ' ');
  const docs = readWorkflow('site/src/content/docs/project-foundation/103-common-data-model.mdx');
  expect(workflow).toContain('.specflow/docs/D03-common-data-model.dbml');
  expect(workflow).toContain('.specflow/docs/D03-common-data-model.md');
  expect(workflow).toMatch(/Mixed.*each defining only its own data/);
  expect(workflow).toMatch(/Confirm format changes or consolidation.*before replacing/);
  expect(docs).toContain('D03-common-data-model.dbml');
  expect(docs).toContain('D03-common-data-model.md');
  expect(docs).not.toMatch(/not a database schema/);
});

it('103 keeps relational design in one DBML with rule notes and evidence-based indexes', () => {
  const workflow = readWorkflow('skills/103-common-data-model/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/103-common-data-model/templates/T03 - Common Data Model.dbml');
  expect(workflow).toMatch(/one file for the whole project/);
  expect(workflow).toMatch(/don't split the model or import other DBML files/);
  expect(workflow).toMatch(/indexes for known access patterns, not speculative optimization/i);
  expect(workflow).toMatch(/Notes describe intent; they do not enforce it/);
  expect(template).toMatch(/Project project_name/);
  expect(template).toMatch(/Note business_rules/);
  expect(template).toMatch(/Note open_questions/);
  expect(template).not.toMatch(/^use\s*\{/m);
});

it('103 reports validation honestly without requiring bundled tooling', () => {
  const workflow = readWorkflow('skills/103-common-data-model/SKILL.md').replace(/\s+/g, ' ');
  expect(workflow).toMatch(/available compatible parser/);
  expect(workflow).toMatch(/parser validation was not run/);
  expect(workflow).toMatch(/Don't install dependencies or upload the model/);
  expect(workflow).toMatch(/not migrations, database enforcement code, ORM models, or API contracts/);
});

it('103 groups related tables under comment headings and notes, with local and global enums placed by scope', () => {
  const workflow = readWorkflow('skills/103-common-data-model/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/103-common-data-model/templates/T03 - Common Data Model.dbml');
  const records = template.slice(template.indexOf('// Records'), template.indexOf('// Activity'));
  const activity = template.slice(template.indexOf('// Activity'), template.indexOf('// Project-wide notes'));
  expect(workflow).toMatch(/prominent comment headings.*group-level note/);
  expect(workflow).toMatch(/enums beside the tables.*global enums at the bottom/);
  expect(template).toMatch(/\/\/ ={20,}\n\/\/ Records\n\/\/ ={20,}/);
  expect(records).toContain('Note records_overview');
  expect(records).toContain('Table parent_record');
  expect(records).toContain('Table child_record');
  expect(records).toMatch(/Enum child_kind[\s\S]*Table child_record/);
  expect(activity).toContain('Note activity_overview');
  expect(activity).toContain('Table record_activity');
  expect(template.indexOf('// Global enums')).toBeGreaterThan(template.indexOf('Note open_questions'));
  expect(template.lastIndexOf('Enum ')).toBe(template.indexOf('Enum record_status'));
});

it('103 retains a concise non-relational model without mandatory IDs or database-style diagrams', () => {
  const workflow = readWorkflow('skills/103-common-data-model/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/103-common-data-model/templates/T03 - Common Data Model.md');
  expect(template).toMatch(/^# D03 — Common Data Model$/m);
  expect(template).toContain('## Entities');
  expect(template).toContain('## Business Rules');
  expect(template).toMatch(/erDiagram\s+ENTITY_A \|\|--o\{ ENTITY_B : contains/);
  expect(template).not.toMatch(/\| `id` |\bPK\b|\bFK\b/);
  expect(workflow).toMatch(/value objects and enums need no invented ID/);
  expect(workflow).toMatch(/Remove template instructions, examples, placeholders, and empty optional sections/);
});

it('104 grounds backend decisions in project evidence before resolving gaps and proposals', () => {
  const workflow = readWorkflow('skills/104-backend-architecture/SKILL.md').replace(/\s+/g, ' ');
  expect(workflow).toMatch(/Step 1: Load project context.*Step 2: Resolve inputs.*Step 3: Resolve backend patterns/);
  expect(workflow).toMatch(/Respect confirmed user decisions and binding project rules/);
  expect(workflow).toMatch(/installed skills.*not override project constraints/);
  expect(workflow).toMatch(/recommend an option.*ask for confirmation/);
  expect(workflow).toMatch(/non-blocking.*Open Questions/);
});

it('104 keeps data definitions in D03 and makes runtime enforcement explicit', () => {
  const workflow = readWorkflow('skills/104-backend-architecture/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/104-backend-architecture/templates/T04 - Backend Architecture.md');
  const docs = readWorkflow('site/src/content/docs/project-foundation/104-backend-architecture.mdx');
  expect(workflow).toContain('D03-common-data-model.dbml');
  expect(workflow).toContain('D03-common-data-model.md');
  expect(workflow).toMatch(/D03 owns data definitions/);
  expect(workflow).toMatch(/where rules are enforced/);
  expect(template).toMatch(/Rule enforcement/);
  expect(docs).toMatch(/DBML, Markdown, or both/);
  expect([workflow, template, docs].join('\n')).not.toContain('D09');
});

it('104 uses a neutral, skimmable template without mandatory layers or auth defaults', () => {
  const workflow = readWorkflow('skills/104-backend-architecture/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/104-backend-architecture/templates/T04 - Backend Architecture.md');
  const docs = readWorkflow('site/src/content/docs/project-foundation/104-backend-architecture.mdx');
  expect(template.match(/^# .+$/gm)).toEqual(['# D04 — Backend Architecture']);
  expect(template).toMatch(/^<!--/);
  expect(template).toMatch(/only applicable bullets and rows/);
  expect(template).toMatch(/Omit Operations and Open Questions when they don't apply/);
  expect(template).toContain('## 4. Security');
  expect(template).not.toMatch(/&lt;!--|HS256|\/api\/v1\/auth|node-postgres|Do not add, remove, or rename/);
  expect(workflow).toMatch(/No mandatory service\/repository layers/);
  expect(workflow).toMatch(/public or unauthenticated access/);
  expect(workflow).toMatch(/Remove template instructions, examples, placeholders, and empty optional sections/);
  expect(docs).toMatch(/No default stack, authentication scheme, or service\/repository layers/);
});

it('105 checks project conventions before resolving frontend choices', () => {
  const workflow = readWorkflow('skills/105-frontend-architecture/SKILL.md').replace(/\s+/g, ' ');
  expect(workflow).toMatch(/Step 1: Load project context.*Step 2: Resolve inputs.*Step 3: Resolve frontend patterns/);
  expect(workflow).toMatch(/project guidance.*frontend conventions/i);
  expect(workflow).toMatch(/Respect confirmed user decisions and binding project rules/);
  expect(workflow).toMatch(/installed skills.*not override project conventions/);
  expect(workflow).toMatch(/Surface conflicts/);
  expect(workflow).toMatch(/recommend an option.*ask for confirmation/);
});

it('105 retains an annotated project folder structure and concise core rules across its outputs', () => {
  const workflow = readWorkflow('skills/105-frontend-architecture/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/105-frontend-architecture/templates/T05 - Frontend Architecture.md');
  const docs = readWorkflow('site/src/content/docs/project-foundation/105-frontend-architecture.mdx');
  expect(workflow).toMatch(/annotated.*folder tree/);
  expect(workflow).toMatch(/naming, imports, dependency direction, and reuse/);
  expect(template).toMatch(/^### Project Folder Structure$/m);
  expect(template).toMatch(/^### Core Rules$/m);
  expect(template).toMatch(/```text\n/);
  expect(template).toMatch(/Governing conventions/);
  expect(docs).toMatch(/annotated project folder tree/);
  expect(docs).toMatch(/Core rules/);
});

it('105 uses neutral prompts without prescribing libraries, folders, or state infrastructure', () => {
  const workflow = readWorkflow('skills/105-frontend-architecture/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/105-frontend-architecture/templates/T05 - Frontend Architecture.md');
  expect(template.match(/^# .+$/gm)).toEqual(['# D05 — Frontend Architecture']);
  expect(template).not.toMatch(/React 18|Zustand|TanStack|React Hook Form|src\/services|JWT|max 5 retries/);
  expect(workflow).toMatch(/Component, URL, global, and remote state.*thinking aid/);
  expect(workflow).toMatch(/native primitives.*not needed/i);
  expect(workflow).toMatch(/Remove template instructions, examples, placeholders, and empty optional sections/);
});

it('105 keeps upstream decisions and visual or navigation design in their owning documents', () => {
  const workflow = readWorkflow('skills/105-frontend-architecture/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/105-frontend-architecture/templates/T05 - Frontend Architecture.md');
  expect(workflow).toMatch(/D02 owns stack and system-level testing choices/);
  expect(workflow).toMatch(/D06 owns visual direction.*D07 owns product navigation and page inventory/);
  expect(template).toMatch(/Rendering & routing/);
  expect(template).toMatch(/Check \| Tool \/ Method \| Scope/);
  expect(template).toMatch(/Omit Open Questions when none remain/);
});

it('106 and 107 remain independently optional with stable skill identities and output paths', () => {
  const visual = readWorkflow('skills/106-ui-design/SKILL.md');
  const experience = readWorkflow('skills/107-ui-experience/SKILL.md');
  expect(visual).toMatch(/^name: 106-ui-design$/m);
  expect(experience).toMatch(/^name: 107-ui-experience$/m);
  expect(visual).toContain('.specflow/docs/D06-ui-design.md');
  expect(experience).toContain('.specflow/docs/D07-ui-experience.md');
  for (const workflow of [visual, experience]) {
    expect(workflow.replace(/\s+/g, ' ')).toMatch(/independently optional.*either order/);
    expect(workflow).not.toMatch(/Generate three|Spawn three|runner-up/);
    expect(workflow.replace(/\s+/g, ' ')).toMatch(/Compare alternatives only when.*meaningful unresolved choice/);
  }
});

it('106 and 107 use project evidence first and preserve existing decisions', () => {
  for (const skill of ['106-ui-design', '107-ui-experience']) {
    const workflow = readWorkflow(`skills/${skill}/SKILL.md`).replace(/\s+/g, ' ');
    expect(workflow).toMatch(/Step 1: Load project context.*Step 2: Resolve inputs/);
    expect(workflow).toMatch(/gap-check.*block/);
    expect(workflow).toMatch(/Surface conflicts.*user/);
    expect(workflow).toMatch(/non-blocking.*Open Questions/);
    expect(workflow).toMatch(/Remove template instructions, examples, placeholders, and empty optional sections/);
  }
});

it('106 and 107 use domain knowledge to resolve gaps and guide the core design focus', () => {
  for (const skill of ['106-ui-design', '107-ui-experience']) {
    const workflow = readWorkflow(`skills/${skill}/SKILL.md`).replace(/\s+/g, ' ');
    const inputs = workflow.slice(workflow.indexOf('**Step 2:'), workflow.indexOf('**Step 3:'));
    expect(workflow).toContain('.specflow/context/domain-knowledge.md');
    expect(inputs).toMatch(/domain knowledge.*before.*gap-check/i);
    expect(workflow).toMatch(/domain-informed design focus/);
    expect(inputs).toMatch(/uncertain or outdated.*Open Questions/);
    expect(inputs).toMatch(/research recommendations.*confirmed product decisions/);
  }
});

it('106 and 107 carry domain-grounded focus into templates and user guidance without copying research', () => {
  const cases = [
    { skill: '106-ui-design', file: 'T06 - UI Design.md' },
    { skill: '107-ui-experience', file: 'T07 - UI Experience Overview.md' },
  ];
  for (const entry of cases) {
    const template = readWorkflow(`skills/${entry.skill}/templates/${entry.file}`);
    const docs = readWorkflow(`site/src/content/docs/project-foundation/${entry.skill}.mdx`);
    expect(template).toContain('.specflow/context/domain-knowledge.md');
    expect(template).toMatch(/domain-grounded focus/);
    expect(template).toMatch(/reference.*rather than repeat/i);
    expect(docs).toContain('.specflow/context/domain-knowledge.md');
    expect(docs).toMatch(/before asking/i);
  }
});

it('106 and 107 use concise neutral templates with matching document and section titles', () => {
  const cases = [
    { skill: '106-ui-design', file: 'T06 - UI Design.md', title: '# D06 — Visual Design' },
    { skill: '107-ui-experience', file: 'T07 - UI Experience Overview.md', title: '# D07 — UX & Navigation' },
  ];
  for (const entry of cases) {
    const workflow = readWorkflow(`skills/${entry.skill}/SKILL.md`);
    const template = readWorkflow(`skills/${entry.skill}/templates/${entry.file}`);
    expect(template.match(/^# .+$/gm)).toEqual([entry.title]);
    expect(template).toMatch(/only applicable bullets, rows, and sections/);
    expect(template).toMatch(/Omit Alternatives Considered and Open Questions when/);
    expect(template).not.toMatch(/#F8F9FA|375px|1440px|300ms|5 s|\/projects|\/login|Trustworthy and efficient/);
    for (const heading of template.matchAll(/^## \d+\. (.+)$/gm)) {
      expect(workflow).toContain(`**${heading[1]}**`);
    }
  }
});

it('106 owns visual presentation while 107 owns navigation and interaction behavior', () => {
  const visual = readWorkflow('skills/106-ui-design/SKILL.md').replace(/\s+/g, ' ');
  const experience = readWorkflow('skills/107-ui-experience/SKILL.md').replace(/\s+/g, ' ');
  const template = readWorkflow('skills/107-ui-experience/templates/T07 - UI Experience Overview.md');
  expect(visual).toMatch(/D07 owns navigation, page inventory, and interaction behavior/);
  expect(experience).toMatch(/D06 owns visual presentation/);
  expect(visual).toMatch(/D05.*implementation/);
  expect(experience).toMatch(/D05.*implementation/);
  expect(experience).toMatch(/agreed scope.*not.*future/);
  expect(template).toMatch(/Page \/ View \| Route \| Purpose \/ Primary Action \| Access/);
  expect(experience).toMatch(/not a security enforcement mechanism/);
});

it('106 and 107 docs explain their distinction without mandatory order or three-direction exploration', () => {
  const visual = readWorkflow('site/src/content/docs/project-foundation/106-ui-design.mdx');
  const experience = readWorkflow('site/src/content/docs/project-foundation/107-ui-experience.mdx');
  expect(visual).toMatch(/^title: 106 Visual Design$/m);
  expect(experience).toMatch(/^title: 107 UX & Navigation$/m);
  for (const docs of [visual, experience]) {
    expect(docs).toMatch(/independently optional/);
    expect(docs).toMatch(/either order/);
    expect(docs).not.toMatch(/three times|Optional but required|Required by 108|Run `107` first/);
  }
  expect(readWorkflow('site/src/content/docs/getting-started/custom-agents.mdx'))
    .not.toMatch(/`106`\/`107`\/`108` call it three times/);
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
