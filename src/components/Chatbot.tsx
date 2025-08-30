'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle, Loader2, Bot, User } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const { t } = useI18n()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Persist session ID in localStorage
  useEffect(() => {
    if (isOpen && !sessionId) {
      const savedSessionId = localStorage.getItem('chatbot-session-id')
      if (savedSessionId) {
        setSessionId(savedSessionId)
      }
    }
  }, [isOpen, sessionId])

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('chatbot-session-id', sessionId)
    }
  }, [sessionId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Update session ID if this is a new conversation
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId)
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t('chatbot.error') || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const clearConversation = () => {
    setMessages([])
    setSessionId(null)
    localStorage.removeItem('chatbot-session-id')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-md h-[36rem] flex flex-col pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-semibold">{t('chatbot.title') || 'AI Assistant'}</h3>
          </div>
          <div className="flex items-center space-x-1">
            {messages.length > 0 && (
              <button
                onClick={clearConversation}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label={t('chatbot.close') || 'Close chat'}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <Bot className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">{t('chatbot.welcome') || 'Hi! How can I help you today?'}</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.role === 'assistant' && (
                    <Bot className="h-4 w-4 mt-0.5 text-gray-500" />
                  )}
                  {message.role === 'user' && (
                    <User className="h-4 w-4 mt-0.5 text-white/80" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm leading-relaxed">
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none text-gray-800">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                            table: ({children}) => (
                              <div className="my-2 space-y-1">
                                <div className="hidden">
                                  <table className="w-full border-collapse border border-gray-300 text-xs">
                                    {children}
                                  </table>
                                </div>
                                <div className="block">
                                  {React.Children.map(children, (child) => {
                                    if (React.isValidElement(child) && child.type === 'tbody') {
                                      return React.Children.map(child.props.children, (row, index) => {
                                        if (React.isValidElement(row)) {
                                          const cells = React.Children.toArray(row.props.children)
                                          return (
                                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-2 mb-2 text-xs">
                                              {cells.map((cell, cellIndex) => {
                                                if (React.isValidElement(cell)) {
                                                  const headers = ['Registro', 'Producto', 'Marca', 'Titular', 'País', 'Estado', 'Emisión', 'Vencimiento']
                                                  const header = headers[cellIndex] || `Campo ${cellIndex + 1}`
                                                  return (
                                                    <div key={cellIndex} className="flex justify-between py-1 border-b border-gray-200 last:border-b-0">
                                                      <span className="font-semibold text-gray-600 mr-2 flex-shrink-0">{header}:</span>
                                                      <span className="text-gray-800 text-right break-words">{cell.props.children}</span>
                                                    </div>
                                                  )
                                                }
                                                return null
                                              })}
                                            </div>
                                          )
                                        }
                                        return null
                                      })
                                    }
                                    return null
                                  })}
                                </div>
                              </div>
                            ),
                            thead: ({children}) => (
                              <thead className="bg-gray-50">{children}</thead>
                            ),
                            th: ({children}) => (
                              <th className="border border-gray-300 px-1 py-1 text-left font-semibold text-gray-700 text-xs">
                                {children}
                              </th>
                            ),
                            td: ({children}) => (
                              <td className="border border-gray-300 px-1 py-1 text-gray-800 text-xs break-words">
                                {children}
                              </td>
                            ),
                            p: ({children}) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            strong: ({children}) => (
                              <strong className="font-semibold text-gray-900">{children}</strong>
                            ),
                            code: ({children}) => (
                              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-gray-800">
                                {children}
                              </code>
                            ),
                            pre: ({children}) => (
                              <pre className="bg-gray-100 p-2 rounded my-2 overflow-x-auto text-xs">
                                {children}
                              </pre>
                            )
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-gray-500" />
                  <div className="flex items-center space-x-1">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {t('chatbot.typing') || 'Typing...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chatbot.placeholder') || 'Type your message...'}
              className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent max-h-20"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-2 rounded-lg hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
              aria-label={t('chatbot.send') || 'Send message'}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export function ChatbotToggle({ onClick }: { onClick: () => void }) {
  const { t } = useI18n()
  
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 rounded-full shadow-lg hover:from-primary-700 hover:to-secondary-700 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 z-40"
      aria-label={t('chatbot.open') || 'Open chat'}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}