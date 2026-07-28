# Moldavite Skills

Agent Skills for working with [Moldavite](https://github.com/mauropereiira/Moldavite), a local-first Markdown notes app.

<p align="center">
  <a href="https://mauropereiira.github.io/moldavite-skills/">Website</a> &middot;
  <a href="https://github.com/mauropereiira/Moldavite">Get Moldavite</a> &middot;
  <a href="#installation">Install skills</a>
</p>

These skills follow the [Agent Skills specification](https://agentskills.io/specification), so they work with skills-compatible agents including Claude Code, Codex, and OpenCode. They describe Moldavite's actual Markdown dialect, Forge layout, MCP server, daily notes, and migration behavior.

## Installation

### Claude Code marketplace

```text
/plugin marketplace add mauropereiira/moldavite-skills
/plugin install moldavite@moldavite-skills
```

### npx skills

```sh
npx skills add https://github.com/mauropereiira/moldavite-skills
```

### OpenCode

Clone the complete repository under OpenCode's global skills directory:

```sh
mkdir -p ~/.config/opencode/skills && git clone https://github.com/mauropereiira/moldavite-skills.git ~/.config/opencode/skills/moldavite-skills
```

OpenCode discovers nested `SKILL.md` files automatically. Restart OpenCode after installation.

### Manual installation

Copy each directory under `skills/` into your client's skills directory. Keep each `SKILL.md` beside its `references/` directory.

## Skills

| Skill                                                 | Description                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| [moldavite-markdown](skills/moldavite-markdown)       | Create and edit Moldavite-compatible Markdown, frontmatter, wiki links, and tags |
| [moldavite-forges](skills/moldavite-forges)           | Work safely with Forge layout, paths, locked notes, and direct file edits        |
| [moldavite-mcp](skills/moldavite-mcp)                 | Read, search, create, and update notes through Moldavite's MCP server            |
| [moldavite-daily-notes](skills/moldavite-daily-notes) | Maintain daily notes, ISO weekly notes, and Moldavite templates                  |
| [moldavite-portability](skills/moldavite-portability) | Back up, export, restore, and migrate Obsidian vaults into Moldavite             |

Moldavite does not currently support Obsidian Bases, JSON Canvas, or a general note-management CLI. This pack does not invent equivalents. Moldavite's graph is derived automatically from wiki links.

## Connect the MCP server

Skills teach an agent how to use Moldavite. MCP provides the note tools. Moldavite's four read tools are enabled by default; its three write tools require explicit permission in **Settings > AI & Agents**.

Claude Code:

```sh
claude mcp add moldavite -- "/Applications/Moldavite.app/Contents/MacOS/moldavite" --mcp
```

Pin the connection to one Forge when needed:

```sh
claude mcp add moldavite-work -- "/Applications/Moldavite.app/Contents/MacOS/moldavite" --mcp --forge "Work"
```

OpenCode (`~/.config/opencode/opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "moldavite": {
      "type": "local",
      "command": [
        "/Applications/Moldavite.app/Contents/MacOS/moldavite",
        "--mcp"
      ],
      "enabled": true
    }
  }
}
```

Restart the client after changing MCP configuration.

## Development

Validate skill metadata, references, and Claude plugin manifests:

```sh
npm run validate
```

## Acknowledgments

Structure and distribution model inspired by [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills).

## License

[MIT](LICENSE)
