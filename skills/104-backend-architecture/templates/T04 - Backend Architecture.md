<!--
Keep this a skimmable backend reference. Use only applicable bullets and rows; adapt sections to
the project's actual structure. No default stack, authentication scheme, or mandatory layers.
Reference D01-D03 rather than repeating them; distinguish existing decisions from proposals.
Keep Security explicit, including when access is public. Omit Operations and Open Questions when they don't apply.
Remove this block, examples, placeholders, and empty optional sections before writing the generated document.
-->

# D04 — Backend Architecture

## 1. Backend Structure

**Approach**: [Backend shape and the key reasons or governing decisions behind it; reference D02.]

| Owner / Location | Responsibility | Boundary / Dependencies |
|------------------|----------------|-------------------------|
| [Existing or confirmed module, handler, or service] | [What it owns] | [What it delegates to or must not own] |

## 2. API & Boundary Conventions

- **Interfaces**: [Entry points and shared conventions for naming, payloads, and contracts.]
- **Validation & errors**: [Where input is checked, how failures propagate, and the consumer-facing error contract.]
- **Other boundary policies**: [Applicable versioning, pagination, limits, or integration conventions; omit if unnecessary.]

## 3. Data Access & Rule Enforcement

- **Access pattern**: [Where reads and writes belong and how they use the data model in D03.]
- **Transactions & consistency**: [Ownership of atomic changes and relevant concurrency or cross-store safeguards; omit if unnecessary.]
- **Rule enforcement**: [Where important D03 rules are enforced, including rules needing application logic rather than database constraints.]
- **Resource handling**: [Relevant connection lifecycle or caching ownership and invalidation; omit if unnecessary.]

## 4. Security

- **Trust & access**: [Public and protected boundaries, identity handling where needed, and where permissions or ownership are enforced.]
- **Input protection**: [Relevant safeguards for untrusted input and external calls.]
- **Secrets & sensitive data**: [Storage, exposure, and logging protections for the data the backend handles.]
- **Compliance safeguards**: [Confirmed requirements and their concrete backend implications; omit if none apply.]

## 5. Operations

- **Diagnostics**: [Relevant logging, redaction, error reporting, and failure visibility.]
- **Recovery & background work**: [Relevant retry, idempotency, job lifecycle, and integration failure policies; omit if unnecessary.]

## 6. Open Questions

- [ ] [Unresolved decision or assumption, its impact, and what would resolve it.]
