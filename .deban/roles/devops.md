---
role: devops
owner: minikai
status: active
last-updated: 2026-06-04
---

# DevOps & Delivery

## Scope
Owns local serving, the cache-busting toolkit install, and the (documented, unenforced)
server-side header recipes.

## Decisions
| Date | Decision | Rationale | Linked roles |
|---|---|---|---|
| 2026-06-04 | Serve V1 via `python3 -m http.server` from project root. | Zero-dep, present everywhere; satisfies "localhost to look at". | [[arch]] |
| 2026-06-04 | Install cache-busting with `--no-badge` NOT used — badge IS wanted (3 shapes). cairosvg absent → SVG-only shape cells (acceptable, no rasterization needed). | User explicitly asked for the 3-shape visual versioning. | [[arch]] |
| 2026-06-04 | `bust.sh` is the version-bump command; document wiring (post-commit / manual) but do not add a build step (brief: no build). | Versioning control via token bump without violating no-build constraint. | [[arch]] |
| 2026-06-04 | **Resolved** the badge/favicon sub-path 404 by making all same-origin cb refs RELATIVE (`cb-shapes/NN.svg`, `cb-badge.js`) and patching `bust.sh` (gate + sed) to be prefix-agnostic so bumps stay relative. Also widened `cb-badge.js`'s favicon selector + derive-regex to match relative hrefs. | Reverses the earlier "accepted limitation": relative paths work on the GitHub Pages project sub-path, at root, AND under file:// — strictly more portable, since index.html sits at the served root. Durable because `bust.sh` no longer re-absolutizes the favicon. | [[arch]] |

## Dead Ends
<!-- APPEND ONLY. Never delete. -->
| Date | What was tried | Why it failed / was rejected |
|---|---|---|
| 2026-06-04 | Toolkit installs assets under `public/` and references them root-absolute (`/cb-shapes`, `/cb-badge.js`). | `public/` is not the served root for a plain `http.server` from project root, so the badge/favicon 404'd. Resolved by MOVING assets to project root so `/cb-shapes` + `/cb-badge.js` resolve, keeping the absolute paths `bust.sh` expects. |
| 2026-06-04 | Considered making the favicon/badge paths RELATIVE so the badge also works under `file://`. | Rejected: `bust.sh` rewrites the favicon `href` to absolute `/cb-shapes/<NN>.svg` on every token bump (the shape encodes the version), so a relative href would be reverted on the next bump and break versioning. The badge is a served-origin tool; under `file://` the content + relative CSS/JS still render (the JS-off readable fallback — the real criterion-1 requirement — holds). Accepted limitation. |

## Lessons
- The cache-busting toolkit assumes a served web root and root-absolute asset paths;
  for a no-framework static drop, put `cb-shapes/` + `cb-badge.js` AT the served root
  rather than under `public/`, and let `bust.sh` keep owning the absolute favicon path.
  — from dead end on 2026-06-04

## Open Questions
- [ ] `python3 -m http.server` cannot set `Cache-Control`. If header enforcement is
  needed for V1, swap to a ~15-line header-setting server. Deferred. — owner: minikai — since: 2026-06-04

## Assumptions

## Dependencies
Blocked by: [[arch]]
Feeds into: [[qa]]

## Session Log
- 2026-06-04 — FIX. Relativized cb refs + patched bust.sh to be prefix-agnostic →
  badge/favicon now work on the Pages sub-path. Bumped token to 82519499. Redeployed.
- 2026-06-04 — DEPLOY. git init → pushed to github.com/kai-denrei/game-design-lessons
  (public). GitHub Pages live at https://kai-denrei.github.io/game-design-lessons/
  (main/root). Reader fully functional (7 panels, relative style.css/app.js → 200).
  As predicted, the version badge/favicon 404 on the Pages **project subpath** (same
  root-absolute-path limitation as file://). Reader unaffected.
- 2026-06-04 — SYNC. Installed cache-busting (token b7ea4f06). Moved assets to served
  root. Recorded the file:// badge limitation as accepted.
- 2026-06-04 — INIT. Chose python http.server; planned cache-busting install with badge.
