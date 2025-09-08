'use client';

import { useState, useCallback, useRef } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { reviewTextAction, generateSpeechAction } from '@/app/learn/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bot, Languages, Check, Pilcrow, Volume2 } from 'lucide-react';
import type { AiReviewOutput } from '@/ai/flows/ai-content-review';
import { Separator } from '../ui/separator';

function toTitleCase(str: string | null): 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian' {
    if (!str) return 'Bosnian'; // Default
    const titled = str.charAt(0).toUpperCase() + str.slice(1);
    if (['Swedish', 'Bosnian', 'Croatian', 'Serbian'].includes(titled)) {
        return titled as 'Swedish' | 'Bosnian' | 'Croatian' | 'Serbian';
    }
    return 'Bosnian';
}

export function AiReviewActivity() {
  const { language } = useAppContext();
  const { toast } = useToast();
  
  const [sourceText, setSourceText] = useState('');
  const [review, setReview] = useState<AiReviewOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const handlePlaySound = useCallback(async (text: string, id: string) => {
    if (playingId || !text) return;
    setPlayingId(id);
    try {
      const result = await generateSpeechAction({ text });
      if (result.error) {
        toast({ title: 'Greška', description: result.error, variant: 'destructive' });
        setPlayingId(null);
      } else if (result.audioData) {
        if (audioRef.current) {
          audioRef.current.src = result.audioData;
          audioRef.current.play();
        }
      }
    } catch (error) {
       toast({ title: 'Greška pri reprodukciji', description: 'Nije uspjelo generiranje zvuka.', variant: 'destructive' });
       setPlayingId(null);
    }
  }, [playingId, toast]);
  
  const handleAudioEnded = () => {
    setPlayingId(null);
  };

  const handleReview = async () => {
    if (!sourceText.trim()) {
      setReview(null);
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
            title: 'Ett fel uppstod',
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
        title: 'Ett oväntat fel uppstod',
        description: 'Kunde inte ansluta till AI. Försök igen senare.',
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

  const SoundButton = ({ text, id }: { text: string; id: string }) => (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => handlePlaySound(text, id)}
      disabled={!!playingId}
      className="text-muted-foreground"
    >
      {playingId === id ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
    </Button>
  );

  return (
    <div>
      <audio ref={audioRef} onEnded={handleAudioEnded} />
      <h2 className="text-3xl font-headline font-bold mb-4">AI återkoppling</h2>
      <p className="text-muted-foreground mb-6">
        Skriv en text på svenska eller {language} och få omedelbar feedback och översättning från AI. 
        Du kan skicka in texten med <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Cmd/Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>.
      </p>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle>Skriv din text här</CardTitle>
                <SoundButton text={sourceText} id="source-text" />
            </div>
        </CardHeader>
        <CardContent>
            <Textarea
                placeholder="Skriv några meningar..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={6}
            />
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
            <Button onClick={handleReview} disabled={isLoading || !sourceText.trim()}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                Granska text
            </Button>
        </CardFooter>
      </Card>
      
      {isLoading && (
        <Card className="mt-6">
            <CardContent className="p-6 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>AI analyserar din text...</p>
            </CardContent>
        </Card>
      )}

      {review && (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Resultat från AI</CardTitle>
                <CardDescription>Här är översättning och feedback för din text.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold flex items-center justify-between gap-2 mb-2">
                        <span className="flex items-center gap-2"><Languages className="w-5 h-5 text-primary" /> Översättning</span>
                        <SoundButton text={review.translation} id="translation" />
                    </h3>
                    <p className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{review.translation}</p>
                </div>
                
                <Separator />

                <div>
                     <h3 className="text-lg font-semibold flex items-center justify-between gap-2 mb-2">
                        <span className="flex items-center gap-2"><Pilcrow className="w-5 h-5 text-primary" /> Korrigerad text</span>
                        <SoundButton text={review.correctedText} id="corrected-text" />
                    </h3>
                    <p className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{review.correctedText}</p>
                </div>

                <Separator />
                
                <div>
                    <h3 className="text-lg font-semibold flex items-center justify-between gap-2 mb-2">
                        <span className="flex items-center gap-2"><Check className="w-5 h-5 text-primary" /> Feedback</span>
                        <SoundButton text={review.feedback} id="feedback" />
                    </h3>
                    <p className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap">{review.feedback}</p>
                </div>
            </CardContent>
        </Card>
      )}

    </div>
  );
}
