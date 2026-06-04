# Build brief — "Lessons of the Game Makers"

A single-page, multi-tab reader exploring the canonical aphorism/lesson lists from
pre-eminent game designers. Editorial, text-first, dark. One tab per source list,
plus a synthesis tab.

This is a handover document for a Claude CLI agent. Build the whole thing from this
brief — no further research required; the source material is embedded below.

---

## 1. Deliverable

- One self-contained `index.html` plus `style.css` and `app.js` (vanilla ES modules).
- No build step. No framework. No bundler. No npm install. Open `index.html` and it works.
- Fonts via Google Fonts `<link>` (or self-host if offline; see Design).
- Total JS budget: small. Tabs + keyboard nav + (optional) deep-link hash routing. Nothing else.

Target file tree:

```
/
  index.html
  style.css
  app.js
  (optional) fonts/   ← only if self-hosting
```

---

## 2. Tech constraints

- Vanilla JS, ES modules (`<script type="module" src="app.js">`). No transpilation.
- Semantic HTML. Content lives in the markup, not injected by JS — JS only toggles
  visibility and manages focus. The page must be fully readable with JS disabled
  (degrade to a long scroll with all panels visible).
- No external runtime deps beyond fonts. No CDN libraries.
- Colour authored in **OKLCH** in the stylesheet (custom properties). Provide sRGB
  fallbacks only if a target browser needs them; assume modern evergreen browsers.
- Mobile-first, fluid down to 360px. No horizontal scroll.

---

## 3. Design system

Reuse the house style — do not invent a new palette.

- **Background:** near-black with a warm undertone (e.g. `oklch(0.16 0.012 70)`),
  not pure `#000`. Slight warmth, ink-on-vellum register.
- **Foreground:** warm off-white for body (`~oklch(0.92 0.015 80)`), dimmer for
  secondary text.
- **Accents:** amber (primary, `~oklch(0.80 0.13 70)`) and teal
  (secondary, `~oklch(0.78 0.10 200)`). Amber = active/emphasis; teal = links,
  source attributions, secondary markers. Use sparingly — accents punctuate, they
  don't fill.
- **Type:**
  - Display / headings: **Cormorant Garamond** (or EB Garamond) — high-contrast serif.
  - Body: **EB Garamond**.
  - Labels / tab strip / source citations / any monospace: **JetBrains Mono** or
    **IBM Plex Mono**.
- **Voice:** dark editorial. Confident, terse. No marketing copy, no emoji.

### Readability (this matters — it's the point of the lineage)

- Body measure: **60–75 characters per line** (~`66ch` max, `max-width` on the prose
  column). Never let prose run full-width on desktop.
- Line height ~1.55 for body. Generous paragraph spacing.
- Font size: body ~1.125–1.25rem fluid (`clamp()`), comfortable for sustained reading.
- One column of prose, centred, with the tab strip above it.

---

## 4. Layout & interaction

- Masthead: title ("Lessons of the Game Makers" or similar), one-line standfirst.
- **Tab strip** below the masthead: one tab per source list. Horizontal on desktop;
  on narrow screens, allow horizontal scroll of the strip OR wrap — your call, but
  keep all tabs reachable without a menu.
- **Tab panels:** only the active one visible (JS on). Content is the editorial prose
  + the lesson list for that designer.
- **Accessibility (required):**
  - ARIA tab pattern: `role="tablist"` / `role="tab"` / `role="tabpanel"`,
    `aria-selected`, `aria-controls`, `tabindex` roving.
  - Keyboard: Left/Right (or Up/Down) to move between tabs, Home/End to jump,
    Enter/Space to activate, focus moves into panel logically.
  - Visible focus ring (amber outline).
- **Deep linking (nice-to-have):** reflect active tab in `location.hash`
  (`#meier`, `#koster`, …) and restore on load. Don't break the back button.
- Respect `prefers-reduced-motion`: no tab-switch animation if set; otherwise a
  short, restrained crossfade is fine.

---

## 5. Tabs & content

Seven tabs. Each panel = a short editorial intro paragraph (1–3 sentences, dark
editorial voice) followed by the lesson set. Render lesson sets as a clean numbered
or definition list, each item being a terse imperative/heading with an optional
one-line gloss. Attribute the source in mono type (teal) at the foot of each panel.

### Tab 1 — Rosewater · "Twenty Lessons"
*Mark Rosewater, head designer, Magic: The Gathering. GDC 2016.*

The twenty, as terse imperatives:

1. Fighting human nature is a losing battle — change the game to fit people, not vice versa.
2. Aesthetics matter — players expect balance, symmetry, pattern completion.
3. Resonance — borrow the audience's preloaded emotional associations.
4. Piggyback — front-load mechanics onto knowledge players already have.
5. Don't confuse *interesting* with *fun* — intellect makes it interesting, emotion makes it fun.
6. Know the emotion you're evoking — every component serves it or gets cut.
7. Let players make the game personal — choice creates connection.
8. The details are where players fall in love.
9. Give players a sense of ownership through customization.
10. Leave room to explore — let them discover, don't show everything.
11. If everyone likes it but no one loves it, it fails — chase passion, not approval.
12. Don't design to prove you can — ego is not a design goal.
13. Make the fun path also the winning path — players optimise toward victory.
14. Sometimes you must force a behaviour so players learn it's good.
15. Design each component for its intended audience — pleasing everyone pleases no one.
16. Fear boring players more than challenging them — they forgive ambition, resent tedium.
17. You don't have to change much to change everything — tweak a foundation, not the surface.
18. Restrictions breed creativity.
19. Players are good at spotting problems, bad at solving them — trust the diagnosis, not the cure.
20. All the lessons connect — design is holistic.

### Tab 2 — Meier · "Interesting Decisions"
*Sid Meier, Civilization. Aphorism GDC 1989; expanded GDC 2012.*

- Core: a game is a series of interesting decisions.
- Diagnostic (defined negatively): a decision is *not* interesting if everyone always
  picks the same option, or if the pick is effectively random.
- What makes a decision interesting: meaningful, visible consequences; genuine trade-offs;
  long-term vs. short-term tension; choices that express a playstyle.
- Be the player's partner — feedback must let them see that their choices mattered.
- Testers are almost always right about *what* feels wrong and almost always wrong
  about *how* to fix it.

### Tab 3 — The 400 Project · Falstein & Barwood
*Noah Falstein & Hal Barwood. GDC 2001 onward; reached ~112 of a planned 400 "rules."*

A catalogue of practical rules of thumb (selection):

- Fight player fatigue.
- Maximize expressive potential.
- Maintain a consistent level of abstraction.
- Concretize ideas.
- Provide clear short-term goals.
- Identify constraints.
- Begin at the middle.
- Make the game fun for the player — not the designer or the computer.
- Make the effects of the AI visible to the player.
- Create the AI in the player's mind through suggestion.
- Don't take away hard-won possessions from the player.

Framing note for the panel: they later cautioned these are guidelines, not laws —
rules worth knowing partly so you know when to break them.

### Tab 4 — Koster · "A Theory of Fun"
*Raph Koster. Austin GDC keynote 2003; book 2005.*

- Fun is the act of mastering a problem mentally — the brain's pleasure in learning a pattern.
- Corollary: the destiny of a game is to become boring once its pattern is learned;
  fun is the process, routine its destination.
- Good games teach; a game stops being fun when there's nothing left to learn.
- Dressing (theme, art, story) is not the mechanic — separate the two when you design.
- Companion thesis (*A Grammar of Gameplay*): mechanics combine like an atomic
  grammar; learn to read it and you can critique as well as build.

### Tab 5 — Johnson · "Designer Notes" laws
*Soren Johnson, lead designer Civilization IV. Column "Water Finds a Crack," 2011.*

- Given the opportunity, players will optimise the fun out of a game.
- Corollary (with Meier): a designer's job is partly to protect players from themselves.
- Players approach a game as an optimisation puzzle — most reward, least risk, lowest
  variance — and water finds a crack.
- Complexity discipline: if you add something new, take something old out.

### Tab 6 — Schell · "The Deck of Lenses"
*Jesse Schell, The Art of Game Design: A Book of Lenses (2008; 3rd ed. deck, 116 cards).*

Not declarative rules but ~116 "lenses" — sets of questions you ask of your own
design, spanning story, mechanics, technology, aesthetics, psychology, creativity,
teamwork, playtesting, and business. The method: view the design from as many
perspectives as possible. Represent a handful of representative lenses as
question-prompts, e.g.:

- The Lens of Essential Experience — what experience do I want, and is the game delivering it?
- The Lens of Surprise — what will surprise the player?
- The Lens of Fun — what parts are fun? what should be more fun?
- The Lens of the Player — what do they expect, want, and not realise they want?
- The Lens of Flow — is the challenge tracking the player's growing skill?

(Treat these as illustrative; note in the panel that the full deck is the artifact.)

### Tab 7 — Synthesis
A short editorial essay tab (no list). Draw the through-lines across all six:

- They converge on **fun = emotion + learning**, not intellectual interest alone
  (Rosewater 5, Koster).
- They share an account of **the optimising player**: players chase victory and will
  flatten fun to get it, so the designer must align the fun path with the winning path
  and protect players from themselves (Rosewater 13, Meier, Johnson).
- They agree the **designer's ego is the enemy** and the audience is the client
  (Rosewater 12, 400 Project "fun for the player not the designer").
- They split on **method**: Meier/Koster offer one deep principle; Falstein/Barwood and
  Rosewater offer enumerated catalogues; Schell offers an interrogative deck. Same craft,
  three epistemologies — single law, rule catalogue, question set.
- Close on Rosewater 20: the lessons are one interconnected view, not twenty separate ones.

---

## 6. Out of scope

- No backend, no analytics, no cookies, no localStorage.
- No images required (type-only is on-brand). If you add ornament, keep it CSS/SVG and subtle.
- Don't reproduce long verbatim passages from any source book — the lesson sets above
  are paraphrased on purpose; keep it that way.

## 7. Acceptance criteria

- Opens from `file://` with no server and works.
- All seven tabs reachable by mouse and keyboard; ARIA tab pattern correct.
- JS-off fallback renders every panel as readable stacked sections.
- Body prose never exceeds ~75 characters per line on any viewport.
- Palette is the warm near-black / amber / teal house style, authored in OKLCH.
- Lighthouse a11y ≥ 95; no console errors.
