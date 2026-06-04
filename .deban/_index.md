---
project: Lessons of the Game Makers
created: 2026-06-04
status: active
mode: solo
stale_threshold_days: 30
---

# Lessons of the Game Makers — Index

## Brief
A single-page, multi-tab editorial reader collecting the canonical aphorism/lesson
lists from pre-eminent game designers (Rosewater, Meier, Falstein/Barwood, Koster,
Johnson, Schell) plus a synthesis tab. Text-first, dark, warm near-black / amber /
teal house palette authored in OKLCH. Vanilla ES modules, no build step, no
framework. Content lives in semantic markup (readable with JS off); JS only toggles
panel visibility and manages focus (ARIA tab pattern). Layered cache-busting
(URL fingerprinting + anti-cache meta + 3-shape visual version badge) drives
versioning. mise-en-page typographic discipline drives the reading layout.

## Active Roles
- [[arch]] — owner: minikai
- [[dev]] — owner: minikai
- [[ux]] — owner: minikai
- [[qa]] — owner: minikai
- [[pm]] — owner: minikai
- [[devops]] — owner: minikai

## Key Decisions
<!-- Cross-role summary, maintained by COMPACT -->
- Deliver on **localhost** (`python3 -m http.server`) as primary target; `file://`
  degrades to the JS-off stacked reading view. ES modules + `file://` are CORS-blocked
  in Chrome, so a served origin is required for the interactive experience. [[arch]]
- Cache-busting scope here = URL fingerprinting + anti-cache meta + **3-shape visual
  version badge**. HTTP `Cache-Control` headers (the skill's "real control surface")
  are out of reach without a server config and are documented, not enforced. [[devops]]
- No service worker / PWA — brief forbids storage; cache-busting stays to
  fingerprint + badge. [[arch]] [[devops]]

## Open Questions (cross-role)
- See [[pm]] ## Open Questions for the brief challenge (file:// vs modules, Lighthouse
  without a server, fonts offline).
