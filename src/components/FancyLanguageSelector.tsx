'use client'

import { useI18n, Locale } from '@/lib/i18n'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const languages = [
  { 
    code: 'en' as Locale, 
    name: 'English', 
    nativeName: 'English',
    flag: '🇺🇸',
    flagEmoji: '🇺🇸'
  },
  { 
    code: 'es' as Locale, 
    name: 'Spanish', 
    nativeName: 'Español',
    flag: '🇪🇸',
    flagEmoji: '🇪🇸'
  }
]

export default function FancyLanguageSelector() {
  const { locale, setLocale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageSelect = (langCode: Locale) => {
    setLocale(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="text-lg leading-none">{currentLanguage.flagEmoji}</span>
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                  locale === language.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{language.flagEmoji}</span>
                  <div className="text-left">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-gray-500">{language.name}</div>
                  </div>
                </div>
                {locale === language.code && (
                  <Check className="w-4 h-4 text-primary-600" />
                )}
              </button>
            ))}
          </div>
          
          {/* Decorative bottom section */}
          <div className="border-t border-gray-100 px-4 py-3">
            <div className="flex items-center text-xs text-gray-500">
              <Globe className="w-3 h-3 mr-1" />
              <span>Choose your language</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}