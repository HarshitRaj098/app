
'use client';

import { type Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [isClient, setIsClient] = useState(false);
  const isAssistant = message.role === 'assistant';
  const riyaAvatar = PlaceHolderImages.find((p) => p.id === 'riya-avatar');
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={cn('flex items-start gap-3', !isAssistant && 'justify-end')}>
      {isAssistant && (
        <Avatar className="h-8 w-8">
          {riyaAvatar && (
            <AvatarImage
              src={riyaAvatar.imageUrl}
              alt="AI Friend"
              data-ai-hint={riyaAvatar.imageHint}
            />
          )}
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col gap-1 items-start">
        <div
          className={cn(
            'max-w-sm md:max-w-md rounded-lg p-3 shadow-sm',
            isAssistant
              ? 'bg-card text-card-foreground rounded-bl-none'
              : 'bg-primary text-primary-foreground rounded-br-none'
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <p
          className={cn(
            'text-xs',
            isAssistant ? 'text-muted-foreground' : 'text-muted-foreground self-end'
          )}
        >
          {isClient ? format(new Date(message.createdAt), 'p') : ''}
        </p>
      </div>

      {!isAssistant && (
        <Avatar className="h-8 w-8">
          {userAvatar && (
            <AvatarImage
              src={userAvatar.imageUrl}
              alt="User"
              data-ai-hint={userAvatar.imageHint}
            />
          )}
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export function TypingIndicator() {
  const riyaAvatar = PlaceHolderImages.find((p) => p.id === 'riya-avatar');
  return (
    <div className="flex items-end gap-3">
      <Avatar className="h-8 w-8">
        {riyaAvatar && (
          <AvatarImage
            src={riyaAvatar.imageUrl}
            alt="AI Friend"
            data-ai-hint={riyaAvatar.imageHint}
          />
        )}
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <div className="bg-card text-card-foreground rounded-lg p-3 shadow-md rounded-bl-none">
        <div className="flex gap-1.5 items-center h-5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0s' }}></span>
          <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.2s' }}></span>
          <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}
