---
title: Installation
---

# Installation

This guide walks you through deploying the Markdown Viewer to GitHub Pages in just a few minutes.

## Prerequisites

- A [GitHub](https://github.com) account (free is fine).
- Git installed on your machine.
- Your documentation in `.md` format.

## Step 1 — Create a Repository

1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `my-docs`).
3. Set it to **Public** (Pages on free accounts require public repos).
4. Check **Add a README file**.
5. Click **Create repository**.

## Step 2 — Upload the Viewer Files

Clone the repository to your computer:

```bash
git clone https://github.com/YOUR_USERNAME/my-docs.git
cd my-docs
```

Copy the following files from this project into the repository root:

```
index.html
css/
  styles.css
js/
  app.js
guide/
  *.md  (your documentation)
  manifest.json
```

Commit and push:

```bash
git add .
git commit -m "Add markdown viewer"
git push origin main
```

::: warning
If your default branch is `master` instead of `main`, update the `CONFIG.github.branch` value in `js/app.js`.
:::

## Step 3 — Enable GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose your branch (`main` or `master`) and the `/ (root)` folder.
5. Click **Save**.

Wait 1–2 minutes, then refresh the page. Your site will be live at:

```
https://YOUR_USERNAME.github.io/my-docs/
```

## Step 4 — Add Your Documentation

Drop any `.md` file into the `guide/` folder and push. The navigation will update automatically on the next page load.

::: tip
You don't need to update `manifest.json` every time you add a file — the viewer uses the GitHub API to list the folder contents. The manifest is only a fallback for when the API is rate-limited.
:::

## Local Development

You can preview the site locally using any static file server:

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

::: warning
If you open `index.html` directly via `file://`, some browsers will block `fetch()` requests. Always use a local server.
:::

## Updating the Manifest

The `manifest.json` file is a fallback used when the GitHub API is unavailable. To regenerate it after adding new files:

```bash
# From the guide/ folder
ls *.md | jq -R . | jq -s . > manifest.json
```

Or manually edit it — it's just a JSON array of filenames:

```json
[
  "00-getting-started.md",
  "00-getting-started_RU.md",
  "01-installation.md"
]
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Navigation shows "Документация не найдена" | Check that `guide/` folder exists and contains `.md` files. Also check `manifest.json` if GitHub API is rate-limited. |
| 404 on document load | Verify the file path in `guide/` matches what's in the manifest. |
| Code not highlighted | Check your browser console for errors loading `highlight.js`. |
| Theme doesn't persist | Ensure `localStorage` is enabled in your browser. |
