# AI-Powered Landing Page with Custom Knowledge Base Chatbot

A modern, internationalized landing page template with an integrated AI chatbot that can query custom datasets. Built with Next.js 14, TypeScript, and Tailwind CSS. Perfect for organizations that need a professional landing page with a specialized AI assistant for their data.

## 🎯 Purpose

This application demonstrates how to create a **Retrieval-Augmented Generation (RAG) chatbot** that can intelligently search and present information from custom datasets. The current implementation features:

- **Colombian Dietary Supplements Registry**: An AI assistant that helps users query the "REGISTROS SANITARIOS DE SUPLEMENTOS DIETARIOS" database
- **Professional Landing Page**: A modern, responsive website that showcases your service
- **Bilingual Support**: English and Spanish localization
- **Mobile-Optimized Chat**: Tables and data are presented in a mobile-friendly format

You can easily adapt this template to create your own specialized AI assistant for any domain - legal documents, product catalogs, research databases, customer support, etc.

## ✨ Features

- 🚀 **Next.js 14** with App Router
- 📘 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🌐 **Internationalization** (English & Spanish)
- 🤖 **AI Chatbot Integration** with OpenAI
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

## 🤖 Setting Up Your Own AI Knowledge Base Chatbot

This template includes a fully functional RAG (Retrieval-Augmented Generation) chatbot that can query custom datasets. Here's how to set up your own:

### Step 1: Get an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and add billing information
3. Generate an API key from the API Keys section
4. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
5. Add your API key to `.env.local`:
   ```bash
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

### Step 2: Create Your Vector Store (Knowledge Base)

To enable the chatbot to search your custom data, you need to create a vector store:

1. **Prepare Your Data**: Convert your dataset to markdown format. For best results:
   - Use tables for structured data
   - Include metadata headers like: `<!-- Source: filename.csv | Encoding: utf-8 | Rows: 1-100 -->`
   - Break large files into chunks if needed

2. **Create Vector Store via OpenAI Dashboard**:
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Navigate to "Storage" → "Vector Stores"
   - Click "Create Vector Store"
   - Upload your markdown files
   - Copy the Vector Store ID (starts with `vs_`)

3. **Add Vector Store ID to Environment**:
   ```bash
   OPENAI_VECTOR_STORE_ID=vs_your-vector-store-id-here
   ```

### Step 3: Customize Your Chatbot Prompt

The chatbot's behavior is controlled by the system prompt in `src/config/chatbot-prompt.ts`. You can modify this file to:

- Change the assistant's personality and expertise domain
- Specify output formats (tables, JSON, etc.)
- Add domain-specific instructions
- Configure citation and source requirements
- Set up query strategies for your data type

Example modifications:
```typescript
export const CHATBOT_SYSTEM_PROMPT = `You are an expert assistant for [YOUR DOMAIN].

Your knowledge base contains [DESCRIBE YOUR DATA].

When users ask about [YOUR DOMAIN], always:
1. Search the knowledge base first
2. Present results in a clear table format
3. Include source citations
4. If no data found, suggest alternative search terms

[ADD YOUR SPECIFIC INSTRUCTIONS HERE]`
```

### Step 4: Update UI Text (Optional)

Customize the chatbot interface text by editing the translation files:
- `src/locales/en.json` - English text
- `src/locales/es.json` - Spanish text

Look for the `chatbot.*` keys to modify:
- Welcome messages
- Button labels
- Error messages
- Placeholder text

## 💡 Use Cases & Examples

This template is perfect for creating specialized AI assistants for various domains:

### 📊 **Data Registry Applications**
- Government databases (permits, licenses, registrations)
- Product catalogs with specifications
- Scientific datasets and research papers
- Compliance and regulatory information

### 🏢 **Business Applications**
- Customer support knowledge bases
- Internal document search systems
- Policy and procedure assistants
- Training material chatbots

### 🎓 **Educational & Research**
- Academic paper databases
- Course material assistants
- Research data explorers
- Library catalog systems

### ⚕️ **Healthcare & Legal**
- Medical device databases
- Legal precedent searchers
- Pharmaceutical information systems
- Regulatory compliance assistants

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/chat/          # Chatbot API endpoints
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Chatbot.tsx        # AI chatbot component
│   │   ├── ChatbotProvider.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── lib/
│   │   ├── i18n.ts
│   │   └── openai.ts          # OpenAI configuration
│   └── locales/
│       ├── en.json
│       └── es.json
├── public/
├── CHATBOT_SETUP.md           # Detailed chatbot setup guide
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## 🎨 Customization

### Adapting for Your Domain

1. **Update the Landing Page Content**:
   - Edit `src/locales/en.json` and `src/locales/es.json` to change all text
   - Modify components in `src/components/` (Hero, Features, CTA, Footer)
   - Update colors in `tailwind.config.ts` to match your brand

2. **Configure Your AI Assistant**:
   - Replace the system prompt in `src/config/chatbot-prompt.ts`
   - Upload your dataset to OpenAI's vector store
   - Update the `OPENAI_VECTOR_STORE_ID` environment variable

3. **Customize the Chat Interface**:
   - Modify chatbot UI text in translation files (`chatbot.*` keys)
   - Adjust chat window size in `src/components/Chatbot.tsx`
   - Style the table rendering for your data format

## 🎯 Best Practices for Knowledge Base Chatbots

### Data Preparation Tips

1. **Structure Your Data**:
   - Use markdown tables for structured information
   - Include clear headers and consistent column names
   - Add metadata comments with source information

2. **Optimize for Search**:
   - Include synonyms and alternative terms
   - Use consistent naming conventions
   - Break large datasets into logical chunks

3. **Quality Over Quantity**:
   - Clean and validate your data before upload
   - Remove duplicates and inconsistencies
   - Ensure all important fields are populated

### Prompt Engineering Tips

1. **Be Specific About Your Domain**:
   - Clearly define what your assistant knows about
   - Set expectations about data limitations
   - Include examples of good queries

2. **Define Output Formats**:
   - Specify how results should be presented
   - Include citation requirements
   - Set up fallback responses for no results

3. **Handle Edge Cases**:
   - What to do when no data is found
   - How to handle ambiguous queries
   - When to ask for clarification

### Visual Customization

The template uses a blue color palette that you can customize in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your primary brand colors (50-950 shades)
  },
  secondary: {
    // Your secondary/accent colors (50-950 shades)
  },
}
```

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
4. **Configure Environment Variables**:
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `OPENAI_VECTOR_STORE_ID` - Your vector store ID
   - `OPENAI_ORGANIZATION` - (Optional) Your organization ID
   - `OPENAI_PROJECT_ID` - (Optional) Your project ID
5. Deploy!

### Other Platforms

The template can be deployed to any platform that supports Next.js with API routes:
- Netlify Functions
- AWS Amplify
- Railway
- DigitalOcean App Platform
- Render

**Important**: Make sure to set the environment variables in your deployment platform's settings.

### Environment Variables Setup

All platforms will need these environment variables configured:

```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_VECTOR_STORE_ID=vs_your-vector-store-id-here
# Optional:
OPENAI_ORGANIZATION=org-your-organization-id
OPENAI_PROJECT_ID=proj_your-project-id
```

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

If you have questions about setting up your knowledge base chatbot:

1. **Check the Documentation**: Review this README and `CLAUDE.md` for detailed setup instructions
2. **OpenAI Resources**: Visit [OpenAI's documentation](https://platform.openai.com/docs) for API and vector store guidance
3. **Open an Issue**: Create a GitHub issue for bugs or feature requests
4. **Community Discussions**: Share your use cases and get help from other developers

## 📚 Additional Resources

- [OpenAI Platform Documentation](https://platform.openai.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vector Store Best Practices](https://platform.openai.com/docs/assistants/tools/file-search)

---

**Happy building!** 🚀

Made with ❤️ for developers who want to create intelligent, domain-specific AI assistants.