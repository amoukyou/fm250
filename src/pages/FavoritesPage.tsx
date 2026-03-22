import { useState, useMemo } from 'react'
import { getFavorites, toggleFavorite } from '../store/storage'
import { getQuestionById, banks } from '../data'
import type { Question } from '../data'
import { useI18n } from '../i18n/context'
import { useLocalizedQuestion } from '../i18n/useLocalizedQuestion'

export default function FavoritesPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [filterBank, setFilterBank] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const { t } = useI18n()
  const { localizeQuestion } = useLocalizedQuestion()

  const favQuestions = useMemo(() => {
    const ids = getFavorites()
    return ids.map(getQuestionById).filter(Boolean).map((q) => localizeQuestion(q!)) as Question[]
  }, [refreshKey, localizeQuestion])

  const filtered = favQuestions.filter((q) => {
    if (filterBank !== 'all' && q.bankId !== filterBank) return false
    if (filterType !== 'all' && q.type !== filterType) return false
    return true
  })

  function handleRemove(id: string) {
    toggleFavorite(id)
    setRefreshKey((k) => k + 1)
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-900">{t('fav.title')}（{favQuestions.length}）</h1>

      <div className="flex gap-2 flex-wrap">
        <select value={filterBank} onChange={(e) => setFilterBank(e.target.value)}
          className="text-sm border rounded-lg px-3 py-1.5 bg-white">
          <option value="all">{t('filter.allBanks')}</option>
          {banks.map((b) => <option key={b.bankId} value={b.bankId}>{b.bankName}</option>)}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
          className="text-sm border rounded-lg px-3 py-1.5 bg-white">
          <option value="all">{t('filter.allTypes')}</option>
          <option value="single_choice">{t('filter.mc')}</option>
          <option value="qa">{t('filter.qa')}</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {favQuestions.length === 0 ? t('fav.empty') : t('filter.noMatch')}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow-sm border p-4">
              <div className="flex justify-between items-start">
                <div className="text-xs text-gray-400">
                  {q.type === 'single_choice' ? t('filter.mc') : t('filter.qa')} · {q.categoryName}
                </div>
                <button onClick={() => handleRemove(q.id)} className="text-xs text-amber-500 hover:text-gray-400">
                  {t('fav.remove')}
                </button>
              </div>
              <div className="font-medium text-gray-900 mt-1">{q.question}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
