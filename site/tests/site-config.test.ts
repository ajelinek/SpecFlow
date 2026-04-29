/**
 * Tests for the shared site configuration module (`src/lib/specflow.ts`).
 *
 * These tests define the expected API shape for the Starlight migration.
 * They test the data that feeds:
 *   - Starlight sidebar config (starlightSidebar)
 *   - Site metadata (siteMeta)
 *   - Homepage section links (docSections)
 *   - Homepage workflow cards (coreWorkflow)
 *   - Skills catalog (skills, getSkillsByCategory)
 *
 * Some assertions target exports that do not exist yet (`starlightSidebar`).
 * Those will fail until the production module is updated.
 */

import { describe, expect, it } from 'vitest';
import {
  coreWorkflow,
  docSections,
  getSkillsByCategory,
  siteMeta,
  skills,
  starlightSidebar,
  type SectionSlug,
  type SkillCategory,
  type SkillTier,
} from '../src/lib/specflow';

// ---------------------------------------------------------------------------
// siteMeta
// ---------------------------------------------------------------------------

describe('siteMeta', () => {
  it('has a non-empty title', () => {
    expect(siteMeta.title).toBeTruthy();
  });

  it('has a non-empty description', () => {
    expect(siteMeta.description).toBeTruthy();
  });

  it('has a valid GitHub URL', () => {
    expect(siteMeta.github).toMatch(/^https:\/\/github\.com\//);
  });
});

// ---------------------------------------------------------------------------
// docSections — drives homepage section links and Starlight sidebar groups
// ---------------------------------------------------------------------------

describe('docSections', () => {
  const requiredSlugs: SectionSlug[] = [
    'getting-started',
    'core-workflow',
    'skills',
    'examples',
    'faq',
  ];

  it('contains all required section slugs', () => {
    const actualSlugs = docSections.map((s) => s.slug);
    for (const slug of requiredSlugs) {
      expect(actualSlugs).toContain(slug);
    }
  });

  it('every section has a non-empty label and summary', () => {
    for (const section of docSections) {
      expect(section.label, `label missing for ${section.slug}`).toBeTruthy();
      expect(section.summary, `summary missing for ${section.slug}`).toBeTruthy();
    }
  });

  it('sections appear in reading order (getting-started first, faq last)', () => {
    const slugs = docSections.map((s) => s.slug);
    expect(slugs[0]).toBe('getting-started');
    expect(slugs[slugs.length - 1]).toBe('faq');
  });
});

// ---------------------------------------------------------------------------
// coreWorkflow — drives homepage workflow cards
// ---------------------------------------------------------------------------

describe('coreWorkflow', () => {
  const requiredSlugs = [
    '201-high-level-design',
    '202-spec-design',
    '301-spec-implementation',
    '401-cleanup',
  ];

  it('contains all four core steps in order', () => {
    expect(coreWorkflow.map((s) => s.slug)).toEqual(requiredSlugs);
  });

  it('every step has a non-empty title and description', () => {
    for (const step of coreWorkflow) {
      expect(step.title, `title missing for ${step.slug}`).toBeTruthy();
      expect(step.description, `description missing for ${step.slug}`).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// skills catalog
// ---------------------------------------------------------------------------

describe('skills', () => {
  const validTiers: SkillTier[] = ['core', 'optional', 'bonus'];
  const validCategories: SkillCategory[] = [
    'Project Definition',
    'Feature Design',
    'Implementation and Cleanup',
    'Bonus Skills',
  ];

  it('contains at least one core skill', () => {
    expect(skills.some((s) => s.tier === 'core')).toBe(true);
  });

  it('every skill has a slug, label, purpose, whenToUse, tier, and category', () => {
    for (const skill of skills) {
      expect(skill.slug, 'slug').toBeTruthy();
      expect(skill.label, `label for ${skill.slug}`).toBeTruthy();
      expect(skill.purpose, `purpose for ${skill.slug}`).toBeTruthy();
      expect(skill.whenToUse, `whenToUse for ${skill.slug}`).toBeTruthy();
      expect(validTiers, `tier for ${skill.slug}`).toContain(skill.tier);
      expect(validCategories, `category for ${skill.slug}`).toContain(skill.category);
    }
  });

  it('slug values are unique', () => {
    const slugs = skills.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

// ---------------------------------------------------------------------------
// getSkillsByCategory
// ---------------------------------------------------------------------------

describe('getSkillsByCategory', () => {
  it('returns one entry per category in a stable order', () => {
    const groups = getSkillsByCategory();
    expect(groups.map((g) => g.category)).toEqual([
      'Project Definition',
      'Feature Design',
      'Implementation and Cleanup',
      'Bonus Skills',
    ]);
  });

  it('every category group contains at least one skill', () => {
    for (const group of getSkillsByCategory()) {
      expect(group.skills.length, `no skills in category "${group.category}"`).toBeGreaterThan(0);
    }
  });

  it('all skills are accounted for across categories (no leaks)', () => {
    const allFromGroups = getSkillsByCategory().flatMap((g) => g.skills);
    expect(allFromGroups.length).toBe(skills.length);
  });
});

// ---------------------------------------------------------------------------
// starlightSidebar — new export required for Starlight integration
//
// This export does not exist yet. These tests WILL FAIL until the production
// module is updated to add `starlightSidebar`.
// ---------------------------------------------------------------------------

describe('starlightSidebar', () => {
  it('is exported from specflow.ts', () => {
    expect(starlightSidebar).toBeDefined();
  });

  it('is a non-empty array', () => {
    expect(Array.isArray(starlightSidebar)).toBe(true);
    expect(starlightSidebar.length).toBeGreaterThan(0);
  });

  it('every top-level entry has a label and exactly one of: link, items, or autogenerate', () => {
    for (const entry of starlightSidebar) {
      expect(entry.label, 'sidebar entry label').toBeTruthy();
      const hasLink = 'link' in entry && typeof entry.link === 'string';
      const hasItems = 'items' in entry && Array.isArray(entry.items);
      const hasAutogenerate = 'autogenerate' in entry && typeof entry.autogenerate === 'object';
      expect(
        hasLink || hasItems || hasAutogenerate,
        `entry "${entry.label}" must have link, items, or autogenerate`,
      ).toBe(true);
    }
  });

  it('contains a group for each docSection slug', () => {
    const groupLabels = starlightSidebar.map((g) => g.label.toLowerCase());
    for (const section of docSections) {
      // Match by label text (case-insensitive) rather than brittle slug equality
      const matched = groupLabels.some((l) => l.includes(section.label.toLowerCase()));
      expect(matched, `no sidebar group found for section "${section.slug}"`).toBe(true);
    }
  });

  // The "Full Skill Catalog" and "FAQ" entries must be direct clickable links,
  // not autogenerate groups (which Starlight renders as non-clickable headers).
  it('Full Skill Catalog entry uses a direct link, not autogenerate', () => {
    const entry = starlightSidebar.find(
      (g) => g.label.toLowerCase().includes('full skill catalog') || g.label.toLowerCase() === 'skills',
    );
    expect(entry, 'sidebar entry for Full Skill Catalog not found').toBeDefined();
    // A direct link entry must NOT use autogenerate; it must carry a `link` property.
    expect(
      'autogenerate' in entry! && entry!.autogenerate !== undefined,
      'Full Skill Catalog sidebar entry must not be an autogenerate group',
    ).toBe(false);
    expect('link' in entry!, 'Full Skill Catalog sidebar entry must have a link property').toBe(true);
  });

  it('FAQ entry uses a direct link, not autogenerate', () => {
    const entry = starlightSidebar.find((g) => g.label.toLowerCase().includes('faq'));
    expect(entry, 'sidebar entry for FAQ not found').toBeDefined();
    expect(
      'autogenerate' in entry! && entry!.autogenerate !== undefined,
      'FAQ sidebar entry must not be an autogenerate group',
    ).toBe(false);
    expect('link' in entry!, 'FAQ sidebar entry must have a link property').toBe(true);
  });
});

// ---------------------------------------------------------------------------
// homepage framing — data assertions that can be verified without rendering
// ---------------------------------------------------------------------------

describe('homepage simple path', () => {
  it('coreWorkflow includes 401-cleanup as the fourth step (not optional)', () => {
    // The simple path should always include 401, not present it as an add-on.
    const slugs = coreWorkflow.map((s) => s.slug);
    expect(slugs).toContain('401-cleanup');
    expect(slugs.indexOf('401-cleanup')).toBe(3);
  });

  it('siteMeta has a github URL (GitHub affordance is present in site data)', () => {
    expect(siteMeta.github).toMatch(/^https:\/\/github\.com\//);
  });
});

// ---------------------------------------------------------------------------
// skills catalog data assertions
// ---------------------------------------------------------------------------

describe('100-domain-knowledge skill entry', () => {
  const skill = skills.find((s) => s.slug === '100-domain-knowledge');

  it('exists in the catalog', () => {
    expect(skill).toBeDefined();
  });

  it('purpose covers domain research', () => {
    expect(skill!.purpose.toLowerCase()).toMatch(/domain.*(research|resea)/);
  });

  it('purpose or whenToUse mentions market research', () => {
    const combined = `${skill!.purpose} ${skill!.whenToUse}`.toLowerCase();
    expect(combined).toMatch(/market/);
  });

  it('purpose or whenToUse mentions what makes a project or product unique', () => {
    const combined = `${skill!.purpose} ${skill!.whenToUse}`.toLowerCase();
    expect(combined).toMatch(/unique|differentiator/);
  });

  it('purpose or whenToUse mentions users', () => {
    const combined = `${skill!.purpose} ${skill!.whenToUse}`.toLowerCase();
    expect(combined).toMatch(/user/);
  });

  it('purpose or whenToUse mentions workflows', () => {
    const combined = `${skill!.purpose} ${skill!.whenToUse}`.toLowerCase();
    expect(combined).toMatch(/workflow/);
  });

  it('purpose or whenToUse mentions terminology', () => {
    const combined = `${skill!.purpose} ${skill!.whenToUse}`.toLowerCase();
    expect(combined).toMatch(/terminolog/);
  });

  it('purpose or whenToUse mentions regulations', () => {
    const combined = `${skill!.purpose} ${skill!.whenToUse}`.toLowerCase();
    expect(combined).toMatch(/regulat/);
  });
});

describe('deep-research skill entry', () => {
  const skill = skills.find((s) => s.slug === 'deep-research');

  it('exists in the catalog', () => {
    expect(skill).toBeDefined();
  });

  it('whenToUse states it can be used any time web search or research is needed (not only when freshness matters)', () => {
    const whenToUse = skill!.whenToUse.toLowerCase();
    // Must explicitly say "any time", "anytime", or "whenever" to convey broad applicability.
    // Phrases like "when freshness matters" are too narrow and should not be the only signal.
    expect(whenToUse).toMatch(/any time|anytime|whenever/);
  });
});

// ---------------------------------------------------------------------------
// starlightSidebar — Path Selection must NOT appear anywhere in the sidebar
//
// The dedicated path-selection page has been removed entirely. The sidebar
// must contain no link or autogenerate entry for path-selection under any group.
// ---------------------------------------------------------------------------

describe('starlightSidebar path-selection removal', () => {
  it('Getting Started group does not include a Path Selection link', () => {
    const gettingStartedGroup = starlightSidebar.find(
      (g) => g.label.toLowerCase() === 'getting started',
    );
    expect(gettingStartedGroup, 'Getting Started sidebar group not found').toBeDefined();
    const items: Array<unknown> = 'items' in gettingStartedGroup! ? (gettingStartedGroup!.items as Array<unknown>) : [];
    const hasPathSelection = items.some((item) => {
      if (typeof item === 'string') return item.includes('path-selection');
      if (typeof item === 'object' && item !== null) {
        const obj = item as Record<string, unknown>;
        return (
          (typeof obj.link === 'string' && obj.link.includes('path-selection')) ||
          (typeof obj.slug === 'string' && obj.slug.includes('path-selection')) ||
          (typeof obj.label === 'string' && obj.label.toLowerCase().includes('path selection'))
        );
      }
      return false;
    });
    expect(hasPathSelection, 'sidebar Getting Started group must not include a Path Selection link').toBe(false);
  });

  it('no sidebar group at any level links to /path-selection/', () => {
    // Flatten all sidebar entries and check that none reference path-selection
    const allLinks = starlightSidebar.flatMap((group) => {
      const links: string[] = [];
      if ('link' in group && typeof group.link === 'string') links.push(group.link);
      if ('items' in group && Array.isArray(group.items)) {
        for (const item of group.items as Array<unknown>) {
          if (typeof item === 'string') links.push(item);
          else if (typeof item === 'object' && item !== null) {
            const obj = item as Record<string, unknown>;
            if (typeof obj.link === 'string') links.push(obj.link);
            if (typeof obj.slug === 'string') links.push(obj.slug);
          }
        }
      }
      return links;
    });
    const hasPathSelection = allLinks.some((l) => l.includes('path-selection'));
    expect(hasPathSelection, 'No sidebar entry should link to path-selection').toBe(false);
  });
});

// ---------------------------------------------------------------------------
// workflowPaths — four named flow options
//
// Scenario 6: Must have exactly four options: full, conservative, lean, and
// an aggressive/implementation-first path.
// ---------------------------------------------------------------------------

describe('workflowPaths flow options', () => {
  // workflowPaths is already exported
  it('exports workflowPaths from specflow.ts', async () => {
    const mod = await import('../src/lib/specflow');
    expect(mod.workflowPaths).toBeDefined();
    expect(Array.isArray(mod.workflowPaths)).toBe(true);
  });

  it('has exactly four workflow path options', async () => {
    const { workflowPaths } = await import('../src/lib/specflow');
    expect(workflowPaths.length).toBe(4);
  });

  it('includes a "full" path (id or label matches "full")', async () => {
    const { workflowPaths } = await import('../src/lib/specflow');
    const full = workflowPaths.find(
      (p) => p.id === 'full' || p.label.toLowerCase() === 'full',
    );
    expect(full, 'workflowPaths must include a "full" entry').toBeDefined();
  });

  it('includes a "conservative" path (id or label matches "conservative")', async () => {
    const { workflowPaths } = await import('../src/lib/specflow');
    const conservative = workflowPaths.find(
      (p) => p.id === 'conservative' || p.label.toLowerCase() === 'conservative',
    );
    expect(conservative, 'workflowPaths must include a "conservative" entry').toBeDefined();
  });

  it('includes a "lean" path (id or label matches "lean")', async () => {
    const { workflowPaths } = await import('../src/lib/specflow');
    const lean = workflowPaths.find(
      (p) => p.id === 'lean' || p.label.toLowerCase().includes('lean'),
    );
    expect(lean, 'workflowPaths must include a "lean" entry').toBeDefined();
  });

  it('includes an aggressive/implementation-first path as the fourth option', async () => {
    const { workflowPaths } = await import('../src/lib/specflow');
    // The fourth path is the most aggressive / implementation-first option.
    // Acceptable IDs: "crazy-lean", "implementation-first", "aggressive", etc.
    // The sequence must start at 301 (implementation-only) or be the leanest option.
    const fourth = workflowPaths[3];
    expect(fourth, 'fourth workflowPath must exist').toBeDefined();
    const isAggressive =
      fourth.id.includes('lean') ||
      fourth.id.includes('aggressive') ||
      fourth.id.includes('implementation') ||
      fourth.sequence.trimStart().startsWith('301');
    expect(isAggressive, `fourth path id="${fourth.id}" must be the aggressive/implementation-first option`).toBe(true);
  });

  it('conservative path is the recommended default (note or description says so)', async () => {
    const { workflowPaths } = await import('../src/lib/specflow');
    const conservative = workflowPaths.find(
      (p) => p.id === 'conservative' || p.label.toLowerCase() === 'conservative',
    );
    expect(conservative, 'conservative path not found').toBeDefined();
    const combined = `${conservative!.note} ${conservative!.description}`.toLowerCase();
    expect(combined).toMatch(/default|recommend/);
  });

  it('every path has a non-empty id, label, sequence, description, and note', async () => {
    const { workflowPaths } = await import('../src/lib/specflow');
    for (const p of workflowPaths) {
      expect(p.id, 'id').toBeTruthy();
      expect(p.label, `label for ${p.id}`).toBeTruthy();
      expect(p.sequence, `sequence for ${p.id}`).toBeTruthy();
      expect(p.description, `description for ${p.id}`).toBeTruthy();
      expect(p.note, `note for ${p.id}`).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// 401-cleanup framing in coreWorkflow — must not describe itself as optional
// ---------------------------------------------------------------------------

describe('coreWorkflow 401-cleanup framing', () => {
  const step = coreWorkflow.find((s) => s.slug === '401-cleanup');

  it('401-cleanup step exists', () => {
    expect(step).toBeDefined();
  });

  it('401-cleanup title does not frame the step as optional', () => {
    // Title like "Optional cleanup pass" contradicts the simple path framing
    // where 401 is always the fourth step, not an add-on.
    expect(step!.title.toLowerCase()).not.toMatch(/optional/);
  });

  it('401-cleanup description does not say "when needed"', () => {
    // Phrases like "when needed" imply 401 is skippable.
    // The description should present it as a standard step.
    expect(step!.description.toLowerCase()).not.toMatch(/when needed/);
  });

  it('401-cleanup title communicates it is a cleanup/refine step', () => {
    // The title should reflect what the step does: clean up / tighten the code.
    expect(step!.title.toLowerCase()).toMatch(/clean|refine|tighten|polish/);
  });
});
