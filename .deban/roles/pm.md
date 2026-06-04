---
role: pm
owner: minikai
status: active
last-updated: 2026-06-04
---

# Project Management

## Scope
Owns scope, the V1 goal definition, and the brief challenge. Tracks the build to a
working V1 on localhost that satisfies the brief's 7 acceptance criteria.

## Decisions
| Date | Decision | Rationale | Linked roles |
|---|---|---|---|
| 2026-06-04 | V1 goal = all 7 acceptance criteria pass on localhost; `file://` need only satisfy the JS-off fallback criterion. | Resolves the file://-vs-modules tension without dropping either requirement. | [[arch]] [[qa]] |
| 2026-06-04 | Build directly (lead/dev), then dispatch an independent sub-agent as PM/QA to verify against acceptance criteria on localhost and file a punch list. | A 3-file, tightly-specced page builds at higher fidelity in-context than round-tripped through a builder agent; the sub-agent adds value as an independent verifier, which is the honest reading of "PM on my behalf until the goal is finished." | [[qa]] [[dev]] |

## Dead Ends
<!-- APPEND ONLY. Never delete. -->
| Date | What was tried | Why it failed / was rejected |
|---|---|---|

## Lessons
<!-- Distilled principles from Dead Ends. Written to be read cold. -->

## Open Questions
<!-- Brief challenge: untested assumptions / logical gaps in the brief -->
- [x] **file:// vs ES modules conflict.** Brief mandates `<script type="module">` AND
  "opens from file:// and works." Chrome blocks module scripts over `file://` (CORS),
  so the interactive page cannot fully work from `file://`. — RESOLVED: localhost is
  the primary target (user asked for it); `file://` degrades to the JS-off stacked
  view, which is itself an acceptance criterion. — owner: minikai — since: 2026-06-04
- [x] **Lighthouse a11y ≥95 / "no console errors" presupposes a served page.** You
  cannot meaningfully Lighthouse a `file://` page, and modules erroring on `file://`
  would themselves be console errors. — RESOLVED: measured on localhost. — owner:
  minikai — since: 2026-06-04
- [ ] **Cache-busting's real control surface (HTTP `Cache-Control` headers) is
  unreachable for a no-backend static drop.** On `python3 -m http.server` we cannot set
  `no-cache` on HTML or `immutable` on assets. So cache-busting here is fingerprint +
  meta + visual badge only; the header recipes are documented but unenforced. Is that
  acceptable for V1, or does V1 need a tiny header-setting dev server? — owner: minikai
  — since: 2026-06-04
- [ ] **Google Fonts `<link>` adds a runtime network dependency** that breaks the
  "self-contained, opens and works" promise when offline. Mitigated by a full system
  serif/mono fallback stack, but the high-contrast Garamond look degrades offline.
  Self-host fonts for true self-containment? — owner: minikai — since: 2026-06-04
- [ ] **Schell "Deck of Lenses" and 400 Project are selections, not full lists.** Brief
  says treat as illustrative — confirm no expectation of the full 116 lenses / 400
  rules in V1. — owner: minikai — since: 2026-06-04

## Assumptions
- Modern evergreen browser (Chrome/Firefox/Safari current) — status: untested — since: 2026-06-04
- kainode is online for Google Fonts at build/view time — status: untested — since: 2026-06-04

## Dependencies
Blocked by:
Feeds into: [[dev]] [[qa]]

## Session Log
- 2026-06-04 — SYNC. **V1 GOAL MET.** All 7 acceptance criteria PASS on localhost
  (a11y 100, 0 console errors) — see [[qa]]. Build done directly; sub-agent acted as
  independent PM/QA verifier and surfaced 1 real WCAG defect, now fixed. Open: header
  control surface + font network dep deferred (not V1 blockers).
- 2026-06-04 — INIT. Read brief + Rosewater source. Challenged brief: 5 assumptions
  surfaced (file://-vs-modules, Lighthouse-needs-server, header control surface, font
  network dep, partial lists). Defined V1 goal and build/verify split.
