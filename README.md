# windyduan.github.io

Personal homepage for selected work, public research, open-source contributions, and whatever I happen to be curious about.

Live: https://windyduan.github.io/

## Editing the site

Most content lives in `site-data.js`. The page layout lives in `index.html`.

### Add a publication / preprint

Add an item to `publications` in `site-data.js`:

```js
{
  year: "2026",
  type: "Preprint",
  title: "Your paper title",
  authors: "Author A, windyduan, Author B",
  venue: "arXiv / Journal / Conference",
  summary: {
    zh: "两句话讲清楚这篇工作做了什么。",
    en: "Two plain-language sentences describing the work."
  },
  links: {
    paper: "https://doi.org/...",
    code: "https://github.com/...",
    project: "",
    poster: ""
  }
}
```

If `publications` is empty, the public site shows a small placeholder instead of inventing research output.

### Add experience

Add entries to `experience`:

```js
{
  period: "2026 — Now",
  role: { zh: "研究助理", en: "Research Assistant" },
  org: "Organization",
  note: {
    zh: "一句话写真正做了什么。",
    en: "One sentence about what you actually did."
  }
}
```

The Experience section stays hidden until at least one entry exists.

### Add CV / email

In `profile`:

```js
cvUrl: "",
email: "",
```

Leave either field empty to keep that button off the public site.

## Current public content

Selected work:
- `AI4S-Chem`
- `Try`

Open-source contributions:
- `NativeDog1/dsh-boot-animation#2` — merged
- `NativeDog1/dsh-boot-animation#4` — open
- `MisakaZentai/world-execute-me-dsh-pv#5` — open

The site deliberately does not publish unpublished research, personal email, affiliation, CV, or other private details until they are explicitly ready to be public.
