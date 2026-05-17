# MiMo Integration Guide

## OpenClaw
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
export ANTHROPIC_BASE_URL=https://platform.xiaomimimo.com/api/v1
export ANTHROPIC_API_KEY=your_key
```

## Cursor
Settings → Models → Add Model → OpenAI Compatible:
- Base URL: `https://platform.xiaomimimo.com/api/v1`
- API Key: your_key
- Model: `xiaomi/mimo-v2-pro`

## Direct curl
```bash
curl https://platform.xiaomimimo.com/api/v1/chat/completions \
  -H "Authorization: Bearer $MIMO_API_KEY" \
  -d '{"model":"xiaomi/mimo-v2-pro","messages":[{"role":"user","content":"Hello"}]}'
```

## Benchmarks (SWE-bench Verified)
| Model | Score | vs Sonnet 4.5 | Cost |
|-------|-------|---------------|------|
| MiMo V2 Flash | #1 OS | Comparable | 3.5% |
| MiMo V2 Pro | Top-tier | ≈ Opus 4.6 | - |
