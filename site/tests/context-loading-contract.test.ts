/** Static instruction contracts; runtime context use requires separate evaluation. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

const ROOT = resolve(__dirname, '../..');

function read(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), 'utf8').replace(/\s+/g, ' ');
}

it('coder and reviewer consume scoped standards without expanding the packet into every matching skill', () => {
  for (const role of ['coder', 'reviewer']) {
    const content = read(`agents/${role}.md`);
    expect(content, role).toMatch(/once per context/);
    expect(content, role).toMatch(/specific.*decision|specific.*constraint/);
    expect(content, role).toMatch(/higher-priority.*skill-loading/);
    expect(content, role).toMatch(/original.*references/);
  }
  expect(read('agents/coder.md')).not.toContain('load any installed standards');
  expect(read('agents/reviewer.md')).not.toContain('or that obviously govern the scope');
});

it('designer distinguishes implementation guidance from a new visual direction', () => {
  const content = read('agents/designer.md');
  expect(content).toMatch(/implementation guidance/i);
  expect(content).toMatch(/do not.*direction card.*brand.*font/i);
  expect(content).toMatch(/scoped.*D06.*D07.*D08/i);
  expect(content).toMatch(/conflict.*approved exception/i);
});

it('context guidance routes reads without creating a new index or triggering documentation synchronization', () => {
  const content = read('skills/context-manager/examples/specflow-AGENTS.md');
  expect(content).toMatch(/D03.*data.*D04.*backend.*D05.*frontend/i);
  expect(content).toMatch(/specific.*decision.*question/i);
  expect(content).toMatch(/governing decision.*active requirement/i);
  expect(content).toMatch(/not.*synchronize.*every.*code change/i);
  expect(content).toMatch(/Feature Isolation Rule/);
  expect(content).toMatch(/Do not.*different feature's folder/);
  expect(content).not.toContain('docs/index.md');
});

it('feature design and test-only context loading no longer require an upstream document sweep', () => {
  const overview = read('skills/201-high-level-design/SKILL.md');
  const specs = read('skills/202-spec-design/SKILL.md');
  const tests = read('skills/302-test-implementation/SKILL.md');
  expect(overview).toMatch(/relevant D01\/D02\/D07.*only for.*question/);
  expect(specs).toMatch(/inline handoff.*relevant D01\/D07.*only to resolve/);
  expect(tests).toMatch(/test surface.*Do not read all architecture\/UI docs/);
  expect(tests).toMatch(/does not require upstream doc synchronization/);
});

it('runtime setup keeps standards scoped while preserving independent workers and required skill loading', () => {
  const setup = read('skills/specflow-setup/SKILL.md');
  const routing = read('skills/specflow-setup/references/execution-intent.md');
  const verification = read('skills/specflow-setup/references/verification.md');
  expect(setup).toMatch(/per-task standards scoped.*not preload the entire installed skills catalog/);
  expect(routing).toMatch(/worker's own context.*applicable rules\/sections and original references/);
  expect(routing).toMatch(/Honor higher-priority skill-loading requirements/);
  expect(routing).toMatch(/not preload every matching skill/);
  expect(verification).toMatch(/Worker packets.*not blanket catalog preloads/);
});
