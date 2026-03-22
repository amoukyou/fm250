import { useState } from 'react'
import { callAi, getRemainingCalls, canCallAi } from '../services/ai-client'
import { getExplanationPrompt, getQaExplanationPrompt, getDeepExplainPrompt } from '../services/ai-prompts'
import { useI18n } from '../i18n/context'

type McProps = {
  mode: 'mc-wrong'
  question: string
  options: string[]
  correctAnswer: string
  selectedAnswer: string
}

type QaProps = {
  mode: 'qa'
  question: string
  referenceAnswer: string
  rating: 'fuzzy' | 'dont_know'
}

type DeepProps = {
  mode: 'deep'
  question: string
  answer: string
}

type Props = McProps | QaProps | DeepProps

export default function AiExplanation(props: Props) {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { locale } = useI18n()

  const remaining = getRemainingCalls()
  const available = canCallAi()

  async function handleAsk() {
    setLoading(true)
    setError(null)

    let prompt
    if (props.mode === 'mc-wrong') {
      prompt = getExplanationPrompt({
        question: props.question,
        options: props.options,
        correctAnswer: props.correctAnswer,
        selectedAnswer: props.selectedAnswer,
      })
    } else if (props.mode === 'qa') {
      prompt = getQaExplanationPrompt({
        question: props.question,
        referenceAnswer: props.referenceAnswer,
        rating: props.rating,
      })
    } else {
      prompt = getDeepExplainPrompt({
        question: props.question,
        answer: props.answer,
      })
    }

    // Add locale hint
    if (locale === 'zh-CN') {
      prompt.systemPrompt = prompt.systemPrompt.replace('繁體中文', '简体中文')
    } else if (locale === 'en') {
      prompt.systemPrompt = 'You are an expert tutor for Taiwan ultralight aircraft pilot exams. Answer in English, concise and clear.'
    }

    const res = await callAi({ ...prompt, maxTokens: props.mode === 'deep' ? 600 : 400 })
    setLoading(false)

    if (res.error) {
      if (res.error === 'LIMIT_REACHED') {
        setError(locale === 'en' ? 'Daily AI limit reached' : locale === 'zh-CN' ? '今日AI额度已用完' : '今日 AI 額度已用完')
      } else {
        setError(locale === 'en' ? 'AI unavailable, try again later' : locale === 'zh-CN' ? 'AI暂时无法使用' : 'AI 暫時無法使用')
      }
    } else {
      setResult(res.content)
    }
  }

  if (result) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 mt-3">
        <div className="flex items-center gap-2 mb-2">
          <SparkleIcon />
          <span className="text-xs font-semibold text-purple-600">AI {locale === 'en' ? 'Analysis' : '解析'}</span>
          <span className="text-xs text-purple-400 ml-auto">{remaining} {locale === 'en' ? 'left today' : '次剩餘'}</span>
        </div>
        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{result}</div>
      </div>
    )
  }

  return (
    <div className="mt-3">
      {error && (
        <div className="text-xs text-rose-500 mb-2 text-center">{error}</div>
      )}
      <button
        onClick={handleAsk}
        disabled={loading || !available}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium
          bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm
          hover:from-purple-600 hover:to-indigo-600
          disabled:opacity-40 disabled:cursor-not-allowed
          active:scale-[0.98] transition"
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span>{locale === 'en' ? 'AI thinking...' : 'AI 思考中...'}</span>
          </>
        ) : (
          <>
            <SparkleIcon />
            <span>{props.mode === 'deep'
              ? (locale === 'en' ? 'Deep Explain' : 'AI 深度講解')
              : (locale === 'en' ? 'AI Explain' : 'AI 解析')
            }</span>
            <span className="text-white/60 text-xs">({remaining})</span>
          </>
        )}
      </button>
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.09 8.26L22 9.27L16 14.14L18.18 21.02L12 17.77L5.82 21.02L8 14.14L2 9.27L9.91 8.26L12 2Z" />
    </svg>
  )
}

function LoadingSpinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 019.95 9" strokeLinecap="round" />
    </svg>
  )
}
