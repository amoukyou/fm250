import { useLocation, Link } from 'react-router-dom'
import type { SingleChoiceQuestion } from '../data'
import AiSummary from '../components/AiSummary'
import AiExplanation from '../components/AiExplanation'

type ResultState = {
  questions: SingleChoiceQuestion[]
  answers: Record<string, string>
  score: number
  total: number
}

export default function MockResultPage() {
  const location = useLocation()
  const state = location.state as ResultState | null

  if (!state) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">沒有考試結果</p>
        <Link to="/" className="text-blue-600 underline mt-2 inline-block">
          返回首頁
        </Link>
      </div>
    )
  }

  const { questions, answers, score, total } = state
  const percentage = Math.round((score / total) * 100)
  const passed = percentage >= 70

  return (
    <div className="space-y-6">
      <div
        className={`rounded-xl p-6 text-center ${passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
      >
        <div className={`text-4xl font-bold ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {score} / {total}
        </div>
        <div className={`text-lg mt-1 ${passed ? 'text-green-600' : 'text-red-600'}`}>
          正確率 {percentage}%
        </div>
        <div className={`text-sm mt-2 ${passed ? 'text-green-500' : 'text-red-500'}`}>
          {passed ? '恭喜通過！' : '繼續加油！'}
        </div>
      </div>

      {/* AI Summary */}
      <AiSummary
        mode="exam"
        total={total}
        correct={score}
        wrongQuestions={questions.filter((q) => answers[q.id] !== q.answer).map((q) => ({
          question: q.question,
          correctAnswer: q.answer,
          selectedAnswer: answers[q.id] || '未作答',
        }))}
      />

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          答題詳情（{total - score} 題答錯）
        </h2>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const selected = answers[q.id]
            const correct = selected === q.answer
            return (
              <div
                key={q.id}
                className={`rounded-xl border p-4 ${correct ? 'bg-white border-gray-200' : 'bg-red-50 border-red-200'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="text-sm text-gray-400">第 {i + 1} 題</div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {correct ? '正確' : '錯誤'}
                  </span>
                </div>
                <div className="font-medium text-gray-900 mt-1 mb-2">{q.question}</div>
                {!correct && (
                  <div className="text-sm space-y-1">
                    <div className="text-red-600">你的答案：{selected || '未作答'}</div>
                    <div className="text-green-600">正確答案：{q.answer}</div>
                    {q.explanation && (
                      <div className="text-blue-700 bg-blue-50 rounded p-2 mt-2">
                        {q.explanation}
                      </div>
                    )}
                    <AiExplanation mode="mc-wrong" question={q.question} options={q.options} correctAnswer={q.answer} selectedAnswer={selected || '未作答'} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to="/mock-exam"
          className="flex-1 py-3 rounded-lg bg-blue-600 text-white text-center font-medium no-underline hover:bg-blue-700 transition"
        >
          再考一次
        </Link>
        <Link
          to="/"
          className="flex-1 py-3 rounded-lg bg-white border text-gray-700 text-center font-medium no-underline hover:bg-gray-50 transition"
        >
          返回首頁
        </Link>
      </div>
    </div>
  )
}
