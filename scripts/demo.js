#!/usr/bin/env node
/**
 * MiMo Demo — showcase mode (no API key needed for structure demo)
 * 
 * Run: node scripts/demo.js
 */
const { MiMoClient } = require('../src/client');

console.log(`
╔══════════════════════════════════════════════════╗
║        Xiaomi MiMo Agent Integration Kit         ║
║           🚀 Ready for Deployment                ║
╚══════════════════════════════════════════════════╝
`);

const models = [
  { id: 'xiaomi/mimo-v2-flash', name: 'MiMo V2 Flash', params: '309B MoE', ctx: '256K', note: 'SWE-bench #1 OS' },
  { id: 'xiaomi/mimo-v2-pro',   name: 'MiMo V2 Pro',   params: '1T+',        ctx: '1M',  note: '≈ Opus 4.6' },
  { id: 'xiaomi/mimo-v2-omni',  name: 'MiMo V2 Omni',  params: 'Multimodal', ctx: '256K', note: 'Image/Audio/Video' },
];

console.log('📦 Models:\n');
models.forEach(m => {
  console.log(`  ${m.id}`);
  console.log(`    ${m.name} | ${m.params} | ${m.ctx} ctx | ${m.note}`);
});

console.log(`
🔌 Integrations:
  ✓ OpenClaw    → Agent framework provider config
  ✓ Claude Code → Custom API endpoint
  ✓ Cursor IDE  → OpenAI-compatible provider
  ✓ CLI         → Terminal chat & benchmark
  ✓ Streaming   → Real-time response

📊 Architecture:
  [Your App] → [MiMo Client] → [Xiaomi MiMo API]
       ↓              ↓
  [OpenClaw]    [Benchmark Suite]

⚡ Quick Start:
  export MIMO_API_KEY=your_key
  npx mimo chat "Hello MiMo!"

📁 https://github.com/idkdued/belajar
`);

if (!process.env.MIMO_API_KEY) {
  console.log('⚠️  No MIMO_API_KEY set — demo mode (structure only)');
  console.log('   Set key to run actual API calls\n');
}
