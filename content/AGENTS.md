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
- Notes placed under `content/private/` or `content/templates/` are excluded from the published site (Quartz `ignorePatterns`) — use `private/` for drafts or notes not meant to go public (it is also git-ignored, so it is never pushed).

## Markdown

- Callouts: `>[!NOTE]`, `>[!TIP]`, `>[!IMPORTANT]`, `>[!WARNING]`, `>[!CAUTION]`, among others.
- Lists: write every run of parallel items as a Markdown list, one `- ` per item, no blank lines between items:
  - wikilinks in hub notes and `index.md`: `- [[Note Name]]`, one per line
  - a bold term with its description: `- **Term**: description`
  - emoji-led lines: `- ✅ text`
  - ordered steps: `1.`, `2.`, … numbered continuously through the whole sequence
- Indent whatever belongs to a list item (code fences, sub-lists) under that item, so the list stays one unbroken list.
- Text pasted from chats or web pages usually arrives with its list markers stripped (bare lines, bold-term paragraphs, emoji lines); restore them when adding or editing such a note.