# windyduan.github.io

Personal homepage for selected work, public research, open-source contributions, interests, and things worth trying.

Live: https://windyduan.github.io/

## Editing content

Most future edits belong in:

```text
data/content.js
```

Projects, papers, experience, interests, homepage exploration cards, CV and contact links are data-driven.

The interaction architecture is documented in:

```text
docs/ARCHITECTURE.md
```

## Interaction model

- Horizontal movement switches major sections.
- Content-heavy sections can scroll vertically.
- Scrollable content sections generate their own floating contents + progress indicator.
- The homepage exploration card rotates every 3 seconds and pauses during interaction.
- The top banner collapses while the user is moving and returns after interaction stops.
- Light / dark and 中文 / English preferences stay local to the browser.

## Privacy

The site deliberately does not publish unpublished research, personal email, affiliation, CV, or other private details until those fields are explicitly filled in.
