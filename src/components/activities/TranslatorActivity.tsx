'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { translateTextAction } from '@/app/learn/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRightLeft, Languages } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type LanguageOption = 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian';
type GenderOption = 'male' | 'female';

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
  const [error, setError] = useState<string | null>(null);
  const [sourceLang, setSourceLang] = useState<LanguageOption>('Swedish');
  const [targetLang, setTargetLang] = useState<LanguageOption>('Bosnian');
  const [gender, setGender] = useState<GenderOption | undefined>(undefined);

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
      case 'Bosnian': return 'Bosniska';
      case 'Croatian': return 'Kroatiska';
      case 'Serbian': return 'Serbiska';
    }
  }

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) {
      setTranslatedText('');
      setError(null);
      return;
    }

    setIsLoading(true);
    setTranslatedText('');
    setError(null);
    
    try {
      const result = await translateTextAction({
        text: sourceText,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        gender: gender
      });

      if (result.error) {
        setError(result.error);
        toast({
          title: 'Ett fel uppstod',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.translation) {
        setTranslatedText(result.translation);
      }
    } catch (err) {
      const errorMessage = 'Anslutningen till AI misslyckades. Försök igen senare.';
      setError(errorMessage);
      console.error(err);
      toast({
        title: 'Oväntat fel',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLang, targetLang, gender, toast]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        if (!isLoading) {
            handleTranslate();
        }
    }
  };

  const handleSwitchLanguages = () => {
    const currentSourceText = sourceText;
    setSourceText(translatedText);
    setTranslatedText(currentSourceText);

    const currentSourceLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(currentSourceLang);
    setError(null);
  };

  const showGenderSelector = useMemo(() => {
    return targetLang !== 'Swedish';
  }, [targetLang]);


  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-4">Översättare</h2>
      <p className="text-muted-foreground mb-6">
        Använd detta verktyg för att snabbt översätta ord och meningar. Skicka texten med <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Cmd/Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>.
      </p>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Languages className="w-8 h-8 text-primary" />
            <div>
                <CardTitle>AI-översättare</CardTitle>
                <CardDescription>Översätt mellan språken: {getLanguageDisplayName(sourceLang)} och {getLanguageDisplayName(targetLang)}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start relative">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">{getLanguageDisplayName(sourceLang)}</label>
                <Textarea
                    placeholder={`Skriv text på ${getLanguageDisplayName(sourceLang)}...`}
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={6}
                />
            </div>
            
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">{getLanguageDisplayName(targetLang)}</label>
                <div className="relative">
                <Textarea
                    placeholder={isLoading ? "Översätter..." : "Översättning..."}
                    value={translatedText}
                    readOnly
                    rows={6}
                    className="bg-muted/50"
                />
                </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 my-4 md:my-0">
                <Button variant="outline" size="icon" onClick={handleSwitchLanguages} disabled={isLoading}>
                    <ArrowRightLeft className="w-5 h-5" />
                    <span className="sr-only">Byt språk</span>
                </Button>
            </div>
          </div>

           {error && (
             <Alert variant="destructive" className="mt-4">
                <AlertTitle>Översättningsfel</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
             </Alert>
           )}

        </CardContent>
        <CardFooter className="flex-col items-start gap-4 border-t pt-6">
            {showGenderSelector && (
              <div className='w-full'>
                  <Label>Grammatiskt genus (valfritt)</Label>
                  <RadioGroup 
                      onValueChange={(value) => setGender(value as GenderOption)} 
                      value={gender}
                      className="flex items-center gap-6 mt-2"
                  >
                      <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" disabled={isLoading} />
                          <Label htmlFor="male">Maskulinum</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" disabled={isLoading} />
                          <Label htmlFor="female">Femininum</Label>
                      </div>
                  </RadioGroup>
                  <Button variant="link" size="sm" className="px-0 h-auto mt-1" onClick={() => setGender(undefined)} disabled={isLoading}>Avmarkera</Button>
              </div>
            )}
             <Button onClick={handleTranslate} disabled={isLoading || !sourceText.trim()}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Översätt
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
