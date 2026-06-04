---
role: qa
owner: minikai
status: active
last-updated: 2026-06-04
---

# Quality Assurance

## Scope
Owns verification against the brief's 7 acceptance criteria and the independent
PM/QA sub-agent verification pass.

## Acceptance criteria (brief §7) — V1 gate
1. Opens from `file://` (degraded JS-off view) AND works on localhost.
2. All seven tabs reachable by mouse and keyboard; ARIA tab pattern correct.
3. JS-off fallback renders every panel as readable stacked sections.
4. Body prose never exceeds ~75 characters per line on any viewport.
5. Palette is warm near-black / amber / teal, authored in OKLCH.
6. Lighthouse a11y ≥ 95 (localhost); no console errors.
7. (added) 3-shape cache-busting version badge renders and changes on bump.

## Decisions
| Date | Decision | Rationale | Linked roles |
|---|---|---|---|
| 2026-06-04 | Verification split: static checks (markup/ARIA/measure/OKLCH/no-injected-content) by sub-agent; a11y score + console-errors confirmed on localhost. | Full Lighthouse needs a headless browser; static + served-curl covers most criteria deterministically. | [[pm]] [[devops]] |

## Dead Ends
<!-- APPEND ONLY. Never delete. -->
| Date | What was tried | Why it failed / was rejected |
|---|---|---|

## Lessons

## Open Questions

## Assumptions

## Dependencies
Blocked by: [[dev]]
Feeds into: [[pm]]

## V1 verification result — 2026-06-04 (sub-agent + self, on localhost:8137)
| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | file:// readable fallback + localhost works | PASS* | CSS relative, content in markup, no `hidden` attrs → readable under file://; localhost interactive (puppeteer, 0 errors). *Badge/favicon are served-origin only — see [[devops]]. |
| 2 | 7 tabs mouse+keyboard, ARIA pattern | PASS | role=tablist/tab/tabpanel, aria-selected/controls/labelledby, roving tabindex; arrows+Home/End+Enter/Space (manual activation). |
| 3 | JS-off stacked readable | PASS | No `hidden` in markup; collapse gated by `.js` class added only by inline JS. |
| 4 | measure ≤ ~75ch | PASS | `--measure: 66ch` max-width on prose column + inline padding. |
| 5 | OKLCH warm-black/amber/teal | PASS | Palette authored entirely in OKLCH custom props. |
| 6 | a11y ≥95, no console errors | PASS | Lighthouse **a11y 100** (after contrast fix); puppeteer 0 console errors/pageerrors. |
| 7 | 3-shape cache-bust badge | PASS | favicon SVG shape 55, corner badge tiles 55/42/15 ← token b7ea4f06; `<meta name=cb>` + every `?v=` consistent. |

## Session Log
- 2026-06-04 — SYNC. Ran adversarial verification (sub-agent + Lighthouse). 1 defect
  found + fixed (colophon contrast). All 7 criteria PASS. a11y 97→100.
- 2026-06-04 — INIT. Pinned the 7 acceptance criteria as the V1 gate.
