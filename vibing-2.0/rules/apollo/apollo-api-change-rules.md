# Change Safety

- Current policy (single consumer, monorepo): Breaking changes are allowed. Update the UI in the same PR to keep schema and client in sync.
- Make changes atomic: one PR must include schema/resolvers/tests and UI updates; no partial rollouts.
- Remove/rename fields and adjust nullability/semantics as needed to keep the model clean.
- Coordinate cache policy and pagination updates with the change.
- Use temporary fallbacks (feature flags, aliases) only if rollout risk warrants it.
- When external consumers exist, revert to additive changes with deprecations before removal.

# Schema Discipline

- Keep field names stable. Add aliases via new fields if naming must change.
- Ensure entity `keyFields` remain stable for clients.
- Add pagination fields with clear, consistent arguments.

# Resolver Behavior

- Do not broaden error shapes. Use stable `extensions.code` values.
- Maintain idempotency for queries and side-effect discipline for mutations.
- Keep resolvers thin; delegate to versioned domain services.

# Caching & Perf

- Add cache hints only when safe; never cache personalized data without Vary keys.
- Validate changes against response cache and client `typePolicies`.
- Consider APQ/safelisting impacts when adding new operations.

# Security

- Re-check auth for new fields, mutations, and filters.
- Apply depth/complexity guardrails to new entry points.
- Avoid leaking existence via error messages.

# Client Impact

- Provide `possibleTypes` updates if unions/interfaces change.
- Define or update pagination policies for new list fields.
- Publish operation manifests when using persisted queries.
- Align client/server configuration and manifests in the same PR.
