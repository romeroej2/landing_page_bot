'use client'

import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import Logo from './Logo'

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
]

const getFooterLinks = (t: (key: string) => string) => ({
  [t('footer.links.product.title')]: [
    t('footer.links.product.items.features'),
    t('footer.links.product.items.pricing'),
    t('footer.links.product.items.documentation'),
    t('footer.links.product.items.changelog')
  ],
  [t('footer.links.company.title')]: [
    t('footer.links.company.items.about'),
    t('footer.links.company.items.blog'),
    t('footer.links.company.items.careers'),
    t('footer.links.company.items.contact')
  ],
  [t('footer.links.resources.title')]: [
    t('footer.links.resources.items.community'),
    t('footer.links.resources.items.helpCenter'),
    t('footer.links.resources.items.partners'),
    t('footer.links.resources.items.status')
  ],
  [t('footer.links.legal.title')]: [
    t('footer.links.legal.items.privacy'),
    t('footer.links.legal.items.terms'),
    t('footer.links.legal.items.security'),
    t('footer.links.legal.items.cookies')
  ],
})

export default function Footer() {
  const { t } = useI18n()
  const footerLinks = getFooterLinks(t)
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Logo size="md" showText={true} className="mb-4" />
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-200 transition-colors duration-200"
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links sections */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} {t('footer.brand')}. {t('footer.copyright')}
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>{t('footer.builtWith')}</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{t('footer.status')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}