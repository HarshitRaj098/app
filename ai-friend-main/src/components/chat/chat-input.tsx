"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal } from 'lucide-react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useRef, useEffect } from 'react';

const formSchema = z.object({
  message: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (data: FormValues) => {
    if (!data.message.trim()) return;
    onSubmit(data.message);
    form.reset();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(handleSubmit)();
    }
  };

  const messageValue = form.watch('message');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [messageValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-start gap-3"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  {...field}
                  ref={textareaRef}
                  placeholder="Send a message..."
                  className="resize-none max-h-48 overflow-y-auto"
                  rows={1}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !messageValue.trim()}
          className="bg-accent text-accent-foreground hover:bg-accent/90 flex-shrink-0"
          aria-label="Send message"
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  );
}
