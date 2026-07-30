---
title: Configuration
---

# Configuration

The viewer can be customized by editing the `CONFIG` object at the top of `js/app.js`.

## Configuration Options

```javascript
const CONFIG = {
    // Path to the folder with .md files (relative to site root)
    guidePath: './guide',

    // Manifest filename (fallback when GitHub API is unavailable)
    manifestFile: 'manifest.json',

    // Default UI language
    defaultLang: 'RU',

    // Label for files without a language suffix
    defaultLangLabel: 'EN',

    // GitHub API settings (auto-detected from URL)
    github: {
        owner: null,
        repo: null,
        branch: 'main',
    },
};
```

## Option Reference

### `guidePath`
Path to the documentation folder, relative to the site root. Use `./guide` for a `guide/` folder at the same level as `index.html`.

### `manifestFile`
Name of the JSON manifest file used as a fallback. The file must be inside `guidePath` and contain a JSON array of filenames:

```json
["file1.md", "file2.md", "file3_RU.md"]
```

### `defaultLang`
The language code that will be selected by default when the viewer loads. Set this to the language most of your readers use.

### `defaultLangLabel`
The label shown in the language switcher for files that have no `_XX` suffix. For example, if your "default" files are in English, set this to `EN`.

### `github.branch`
The branch name to query via the GitHub Contents API. Defaults to `main`. If your repository uses `master`, change this to `'master'`.

## Customizing the UI

### Changing the Logo and Title

Edit the `.logo-text` span in `index.html`:

```html
<a href="#" class="logo" id="logo">
    <!-- SVG icon -->
    <span class="logo-text">My Docs</span>
</a>
```

### Changing Colors

All colors are defined as CSS variables in `css/styles.css`. To change the accent color:

```css
:root {
    --accent: #0969da;        /* Primary accent */
    --accent-hover: #0550ae;  /* Hover state */
    --accent-bg: #ddf4ff;     /* Light background */
}
```

### Changing the Sidebar Width

```css
:root {
    --sidebar-width: 280px;  /* Default: 280px */
}
```

### Changing the Content Width

```css
:root {
    --content-max-width: 820px;  /* Default: 820px */
}
```

## File Naming Rules

The viewer parses filenames using this pattern:

```
[NN-]slug[_XX].md
```

Where:
- `NN-` — optional numeric prefix for sort order (e.g., `00-`, `01-`, `99-`)
- `slug` — the document identifier (e.g., `getting-started`)
- `_XX` — optional 2-letter language code (e.g., `_RU`, `_ES`, `_DE`)

### Examples

| Filename | Order | Slug | Language |
|----------|-------|------|----------|
| `intro.md` | 9999 | `intro` | Default |
| `intro_RU.md` | 9999 | `intro` | Russian |
| `00-intro.md` | 0 | `intro` | Default |
| `00-intro_RU.md` | 0 | `intro` | Russian |
| `10-advanced/api.md` | 10 | `advanced/api` | Default |
| `10-advanced/api_RU.md` | 10 | `advanced/api` | Russian |

::: tip
Files with `/` in their slug are automatically grouped under a section heading in the sidebar. The section name is derived from the first path segment.
:::

## Adding a New Language

1. Create a new file with the appropriate suffix, e.g., `00-getting-started_ES.md`.
2. (Optional) Add the language label to the `getLangLabel` function in `app.js`:

```javascript
const labels = {
    // ...existing labels...
    'ES': 'Español',
};
```

3. Push to GitHub. The new language will appear in the switcher automatically.
