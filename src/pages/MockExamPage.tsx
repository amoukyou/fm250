import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllQuestions } from '../data'
import type { SingleChoiceQuestion } from '../data'
import { MOCK_EXAM_QUESTION_COUNT } from '../data/config'
import { addAnswerRecord } from '../store/storage'

export default function MockExamPage() {
  const navigate = useNavigate()

  const questions = useMemo(() => {
    const allMC = getAllQuestions().filter(
      (q): q is SingleChoiceQuestion => q.type === 'single_choice'
    )
    return [...allMC].sort(() => Math.random() - 0.5).slice(0, MOCK_EXAM_QUESTION_COUNT)
  }, [])

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const q = questions[currentIndex]

  function selectAnswer(option: string) {
    setAnswers((prev) => ({ ...prev, [q.id]: option }))
  }

  function handleSubmit() {
    for (const question of questions) {
      const selected = answers[question.id]
      const correct = selected === question.answer
      addAnswerRecord(question.id, { correct, timestamp: Date.now() })
    }

    const score = questions.filter((question) => answers[question.id] === question.answer).length
    navigate('/mock-result', {
      state: { questions, answers, score, total: questions.length },
    })
  }

  const answeredCount = Object.keys(answers).length

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-900">模擬考試</h1>
        <div className="text-sm text-gray-500">
          已答 {answeredCount} / {questions.length}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-8 h-8 rounded-full text-xs font-medium border transition ${
              i === currentIndex
                ? 'bg-blue-600 text-white border-blue-600'
                : answers[questions[i].id]
                  ? 'bg-blue-100 text-blue-700 border-blue-200'
                  : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-5">
        <div className="text-sm text-gray-400 mb-2">
          第 {currentIndex + 1} 題 · {q.categoryName}
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{q.question}</h2>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const selected = answers[q.id] === opt
            return (
              <button
                key={i}
                className={`border rounded-lg p-3 text-left w-full transition ${
                  selected
                    ? 'bg-blue-50 border-blue-400 text-blue-800'
                    : 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                }`}
                onClick={() => selectAnswer(opt)}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-white border shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          ← 上一題
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-sm hover:bg-blue-700"
          >
            下一題 →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-green-600 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
          >
            提交答卷 ({answeredCount}/{questions.length})
          </button>
        )}
      </div>

      {answeredCount === questions.length && currentIndex < questions.length - 1 && (
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          全部已答完，提交答卷
        </button>
      )}
    </div>
  )
}
