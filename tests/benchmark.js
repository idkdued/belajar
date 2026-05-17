/**
 * Simple benchmark comparing MiMo models
 * Tests: reasoning, coding, speed
 */
const { MiMoClient } = require('../src/mimo-client');

const API_KEY = process.env.MIMO_API_KEY;
const TESTS = [
  { name: 'Logic', prompt: 'If 5 cats catch 5 mice in 5 minutes, how many cats are needed to catch 100 mice in 100 minutes?' },
  { name: 'Code',  prompt: 'Write a function to find the longest palindrome substring in JavaScript' },
  { name: 'Math',  prompt: 'Calculate 123456789 × 987654321 step by step' },
];

async function main() {
  if (!API_KEY) {
    console.log('⚠️  Set MIMO_API_KEY to run benchmarks\n');
    console.log('Test cases ready:');
    TESTS.forEach(t => console.log(`  📝 ${t.name}: ${t.prompt.slice(0, 60)}...`));
    process.exit(0);
  }

  const client = new MiMoClient(API_KEY);
  const models = ['xiaomi/mimo-v2-flash', 'xiaomi/mimo-v2-pro'];

  for (const model of models) {
    console.log(`\n🧪 Testing: ${model}`);
    for (const test of TESTS) {
      const start = Date.now();
      const res = await client.chat(model, [{ role: 'user', content: test.prompt }], { max_tokens: 1024 });
      const time = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`   ${test.name}: ${time}s | ${res.choices?.[0]?.message?.content?.length || 0} chars`);
    }
  }
}

main().catch(e => console.error('❌', e.message));
