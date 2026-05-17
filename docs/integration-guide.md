# Xiaomi MiMo API Integration Guide

## OpenClaw Integration
Add this to your `openclaw.json`:
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

## Claude Code
```bash
export CLAUDE_CODE_BASE_URL=https://platform.xiaomimimo.com/api/v1
export CLAUDE_CODE_API_KEY=your_key
```

## Cursor
Settings → Models → Add Model:
- Provider: OpenAI Compatible
- Base URL: https://platform.xiaomimimo.com/api/v1
- API Key: your_key
- Model: xiaomi/mimo-v2-pro

## Direct API
```bash
curl https://platform.xiaomimimo.com/api/v1/chat/completions \
  -H "Authorization: Bearer $MIMO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"xiaomi/mimo-v2-pro","messages":[{"role":"user","content":"Hello"}]}'
```

## Models
| Model | Params | Context | Use Case |
|-------|--------|---------|----------|
| MiMo-V2-Flash | 309B MoE (15B active) | 256K | Fast, coding, reasoning |
| MiMo-V2-Pro | 1T+ | 1M | Agent, complex tasks |
| MiMo-V2-Omni | Multimodal | 256K | Image/Video/Audio |
