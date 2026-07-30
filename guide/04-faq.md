---
title: FAQ
---

# FAQ — Frequently Asked Questions

## General

### What is Markdown Viewer?

Markdown Viewer is a lightweight, static-site documentation viewer that renders `.md` files from a `guide/` folder. It builds the sidebar navigation automatically, supports multiple languages per document, and works on GitHub Pages with zero build step.

### Do I need a build tool (Webpack, Vite, etc.)?

**No.** The viewer is pure HTML, CSS, and vanilla JavaScript. Just push the files to GitHub and enable Pages.

### Can I use this without GitHub Pages?

Yes. The viewer works on any static file server: Netlify, Vercel, Cloudflare Pages, nginx, Apache, or even a local `python -m http.server`. The GitHub API integration is only used when the site is hosted on `*.github.io`.

## Files & Navigation

### How does the viewer discover `.md` files?

It uses a three-step strategy:

1. **GitHub Contents API** — When hosted on `*.github.io`, it queries `api.github.com/repos/.../contents/guide` to list files dynamically.
2. **`manifest.json` fallback** — If the API is unavailable (e.g., rate-limited or running locally), it reads `guide/manifest.json`.
3. **Built-in fallback** — If both fail, it falls back to a hardcoded list (for development only).

### How are localized files grouped?

Files with the same base name but different `_XX` suffixes are grouped together. For example:

- `00-getting-started.md` → language `EN` (default)
- `00-getting-started_RU.md` → language `RU`

These appear as a single entry in the sidebar with a language switcher.

### Can I use a different language code format?

Currently, only 2-letter uppercase codes are supported (e.g., `_RU`, `_ES`, `_DE`, `_ZH`). If you need 3-letter codes, modify the regex in `parseFilename()` in `app.js`.

### How is the document title determined?

The viewer tries these sources in order:

1. The `title` field in YAML front matter (e.g., `title: My Doc`)
2. The first `# H1 heading` in the file
3. The slug converted to title case (e.g., `getting-started` → `Getting Started`)

### How are documents sorted?

By the numeric prefix in the filename. `00-` comes first, `01-` next, and so on. Files without a prefix are sorted last (treated as `9999`).

## Features

### Does it support code syntax highlighting?

Yes, via `highlight.js` (loaded from CDN). Supported languages include JavaScript, Python, Bash, JSON, HTML, CSS, SQL, Go, Rust, and 190+ others. The theme automatically switches between light and dark variants.

### Does it support GFM (GitHub Flavored Markdown)?

Yes. Tables, task lists (`- [x]`), strikethrough (`~~text~~`), and auto-links are all supported via `marked.js` with `gfm: true`.

### Does it support Mermaid diagrams?

Not out of the box. To add Mermaid support, include the Mermaid library and add a custom renderer in `app.js` that transforms ```mermaid code blocks.

### Can I add custom callout types?

Yes. Edit the `processCallouts()` function in `app.js` to add new types. For example, to add a `success` type:

```javascript
const typeMap = {
    // ...existing types...
    'success': 'callout callout-success',
};
```

Then add the corresponding CSS class in `styles.css`.

## Security

### Is the rendered Markdown safe?

Yes. All rendered HTML is sanitized via DOMPurify, which strips dangerous tags and attributes (like `<script>`, `onerror=`, etc.). Only safe HTML is allowed through.

### Can viewers execute JavaScript from `.md` files?

No. Any `<script>` tags or event handlers in Markdown are removed by DOMPurify before being inserted into the DOM.

## Performance

### How fast is the initial load?

The HTML shell is ~5KB, CSS ~15KB, and `app.js` ~20KB (uncompressed). The CDN libraries (`marked.js`, `highlight.js`, `DOMPurify`) total ~80KB gzipped. First contentful paint typically occurs in under 500ms on a fast connection.

### How are documents cached?

The viewer caches document titles in memory after first load. Full content is fetched fresh each time (no browser cache headers are set). If you want aggressive caching, configure `Cache-Control` headers on your hosting provider.

### What about rate limits on the GitHub API?

Unauthenticated requests are limited to 60 per hour per IP. Each page load makes one API call to list the `guide/` folder. If you exceed the limit, the viewer falls back to `manifest.json` automatically.

::: tip
For high-traffic sites, consider using a [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (increases limit to 5,000/hour). However, embedding tokens in client-side code is insecure — for production, use a serverless function to proxy the API.
:::

## Troubleshooting

### The sidebar shows "Документация не найдена"

1. Verify the `guide/` folder exists at the site root.
2. Verify it contains at least one `.md` file.
3. If you're not on GitHub Pages, ensure `guide/manifest.json` exists and lists the files.
4. Check the browser console for error messages.

### A document loads as 404

The filename in `manifest.json` (or returned by the GitHub API) doesn't match an actual file. Check for typos, case sensitivity issues (Linux is case-sensitive!), or special characters.

### Code is not highlighted

1. Open the browser console — if `highlight.js` failed to load (network issue), you'll see an error.
2. Verify the language is supported by `highlight.js`. You can check the [full list here](https://highlightjs.readthedocs.io/en/latest/supported-languages.html).
3. Some languages require explicitly specifying the language: ` ```javascript` instead of just ` ``` `.

### The theme doesn't persist

1. Ensure `localStorage` is enabled in your browser.
2. Some browsers block `localStorage` in private/incognito mode.
3. Check if any browser extension is blocking storage access.

## Still have questions?

Open an issue on [GitHub](https://github.com) (replace with your actual repo URL) and we'll help you out.
