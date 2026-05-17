/**
 * Interactive chat with MiMo models
 * Usage: node src/chat.js [model] [prompt]
 */
const { MiMoClient } = require('./mimo-client');
const readline = require('readline');

const API_KEY = process.env.MIMO_API_KEY;
const MODEL = process.argv[2] || 'xiaomi/mimo-v2-pro';
const PROMPT = process.argv.slice(3).join(' ');

if (!API_KEY) {
  console.error('❌ Set MIMO_API_KEY environment variable');
  console.error('   export MIMO_API_KEY=your_key_here');
  process.exit(1);
}

const client = new MiMoClient(API_KEY);

async function main() {
  if (PROMPT) {
    console.log(`\n🧠 ${MODEL}\n${'─'.repeat(40)}`);
    const res = await client.chat(MODEL, [{ role: 'user', content: PROMPT }]);
    console.log(res.choices?.[0]?.message?.content || JSON.stringify(res, null, 2));
    return;
  }

  // Interactive mode
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const messages = [{ role: 'system', content: 'You are a helpful AI assistant powered by Xiaomi MiMo.' }];

  console.log(`\n🧠 MiMo Chat (${MODEL}) — Ctrl+C to exit\n`);
  const ask = () => {
    rl.question('> ', async (input) => {
      if (!input) return ask();
      messages.push({ role: 'user', content: input });
      const res = await client.chat(MODEL, messages);
      const reply = res.choices?.[0]?.message?.content || '⚠️ Error';
      console.log(`\n${reply}\n`);
      messages.push({ role: 'assistant', content: reply });
      ask();
    });
  };
  ask();
}

main().catch(e => console.error('❌', e.message));
