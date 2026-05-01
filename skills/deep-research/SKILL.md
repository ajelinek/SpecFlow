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

Use this skill for research that needs real source discovery, source comparison, and
evidence-backed conclusions.

Use it for:

- deep dives with unclear answers
- current-state questions where freshness matters
- vendor/tool/framework/policy comparisons
- evidence-backed recommendations with trade-offs

Do not use it for:

- summarizing a single provided URL
- simple fact lookups that do not need discovery
- tasks that are really code changes or document editing

---

## Core Rules

1. For latest/current/recent questions, use live sources first. Do not answer from memory and add
   citations later.
2. Prefer `websearch_cited` for discovery when available.
3. In OpenCode, assume DuckDuckGo Lite plus `webfetch` is the normal fallback path.
4. Prefer primary sources first; use strong secondary sources for context.
5. Verify important claims across multiple sources when possible.
6. Separate facts, interpretation, and recommendation.
7. If discovery is too constrained for real deep research, say so explicitly.
8. Do not present a recommendation until you have tested at least one plausible alternative.

---

## Workflow

- [ ] **Step 1: Frame the research question.** Identify the user's actual decision, audience,
  constraints, exclusions, and desired deliverable. If underspecified, ask focused clarifying
  questions.

- [ ] **Step 2: Plan search lanes.** Create 3-6 research lanes such as:
  - official docs/specs
  - vendor or maintainer material
  - independent technical analysis
  - news or change-history coverage
  - academic, standards, or government sources
  - community evidence for operational risks

  If the user provided URLs, treat them as seed sources, not the whole universe.

- [ ] **Step 3: Discover sources.**
  - Use `websearch_cited` if available.
  - Otherwise use DuckDuckGo Lite result pages and extract destination URLs, including decoding
    `uddg` redirects when needed.
  - Prioritize official docs, specs, maintainer pages, government sources, and high-quality
    analysis over aggregators.
  - If open-ended discovery is unavailable, start from user-provided URLs or obvious official entry
    points and say that the research is narrower.

  Behavioral guardrails:
  - avoid rapid-fire page loading meant to simulate bulk scraping
  - prefer reading pages clearly meant for public web access
  - respect obvious access boundaries, login walls, rate limits, robots cues, and site terms
  - if a site appears hostile to automated access, back off and use other available sources

- [ ] **Step 4: Extract evidence.** For each source, capture only what matters:
  - exact claim
  - source URL
  - source type (primary, secondary, promotional, anecdotal, analytical)
  - visible date/version
  - key evidence
  - reliability notes

  Maintain a simple source ledger as you work: source title or page, URL, source type, date or
  version, key claims, and reliability notes.

- [ ] **Step 5: Triangulate.** Look for disagreement, version drift, caveats, biases, missing
  evidence, failure modes, and strong alternatives. Revisit search lanes if the evidence base is
  thin or too one-sided.

- [ ] **Step 6: Form the answer.** When the user wants a recommendation:
  - state it plainly
  - tie it to the user's criteria
  - explain the strongest alternative and why it lost
  - state confidence and what could change the recommendation

---

## Output

For substantial research, structure the answer roughly as:

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

## Alternatives considered
- [Alternative]: [why it was plausible, why it lost]

## Risks and unknowns
- [Risk, uncertainty, or missing evidence]

## Source notes
- [Title] - [publisher/site], [date or version if available], [why it matters]
```

For lighter research, compress the format, but still include citations, trade-offs, and uncertainty.

---

## Examples

**Use this skill:**

- "Do a deep dive on E2B vs Modal vs Daytona for remote code execution backends and recommend one
  for an agent platform."
- "Research the latest browser automation options for Claude Code style workflows and tell me the
  best fit with risks."
- "Can you look into recent EU AI Act obligations that would matter for a SaaS vendor shipping to
  enterprise customers?"

**Do not use this skill:**

- "Summarize this one article I linked."
- "Open this URL and tell me what it says."

---

## Quality Bar

- Cite every important factual claim.
- Prefer 5+ meaningful sources for non-trivial research unless the topic is extremely narrow.
- Use at least 2 primary sources when they exist.
- Call out when evidence is thin, stale, or dominated by one interested party.
- Say "I could not verify" instead of guessing.
- If the topic is time-sensitive, note the research date.
- If discovery was constrained, say so explicitly.

## Recommendation Discipline

- Separate facts, interpretation, and recommendation clearly.
- Make trade-offs explicit instead of pretending one option is universally best.
- Optimize for the user's context, not generic defaults.
- If the user did not ask for a recommendation, return findings first and offer one only if useful.

## Final Checks

- The answer reflects the user's actual decision or question.
- The source mix is not overly dependent on one vendor or commentator.
- Key claims are cited.
- The recommendation, if any, is supported by the evidence shown.
- Limitations and unknowns are stated plainly.
