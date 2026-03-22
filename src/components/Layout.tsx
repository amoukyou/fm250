import { Link, useNavigate, useLocation } from 'react-router-dom'
import { PlaneIcon, SearchIcon, ChevronLeftIcon, BarChartIcon, StarIcon, XCircleIcon } from './Icons'
import { useI18n } from '../i18n/context'
import { localeNames } from '../i18n/locales'
import type { Locale } from '../i18n/locales'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { locale, setLocale, t } = useI18n()
  const [showLangMenu, setShowLangMenu] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-600 to-blue-700 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          {isHome ? (
            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1 text-xs bg-white/15 hover:bg-white/25 px-2 py-1 rounded-md transition backdrop-blur-sm"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                  {localeNames[locale]}
                </button>
                {showLangMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowLangMenu(false)} />
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 min-w-[80px]">
                      {(Object.keys(localeNames) as Locale[]).map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLocale(l); setShowLangMenu(false) }}
                          className={`block w-full text-left px-3 py-2 text-sm hover:bg-sky-50 transition ${
                            l === locale ? 'text-sky-600 font-semibold bg-sky-50' : 'text-gray-700'
                          }`}
                        >
                          {localeNames[l]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <PlaneIcon className="w-5 h-5" />
              <span className="font-bold text-base tracking-wide">{t('app.title')}</span>
            </div>
          ) : (
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-white/90 hover:text-white -ml-1">
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="text-sm">{t('nav.back')}</span>
            </button>
          )}
          <Link to="/search" className="p-2 rounded-full hover:bg-white/10 transition">
            <SearchIcon className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-5 pb-24">
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
        <div className="max-w-lg mx-auto flex">
          <TabItem to="/" icon={<PlaneIcon className="w-5 h-5" />} label={t('tab.home')} active={location.pathname === '/'} />
          <TabItem to="/wrong" icon={<XCircleIcon className="w-5 h-5" />} label={t('tab.wrong')} active={location.pathname === '/wrong'} />
          <TabItem to="/favorites" icon={<StarIcon className="w-5 h-5" />} label={t('tab.favorites')} active={location.pathname === '/favorites'} />
          <TabItem to="/stats" icon={<BarChartIcon className="w-5 h-5" />} label={t('tab.stats')} active={location.pathname === '/stats'} />
        </div>
      </nav>
    </div>
  )
}

function TabItem({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex-1 flex flex-col items-center gap-0.5 py-2 no-underline transition ${
        active ? 'text-sky-600' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  )
}
