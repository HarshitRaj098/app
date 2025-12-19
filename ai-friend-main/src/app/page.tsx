
"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { type Message } from '@/lib/types';
import { sendMessage } from '@/app/actions';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "Hey! What's up? I'm here to chat about anything. 😊",
      createdAt: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (input: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessage(input);
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem sending your message.',
      });
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      <ChatHeader />
      <main className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </main>
      <footer className="p-4 border-t bg-background">
        <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
}
