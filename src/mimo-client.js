/**
 * Xiaomi MiMo API Client
 * Base URL: https://platform.xiaomimimo.com/api/v1
 */
class MiMoClient {
  constructor(apiKey, baseURL = 'https://platform.xiaomimimo.com/api/v1') {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  async listModels() {
    const res = await fetch(`${this.baseURL}/models`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    return res.json();
  }

  async chat(model, messages, options = {}) {
    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 4096,
        stream: options.stream ?? false,
        ...(options.reasoning ? { reasoning: options.reasoning } : {})
      })
    });
    return res.json();
  }

  // OpenClaw-compatible format
  getOpenClawConfig() {
    return {
      provider: 'xiaomi',
      baseUrl: this.baseURL,
      api: 'openai-completions',
      models: [
        { id: 'xiaomi/mimo-v2-flash', name: 'MiMo V2 Flash' },
        { id: 'xiaomi/mimo-v2-pro',   name: 'MiMo V2 Pro' },
        { id: 'xiaomi/mimo-v2-omni',  name: 'MiMo V2 Omni' }
      ]
    };
  }
}

module.exports = { MiMoClient };
