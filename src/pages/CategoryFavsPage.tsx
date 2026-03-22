import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBank, getQuestionsByCategory, getQuestionsByBank } from '../data'
import type { SingleChoiceQuestion, QAQuestion } from '../data'
import { getFavorites, addAnswerRecord, toggleFavorite, isFavorite } from '../store/storage'

export default function CategoryFavsPage() {
  const { bankId, categoryId } = useParams<{ bankId: string; categoryId: string }>()
  const bank = getBank(bankId!)

  const questions = useMemo(() => {
    const favIds = new Set(getFavorites())
    const catQs = categoryId === 'all'
      ? getQuestionsByBank(bankId!)
      : getQuestionsByCategory(bankId!, categoryId!)
    return catQs.filter((q) => favIds.has(q.id))
  }, [bankId, categoryId])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [rated, setRated] = useState(false)
  const [fav, setFav] = useState(true)

  if (questions.length === 0) return <div className="text-center py-10 text-gray-500">本分類沒有收藏題目</div>

  const q = questions[currentIndex]

  function handleSelectMC(option: string) {
    if (showResult) return
    setSelectedOption(option)
    setShowResult(true)
    addAnswerRecord(q.id, { correct: option === (q as SingleChoiceQuestion).answer, timestamp: Date.now() })
  }

  function handleRateQA(rating: 'know' | 'fuzzy' | 'dont_know') {
    setRated(true)
    addAnswerRecord(q.id, { correct: rating === 'know', selfRating: rating, timestamp: Date.now() })
  }

  function goTo(idx: number) {
    setCurrentIndex(idx)
    setSelectedOption(null)
    setShowResult(false)
    setShowAnswer(false)
    setRated(false)
    setFav(isFavorite(questions[idx].id))
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">{bank?.bankName} · 收藏復習</div>
        <div className="text-sm font-medium text-amber-600">{currentIndex + 1} / {questions.length}</div>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-5">
        <div className="text-xs text-gray-400 mb-2">{q.type === 'single_choice' ? '選擇題' : '問答題'}</div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{q.question}</h2>

        {q.type === 'single_choice' ? (
          <>
            <div className="space-y-2">
              {(q as SingleChoiceQuestion).options.map((opt, i) => {
                let cls = 'border rounded-lg p-3 text-left w-full transition cursor-pointer '
                if (showResult) {
                  if (opt === (q as SingleChoiceQuestion).answer) cls += 'bg-green-50 border-green-400 text-green-800 '
                  else if (opt === selectedOption) cls += 'bg-red-50 border-red-400 text-red-800 '
                  else cls += 'bg-gray-50 border-gray-200 text-gray-400 '
                } else cls += 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 '
                return <button key={i} className={cls} onClick={() => handleSelectMC(opt)}><span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>{opt}</button>
              })}
            </div>
            {showResult && (q as SingleChoiceQuestion).explanation && <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800"><div className="font-medium mb-1">解析</div>{(q as SingleChoiceQuestion).explanation}</div>}
          </>
        ) : (
          <>
            {!showAnswer ? (
              <button onClick={() => setShowAnswer(true)} className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">顯示參考答案</button>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 border rounded-lg p-4 text-gray-800 whitespace-pre-line"><div className="font-medium text-sm text-gray-500 mb-2">參考答案</div>{(q as QAQuestion).referenceAnswer}</div>
                {!rated ? (
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleRateQA('know')} className="py-2.5 rounded-lg bg-green-50 border border-green-300 text-green-700 font-medium hover:bg-green-100">我會</button>
                    <button onClick={() => handleRateQA('fuzzy')} className="py-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-700 font-medium hover:bg-amber-100">模糊</button>
                    <button onClick={() => handleRateQA('dont_know')} className="py-2.5 rounded-lg bg-red-50 border border-red-300 text-red-700 font-medium hover:bg-red-100">不會</button>
                  </div>
                ) : <div className="text-sm text-green-600 font-medium text-center">✓ 已記錄</div>}
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0} className="px-4 py-2 rounded-lg text-sm font-medium bg-white border shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50">← 上一題</button>
        <button onClick={() => setFav(toggleFavorite(q.id))} className={`px-3 py-2 rounded-lg text-sm ${fav ? 'text-amber-600' : 'text-gray-400'} hover:text-amber-600`}>{fav ? '⭐ 已收藏' : '☆ 收藏'}</button>
        <button onClick={() => goTo(currentIndex + 1)} disabled={currentIndex >= questions.length - 1} className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700">下一題 →</button>
      </div>
    </div>
  )
}
