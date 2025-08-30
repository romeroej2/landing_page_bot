'use client'

import React, { useState } from 'react'
import Chatbot, { ChatbotToggle } from './Chatbot'

export default function ChatbotProvider() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ChatbotToggle onClick={() => setIsOpen(true)} />
      <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}