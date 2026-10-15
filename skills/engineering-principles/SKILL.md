---
name: engineering-principles
description: >
  SpecFlow's shared engineering principles for any design, implementation, test, or cleanup work.
  The primary principle is reuse over creation: the least code that correctly delivers the behavior
  wins, so prefer no change, reuse, and extension of existing code over new code and new
  dependencies. Referenced by name from 203, 204, 301, 302, 401, 402, and the `@coder` agent; load
  it before planning, writing, or reviewing code.
---

# Engineering Principles

These principles govern how much code a change adds and where it goes. Project rules, architecture
docs (D01-D08), and stack-specific standards skills govern how that code is written. When the two
conflict, follow the project rule and flag the conflict.

---

## Primary Principle: Reuse Over Creation

The best code is code you did not have to write. Every new line, file, abstraction, and dependency
must be read, tested, and maintained forever, so new code is the last resort, not the default.

### The Reuse Ladder

Work down this list and stop at the first rung that correctly delivers the behavior:

1. **No change** — the behavior already exists, or the need can be met without code
2. **Configure** — a setting, flag, route, or data change
3. **Delete** — removing code solves or simplifies the problem
4. **Reuse as-is** — call an existing module, helper, component, hook, service, or fixture
5. **Extend** — add a case, parameter, or variant to the existing thing that owns the behavior
6. **Compose** — combine existing pieces in a new way
7. **Platform** — use the language, framework, or standard library
8. **Installed dependency** — use a library the project already depends on
9. **New code** — written in the module that naturally owns the responsibility
10. **New dependency** — only with explicit approval

### Rules

1. **Search before writing.** Before creating a file, function, component, type, or test helper,
   look for an existing one that does the job or nearly does. Name the paths you checked.
2. **Justify everything new.** Every new file, exported function, component, type, and dependency
   names the existing candidate it could not use and why.
3. **Generalize the original; do not fork it.** No copy-and-tweak, no `V2` twins, no near-duplicate
   component behind a flag. If the original needs a new case, change the original.
4. **Extend for today's need only.** Add a parameter, seam, or extension point when a current
   scenario needs it. Extract a shared abstraction on the second real use, not a predicted one.
5. **New dependencies need approval.** A new third-party package must be named in the
   implementation plan or escalated to the orchestrator or user before it is added.
6. **Consolidate duplication you touch.** When a change creates or exposes duplication, fold it into
   the existing owner rather than leaving two versions behind.
7. **Deleted code is progress.** Removing dead code, redundant branches, and unused exports counts as
   delivered work.

---

## Supporting Principles

Apply these in service of the primary principle. When they pull in different directions,
correctness and security win first, then reuse over creation.

- **KISS** — choose the simplest design that meets the requirement.
- **YAGNI** — do not build for requirements that do not exist yet.
- **DRY, for knowledge** — one source of truth per rule or fact; similar-looking code is not always
  duplicated knowledge, and duplication is cheaper than the wrong abstraction.
- **Single Responsibility** — each module, function, and component has one reason to change.
- **Separation of concerns** — keep UI, domain logic, data access, and infrastructure apart.
- **Open/Closed** — extend behavior through existing seams instead of rewriting working code.
- **Composition over inheritance** — build behavior from small parts, not deep hierarchies.
- **High cohesion, loose coupling** — keep related code together and dependencies between modules
  few and explicit.
- **Consistency over preference** — follow the codebase's existing conventions, even where you
  would choose differently.
- **Principle of least astonishment** — names, APIs, and behavior do what a reader expects.
- **Explicit over implicit** — no hidden side effects, magic values, or action at a distance.
- **Make illegal states unrepresentable** — let types and data shapes prevent invalid states.
- **Validate at the boundaries; fail fast** — check input where it enters, and surface errors early
  and clearly.
- **Secure by default; least privilege** — the safe path is the default, and access is the minimum
  needed.
- **Readability over cleverness** — code is read far more often than it is written.
- **Make it work, make it right, make it fast** — no performance work without a measured need.
- **Test behavior, not implementation** — tests describe outcomes and survive refactors.
- **Small, reversible changes** — prefer increments that are easy to review and easy to undo.
- **Leave it better, within scope** — improve what you touch, but do not widen the change to do it.
