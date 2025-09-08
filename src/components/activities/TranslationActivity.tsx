'use client';

import { useState, useEffect, useCallback, useMemo, useRef }
from 'react';
import { useAppContext }
from '@/contexts/AppContext';
import { data }
from '@/lib/data';
import type { TranslationItem }
from '@/lib/types';
import { Button }
from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
from '@/components/ui/card';
import { Input }
from '@/components/ui/input';
import { RefreshCw, CheckCircle, XCircle, Volume2, Loader2 }
from 'lucide-react';
import { useToast }
from '@/hooks/use-toast';
import { Progress }
from '@/components/ui/progress';
import { Textarea }
from '@/components/ui/textarea';
import { generateSpeechAction }
from '@/app/learn/actions';

const EMPTY_SOUND_DATA_URI = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";


export function TranslationActivity() {
  const { language, grade, updateScore, setMaxScore, resetScore }
  = useAppContext();
  const { toast }
  = useToast();

  const [exercises, setExercises] = useState < TranslationItem[] > ([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState < boolean | null > (null);
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
    const translationList = data[language][grade].translations;
    const shuffled = [...translationList].sort(() => 0.5 - Math.random());
    const selectedExercises = shuffled.slice(0, Math.min(10, shuffled.length));
    setExercises(selectedExercises);

    const max = selectedExercises.reduce((acc, curr) => acc + (curr.type === 'sentence' ? 20 : 10), 0);
    setMaxScore(max);

    setCurrentExerciseIndex(0);
    setInputValue('');
    setIsAnswered(false);
    setIsCorrect(null);
    setCorrectAnswers(0);
  }, [language, grade, setMaxScore, resetScore]);

  useEffect(() => {
    generateExercises();
  }, [generateExercises]);

  const currentExercise = useMemo(() => exercises[currentExerciseIndex], [exercises, currentExerciseIndex]);

  const getLanguageDisplayName = () => {
    if (!language) return '';
    switch (language) {
      case 'bosnian':
        return 'bosanski';
      case 'croatian':
        return 'hrvatski';
      case 'serbian':
        return 'srpski';
      default:
        return '';
    }
  }

  const checkAnswer = () => {
    if (!inputValue || !currentExercise) return;

    setIsAnswered(true);
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.!?]$/, '');
    const correct = normalize(inputValue) === normalize(currentExercise.target);
    setIsCorrect(correct);

    if (correct) {
      const points = currentExercise.type === 'sentence' ? 20 : 10;
      updateScore(points);
      setCorrectAnswers(prev => prev + 1);
      toast({ title: "Tačno!", description: `Sjajno! +${points} poena.` });
    } else {
      toast({ title: "Netačno!", description: `Tačan odgovor je "${currentExercise.target}".`, variant: "destructive" });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent < HTMLInputElement | HTMLTextAreaElement > ) => {
    if (event.key === 'Enter' && !isAnswered) {
      if (currentExercise.type === 'word' || (currentExercise.type === 'sentence' && !event.shiftKey)) {
        event.preventDefault();
        checkAnswer();
      }
    } else if (event.key === 'Enter' && isAnswered) {
      event.preventDefault();
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setInputValue('');
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      setCurrentExerciseIndex(exercises.length);
    }
  };

  if (!language || !grade || exercises.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">Svenska till modersmål</h2>
        <p>Nema dostupnih vježbi za prevođenje.</p>
      </div>
    );
  }

  const progress = (currentExerciseIndex / exercises.length) * 100;
  const isQuizFinished = currentExerciseIndex >= exercises.length;

  const getNextButtonText = () => {
    if (!currentExercise) return '';
    if (language === 'serbian') {
      return currentExercise.type === 'word' ? 'Sledeća reč' : 'Sledeća rečenica';
    }
    return currentExercise.type === 'word' ? 'Sljedeća riječ' : 'Sljedeća rečenica';
  };

  return (
    <div>
        <audio ref={audioRef} onEnded={handleAudioEnded} onPause={() => setPlayingText(null)} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">Svenska till modersmål</h2>
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
        <Card className="max-w-xl mx-auto">
          <CardHeader className="text-center">
            <CardDescription>
                {language === 'serbian' 
                  ? (currentExercise.type === 'word' ? `Prevedi sledeću reč na ${getLanguageDisplayName()}:` : `Prevedi sledeću rečenicu na ${getLanguageDisplayName()}:`)
                  : (currentExercise.type === 'word' ? `Prevedi sljedeću riječ na ${getLanguageDisplayName()}:` : `Prevedi sljedeću rečenicu na ${getLanguageDisplayName()}:`)
                }
            </CardDescription>
            <div className="flex items-center justify-center gap-4 py-4">
                <CardTitle className="text-3xl md:text-4xl font-bold font-headline">{currentExercise.source}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handlePlaySound(currentExercise.source)} disabled={!!playingText}>
                    {playingText === currentExercise.source ? <Loader2 className="w-6 h-6 animate-spin" /> : <Volume2 className="w-6 h-6" />}
                </Button>
            </div>
          </CardHeader>
          <CardContent>
            {currentExercise.type === 'word' ? (
                <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={language === 'serbian' ? 'Unesi prevod...' : 'Unesi prijevod...'}
                className="text-center text-lg h-12"
                disabled={isAnswered}
                autoFocus
                />
            ) : (
                <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={language === 'serbian' ? 'Unesi prevod...' : 'Unesi prijevod...'}
                className="text-center text-lg min-h-[100px]"
                disabled={isAnswered}
                autoFocus
                />
            )}
          </CardContent>
          <CardFooter className="justify-center mt-4 flex-col gap-4">
            {!isAnswered ? (
              <Button onClick={checkAnswer} disabled={!inputValue} size="lg">{language === 'serbian' ? 'Proveri' : 'Provjeri'}</Button>
            ) : (
              <div className="text-center w-full">
                 {isCorrect ? (
                    <div className="flex items-center justify-center gap-4">
                        <p className="flex items-center justify-center gap-2 text-green-600 text-xl font-bold mb-4"><CheckCircle /> Tačno!</p>
                         <Button variant="ghost" size="icon" onClick={() => handlePlaySound(currentExercise.target)} disabled={!!playingText}>
                            {playingText === currentExercise.target ? <Loader2 className="w-6 h-6 animate-spin" /> : <Volume2 className="w-6 h-6" />}
                        </Button>
                    </div>
                 ) : (
                    <p className="flex flex-col items-center justify-center gap-2 text-red-600 text-xl font-bold mb-4">
                        <span className="flex items-center gap-2"><XCircle /> Netačno!</span>
                        <span className="text-base text-muted-foreground mt-2 flex items-center gap-2">
                            Tačan odgovor je: <span className="font-mono bg-red-100 px-2 py-1 rounded-md text-red-800">{currentExercise.target}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handlePlaySound(currentExercise.target)} disabled={!!playingText}>
                                {playingText === currentExercise.target ? <Loader2 className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
                            </Button>
                        </span>
                    </p>
                 )}
                <Button onClick={nextQuestion} size="lg">
                    {currentExerciseIndex < exercises.length - 1 ? getNextButtonText() : 'Vidi rezultate'}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8 max-w-xl mx-auto">
          <h3 className="text-2xl font-headline mb-4">Vježba završena!</h3>
          <p className="text-lg mb-6">Imali ste {correctAnswers} od {exercises.length} tačnih {language === 'serbian' ? 'prevoda' : 'prijevoda'}.</p>
          <Button onClick={generateExercises}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Vježbaj ponovo
          </Button>
        </Card>
      )}
    </div>
  );
}
