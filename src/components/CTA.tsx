'use client'

import { ArrowRight, Github, Download } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export default function CTA() {
  const { t } = useI18n()
  return (
    <section className="py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {t('cta.title')}
            <span className="block">{t('cta.titleHighlight')}</span>
          </h2>
          
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button className="group inline-flex items-center px-8 py-4 bg-white text-primary-600 hover:text-primary-700 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
              <Github className="mr-2 w-5 h-5" />
              {t('cta.primaryButton')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group inline-flex items-center px-8 py-4 text-white border-2 border-white/30 hover:border-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/10">
              <Download className="mr-2 w-5 h-5" />
              {t('cta.secondaryButton')}
            </button>
          </div>

          {/* Features list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
            <div className="flex items-center justify-center text-primary-100">
              <div className="w-2 h-2 bg-primary-300 rounded-full mr-3"></div>
              <span>{t('cta.features.nextjs')}</span>
            </div>
            <div className="flex items-center justify-center text-primary-100">
              <div className="w-2 h-2 bg-primary-300 rounded-full mr-3"></div>
              <span>{t('cta.features.typescript')}</span>
            </div>
            <div className="flex items-center justify-center text-primary-100">
              <div className="w-2 h-2 bg-primary-300 rounded-full mr-3"></div>
              <span>{t('cta.features.tailwind')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}