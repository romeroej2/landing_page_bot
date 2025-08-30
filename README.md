# Modern Landing Page Template

A beautiful, modern landing page template built with Next.js 14, TypeScript, and Tailwind CSS. Perfect for startups, SaaS products, or any project that needs a professional landing page.

## ✨ Features

- 🚀 **Next.js 14** with App Router
- 📘 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🌐 **Internationalization** (English & Spanish)
- 📱 **Fully Responsive** design
- ⚡ **Performance Optimized** 
- 🔍 **SEO Ready** with proper meta tags
- 🎯 **Modern Design** with blue color palette
- 📦 **Ready to Deploy** on Vercel
- 🛠️ **Developer Friendly** with ESLint

## 🎨 Design

The template features a modern, clean design with:
- Beautiful blue gradient color scheme
- Smooth animations and hover effects
- Professional typography
- Mobile-first responsive design
- Accessibility considerations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd landing_page_bot
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── lib/
│   │   └── i18n.ts
│   └── locales/
│       ├── en.json
│       └── es.json
├── public/
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## 🎨 Customization

### Colors

The template uses a beautiful blue color palette. You can customize colors in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Blue shades from 50 to 950
  },
  secondary: {
    // Secondary blue shades
  },
}
```

### Content

Edit the components in `src/components/` to customize:

- **Hero.tsx** - Main hero section with heading and CTA
- **Features.tsx** - Feature showcase with icons
- **CTA.tsx** - Call-to-action section
- **Footer.tsx** - Footer with links and social media

### Internationalization

The template supports English and Spanish out of the box. You can:

1. **Add new languages**: Create new JSON files in `src/locales/` (e.g., `fr.json`, `de.json`)
2. **Update translations**: Edit the JSON files in `src/locales/`
3. **Add new translation keys**: Add keys to all language files and use `t('your.key')` in components

#### Adding a new language:

1. Create `src/locales/fr.json` with French translations
2. Update `next.config.js` to include the new locale:
```javascript
i18n: {
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
}
```
3. Update the language switcher in `src/components/LanguageSwitcher.tsx`

#### Using translations in components:

```typescript
import { useI18n } from '@/lib/i18n'

function MyComponent() {
  const { t } = useI18n()
  return <h1>{t('hero.title')}</h1>
}
```

### Styling

The template uses Tailwind CSS. Key classes used:
- `bg-gradient-to-r` for gradients
- `hover:` modifiers for interactive states
- `md:` and `lg:` for responsive breakpoints

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. Deploy with one click!

The template includes a `vercel.json` configuration file for optimal deployment.

### Other Platforms

The template can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Vercel](https://vercel.com/) - Deployment platform

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

If you have any questions or need help, please:
1. Check the documentation
2. Open an issue on GitHub
3. Join our community discussions

---

**Happy building!** 🚀

Made with ❤️ for developers who want to ship fast.