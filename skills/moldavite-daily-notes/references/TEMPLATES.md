# Moldavite Template Reference

## Variables

Variables are evaluated from one local timestamp when the template is applied:

| Variable | Output example |
| --- | --- |
| `{{date}}` | `2026-07-27` |
| `{{time}}` | `14:05` |
| `{{day_of_week}}` | `Monday` |

No arbitrary expressions, user variables, or date arithmetic are supported.

## Custom template schema

Moldavite stores each custom template at `templates/<id>.json`:

```json
{
  "id": "work-log",
  "name": "Work Log",
  "description": "Daily work log",
  "icon": "file",
  "isDefault": false,
  "content": "# {{date}}\n\n## Work\n\n- "
}
```

- `id` is a slug and matches the filename.
- `content` is raw Markdown.
- Built-in templates are immutable.
- Use Moldavite's template UI for normal template management.
- Do not edit template JSON while Moldavite is changing the same template.

## Example daily body

```markdown
# {{date}}

## Focus

- [ ]

## Notes

## Completed
```

Treat this as an example only. Existing Forge conventions take precedence.
