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

interface TranslationActivityStrings {
    title: string;
    noExercises: string;
    newExercises: string;
    translateWord: (lang: string) => string;
    translateSentence: (lang: string) => string;
    enterTranslation: string;
    check: string;
    correct: string;
    greatJob: string;
    incorrect: string;
    correctAnswerIs: string;
    nextWord: string;
    nextSentence: string;
    seeResults: string;
    exerciseFinished: string;
    correctTranslationsOutOf: (correct: number, total: number) => string;
    practiceAgain: string;
}


const getStrings = (language: 'bosnian' | 'croatian' | 'serbian' | null): TranslationActivityStrings => {
    return {
      title: 'Svenska till modersmål',
      noExercises: 'Inga översättningsövningar tillgängliga.',
      newExercises: 'Nya övningar',
      translateWord: (lang) => `Översätt följande ord till ${lang}:`,
      translateSentence: (lang) => `Översätt följande mening till ${lang}:`,
      enterTranslation: 'Skriv in översättning...',
      check: 'Kontrollera',
      correct: 'Rätt!',
      greatJob: 'Snyggt!',
      incorrect: 'Fel!',
      correctAnswerIs: 'Rätt svar är:',
      nextWord: 'Nästa ord',
      nextSentence: 'Nästa mening',
      seeResults: 'Visa resultat',
      exerciseFinished: 'Övningen är klar!',
      correctTranslationsOutOf: (c, t) => `Du hade ${c} av ${t} rätta översättningar.`,
      practiceAgain: 'Öva igen',
    };
  }

export function TranslationActivity() {
  const { language, grade, updateScore, setMaxScore, resetScore } = useAppContext();
  const { toast } = useToast();
  const s = getStrings(language);

  const [exercises, setExercises] = useState<TranslationItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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
        return 'bosniska';
      case 'croatian':
        return 'kroatiska';
      case 'serbian':
        return 'serbiska';
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
      toast({ title: s.correct, description: `${s.greatJob} +${points} poäng.` });
    } else {
      toast({ title: s.incorrect, description: `${s.correctAnswerIs} "${currentExercise.target}".`, variant: "destructive" });
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
      setCurrentExerciseIndex(exercises.length);
    }
  };

  if (!language || !grade || exercises.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">{s.title}</h2>
        <p>{s.noExercises}</p>
      </div>
    );
  }

  const progress = (currentExerciseIndex / exercises.length) * 100;
  const isQuizFinished = currentExerciseIndex >= exercises.length;

  const getNextButtonText = () => {
    if (!currentExercise) return '';
    return currentExercise.type === 'word' ? s.nextWord : s.nextSentence;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">{s.title}</h2>
        {!isQuizFinished && (
           <div className="text-lg font-semibold text-muted-foreground">
             {currentExerciseIndex + 1} / {exercises.length}
           </div>
         )}
        <Button onClick={generateExercises} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          {s.newExercises}
        </Button>
      </div>

      <Progress value={isQuizFinished ? 100 : progress} className="mb-6" />

      {!isQuizFinished && currentExercise ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardDescription>
                {currentExercise.type === 'word' 
                    ? s.translateWord(getLanguageDisplayName()) 
                    : s.translateSentence(getLanguageDisplayName())
                }
            </CardDescription>
            <div className="flex items-center justify-center gap-4 py-4">
                <CardTitle className="text-3xl md:text-4xl font-bold font-headline text-foreground">{currentExercise.source}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {currentExercise.type === 'word' ? (
                <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={s.enterTranslation}
                className="text-center text-lg h-12"
                disabled={isAnswered}
                autoFocus
                />
            ) : (
                <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={s.enterTranslation}
                className="text-center text-lg min-h-[60px]"
                disabled={isAnswered}
                autoFocus
                />
            )}
          </CardContent>
          <CardFooter className="justify-center mt-4 flex-col gap-4">
            {!isAnswered ? (
              <Button onClick={checkAnswer} disabled={!inputValue} size="lg">{s.check}</Button>
            ) : (
              <div className="text-center w-full">
                 {isCorrect ? (
                    <div className="flex items-center justify-center gap-4">
                        <p className="flex items-center justify-center gap-2 text-green-600 text-xl font-bold mb-4"><CheckCircle /> {s.correct}</p>
                    </div>
                 ) : (
                    <p className="flex flex-col items-center justify-center gap-2 text-red-600 text-xl font-bold mb-4">
                        <span className="flex items-center gap-2"><XCircle /> {s.incorrect}</span>
                        <span className="text-base text-muted-foreground mt-2 flex items-center gap-2">
                            {s.correctAnswerIs} <span className="font-mono bg-red-100 px-2 py-1 rounded-md text-red-800">{currentExercise.target}</span>
                        </span>
                    </p>
                 )}
                <Button onClick={nextQuestion} size="lg">
                    {currentExerciseIndex < exercises.length - 1 ? getNextButtonText() : s.seeResults}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8 max-w-xl mx-auto">
          <h3 className="text-2xl font-headline mb-4">{s.exerciseFinished}</h3>
          <p className="text-lg mb-6">{s.correctTranslationsOutOf(correctAnswers, exercises.length)}</p>
          <Button onClick={generateExercises}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {s.practiceAgain}
          </Button>
        </Card>
      )}
    </div>
  );
}
