import { Link } from 'react-router-dom'
import { banks, getAllQuestions } from '../data'
import { getStats, getProgress } from '../store/storage'
import { PlaneTakeoffIcon, TargetIcon, PlayIcon, BookOpenIcon } from '../components/Icons'
import { useI18n } from '../i18n/context'
import { useLocalizedQuestion } from '../i18n/useLocalizedQuestion'

export default function HomePage() {
  const { t } = useI18n()
  const { localizeText } = useLocalizedQuestion()
  const stats = getStats()
  const progress = getProgress()
  const totalQuestions = getAllQuestions().length
  const pct = totalQuestions > 0 ? Math.round((stats.totalAnswered / totalQuestions) * 100) : 0

  return (
    <div className="space-y-5">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-700 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <PlaneTakeoffIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-lg font-bold">{localizeText('皆豪機場祝你逢考必過')}</h1>
            <p className="text-sm text-white/70">{t('home.subtitle')}</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="text-sm text-white/70">{t('home.progress')}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{pct}%</span>
              <span className="text-sm text-white/60">{stats.totalAnswered}/{totalQuestions}</span>
            </div>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="white" strokeWidth="3"
                strokeDasharray={`${pct * 0.974} 100`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold">{stats.accuracy}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resume */}
      {progress && (
        <Link
          to={`/bank/${progress.bankId}/category/${progress.categoryId}/${progress.questionType === 'single_choice' ? 'mc' : 'qa'}?resume=1`}
          className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 no-underline hover:bg-amber-100 transition"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
            <PlayIcon className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-amber-800">{t('home.resume')}</div>
            <div className="text-xs text-amber-600 mt-0.5">{t('home.resume.q')} {progress.currentIndex + 1} {t('home.resume.unit')}</div>
          </div>
        </Link>
      )}

      {/* Banks */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('home.banks')}</h2>
        <div className="space-y-3">
          {banks.map((bank) => {
            const mc = bank.questions.filter((q) => q.type === 'single_choice').length
            const qa = bank.questions.filter((q) => q.type === 'qa').length
            return (
              <Link key={bank.bankId} to={`/bank/${bank.bankId}`}
                className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 no-underline hover:shadow-md transition group">
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 group-hover:bg-sky-100 transition shrink-0">
                  <BookOpenIcon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{bank.bankName}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t('practice.mc')} {mc} + {t('practice.qa')} {qa}</div>
                </div>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mock */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('home.mock')}</h2>
        <Link to="/mock-exam"
          className="flex items-center gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 no-underline hover:opacity-95 transition shadow-md">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
            <TargetIcon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-white">{t('home.mockExam')}</div>
            <div className="text-sm text-white/70 mt-0.5">{t('home.mockDesc')}</div>
          </div>
          <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>

      {/* Manual */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('home.manual')}</h2>
        <Link to="/manual"
          className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 no-underline hover:shadow-md transition group">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition shrink-0">
            <BookOpenIcon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{t('manual.title')}</div>
            <div className="text-xs text-gray-500 mt-0.5">{t('manual.desc')}</div>
          </div>
          <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('home.overview')}</h2>
        <div className="grid grid-cols-4 gap-2">
          <QuickStat label={t('home.done')} value={stats.totalAnswered} color="sky" />
          <QuickStat label={t('home.correct')} value={stats.correctCount} color="emerald" />
          <QuickStat label={t('home.wrongCount')} value={stats.wrongQuestionCount} color="rose" />
          <QuickStat label={t('home.savedCount')} value={stats.favoriteCount} color="amber" />
        </div>
      </div>
    </div>
  )
}

function QuickStat({ label, value, color }: { label: string; value: number; color: string }) {
  const bgMap: Record<string, string> = {
    sky: 'bg-sky-50 text-sky-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    rose: 'bg-rose-50 text-rose-700',
    amber: 'bg-amber-50 text-amber-700',
  }
  return (
    <div className={`rounded-xl p-3 text-center ${bgMap[color]}`}>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs opacity-70 mt-0.5">{label}</div>
    </div>
  )
}
