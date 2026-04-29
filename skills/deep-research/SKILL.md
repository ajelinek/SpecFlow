---
name: deep-research
description: >
  Do deep web research that requires finding, comparing, and synthesizing multiple current
  sources before answering. Use it when the user asks for research, a deep dive, current-state
  analysis, or an evidence-backed recommendation, including vendor comparisons, market scans,
  due diligence, or "what changed recently" questions.
compatibility: Requires internet access plus a discovery mechanism. In OpenCode, assume `websearch_cited` is unavailable unless the environment clearly provides it. Use DuckDuckGo Lite search result pages such as `https://duckduckgo.com/lite/?q=<query>` for discovery, then use `webfetch` or equivalent page retrieval for source extraction. For latest, current-state, recent, or what-changed questions, do not rely on model memory alone; verify with live web sources.
---

# Deep Research

Use this skill to answer web research questions that need real discovery, source comparison, and evidence-backed recommendations.

This skill is for research work that would be weak if handled as a few `webfetch` calls. The goal is to search deliberately, identify the right sources, extract the relevant evidence, challenge the first conclusion, and return a recommendation that separates facts from judgment.

## Use This Skill For

- Deep dives on a topic with unclear answers
- Current-state research where freshness matters
- Comparing vendors, tools, standards, frameworks, or policies
- Gathering decision inputs from primary and secondary sources
- Producing recommendations with citations and trade-offs

## Do Not Use This Skill For

- Summarizing a single URL the user already provided
- Simple fact lookups that do not require source discovery
- Tasks that are really code changes, document editing, or data processing with little web research involved

## Required Capabilities

Before starting, confirm what web capabilities are actually available.

- In OpenCode, default to live web discovery rather than relying on prior model knowledge for anything framed as latest, recent, current, changed, or right now.
- If the user asks for freshness-sensitive research, do not answer from memory first and add citations later; discover sources first, then answer.
- Prefer `websearch_cited` when you need open-ended discovery: searching, comparing candidate sources, and finding additional leads.
- Use `webfetch` or equivalent URL fetching tools to extract page content once relevant sources are found.
- If `websearch_cited` fails with a configuration error, treat it as unavailable for this run and fall back instead of retrying blindly.
- Fallback discovery: use DuckDuckGo Lite result pages such as `https://duckduckgo.com/lite/?q=<query>` to locate result pages, then inspect and extract URLs from those results.
- If neither `websearch_cited`, DuckDuckGo-style query fallback, nor sufficient seed URLs are available, say that you cannot do full deep research in this environment instead of pretending a few fetches are comprehensive.

Practical rule:

- In OpenCode, DuckDuckGo Lite result pages plus `webfetch` are the default discovery path unless a stronger native search tool is clearly available.
- `webfetch` is for extraction and synthesis from known URLs.
- Do not treat model memory as sufficient evidence for latest or current-state claims.

## Research Standard

Treat this as decision support, not content collection.

- For freshness-sensitive topics, explicitly prefer live sources over remembered background knowledge.
- Prefer primary sources first: official docs, specifications, vendor documentation, maintainer statements, government publications, standards bodies, papers, earnings reports, repos, changelogs.
- Use strong secondary sources to add context, not to replace primary evidence.
- Verify important claims across multiple sources when possible.
- Distinguish observed facts, inferred implications, and your recommendation.
- Do not present a recommendation until you have tested at least one plausible alternative.

## Workflow

### 1. Frame the research question

First, pin down the actual decision or question.

- Identify the user's objective, audience, deadline, and desired deliverable.
- Extract explicit constraints: budget, region, tech stack, policy limits, timeline, risk tolerance.
- If the question is underspecified, ask targeted clarifying questions before doing broad research.
- Write a short research brief for yourself: question, scope, exclusions, and decision criteria.

### 2. Plan search lanes

Do not start with one query and hope for the best. Create 3-6 search lanes such as:

- Official documentation or specs
- Maintainer or vendor documentation
- Independent technical analysis
- News or change-history coverage
- Academic or standards sources
- Community evidence for operational issues

For each lane, identify 2-4 likely query shapes using the user's vocabulary plus synonyms, competing terms, and likely version/date constraints.

If the user already provided URLs, treat them as seed sources rather than the whole universe. Ask what would need to be true for those sources to be incomplete or biased, then plan at least one lane that could challenge them.

### 3. Discover sources with `websearch_cited`

Use `websearch_cited` for discovery and use normal, targeted research behavior rather than broad collection.

- Start with the highest-signal lane, usually primary sources.
- Use `websearch_cited` to find candidate sources when you do not already have strong URLs.
- Open promising results and quickly classify them: primary, secondary, weak, outdated, marketing-heavy, or irrelevant.
- Capture source URLs as you go so you can cite them later.
- Keep the source set intentionally diverse enough to challenge the first story you find.

If `websearch_cited` is unavailable or misconfigured:

- Use a DuckDuckGo Lite query URL for each planned search lane.
- Inspect the returned result page and extract the most relevant candidate URLs.
- DuckDuckGo result links may be wrapped in redirect URLs; if so, recover the destination from the `uddg` query parameter before fetching the source page.
- Prioritize official docs, specs, maintainer pages, government sources, and high-quality analysis over aggregator pages.
- Tell the user that discovery used a fallback path because the preferred cited search tool was unavailable.

In OpenCode, you should usually assume this fallback path is the intended path:

- Start with DuckDuckGo Lite result pages.
- Extract direct destination URLs from `uddg` when DuckDuckGo wraps the links.
- Fetch the underlying source pages, not the DuckDuckGo redirect wrapper.
- Use multiple live sources before making freshness-sensitive claims.

If search fallback is also unavailable:

- Start from user-provided URLs, direct official documentation URLs, or well-known primary-source entry points.
- Expand only through links you can reach from those sources or through clearly derivable official locations.
- Tell the user that the research is narrower because open-ended discovery was not available.

Behavioral guardrails:

- Avoid rapid-fire page loading meant to simulate bulk scraping.
- Prefer reading pages that are clearly meant for public web access.
- Respect obvious access boundaries, robots cues, login walls, rate limits, and site terms.
- If a site appears hostile to automated access, back off and use other available sources.

### 4. Extract evidence

Once a source is selected, use page retrieval or browser reads to pull the relevant content.

- Extract only the sections needed for the question.
- Record the exact claim, source URL, publisher, and any visible date/version information.
- Note whether the source is normative, descriptive, promotional, anecdotal, or analytical.
- Prefer recent sources for fast-moving topics, but keep older canonical references when they still define the standard.

Maintain a simple source ledger as you work:

- Source title or page
- URL
- Source type
- Date or version
- Key claims
- Reliability notes

### 5. Triangulate and test conclusions

Actively look for disagreement, caveats, and missing context.

- Compare claims across primary and secondary sources.
- Look for version drift, regional differences, pricing caveats, benchmark flaws, and unstated assumptions.
- If two strong sources disagree, surface the disagreement rather than smoothing it away.
- Search specifically for failure modes, limitations, criticisms, migration risks, and edge cases.
- Revisit the search plan if the evidence base is thin or too one-sided.

### 6. Form a recommendation

Only recommend after the evidence is reasonably complete for the question.

- State the recommendation plainly.
- Tie it back to the user's decision criteria.
- Explain the strongest alternative and why it did not win.
- Call out confidence level, missing evidence, and what could change the recommendation.

## Output Format

Use a structure close to this for substantial research:

```markdown
# [Research topic]

## Bottom line
[2-5 sentence answer with the recommendation up front.]

## Recommendation
- [Recommended option or direction]
- [Why it fits the user's criteria]
- [Confidence and main caveat]

## Key findings
- [Finding]. Source: [title](URL)
- [Finding]. Source: [title](URL)
- [Finding]. Source: [title](URL)

## Alternatives considered
- [Alternative]: [why it was plausible, why it lost]

## Risks and unknowns
- [Risk, uncertainty, or missing evidence]

## Source notes
- [Title] - [publisher/site], [date or version if available], [why it matters]
```

For lighter-weight research, you may compress the format, but still include:

- A direct answer
- Evidence-backed findings with citations
- Trade-offs or uncertainties
- A recommendation when the user asked for one

## Quality Bar

Do not stop at a shallow summary.

- Cite the source for every important factual claim.
- Prefer 5+ meaningful sources for non-trivial research unless the topic is extremely narrow.
- Use at least 2 primary sources when they exist.
- Call out when evidence is thin, stale, or dominated by one interested party.
- Say "I could not verify" instead of guessing.
- If the topic is time-sensitive, note the research date explicitly.
- If discovery was constrained to known URLs, say so explicitly.

## Recommendation Discipline

Recommendations should be earned.

- Separate these three layers clearly: facts, interpretation, recommendation.
- Make trade-offs explicit instead of pretending one option is universally best.
- Optimize for the user's context, not generic industry defaults.
- If the user did not ask for a recommendation, return findings first and offer one only if useful.

## Examples

**Use this skill:**

- "Do a deep dive on E2B vs Modal vs Daytona for remote code execution backends and recommend one for an agent platform."
- "Research the latest browser automation options for Claude Code style workflows and tell me the best fit with risks."
- "Can you look into recent EU AI Act obligations that would matter for a SaaS vendor shipping to enterprise customers?"

**Do not use this skill:**

- "Summarize this one article I linked."
- "Open this URL and tell me what it says."

## Final Checks

Before replying, confirm:

- The answer reflects the user's actual decision or question.
- The source mix is not overly dependent on one vendor or commentator.
- Key claims are cited.
- The recommendation, if any, is supported by the evidence shown.
- Limitations and unknowns are stated plainly.
