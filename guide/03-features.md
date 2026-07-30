---
title: Markdown Features
---

# Markdown Features

This page demonstrates all the Markdown features supported by the viewer.

## Headings

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

Hover over any heading to reveal an anchor link (🔗) for easy sharing.

## Text Formatting

- **Bold text** using `**double asterisks**` or `__double underscores__`
- *Italic text* using `*single asterisks*` or `_single underscores_`
- ***Bold and italic*** using `***triple asterisks***`
- ~~Strikethrough~~ using `~~double tildes~~`
- `Inline code` using backticks

## Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes are also supported.
```

> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes are also supported.

## Lists

### Unordered Lists

```markdown
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3
```

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists

```markdown
1. First item
2. Second item
3. Third item
   1. Nested ordered
   2. Another nested
```

1. First item
2. Second item
3. Third item
   1. Nested ordered
   2. Another nested

### Task Lists

```markdown
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task
```

- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

## Code Blocks

### Inline Code

Use backticks for `inline code` snippets.

### Fenced Code Blocks

```javascript
// Example JavaScript code
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

```python
# Example Python code
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55
```

```bash
# Example bash script
#!/bin/bash
echo "Hello, World!"

for i in {1..5}; do
    echo "Iteration $i"
done
```

```json
{
    "name": "Markdown Viewer",
    "version": "1.0.0",
    "features": ["dark-mode", "search", "localization"],
    "license": "MIT"
}
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

## Tables

```markdown
| Feature | Supported | Notes |
|---------|:---------:|-------|
| Headings | ✓ | All 6 levels |
| Bold/Italic | ✓ | Standard syntax |
| Code blocks | ✓ | With syntax highlighting |
| Tables | ✓ | GFM syntax |
| Task lists | ✓ | GitHub style |
```

| Feature | Supported | Notes |
|---------|:---------:|-------|
| Headings | ✓ | All 6 levels |
| Bold/Italic | ✓ | Standard syntax |
| Code blocks | ✓ | With syntax highlighting |
| Tables | ✓ | GFM syntax |
| Task lists | ✓ | GitHub style |
| Strikethrough | ✓ | `~~text~~` |
| Auto-links | ✓ | URLs become clickable |

## Links

### Inline Links

```markdown
[Open GitHub](https://github.com)
[Visit Google](https://google.com "Search the web")
```

[Open GitHub](https://github.com)
[Visit Google](https://google.com "Search the web")

### Reference Links

```markdown
[Markdown Spec][spec]

[spec]: https://spec.commonmark.org/
```

[Markdown Spec][spec]

[spec]: https://spec.commonmark.org/

### Auto-links

Bare URLs are automatically converted to links: https://github.com

## Images

```markdown
![Alt text](https://via.placeholder.com/600x300/0969da/ffffff?text=Example+Image)
```

![Alt text](https://via.placeholder.com/600x300/0969da/ffffff?text=Example+Image)

## Horizontal Rule

Use three or more hyphens, asterisks, or underscores:

```markdown
---
```

---

## Callouts (Custom Syntax)

The viewer supports custom callout blocks using the `:::` syntax:

### Tip

```markdown
::: tip
This is a helpful tip.
:::
```

::: tip
This is a helpful tip. Use it to highlight useful information or shortcuts.
:::

### Warning

```markdown
::: warning
This is a warning. Be careful!
:::
```

::: warning
This is a warning. Use it to alert readers about potential pitfalls or important considerations.
:::

### Danger

```markdown
::: danger
This is a danger notice. Pay attention!
:::
```

::: danger
This is a danger notice. Use it to warn about critical issues that could cause data loss or security problems.
:::

### Info / Note

```markdown
::: note
This is a note.
:::
```

::: note
This is a note. Use it for additional context that doesn't fit the main flow.
:::

## YAML Front Matter

The viewer automatically strips YAML front matter from the top of `.md` files:

```markdown
---
title: My Document
author: John Doe
date: 2024-01-15
---

# My Document

Content starts here.
```

If a `title` field is present in the front matter, it's used as the document title in the sidebar.

## HTML Support

Raw HTML is supported inside Markdown (and sanitized via DOMPurify for safety):

```markdown
<details>
<summary>Click to expand</summary>

Hidden content goes here.

</details>
```

<details>
<summary>Click to expand</summary>

Hidden content goes here. This is useful for collapsible sections.

</details>

## Emoji

GitHub-style emoji shortcodes are NOT supported by default (the viewer uses standard `marked.js` without the emoji plugin). Use Unicode emoji directly:

✅ ❌ ⚠️ 💡 📝 🔥 🚀 📚

That's it! You now know all the supported features. Start writing your documentation! 🎉
