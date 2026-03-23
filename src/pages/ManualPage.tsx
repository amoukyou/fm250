import { useState } from 'react'
import { emergencyProcedures } from '../data/manual-content'
import { useI18n } from '../i18n/context'

type Tab = 'pdf' | 'emergency'

export default function ManualPage() {
  const [tab, setTab] = useState<Tab>('emergency')
  const { t, locale } = useI18n()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900">{t('manual.title')}</h1>

      <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
        <button
          onClick={() => setTab('emergency')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            tab === 'emergency' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('manual.tabEmergency')}
        </button>
        <button
          onClick={() => setTab('pdf')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            tab === 'pdf' ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {t('manual.tabPdf')}
        </button>
      </div>

      {tab === 'emergency' ? <EmergencySection locale={locale} /> : <PdfSection />}
    </div>
  )
}

function EmergencySection({ locale }: { locale: 'zh-TW' | 'zh-CN' | 'en' }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { t } = useI18n()

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">{t('manual.epSubtitle')}</p>
      {emergencyProcedures.map((proc) => (
        <div key={proc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setExpandedId(expandedId === proc.id ? null : proc.id)}
            className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <span className="font-medium text-gray-900 text-sm">{proc.title[locale]}</span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === proc.id ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {expandedId === proc.id && (
            <div className="px-4 pb-4 border-t border-gray-100">
              {proc.items.length > 0 && (
                <div className="mt-3 space-y-1">
                  {proc.items.map((item, i) => (
                    <div key={i} className="flex text-sm">
                      <span className="font-medium text-gray-700 w-28 shrink-0">{item.label[locale]}</span>
                      <span className={item.value[locale] ? 'text-gray-600' : 'text-gray-400'}>
                        {item.value[locale] || '—'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {proc.note && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 leading-relaxed whitespace-pre-line">
                  {proc.note[locale]}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function PdfSection() {
  const { t } = useI18n()
  const pdfUrl = import.meta.env.BASE_URL + 'fm250-manual.pdf'

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '70vh' }}>
        <iframe src={pdfUrl} className="w-full h-full border-0" title="FM250 Flight Manual" />
      </div>
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center py-3 rounded-xl bg-white border border-gray-200 text-sm font-medium text-sky-600 no-underline hover:bg-sky-50 transition"
      >
        {t('manual.openPdf')}
      </a>
    </div>
  )
}
