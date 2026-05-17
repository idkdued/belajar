# 🤖 MiMo Agent Kit

**Xiaomi MiMo AI Agent Integration** — Deploy MiMo's flagship LLMs in OpenClaw, Claude Code, and Cursor.

[![Verify](https://github.com/idkdued/belajar/actions/workflows/test.yml/badge.svg)](https://github.com/idkdued/belajar/actions)

## 🚀 Models

| Model | Params | Context | Cost / 1M in | Performance |
|-------|--------|---------|-------------|-------------|
| **MiMo V2 Flash** ⚡ | 309B MoE (15B active) | 256K | $0.10 / $0.30 | SWE-bench #1 open-source |
| **MiMo V2 Pro** 🧠 | 1T+ | **1M** | $1.00 / $3.00 | Approaches Opus 4.6 |
| **MiMo V2 Omni** 👁️ | Multimodal | 256K | $0.40 / $2.00 | Image, Video, Audio |

## 📦 Quick Start

```bash
# 1. Set API key
export MIMO_API_KEY=your_key_here

# 2. List models
npx mimo models

# 3. Chat
npx mimo chat "What can MiMo do?"

# 4. Interactive
npx mimo chat
```

## 🔌 Integrations

### OpenClaw
```json
{
  "xiaomi": {
    "baseUrl": "https://platform.xiaomimimo.com/api/v1",
    "apiKey": "YOUR_KEY",
    "api": "openai-completions",
    "models": [
      {"id": "xiaomi/mimo-v2-flash", "name": "MiMo V2 Flash"},
      {"id": "xiaomi/mimo-v2-pro",   "name": "MiMo V2 Pro"},
      {"id": "xiaomi/mimo-v2-omni",  "name": "MiMo V2 Omni"}
    ]
  }
}
```

### Claude Code
```bash
export ANTHROPIC_BASE_URL=https://platform.xiaomimimo.com/api/v1
export ANTHROPIC_API_KEY=your_key
```

### Cursor
Settings → Models → Add Model → OpenAI Compatible:
- **Base URL**: `https://platform.xiaomimimo.com/api/v1`
- **Model**: `xiaomi/mimo-v2-pro`

## 📁 Project Structure

```
├── cli.js              # CLI entry (npx mimo)
├── index.js            # Library entry
├── src/
│   ├── client.js       # Full API client + streaming
│   └── cli.js          # CLI commands (chat, bench, config, doctor)
├── scripts/
│   ├── demo.js         # Showcase mode
│   └── verify.js       # Structure check
├── docs/
│   └── integration.md  # Integration guides
└── .github/workflows/  # CI pipeline
```

## 🧪 Commands

| Command | Description |
|---------|-------------|
| `mimo models` | List available models |
| `mimo chat` | Interactive chat |
| `mimo chat "hello"` | One-shot chat |
| `mimo bench` | Run benchmarks |
| `mimo config` | OpenClaw config |
| `mimo doctor` | Check setup |

## 📊 Why MiMo?

- **Cost**: Flash costs ~3.5% of Claude Sonnet 4.5
- **Performance**: SWE-bench Verified #1 open-source model
- **Context**: Pro model has 1M token context window
- **Agent-ready**: Built for OpenClaw, Claude Code, and Cursor

## 📝 License

MIT — built for the Xiaomi MiMo 100T Token Creator Incentive Program.
