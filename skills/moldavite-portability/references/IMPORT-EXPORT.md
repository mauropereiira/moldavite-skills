# Import and Export Reference

## Forge archive contents

Included:

```text
daily/
weekly/
notes/
templates/
images/
```

Excluded:

```text
AGENTS.md
.gitignore
.trash/
.plugins/
.index/
app settings
```

Archive safety limits include 50,000 entries, 100 MB per file, and 2 GB total extracted content.

## Note exports

Moldavite can export one or multiple selected notes as:

- Markdown
- Plaintext
- PDF using Letter, A4, or Legal paper and configurable margins

These exports are presentation or sharing formats, not complete Forge backups.

## Settings JSON scope

Settings export includes selected calendar, folder, app, theme, pinned-tab, and recent-note state. It excludes note files, custom templates, quick-switcher state, plugins and grants, semantic models and indexes, and MCP write permission.

## Obsidian importer boundaries

- Source vault remains read-only.
- Destination is a newly created Forge.
- `.canvas` files are counted and skipped because Moldavite has no Canvas format.
- Referenced attachments are copied; unrelated attachments are skipped.
- Unsupported embed references remain warnings rather than silently invented content.
- Wiki targets are basename-oriented after import, so same-named notes in different folders need manual review.
