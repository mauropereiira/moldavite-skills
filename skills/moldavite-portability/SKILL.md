---
name: moldavite-portability
description: Back up, export, restore, and migrate notes with Moldavite, including encrypted backups, ZIP archives, Markdown or PDF exports, settings JSON, and Obsidian vault imports. Use when the user asks about Moldavite backup, migration, import, export, restore, or moving from Obsidian.
license: MIT
compatibility: Designed for Moldavite 1.7 and later. Import and export operations are available through the Moldavite app UI, not MCP.
metadata:
  author: Mauro Pereira
  version: "1.0.0"
---

# Moldavite Portability

Use Moldavite's app UI for archive, migration, and export operations. MCP does not expose import, export, restore, or backup tools. Never simulate a destructive replace import with note-by-note MCP writes.

## Choose the Right Operation

| Goal | Operation |
| --- | --- |
| Portable Forge content archive | ZIP export |
| Password-protected Forge copy | Encrypted `.moldavite-backup` export |
| Add files without overwriting existing paths | Import with Merge |
| Restore archive contents as primary notes | Import with Replace |
| Share selected notes | Markdown, plaintext, or PDF export |
| Move app preferences only | Settings JSON export/import |
| Move from Obsidian | Built-in Obsidian importer |

## Safe Backup Workflow

1. Confirm source Forge and destination outside that Forge.
2. Choose encrypted export when archive privacy matters.
3. Keep the password separately; Moldavite cannot recover it.
4. Verify the output file exists and has plausible nonzero size.
5. Test restore into a disposable Forge when backup assurance matters.
6. Keep more than one generation before deleting source data.

Forge archives include `daily/`, `weekly/`, `notes/`, `templates/`, and `images/`. They exclude app-managed indexes, trash, plugins, and root agent files.

## Merge vs Replace

- **Merge** skips destination files that already exist. It is safer for combining content but does not reconcile two versions of the same path.
- **Replace** clears destination daily, weekly, note, and image content before extraction. Export a backup first and obtain explicit user confirmation.
- Templates are handled differently from note directories during replacement; review imported templates after restore.

Do not present Replace as an undoable preview. Treat it as destructive even when a separate backup exists.

## Obsidian Migration

Use Moldavite's built-in Obsidian importer instead of manually copying a vault. It reads the source without modifying it and creates a new Forge.

The importer:

- preserves YAML frontmatter;
- converts Obsidian `[[target|Display]]` aliases to Moldavite `[[Display|target]]`;
- removes heading and block suffixes from wiki-link targets;
- copies referenced local images into `images/` with collision-safe names;
- normalizes supported daily-note filenames;
- skips hidden files, `.obsidian`, `.trash`, symlinks, `.canvas`, and unreferenced attachments;
- reports unresolved embeds and skipped Canvas files.

After import, review warnings, aliased links, duplicate basenames, daily-note dates, attachment references, and a sample of frontmatter-heavy notes.

See [IMPORT-EXPORT.md](references/IMPORT-EXPORT.md) for scope and limits.

## Settings Export Is Separate

Settings JSON does not contain notes, templates, plugin grants, semantic models, indexes, or the MCP write gate. Use a Forge archive for note data and settings JSON only for supported preferences.
