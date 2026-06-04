// =========================================================================
// Lessons of the Game Makers — app.js
// Minimal ES module: ARIA tab pattern with roving tabindex, keyboard
// navigation, and deep-link hash routing. JS only toggles visibility and
// manages focus — all content lives in the markup, so the page is fully
// readable with this file absent.
// =========================================================================

const tablist = document.querySelector('[role="tablist"]');
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

const panelFor = (tab) => document.getElementById(tab.getAttribute('aria-controls'));
const slugOf = (tab) => tab.id.replace(/^tab-/, '');
const tabForSlug = (slug) => tabs.find((t) => slugOf(t) === slug) || null;

// Move the single tab stop (roving tabindex) and focus, without activating.
function focusTab(tab) {
  tabs.forEach((t) => { t.tabIndex = t === tab ? 0 : -1; });
  tab.focus();
}

// Activate a tab: reveal its panel, update ARIA, sync the URL hash.
function activate(tab, { focusPanel = false } = {}) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    const panel = panelFor(t);
    panel.classList.toggle('is-active', selected);
    panel.hidden = !selected;
  });
  syncHash(tab);
  if (focusPanel) panelFor(tab).focus();
}

// Reflect the active tab in location.hash. pushState (not hash assignment)
// keeps the back button working and avoids scrolling — the slug intentionally
// does not match any element id.
function syncHash(tab) {
  const slug = slugOf(tab);
  if (location.hash.slice(1) !== slug) {
    history.pushState(null, '', `#${slug}`);
  }
}

// ---- Keyboard: arrows move focus (manual activation), Enter/Space activate.
tablist.addEventListener('keydown', (e) => {
  const current = document.activeElement;
  const i = tabs.indexOf(current);
  if (i === -1) return;

  let next = null;
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown': next = tabs[(i + 1) % tabs.length]; break;
    case 'ArrowLeft':
    case 'ArrowUp':   next = tabs[(i - 1 + tabs.length) % tabs.length]; break;
    case 'Home':      next = tabs[0]; break;
    case 'End':       next = tabs[tabs.length - 1]; break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      activate(current, { focusPanel: true });
      return;
    default: return;
  }
  e.preventDefault();
  focusTab(next);
});

// ---- Pointer: clicking a tab activates it.
tabs.forEach((tab) => {
  tab.addEventListener('click', () => activate(tab));
});

// ---- Back/forward and manual hash edits sync the UI (no new history entry).
window.addEventListener('popstate', () => {
  const tab = tabForSlug(location.hash.slice(1));
  if (tab) activate(tab);
});

// ---- Initial state: restore from hash if valid, else the markup default.
const initial = tabForSlug(location.hash.slice(1))
  || tabs.find((t) => t.getAttribute('aria-selected') === 'true')
  || tabs[0];
activate(initial);
