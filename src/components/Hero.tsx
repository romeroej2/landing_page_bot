'use client'

import { ArrowRight, Play, Star, Users, Award, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import Header from './Header'

export default function Hero() {
  const { t } = useI18n()
  
  return (
    <div>
      <Header />
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('hero.badge')}
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            <span className="block mb-2">
              {t('hero.title')}
            </span>
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button className="group inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              {t('hero.ctaPrimary')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group inline-flex items-center px-8 py-4 text-gray-700 hover:text-primary-600 font-semibold transition-colors duration-200">
              <Play className="mr-2 w-5 h-5" />
              {t('hero.ctaSecondary')}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-16">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-gray-600">{t('hero.stats.downloads')}</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Award className="w-4 h-4 text-primary-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">99%</div>
              <div className="text-gray-600">{t('hero.stats.uptime')}</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">{t('hero.stats.support')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-500 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
    </div>
  )
}