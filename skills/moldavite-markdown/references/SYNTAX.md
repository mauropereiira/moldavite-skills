# Moldavite Syntax Reference

## Note colors

Moldavite recognizes these `color` frontmatter values:

```text
default
crystal
moss
fern
forest
amber
gold
honey
bronze
earth
stone
clay
cosmos
nebula
midnight
```

Unknown values are preserved but render as the default color.

## Wiki-link target normalization

Moldavite converts a wiki-link target to a note basename by:

1. Normalizing Unicode to NFC.
2. Converting to lowercase.
3. Trimming whitespace and replacing whitespace runs with `-`.
4. Keeping Unicode letters, numbers, and hyphens.
5. Adding `.md` during resolution.

Examples:

| Link | Resolved basename |
| --- | --- |
| `[[Meeting Notes]]` | `meeting-notes.md` |
| `[[Cafe Plan]]` | `cafe-plan.md` |
| `[[Café]]` | `café.md` |

Targets are basename-oriented. `[[Projects/Plan]]` is not a reliable way to address `notes/Projects/plan.md`.

## Moldavite and Obsidian differences

| Feature | Moldavite | Obsidian |
| --- | --- | --- |
| Plain wiki link | `[[Target]]` | `[[Target]]` |
| Aliased wiki link | `[[Display|target]]` | `[[target|Display]]` |
| Heading/block target | Not supported | Supported |
| Wiki embed | Not supported | `![[Target]]` |
| Inline tags | ASCII letters, numbers, hyphens | Broader syntax and nesting |
| Frontmatter behavior | Preserves YAML; consumes `color` | Properties system |
| Note lookup | Basename-oriented | Path-aware resolution |

When converting Obsidian Markdown manually, reverse alias order and remove heading or block suffixes from internal targets. Moldavite's built-in Obsidian importer performs these conversions automatically.
