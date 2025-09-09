'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatbotAction } from '@/app/learn/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Send, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Grade, Language } from '@/lib/types';


type ChatMessage = {
  role: 'user' | 'model';
  content: string;
};

function toTitleCase(str: string): 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian' {
  if (!str) return 'Bosnian'; // Default
  const titled = str.charAt(0).toUpperCase() + str.slice(1);
  if (['Swedish', 'Bosnian', 'Croatian', 'Serbian'].includes(titled)) {
    return titled as 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian';
  }
  return 'Bosnian';
}

export function AiAssistantActivity() {
  const { language, grade, resetScore } = useAppContext();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const getInitialMessage = useCallback((lang: Language) => {
    switch (lang) {
      case 'serbian':
        return { role: 'model', content: 'Zdravo! Ja sam Lingo, tvoj AI asistent. Kako mogu da ti pomognem danas sa učenjem jezika?' } as ChatMessage;
      default:
        return { role: 'model', content: 'Zdravo! Ja sam Lingo, tvoj AI asistent. Kako ti mogu pomoći danas s učenjem jezika?' } as ChatMessage;
    }
  }, []);

  useEffect(() => {
    resetScore();
    if(language) {
        setMessages([getInitialMessage(language)]);
    }
  }, [resetScore, language, getInitialMessage]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !language || !grade) return;
    
    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatbotAction({
        history: [...messages, userMessage],
        language: toTitleCase(language),
        grade: grade as Grade,
      });

      if (result.error) {
        toast({
          title: 'Ett fel uppstod',
          description: result.error,
          variant: 'destructive',
        });
        setMessages(prev => prev.slice(0, -1)); // Remove user message on error
      } else if (result.response) {
        const modelMessage: ChatMessage = { role: 'model', content: result.response };
        setMessages((prev) => [...prev, modelMessage]);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Ett oväntat fel uppstod',
        description: 'Kunde inte ansluta till AI. Försök igen senare.',
        variant: 'destructive',
      });
      setMessages(prev => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-headline font-bold flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" /> AI Asistent
        </h2>
        <p className="text-muted-foreground">Postavi pitanje i dobij pomoć od AI asistenta Lingo.</p>
      </div>
      
      <ScrollArea className="flex-1 p-4 border rounded-lg bg-muted/20" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : '')}>
              {message.role === 'model' && (
                <Avatar className="w-10 h-10 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div className={cn(
                  "max-w-lg p-3 rounded-lg whitespace-pre-wrap",
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'
              )}>
                <p>{message.content}</p>
              </div>
              {message.role === 'user' && (
                 <Avatar className="w-10 h-10">
                    <AvatarFallback><User /></AvatarFallback>
                 </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
               <Avatar className="w-10 h-10 border-2 border-primary">
                 <AvatarFallback className="bg-primary text-primary-foreground"><Bot /></AvatarFallback>
               </Avatar>
               <div className="max-w-lg p-3 rounded-lg bg-background flex items-center">
                 <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
               </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Napiši svoju poruku..."
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          <span className="sr-only">Pošalji</span>
        </Button>
      </div>
    </div>
  );
}
