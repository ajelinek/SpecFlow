/** Instruction contracts only; these do not prove generated mockups work in a browser. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

const ROOT = resolve(__dirname, '../..');
const SKILL = 'skills/108-ui-page-design';

function read(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), 'utf8');
}

function workflow(): string {
  return read(`${SKILL}/SKILL.md`).replace(/\s+/g, ' ');
}

it('108 preserves high-fidelity HTML with explicit review controls and local state previews', () => {
  const content = workflow();
  expect(content).toMatch(/high-fidelity HTML/);
  expect(content).toMatch(/preview toolbar at the top/);
  expect(content).toMatch(/not part of the product UI/);
  expect(content).toMatch(/loading, empty, error, success/);
  expect(content).toMatch(/local JavaScript/);
  expect(content).toMatch(/no backend calls/);
  expect(content).toMatch(/DESIGN MOCKUP ONLY/);
});

it('108 scopes to one page or related page family without forcing prerequisite docs', () => {
  const content = workflow();
  expect(content).toMatch(/one page or a closely related page family/);
  expect(content).toMatch(/Missing D06\/D07.*not a reason to generate/);
  expect(content).toMatch(/Surface conflicts.*user/);
  expect(content).not.toMatch(/never several|must match D07/);
});

it('108 compares three independent subagent designs before selecting and building the winner', () => {
  const content = workflow();
  expect(content).toMatch(/three fresh, independent.*in parallel/);
  expect(content).toMatch(/same.*brief/);
  expect(content).toMatch(/content-led.*spatial\/layout-led.*action-led/);
  expect(content).toMatch(/not just color/);
  expect(content).toMatch(/Evaluate all three.*Select/);
  expect(content).toMatch(/state coverage/);
  expect(content).toMatch(/independent subagents are unavailable.*stop/);
  expect(content).toMatch(/index-only maintenance.*Step 6/);
});

it('108 maintains one stable single-solution catalog with links back from the design artifacts', () => {
  const content = workflow();
  expect(content).toContain('.specflow/docs/D08-ui-pages/index.html');
  expect(content).toMatch(/one solution/);
  expect(content).toMatch(/Every run creates or refreshes/);
  expect(content).toMatch(/both.*overview\.md.*mockup\.html.*link back/i);
  expect(content).toContain('./templates/T08 - Page Index.html');
  expect(content).toContain('./references/page-index.md');
});

it('108 indexes routes rather than files and keeps not-yet-designed pages visible', () => {
  const rules = read(`${SKILL}/references/page-index.md`).replace(/\s+/g, ' ');
  expect(rules).toMatch(/every known page\/route/);
  expect(rules).toMatch(/not yet designed/);
  expect(rules).toMatch(/separate entry.*same mockup/);
  expect(rules).toMatch(/finite.*expand/);
  expect(rules).toMatch(/not.*every possible parameter value/);
  expect(rules).toMatch(/URL-addressable.*overlays/);
  expect(rules).toMatch(/distinguish unknown from none/i);
});

it('108 reconciles the full catalog while preserving unrelated designs and existing links', () => {
  const content = workflow();
  const rules = read(`${SKILL}/references/page-index.md`).replace(/\s+/g, ' ');
  expect(rules).toMatch(/D07.*existing D08.*actual.*routes/);
  expect(rules).toMatch(/Preserve unaffected entries/);
  expect(rules).toMatch(/Do not remove.*absent from D07/);
  expect(rules).toMatch(/D07.*navigation.*overview\.md.*page-specific/);
  expect(content).toMatch(/Preserve existing working preview links/);
  expect(content).toMatch(/displayed application URL/);
  expect(content).toMatch(/Back\/Forward/);
});

it('108 uses neutral page and index templates with explicit route and parameter fields', () => {
  const overview = read(`${SKILL}/templates/T08 - UI Page Design.md`);
  const index = read(`${SKILL}/templates/T08 - Page Index.html`);
  expect(overview.match(/^# .+$/gm)).toEqual(['# [Page / Page Family] — Page Design']);
  expect(overview).toContain('[All page designs](../index.html)');
  expect(overview).toContain('## 2. Routes & Parameters');
  expect(overview).toContain('## 4. States & Interactions');
  expect(overview).toMatch(/Record all three.*selected/);
  expect(overview).toMatch(/Omit Open Questions/);
  expect(overview).not.toMatch(/Dashboard Page Design|GET \/api\/projects|notification bell/);
  expect(overview).toContain('- **Path parameters**');
  expect(overview).toContain('- **Search parameters**');
  expect(index).toMatch(/<h3>Path parameters<\/h3>/);
  expect(index).toMatch(/<h3>Search parameters<\/h3>/);
  expect(index).toContain('<table');
  expect(index).toMatch(/Not yet designed/);
  expect(index).not.toMatch(/<script|https?:\/\//);
});

it('108 preserves existing state views and requires rendered errors and overlays, not prose substitutes', () => {
  const content = workflow();
  const template = read(`${SKILL}/templates/T08 - UI Page Design.md`).replace(/\s+/g, ' ');
  expect(content).toMatch(/Preserve existing state views.*user approval/);
  expect(content).toMatch(/rendered and selectable.*not just described/);
  expect(content).toMatch(/dialogs, drawers, sheets, menus, and confirmations/);
  expect(content).toMatch(/every documented state.*reachable/);
  expect(content).toMatch(/error recovery.*overlay opening\/closing/);
  expect(template).toMatch(/every named flow.*not only the happy path/);
  expect(template).toMatch(/loading, empty, error, success, validation, permission, and overlay/);
});

it('108 requires browser checks and reports verification limits without claiming implementation readiness', () => {
  const content = workflow();
  expect(content).toMatch(/Open the index and mockup in a browser/);
  expect(content).toMatch(/fresh.*deep links/);
  expect(content).toMatch(/path, fragment, and preset/);
  expect(content).toMatch(/browser verification was not run/);
  expect(content).toMatch(/not production implementation or proof of accessibility compliance/);
});

it('108 user guidance matches the stateful HTML and maintained catalog contract', () => {
  const docs = read('site/src/content/docs/project-foundation/108-ui-page-design.mdx');
  expect(docs).toContain('D08-ui-pages/index.html');
  expect(docs).toMatch(/high-fidelity HTML/);
  expect(docs).toMatch(/top.*preview toolbar/);
  expect(docs).toMatch(/every known page\/route/);
  expect(docs).toMatch(/path parameters.*search\/query parameters/);
  expect(docs).toMatch(/same mockup/);
  expect(docs).toMatch(/three independent.*subagents/i);
  expect(docs).not.toMatch(/exactly one route|Before `107/);
  expect(read('site/src/content/docs/getting-started/custom-agents.mdx'))
    .toMatch(/108.*three independent/);
});
