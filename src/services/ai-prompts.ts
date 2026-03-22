const SYSTEM_PROMPT = '你是台灣超輕型載具飛行考試的專業導師。用繁體中文回答，簡潔扼要，重點突出。'

export function getExplanationPrompt(params: {
  question: string
  options: string[]
  correctAnswer: string
  selectedAnswer: string
}): { systemPrompt: string; userPrompt: string } {
  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: `題目：${params.question}
選項：
${params.options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join('\n')}
正確答案：${params.correctAnswer}
學生選擇：${params.selectedAnswer}

請用 3-5 句話解釋：
1. 為什麼正確答案是對的
2. 為什麼學生選的答案是錯的
3. 一句話記憶技巧`,
  }
}

export function getQaExplanationPrompt(params: {
  question: string
  referenceAnswer: string
  rating: 'fuzzy' | 'dont_know'
}): { systemPrompt: string; userPrompt: string } {
  const ratingText = params.rating === 'fuzzy' ? '模糊' : '不會'
  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: `問答題：${params.question}
參考答案：${params.referenceAnswer}
學生自評：${ratingText}

請用簡單易懂的方式重新解釋這個知識點，幫助學生理解和記憶。包括：
1. 核心概念（用大白話解釋）
2. 為什麼這很重要（實際飛行中的意義）
3. 記憶口訣或技巧`,
  }
}

export function getExamSummaryPrompt(params: {
  total: number
  correct: number
  wrongQuestions: { question: string; correctAnswer: string; selectedAnswer: string }[]
}): { systemPrompt: string; userPrompt: string } {
  const pct = Math.round((params.correct / params.total) * 100)
  const wrongList = params.wrongQuestions
    .slice(0, 10) // Cap at 10 to save tokens
    .map((q, i) => `${i + 1}. 題：${q.question}\n   正確：${q.correctAnswer}\n   你選：${q.selectedAnswer}`)
    .join('\n')

  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: `學生完成了模擬考試：
總題數：${params.total}，正確：${params.correct}，正確率：${pct}%

答錯的題目：
${wrongList}

請提供學習報告：
1. 🎯 弱點分析：哪些知識領域需要加強
2. 🔍 錯誤模式：是否有共同的錯誤類型
3. 📚 複習建議：具體要複習哪些概念
4. 💪 鼓勵的話`,
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
    userPrompt: `學生完成了「${params.bankName}」的${params.type}練習：
總題數：${params.total}，正確：${params.correct}，正確率：${pct}%

請簡短評價（3-4句話）：
1. 表現如何
2. 下一步建議
3. 鼓勵的話`,
  }
}

export function getDeepExplainPrompt(params: {
  question: string
  answer: string
}): { systemPrompt: string; userPrompt: string } {
  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt: `題目：${params.question}
答案：${params.answer}

請深入講解這個航空知識點：
1. 詳細原理
2. 在實際飛行中的應用
3. 相關的延伸知識`,
  }
}
