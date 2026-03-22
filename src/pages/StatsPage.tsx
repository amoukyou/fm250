import { Link } from 'react-router-dom'
import { getAllQuestions, banks } from '../data'
import { getStats, getAnswerRecords, clearAll } from '../store/storage'

export default function StatsPage() {
  const stats = getStats()
  const allQuestions = getAllQuestions()
  const records = getAnswerRecords()

  // Per-category stats
  const categoryStats = banks.flatMap((bank) =>
    bank.categories.map((cat) => {
      const catQs = bank.questions.filter((q) => q.categoryId === cat.id)
      const answered = catQs.filter((q) => records[q.id]).length
      const correct = catQs.filter((q) => {
        const r = records[q.id]
        return r && r[r.length - 1].correct
      }).length
      return {
        bankName: bank.bankName,
        catName: cat.name,
        total: catQs.length,
        answered,
        correct,
        accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
      }
    })
  )

  function handleClear() {
    if (window.confirm('確定要清除所有學習記錄嗎？此操作無法復原。')) {
      clearAll()
      window.location.reload()
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">學習統計</h1>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="總題量" value={allQuestions.length} />
        <StatCard label="已做題量" value={stats.totalAnswered} />
        <StatCard label="未做題量" value={allQuestions.length - stats.totalAnswered} />
        <StatCard label="正確率" value={`${stats.accuracy}%`} />
        <StatCard label="選擇題正確" value={stats.correctCount} color="green" />
        <StatCard label="選擇題錯誤" value={stats.wrongCount} color="red" />
        <StatCard label="收藏數" value={stats.favoriteCount} color="amber" />
        <StatCard label="錯題數" value={stats.wrongQuestionCount} color="red" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h2 className="font-medium text-gray-900 mb-3">問答題自評分布</h2>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-xl font-bold text-green-700">{stats.qaRatings.know}</div>
            <div className="text-xs text-green-600">我會</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <div className="text-xl font-bold text-amber-700">{stats.qaRatings.fuzzy}</div>
            <div className="text-xs text-amber-600">模糊</div>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <div className="text-xl font-bold text-red-700">{stats.qaRatings.dont_know}</div>
            <div className="text-xs text-red-600">不會</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h2 className="font-medium text-gray-900 mb-3">各分類完成度</h2>
        <div className="space-y-3">
          {categoryStats.map((cs, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {cs.bankName} · {cs.catName}
                </span>
                <span className="text-gray-500">
                  {cs.answered}/{cs.total} · 正確率 {cs.accuracy}%
                </span>
              </div>
              <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${cs.total > 0 ? (cs.answered / cs.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Link
          to="/"
          className="block text-center py-3 rounded-lg bg-white border text-gray-700 font-medium no-underline hover:bg-gray-50 transition"
        >
          返回首頁
        </Link>
        <button
          onClick={handleClear}
          className="w-full py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 font-medium hover:bg-red-100 transition"
        >
          清除所有學習記錄
        </button>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string
  value: string | number
  color?: string
}) {
  const colorMap: Record<string, string> = {
    green: 'text-green-700',
    red: 'text-red-700',
    amber: 'text-amber-700',
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border p-3 text-center">
      <div className={`text-xl font-bold ${color ? colorMap[color] : 'text-gray-900'}`}>
        {value}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}
