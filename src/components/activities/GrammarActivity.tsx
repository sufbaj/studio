'use client';

import { useState, useEffect, useCallback, useRef }
from 'react';
import { useAppContext }
from '@/contexts/AppContext';
import { data }
from '@/lib/data';
import type { GrammarItem }
from '@/lib/types';
import { Button }
from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle }
from '@/components/ui/card';
import { RefreshCw, CheckCircle, XCircle, Lightbulb, Volume2, Loader2 }
from 'lucide-react';
import { useToast }
from '@/hooks/use-toast';
import { Progress }
from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle }
from '@/components/ui/alert';
import { generateSpeechAction }
from '@/app/learn/actions';

const EMPTY_SOUND_DATA_URI = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";


export function GrammarActivity() {
  const { language, grade, updateScore, setMaxScore, resetScore }
  = useAppContext();
  const { toast }
  = useToast();
  const [exercises, setExercises] = useState < GrammarItem[] > ([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState < string | null > (null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [playingText, setPlayingText] = useState < string | null > (null);
  const audioRef = useRef < HTMLAudioElement | null > (null);

  const handlePlaySound = useCallback(async (text: string) => {
    if (playingText) return;

    if (audioRef.current) {
      audioRef.current.src = EMPTY_SOUND_DATA_URI;
      audioRef.current.play().catch(() => {});
    }

    setPlayingText(text);

    try {
      const result = await generateSpeechAction({ text });
      if (result.error) {
        toast({ title: 'Greška', description: result.error, variant: 'destructive' });
      } else if (result.audioData) {
        if (audioRef.current) {
          audioRef.current.src = result.audioData;
          audioRef.current.play();
        }
      }
    } catch (error) {
      toast({ title: 'Greška pri reprodukciji', description: 'Nije uspjelo generiranje zvuka.', variant: 'destructive' });
    }
  }, [playingText, toast]);

  const handleAudioEnded = () => {
    setPlayingText(null);
  };

  const generateExercises = useCallback(() => {
    if (!language || !grade) return;
    resetScore();
    const grammarList = data[language][grade].grammar;
    const shuffled = [...grammarList].sort(() => 0.5 - Math.random());
    const selectedExercises = shuffled.slice(0, Math.min(5, shuffled.length));
    setExercises(selectedExercises);
    setMaxScore(selectedExercises.length * 15);
    setCurrentExerciseIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
  }, [language, grade, setMaxScore, resetScore]);

  useEffect(() => {
    generateExercises();
  }, [generateExercises]);

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const checkAnswer = () => {
    if (!selectedOption || isAnswered) return;
    setIsAnswered(true);
    const correct = selectedOption === exercises[currentExerciseIndex].blank;
    if (correct) {
      updateScore(15);
      setCorrectAnswers(prev => prev + 1);
      toast({ title: "Tačno!", description: "Sjajno! +15 poena." });
    } else {
      toast({ title: "Netačno!", description: `Tačan odgovor je "${exercises[currentExerciseIndex].blank}".`, variant: "destructive" });
    }
  };

  const nextQuestion = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCurrentExerciseIndex(exercises.length);
    }
  };

  const currentExercise = exercises[currentExerciseIndex];
  const isQuizFinished = currentExerciseIndex >= exercises.length;


  if (!language || !grade || exercises.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">Gramatika</h2>
        <p>Nema dostupnih gramatičkih vježbi.</p>
      </div>
    );
  }

  const progress = (currentExerciseIndex / exercises.length) * 100;

  const sentenceText = currentExercise?.sentence.replace('___', '...');
  const isPlaying = playingText === sentenceText;

  return (
    <div>
        <audio ref={audioRef} onEnded={handleAudioEnded} onPause={() => setPlayingText(null)} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">Gramatika: Popuni prazninu</h2>
        {!isQuizFinished && (
           <div className="text-lg font-semibold text-muted-foreground">
             {currentExerciseIndex + 1} / {exercises.length}
           </div>
         )}
        <Button onClick={generateExercises} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === 'serbian' ? 'Nove vežbe' : 'Nove vježbe'}
        </Button>
      </div>
      
      <Progress value={isQuizFinished ? 100 : progress} className="mb-6" />

      {!isQuizFinished && currentExercise ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
                <div />
                <CardTitle className="text-center text-2xl md:text-3xl text-muted-foreground">
                {currentExercise.sentence.split('___').map((part, index) => (
                    <span key={index}>
                    {part}
                    {index < currentExercise.sentence.split('___').length - 1 && (
                        <span className="inline-block bg-secondary text-secondary-foreground rounded-md px-4 py-1 mx-2 font-bold text-card-foreground min-w-[120px] text-center">
                        {isAnswered ? currentExercise.blank : selectedOption || '...'}
                        </span>
                    )}
                    </span>
                ))}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handlePlaySound(sentenceText)} disabled={!!playingText}>
                    {isPlaying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5" />}
                </Button>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center flex-wrap gap-4">
            {currentExercise.options.sort(() => 0.5 - Math.random()).map(option => (
              <Button
                key={option}
                variant={selectedOption === option ? 'default' : 'secondary'}
                size="lg"
                onClick={() => handleSelectOption(option)}
                disabled={isAnswered}
                className="text-lg"
              >
                {option}
              </Button>
            ))}
          </CardContent>
          <CardFooter className="justify-center mt-6 flex-col gap-4">
            {!isAnswered ? (
              <Button onClick={checkAnswer} disabled={!selectedOption} size="lg">{language === 'serbian' ? 'Proveri' : 'Provjeri'}</Button>
            ) : (
              <div className="text-center w-full">
                 {selectedOption === currentExercise.blank ? (
                    <p className="flex items-center justify-center gap-2 text-green-600 text-xl font-bold mb-4"><CheckCircle /> Tačno!</p>
                 ) : (
                    <p className="flex items-center justify-center gap-2 text-red-600 text-xl font-bold mb-4"><XCircle /> Netačno! Tačan odgovor: {currentExercise.blank}</p>
                 )}
                <Alert className="mb-4 text-left">
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Objašnjenje</AlertTitle>
                  <AlertDescription>
                    {currentExercise.explanation}
                  </AlertDescription>
                </Alert>
                <Button onClick={nextQuestion} size="lg">
                    {currentExerciseIndex < exercises.length - 1 ? (language === 'serbian' ? 'Sledeće pitanje' : 'Sljedeće pitanje') : 'Vidi rezultate'}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">Vježba završena!</h3>
            <p className="text-lg mb-6">Imali ste {correctAnswers} od {exercises.length} tačnih odgovora.</p>
            <Button onClick={generateExercises}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Vježbaj ponovo
            </Button>
        </Card>
      )}
    </div>
  );
}
