# Lessons of the Game Makers

A single-page, multi-tab editorial reader collecting the canonical aphorism/lesson
lists of six pre-eminent game designers — Mark Rosewater, Sid Meier, Falstein &
Barwood (The 400 Project), Raph Koster, Soren Johnson, Jesse Schell — plus a synthesis
tab drawing the through-lines between them.

Text-first, dark editorial. Warm near-black / amber / teal palette authored in OKLCH.

## Run it

No build step, no dependencies. Serve the folder over any static server:

```bash
python3 -m http.server 8137
# → http://localhost:8137/
```

It also degrades gracefully: opened with JavaScript disabled, every panel renders as a
readable stacked scroll (all content lives in the markup; JS only toggles visibility and
manages focus).

## Stack

- Vanilla HTML + CSS + one ES module (`app.js`). No framework, no bundler.
- ARIA tab pattern: `role=tablist/tab/tabpanel`, roving `tabindex`, full keyboard
  navigation (arrows · Home/End · Enter/Space), deep-link hash routing (`#meier`, …).
- Typography follows *mise-en-page* discipline (fixed 66ch measure, tiered rhythm,
  per-section weight moments, drop-cap on the synthesis essay).
- Accessibility: Lighthouse **100**, no console errors.

## Versioning / cache-busting

`./scripts/bust.sh` bumps a content token across every same-origin asset URL
(`?v=<token>`), the `<meta name="cb">` tag, and a **shape favicon + corner badge** — so
a glance at the favicon confirms whether a fresh build actually loaded. The badge/favicon
use root-absolute paths and therefore need a root-served origin (localhost or a custom
domain); on a GitHub Pages project subpath they 404 while the reader itself works.

## Files

```
index.html   style.css   app.js        the reader
cb-shapes/   cb-badge.js                visual version badge
scripts/                                bust.sh + fingerprint runner
.deban/                                 project decision log (role-scoped)
```

Lesson sets are paraphrased, not reproduced.
