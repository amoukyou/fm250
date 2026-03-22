import { useState } from 'react'
import { callAi, getRemainingCalls, canCallAi } from '../services/ai-client'
import { getExamSummaryPrompt, getPracticeSummaryPrompt } from '../services/ai-prompts'
import { useI18n } from '../i18n/context'

type ExamSummaryProps = {
  mode: 'exam'
  total: number
  correct: number
  wrongQuestions: { question: string; correctAnswer: string; selectedAnswer: string }[]
}

type PracticeSummaryProps = {
  mode: 'practice'
  total: number
  correct: number
  bankName: string
  type: string
}

type Props = ExamSummaryProps | PracticeSummaryProps

export default function AiSummary(props: Props) {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { locale } = useI18n()

  const remaining = getRemainingCalls()
  const available = canCallAi()

  async function handleGenerate() {
    setLoading(true)
    setError(null)

    let prompt
    if (props.mode === 'exam') {
      prompt = getExamSummaryPrompt({
        total: props.total,
        correct: props.correct,
        wrongQuestions: props.wrongQuestions,
      })
    } else {
      prompt = getPracticeSummaryPrompt({
        total: props.total,
        correct: props.correct,
        bankName: props.bankName,
        type: props.type,
      })
    }

    if (locale === 'zh-CN') {
      prompt.systemPrompt = prompt.systemPrompt.replace('繁體中文', '简体中文')
    } else if (locale === 'en') {
      prompt.systemPrompt = 'You are an expert tutor for Taiwan ultralight aircraft pilot exams. Provide a study report in English, concise and encouraging.'
    }

    const res = await callAi({ ...prompt, maxTokens: props.mode === 'exam' ? 300 : 100 })
    setLoading(false)

    if (res.error) {
      setError(res.error === 'LIMIT_REACHED'
        ? (locale === 'en' ? 'Daily AI limit reached' : '今日 AI 額度已用完')
        : (locale === 'en' ? 'AI unavailable' : 'AI 暫時無法使用'))
    } else {
      setResult(res.content)
    }
  }

  if (result) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.09 8.26L22 9.27L16 14.14L18.18 21.02L12 17.77L5.82 21.02L8 14.14L2 9.27L9.91 8.26L12 2Z" />
          </svg>
          <span className="text-sm font-bold text-purple-700">
            {locale === 'en' ? 'AI Study Report' : 'AI 學習報告'}
          </span>
        </div>
        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{result}</div>
        <button
          onClick={() => { setResult(null) }}
          className="mt-3 text-xs text-purple-500 hover:text-purple-700 transition"
        >
          {locale === 'en' ? 'Regenerate' : '重新生成'}
        </button>
      </div>
    )
  }

  return (
    <div>
      {error && <div className="text-xs text-rose-500 mb-2 text-center">{error}</div>}
      <button
        onClick={handleGenerate}
        disabled={loading || !available}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium
          bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md
          hover:from-purple-600 hover:to-indigo-600
          disabled:opacity-40 disabled:cursor-not-allowed
          active:scale-[0.98] transition"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 019.95 9" strokeLinecap="round" />
            </svg>
            <span>{locale === 'en' ? 'Generating report...' : 'AI 生成報告中...'}</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.09 8.26L22 9.27L16 14.14L18.18 21.02L12 17.77L5.82 21.02L8 14.14L2 9.27L9.91 8.26L12 2Z" />
            </svg>
            <span>{locale === 'en' ? 'AI Study Report' : 'AI 學習報告'}</span>
            <span className="text-white/60 text-xs">({remaining})</span>
          </>
        )}
      </button>
    </div>
  )
}
