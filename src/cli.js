const { MiMoClient } = require('./client');
const readline = require('readline');

const [,, cmd, ...args] = process.argv;
const client = new MiMoClient();

async function main() {
  switch (cmd) {
    case 'models': {
      const models = await client.models();
      console.log('\n🧠 MiMo Models:\n');
      models.forEach(m => {
        console.log(`  ${m.id}`);
        console.log(`    ${m.name}`);
        console.log(`    Context: ${(m.context_length/1024).toFixed(0)}K | Price: $${parseFloat(m.pricing?.prompt || 0)*1e6}/1M in\n`);
      });
      break;
    }

    case 'chat': {
      const prompt = args.join(' ');
      const model = process.env.MIMO_MODEL || 'xiaomi/mimo-v2-pro';
      
      if (prompt) {
        console.log(`\n🧠 ${model}\n${'─'.repeat(40)}`);
        const res = await client.chat(model, [{ role: 'user', content: prompt }]);
        console.log(res.choices?.[0]?.message?.content || '⚠️ No response');
        return;
      }

      // Interactive
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const msgs = [{ role: 'system', content: 'You are MiMo, Xiaomi's flagship AI.' }];
      console.log(`\n🧠 MiMo (${model}) — Ctrl+C to exit\n`);
      const ask = () => {
        rl.question('> ', async (input) => {
          if (!input) return ask();
          msgs.push({ role: 'user', content: input });
          const res = await client.chat(model, msgs);
          const reply = res.choices?.[0]?.message?.content || '⚠️ Error';
          console.log(`\n${reply}\n`);
          msgs.push({ role: 'assistant', content: reply });
          ask();
        });
      };
      ask();
      break;
    }

    case 'bench': {
      console.log('\n🧪 MiMo Benchmark\n');
      const tests = [
        { name: 'Logic', prompt: 'If 5 cats catch 5 mice in 5 minutes, how many cats for 100 mice in 100 minutes?' },
        { name: 'Code', prompt: 'Write a JS function to merge two sorted arrays in O(n)' },
        { name: 'Math', prompt: 'Calculate 123456789 × 987654321' },
      ];
      const models = ['xiaomi/mimo-v2-flash', 'xiaomi/mimo-v2-pro'];
      for (const model of models) {
        const results = await client.benchmark(model, tests);
        console.log(`\n  ${model}:`);
        results.forEach(r => {
          const time = (r.ms/1000).toFixed(1);
          console.log(`    ${r.name}: ${r.ok ? `✅ ${time}s (${r.chars} chars)` : `❌ ${r.error}`}`);
        });
      }
      break;
    }

    case 'config': {
      const cfg = client.openClawConfig();
      console.log('\n📋 OpenClaw Provider Config:\n');
      console.log(JSON.stringify(cfg, null, 2));
      console.log('\nAdd this to openclaw.json under models.providers');
      break;
    }

    case 'doctor': {
      console.log('\n🔍 MiMo Doctor\n');
      console.log(`  API Key:     ${client.apiKey ? '✅ Set' : '❌ Missing'}`);
      console.log(`  Base URL:    ${client.baseURL}`);
      console.log(`  Default:     ${client.defaultModel}`);
      if (client.apiKey) {
        try {
          const models = await client.models();
          console.log(`  Connection:  ✅ (${models.length} models)`);
        } catch(e) {
          console.log(`  Connection:  ❌ ${e.message.slice(0,60)}`);
        }
      }
      break;
    }

    default: {
      console.log(`
MiMo Agent Kit v2.0

Usage:
  mimo models         List available models
  mimo chat           Interactive chat
  mimo chat "<txt>"   One-shot chat
  mimo bench          Run benchmark
  mimo config         Show OpenClaw config
  mimo doctor         Check setup

Docs: https://github.com/idkdued/belajar
      `);
    }
  }
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
