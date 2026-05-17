/**
 * Verify project structure is complete
 */
const fs = require('fs');
const path = require('path');

const required = [
  'package.json', 'index.js', 'cli.js', '.env.example',
  'src/client.js', 'src/cli.js', 'scripts/demo.js', 'scripts/verify.js',
  'docs/integration.md',
];

const optional = [
  '.github/workflows/test.yml',
];

console.log('\n🔍 MiMo Agent Kit — Structure Check\n');

let allOk = true;
required.forEach(f => {
  const exists = fs.existsSync(f);
  console.log(`  ${exists ? '✅' : '❌'} ${f}`);
  if (!exists) allOk = false;
});

console.log(`\n  ${allOk ? '✅ All required files present' : '❌ Some files missing'}`);

// Show project summary
const pkg = JSON.parse(fs.readFileSync('package.json'));
console.log(`\n  📦 ${pkg.name} v${pkg.version}`);
console.log(`  📝 ${pkg.description}`);

// Check API key
console.log(`\n  🔑 API Key: ${process.env.MIMO_API_KEY ? '✅ Set' : '⚠️  Not set (demo mode)'}`);
console.log('');
