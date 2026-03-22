import { useLocation, Link } from 'react-router-dom'
import { PlaneTakeoffIcon, CheckCircleIcon } from '../components/Icons'
import { useI18n } from '../i18n/context'
import AiSummary from '../components/AiSummary'

type ResultState = { total: number; correct: number; bankName: string; type: string }

export default function PracticeResultPage() {
  const location = useLocation()
  const state = location.state as ResultState | null
  const { t } = useI18n()

  if (!state) {
    return (
      <div className="text-center py-10">
        <Link to="/" className="text-sky-600 underline">{t('result.home')}</Link>
      </div>
    )
  }

  const { total, correct, bankName, type } = state
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const isGreat = pct >= 80
  const isGood = pct >= 60
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-4">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
        isGreat ? 'bg-gradient-to-br from-amber-400 to-orange-500' :
        isGood ? 'bg-gradient-to-br from-sky-400 to-blue-500' :
        'bg-gradient-to-br from-gray-300 to-gray-400'
      } shadow-lg`}>
        {isGreat ? <PlaneTakeoffIcon className="w-12 h-12 text-white" /> : <CheckCircleIcon className="w-12 h-12 text-white" />}
      </div>

      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <svg key={i} className={`w-10 h-10 transition-all ${i <= stars ? 'text-amber-400 scale-100' : 'text-gray-200 scale-90'}`} viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isGreat ? t('result.great') : isGood ? t('result.good') : t('result.tryAgain')}
        </h1>
        <p className="text-gray-500 mt-1">{bankName} · {type}</p>
      </div>

      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.5" fill="none" stroke={isGreat ? '#f59e0b' : isGood ? '#0ea5e9' : '#9ca3af'}
            strokeWidth="3" strokeDasharray={`${pct * 0.974} 100`} strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{pct}%</span>
          <span className="text-xs text-gray-400">{t('result.accuracy')}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
          <div className="text-lg font-bold text-gray-900">{total}</div>
          <div className="text-xs text-gray-400">{t('result.answered')}</div>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-3">
          <div className="text-lg font-bold text-emerald-600">{correct}</div>
          <div className="text-xs text-emerald-500">{t('result.correctN')}</div>
        </div>
        <div className="bg-rose-50 rounded-xl border border-rose-100 p-3">
          <div className="text-lg font-bold text-rose-600">{total - correct}</div>
          <div className="text-xs text-rose-500">{t('result.wrongN')}</div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="w-full">
        <AiSummary mode="practice" total={total} correct={correct} bankName={bankName} type={type} />
      </div>

      <div className="w-full space-y-3 pt-2">
        <Link to="/" className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-center no-underline hover:opacity-95 transition shadow-md">
          {t('result.home')}
        </Link>
        <Link to="/wrong" className="block w-full py-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium text-center no-underline hover:bg-gray-50 transition">
          {t('result.wrongBook')}
        </Link>
      </div>
    </div>
  )
}
