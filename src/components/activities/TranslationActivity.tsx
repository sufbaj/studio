'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import type { TranslationItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

export function TranslationActivity() {
  const { language, grade, updateScore } = useAppContext();
  const { toast } = useToast();

  const [exercises, setExercises] = useState<TranslationItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const generateExercises = useCallback(() => {
    if (!language || !grade) return;
    const translationList = data[language][grade].translations;
    const shuffled = [...translationList].sort(() => 0.5 - Math.random());
    setExercises(shuffled.slice(0, Math.min(10, shuffled.length)));
    setCurrentExerciseIndex(0);
    setInputValue('');
    setIsAnswered(false);
    setIsCorrect(null);
    setCorrectAnswers(0);
  }, [language, grade]);

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
    // Normalize answers for comparison: trim whitespace, convert to lowercase, and remove trailing punctuation.
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
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // Quiz finished
      setCurrentExerciseIndex(exercises.length);
    }
  };

  if (!language || !grade || exercises.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">Översättning</h2>
        <p>Nema dostupnih vježbi za prevođenje.</p>
      </div>
    );
  }

  const progress = (currentExerciseIndex / exercises.length) * 100;
  const isQuizFinished = currentExerciseIndex >= exercises.length;
  const nextButtonText = currentExercise?.type === 'word' 
    ? (language === 'serbian' ? 'Sledeća reč' : 'Sljedeća riječ') 
    : (language === 'serbian' ? 'Sledeća rečenica' : 'Sljedeća rečenica');

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">{language === 'serbian' ? 'Prevedi' : 'Prevedi'}</h2>
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
                {currentExercise.type === 'word' ? `Prevedi sljedeću riječ na ${getLanguageDisplayName()}:` : `Prevedi sljedeću rečenicu na ${getLanguageDisplayName()}:`}
            </CardDescription>
            <CardTitle className="text-3xl md:text-4xl font-bold font-headline py-4">{currentExercise.source}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentExercise.type === 'word' ? (
                <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Unesi prijevod..."
                className="text-center text-lg h-12"
                disabled={isAnswered}
                autoFocus
                />
            ) : (
                <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Unesi prijevod..."
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
                    <p className="flex items-center justify-center gap-2 text-green-600 text-xl font-bold mb-4"><CheckCircle /> Tačno!</p>
                 ) : (
                    <p className="flex flex-col items-center justify-center gap-2 text-red-600 text-xl font-bold mb-4">
                        <span className="flex items-center gap-2"><XCircle /> Netačno!</span>
                        <span className="text-base text-muted-foreground mt-2">Tačan odgovor je: <span className="font-mono bg-red-100 px-2 py-1 rounded-md text-red-800">{currentExercise.target}</span></span>
                    </p>
                 )}
                <Button onClick={nextQuestion} size="lg">
                    {currentExerciseIndex < exercises.length - 1 ? nextButtonText : 'Vidi rezultate'}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8 max-w-xl mx-auto">
          <h3 className="text-2xl font-headline mb-4">Vježba završena!</h3>
          <p className="text-lg mb-6">Imali ste {correctAnswers} od {exercises.length} tačnih prijevoda.</p>
          <Button onClick={generateExercises}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Vježbaj ponovo
          </Button>
        </Card>
      )}
    </div>
  );
}
