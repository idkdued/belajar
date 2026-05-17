/**
 * Generate OpenClaw provider config for Xiaomi MiMo
 * Output: JSON config snippet to add to openclaw.json
 */
const { MiMoClient } = require('./mimo-client');

const config = new MiMoClient('YOUR_API_KEY_HERE').getOpenClawConfig();
console.log(JSON.stringify(config, null, 2));
console.log('\n📌 Add this to your openclaw.json under models.providers');
