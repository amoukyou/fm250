import { useParams, Link } from 'react-router-dom'
import { getBank } from '../data'
import type { Question } from '../data'
import { getAnswerRecords } from '../store/storage'
import { ClipboardCheckIcon, MessageCircleIcon, CheckCircleIcon } from '../components/Icons'
import { useI18n } from '../i18n/context'

export default function BankPage() {
  const { bankId } = useParams<{ bankId: string }>()
  const bank = getBank(bankId!)
  const { t } = useI18n()

  if (!bank) return <div className="text-center py-10 text-gray-500">N/A</div>

  const records = getAnswerRecords()

  // Separate true/false (b-cat1) from regular MC
  const tfQuestions = bank.questions.filter((q) => q.type === 'single_choice' && q.categoryId === 'b-cat1')
  const mcQuestions = bank.questions.filter((q) => q.type === 'single_choice' && q.categoryId !== 'b-cat1')
  const qaQuestions = bank.questions.filter((q) => q.type === 'qa')

  const hasTF = tfQuestions.length > 0
  const hasMC = mcQuestions.length > 0
  const hasQA = qaQuestions.length > 0

  function statsFor(qs: Question[]) {
    const answered = qs.filter((q) => records[q.id]).length
    const correct = qs.filter((q) => { const r = records[q.id]; return r && r[r.length - 1].correct }).length
    return { answered, correct, total: qs.length, pct: qs.length > 0 ? Math.round((answered / qs.length) * 100) : 0 }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{bank.bankName}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('bank.total', { n: bank.questions.length })}</p>
      </div>

      {/* True/False */}
      {hasTF && <BankCard
        to={`/bank/${bank.bankId}/category/b-cat1/mc`}
        icon={<CheckCircleIcon className="w-7 h-7" />}
        iconBg="bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
        barColor="bg-emerald-500"
        title={t('bank.tf')}
        stats={statsFor(tfQuestions)}
        t={t}
      />}

      {/* Multiple Choice */}
      {hasMC && <BankCard
        to={hasTF ? `/bank/${bank.bankId}/category/mc-only/mc` : `/bank/${bank.bankId}/category/all/mc`}
        icon={<ClipboardCheckIcon className="w-7 h-7" />}
        iconBg="bg-sky-50 text-sky-600 group-hover:bg-sky-100"
        barColor="bg-sky-500"
        title={t('bank.mc')}
        stats={statsFor(mcQuestions)}
        t={t}
      />}

      {/* Q&A */}
      {hasQA && <BankCard
        to={`/bank/${bank.bankId}/category/all/qa`}
        icon={<MessageCircleIcon className="w-7 h-7" />}
        iconBg="bg-violet-50 text-violet-600 group-hover:bg-violet-100"
        barColor="bg-violet-500"
        title={t('bank.qa')}
        stats={statsFor(qaQuestions)}
        t={t}
      />}
    </div>
  )
}

function BankCard({ to, icon, iconBg, barColor, title, stats, t }: {
  to: string; icon: React.ReactNode; iconBg: string; barColor: string;
  title: string; stats: { answered: number; correct: number; total: number; pct: number };
  t: (key: any, vars?: any) => string;
}) {
  return (
    <Link to={to}
      className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden no-underline hover:shadow-md transition group">
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition shrink-0 ${iconBg}`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-lg font-semibold text-gray-900">{title}</div>
            <div className="text-sm text-gray-500 mt-0.5">{t('bank.questions', { n: stats.total })}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-gray-700">{stats.pct}%</div>
            <div className="text-xs text-gray-400">{t('bank.completion')}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
          <span>{t('bank.done', { n: stats.answered })}</span>
          <span>{t('bank.correctN', { n: stats.correct })}</span>
          <span>{t('bank.wrongN', { n: stats.answered - stats.correct })}</span>
        </div>
      </div>
      <div className="h-1 bg-gray-100"><div className={`h-full transition-all ${barColor}`} style={{ width: `${stats.pct}%` }} /></div>
    </Link>
  )
}
