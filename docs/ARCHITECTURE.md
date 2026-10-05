# Portfolio architecture

The site is intentionally build-free and data-driven. GitHub Pages serves ES modules directly.

## Stable layers

### 1. Content — `data/content.js`

This should be the main file edited over time.

It contains:

- profile copy
- homepage exploration cards
- selected projects
- publications / preprints
- open-source contributions
- interests
- experience
- section order and section capabilities

Adding normal content should **not** require editing layout or interaction code.

### 2. Rendering — `js/render.js`

Turns content data into semantic page sections.

Every scrollable content entry uses:

- `data-toc-item`
- `data-toc-label`

The local floating table of contents discovers these automatically.

### 3. Horizontal navigation + local content TOC — `js/navigation.js`

Two axes have different meanings:

- **horizontal** = switch major sections
- **vertical** = read more content inside the active section

Only sections configured with `localToc: true` get a floating internal table of contents.

The local TOC:
- reads content items automatically
- highlights the nearest item
- shows vertical scroll progress
- uses the section accent colour
- never appears on Home / Interests unless explicitly enabled later

### 4. Homepage exploration carousel — `js/home-rotator.js`

Reads `exploreCards` from content data.

Default behavior:
- changes every 3 seconds
- pauses on hover, focus, or touch
- pauses when Home is not the active horizontal section
- supports manual card selection
- respects `prefers-reduced-motion`

### 5. Preferences — `js/theme.js`

Owns:
- light / dark theme
- Chinese / English preference
- browser local storage

### 6. Design system — `styles/`

- `tokens.css` — colors, surfaces, shadows, spacing-level variables
- `base.css` — typography, page texture, global primitives
- `components.css` — cards, controls, local TOC, carousel card, buttons
- `layout.css` — full-screen horizontal sections and responsive layout

## Section configuration

The `sections` array in `data/content.js` defines each major horizontal page:

```js
{
  id: "work",
  type: "work",
  icon: "folder",
  fixed: false,
  localToc: true,
  label: { zh: "作品", en: "Work" }
}
```

- `fixed: true` means the section is designed as one viewport.
- `fixed: false` allows vertical reading when content grows.
- `localToc: true` enables the section's own floating contents/progress UI.

## Adding a project

Add one object to `projects`. The Work page and its local TOC update automatically.

## Adding a publication

Add one object to `publications`:

```js
{
  id: "paper-short-id",
  year: "2027",
  type: "Preprint",
  title: "Your paper title",
  authors: "Author A, windyduan, Author B",
  venue: "arXiv / Journal / Conference",
  summary: {
    zh: "两句话讲清楚做了什么。",
    en: "Two plain-language sentences."
  },
  links: {
    paper: "",
    code: "",
    project: "",
    poster: ""
  }
}
```

The Papers page automatically replaces the blank-paper placeholder.

## Adding experience / CV / email

- Add experience items to `experience`.
- Set `meta.cvUrl` when a public CV exists.
- Set `meta.email` only when the address is intentionally public.

Empty fields stay hidden.

## Adding a new major section

This is the only change that should normally touch rendering code:

1. add an entry to `sections`
2. add one renderer in `js/render.js`
3. add the section tone in `styles/layout.css`
4. decide whether it is fixed or vertically scrollable
5. decide whether it needs a local TOC

The navigation system reads section order automatically.
