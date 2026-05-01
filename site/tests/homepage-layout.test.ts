/**
 * Tests for the homepage reorganization — Design Option #1.
 *
 * These tests assert the intended post-refactor state of the homepage.
 * They are written BEFORE the production changes exist, so they are expected
 * to FAIL against the current source until the implementation pass runs.
 *
 * Behavior under test (source-level and data-level assertions only):
 *
 *   1. Homepage defaults to the minimal ("lean") path in the merged path hub,
 *      not the conservative path.
 *
 *   2. The detached "home-hero__actions" Get Started CTA cluster is removed
 *      from index.astro source.
 *
 *   3. The detached "home-links" bottom reference-links section is removed
 *      from index.astro source.
 *
 *   4. The homeOnly top-nav renders docSections links rather than GitHub-only
 *      nav — confirmed by TopNav.astro source structure.
 *
 *   5. Every workflowPath entry carries an `action` field (a URL or relative
 *      path) so the merged path hub can render a path-aware CTA target.
 *
 * No browser renderer or Astro build is invoked. All assertions are either
 * source-text checks (reading .astro files as strings) or data-shape checks
 * on the specflow.ts exports.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { workflowPaths } from '../src/lib/specflow';

// ---------------------------------------------------------------------------
// Helpers — read source files as plain text for structural assertions
// ---------------------------------------------------------------------------

const SRC = resolve(__dirname, '../src');

function readSource(relativePath: string): string {
  return readFileSync(resolve(SRC, relativePath), 'utf-8');
}

// ---------------------------------------------------------------------------
// 1. Homepage defaults to the minimal ("lean") path
// ---------------------------------------------------------------------------

describe('homepage default path', () => {
  it('index.astro sets defaultPathId to "lean", not "conservative"', () => {
    // The merged path hub should open on the minimal path (201 -> 202 -> 301 -> 401)
    // so users see the simplest flow first.
    const source = readSource('pages/index.astro');
    expect(
      source,
      'index.astro must set defaultPathId to "lean"',
    ).toContain("defaultPathId = 'lean'");
  });

  it('index.astro does NOT set defaultPathId to "conservative"', () => {
    const source = readSource('pages/index.astro');
    expect(
      source,
      'index.astro must not default to the conservative path',
    ).not.toContain("defaultPathId = 'conservative'");
  });
});

// ---------------------------------------------------------------------------
// 2. Detached hero CTA cluster is removed
// ---------------------------------------------------------------------------

describe('homepage hero CTA removal', () => {
  it('index.astro does not contain the home-hero__actions element', () => {
    // The detached hero CTA cluster (Get Started + Browse skills + GitHub links
    // inside the hero section) must be removed. The path hub owns the primary CTA.
    const source = readSource('pages/index.astro');
    expect(
      source,
      'index.astro must not contain home-hero__actions',
    ).not.toContain('home-hero__actions');
  });

  it('index.astro does not contain a standalone "Get Started" button inside the hero section', () => {
    // The "button--hero" class specifically marks the detached hero CTA button.
    const source = readSource('pages/index.astro');
    expect(
      source,
      'index.astro must not contain the hero Get Started button (button--hero)',
    ).not.toContain('button--hero');
  });
});

// ---------------------------------------------------------------------------
// 3. Detached bottom reference-links strip is removed
// ---------------------------------------------------------------------------

describe('homepage bottom reference-links removal', () => {
  it('index.astro does not contain the home-links section', () => {
    // The bottom reference-links strip (docSections + GitHub strip) must be
    // removed. Navigation is now handled by the top nav.
    const source = readSource('pages/index.astro');
    expect(
      source,
      'index.astro must not contain the home-links section',
    ).not.toContain('home-links');
  });

  it('index.astro does not contain a "Reference links" aria-label or equivalent bottom strip', () => {
    const source = readSource('pages/index.astro');
    expect(
      source,
      'index.astro must not contain the "Reference links" aria-label',
    ).not.toContain('Reference links');
  });
});

// ---------------------------------------------------------------------------
// 4. Home-only top nav exposes docSections links
// ---------------------------------------------------------------------------

describe('top nav homeOnly mode exposes docSections', () => {
  it('TopNav.astro homeOnly branch contains a link rendered from docSections', () => {
    // The homeOnly nav must render section links (not just GitHub).
    // We confirm this by checking that the homeOnly branch iterates docSections
    // (or references section.slug / section.label) rather than only the GitHub SVG.
    const source = readSource('components/TopNav.astro');

    // Find the homeOnly conditional branch. The homeOnly nav must reference
    // docSections or section.slug — confirming it renders more than GitHub alone.
    expect(
      source,
      'TopNav.astro homeOnly branch must render docSections links (must reference section.slug or section.label)',
    ).toMatch(/homeOnly[\s\S]{0,600}section\.(slug|label)/);
  });

  it('TopNav.astro homeOnly nav does NOT render GitHub as the only list item', () => {
    // In the old design the homeOnly nav had exactly one <li> (GitHub).
    // After the refactor it must render docSections items as well.
    // We detect the old pattern: a homeOnly nav whose only anchor is the GitHub link.
    const source = readSource('components/TopNav.astro');

    // Extract just the homeOnly conditional block (between "homeOnly ?" and the
    // ":" separator that begins the non-homeOnly branch).
    // We use a broad heuristic: if top-nav--home appears, the block immediately
    // after must contain more than just the GitHub SVG path.
    const homeOnlyBlockMatch = source.match(/top-nav--home[\s\S]*?<\/nav>/);
    expect(homeOnlyBlockMatch, 'top-nav--home block not found in TopNav.astro').toBeTruthy();

    const homeOnlyBlock = homeOnlyBlockMatch![0];
    // The block must contain at least one non-GitHub nav link, signalled by
    // the presence of section.slug, section.label, or a docSections loop.
    const hasDocSectionLinks =
      homeOnlyBlock.includes('section.slug') ||
      homeOnlyBlock.includes('section.label') ||
      homeOnlyBlock.includes('docSections');
    expect(
      hasDocSectionLinks,
      'homeOnly top nav must contain docSections links, not only the GitHub icon',
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 5. workflowPaths carry a path-aware action target (URL / route)
// ---------------------------------------------------------------------------

describe('workflowPaths path-aware action field', () => {
  it('every workflowPath has a non-empty action field', () => {
    // The merged path hub must render a path-aware CTA. The `action` field on
    // each WorkflowPath provides the URL or route target for that CTA.
    for (const path of workflowPaths) {
      expect(
        path.action,
        `workflowPath "${path.id}" must have a non-empty action field`,
      ).toBeTruthy();
    }
  });

  it('every workflowPath action is a string', () => {
    for (const path of workflowPaths) {
      expect(
        typeof path.action,
        `workflowPath "${path.id}" action must be a string`,
      ).toBe('string');
    }
  });

  it('WorkflowPath action field is declared on the type (specflow.ts exports the field)', () => {
    // We verify this at the data level: at least one path's action begins with "/"
    // or "http", confirming it is a navigable URL rather than an empty placeholder.
    const allActions = workflowPaths.map((p) => p.action);
    const allNavigable = allActions.every(
      (a) => typeof a === 'string' && (a.startsWith('/') || a.startsWith('http')),
    );
    expect(
      allNavigable,
      'every workflowPath action must be a navigable URL (starts with "/" or "http")',
    ).toBe(true);
  });

  it('lean path action points to the getting-started or core-workflow route', () => {
    // The minimal path CTA should direct users to a doc page that helps them
    // get going quickly — getting-started is the natural target.
    const lean = workflowPaths.find((p) => p.id === 'lean');
    expect(lean, '"lean" workflowPath not found').toBeDefined();
    const action = lean!.action;
    // action must exist and be a string before we match it
    expect(typeof action, '"lean" action must be a string').toBe('string');
    expect(
      action,
      '"lean" path action should link to getting-started or core-workflow',
    ).toMatch(/getting-started|core-workflow/);
  });
});
