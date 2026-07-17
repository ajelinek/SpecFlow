#!/usr/bin/env node
// Combines every *.graphql file under a D03-common-data-model folder into one
// schema, validates it, and emits an interactive Voyager visualization.
//
// `npm install` here is a one-time, skill-local step (never touches the consuming
// project — see package.json) that only needs to run once, then reused for every
// project. Run from this scripts/ folder:
//
//   npm install
//   node generate-voyager.mjs <path-to-D03-folder>
//
// Output: <D03-folder>/build/introspection.json and <D03-folder>/build/voyager.html

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { buildSchema, getIntrospectionQuery, graphqlSync } from 'graphql';

const root = process.argv[2];

if (!root) {
  console.error('Usage: node generate-voyager.mjs <path-to-D03-common-data-model-folder>');
  process.exit(1);
}

function findGraphQLFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'build' || entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findGraphQLFiles(full));
    } else if (entry.name.endsWith('.graphql')) {
      results.push(full);
    }
  }
  return results;
}

let files;
try {
  files = findGraphQLFiles(root);
} catch (err) {
  console.error(`Could not read ${root}: ${err.message}`);
  process.exit(1);
}

if (files.length === 0) {
  console.error(`No .graphql files found under ${root}`);
  process.exit(1);
}

// _directives.graphql first so the concatenated file reads top-to-bottom with
// declarations before usage. Not required by buildSchema (order doesn't matter
// to the parser), purely for human readability of the combined output.
files.sort((a, b) => {
  const aIsDirectives = a.includes('_directives');
  const bIsDirectives = b.includes('_directives');
  if (aIsDirectives !== bIsDirectives) return aIsDirectives ? -1 : 1;
  return a.localeCompare(b);
});

const combinedSDL = files
  .map((f) => `# ---- ${relative(root, f)} ----\n${readFileSync(f, 'utf8')}`)
  .join('\n\n');

let schema;
try {
  schema = buildSchema(combinedSDL);
} catch (err) {
  console.error('Schema is not valid GraphQL SDL once all files are combined:\n');
  console.error(err.message);
  process.exit(1);
}

const introspectionResult = graphqlSync({ schema, source: getIntrospectionQuery() });

if (introspectionResult.errors?.length) {
  console.error('Failed to introspect the combined schema:');
  for (const e of introspectionResult.errors) console.error(`  - ${e.message}`);
  process.exit(1);
}

// Voyager's `introspection` prop expects the raw response envelope (the shape you'd
// get back from POSTing the introspection query to a live endpoint), not just the
// inner `__schema` object — confirmed by testing against the actual rendered output,
// not just by reading the API.
const introspectionEnvelope = { data: introspectionResult.data };

// The placeholder Query/Mutation roots (see _directives.graphql) have no fields
// pointing into the domain, so Voyager's default Query-rooted graph traversal has
// nothing to draw — a first-time viewer just sees an empty `Query { _: Boolean }`
// box with no visual cue that anything else exists. Voyager *can* root the graph on
// any type (there's a type-picker dropdown, confirmed against the actual rendered
// page, not just the docs), but defaulting to it removes the dependency on a user
// finding that control on their own. Heuristic: the first object type, in schema
// declaration order, that has its own `id` field — i.e. the first first-class entity
// the author wrote, per this skill's own entity-vs-value-object test.
let defaultRootType = 'Query';
for (const [name, type] of Object.entries(schema.getTypeMap())) {
  if (name.startsWith('__') || name === 'Query' || name === 'Mutation') continue;
  if (type.astNode?.kind !== 'ObjectTypeDefinition') continue;
  if ('id' in (type.getFields?.() ?? {})) {
    defaultRootType = name;
    break;
  }
}

const buildDir = join(root, 'build');
mkdirSync(buildDir, { recursive: true });

const introspectionPath = join(buildDir, 'introspection.json');
writeFileSync(introspectionPath, JSON.stringify(introspectionEnvelope, null, 2));

const voyagerPath = join(buildDir, 'voyager.html');
writeFileSync(
  voyagerPath,
  `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Common Data Model — Voyager</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.css" />
<style>
  html, body { height: 100%; margin: 0; }
  #root-hint {
    box-sizing: border-box;
    height: 32px;
    padding: 6px 12px;
    background: #2c3e50;
    color: #fff;
    font: 13px/20px -apple-system, sans-serif;
  }
  #voyager { height: calc(100% - 32px); }
</style>
</head>
<body>
<div id="root-hint">Documentation-only schema, opened on <strong>${defaultRootType}</strong> — pick any other entity from the dropdown at the bottom-left to jump to it.</div>
<div id="voyager">Loading...</div>
<script src="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.standalone.js"></script>
<script>
  var introspection = ${JSON.stringify(introspectionEnvelope)};
  GraphQLVoyager.renderVoyager(document.getElementById('voyager'), {
    introspection: introspection,
    displayOptions: { rootType: ${JSON.stringify(defaultRootType)} }
  });
</script>
</body>
</html>
`
);

console.log(`Combined ${files.length} schema file(s): ${files.map((f) => relative(root, f)).join(', ')}`);
console.log(`Wrote ${introspectionPath}`);
console.log(`Wrote ${voyagerPath} (default root type: ${defaultRootType})`);
