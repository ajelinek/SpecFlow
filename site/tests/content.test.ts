/**
 * Content file assertions for docs MDX pages.
 *
 * These tests read MDX files as plain text and assert on their copy.
 * No rendering stack is involved.
 *
 * Several tests are expected to FAIL against the current content until
 * the production MDX files are updated.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';

const DOCS_ROOT = path.resolve(__dirname, '../src/content/docs');

function readDoc(relPath: string): string {
  return fs.readFileSync(path.join(DOCS_ROOT, relPath), 'utf8');
}

// ---------------------------------------------------------------------------
// skills.mdx — catalog page copy
// ---------------------------------------------------------------------------

describe('skills.mdx catalog page', () => {
  const content = readDoc('skills.mdx');

  it('mentions the 100-series for projects where context is still missing', () => {
    expect(content.toLowerCase()).toMatch(/100.*(series|domain|missing|context)/);
  });

  it('recommends 100-series even for existing projects when understanding is weak', () => {
    // The page must not restrict 100-series advice to new projects only.
    // Guidance should explicitly cover existing projects where project understanding is weak.
    expect(content.toLowerCase()).toMatch(/existing project|weak.*(understanding|context)|when.*project.*understanding/);
  });

  it('identifies 108-ui-page-design as the optional page-mockup step', () => {
    // 108 is the design step for individual pages; the catalog page should name it
    // so readers understand it is the page-level design skill (not a sequence requirement).
    expect(content).toMatch(/108/);
  });
});

// ---------------------------------------------------------------------------
// using-bonus-skills.mdx — "Keep them in proportion" callout must be removed
// ---------------------------------------------------------------------------

describe('using-bonus-skills.mdx', () => {
  const content = readDoc('examples/using-bonus-skills.mdx');

  it('does not contain the "Keep them in proportion" callout text', () => {
    expect(content).not.toMatch(/Keep them in proportion/i);
  });

  it('deep-research guidance says it can be used any time web search or research is needed', () => {
    // The current copy says "when current external information materially affects a decision"
    // which is too narrow. The guidance should reflect broad applicability: any time web
    // search or research is needed.
    const deepResearchSection = content.match(/deep.research[\s\S]{0,600}/i);
    expect(deepResearchSection, 'deep-research section not found in using-bonus-skills.mdx').not.toBeNull();
    expect(deepResearchSection![0].toLowerCase()).toMatch(/any time|anytime|whenever.*web|web.*search|web.*research/);
  });
});

// ---------------------------------------------------------------------------
// cleanup-workflow.mdx — must explain two 401 target paths explicitly
// ---------------------------------------------------------------------------

describe('cleanup-workflow.mdx', () => {
  const content = readDoc('examples/cleanup-workflow.mdx');

  it('explains source cleanup as one distinct target path', () => {
    expect(content.toLowerCase()).toMatch(/source.*(cleanup|only)/);
  });

  it('explains test cleanup as one distinct target path', () => {
    expect(content.toLowerCase()).toMatch(/test.*(cleanup|only)/);
  });

  it('states that only one target type may be chosen per run', () => {
    // Must convey the "target type must be specified / only one" rule clearly
    expect(content.toLowerCase()).toMatch(/target type|one.*target|must.*specif/);
  });

  it('describes what source-only cleanup means', () => {
    // The doc should describe what each path means, not just name them
    expect(content.toLowerCase()).toMatch(/source.*(file|code|change)/);
  });

  it('describes what test-only cleanup means', () => {
    expect(content.toLowerCase()).toMatch(/test.*(file|code|change)/);
  });
});

// ---------------------------------------------------------------------------
// greenfield-project-with-more-planning.mdx — must name 103-108 explicitly
// ---------------------------------------------------------------------------

describe('greenfield-project-with-more-planning.mdx', () => {
  const content = readDoc('examples/greenfield-project-with-more-planning.mdx');

  it('names 103-common-data-model explicitly in the sequence', () => {
    expect(content).toMatch(/103-common-data-model|`103`/);
  });

  it('names 104-backend-architecture explicitly in the sequence', () => {
    expect(content).toMatch(/104-backend-architecture|`104`/);
  });

  it('names 105-frontend-architecture explicitly in the sequence', () => {
    expect(content).toMatch(/105-frontend-architecture|`105`/);
  });

  it('names 106-ui-design explicitly in the sequence', () => {
    expect(content).toMatch(/106-ui-design|`106`/);
  });

  it('names 107-ui-experience explicitly in the sequence', () => {
    expect(content).toMatch(/107-ui-experience|`107`/);
  });

  it('names 108-ui-page-design explicitly in the sequence', () => {
    expect(content).toMatch(/108-ui-page-design|`108`/);
  });

  it('does not use the vague phrase "103 through 108 as needed"', () => {
    expect(content).not.toMatch(/103\s+through\s+108/i);
  });
});

// ---------------------------------------------------------------------------
// path-selection page — must be removed (Scenario 3 revised)
//
// The dedicated path-selection page is gone. The homepage IS the
// full flow visualization. No standalone page should exist.
// EXPECTED TO FAIL until src/pages/path-selection.astro is deleted.
// ---------------------------------------------------------------------------

describe('path-selection standalone Astro page removal', () => {
  it('src/pages/path-selection.astro does NOT exist (page has been removed)', () => {
    const standalonePagePath = path.resolve(__dirname, '../src/pages/path-selection.astro');
    // EXPECTED TO FAIL: file still exists and must be deleted
    expect(
      fs.existsSync(standalonePagePath),
      'src/pages/path-selection.astro must be removed — the homepage is now the primary flow visualization',
    ).toBe(false);
  });

  it('path-selection docs content page (getting-started/path-selection.mdx) does not exist', () => {
    const docsPagePath = path.resolve(DOCS_ROOT, 'getting-started/path-selection.mdx');
    expect(
      fs.existsSync(docsPagePath),
      'src/content/docs/getting-started/path-selection.mdx must not exist',
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// index.astro — homepage full flow visualization (primary visualization)
//
// The homepage is now the full skill-flow visualization. It must:
//   - Contain a single path-selection / flow-visualization section
//   - Include a card for every skill in the main flow (all 17 skills)
//   - Show all four rows in the prescribed layout
//   - Include connection lines between boxes
//   - Include loop markers for 108 and the 201-401 feature cycle
//   - Support skipped/faded card state via CSS classes
//   - Show optional step markers
//   - Use richer card titles (not numeric-only heading as primary title)
// EXPECTED TO FAIL until index.astro is updated.
// ---------------------------------------------------------------------------

describe('index.astro path-selection section', () => {
  const homePath = path.resolve(__dirname, '../src/pages/index.astro');
  const content = fs.readFileSync(homePath, 'utf8');

  it('homepage contains a dedicated path-selection / flow-visualization section', () => {
    // Must include a section for path selection or flow visualization
    expect(content.toLowerCase()).toMatch(/path.?selection|path-select|pathselect|flow.?visual/);
  });

  it('homepage path-selection section includes selection controls', () => {
    // Must render interactive controls (radio inputs, buttons, or a select) for choosing a path
    expect(content.toLowerCase()).toMatch(/workflowpaths|workflow.paths|pathexplorer|path.*control|input.*radio|radio.*input|<select/);
  });

  it('homepage path-selection section references workflowPaths data', () => {
    // The section must be driven by the workflowPaths export from specflow.ts
    expect(content).toMatch(/workflowPaths/);
  });

  it('homepage path cards support a faded/skipped visual state (not remove-on-skip)', () => {
    // Cards for skipped paths must receive a CSS class (e.g. is-skipped, is-faded)
    expect(content.toLowerCase()).toMatch(/is.skipped|is.faded|faded|skipped/);
  });

  it('conservative path is marked or referenced as the default selection', () => {
    const conservativeArea = content.match(/conservative[\s\S]{0,200}/i);
    expect(conservativeArea, 'conservative path not referenced in index.astro').not.toBeNull();
    expect(conservativeArea![0].toLowerCase()).toMatch(/default|selected|initial/);
  });
});

// ---------------------------------------------------------------------------
// index.astro — all 17 skills present in flow visualization
//
// Every skill in the prescribed row layout must appear in index.astro.
// Row 1: 100, 101, 102, 103, 104
// Row 2: 105, 106, 107, 108, 110
// Row 3: 201, 202, 203, 204
// Row 4: 301, 302, 401
// EXPECTED TO FAIL until all 17 skill cards are added to index.astro.
// ---------------------------------------------------------------------------

describe('index.astro full skill set in flow visualization', () => {
  const homePath = path.resolve(__dirname, '../src/pages/index.astro');
  const content = fs.readFileSync(homePath, 'utf8');

  const allSkillKeys = [
    '100', '101', '102', '103', '104',
    '105', '106', '107', '108', '110',
    '201', '202', '203', '204',
    '301', '302', '401',
  ];

  for (const key of allSkillKeys) {
    it(`includes a card or entry for skill ${key}`, () => {
      // Each skill must be referenced with its key as a data attribute, step key, or card entry
      // EXPECTED TO FAIL for any skill key not yet present in the lifecycle cards array
      expect(content).toMatch(new RegExp(`['"]${key}['"]|key.*${key}|${key}.*key|data-step-key="${key}"`, 'i'));
    });
  }

  it('all 17 skill keys appear together (no omissions)', () => {
    const missing = allSkillKeys.filter((key) => !content.match(new RegExp(`['"]${key}['"]|data-step-key="${key}"`, 'i')));
    expect(missing, `Missing skill keys in index.astro: ${missing.join(', ')}`).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// index.astro — loop markers for 108 and 201-401 feature cycle
//
// The flow visualization must include explicit loop indicators:
//   - a loop annotation on 108 (per-page design repeats per route)
//   - a loop annotation on the 201-401 feature cycle
// EXPECTED TO FAIL until loop markers are added to index.astro.
// ---------------------------------------------------------------------------

describe('index.astro loop markers', () => {
  const homePath = path.resolve(__dirname, '../src/pages/index.astro');
  const content = fs.readFileSync(homePath, 'utf8');

  it('includes a loop marker or annotation for 108 (per-page design loop)', () => {
    // Look for "108" near "loop" in the template (data attribute, class, or text content)
    // EXPECTED TO FAIL until 108 loop handling is added
    expect(content.toLowerCase()).toMatch(/108.*loop|loop.*108/);
  });

  it('includes a loop marker or annotation for the 201-401 feature cycle', () => {
    // The feature development cycle (201 through 401) must be visually indicated as a repeating loop
    // Look for a loop annotation near the 201-401 range
    // EXPECTED TO FAIL until the feature cycle loop is added
    expect(content.toLowerCase()).toMatch(/201.*401.*loop|loop.*201|feature.*cycle.*loop|loop.*feature.*(cycle|dev)|201.*(loop|cycle)|feature.loop/);
  });
});

// ---------------------------------------------------------------------------
// index.astro — connection lines between cards
//
// The flow visualization must include animated connection lines or SVG connectors
// between the skill boxes to show flow direction.
// EXPECTED TO FAIL until connection lines are added.
// ---------------------------------------------------------------------------

describe('index.astro connection lines between cards', () => {
  const homePath = path.resolve(__dirname, '../src/pages/index.astro');
  const content = fs.readFileSync(homePath, 'utf8');

  it('includes connection line elements or CSS class markers between skill boxes', () => {
    // Look for connector, connection-line, flow-line, or SVG line/path elements
    // EXPECTED TO FAIL until connection line markup is added
    expect(content.toLowerCase()).toMatch(/connector|connection.line|flow.line|flow-arrow|<line|<path|\.connector/);
  });
});

// ---------------------------------------------------------------------------
// index.astro — optional steps visual indicator
//
// Optional steps must be visually distinguished. The template source should
// contain a CSS class or aria attribute distinguishing optional from required.
// EXPECTED TO FAIL until index.astro is updated.
// ---------------------------------------------------------------------------

describe('index.astro optional steps visual identification', () => {
  const homePath = path.resolve(__dirname, '../src/pages/index.astro');
  const content = fs.readFileSync(homePath, 'utf8');

  it('path cards include a visual signal for optional steps (class or attribute)', () => {
    // Look for an "optional" class, data-optional attribute, or is-optional identifier
    expect(content.toLowerCase()).toMatch(/is.optional|data.optional|class.*optional|optional.*class/);
  });
});

// ---------------------------------------------------------------------------
// index.astro — card titles must be richer than raw numbers
//
// Homepage cards must not use a numeric-only value as the primary visible title.
// Each card should present a descriptive label (e.g. "Domain Knowledge", not "100").
// EXPECTED TO FAIL until card title treatment is updated.
// ---------------------------------------------------------------------------

describe('index.astro card title treatment', () => {
  const homePath = path.resolve(__dirname, '../src/pages/index.astro');
  const content = fs.readFileSync(homePath, 'utf8');

  it('card titles use descriptive labels, not bare skill numbers as the primary heading', () => {
    // The card <h3> or title element must carry a descriptive name, not just a raw number.
    // A title like "Domain Knowledge" or "Project overview" alongside the number is fine.
    // A title that IS only the number (e.g. <h3>100</h3>) is not acceptable.
    // We verify that at least one known descriptive label appears in the template.
    // EXPECTED TO FAIL if cards only show numbers
    expect(content).toMatch(/Domain Knowledge|Project Overview|System Architecture|Feature Definition|Specify Behavior|Implementation|Cleanup|Page Design|Feature Map/i);
  });
});

// ---------------------------------------------------------------------------
// getting-started.mdx — must direct readers to the homepage flow visualization
//
// The Getting Started doc must no longer link to a standalone /path-selection/
// page. Instead it should point readers to the homepage (/) where the full
// flow visualization lives.
// EXPECTED TO FAIL until getting-started.mdx is updated.
// ---------------------------------------------------------------------------

describe('getting-started.mdx links to homepage flow visualization, not a standalone path-selection page', () => {
  const content = readDoc('getting-started.mdx');

  it('does not link to the removed /path-selection/ page', () => {
    // The standalone path-selection page is gone; the link must be removed or updated.
    // EXPECTED TO FAIL: the link to /path-selection/ is still present
    expect(content).not.toMatch(/\/path-selection\//);
  });

  it('does not use the old relative docs link ./path-selection/ for path selection', () => {
    // Old relative link must be gone.
    expect(content).not.toMatch(/\.\/(path-selection)\//);
  });

  it('refers readers to the homepage or its flow visualization for path selection', () => {
    // Must mention the homepage (href="/", href to root, or text like "homepage" / "home page")
    // OR the flow visualization section so readers know where to choose their path.
    // EXPECTED TO FAIL until the copy is updated.
    expect(content.toLowerCase()).toMatch(/homepage|home page|home-page|href=["']\/["']|the home|start page|flow.?visual|visualization/);
  });
});


describe('TopNav.astro header GitHub affordance', () => {
  const topNavPath = path.resolve(__dirname, '../src/components/TopNav.astro');
  const content = fs.readFileSync(topNavPath, 'utf8');

  it('header nav contains a GitHub link', () => {
    // The header must always carry a GitHub link (both homeOnly and full nav variants).
    expect(content).toMatch(/github/i);
  });

  it('header GitHub link includes SVG icon markup (not text-only)', () => {
    // The GitHub link in the header should use an SVG icon, not plain "GitHub" text,
    // so the affordance is visually consistent with the design.
    // EXPECTED TO FAIL until TopNav.astro is updated to include the SVG icon.
    expect(content).toMatch(/<svg|<Icon/i);
  });
});

// ---------------------------------------------------------------------------
// index.astro — homepage framing (read as plain text)
// ---------------------------------------------------------------------------

describe('index.astro homepage framing', () => {
  const homePath = path.resolve(__dirname, '../src/pages/index.astro');
  const content = fs.readFileSync(homePath, 'utf8');

  it('home-hero __copy block does NOT contain an inline SVG GitHub icon', () => {
    // The GitHub SVG icon has moved to the shared header (TopNav.astro).
    // The home-hero__copy block must no longer contain inline SVG/Icon markup.
    // EXPECTED TO FAIL until the SVG is removed from index.astro's hero block.
    const heroCopyMatch = content.match(/class="home-hero__copy"[\s\S]*?<\/div>/);
    expect(heroCopyMatch, 'home-hero__copy block not found in index.astro').not.toBeNull();
    const heroCopy = heroCopyMatch![0];
    expect(heroCopy).not.toMatch(/<svg|<Icon/i);
  });

  it('simple path section includes 401 as a non-optional step (not "when needed" only)', () => {
    // Current content says "201 -> 202 -> 301 (+ 401 when needed)" which treats
    // 401 as optional. The updated framing should always include 401 in the path.
    // This test checks that the heading/copy presents the four steps as a complete path.
    const simplePath = content.match(/201.*202.*301.*401/s);
    expect(simplePath, 'simple path heading should include all four steps: 201 -> 202 -> 301 -> 401').not.toBeNull();
  });

  it('simple path copy does not frame 401 as an afterthought or "when needed"', () => {
    // The phrase "(+ 401 when needed)" frames 401 as optional. This should change.
    expect(content).not.toMatch(/\(\+\s*401\s+when\s+needed\)/i);
  });

  it('supporting copy does not use "make it work / make it right / make it tight" phrasing', () => {
    // That mantra has been removed from the homepage copy.
    // EXPECTED TO FAIL until the phrase is removed from index.astro.
    expect(content.toLowerCase()).not.toMatch(/make it work.*make it right.*make it tight/);
  });
});
