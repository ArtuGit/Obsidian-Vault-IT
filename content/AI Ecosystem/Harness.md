An **AI agent harness** is the runtime shell that wraps a large language model and turns it into a working agent. The model provides reasoning and language understanding; the harness provides everything else — tool access, configuration, permissions, lifecycle management, and extensibility. Without a harness the model is a stateless text-completion engine. With one it can read files, run commands, call APIs, and act on multi-step plans.

Examples of harnesses include [[Claude Code]], Cursor, Windsurf, Cline, Aider, and similar coding-agent products. Each harness exposes a different surface area of capabilities to the underlying model, which is why the same LLM can behave very differently depending on which harness runs it.

---

## What the harness is responsible for

The harness sits between the user and the model. It:

- **Delivers the system prompt** — the base instructions that shape the model's persona and rules
- **Manages the conversation loop** — sending messages, receiving completions, handling tool calls, and feeding results back
- **Enforces permissions** — deciding which tool calls require user approval and which run automatically
- **Provides tools** — file I/O, shell access, browser automation, search, and anything registered via protocols like MCP
- **Runs hooks** — user-defined shell commands triggered by harness events (tool calls, notifications, session start)
- **Loads configuration** — settings files, environment variables, keybindings, and project-level instructions

The model itself has no direct access to the filesystem, the network, or any external system. Every interaction with the outside world goes through the harness.

---

## Skills

**Skills are packaged instruction sets** that the harness loads into the model's context on demand. They are not code that executes independently — they are prompts with structure: a name, a description trigger, and a body of instructions the model follows when the skill is invoked.

- Defined as `.md` files (typically under `.claude/skills/` or installed via plugins)
- Invoked explicitly by the user (`/skill-name`) or automatically by the model when it recognises a matching task
- Loaded into the conversation context at invocation time — the model reads the skill's instructions and follows them
- Can include checklists, workflows, reference files, and decision trees
- Scoped to a project directory or global

Skills are **part of the harness**, not the model. The harness discovers, indexes, and injects them. The model only sees a skill's content after the harness places it in the prompt. A skill like `systematic-debugging` changes the model's approach to a bug by giving it a structured diagnostic workflow to follow, but the harness is what made that workflow available.

---

## MCP (Model Context Protocol)

**MCP servers are external tool providers** that the harness connects to, exposing new capabilities to the model through a standardised protocol.

- Each MCP server registers one or more tools (functions the model can call)
- The harness discovers MCP servers from configuration, starts or connects to them, and lists their tools alongside built-in ones
- From the model's perspective, an MCP tool is indistinguishable from a native tool — the harness abstracts the boundary
- MCP servers can run locally (a process on the same machine) or remotely (a hosted service)
- Examples: a Chrome browser automation server, a Notion connector, a Dropbox connector, a database query server

MCP is **a protocol the harness implements**. The harness is the MCP client; external servers are the MCP servers. The model never communicates with an MCP server directly — it calls a tool by name, and the harness routes that call to the appropriate server.

---

## Agent definition files (.md)

**Agent definition files** describe specialised sub-agents that the harness can spawn. They are Markdown files with YAML frontmatter that specify:

- **Model** — which LLM to use for this agent (can differ from the parent session's model)
- **Tools** — which tools the agent has access to (can be a subset or superset of the parent's tools)
- **Description** — when and why to use this agent type
- **Instructions** — the system prompt for the spawned agent

Typically stored in `.claude/agents/`, these files let a single harness session dispatch work to purpose-built agents. For example, an `Explore` agent might have read-only tools and a fast model for quick code searches, while a `Plan` agent might have no write tools but deep reasoning capabilities.

Agent definitions are **part of the harness configuration**. The harness reads them, presents them as available agent types, and handles spawning, messaging, and collecting results. The model references agent types by name; the harness does the orchestration.

---

## Hooks

**Hooks are shell commands** that the harness executes in response to specific events, outside the model's control.

- Configured in `settings.json` (project or user level)
- Triggered by events like: a tool call is about to run, a tool call just finished, a notification fires, the session starts
- Run as regular shell processes — they can log, validate, transform, block, or notify
- The model does not invoke hooks — the harness does, automatically, based on its event system
- Hook output is fed back to the model as context (e.g., a pre-tool hook can block a dangerous command and explain why)

Hooks are **purely a harness mechanism**. They exist to let users automate behaviours ("every time Claude edits a file, run the linter") without relying on the model to remember to do so. The model sees hook feedback but cannot create, modify, or disable hooks.

---

## How they relate

| Component          | What it is                           | Part of harness? | Model's relationship to it                       |
| ------------------ | ------------------------------------ | ----------------- | ------------------------------------------------- |
| **Harness**        | The runtime shell around the model   | —                 | Runs inside it; depends on it for all I/O         |
| **Skills**         | Packaged prompt instructions         | Yes               | Reads and follows them when loaded                |
| **MCP servers**    | External tool providers via protocol | Connected to it   | Calls their tools through the harness             |
| **Agent files**    | Sub-agent definitions                | Yes (config)      | References agent types; harness handles spawning  |
| **Hooks**          | Event-driven shell commands          | Yes               | Sees their output; cannot control them            |

The harness is the integrating layer. Skills shape what the model knows how to do. MCP servers expand what tools are available. Agent definitions enable delegation. Hooks enforce automated behaviours. Together, they form the complete agent runtime — but the harness is the substrate that makes all of it work.
