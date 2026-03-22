import { useState } from 'react'
import { getAllQuestions } from '../data'
import type { QAQuestion, SingleChoiceQuestion } from '../data'
import { useLocalizedQuestion } from '../i18n/useLocalizedQuestion'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const { localizeQuestion } = useLocalizedQuestion()
  const allQuestions = getAllQuestions().map(localizeQuestion)

  const results = query.trim().length > 0
    ? allQuestions.filter((q) => {
        const keyword = query.toLowerCase()
        if (q.question.toLowerCase().includes(keyword)) return true
        if (q.categoryName.toLowerCase().includes(keyword)) return true
        if (q.type === 'single_choice') {
          if (q.options.some((o) => o.toLowerCase().includes(keyword))) return true
          if (q.answer.toLowerCase().includes(keyword)) return true
          if (q.explanation?.toLowerCase().includes(keyword)) return true
        }
        if (q.type === 'qa') {
          if (q.referenceAnswer.toLowerCase().includes(keyword)) return true
          if (q.explanation?.toLowerCase().includes(keyword)) return true
        }
        return false
      })
    : []

  return (
    <div className="space-y-5">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋題目、選項、答案、分類..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          autoFocus
        />
      </div>

      {query.trim().length > 0 && (
        <div className="text-sm text-gray-500">找到 {results.length} 個結果</div>
      )}

      <div className="space-y-3">
        {results.map((q) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex justify-between items-start">
              <div className="text-xs text-gray-400">
                {q.bankId === 'bankA' ? '題庫 A' : '題庫 B'} · {q.categoryName} ·{' '}
                {q.type === 'single_choice' ? '選擇題' : '問答題'}
              </div>
            </div>
            <div className="font-medium text-gray-900 mt-1">{q.question}</div>
            {q.type === 'single_choice' && (
              <div className="mt-2 text-sm">
                <div className="text-gray-500">
                  {(q as SingleChoiceQuestion).options.map((o, i) => (
                    <span key={i} className={(q as SingleChoiceQuestion).answer === o ? 'text-green-600 font-medium' : ''}>
                      {String.fromCharCode(65 + i)}. {o}
                      {i < (q as SingleChoiceQuestion).options.length - 1 ? '　' : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {q.type === 'qa' && (
              <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                {(q as QAQuestion).referenceAnswer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
