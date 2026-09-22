# AGENTS.md

This file provides guidance to agents when working with content in this directory.

## What this is

This directory is Artu's Obsidian vault — the actual IT knowledge base content, published by the Quartz site generator at the repo root (see the root `AGENTS.md` for build/deploy/config concerns).

## Structure

- Folders are topical: `Architecture`, `AI Ecosystem`, `Back End - Front End`, `Browser`, `Cloud`, `Design`, `Frameworks, Libs`, `Images`, `Languages`, `Node.js`, `Security`, `Storages`.
- `index.md` is the vault home page and links out to top-level notes by topic.
- `.obsidian/` — Obsidian app config for this vault. Installed community plugins: `templater-obsidian`, `quickadd`, `auto-note-mover`, `code-styler`, `table-editor-obsidian`, `graph-analysis`.

## Content conventions

- Use Obsidian wikilinks (`[[Note Name]]`) for cross-references, not standard Markdown links — Quartz's `ObsidianFlavoredMarkdown` transformer resolves these, along with Obsidian-style embeds and callouts.
- Most notes have no YAML frontmatter. Displayed dates default to git/filesystem modification time (`defaultDateType: "modified"` in the root `quartz.config.ts`); add frontmatter only when a note needs to override that.
- Notes placed under `content/private/` or `content/templates/` are excluded from the published site (Quartz `ignorePatterns`) — use `private/` for drafts or notes not meant to go public.

## Markdown
Use such markdown elements as 
-	>[!NOTE]
-	>[!TIP]
-	>[!IMPORTANT]
-	>[!WARNING]
-	>[!CAUTION]

among others