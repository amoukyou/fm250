import { useParams, Link } from 'react-router-dom'
import { getBank, getQuestionsByCategory, getQuestionsByBank } from '../data'
import { getWrongQuestionIds, getFavorites } from '../store/storage'

export default function CategoryPage() {
  const { bankId, categoryId } = useParams<{ bankId: string; categoryId: string }>()
  const bank = getBank(bankId!)

  if (!bank) return <div className="text-center py-10 text-gray-500">題庫不存在</div>

  const isAll = categoryId === 'all'
  const category = isAll ? null : bank.categories.find((c) => c.id === categoryId)
  const categoryName = isAll ? '全部分類' : category?.name ?? '未知分類'

  const questions = isAll
    ? getQuestionsByBank(bankId!)
    : getQuestionsByCategory(bankId!, categoryId!)

  const mcCount = questions.filter((q) => q.type === 'single_choice').length
  const qaCount = questions.filter((q) => q.type === 'qa').length

  const wrongIds = new Set(getWrongQuestionIds())
  const favIds = new Set(getFavorites())
  const wrongCount = questions.filter((q) => wrongIds.has(q.id)).length
  const favCount = questions.filter((q) => favIds.has(q.id)).length

  const base = `/bank/${bankId}/category/${categoryId}`

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">{bank.bankName}</p>
        <h1 className="text-xl font-bold text-gray-900">{categoryName}</h1>
        <p className="text-sm text-gray-500 mt-1">
          共 {questions.length} 題（選擇 {mcCount} + 問答 {qaCount}）
        </p>
      </div>

      <div className="space-y-3">
        {mcCount > 0 && (
          <Link
            to={`${base}/mc`}
            className="block bg-white rounded-xl shadow-sm border p-4 no-underline hover:shadow-md transition"
          >
            <div className="font-medium text-gray-900">📝 選擇題測試</div>
            <div className="text-sm text-gray-500">{mcCount} 題</div>
          </Link>
        )}

        {qaCount > 0 && (
          <Link
            to={`${base}/qa`}
            className="block bg-white rounded-xl shadow-sm border p-4 no-underline hover:shadow-md transition"
          >
            <div className="font-medium text-gray-900">💬 問答題測試</div>
            <div className="text-sm text-gray-500">{qaCount} 題</div>
          </Link>
        )}

        <Link
          to={`${base}/random`}
          className="block bg-white rounded-xl shadow-sm border p-4 no-underline hover:shadow-md transition"
        >
          <div className="font-medium text-gray-900">🔀 隨機練習</div>
          <div className="text-sm text-gray-500">從本分類隨機抽題</div>
        </Link>

        {wrongCount > 0 && (
          <Link
            to={`${base}/wrong`}
            className="block bg-red-50 rounded-xl border border-red-200 p-4 no-underline hover:bg-red-100 transition"
          >
            <div className="font-medium text-red-700">❌ 本分類錯題復習</div>
            <div className="text-sm text-red-500">{wrongCount} 題</div>
          </Link>
        )}

        {favCount > 0 && (
          <Link
            to={`${base}/favs`}
            className="block bg-amber-50 rounded-xl border border-amber-200 p-4 no-underline hover:bg-amber-100 transition"
          >
            <div className="font-medium text-amber-700">⭐ 本分類收藏復習</div>
            <div className="text-sm text-amber-500">{favCount} 題</div>
          </Link>
        )}
      </div>
    </div>
  )
}
