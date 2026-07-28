---
name: moldavite-mcp
description: Use Moldavite's local MCP server to list, read, search, backlink, create, replace, and append notes safely. Use when a Moldavite MCP connection is available, when the user asks an agent to query or update a Forge, or when configuring moldavite --mcp for Claude Code or OpenCode.
license: MIT
compatibility: Requires Moldavite 1.7 or later for the documented seven-tool MCP surface. Write tools must be enabled explicitly in Moldavite settings.
metadata:
  author: Mauro Pereira
  version: "1.0.0"
---

# Moldavite MCP

Use Moldavite's MCP server instead of direct filesystem writes whenever its tools are connected. Client-visible tool names may include a server prefix; match the operation suffix such as `read_note` or `search_notes`.

## Connection

Moldavite's app binary also runs a headless stdio MCP server:

```sh
"/Applications/Moldavite.app/Contents/MacOS/moldavite" --mcp
```

Pin one connection to a Forge:

```sh
"/Applications/Moldavite.app/Contents/MacOS/moldavite" --mcp --forge "Work"
```

Without `--forge`, each request uses Moldavite's current active Forge. With `--forge`, all requests stay pinned to that Forge.

## Read Workflow

1. Use `search_notes` for a concept or `list_notes` for known folders.
2. Treat search results as candidates, not complete note content.
3. Use `read_note` before quoting, summarizing, or modifying a note.
4. Use `get_backlinks` when relationships or incoming context matter.
5. Report locked placeholders without trying to bypass them.

`search_notes` returns its mode. Semantic mode is used only when local semantic search is enabled and ready; otherwise Moldavite falls back to keyword search. Never claim semantic matching when the response says `keyword`.

## Create Workflow

1. Search or list first to avoid duplicate notes.
2. Choose a valid Forge-relative `.md` path.
3. Build complete Moldavite-compatible Markdown.
4. Call `create_note` once. It refuses existing and locked paths.
5. If creation fails because the path exists, read the existing note and ask or merge deliberately. Do not overwrite automatically.

## Replace Workflow

`write_note` replaces the entire raw file; it is not a patch operation.

1. Call `read_note` immediately before writing.
2. Preserve frontmatter, unrelated sections, and formatting.
3. Apply the smallest requested change in memory.
4. Call `write_note` with the full resulting Markdown.
5. Do not retry blindly after an error or unexpected concurrent change.

## Daily Append Workflow

Use `append_to_daily_note` for journal entries and logs. Omit `date` for Moldavite's local today or pass exact `YYYY-MM-DD`. The tool creates the daily note when absent.

Appending is not deduplicated. Read the daily note first when repeated content would be harmful.

## Path Contract

Valid note paths:

```text
daily/YYYY-MM-DD.md
weekly/YYYY-Www.md
notes/name.md
notes/nested/name.md
```

Nested paths are allowed only under `notes/`. Never pass an absolute path, hidden component, traversal, symlink, backslash, or locked-note path.

See [TOOLS.md](references/TOOLS.md) for exact arguments and return behavior.

## Write Gate

Read tools are available by default. `create_note`, `write_note`, and `append_to_daily_note` appear only when the user enables MCP writes in **Settings > AI & Agents**. Write permission is global and can be revoked while a server is running.

If a write tool is absent or denied, explain the setting needed. Do not bypass the gate with direct files unless the user explicitly requests a filesystem fallback.

## Not Exposed by MCP

Do not invent calls for delete, rename, move, trash, folder management, templates, graph data, locking, Forge management, import, or export. Use Moldavite's UI for those operations.
