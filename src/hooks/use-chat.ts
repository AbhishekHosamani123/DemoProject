
'use client';

import { useState, ChangeEvent, FormEvent, useRef } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export interface UseChatOptions {
  initialMessages?: Message[];
  api: (messages: Message[]) => Promise<string>;
}

export function useChat({ initialMessages = [], api }: UseChatOptions) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const idCounter = useRef(initialMessages.length);
  const generateId = () => {
    idCounter.current += 1;
    return idCounter.current.toString();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newUserMessage: Message = { id: generateId(), role: 'user', content: input };
    const updatedMessages = [...messages, newUserMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const assistantResponse = await api(updatedMessages);
      const newAssistantMessage: Message = { id: generateId(), role: 'model', content: assistantResponse };
      setMessages(prevMessages => [...prevMessages, newAssistantMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = { id: generateId(), role: 'model', content: 'Sorry, something went wrong.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}
