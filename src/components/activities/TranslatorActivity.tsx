'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { translateTextAction } from '@/app/learn/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRightLeft, Languages } from 'lucide-react';
import type { Language } from '@/lib/types';
import { useDebounce } from 'use-debounce';

type LanguageOption = 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian';

function toTitleCase(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function TranslatorActivity() {
  const { language, resetScore } = useAppContext();
  const { toast } = useToast();
  
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState<LanguageOption>('Swedish');
  const [targetLang, setTargetLang] = useState<LanguageOption>('Bosnian');

  const [debouncedSourceText] = useDebounce(sourceText, 500);

  useEffect(() => {
    resetScore();
  }, [resetScore]);
  
  useEffect(() => {
    if (language) {
        setTargetLang(toTitleCase(language) as LanguageOption);
    }
  }, [language]);


  const getLanguageDisplayName = (lang: LanguageOption) => {
    switch (lang) {
        case 'Swedish': return 'Svenska';
        case 'Bosnian': return 'Bosanski';
        case 'Croatian': return 'Hrvatski';
        case 'Serbian': return 'Srpski';
    }
  }

  const handleTranslate = useCallback(async () => {
    if (!debouncedSourceText.trim()) {
      setTranslatedText('');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await translateTextAction({ 
        text: debouncedSourceText, 
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      });
      
      if (result.error) {
         toast({
            title: 'Ett fel uppstod',
            description: result.error,
            variant: 'destructive',
        });
        setTranslatedText('');
      } else if (result.translation) {
        setTranslatedText(result.translation);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Ett oväntat fel uppstod',
        description: 'Kunde inte ansluta till AI. Försök igen senare.',
        variant: 'destructive',
      });
       setTranslatedText('');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSourceText, sourceLang, targetLang, toast]);

  useEffect(() => {
    handleTranslate();
  }, [debouncedSourceText, sourceLang, targetLang, handleTranslate]);

  const handleSwitchLanguages = () => {
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-4">Översättare</h2>
      <p className="text-muted-foreground mb-6">
        Använd detta verktyg för att snabbt översätta ord och meningar mellan svenska och ditt valda språk.
      </p>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Languages className="w-8 h-8 text-primary" />
            <div>
                <CardTitle>AI Översättare</CardTitle>
                <CardDescription>Översätt mellan {getLanguageDisplayName(sourceLang)} och {getLanguageDisplayName(targetLang)}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center relative">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">{getLanguageDisplayName(sourceLang)}</label>
                <Textarea
                    placeholder={`Skriv text på ${getLanguageDisplayName(sourceLang)}...`}
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    rows={8}
                />
            </div>
            
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">{getLanguageDisplayName(targetLang)}</label>
                <div className="relative">
                <Textarea
                    placeholder="Översättning..."
                    value={translatedText}
                    readOnly
                    rows={8}
                    className="bg-muted/50"
                />
                {isLoading && <Loader2 className="absolute top-3 right-3 h-5 w-5 animate-spin text-muted-foreground" />}
                </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 my-4 md:my-0">
                <Button variant="outline" size="icon" onClick={handleSwitchLanguages}>
                    <ArrowRightLeft className="w-5 h-5" />
                    <span className="sr-only">Byt språk</span>
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
