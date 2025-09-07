'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { reviewTextAction } from '@/app/learn/actions';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AiReviewActivity() {
  const { language, grade, resetScore } = useAppContext();
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    resetScore();
  }, [resetScore]);

  const getLanguageDisplayName = () => {
    if (!language) return '';
    switch (language) {
      case 'bosnian':
        return 'bosanskom';
      case 'croatian':
        return 'hrvatskom';
      case 'serbian':
        return 'srpskom';
      default:
        return language;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text || !language || !grade) {
      toast({
        title: 'Fel',
        description: 'Se till att du har valt språk, årskurs och skrivit en text.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setFeedback(null);
    try {
      const result = await reviewTextAction({ text, language, grade });
      setFeedback(result.feedback);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Ett fel uppstod',
        description: 'Kunde inte få feedback från AI. Försök igen senare.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-4">AI Granskning</h2>
      <p className="text-muted-foreground mb-6">
        Skriv en text på {getLanguageDisplayName()} och få omedelbar feedback från vår AI-handledare. Du kan översätta en text, skriva en kort berättelse eller bara några meningar.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Din text</CardTitle>
          <CardDescription>Skriv eller klistra in din text i fältet nedan.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="Skriv din text här..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              className="mb-4"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !text}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Granskar...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Få feedback
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {feedback && (
        <Alert className="mt-6">
          <Bot className="h-4 w-4" />
          <AlertTitle className="font-headline">AI-Feedback</AlertTitle>
          <AlertDescription>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {feedback}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
