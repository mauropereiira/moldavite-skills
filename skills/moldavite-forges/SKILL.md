---
name: moldavite-forges
description: Navigate and safely edit Moldavite Forge directories, including daily, weekly, standalone, nested, image, template, locked, and app-managed paths. Use when an agent has filesystem access to a Moldavite Forge, needs to choose a note path, or must edit notes without MCP.
license: MIT
compatibility: Designed for Moldavite 1.7 and later. Direct filesystem workflows require access to the user's Forge directory.
metadata:
  author: Mauro Pereira
  version: "1.0.0"
---

# Moldavite Forges

A Forge is a user-owned directory of Markdown notes. Prefer Moldavite MCP tools when connected because they enforce Forge paths, locks, and write permissions. Use direct files only when MCP is unavailable or the task explicitly requires filesystem work.

## Discover the Forge

1. Use the Forge path supplied by the user or current project context.
2. Default roots commonly live under `~/Documents/Moldavite/<Forge name>/`.
3. If multiple Forges could match, ask which one to use. Do not infer from note titles.
4. Read root `AGENTS.md` before reading or changing notes. Its privacy, naming, and content rules take precedence.

## Layout

```text
<Forge>/
|-- AGENTS.md
|-- daily/                 # YYYY-MM-DD.md
|-- weekly/                # YYYY-Www.md
|-- notes/                 # standalone notes; nested folders allowed
|-- templates/             # Moldavite-managed JSON templates
|-- images/                # note attachments, linked as images/<file>
|-- .trash/                # app-managed
|-- .plugins/              # app-managed
`-- .index/                # derived semantic index
```

Use full Forge-relative paths when discussing or using MCP notes:

```text
daily/2026-07-27.md
weekly/2026-W31.md
notes/project-plan.md
notes/Projects/project-plan.md
```

Daily and weekly notes stay flat. Nest only under `notes/`.

## Safety Rules

- Never read or edit `*.md.locked` files. Their plaintext is intentionally unavailable.
- A locked note occupies both spellings of its name. `secret.md.locked` means the address `secret.md` is
  taken, even though no such file exists. Never create, move or rename a note onto it: the pair leaves the
  note listed twice and unlockable.
- A locked note in `.trash/` stays encrypted and can only be restored to the path it was locked at. A note
  created at that path meanwhile blocks the restore until the user renames it.
- Moldavite 2.9 and later lock and unlock by writing the new file before removing the old one, so an
  interrupted lock or unlock can leave `secret.md` beside `secret.md.locked`. Leave both files alone and tell
  the user; do not delete, merge or edit either one.
- Never edit `.trash/`, `.plugins/`, `.index/`, hidden files, or temporary siblings.
- Never follow symlinks into or within a Forge.
- Reject absolute note paths, `..`, backslashes, NUL bytes, and hidden path components.
- Preserve unknown YAML frontmatter and unrelated note content.
- Read a file immediately before replacing it. Do not overwrite changes made since that read.
- Refuse to replace an existing path during note creation.
- Keep new files owner-only (`0600`) and new directories owner-only (`0700`) when controlling permissions.

## Direct Edit Workflow

1. Confirm Forge and category.
2. Read `AGENTS.md` and the target note if it exists.
3. Search for a semantically matching note before creating a near-duplicate.
4. Choose a lowercase hyphenated `.md` filename unless Forge rules say otherwise. Never put `[` or `]` in a new note's name. Keep it portable too: no `:`, `*`, `?`, `"`, `<`, `>`, `|` or control characters, no device name such as `CON` or `NUL`, and no leading or trailing dot or space.
5. Write a first `# Title` heading and use `[[wiki links]]` to connect related notes. Link images as `images/<file>` from the Forge root, whatever folder the note is in.
6. For replacement, preserve complete frontmatter and all content outside the requested change.
7. If scripting writes, use a same-directory temporary file, flush it, apply restrictive permissions, then rename it atomically.

See [FORGE-LAYOUT.md](references/FORGE-LAYOUT.md) for path selection and app refresh behavior.

## Linking and Graph

Moldavite's backlinks and graph are derived from `[[wiki links]]`; no graph file exists. Link targets are basename-oriented, so duplicate note basenames across nested folders are ambiguous: `[[plan]]` counts as a link to every `plan.md`. Prefer unique basenames across a Forge.

Moldavite 2.9 and later keep backlinks from same-named notes in different folders apart. When two notes share a name, renaming one in Moldavite leaves links to that name alone, since they may mean the other note. Retarget the links meant for the renamed note by hand.

## External Change Behavior

Moldavite notices filesystem changes and refreshes its note list. An open note with no unsaved edits reloads from disk in place, so a note an agent writes to repeatedly stays visible. A note with unsaved edits keeps the editor body and shows a banner where the user picks a version; the other is preserved as a conflict copy. While Moldavite is running, keyword search picks up a direct write to a note, and in 2.9 and later so do backlinks. Semantic search catches up when the Forge is reopened or reindexed. A folder renamed or moved on disk reaches the app as one directory event, which it does not index, so search and backlinks can keep the old paths of the notes inside until the Forge is reopened. Prefer Moldavite's UI for folder moves, and warn the user when immediate app visibility matters.
