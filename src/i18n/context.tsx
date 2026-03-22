import { createContext, useContext, useState } from 'react'
import type { Locale, TranslationKey } from './locales'
import { t } from './locales'

type I18nContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType>(null!)

const STORAGE_KEY = 'exam_locale'

function getInitialLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
  if (saved && ['zh-TW', 'zh-CN', 'en'].includes(saved)) return saved
  return 'zh-TW'
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }

  function translate(key: TranslationKey, vars?: Record<string, string | number>) {
    return t(key, locale, vars)
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translate }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
