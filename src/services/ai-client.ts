import { canCallAi, recordAiCall, getRemainingCalls } from './ai-rate-limit'

const _a = 'FQYfDANLRw1DSwJV'
const _b = 'W1MJQBlCW1UJTFMO'
const _c = 'BlEBHRQNEUVWXlo='
const _s = [102,109,50,53,48,45,117,108,116,114,97,108,105,103,104,116,45,112,105,108,111,116]

function _dk(): string {
  const salt = _s.map((c) => String.fromCharCode(c)).join('')
  const raw = atob(_a + _b + _c)
  let r = ''
  for (let i = 0; i < raw.length; i++) {
    r += String.fromCharCode(raw.charCodeAt(i) ^ salt.charCodeAt(i % salt.length))
  }
  return r
}

const AI_ENDPOINT = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
const AI_MODEL = 'qwen-plus'

export type AiCallParams = {
  systemPrompt: string
  userPrompt: string
  maxTokens?: number
  temperature?: number
}

export type AiResult = {
  content: string
  error?: string
}

export async function callAi(params: AiCallParams): Promise<AiResult> {
  if (!canCallAi()) {
    return { content: '', error: 'LIMIT_REACHED' }
  }

  try {
    const key = _dk()
    const res = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: 'system', content: params.systemPrompt },
          { role: 'user', content: params.userPrompt },
        ],
        max_tokens: params.maxTokens ?? 500,
        temperature: params.temperature ?? 0.7,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('AI API error:', res.status, errText)
      return { content: '', error: `API_ERROR_${res.status}` }
    }

    const data = await res.json()
    recordAiCall()
    const content = data.choices?.[0]?.message?.content ?? ''
    return { content }
  } catch (err) {
    console.error('AI call failed:', err)
    return { content: '', error: 'NETWORK_ERROR' }
  }
}

export { getRemainingCalls, canCallAi }
