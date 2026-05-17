# 🤖 MiMo Agent Integration

**Xiaomi MiMo AI Agent Integration** — Connects Xiaomi's MiMo LLMs with OpenClaw, Claude Code, and Cursor.

## Why MiMo?
- **MiMo-V2-Pro**: 1T+ params, 1M context — approaches Opus 4.6 level
- **MiMo-V2-Flash**: 309B MoE, SWE-bench #1 open-source — comparable to Sonnet 4.5 at 3.5% cost
- **MiMo-V2-Omni**: Native image/video/audio understanding

## Project Structure
```
├── src/
│   ├── mimo-client.js       # API client
│   ├── chat.js              # Interactive chat
│   └── setup-provider.js    # OpenClaw config generator
├── tests/
│   ├── test-connection.js   # Connection verification
│   └── benchmark.js         # Model benchmark
├── docs/
│   └── integration-guide.md # Setup guides
└── package.json
```

## Quick Start
```bash
export MIMO_API_KEY=your_key_here
node src/chat.js xiaomi/mimo-v2-pro "Hello!"
```

## Integration
- [x] OpenClaw provider config
- [x] Claude Code support
- [x] Cursor IDE support
- [x] Direct API access

## 100T Token Program
This project was created as part of the Xiaomi MiMo 100 Trillion Token Creator Incentive Program.
Apply at: https://100t.xiaomimimo.com/
