/**
 * Tests for the extracted flow-visualization logic module (`src/lib/flow-viz.ts`).
 *
 * Tests exercise the helpers shared by the initial homepage and path switches.
 *
 * Behavior under test:
 *   - pathIncludes: given a path sequence string and a skill key, returns
 *     whether that key is included in the path.
 *   - getVisibleRows: given a path id + the full flowRows card matrix, returns
 *     only the cards that belong to the selected path, preserving snake ordering
 *     across rows and not duplicating card content.
 *   - buildConnectorPath: given the visible rows (as returned by getVisibleRows),
 *     returns a single SVG path `d` string that threads through those cards only.
 *
 * Card data is expressed inline here using the same shape as index.astro's
 * flowRows constant so that tests are self-contained and do not depend on
 * the Astro page renderer.
 */

import { expect, it } from 'vitest';
import {
  buildConnectorPath,
  getVisibleRows,
  getVisibleCards,
  getCardBadges,
  pathIncludes,
  type FlowCard,
  type FlowRow,
  type VisibleRows,
} from '../src/lib/flow-viz';
import { workflowPaths } from '../src/lib/specflow';

it('selects cards in exact sequence order rather than snake-row order', () => {
  const cards = getVisibleCards(pathById('full').sequence, FLOW_ROWS);
  expect(cards.map((card) => card.key)).toEqual([
    '100', '101', '102', '103', '104', '105', '106', '107', '108', '110', '201', '202', '301',
  ]);
  expect(cards[5]).toBe(FLOW_ROWS[1][4]);
});

it('selects exactly three cards for Minimal and one for Lean without adding 302 or 401', () => {
  expect(getVisibleCards(pathById('lean').sequence, FLOW_ROWS).map((card) => card.key))
    .toEqual(['201', '202', '301']);
  expect(getVisibleCards(pathById('crazy-lean').sequence, FLOW_ROWS).map((card) => card.key))
    .toEqual(['301']);
});

it('filters unknown sequence entries without changing the order of known cards', () => {
  expect(getVisibleCards('missing -> 108 loop -> 301 -> 202', FLOW_ROWS).map((card) => card.key))
    .toEqual(['108', '301', '202']);
  expect(getVisibleCards('', FLOW_ROWS)).toEqual([]);
});

it('never inherits test-only cards in row selection even when the source contains them', () => {
  const rows = [[
    { key: '301', title: 'Implement', description: 'Build.' },
    { key: '302', title: 'Test only', description: 'Cover existing behavior.' },
    { key: '401', title: 'Cleanup', description: 'Separate pass.' },
  ]];
  expect(getVisibleRows('301', rows, []).flat().map((card) => card.key)).toEqual(['301']);
  expect(getVisibleCards('301', rows).map((card) => card.key)).toEqual(['301']);
});

it('marks the page loop and the spec loop ending at 301, not cleanup', () => {
  expect(getCardBadges('108')).toEqual([{ label: 'Page Loop', tone: 'loop' }]);
  expect(getCardBadges('201')).toEqual([{ label: 'Spec Loop Start', tone: 'loop' }]);
  expect(getCardBadges('301')).toEqual([{ label: 'Spec Loop End', tone: 'loop' }]);
  expect(getCardBadges('302')).toEqual([]);
  expect(getCardBadges('401')).toEqual([]);
});

// ---------------------------------------------------------------------------
// Shared test fixtures — mirror of index.astro flowRows (shape only, no Astro)
// ---------------------------------------------------------------------------

const FLOW_ROWS: FlowRow[] = [
  [
    { key: '100', title: 'Domain Knowledge', description: 'Research the domain.' },
    { key: '101', title: 'Project Overview', description: 'Define what the product is.' },
    { key: '102', title: 'System Architecture', description: 'Set the stack.' },
    { key: '103', title: 'Common Data Model', description: 'Define shared entities.' },
    { key: '104', title: 'Backend Architecture', description: 'Specify API structure.' },
  ],
  [
    { key: '110', title: 'Feature Overview', description: 'Map the product.' },
    { key: '108', title: 'Page Design', description: 'Loop on individual routes.' },
    { key: '107', title: 'UI Experience', description: 'Define navigation.' },
    { key: '106', title: 'UI Design', description: 'Set the visual system.' },
    { key: '105', title: 'Frontend Architecture', description: 'Define component boundaries.' },
  ],
  [
    { key: '201', title: 'High-Level Design', description: 'Define one feature.' },
    { key: '202', title: 'Spec Design', description: 'Write Gherkin scenarios.' },
    { key: '301', title: 'Spec Implementation', description: 'Build through tests-first.' },
  ],
];

// Keys that are optional in every path that contains them.
const OPTIONAL_KEYS = ['100', '101', '102', '103', '104', '105', '106', '107', '108', '110'];

// Convenience helpers
function pathById(id: string) {
  const p = workflowPaths.find((w) => w.id === id);
  if (!p) throw new Error(`workflowPaths has no entry with id="${id}"`);
  return p;
}

// ---------------------------------------------------------------------------
// pathIncludes
// ---------------------------------------------------------------------------

it('pathIncludes: returns true when the key appears in the sequence', () => {
  // Given the conservative path sequence that contains 201
  const sequence = pathById('conservative').sequence;
  // When we ask whether 201 is included
  // Then it returns true
  expect(pathIncludes(sequence, '201')).toBe(true);
});

it('pathIncludes: returns false when the key is absent from the sequence', () => {
  // Given the minimal path sequence (201 -> 202 -> 301)
  const sequence = pathById('lean').sequence;
  // When we ask whether 100 is included
  // Then it returns false because 100 is not in the minimal sequence
  expect(pathIncludes(sequence, '100')).toBe(false);
});

it('pathIncludes: 301 never implicitly includes the situational test-only skill', () => {
  expect(pathIncludes('201 -> 202 -> 301', '302')).toBe(false);
  expect(pathIncludes('302', '302')).toBe(true);
});

it('pathIncludes: returns false for 302 when 301 is absent', () => {
  // Given a sequence that does not contain 301
  const sequence = '100 -> 101 -> 102';
  // When we ask whether 302 is included
  // Then it returns false
  expect(pathIncludes(sequence, '302')).toBe(false);
});

it('pathIncludes: partial key match does not cause false positives (e.g. "10" does not match "100")', () => {
  // Given a sequence containing 100 but not 10
  const sequence = '100 -> 101 -> 102';
  // When we ask whether '10' is included
  // Then it returns false — key matching must be exact or prefix-guarded
  expect(pathIncludes(sequence, '10')).toBe(false);
});

// ---------------------------------------------------------------------------
// getVisibleRows — conservative / default path
// ---------------------------------------------------------------------------

it('getVisibleRows (conservative): excludes optional project-definition cards not in the conservative sequence', () => {
  // Given the conservative path (which includes 100-107 but not 108 or 110)
  const conservative = pathById('conservative');
  // When we compute visible rows
  const result = getVisibleRows(conservative.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  // Then 108 is not present in any row (108 is not in the conservative sequence)
  const allKeys = result.flatMap((row) => row.map((c: FlowCard) => c.key));
  expect(allKeys).not.toContain('108');
  expect(allKeys).not.toContain('110');
  expect(allKeys).not.toContain('203');
  expect(allKeys).not.toContain('204');
});

it('getVisibleRows (conservative): includes project context and the three core steps', () => {
  // Given the conservative sequence: 100 -> 101 -> ... -> 107 -> 201 -> 202 -> 301
  const conservative = pathById('conservative');
  // When we compute visible rows
  const result = getVisibleRows(conservative.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  const allKeys = result.flatMap((row) => row.map((c: FlowCard) => c.key));
  // Then all conservative steps are represented
  for (const key of ['101', '102', '103', '104', '105', '106', '107', '201', '202', '301']) {
    expect(allKeys, `conservative path should include key ${key}`).toContain(key);
  }
});

it('getVisibleRows (conservative): each row contains only its included cards (no empty rows from excluded cards)', () => {
  // Given the conservative path
  const conservative = pathById('conservative');
  // When we compute visible rows
  const result = getVisibleRows(conservative.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  // Then every row returned has at least one card in it
  for (const row of result) {
    expect(row.length, 'no row should be empty').toBeGreaterThan(0);
  }
});

// ---------------------------------------------------------------------------
// getVisibleRows — minimal path (201, 202, 301)
// ---------------------------------------------------------------------------

it('getVisibleRows (lean/minimal): includes exactly 201, 202, 301 — nothing more', () => {
  // Given the minimal path sequence "201 -> 202 -> 301"
  const lean = pathById('lean');
  // When we compute visible rows
  const result = getVisibleRows(lean.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  const allKeys = result.flatMap((row) => row.map((c: FlowCard) => c.key));
  expect(allKeys).toEqual(['201', '202', '301']);
});

it('getVisibleRows (lean/minimal): excludes all 100-series and 200-series optional cards', () => {
  // Given the lean path
  const lean = pathById('lean');
  // When we compute visible rows
  const result = getVisibleRows(lean.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  const allKeys = result.flatMap((row) => row.map((c: FlowCard) => c.key));
  // Then none of the project-definition series appear
  for (const key of ['100', '101', '102', '103', '104', '105', '106', '107', '108', '110', '203', '204']) {
    expect(allKeys, `lean path must not include project-definition key ${key}`).not.toContain(key);
  }
});

// ---------------------------------------------------------------------------
// getVisibleRows — full / comprehensive path
// ---------------------------------------------------------------------------

it('getVisibleRows (full): includes all project-definition and feature-loop cards', () => {
  // Given the full path
  const full = pathById('full');
  // When we compute visible rows
  const result = getVisibleRows(full.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  const allKeys = result.flatMap((row) => row.map((c: FlowCard) => c.key));
  // Then all 13 active pipeline cards are present, in their source row order.
  const allExpected = [
    '100', '101', '102', '103', '104',
    '110', '108', '107', '106', '105',
    '201', '202', '301',
  ];
  expect(allKeys).toEqual(allExpected);
});

it('getVisibleRows (full): card descriptions are taken from the source flowRows — not duplicated per path', () => {
  // Given the full path and the source flowRows
  const full = pathById('full');
  // When we compute visible rows
  const result = getVisibleRows(full.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  // Then each returned card's description matches exactly what is in FLOW_ROWS
  for (const row of result) {
    for (const card of row) {
      const sourceCard = FLOW_ROWS.flat().find((c) => c.key === card.key);
      expect(sourceCard, `source card for key ${card.key} not found`).toBeDefined();
      expect(card.description).toBe(sourceCard!.description);
      expect(card.title).toBe(sourceCard!.title);
    }
  }
});

// ---------------------------------------------------------------------------
// getVisibleRows — snake ordering across rows
// ---------------------------------------------------------------------------

it('getVisibleRows: preserves snake ordering within each row (cards appear in their original row sequence)', () => {
  // Given the conservative path (which includes row 1: 100-104 in order)
  const conservative = pathById('conservative');
  // When we compute visible rows
  const result = getVisibleRows(conservative.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  // Then within each row the relative order of cards is the same as in FLOW_ROWS
  for (let rowIdx = 0; rowIdx < result.length; rowIdx++) {
    const resultKeys = result[rowIdx].map((c: FlowCard) => c.key);
    // Find the matching source row (same first key)
    const sourceRow = FLOW_ROWS.find((r) => r.some((c) => c.key === resultKeys[0]));
    if (!sourceRow) continue;
    const sourceKeys = sourceRow.map((c) => c.key).filter((k) => resultKeys.includes(k));
    expect(resultKeys).toEqual(sourceKeys);
  }
});

it('getVisibleRows: rows with zero visible cards are omitted from the result', () => {
  // Given the lean path (no 100-series cards)
  const lean = pathById('lean');
  // When we compute visible rows
  const result = getVisibleRows(lean.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  // Then the result contains no empty rows
  const emptyRows = result.filter((row) => row.length === 0);
  expect(emptyRows).toHaveLength(0);
});

// ---------------------------------------------------------------------------
// buildConnectorPath — SVG connector for visible cards only
// ---------------------------------------------------------------------------

it('buildConnectorPath: returns a non-empty string for any non-empty visible row set', () => {
  // Given a minimal set of visible rows (just the lean path)
  const lean = pathById('lean');
  const visibleRows = getVisibleRows(lean.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  // When we build the connector path
  const svgPath = buildConnectorPath(visibleRows);
  // Then a non-empty string is returned
  expect(typeof svgPath).toBe('string');
  expect(svgPath.length).toBeGreaterThan(0);
});

it('buildConnectorPath: result begins with "M" (valid SVG path starting command)', () => {
  // Given any non-trivial visible layout
  const conservative = pathById('conservative');
  const visibleRows = getVisibleRows(conservative.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  // When we build the connector path
  const svgPath = buildConnectorPath(visibleRows);
  // Then it starts with the SVG move command
  expect(svgPath.trimStart()).toMatch(/^M\s/i);
});

it('buildConnectorPath: produces a single path string (no line breaks splitting it into multiple paths)', () => {
  // Given the full path visible rows
  const full = pathById('full');
  const visibleRows = getVisibleRows(full.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  // When we build the connector path
  const svgPath = buildConnectorPath(visibleRows);
  // Then the result is a single continuous path (only one leading "M" command)
  const moveCount = (svgPath.match(/\bM\s/gi) ?? []).length;
  expect(moveCount).toBe(1);
});

it('buildConnectorPath: generates a shorter path for lean than for conservative (fewer cards = fewer segments)', () => {
  // Given the lean and conservative visible row sets
  const lean = pathById('lean');
  const conservative = pathById('conservative');
  const leanRows = getVisibleRows(lean.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  const conservativeRows = getVisibleRows(conservative.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  // When we build connector paths for each
  const leanPath = buildConnectorPath(leanRows);
  const conservativePath = buildConnectorPath(conservativeRows);
  // Then the path for more cards is strictly longer (more waypoints = longer string)
  expect(conservativePath.length).toBeGreaterThan(leanPath.length);
});

it('buildConnectorPath: returns empty string or minimal path when no visible rows are provided', () => {
  // Given an empty visible row set
  const emptyRows: VisibleRows = [];
  // When we build the connector path
  const svgPath = buildConnectorPath(emptyRows);
  // Then it returns an empty string (nothing to connect)
  expect(svgPath).toBe('');
});

it('buildConnectorPath: does not reference cards that are excluded from the current path', () => {
  // Given the lean path (excludes 100-series)
  // The SVG connector must only thread through 201, 202, 301 anchors.
  // We verify this indirectly: the path for lean has fewer coordinate waypoints
  // than the path for the full board, confirming excluded cards are not connected.
  const lean = pathById('lean');
  const full = pathById('full');
  const leanRows = getVisibleRows(lean.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  const fullRows = getVisibleRows(full.sequence, FLOW_ROWS, OPTIONAL_KEYS);
  const leanPath = buildConnectorPath(leanRows);
  const fullPath = buildConnectorPath(fullRows);
  // Count numeric coordinate pairs as a proxy for number of waypoints
  const countCoords = (p: string) => (p.match(/\d+\.?\d*/g) ?? []).length;
  expect(countCoords(fullPath)).toBeGreaterThan(countCoords(leanPath));
});
