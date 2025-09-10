'use client';

import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { reviewTextAction } from '@/app/learn/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bot, Languages, Check, Pilcrow } from 'lucide-react';
import type { AiReviewOutput } from '@/ai/flows/ai-content-review';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';

function toTitleCase(str: string | null): 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian' {
  if (!str) return 'Bosnian'; // Default
  const titled = str.charAt(0).toUpperCase() + str.slice(1);
  if (['Swedish', 'Bosnian', 'Croatian', 'Serbian'].includes(titled)) {
    return titled as 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian';
  }
  return 'Bosnian';
}

const MAX_CHARS = 10000;

export function AiReviewActivity() {
  const { language } = useAppContext();
  const { toast } = useToast();

  const [sourceText, setSourceText] = useState('');
  const [review, setReview] = useState<AiReviewOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReview = async () => {
    if (!sourceText.trim() || sourceText.length > MAX_CHARS) {
      setReview(null);
       if (sourceText.length > MAX_CHARS) {
        toast({
            title: 'Previše teksta',
            description: `Tekst ne smije sadržavati više od ${MAX_CHARS} znakova.`,
            variant: 'destructive',
        });
       }
      return;
    }

    setIsLoading(true);
    setReview(null);
    try {
      const result = await reviewTextAction({
        text: sourceText,
        language: toTitleCase(language),
      });

      if (result.error) {
        toast({
          title: 'Došlo je do greške',
          description: result.error,
          variant: 'destructive',
        });
        setReview(null);
      } else if (result.review) {
        setReview(result.review);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Neočekivana greška',
        description: 'Povezivanje s AI nije uspjelo. Pokušajte ponovo kasnije.',
        variant: 'destructive',
      });
      setReview(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      handleReview();
    }
  };

  const charCount = sourceText.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-4">AI Lektor</h2>
      <p className="text-muted-foreground mb-6">
        Napišite tekst na švedskom ili na nekom od BHS jezika i dobijte trenutnu povratnu informaciju i prijevod od AI.
        Tekst možete poslati kombinacijom tipki <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Cmd/Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Napišite svoj tekst ovdje</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Napišite nekoliko rečenica..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={8}
            maxLength={MAX_CHARS + 500} // Allow typing past limit to not be annoying
          />
          <div className="text-right text-sm text-muted-foreground mt-2">
            <span className={cn(isOverLimit ? 'text-destructive' : '')}>{charCount}</span> / {MAX_CHARS}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button onClick={handleReview} disabled={isLoading || !sourceText.trim() || isOverLimit}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
            Lektoriši tekst
          </Button>
        </CardFooter>
      </Card>

      {isLoading && (
        <Card className="mt-6">
          <CardContent className="p-6 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>AI analizira vaš tekst...</p>
          </CardContent>
        </Card>
      )}

      {review && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Rezultati analize</CardTitle>
            <CardDescription>Ovdje su prijevod i povratne informacije za vaš tekst.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Languages className="w-5 h-5 text-primary" /> Prijevod
              </h3>
              <p className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{review.translation}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Pilcrow className="w-5 h-5 text-primary" /> Ispravljeni tekst
              </h3>
              <p className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{review.correctedText}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-primary" /> Povratne informacije
              </h3>
              <p className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{review.feedback}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
