import { access, readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const skillsRoot = join(root, "skills");
const errors = [];

const directories = (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (directories.length === 0) {
  errors.push("skills/: no skill directories found");
}

for (const directory of directories) {
  const skillRoot = join(skillsRoot, directory);
  const skillPath = join(skillRoot, "SKILL.md");
  let content;

  try {
    content = await readFile(skillPath, "utf8");
  } catch {
    errors.push(`skills/${directory}: missing SKILL.md`);
    continue;
  }

  if (!content.endsWith("\n")) {
    errors.push(`skills/${directory}/SKILL.md: missing final newline`);
  }

  if (content.split("\n").some((line) => /\s+$/.test(line))) {
    errors.push(`skills/${directory}/SKILL.md: trailing whitespace`);
  }

  const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    errors.push(`skills/${directory}/SKILL.md: invalid YAML frontmatter fence`);
    continue;
  }

  const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1].trim();
  const description = frontmatter[1]
    .match(/^description:\s*(.+)$/m)?.[1]
    .trim();

  if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64) {
    errors.push(`skills/${directory}/SKILL.md: invalid name`);
  } else if (name !== directory) {
    errors.push(`skills/${directory}/SKILL.md: name must match directory`);
  }

  if (!description || description.length > 1024) {
    errors.push(`skills/${directory}/SKILL.md: invalid description`);
  }

  const references = [
    ...content.matchAll(/\]\((references\/[^)#\s]+)(?:#[^)]+)?\)/g),
  ].map((match) => match[1]);

  for (const reference of new Set(references)) {
    try {
      await access(join(skillRoot, reference));
    } catch {
      errors.push(`skills/${directory}/SKILL.md: missing ${reference}`);
    }
  }
}

for (const manifest of [
  ".claude-plugin/marketplace.json",
  ".claude-plugin/plugin.json",
  "package.json",
]) {
  try {
    JSON.parse(await readFile(join(root, manifest), "utf8"));
  } catch (error) {
    errors.push(`${manifest}: invalid JSON (${error.message})`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${directories.length} skills.`);
}
