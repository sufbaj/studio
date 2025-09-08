'use client';

import { useState, useCallback, useRef }
from 'react';
import { useAppContext }
from '@/contexts/AppContext';
import { data }
from '@/lib/data';
import { Card, CardContent }
from '@/components/ui/card';
import { Button }
from '@/components/ui/button';
import { Volume2, Loader2 }
from 'lucide-react';
import { generateSpeechAction }
from '@/app/learn/actions';
import { useToast }
from '@/hooks/use-toast';
import { ScrollArea }
from '@/components/ui/scroll-area';

const EMPTY_SOUND_DATA_URI = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";


export function NumbersActivity() {
  const { language, grade }
  = useAppContext();
  const { toast }
  = useToast();
  const [playingNumber, setPlayingNumber] = useState < number | null > (null);
  const audioRef = useRef < HTMLAudioElement | null > (null);

  const numbers = (language && grade && data[language][grade].numbers) || [];

  const handlePlaySound = useCallback(
    async (numberItem: { number: number; word: string }) => {
      if (playingNumber) return;

      if (audioRef.current) {
        audioRef.current.src = EMPTY_SOUND_DATA_URI;
        audioRef.current.play().catch(() => {});
      }

      setPlayingNumber(numberItem.number);

      try {
        const result = await generateSpeechAction({ text: numberItem.word });
        if (result.error) {
          toast({
            title: 'Greška',
            description: result.error,
            variant: 'destructive',
          });
        } else if (result.audioData) {
          if (audioRef.current) {
            audioRef.current.src = result.audioData;
            audioRef.current.play();
          }
        }
      } catch (error) {
        toast({
          title: 'Greška pri reprodukciji',
          description: 'Nije uspjelo generiranje zvuka.',
          variant: 'destructive',
        });
      }
    }, [playingNumber, toast]
  );

  const handleAudioEnded = () => {
    setPlayingNumber(null);
  };


  if (!language || !grade) {
    return null;
  }

  return (
    <div>
      <audio ref={audioRef} onEnded={handleAudioEnded} onPause={() => setPlayingNumber(null)} />
      <h2 className="text-3xl font-headline font-bold mb-4">Brojevi</h2>
      <p className="text-muted-foreground mb-6">
        Klikni na broj da čuješ izgovor.
      </p>

      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pr-4">
            {numbers.map((numberItem) => {
            const isPlaying = playingNumber === numberItem.number;
            return (
                <Card
                key={numberItem.number}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handlePlaySound(numberItem)}
                >
                <CardContent className="flex flex-col items-center justify-center p-4 aspect-video">
                    <span className="text-4xl font-bold font-headline">
                        {numberItem.number}
                    </span>
                    <p className="text-muted-foreground text-center mt-2">{numberItem.word}</p>
                    <Button variant="ghost" size="icon" className="mt-2 h-8 w-8">
                    {isPlaying ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Volume2 className="w-5 h-5" />
                    )}
                    </Button>
                </CardContent>
                </Card>
            );
            })}
        </div>
      </ScrollArea>
    </div>
  );
}
