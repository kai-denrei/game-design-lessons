---
role: dev
owner: minikai
status: active
last-updated: 2026-06-04
---

# Development

## Scope
Owns the implementation of `index.html`, `style.css`, `app.js` and the integration
of the cache-busting toolkit into the source.

## Decisions
| Date | Decision | Rationale | Linked roles |
|---|---|---|---|
| 2026-06-04 | Tabs as ARIA tablist with roving `tabindex`; panels are `<section role="tabpanel">` toggled via `hidden`. | Brief-required ARIA pattern; `hidden` is the JS-off-safe toggle. | [[arch]] [[ux]] |
| 2026-06-04 | Hash routing (`#rosewater`, `#meier`, …) reflected on activate and restored on load, without breaking Back. | Brief nice-to-have; cheap with `history.replaceState` semantics + `hashchange`. | [[ux]] |

## Dead Ends
<!-- APPEND ONLY. Never delete. -->
| Date | What was tried | Why it failed / was rejected |
|---|---|---|

## Lessons

## Open Questions

## Assumptions

## Dependencies
Blocked by: [[arch]]
Feeds into: [[qa]]

## Session Log
- 2026-06-04 — INIT. Locked ARIA tab approach + hash routing approach.
