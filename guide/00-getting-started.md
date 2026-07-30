---
title: Getting Started
---

# Getting Started

Welcome to **Markdown Viewer** — a lightweight static site that renders your Markdown documentation with a beautiful, responsive interface.

This viewer reads `.md` files from the `guide/` folder and automatically builds the left sidebar navigation. Localized variants (e.g., `00-getting-started.md` and `00-getting-started_RU.md`) are grouped together under a single navigation entry, with a language switcher shown both in the sidebar and at the top of the document.

## Key Features

- **Dynamic navigation** — The sidebar is built automatically from the files in `guide/`. No manual configuration needed.
- **Localization support** — Files with `_XX` suffix (e.g., `_RU`, `_ES`) are grouped as translations of the same document.
- **Light & dark themes** — A theme toggle in the header lets readers switch instantly. The choice is saved to `localStorage`.
- **Search** — Filter documents in the sidebar by title or slug.
- **Code highlighting** — Powered by `highlight.js` with GitHub theme.
- **GitHub Flavored Markdown** — Tables, task lists, strikethrough, and more are supported via `marked.js`.
- **Deep linking** — Every document has its own URL hash (e.g., `#/getting-started`), making them easy to share.
- **Mobile friendly** — The sidebar collapses into a slide-out menu on small screens.
- **Zero build step** — Pure HTML/CSS/JS. Just push to GitHub and enable Pages.

## Quick Start

1. **Clone or download** this project.
2. **Add your `.md` files** to the `guide/` folder.
3. **Push to GitHub** and enable GitHub Pages in the repository settings.
4. **Done!** Your documentation site is live.

::: tip
You can switch the interface language to Russian using the `RU` button at the top of this page or in the sidebar.
:::

## File Naming Convention

| File | Order | Slug | Language |
|------|-------|------|----------|
| `00-getting-started.md` | 0 | `getting-started` | Default (EN) |
| `00-getting-started_RU.md` | 0 | `getting-started` | Russian |
| `01-installation.md` | 1 | `installation` | Default (EN) |
| `01-installation_RU.md` | 1 | `installation` | Russian |
| `99-faq.md` | 99 | `faq` | Default (EN) |

The numeric prefix (`00-`, `01-`, ...) controls the sort order in the sidebar. Files without a prefix are sorted last.

## Next Steps

- Read the [Installation](#/installation) guide to learn how to deploy the site.
- Check the [Configuration](#/configuration) page to customize the viewer.
- Explore the [Features](#/features) page to see what Markdown features are supported.
