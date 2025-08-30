# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, internationalized landing page template built with Next.js 14, TypeScript, and Tailwind CSS. The template features a complete i18n system supporting English and Spanish, with a professional design system based on blue color palettes. It includes an AI-powered chatbot for querying Colombian dietary supplements registry data.

## Development Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint checks
```

## Architecture & Key Systems

### AI Chatbot System
- **OpenAI Integration** via `src/lib/openai.ts` using OpenAI SDK v5+
- **Responses API** with file search capability for RAG (Retrieval-Augmented Generation)
- **Vector Store Integration** for Colombian dietary supplements registry data
- **Configurable System Prompt** in `src/config/chatbot-prompt.ts` for easy customization
- **Responsive Chat UI** with markdown table rendering optimized for mobile
- **Session Management** with in-memory conversation storage and localStorage persistence

### Internationalization (i18n) System
- **Custom i18n implementation** in `src/lib/i18n.tsx` using React Context
- **Translation files** in `src/locales/` (en.json, es.json) including chatbot strings
- **Language persistence** via localStorage and automatic browser language detection
- **Next.js i18n config** in `next.config.js` with localeDetection disabled (using custom detection)

### Component Architecture
- **Layout pattern**: Fixed header + hero + sections + footer + floating chatbot
- **Chatbot Integration**: `ChatbotProvider.tsx` manages state, `Chatbot.tsx` handles UI/UX
- **Header component** (`Header.tsx`) with responsive navigation and language selector
- **Hero section** (`Hero.tsx`) with animated elements and stats cards
- **Modular sections**: Features, CTA, Footer - each self-contained

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
- `chatbot.*` - Chatbot UI strings (title, placeholder, buttons, error messages)

## Working with the Chatbot System

### Modifying Chatbot Behavior
- Edit `src/config/chatbot-prompt.ts` to change assistant personality, instructions, or output format
- System prompt is imported into the API route, no code changes needed for prompt updates
- Supports RAG (Retrieval-Augmented Generation) when `OPENAI_VECTOR_STORE_ID` is configured

### Chatbot UI Customization
- **Table rendering**: Custom ReactMarkdown components convert markdown tables to mobile-friendly cards
- **Chat window sizing**: Currently `h-[36rem]` (576px) - adjust in `Chatbot.tsx`
- **Message styling**: Separate styling for user vs assistant messages
- **Error handling**: Graceful fallbacks when OpenAI API is unavailable

### API Integration Details
- Uses OpenAI Responses API (not Chat Completions) for better RAG integration
- Conversation history maintained in-memory (consider Redis for production)
- Session IDs generated and persisted in localStorage
- File search tools automatically included when vector store is configured

## Component Patterns

### Chatbot Integration Pattern
- `ChatbotProvider` manages open/closed state and wraps toggle + window components
- `Chatbot` component handles conversation UI, markdown rendering, and API communication
- **Responsive table rendering**: Tables convert to card format for mobile chat interface
- **ReactMarkdown** with custom components for proper table formatting in constrained space
- **Session persistence**: Conversations persist across page reloads via localStorage

### Language Selector Pattern
- `FancyLanguageSelector` provides dropdown with flags, native names, and animations
- Handles click-outside-to-close functionality
- Persists selection to localStorage
- Updates HTML lang attribute

### Dynamic Content Pattern
- Components receive `t` function via `useI18n` hook
- Text content is externalized to JSON files
- Fallback to key name if translation missing

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

### Chatbot Configuration
- **System prompt** stored in `src/config/chatbot-prompt.ts` for easy modification without code changes
- **API endpoint** at `/api/chat` handles OpenAI Responses API integration
- **Environment variables** required:
  - `OPENAI_API_KEY` - Required for chatbot functionality
  - `OPENAI_VECTOR_STORE_ID` - Optional, enables file search capability
  - `OPENAI_ORGANIZATION` - Optional organization ID
  - `OPENAI_PROJECT_ID` - Optional project ID for usage tracking
- **Model selection**: Currently uses `gpt-4o` for file search compatibility
- **Response handling**: Extracts text from `output_text` field of OpenAI response

### i18n Provider Setup
- Must wrap app in `I18nProvider` (done in layout.tsx)
- Provider handles loading state and returns null until translations loaded
- Browser language detection happens client-side in useEffect

### Next.js Configuration
- i18n config in next.config.js sets up routing but shows deprecation warning with App Router
- localeDetection disabled to use custom detection logic
- App Router pattern (not Pages Router)

### Component Organization
- Each major section is a separate component
- Reusable elements are standalone components
- Chatbot integrated at layout level via `ChatbotProvider`
- Page composition in `src/app/page.tsx`

## Deployment Notes
- Vercel configuration in `vercel.json`
- **Environment variables required** for chatbot functionality (see `.env.example`)
- API route at `/api/chat` requires server-side rendering capabilities
- Static export NOT compatible due to API routes and server-side chatbot functionality
- Configure OpenAI environment variables in deployment platform