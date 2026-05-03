export type SectionSlug =
  | 'getting-started'
  | 'core-workflow'
  | 'skills'
  | 'examples'
  | 'faq';

export type SkillTier = 'core' | 'optional' | 'bonus';
export type SkillCategory =
  | 'Project Definition'
  | 'Feature Design'
  | 'Implementation and Cleanup'
  | 'Bonus Skills';

export interface Skill {
  slug: string;
  label: string;
  purpose: string;
  whenToUse: string;
  tier: SkillTier;
  category: SkillCategory;
}

export interface WorkflowPath {
  id: string;
  label: string;
  icon: 'comprehensive' | 'conservative' | 'minimal' | 'lean';
  sequence: string;
  description: string;
  note: string;
  /** Primary CTA target URL for this path — used by the merged path hub. */
  action: string;
}

export interface SkillSeries {
  range: string;
  title: string;
  description: string;
}

export interface LifecycleStage {
  label: string;
  title: string;
  description: string;
  steps: string[];
}

export const siteMeta = {
  title: 'SpecFlow',
  description: 'A small spec-driven workflow for building software with AI.',
  github: 'https://github.com/ajelinek/SpecFlow',
};

export const docSections: Array<{ slug: SectionSlug; label: string; summary: string }> = [
  {
    slug: 'getting-started',
    label: 'Getting Started',
    summary: 'The shortest path to a first run.',
  },
  {
    slug: 'core-workflow',
    label: 'Core Workflow',
    summary: 'The recommended default delivery loop: define, specify, build, clean up.',
  },
  {
    slug: 'skills',
    label: 'Full Skill Catalog',
    summary: 'The full catalog.',
  },
  {
    slug: 'examples',
    label: 'Examples',
    summary: 'Example prompt sequences.',
  },
  {
    slug: 'faq',
    label: 'FAQ',
    summary: 'Short answers to common questions.',
  },
];

export const coreWorkflow = [
  {
    slug: '201-high-level-design',
    label: '201-high-level-design',
    title: 'Define the feature',
    description: 'Create a short overview of the feature, its scope, and the primary user journey.',
  },
  {
    slug: '202-spec-design',
    label: '202-spec-design',
    title: 'Specify behavior',
    description: 'Write the Gherkin scenarios that describe the expected behavior in user terms.',
  },
  {
    slug: '301-spec-implementation',
    label: '301-spec-implementation',
    title: 'Implement against the spec',
    description: 'Build the feature through a tests-first workflow with internal cleanup and final validation.',
  },
  {
    slug: '401-cleanup',
    label: '401-cleanup',
    title: 'Cleanup and refinement pass',
    description: 'Run a separate cleanup-only pass on changed source or changed test files to reduce duplication and improve clarity.',
  },
] as const;

export const workflowPaths: WorkflowPath[] = [
  {
    id: 'full',
    label: 'Comprehensive',
    icon: 'comprehensive',
    sequence: '100 -> 101 -> 102 -> 103 -> 104 -> 105 -> 106 -> 107 -> 108 loop -> 110 -> 201 -> 202 -> 203 -> 204 -> 301 -> 401',
    description: 'Use the full lifecycle when the product, architecture, UX, and feature plan all need to be made explicit before coding starts.',
    note: 'Best for greenfield work, major rewrites, and teams that want every reviewable artifact.',
    action: '/getting-started/',
  },
  {
    id: 'conservative',
    label: 'Conservative',
    icon: 'conservative',
    sequence: '100 -> 101 -> 102 -> 103 -> 104 -> 105 -> 106 -> 107 -> 201 -> 202 -> 301 -> 401',
    description: 'Do the project-definition work first, then move into the shortest steady delivery loop.',
    note: 'Recommended default when a project still needs more up-front clarity before moving into steady delivery.',
    action: '/getting-started/',
  },
  {
    id: 'lean',
    label: 'Minimal',
    icon: 'minimal',
    sequence: '201 -> 202 -> 301 -> 401',
    description: 'Skip the up-front project-definition series when the product and architecture are already clear enough.',
    note: 'Best default for normal feature work in an existing repo with solid context.',
    action: '/getting-started/',
  },
  {
    id: 'crazy-lean',
    label: 'Lean',
    icon: 'lean',
    sequence: '301',
    description: 'Start directly at implementation and let 301 synthesize missing planning context in memory.',
    note: 'Fastest path, but the least reviewable. Use it only when the scope is already obvious.',
    action: '/core-workflow/',
  },
];

export const skillSeries: SkillSeries[] = [
  {
    range: '100 Series',
    title: 'Project understanding',
    description: 'Document the domain, product, architecture, UX, and feature map so later feature work has real context.',
  },
  {
    range: '200 Series',
    title: 'Feature design',
    description: 'Define one feature, write the behavior, and optionally persist an implementation plan plus readiness review.',
  },
  {
    range: '300 Series',
    title: 'Implementation',
    description: 'Build the change through the main tests-first implementation workflow or the test-only path.',
  },
  {
    range: '400 Series',
    title: 'Correction and cleanup',
    description: 'Triage failing tests when the right fix path is unclear, or run a deliberate cleanup pass over an already-changed scope.',
  },
];

export const lifecycleStages: LifecycleStage[] = [
  {
    label: '100 Series',
    title: 'Build shared project context',
    description: 'Start here on new projects and on existing projects where the product, architecture, or UX context is still fuzzy.',
    steps: [
      '100-domain-knowledge',
      '101-project-overview',
      '102-system-architecture',
      '103-common-data-model',
      '104-backend-architecture',
      '105-frontend-architecture',
      '106-ui-design',
      '107-ui-experience',
    ],
  },
  {
    label: '108 Loop',
    title: 'Design specific pages only where needed',
    description: 'Run 108 once per route when a page needs a detailed layout and interaction reference before build work starts.',
    steps: ['108-ui-page-design'],
  },
  {
    label: '110',
    title: 'Map the feature backlog',
    description: 'Turn the product into capabilities and thin vertical slices that the feature loop can pick up one by one.',
    steps: ['110-feature-overview'],
  },
  {
    label: 'Development Loop',
    title: 'Repeat per feature',
    description: 'Define the feature, write the behavior, optionally persist the implementation plan, validate readiness, build it, then clean it up.',
    steps: [
      '201-high-level-design',
      '202-spec-design',
      '203-implementation-design',
      '204-feature-validation',
      '301-spec-implementation',
      '401-cleanup',
    ],
  },
];

export const skills: Skill[] = [
  {
    slug: '100-domain-knowledge',
    label: '100-domain-knowledge',
    purpose: 'Research the domain, users, workflows, terminology, regulations, and constraints before planning — including market research and what makes a product unique or its key differentiators — usually through evidence-backed live research.',
    whenToUse: 'Use it when the product space is unfamiliar, regulated, terminology-heavy, or when project understanding is weak.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '101-project-overview',
    label: '101-project-overview',
    purpose: 'Define what the product is, who it serves, and why it matters.',
    whenToUse: 'Use it at the start of a new project after domain research, or when product framing is unclear.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '102-system-architecture',
    label: '102-system-architecture',
    purpose: 'Record the system shape, major components, stack choices, and testing approach.',
    whenToUse: 'Use it when you need a shared technical baseline before implementation work begins.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '103-common-data-model',
    label: '103-common-data-model',
    purpose: 'Define the conceptual entities, relationships, and business rules in the domain.',
    whenToUse: 'Use it when the team needs a shared language for data before backend or frontend design.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '104-backend-architecture',
    label: '104-backend-architecture',
    purpose: 'Specify API structure, service layering, data access, and backend security patterns.',
    whenToUse: 'Use it when the backend needs concrete implementation conventions before feature work.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '105-frontend-architecture',
    label: '105-frontend-architecture',
    purpose: 'Specify component structure, state boundaries, styling rules, and frontend integration patterns.',
    whenToUse: 'Use it when the frontend needs clear architectural rules before detailed page work.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '106-ui-design',
    label: '106-ui-design',
    purpose: 'Set the design philosophy, color system, typography, and component visual strategy.',
    whenToUse: 'Use it when the project needs a design foundation before UX or page-level work.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '107-ui-experience',
    label: '107-ui-experience',
    purpose: 'Define navigation, page inventory, interaction patterns, and UX commitments.',
    whenToUse: 'Use it when you need a coherent UX model before designing specific pages.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '108-ui-page-design',
    label: '108-ui-page-design',
    purpose: 'Design one page in detail with a markdown overview and an HTML mockup used as the primary visual reference.',
    whenToUse: 'Use it when a specific route from the D07 page inventory needs a detailed layout and interaction reference.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '110-feature-overview',
    label: '110-feature-overview',
    purpose: 'Group the product into capabilities and thin vertical feature slices, with stable feature IDs that later design docs can reference.',
    whenToUse: 'Use it when the team needs a concise backlog after the main project docs exist.',
    tier: 'optional',
    category: 'Project Definition',
  },
  {
    slug: '201-high-level-design',
    label: '201-high-level-design',
    purpose: 'Create a concise feature overview, scope boundary, and user journey for one feature.',
    whenToUse: 'Use it first when you are starting design work for a specific feature.',
    tier: 'core',
    category: 'Feature Design',
  },
  {
    slug: '202-spec-design',
    label: '202-spec-design',
    purpose: 'Write Gherkin scenarios with module and lifecycle tagging that describe the feature behavior.',
    whenToUse: 'Use it after 201 to define what should be tested and built.',
    tier: 'core',
    category: 'Feature Design',
  },
  {
    slug: '203-implementation-design',
    label: '203-implementation-design',
    purpose: 'Create a repo-grounded, extend-first implementation plan with selectable detail depth before coding.',
    whenToUse: 'Use it when the team wants a persisted implementation.md plan before coding.',
    tier: 'optional',
    category: 'Feature Design',
  },
  {
    slug: '204-feature-validation',
    label: '204-feature-validation',
    purpose: 'Return a chat-only readiness review across the feature artifacts before coding.',
    whenToUse: 'Use it after 201, 202, and 203 once implementation.md exists and you want a readiness review before coding.',
    tier: 'optional',
    category: 'Feature Design',
  },
  {
    slug: '301-spec-implementation',
    label: '301-spec-implementation',
    purpose: 'Implement substantial changes through a tests-first, phase-isolated workflow with internal cleanup and validation.',
    whenToUse: 'Use it for the main implementation pass when the change is larger than a tiny isolated edit.',
    tier: 'core',
    category: 'Implementation and Cleanup',
  },
  {
    slug: '302-test-implementation',
    label: '302-test-implementation',
    purpose: 'Add or repair automated tests for behavior that already exists, with only minimal UI testability hooks if needed.',
    whenToUse: 'Use it when production behavior is already in place but the automated coverage is weak or missing; route back to 301 if behavior is still missing.',
    tier: 'optional',
    category: 'Implementation and Cleanup',
  },
  {
    slug: '401-cleanup',
    label: '401-cleanup',
    purpose: 'Run a separate cleanup-only pass on either changed source files or changed test files inside a strict scope.',
    whenToUse: 'Use it after implementation only when an existing changed set needs a deliberate cleanup pass.',
    tier: 'core',
    category: 'Implementation and Cleanup',
  },
  {
    slug: '402-test-correction',
    label: '402-test-correction',
    purpose: 'Investigate a failing automated test and decide whether the right correction is in the test, in source, or in the intended behavior itself.',
    whenToUse: 'Use it when a red test needs source-vs-test triage before you decide what to change.',
    tier: 'optional',
    category: 'Implementation and Cleanup',
  },
  {
    slug: 'agent-context',
    label: 'agent-context',
    purpose: 'Refresh root AGENTS.md guidance, with nested overlays only where subtrees materially differ.',
    whenToUse: 'Use it when repo guidance is missing, stale, or needs local subtree overrides.',
    tier: 'bonus',
    category: 'Bonus Skills',
  },
  {
    slug: 'deep-research',
    label: 'deep-research',
    purpose: 'Do multi-source live web research with citations when current external information materially affects the answer.',
    whenToUse: 'Use it any time web search or web research is needed, especially when freshness matters and a strong answer needs more than a single URL summary.',
    tier: 'bonus',
    category: 'Bonus Skills',
  },
];

export const starlightSidebar = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Overview', link: '/getting-started/' },
      { label: 'Custom Agents', link: '/getting-started/custom-agents/' },
    ],
  },
  {
    label: 'Core Workflow',
    items: [
      { label: 'Overview', link: '/core-workflow/' },
    ],
  },
  {
    label: 'Full Skill Catalog',
    link: '/skills/',
  },
  {
    label: 'Project Foundation (100s)',
    items: [
      { slug: 'project-foundation', label: 'Overview' },
      'project-foundation/100-domain-knowledge',
      'project-foundation/101-project-overview',
      'project-foundation/102-system-architecture',
      'project-foundation/103-common-data-model',
      'project-foundation/104-backend-architecture',
      'project-foundation/105-frontend-architecture',
      'project-foundation/106-ui-design',
      'project-foundation/107-ui-experience',
      'project-foundation/108-ui-page-design',
      'project-foundation/110-feature-overview',
    ],
  },
  {
    label: 'Feature Definition (200s)',
    items: [
      { slug: 'feature-design', label: 'Overview' },
      'feature-design/201-high-level-design',
      'feature-design/202-spec-design',
      'feature-design/203-implementation-design',
      'feature-design/204-feature-validation',
    ],
  },
  {
    label: 'Implementation (300s)',
    items: [
      { slug: 'implementation', label: 'Overview' },
      'implementation/301-spec-implementation',
      'implementation/302-test-implementation',
    ],
  },
  {
    label: 'Correction & Cleanup (400s)',
    items: [
      { slug: 'cleanup', label: 'Overview' },
      'cleanup/401-cleanup',
      'cleanup/402-test-correction',
    ],
  },
  {
    label: 'Support Skills & Reference',
    items: [
      { slug: 'support-skills', label: 'Overview' },
      'support-skills/agent-context',
      'support-skills/deep-research',
      { label: 'Artifact Gallery', link: '/artifact-gallery/' },
    ],
  },
  {
    label: 'Examples',
    items: [
      { slug: 'examples', label: 'Overview' },
      'examples/new-feature-existing-project',
      'examples/greenfield-project-with-more-planning',
      'examples/test-only-workflow',
      'examples/failing-test-triage',
      'examples/cleanup-workflow',
      'examples/using-bonus-skills',
    ],
  },
  { label: 'FAQ', link: '/faq/' },
];

export function getSkillsByCategory() {
  const categories: SkillCategory[] = [
    'Project Definition',
    'Feature Design',
    'Implementation and Cleanup',
    'Bonus Skills',
  ];

  return categories.map((category) => ({
    category,
    skills: skills.filter((skill) => skill.category === category),
  }));
}
