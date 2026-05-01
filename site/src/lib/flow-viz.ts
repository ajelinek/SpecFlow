/**
 * flow-viz.ts
 *
 * Pure logic for the homepage path-selection flow visualization.
 * No Astro or DOM dependencies — all functions operate on plain data
 * so they can be tested in Vitest without a browser.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FlowCard {
  key: string;
  title: string;
  description: string;
}

/** A row is an ordered list of cards (preserving snake ordering). */
export type FlowRow = FlowCard[];

/** The subset of rows/cards that are visible for the selected path. */
export type VisibleRows = FlowRow[];

// ---------------------------------------------------------------------------
// pathIncludes
// ---------------------------------------------------------------------------

/**
 * Returns true when `key` is included in the given sequence string.
 *
 * Rules:
 * - Matching is exact: "10" does NOT match "100".
 * - "302" is considered included whenever "301" appears (test-only sub-path).
 */
export function pathIncludes(sequence: string, key: string): boolean {
  if (key === '302') {
    // 302 inherits its inclusion from 301's presence.
    return sequence.split('->').some((s) => s.trim() === '301' || s.trim().startsWith('301 '));
  }

  return sequence
    .split('->')
    .some((s) => s.trim() === key || s.trim().startsWith(key + ' '));
}

// ---------------------------------------------------------------------------
// getVisibleRows
// ---------------------------------------------------------------------------

/**
 * Returns a filtered copy of `flowRows` containing only the cards that
 * belong to the selected `sequence`. Empty rows are omitted.
 *
 * - `optionalKeys`: cards that are only shown when explicitly in the sequence.
 *   Non-optional (core) cards are always shown if their row has any visible card.
 *   Actually the filtering is simpler: a card is visible iff pathIncludes returns
 *   true for it. The optionalKeys list is accepted for API symmetry with the
 *   caller but filtering is driven entirely by pathIncludes.
 *
 * Card objects are returned by reference from `flowRows` (no duplication).
 */
export function getVisibleRows(
  sequence: string,
  flowRows: FlowRow[],
  _optionalKeys: string[],
): VisibleRows {
  const result: VisibleRows = [];

  for (const row of flowRows) {
    const visibleCards = row.filter((card) => pathIncludes(sequence, card.key));
    if (visibleCards.length > 0) {
      result.push(visibleCards);
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// buildConnectorPath
// ---------------------------------------------------------------------------

/**
 * SVG viewBox assumptions (matches index.astro):
 *   width  = 1000
 *   height = 700
 *
 * The connector threads through the centre of each visible card in snake order
 * (left→right on even-indexed rows, right→left on odd-indexed rows, both
 * 0-based).  Row y-centres are distributed evenly across the viewBox height.
 * Card x-centres are distributed evenly across a padded horizontal span.
 */
const VB_WIDTH = 1000;
const VB_HEIGHT = 700;
const H_PAD = 113; // horizontal padding from the edges (matches original SVG)
const V_PAD = 80;  // vertical padding from top/bottom

export function buildConnectorPath(visibleRows: VisibleRows): string {
  if (visibleRows.length === 0) return '';

  const rowCount = visibleRows.length;
  const usableH = VB_HEIGHT - V_PAD * 2;
  // y centre for each row, evenly spaced
  const rowY = (rowIdx: number) =>
    V_PAD + (rowCount === 1 ? usableH / 2 : (rowIdx / (rowCount - 1)) * usableH);

  const usableW = VB_WIDTH - H_PAD * 2; // 1000 - 226 = 774

  // Build a flat list of (x, y) waypoints in snake order.
  const waypoints: [number, number][] = [];

  for (let ri = 0; ri < rowCount; ri++) {
    const row = visibleRows[ri];
    const reversed = ri % 2 === 1; // even rows: L→R, odd rows: R→L
    const y = rowY(ri);

    const cards = reversed ? [...row].reverse() : row;
    for (let ci = 0; ci < cards.length; ci++) {
      const wx = reversed
        ? VB_WIDTH - (H_PAD + (ci / (cards.length - 1 || 1)) * usableW)
        : H_PAD + (ci / (cards.length - 1 || 1)) * usableW;
      waypoints.push([wx, y]);
    }
  }

  // Build SVG path string
  const fmt = (n: number) => Math.round(n).toString();
  const [first, ...rest] = waypoints;
  const parts = [`M ${fmt(first[0])} ${fmt(first[1])}`];
  for (const [x, y] of rest) {
    parts.push(`L ${fmt(x)} ${fmt(y)}`);
  }

  return parts.join(' ');
}
