<h1 align="center">Moldavite Skills</h1>

<p align="center">
  <em>Teach your agent how your notes actually work.</em>
</p>

<p align="center">
  <a href="https://mauropereiira.github.io/moldavite-skills/">Website</a> ·
  <a href="https://github.com/mauropereiira/Moldavite">Moldavite</a> ·
  <a href="https://github.com/mauropereiira/homebrew-moldavite">Homebrew tap</a> ·
  <a href="https://mauropereiira.github.io/Moldavite/guide.html">User Guide</a>
</p>

---

Agent Skills for [Moldavite](https://github.com/mauropereiira/Moldavite), a notes
app for macOS that keeps everything as plain Markdown in a folder you own.

Moldavite's MCP server gives an agent the note tools. These skills give it the
context to use them well: the Markdown dialect, the Forge layout, how daily and
weekly notes behave, what happens to locked notes, and what the importer does and
does not carry over.

They follow the [Agent Skills specification](https://agentskills.io/specification),
so they work in Claude Code, Codex, OpenCode, and anything else that reads
`SKILL.md`.

## Skills

| Skill                                                 | Description                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| [moldavite-markdown](skills/moldavite-markdown)       | Create and edit Moldavite-compatible Markdown, frontmatter, wiki links, and tags |
| [moldavite-forges](skills/moldavite-forges)           | Work safely with Forge layout, paths, locked notes, and direct file edits        |
| [moldavite-mcp](skills/moldavite-mcp)                 | Read, search, create, and update notes through Moldavite's MCP server            |
| [moldavite-daily-notes](skills/moldavite-daily-notes) | Maintain daily notes, ISO weekly notes, and Moldavite templates                  |
| [moldavite-portability](skills/moldavite-portability) | Back up, export, restore, and migrate Obsidian vaults into Moldavite             |

Moldavite has no support for Obsidian Bases, JSON Canvas, or a general
note-management CLI. This pack does not invent equivalents. The graph is derived
automatically from wiki links, so there is nothing to manage there either.

## Install the skills

**Claude Code marketplace:**

```text
/plugin marketplace add mauropereiira/moldavite-skills
/plugin install moldavite@moldavite-skills
```

**npx skills:**

```sh
npx skills add https://github.com/mauropereiira/moldavite-skills
```

**OpenCode.** Clone the whole repository into the global skills directory.
OpenCode finds nested `SKILL.md` files on its own. Restart it afterwards.

```sh
mkdir -p ~/.config/opencode/skills && git clone https://github.com/mauropereiira/moldavite-skills.git ~/.config/opencode/skills/moldavite-skills
```

**By hand.** Copy each directory under `skills/` into your client's skills
directory. Keep every `SKILL.md` beside its `references/` directory.

## Connect the MCP server

Skills teach an agent how Moldavite works. MCP is what gives it the note tools.
You want both.

If you do not have the app yet:

```sh
brew install --cask mauropereiira/moldavite/moldavite
```

That puts `moldavite` on your `PATH`, which makes the Claude Code setup one line:

```sh
claude mcp add moldavite -- moldavite --mcp
```

Installed from the DMG instead? Use the full path:

```sh
claude mcp add moldavite -- "/Applications/Moldavite.app/Contents/MacOS/moldavite" --mcp
```

Pin a connection to a single Forge with `--forge`:

```sh
claude mcp add moldavite-work -- moldavite --mcp --forge "Work"
```

OpenCode, in `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "moldavite": {
      "type": "local",
      "command": ["moldavite", "--mcp"],
      "enabled": true
    }
  }
}
```

Restart the client after changing MCP configuration.

Moldavite's four read tools are on by default. The three write tools stay off
until you turn them on in **Settings → AI & Agents**, and switching them back off
removes them from the tool list mid-session. Locked notes are excluded from all
seven.

## Development

Validate skill metadata, references, and the Claude plugin manifests:

```sh
npm run validate
```

## Acknowledgments

Structure and distribution model inspired by
[kepano/obsidian-skills](https://github.com/kepano/obsidian-skills).

## License

[MIT](LICENSE)
