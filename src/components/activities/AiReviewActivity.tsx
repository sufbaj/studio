'use client';

import { useState, useMemo } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { reviewTextAction } from '@/app/learn/actions';
import { Loader2, Bot, Languages, Check, Pilcrow } from 'lucide-react';
import type { AiReviewOutput } from '@/ai/flows/ai-content-review';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function toTitleCase(str: string | null): 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian' {
  if (!str) return 'Bosnian'; // Default
  const titled = str.charAt(0).toUpperCase() + str.slice(1);
  if (['Swedish', 'Bosnian', 'Croatian', 'Serbian'].includes(titled)) {
    return titled as 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian';
  }
  return 'Bosnian';
}

const MAX_CHARS = 2000;

export function AiReviewActivity() {
  const { language } = useAppContext();

  const [sourceText, setSourceText] = useState('');
  const [review, setReview] = useState<AiReviewOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const s = useMemo(() => {
    const isSerbian = language === 'serbian';
    return {
        title: isSerbian ? 'AI Lektor' : 'AI Lektor',
        description: isSerbian
            ? 'Napišite tekst na švedskom ili BKS jezicima i dobijte trenutnu povratnu informaciju i prevod od AI.'
            : 'Napišite tekst na švedskom ili BKS jezicima i dobijte trenutnu povratnu informaciju i prijevod od AI.',
        shortcut: isSerbian
            ? 'Tekst možete poslati prečicom'
            : 'Tekst možete poslati prečacem',
        cardTitle: isSerbian ? 'Napišite svoj tekst ovde' : 'Napišite svoj tekst ovdje',
        placeholder: isSerbian ? 'Napišite nekoliko rečenica...' : 'Napišite nekoliko rečenica...',
        toastTitleTooMuchText: isSerbian ? 'Previše teksta' : 'Previše teksta',
        toastDescTooMuchText: (max: number) => isSerbian ? `Tekst ne sme imati više od ${max} znakova.` : `Tekst ne smije imati više od ${max} znakova.`,
        buttonText: isSerbian ? 'Lektoriši tekst' : 'Lektoriraj tekst',
        loadingText: isSerbian ? 'AI analizira vaš tekst...' : 'AI analizira vaš tekst...',
        resultsTitle: isSerbian ? 'Rezultati analize' : 'Rezultati analize',
        resultsDescription: isSerbian ? 'Ovde su prevod i povratne informacije za vaš tekst.' : 'Ovdje su prijevod i povratne informacije za vaš tekst.',
        translation: isSerbian ? 'Prevod' : 'Prijevod',
        correctedText: isSerbian ? 'Ispravljen tekst' : 'Ispravljeni tekst',
        feedback: isSerbian ? 'Povratne informacije' : 'Povratne informacije',
        toastErrorTitle: isSerbian ? 'Došlo je do greške' : 'Došlo je do greške',
        toastUnexpectedErrorTitle: isSerbian ? 'Neočekivana greška' : 'Neočekivana greška',
        toastUnexpectedErrorDesc: isSerbian ? 'Povezivanje sa AI nije uspelo. Pokušajte ponovo kasnije.' : 'Povezivanje s AI nije uspjelo. Pokušajte ponovo kasnije.'
    };
  }, [language]);


  const handleReview = async () => {
    if (!sourceText.trim() || sourceText.length > MAX_CHARS) {
      setReview(null);
       if (sourceText.length > MAX_CHARS) {
        
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
        
        setReview(null);
      } else if (result.review) {
        setReview(result.review);
      }
    } catch (error) {
      console.error(error);
      
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
      <h2 className="text-3xl font-headline font-bold mb-4">{s.title}</h2>
      <p className="text-muted-foreground mb-6">
        {s.description} {s.shortcut}{' '}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Cmd/Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>{s.cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={s.placeholder}
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
            {s.buttonText}
          </Button>
        </CardFooter>
      </Card>

      {isLoading && (
        <Card className="mt-6">
          <CardContent className="p-6 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>{s.loadingText}</p>
          </CardContent>
        </Card>
      )}

      {review && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{s.resultsTitle}</CardTitle>
            <CardDescription>{s.resultsDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Pilcrow className="w-5 h-5 text-primary" /> {s.correctedText}
              </h3>
              <p className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{review.correctedText}</p>
            </div>

            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-primary" /> {s.feedback}
              </h3>
              <p className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{review.feedback}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Languages className="w-5 h-5 text-primary" /> {s.translation}
              </h3>
              <p className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{review.translation}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
