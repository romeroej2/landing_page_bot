'use client'

import { Zap, Shield, Palette, Code, Globe, Smartphone } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

const getFeatures = (t: (key: string) => string) => [
  {
    icon: Zap,
    title: t('features.items.fast.title'),
    description: t('features.items.fast.description')
  },
  {
    icon: Shield,
    title: t('features.items.secure.title'),
    description: t('features.items.secure.description')
  },
  {
    icon: Palette,
    title: t('features.items.beautiful.title'),
    description: t('features.items.beautiful.description')
  },
  {
    icon: Code,
    title: t('features.items.developer.title'),
    description: t('features.items.developer.description')
  },
  {
    icon: Globe,
    title: t('features.items.seo.title'),
    description: t('features.items.seo.description')
  },
  {
    icon: Smartphone,
    title: t('features.items.mobile.title'),
    description: t('features.items.mobile.description')
  }
]

export default function Features({ id }: { id?: string }) {
  const { t } = useI18n()
  const features = getFeatures(t)
  
  return (
    <section id={id} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('features.title')}
            <span className="block text-primary-600">{t('features.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
            {t('features.badge')}
          </div>
        </div>
      </div>
    </section>
  )
}