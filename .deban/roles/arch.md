---
role: arch
owner: minikai
status: active
last-updated: 2026-06-04
---

# Architecture

## Scope
Owns the file structure, the no-build/vanilla-ES-module constraint, the JS-off
degradation strategy, and how cache-busting + mise-en-page integrate without a backend.

## Decisions
| Date | Decision | Rationale | Linked roles |
|---|---|---|---|
| 2026-06-04 | 3 files: `index.html` (all content in semantic markup), `style.css` (OKLCH custom props), `app.js` (ES module: tab toggling + roving tabindex + hash routing only). | Matches brief's target tree; keeps JS budget minimal. | [[dev]] |
| 2026-06-04 | **Content in markup, never injected by JS.** JS only sets `hidden`/`aria-selected`/`tabindex` and manages focus. | Guarantees the JS-off fallback (every panel a readable stacked section) for free. | [[dev]] [[ux]] |
| 2026-06-04 | Primary target = localhost; `file://` is the degraded path. | ES modules CORS-blocked on `file://` in Chrome. See [[pm]] resolution. | [[devops]] |
| 2026-06-04 | Cache-busting = URL fingerprint (`?v=token`) + anti-cache meta + 3-shape favicon/badge. No service worker. | Brief forbids storage/PWA; header control needs a server. | [[devops]] |
| 2026-06-04 | mise-en-page **Pattern A (single column)**, 62–66ch measure, section-number weight moments per tab. | Essay/list content, <1500 words/panel; Tufte-margin (Pattern B) overkill for this annotation density. | [[ux]] |

## Dead Ends
<!-- APPEND ONLY. Never delete. -->
| Date | What was tried | Why it failed / was rejected |
|---|---|---|

## Lessons

## Open Questions
- [ ] If offline self-containment becomes a hard requirement, self-host the 3 font
  families under `fonts/` and drop the Google `<link>`. — owner: minikai — since: 2026-06-04

## Assumptions
- `python3 -m http.server` is an acceptable "localhost" for V1 — status: untested — since: 2026-06-04

## Dependencies
Blocked by:
Feeds into: [[dev]] [[devops]]

## Session Log
- 2026-06-04 — INIT. Fixed 3-file structure, content-in-markup rule, single-column
  mise-en-page pattern, cache-busting scope (no SW).
