/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: ['m.media-amazon.com', 'upload.wikimedia.org', 'images.unsplash.com', 'images.pexels.com'],
  },
}

module.exports = nextConfig