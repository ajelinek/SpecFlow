/** Contracts for human-readable defaults, not a ban on structured data formats. */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

const SKILLS = resolve(__dirname, '../../skills');

function read(relativePath: string): string {
  return readFileSync(resolve(SKILLS, relativePath), 'utf8');
}

function markdownTemplates(): string[] {
  return readdirSync(SKILLS, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.includes('/templates/') && file.endsWith('.md'));
}

it('every standalone skill favors headings and labeled bullets for human-facing Markdown', () => {
  const workflows = readdirSync(SKILLS, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith('/SKILL.md'));
  expect(workflows.length).toBeGreaterThan(0);
  for (const file of workflows) {
    const content = read(file).replace(/\s+/g, ' ');
    expect(content, file).toMatch(/human-facing Markdown.*headings and labeled bullets/i);
    expect(content, file).toMatch(/tables only for compact comparisons/);
  }
});

it('bundled Markdown templates default to vertical entries rather than pipe tables', () => {
  const templates = markdownTemplates();
  expect(templates.length).toBeGreaterThan(0);
  for (const file of templates) {
    expect(read(file), file).not.toMatch(/^\s*\|/m);
  }
});

it('data model entries retain attributes and relationships without wide Markdown rows', () => {
  const template = read('103-common-data-model/templates/T03 - Common Data Model.md');
  expect(template).toContain('**Attributes**');
  expect(template).toMatch(/Logical type/);
  expect(template).toMatch(/Required/);
  expect(template).toMatch(/Sensitive/);
  expect(template).toContain('**Relationships**');
  expect(template).toMatch(/Cardinality/);
});

it('structured Gherkin examples, relational definitions, and resume fields stay intact', () => {
  expect(read('202-spec-design/templates/specs.feature')).toMatch(/Examples:\s+\| category\s+\| amount \|/);
  expect(read('103-common-data-model/templates/T03 - Common Data Model.dbml')).toContain('Table parent_record');
  const log = read('901-feature-loop/SKILL.md');
  for (const type of ['run_init', 'step_complete', 'scenario_complete', 'gate', 'decision_consult', 'feedback_pass', 'resume', 'terminal', 'run_complete']) {
    expect(log).toContain(`\`${type}\``);
  }
});
