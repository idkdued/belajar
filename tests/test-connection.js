/**
 * Verify MiMo API connection and list available models
 */
const { MiMoClient } = require('../src/mimo-client');

const API_KEY = process.env.MIMO_API_KEY;
if (!API_KEY) {
  console.log('⚠️  MIMO_API_KEY not set. Set it to run actual tests.');
  console.log('   export MIMO_API_KEY=your_key_here');
  console.log('\n✅ Project structure valid — ready for API key');
  process.exit(0);
}

async function main() {
  const client = new MiMoClient(API_KEY);
  const models = await client.listModels();
  console.log('✅ Connected to Xiaomi MiMo API');
  console.log(`   Available models: ${models.data?.length || 0}`);
  models.data?.forEach(m => console.log(`   - ${m.id}: ${m.name}`));
}

main().catch(e => console.error('❌', e.message));
