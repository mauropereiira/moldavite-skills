---
name: moldavite-daily-notes
description: Create, append, and organize Moldavite daily notes, ISO weekly notes, journals, logs, reviews, and templates. Use when the user asks to journal today, append a daily log, create a weekly review, use a Moldavite template, or work with daily/ and weekly/ note paths.
license: MIT
compatibility: Designed for Moldavite 1.7 and later. Daily appends can use Moldavite MCP; weekly updates require create_note/write_note or direct Forge access.
metadata:
  author: Mauro Pereira
  version: "1.0.0"
---

# Moldavite Daily Notes

Maintain chronological notes without inventing dates or duplicating entries. Follow the Forge's `AGENTS.md` and existing daily-note style first.

## Paths

```text
daily/YYYY-MM-DD.md
weekly/YYYY-Www.md
```

- Daily dates use the user's local calendar date.
- Weekly filenames use ISO week year and two-digit week number.
- Daily and weekly directories are flat; never add nested folders.
- Do not use ordinary calendar year when ISO week year differs around New Year.

## Daily Workflow

1. Resolve relative dates such as "today" or "yesterday" in the user's local timezone. Use a system date tool when available instead of guessing.
2. Read the existing note or inspect neighboring daily notes when formatting conventions matter.
3. Use the MCP `append_to_daily_note` tool for a pure append. Omit `date` only when the user means local today.
4. Use `create_note` for a new complete daily note or read-then-`write_note` for a structured edit.
5. Preserve chronological order, frontmatter, existing headings, and user wording.
6. Check existing content first when duplicate entries would be harmful; append operations do not deduplicate.

Keep appended content self-contained. Add a heading or timestamp only when existing note style uses one or the user asks.

## Weekly Workflow

Moldavite has no dedicated MCP weekly-append tool.

1. Calculate the ISO week path.
2. Read the weekly note if present.
3. Create it with `create_note` when absent.
4. For updates, preserve the full note and use `write_note` with the complete result.
5. Summarize daily notes only after reading the relevant dates; do not infer missing activity.

## App Lifecycle

Moldavite's GUI can display a blank daily or weekly note before a file exists. It creates the file after content is entered and removes an emptied daily or weekly file. MCP create and append operations create files immediately.

## Templates

Moldavite includes `meeting-notes`, `daily-log`, and `project-plan` templates. Custom templates are managed in Moldavite and stored as JSON under the Forge's `templates/` directory.

Supported substitutions:

```text
{{date}}
{{time}}
{{day_of_week}}
```

Unknown substitutions remain literal. Only a daily default template is currently applied automatically; do not claim automatic weekly-template support.

See [TEMPLATES.md](references/TEMPLATES.md) for schema and examples. Prefer the Moldavite UI for creating or changing template JSON.
