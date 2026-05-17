/**
 * MiMo API Client — Full featured
 */
class MiMoClient {
  constructor(config = {}) {
    this.apiKey = config.apiKey || process.env.MIMO_API_KEY;
    this.baseURL = config.baseURL || process.env.MIMO_BASE_URL || 'https://platform.xiaomimimo.com/api/v1';
    this.defaultModel = config.model || process.env.MIMO_DEFAULT_MODEL || 'xiaomi/mimo-v2-pro';
  }

  async request(endpoint, opts = {}) {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...opts.headers
      },
      ...opts
    });
    if (!res.ok) {
      const err = await res.text().catch(() => res.statusText);
      throw new Error(`MiMo API ${res.status}: ${err.slice(0,200)}`);
    }
    return res.json();
  }

  /** List available models */
  async models() {
    const data = await this.request('/models');
    return data.data || [];
  }

  /** Chat completion */
  async chat(model, messages, opts = {}) {
    return this.request('/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: model || this.defaultModel,
        messages,
        temperature: opts.temperature ?? 0.7,
        max_tokens: opts.max_tokens ?? 4096,
        stream: false,
        ...(opts.reasoning ? { reasoning: opts.reasoning } : {}),
        ...(opts.response_format ? { response_format: opts.response_format } : {}),
      })
    });
  }

  /** Stream chat completion (returns AsyncGenerator) */
  async *chatStream(model, messages, opts = {}) {
    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || this.defaultModel,
        messages,
        temperature: opts.temperature ?? 0.7,
        max_tokens: opts.max_tokens ?? 4096,
        stream: true,
      })
    });
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') return;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content || '';
            if (content) yield content;
          } catch {}
        }
      }
    }
  }

  /** Generate OpenClaw provider config */
  openClawConfig() {
    return {
      baseUrl: this.baseURL,
      apiKey: this.apiKey,
      api: 'openai-completions',
      models: [
        { id: 'xiaomi/mimo-v2-flash', name: 'MiMo V2 Flash' },
        { id: 'xiaomi/mimo-v2-pro', name: 'MiMo V2 Pro' },
        { id: 'xiaomi/mimo-v2-omni', name: 'MiMo V2 Omni' },
      ]
    };
  }

  /** Quick benchmark */
  async benchmark(model, tests = []) {
    const results = [];
    for (const test of tests) {
      const start = Date.now();
      try {
        const res = await this.chat(model, [{ role: 'user', content: test.prompt }], { max_tokens: 512 });
        const ms = Date.now() - start;
        const text = res.choices?.[0]?.message?.content || '';
        results.push({ name: test.name, ms, chars: text.length, ok: true });
      } catch (e) {
        results.push({ name: test.name, error: e.message, ok: false });
      }
    }
    return results;
  }
}

module.exports = { MiMoClient };
