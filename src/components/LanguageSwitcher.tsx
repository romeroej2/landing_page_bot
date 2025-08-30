'use client'

import { useI18n, Locale } from '@/lib/i18n'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const languages = [
    { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Locale, name: 'Español', flag: '🇪🇸' }
  ]

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2">
        <Globe className="w-4 h-4 text-gray-600" />
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="appearance-none bg-transparent border-none text-gray-600 hover:text-primary-600 focus:outline-none focus:text-primary-600 cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}