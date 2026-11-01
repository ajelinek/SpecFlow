# Page Index Contract

`D08-ui-pages/index.html` is the stable browser entry point for one solution. It catalogs every known
page/route, including pages not yet designed. It is not just a directory listing of mockup files.
Refresh it at the end of every `108` run, including revisions and index-only requests.

## Inventory and ownership

Reconcile D07, existing D08 overviews/index entries, and actual application routes when present.
D07 owns navigation and the page inventory; each `overview.md` owns page-specific route/parameter
and behavior detail. The index summarizes and links those sources rather than becoming a competing
specification. Inspect routing metadata and relevant sources, not every component or feature snapshot.

Preserve unaffected entries and useful notes. Do not remove an entry just because it is absent from D07
or has no mockup folder. Surface conflicting sources or apparent removals; distinguish current,
approved planned, and proposed routes. Correct confirmed stale entries/links, and carry unresolved
conflicts visibly instead of silently choosing a new product contract. Update D07 for approved
navigation changes when it exists; don't generate upstream documents just to maintain the catalog.

## One entry per navigable view

- Give every distinct route/view a separate entry, even when it opens the same mockup. A tab with its own
  application URL is individually listed and links directly to its preview, not the mockup's default.
- For finite known route alternatives, expand them into named entries (for example, each known section
  represented by a `:section` parameter). Keep truly dynamic IDs as route patterns; do not enumerate
  every possible parameter value or invented future page. If known alternatives are incomplete, say so.
- Include URL-addressable drawers/overlays as labeled variants under their owning route, with their
  parameter contract and preview links. They need not become separate page folders. Ordinary filters
  and local UI states stay in parameter/state notes, not an entry for every combination.
- Include known redirect-only routes and their destinations without inventing a mockup. A wildcard or
  not-found route is a pattern, not a real application link to `*`.

## Content to show

Keep the catalog clean, attractive, and easy to navigate; the bundled HTML template is a starting
structure, not a fixed visual design. Use tables and lists where they aid scanning: a compact
at-a-glance table (one row per route/view, linking to its detail section) plus a detail card per entry,
with parameter tables inside. Keep tables narrow enough to read, scrollable on small screens, and never the
only carrier of status (write status as text). Each entry exposes:

- **Page/view name and purpose**; grouping by area is fine without hiding individual routes.
- **Application URL/route pattern**, with current/planned/proposed status where needed. Distinguish this
  from the local HTML preview URL. A dynamic pattern is documentation, not a clickable live app URL;
  use synthetic example values if a concrete example helps. Never put real personal data or tokens here.
- **Path parameters** and **search/query parameters** separately: name, meaning/type or known values,
  required/optional, default/omission behavior, and important invalid-value behavior. Put longer detail
  in the linked overview or expandable notes. Shared parameters can be defined once and referenced.
  Explicitly distinguish unknown from none; don't infer no parameters from missing documentation.
- **Access**: relevant roles/conditions, or unknown. This is UX context, not an authorization guarantee.
- **Design coverage and links**: mockup at the exact view/state preset, overview, and relevant state
  shortcuts. Mark **Not yet designed**, **Partial** (name gaps), **Designed**, or **Needs reconciliation**
  based on real coverage, not folder existence. New index entries for undesigned pages have no fake links.

## Stable navigation and verification

Keep the same index path between runs. Link governing documents that exist using relative paths;
do not leave dead reference links for missing docs. Link each touched mockup/overview back to the index.
Reuse established preview preset syntax; don't break saved links to unrelated views when revising a page.
If an existing mockup lacks a direct-view preset, mark that coverage gap rather than link to the wrong view.

Verify the catalog against the reconciled inventory in both directions: every known route is represented,
and every entry has a source or an explicitly labeled unresolved proposal. Check that preview files exist
and their fragments/presets actually select the labeled view/state on a fresh load. Check relative links
and any renamed route/preset references across the index and touched artifacts. Report unresolved coverage
and checks not performed; maintaining the index does not mean designing all listed pages this run.
