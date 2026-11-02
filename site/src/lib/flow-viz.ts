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
  /** Displayed skill number when it differs from the key (e.g. "401 source" shows "401"). */
  code?: string;
  title: string;
  description: string;
}

export type FlowCardBadge = {
  label: string;
  tone: 'loop';
};

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
 * - Only explicitly named steps are included; 301 never implies 302 or 401.
 * - A step may carry a qualifier ("401 source"); it matches only that exact step.
 */
export function pathIncludes(sequence: string, key: string): boolean {
  return sequence
    .split('->')
    .some((s) => s.trim() === key || s.trim().startsWith(key + ' '));
}

/** Select existing cards in path sequence order, shared by SSR and client updates. */
export function getVisibleCards(sequence: string, flowRows: FlowRow[]): FlowCard[] {
  const cardMap = new Map(flowRows.flat().map((card) => [card.key, card]));

  return sequence
    .split('->')
    .map((step) => cardMap.get(step.trim()) ?? cardMap.get(step.trim().split(/\s+/)[0]))
    .filter((card): card is FlowCard => card !== undefined);
}

/** Loop boundaries are the same in the initial board and after path switches. */
export function getCardBadges(key: string): FlowCardBadge[] {
  const badges: FlowCardBadge[] = [];

  if (key === '108') badges.push({ label: 'Page Loop', tone: 'loop' });
  if (key === '201') badges.push({ label: 'Spec Loop Start', tone: 'loop' });
  if (key === '301') badges.push({ label: 'Spec Loop End', tone: 'loop' });

  return badges;
}

// ---------------------------------------------------------------------------
// getVisibleRows
// ---------------------------------------------------------------------------

/**
 * Returns a filtered copy of `flowRows` containing only the cards that
 * belong to the selected `sequence`. Empty rows are omitted.
 *
 * A card is visible iff `pathIncludes` returns true for it.
 * `optionalCardKeys` is accepted for API symmetry with the SSR caller but
 * is not used here — inclusion is driven entirely by `pathIncludes`.
 *
 * Card objects are returned by reference from `flowRows` (no duplication).
 */
export function getVisibleRows(
  sequence: string,
  flowRows: FlowRow[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _optionalCardKeys: string[],
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
