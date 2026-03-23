import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBank, getQuestionsByBank } from '../data'
import type { QAQuestion } from '../data'
import { addAnswerRecord, toggleFavorite, isFavorite, saveProgress, getProgress } from '../store/storage'
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Icons'
import AiExplanation from '../components/AiExplanation'
import { useI18n } from '../i18n/context'
import { useLocalizedQuestion } from '../i18n/useLocalizedQuestion'

export default function QAPage() {
  const { bankId, categoryId } = useParams<{ bankId: string; categoryId: string }>()
  const navigate = useNavigate()
  const { t } = useI18n()
  const { localizeQuestion } = useLocalizedQuestion()
  const bank = getBank(bankId!)

  const rawQuestions = useMemo(() => {
    return getQuestionsByBank(bankId!).filter((q): q is QAQuestion => q.type === 'qa')
  }, [bankId])
  const questions = rawQuestions.map((q) => localizeQuestion(q) as QAQuestion)

  const savedProgress = getProgress()
  const canResume = savedProgress &&
    savedProgress.bankId === bankId &&
    savedProgress.questionType === 'qa' &&
    savedProgress.currentIndex > 0 &&
    savedProgress.currentIndex < rawQuestions.length
  const initialIndex = canResume ? savedProgress!.currentIndex : 0

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [showAnswer, setShowAnswer] = useState(false)
  const [rated, setRated] = useState(false)
  const [lastRating, setLastRating] = useState<'know' | 'fuzzy' | 'dont_know' | null>(null)
  const [fav, setFav] = useState(() => questions[initialIndex] ? isFavorite(questions[initialIndex].id) : false)
  const [knowCount, setKnowCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)

  if (questions.length === 0) return <div className="text-center py-10 text-gray-500">{t('practice.noQuestions')}</div>

  const q = questions[currentIndex]

  function handleRate(rating: 'know' | 'fuzzy' | 'dont_know') {
    setRated(true)
    setLastRating(rating)
    if (rating === 'know') setKnowCount((c) => c + 1)
    setAnsweredCount((c) => c + 1)
    addAnswerRecord(q.id, { correct: rating === 'know', selfRating: rating, timestamp: Date.now() })
    saveProgress({ bankId: bankId!, categoryId: categoryId!, questionType: 'qa', currentIndex: currentIndex + 1, timestamp: Date.now() })
  }

  function goTo(idx: number) {
    if (idx >= questions.length) {
      navigate('/practice-result', { state: { total: answeredCount, correct: knowCount, bankName: bank?.bankName, type: t('practice.qa') } })
      return
    }
    setCurrentIndex(idx)
    setShowAnswer(false)
    setRated(false)
    setLastRating(null)
    setFav(isFavorite(questions[idx].id))
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">{bank?.bankName} · {t('practice.qa')}</span>
          <span className="text-xs font-mono font-semibold text-violet-600">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5">
          <h2 className="text-base font-medium text-gray-900 leading-relaxed">{q.question}</h2>
        </div>
        <div className="px-5 pb-5">
          {!showAnswer ? (
            <button onClick={() => setShowAnswer(true)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium hover:opacity-95 active:scale-[0.98] transition shadow-md">
              {t('practice.showAnswer')}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-800 leading-relaxed whitespace-pre-line border border-gray-100">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('practice.refAnswer')}</div>
                {q.referenceAnswer}
              </div>
              {!rated ? (
                <div>
                  <div className="text-xs font-semibold text-gray-500 mb-2">{t('practice.selfRate')}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => handleRate('know')} className="py-3 rounded-xl bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-medium hover:bg-emerald-100 active:scale-95 transition text-sm">{t('practice.know')}</button>
                    <button onClick={() => handleRate('fuzzy')} className="py-3 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-700 font-medium hover:bg-amber-100 active:scale-95 transition text-sm">{t('practice.fuzzy')}</button>
                    <button onClick={() => handleRate('dont_know')} className="py-3 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-700 font-medium hover:bg-rose-100 active:scale-95 transition text-sm">{t('practice.dontKnow')}</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-center py-2">
                    <div className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1.5 rounded-full">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                      {t('practice.recorded')}
                    </div>
                  </div>
                  {lastRating && lastRating !== 'know' ? (
                    <AiExplanation mode="qa" question={q.question} referenceAnswer={q.referenceAnswer} rating={lastRating} />
                  ) : (
                    <AiExplanation mode="deep" question={q.question} answer={q.referenceAnswer} />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-white border border-gray-200 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition">
          <ChevronLeftIcon className="w-4 h-4" /> {t('practice.prev')}
        </button>
        <button onClick={() => { setFav(toggleFavorite(q.id)) }}
          className={`p-2.5 rounded-xl border transition ${fav ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white border-gray-200 text-gray-300 hover:text-amber-400'}`}>
          <StarIcon className="w-5 h-5" filled={fav} />
        </button>
        <button onClick={() => goTo(currentIndex + 1)} disabled={!rated && !showAnswer}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-violet-600 text-white shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-700 transition">
          {currentIndex >= questions.length - 1 ? t('practice.finish') : t('practice.next')} <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
