import { NextRequest, NextResponse } from 'next/server'
import openai from '@/lib/openai'
import { CHATBOT_SYSTEM_PROMPT } from '@/config/chatbot-prompt'

// Store conversation sessions in memory (in production, use Redis or database)
const conversationSessions = new Map<string, Array<{ role: 'user' | 'assistant', content: string }>>()

// Vector store ID for file search
const VECTOR_STORE_ID = process.env.OPENAI_VECTOR_STORE_ID


export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get or create session
    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    let conversation = conversationSessions.get(currentSessionId) || []

    // Add user message to conversation
    conversation.push({ role: 'user', content: message })

    // System prompt for the dietary supplements registry assistant
    const systemMessage = {
      role: 'system' as const,
      content: CHATBOT_SYSTEM_PROMPT
    }

    // Use the Responses API with file search (if vector store is configured)
    const tools = VECTOR_STORE_ID ? [{
      type: 'file_search' as const,
      vector_store_ids: [VECTOR_STORE_ID]
    }] : []

    console.log('VECTOR_STORE_ID:', VECTOR_STORE_ID)
    console.log('Tools configuration:', tools)

    const completion = await openai.responses.create({
      model: 'gpt-4o',
      input: `${systemMessage.content}\n\nConversation history:\n${conversation.map(msg => `${msg.role}: ${msg.content}`).join('\n')}\n\nUser: ${message}`,
      ...(tools.length > 0 && { tools })
    })

    console.log('Request sent with tools:', tools.length > 0 ? 'YES' : 'NO')

    // Extract the assistant message - OpenAI returns the text in output_text
    const assistantMessage = (completion as any).output_text || ''
    
    if (!assistantMessage) {
      console.error('Failed to extract message from completion:', completion)
      throw new Error('No response content could be extracted from OpenAI')
    }

    // Add assistant response to conversation
    conversation.push({ role: 'assistant', content: assistantMessage })
    
    // Store updated conversation (limit to last 20 messages for memory management)
    if (conversation.length > 20) {
      conversation = conversation.slice(-20)
    }
    conversationSessions.set(currentSessionId, conversation)

    return NextResponse.json({
      message: assistantMessage,
      sessionId: currentSessionId,
    })

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Handle OpenAI API errors specifically
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API key not configured' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}