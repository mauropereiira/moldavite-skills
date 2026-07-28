# MCP Tool Reference

## Tools

### `search_notes`

Arguments:

```json
{
  "query": "required text",
  "limit": 20
}
```

`limit` defaults to 20 and is clamped to 1 through 100. Returns `{mode, results}` where mode is `semantic` or `keyword`.

### `read_note`

Arguments:

```json
{ "path": "notes/example.md" }
```

Returns complete raw Markdown, including frontmatter. Refuses missing or locked notes.

### `list_notes`

Arguments:

```json
{ "folder": "notes/Projects" }
```

`folder` is optional. Valid values are `daily`, `weekly`, `notes`, or a nested folder under `notes`. Returns unlocked notes and locked-note placeholders with an `isLocked` flag.

### `get_backlinks`

Arguments:

```json
{ "path": "notes/example.md" }
```

Returns source note paths, titles, and context for wiki links pointing to the target. Target must exist and be unlocked.

On Moldavite 1.7, `[[Display|target]]` backlinks are found correctly, but their `context` field may be empty. Read the source note when aliased-link context matters.

### `create_note`

Arguments:

```json
{
  "path": "notes/example.md",
  "content": "# Example\n"
}
```

Creates only. It refuses existing paths and locked counterparts and creates safe parent folders below `notes/`.

### `append_to_daily_note`

Arguments:

```json
{
  "content": "- Finished release notes",
  "date": "2026-07-27"
}
```

`date` is optional and uses local today when omitted. Creates the note when absent and otherwise appends content with a separating newline when needed.

### `write_note`

Arguments:

```json
{
  "path": "notes/example.md",
  "content": "# Complete replacement\n"
}
```

Replaces one existing unlocked note with complete raw Markdown. It refuses missing notes and is not concurrency-aware beyond normal filesystem safety.

## Locked notes

MCP never exposes locked plaintext. `list_notes` can reveal a locked placeholder path; all content and relationship tools reject it. Never ask for, derive, or manipulate the encrypted `.md.locked` file.
