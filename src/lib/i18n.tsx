'use client'

import { useState, useEffect, createContext, useContext } from 'react'

export type Locale = 'en' | 'es'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

let translations: Record<Locale, Record<string, any>> = {
  en: {},
  es: {}
}

export async function loadTranslations() {
  const [enTranslations, esTranslations] = await Promise.all([
    import('../locales/en.json'),
    import('../locales/es.json')
  ])
  
  translations.en = enTranslations.default
  translations.es = esTranslations.default
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load translations and detect locale
    loadTranslations().then(() => {
      const savedLocale = localStorage.getItem('locale') as Locale
      const browserLocale = navigator.language.startsWith('es') ? 'es' : 'en'
      const initialLocale = savedLocale || browserLocale
      setLocaleState(initialLocale)
      setIsLoaded(true)
    })
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  if (!isLoaded) {
    return null
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}