---
role: ux
owner: minikai
status: active
last-updated: 2026-06-04
---

# UX & Reading Experience

## Scope
Owns typography, the warm near-black/amber/teal palette, readability (measure, rhythm,
weight moments), keyboard interaction, focus, and reduced-motion behavior.

## Decisions
| Date | Decision | Rationale | Linked roles |
|---|---|---|---|
| 2026-06-04 | Palette in OKLCH custom props: bg `oklch(0.16 0.012 70)`, body `oklch(0.92 0.015 80)`, amber `oklch(0.80 0.13 70)` (active/emphasis + focus ring), teal `oklch(0.78 0.10 200)` (links/attributions). | House style from brief §3; accents punctuate, never fill. | [[arch]] |
| 2026-06-04 | Type: Cormorant Garamond (display), EB Garamond (body), JetBrains Mono (labels/citations). Body `clamp()` ~1.125–1.25rem, line-height 1.55, measure 62–66ch. | Brief §3 + mise-en-page measure/rhythm. | — |
| 2026-06-04 | Weight moment per tab: large muted section ornament/number + drop-cap lead, per mise-en-page section-opener grammar. | Gives the flat list content a typeset-book entry rhythm. | — |
| 2026-06-04 | Amber focus ring, visible; crossfade on tab switch only when `prefers-reduced-motion: no-preference`. | Brief §4 accessibility + motion. | [[qa]] |

## Dead Ends
<!-- APPEND ONLY. Never delete. -->
| Date | What was tried | Why it failed / was rejected |
|---|---|---|
| 2026-06-04 | Used `--ink-faint` (L 0.52) as the colophon footer **text** color. | Measured 3.54:1 on `--bg` — failed WCAG AA (needs 4.5:1 for small text); caught by Lighthouse (score 97, color-contrast audit fail). The faint token is fine for the large aria-hidden section numerals (large-text 3:1) and for non-text hairlines, but not for real small text. Fixed with a dedicated `--ink-quiet` (L 0.60 → 4.91:1, computed + Lighthouse-confirmed); a11y rose to 100. |

## Lessons
- A "faint" color token earns its lightness from its USE: hairlines (non-text) and
  large decorative numerals (3:1) can sit at L≈0.52, but any small body text needs its
  own token at ≥L 0.60 to clear WCAG AA 4.5:1 on the warm near-black bg. Don't reuse the
  hairline token for text. — from dead end on 2026-06-04
- Verify contrast by COMPUTING it (OKLCH→sRGB→WCAG) before trusting the eye; the model
  matched Lighthouse to two decimals. — from dead end on 2026-06-04

## Open Questions

## Assumptions

## Dependencies
Blocked by:
Feeds into: [[dev]] [[qa]]

## Session Log
- 2026-06-04 — SYNC. Built the layout; added `--ink-quiet` after a colophon contrast
  dead-end. Lighthouse a11y 100.
- 2026-06-04 — INIT. Fixed palette tokens, type stack, mise-en-page weight moments,
  focus + reduced-motion rules.
