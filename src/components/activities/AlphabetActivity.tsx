'use client';

import { useState, useCallback, useRef } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Loader2 } from 'lucide-react';
import { generateSpeechAction } from '@/app/learn/actions';
import { useToast } from '@/hooks/use-toast';

export function AlphabetActivity() {
  const { language, grade } = useAppContext();
  const { toast } = useToast();
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const alphabet = (language && grade && data[language][grade].alphabet) || [];

  const handlePlaySound = useCallback(
    async (text: string) => {
      if (playingLetter) return;
      setPlayingLetter(text);
      try {
        const result = await generateSpeechAction({ text });
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
      } finally {
        // Delay clearing playing letter to allow audio to finish
      }
    },
    [playingLetter, toast]
  );

  const handleAudioEnded = () => {
    setPlayingLetter(null);
  };


  if (!language || !grade) {
    return null;
  }

  return (
    <div>
      <audio ref={audioRef} onEnded={handleAudioEnded} />
      <h2 className="text-3xl font-headline font-bold mb-4">Alfabet</h2>
      <p className="text-muted-foreground mb-6">
        Klikni na slovo da čuješ izgovor.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {alphabet.map(({ letter }, index) => {
          const letterStr = Array.isArray(letter) ? letter[0] : letter;
          const isPlaying = playingLetter === letterStr;
          return (
            <Card
              key={index}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handlePlaySound(letterStr)}
            >
              <CardContent className="flex flex-col items-center justify-center p-4 aspect-square">
                <div className="flex items-baseline">
                   <span className="text-4xl md:text-5xl font-bold font-headline">
                    {Array.isArray(letter) ? letter[0] : letter}
                   </span>
                   <span className="text-3xl md:text-4xl font-headline text-muted-foreground">
                    {Array.isArray(letter) ? letter[1] : ''}
                   </span>
                </div>
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
    </div>
  );
}
