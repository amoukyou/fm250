const SYSTEM_PROMPT = '你是飛行考試導師。回答限制在100字以內，不要廢話，直接說重點。用繁體中文。'

export function getExplanationPrompt(params: {
  question: string
  options: string[]
  correctAnswer: string
  selectedAnswer: string
}): { systemPrompt: string; userPrompt: string } {
  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: `題：${params.question}
正確：${params.correctAnswer}
你選：${params.selectedAnswer}

用2-3句話說：為什麼選這個對、選那個錯。最後給一句記憶口訣。總共不超過80字。`,
  }
}

export function getQaExplanationPrompt(params: {
  question: string
  referenceAnswer: string
  rating: 'fuzzy' | 'dont_know'
}): { systemPrompt: string; userPrompt: string } {
  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: `問：${params.question}
答：${params.referenceAnswer}

用大白話3句話講清楚這個知識點，加一句記憶口訣。不超過80字。`,
  }
}

export function getExamSummaryPrompt(params: {
  total: number
  correct: number
  wrongQuestions: { question: string; correctAnswer: string; selectedAnswer: string }[]
}): { systemPrompt: string; userPrompt: string } {
  const pct = Math.round((params.correct / params.total) * 100)
  const wrongList = params.wrongQuestions
    .slice(0, 8)
    .map((q) => `- ${q.question.slice(0, 30)}...`)
    .join('\n')

  return {
    systemPrompt: '你是飛行考試導師。用繁體中文，簡潔有力，總結限200字以內。',
    userPrompt: `模擬考結果：${params.total}題對${params.correct}題，${pct}%
錯題：
${wrongList}

請用200字以內給出：弱點在哪、怎麼複習、一句鼓勵。`,
  }
}

export function getPracticeSummaryPrompt(params: {
  total: number
  correct: number
  bankName: string
  type: string
}): { systemPrompt: string; userPrompt: string } {
  const pct = Math.round((params.correct / params.total) * 100)
  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: `完成${params.bankName}${params.type}：${params.total}題對${params.correct}題(${pct}%)。用2句話評價+1句建議。不超過60字。`,
  }
}

export function getDeepExplainPrompt(params: {
  question: string
  answer: string
}): { systemPrompt: string; userPrompt: string } {
  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: `題：${params.question}
答：${params.answer}

用3句話講清楚原理和實際飛行中的意義。不超過80字。`,
  }
}
