---
name: moldavite-markdown
description: Create and edit Markdown notes for Moldavite with supported frontmatter, wiki links, aliases, tags, task lists, and formatting. Use when writing .md files in a Moldavite Forge, converting Obsidian syntax, or when the user mentions Moldavite notes, wikilinks, note colors, frontmatter, or tags.
license: MIT
compatibility: Designed for Moldavite 1.7 and later. Uses plain Markdown files and does not require the Moldavite MCP server.
metadata:
  author: Mauro Pereira
  version: "1.0.0"
---

# Moldavite Markdown

Create Markdown that survives round trips through Moldavite's rich-text editor. Use standard Markdown plus only the Moldavite extensions documented here.

## Workflow

1. Read the Forge's `AGENTS.md` when present. Forge-specific rules override this skill.
2. Before editing an existing note, read its complete raw Markdown, including frontmatter.
3. Preserve unknown frontmatter keys and unsupported content unless the user asks to change them.
4. Use conservative Markdown: headings, paragraphs, lists, tasks, blockquotes, links, fenced code, and images.
5. Connect notes with Moldavite wiki links. Use standard Markdown links for external URLs.
6. Verify link order, tag syntax, frontmatter fences, and destination filename before writing.

## Supported Markdown

````markdown
# Heading 1
## Heading 2
### Heading 3

**bold** and *italic*

- Bullet
1. Ordered item
- [ ] Open task
- [x] Completed task

> Blockquote

[External link](https://example.com)

```text
Fenced code
```
````

Moldavite also round-trips underline, highlight, text alignment, and sized images as inline HTML. Do not introduce that HTML unless the task needs those editor features.

## Frontmatter

Frontmatter is optional and must begin at the start of the file:

```yaml
---
title: Project Alpha
status: active
color: moss
---
```

- Moldavite interprets `color`; valid IDs are in [SYNTAX.md](references/SYNTAX.md).
- Other valid YAML keys are preserved, but Moldavite may reorder or reformat them on save.
- Frontmatter content is excluded from keyword and semantic search.
- Do not assume Obsidian properties such as `aliases`, `cssclasses`, or frontmatter `tags` have app behavior.

## Wiki Links

```markdown
[[Target]]
[[Display text|target]]
```

Moldavite alias order is display text first, target second. This is opposite Obsidian's `[[target|Display text]]` order.

- Prefer `[[Target]]` when display text can match the note title.
- Omit `.md` from targets.
- Targets resolve by basename, not folder path. Avoid duplicate basenames across folders.
- Heading links, block links, and transclusion do not have native semantics.
- On Moldavite 1.7, rich-editor saves can collapse aliased links to their display text. Prefer plain links when practical.

See [SYNTAX.md](references/SYNTAX.md) for target normalization and migration differences.

## Tags

Use inline body tags:

```markdown
#project #in-progress
```

- Start with an ASCII letter.
- Continue with ASCII letters, numbers, or hyphens.
- Tags are case-insensitive and normalized to lowercase.
- Nested tags such as `#project/alpha` are unsupported.
- Frontmatter tags do not participate in Moldavite's tag index.

## Unsupported Obsidian Syntax

Do not generate these as Moldavite features:

- `![[embeds]]`
- `[[Note#Heading]]` or `[[Note#^block]]` navigation
- `> [!callout]` callouts
- `%%comments%%`
- Obsidian property semantics
- `.base` or `.canvas` files

Plain Markdown may retain some syntax as literal text, but Moldavite does not provide the corresponding behavior.
