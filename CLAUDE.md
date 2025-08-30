# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, internationalized landing page template built with Next.js 14, TypeScript, and Tailwind CSS. The template features a complete i18n system supporting English and Spanish, with a professional design system based on blue color palettes.

## Development Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint checks
```

## Architecture & Key Systems

### Internationalization (i18n) System
- **Custom i18n implementation** in `src/lib/i18n.tsx` using React Context
- **Translation files** in `src/locales/` (en.json, es.json)
- **Dynamic page metadata** via `DynamicHead` component that updates document.title and meta description based on locale
- **Language persistence** via localStorage and automatic browser language detection
- **Next.js i18n config** in `next.config.js` with localeDetection disabled (using custom detection)

### Component Architecture
- **Layout pattern**: Fixed header + hero + sections + footer
- **Header component** (`Header.tsx`) with responsive navigation and language selector
- **Hero section** (`Hero.tsx`) with animated elements and stats cards
- **Modular sections**: Features, CTA, Footer - each self-contained
- **Logo component** (`Logo.tsx`) with size variants and optional text display

### Styling System
- **Tailwind CSS** with custom color palette (primary/secondary blue variants)
- **Custom animations** defined in `globals.css` for dropdown effects
- **Responsive design** with mobile-first approach
- **Blue color scheme**: primary (blue-600 focus) and secondary (sky-500 focus) variants

### Icon System
- **Lucide React** for all icons (professional, consistent icon library)
- **Logo design**: Lightning bolt (Zap) + Circle for brand identity
- **Contextual icons**: Sparkles for badges, Users/Award/Star for stats, Globe for language

## Working with Translations

### Adding New Languages
1. Create new JSON file in `src/locales/` (e.g., `fr.json`)
2. Update `Locale` type in `src/lib/i18n.tsx`
3. Add to `translations` object initialization
4. Update `loadTranslations()` function
5. Update `FancyLanguageSelector` languages array
6. Add to `next.config.js` locales array

### Using Translations in Components
```typescript
import { useI18n } from '@/lib/i18n'

function Component() {
  const { t } = useI18n()
  return <h1>{t('hero.title')}</h1>  // Uses dot notation for nested keys
}
```

### Translation Key Structure
- `meta.*` - Page metadata (title, description)
- `hero.*` - Hero section content
- `features.*` - Features section with nested items
- `cta.*` - Call-to-action section
- `footer.*` - Footer with nested link groups

## Component Patterns

### Language Selector Pattern
- `FancyLanguageSelector` provides dropdown with flags, native names, and animations
- Handles click-outside-to-close functionality
- Persists selection to localStorage
- Updates HTML lang attribute

### Dynamic Content Pattern
- Components receive `t` function via `useI18n` hook
- Text content is externalized to JSON files
- Fallback to key name if translation missing
- Page metadata updates dynamically via `DynamicHead`

## Design System

### Color Palette
- **Primary**: Blue variants (50-950) for main brand elements
- **Secondary**: Sky variants (50-950) for accents and gradients
- **Usage**: Gradients combine primary-600 to secondary-600

### Typography Scale
- **Hero headings**: text-4xl to text-7xl with responsive scaling
- **Section headings**: text-3xl to text-5xl
- **Body text**: text-xl for subtitles, text-sm for metadata

### Animation System
- **Smooth transitions**: duration-200 for hover states
- **Transform effects**: hover:-translate-y-1 for cards
- **Custom keyframes** in globals.css for dropdown animations (animateIn, fadeIn, slideInFromTop)

## Important Implementation Details

### i18n Provider Setup
- Must wrap app in `I18nProvider` (done in layout.tsx)
- Provider handles loading state and returns null until translations loaded
- Browser language detection happens client-side in useEffect

### Next.js Configuration
- i18n config in next.config.js sets up routing
- localeDetection disabled to use custom detection logic
- App Router pattern (not Pages Router)

### Component Organization
- Each major section is a separate component
- Reusable elements (Logo, LanguageSelector) are standalone
- Page composition in `src/app/page.tsx`

## Deployment Notes
- Vercel configuration in `vercel.json`
- Static export compatible
- Environment variables not used (all content in translation files)
- No API routes (static landing page)