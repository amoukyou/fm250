import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBank, getQuestionsByBank, getQuestionsByCategory } from '../data'
import type { SingleChoiceQuestion } from '../data'
import { addAnswerRecord, toggleFavorite, isFavorite, saveProgress, getProgress } from '../store/storage'
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, XCircleIcon } from '../components/Icons'
import AiExplanation from '../components/AiExplanation'
import { useI18n } from '../i18n/context'
import { useLocalizedQuestion } from '../i18n/useLocalizedQuestion'

export default function MultipleChoicePage() {
  const { bankId, categoryId } = useParams<{ bankId: string; categoryId: string }>()
  const navigate = useNavigate()
  const { t } = useI18n()
  const { localizeQuestion } = useLocalizedQuestion()
  const bank = getBank(bankId!)

  const rawQuestions = useMemo(() => {
    let qs;
    if (categoryId === 'all') {
      qs = getQuestionsByBank(bankId!)
    } else if (categoryId === 'mc-only') {
      // All MC except true/false (b-cat1)
      qs = getQuestionsByBank(bankId!).filter((q) => q.categoryId !== 'b-cat1')
    } else {
      qs = getQuestionsByCategory(bankId!, categoryId!)
    }
    return qs.filter((q): q is SingleChoiceQuestion => q.type === 'single_choice')
  }, [bankId, categoryId])
  const questions = rawQuestions.map((q) => localizeQuestion(q) as SingleChoiceQuestion)

  const savedProgress = getProgress()
  // Auto-resume: match bank + question type, and saved index is within bounds
  const canResume = savedProgress &&
    savedProgress.bankId === bankId &&
    savedProgress.questionType === 'single_choice' &&
    savedProgress.currentIndex > 0 &&
    savedProgress.currentIndex < rawQuestions.length
  const initialIndex = canResume ? savedProgress!.currentIndex : 0

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [fav, setFav] = useState(() => questions[initialIndex] ? isFavorite(questions[initialIndex].id) : false)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)

  if (questions.length === 0) return <div className="text-center py-10 text-gray-500">{t('practice.noQuestions')}</div>

  const q = questions[currentIndex]
  if (!q) return <div className="text-center py-10 text-gray-500">{t('practice.noQuestions')}</div>

  const isCorrect = selectedOption === q.answer

  function handleSelect(option: string) {
    if (showResult) return
    setSelectedOption(option)
    setShowResult(true)
    const correct = option === q.answer
    if (correct) setCorrectCount((c) => c + 1)
    setAnsweredCount((c) => c + 1)
    addAnswerRecord(q.id, { correct, timestamp: Date.now() })
    saveProgress({ bankId: bankId!, categoryId: categoryId!, questionType: 'single_choice', currentIndex: currentIndex + 1, timestamp: Date.now() })
  }

  function goTo(idx: number) {
    if (idx >= questions.length) {
      navigate('/practice-result', { state: { total: answeredCount, correct: correctCount, bankName: bank?.bankName, type: t('practice.mc') } })
      return
    }
    setCurrentIndex(idx)
    setSelectedOption(null)
    setShowResult(false)
    setFav(isFavorite(questions[idx].id))
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">{bank?.bankName} · {t('practice.mc')}</span>
          <span className="text-xs font-mono font-semibold text-sky-600">{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5">
          <h2 className="text-base font-medium text-gray-900 leading-relaxed">{q.question}</h2>
        </div>
        <div className="px-4 pb-4 space-y-2">
          {q.options.map((opt, i) => {
            let cls = 'flex items-start gap-3 rounded-xl p-3.5 text-left w-full transition-all duration-200 border-2 '
            const letter = String.fromCharCode(65 + i)
            if (showResult) {
              if (opt === q.answer) cls += 'bg-emerald-50 border-emerald-400 '
              else if (opt === selectedOption) cls += 'bg-rose-50 border-rose-400 '
              else cls += 'bg-gray-50 border-gray-100 opacity-50 '
            } else {
              cls += 'bg-white border-gray-150 hover:border-sky-300 hover:bg-sky-50 active:scale-[0.98] cursor-pointer '
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(opt)}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  showResult && opt === q.answer ? 'bg-emerald-500 text-white' :
                  showResult && opt === selectedOption ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {showResult && opt === q.answer ? <CheckCircleIcon className="w-4 h-4" /> :
                   showResult && opt === selectedOption ? <XCircleIcon className="w-4 h-4" /> : letter}
                </span>
                <span className="text-sm leading-relaxed pt-0.5">{opt}</span>
              </button>
            )
          })}
        </div>
        {showResult && (
          <div className={`px-5 py-3 text-sm font-medium ${isCorrect ? 'bg-emerald-50 text-emerald-700 border-t border-emerald-100' : 'bg-rose-50 text-rose-700 border-t border-rose-100'}`}>
            {isCorrect ? t('practice.correct') : t('practice.wrongAns') + q.answer}
          </div>
        )}
        {showResult && q.explanation && (
          <div className="px-5 py-3 bg-sky-50 border-t border-sky-100">
            <div className="text-xs font-semibold text-sky-600 mb-1">{t('practice.explanation')}</div>
            <div className="text-sm text-sky-800 leading-relaxed">{q.explanation}</div>
          </div>
        )}
        {/* AI Explanation */}
        {showResult && (
          <div className="px-4 pb-4">
            {!isCorrect && selectedOption ? (
              <AiExplanation mode="mc-wrong" question={q.question} options={q.options} correctAnswer={q.answer} selectedAnswer={selectedOption} />
            ) : (
              <AiExplanation mode="deep" question={q.question} answer={q.answer} />
            )}
          </div>
        )}
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
        <button onClick={() => goTo(currentIndex + 1)} disabled={!showResult}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-sky-600 text-white shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-sky-700 transition">
          {currentIndex >= questions.length - 1 ? t('practice.finish') : t('practice.next')} <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
