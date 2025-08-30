# Chatbot Setup Guide

This template includes an AI-powered chatbot that helps users understand your product and answer questions about the landing page template.

## Features

- 🤖 **OpenAI-powered responses** - Uses GPT-5-nano for intelligent conversations
- 💬 **Automated session management** - Maintains conversation context automatically
- 🌐 **Internationalized** - Supports multiple languages (English/Spanish included)
- 📱 **Responsive design** - Works seamlessly on desktop and mobile
- ⚡ **Easy to customize** - Simple configuration and styling
- 🔄 **Persistent conversations** - Remembers context across page reloads

## Quick Setup

### 1. Get your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key

### 2. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Add your OpenAI API key to `.env.local`:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

Optional organization and project settings:
```env
OPENAI_ORGANIZATION=your_org_id_here
OPENAI_PROJECT_ID=your_project_id_here
```

### 3. Install Dependencies

The OpenAI package is already included in package.json:
```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The chatbot will appear as a floating button in the bottom-right corner of your page.

## Customization

### Chatbot Behavior

Edit the system message in `src/app/api/chat/route.ts` to customize how the AI responds:

```typescript
const systemMessage = {
  role: 'system' as const,
  content: `You are a helpful AI assistant for [YOUR PRODUCT NAME]. 
  
  Your primary role is to help users understand:
  - Your unique selling points
  - Product benefits
  - How to get started
  
  Be friendly, helpful, and concise.`,
}
```

The chatbot uses OpenAI's Responses API with automated session management, so conversations persist naturally without requiring thread management.

### Styling

The chatbot uses your existing Tailwind CSS configuration and follows the same blue color palette as your landing page. Customize colors in `src/components/Chatbot.tsx`.

### Translations

Add chatbot translations to your locale files:

**src/locales/en.json:**
```json
{
  "chatbot": {
    "title": "AI Assistant",
    "welcome": "Hi! How can I help you today?",
    "placeholder": "Type your message...",
    "error": "Sorry, I encountered an error. Please try again."
  }
}
```

### Session Management

The chatbot automatically manages conversation sessions:
- Sessions are created automatically for new conversations
- Session IDs are stored in localStorage for persistence
- Conversations are maintained in server memory (up to 20 messages per session)
- For production, consider using Redis or a database for session storage

## API Endpoints

- `POST /api/chat` - Main chat endpoint with automated session management

**Request format:**
```json
{
  "message": "Your message here",
  "sessionId": "optional_existing_session_id"
}
```

**Response format:**
```json
{
  "message": "AI response",
  "sessionId": "session_id_for_continuity"
}
```

## Development Tips

### Testing the Chatbot

1. Click the floating chat button
2. Try asking questions like:
   - "What is this template?"
   - "How do I get started?"
   - "What technologies does this use?"
   - "How do I customize the design?"

### Monitoring Usage

Check your OpenAI dashboard to monitor API usage and costs. The chatbot is configured with reasonable limits:
- Max 500 completion tokens per response (using `max_completion_tokens` parameter)
- Temperature 0.7 for balanced creativity/accuracy
- Uses GPT-5-nano for optimal efficiency and latest capabilities
- Automatic session management reduces API calls

### Error Handling

The chatbot includes built-in error handling for:
- Missing API keys
- Network errors
- OpenAI API failures
- Rate limiting

## Production Deployment

### Environment Variables

Make sure to set your environment variables in your deployment platform:

**Vercel:**
```bash
vercel env add OPENAI_API_KEY
```

**Other platforms:**
Add `OPENAI_API_KEY` to your environment variables configuration.

### Security Notes

- Never commit your API keys to version control
- Use environment variables for all sensitive configuration
- Monitor your API usage to prevent unexpected costs
- Consider implementing rate limiting for production use

## Troubleshooting

### Common Issues

**"OpenAI API key not configured"**
- Ensure `.env.local` contains your API key
- Restart your development server after adding environment variables

**Chatbot not responding**
- Check browser console for errors
- Verify API key is valid and has sufficient credits
- Check network connectivity
- Ensure GPT-5-nano model is available in your OpenAI account

**Styling issues**
- Ensure Tailwind CSS is properly configured
- Check that all required classes are available
- Verify responsive breakpoints work correctly

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify your OpenAI API key is working
3. Test the API endpoints directly
4. Review the OpenAI documentation for rate limits and usage guidelines

## Next Steps

- Customize the system message for your specific use case
- Add more languages to the internationalization system
- Implement user authentication if needed
- Add analytics to track chatbot usage
- Set up Redis or database for production session storage
- Implement streaming responses for better UX
- Add conversation export/import functionality