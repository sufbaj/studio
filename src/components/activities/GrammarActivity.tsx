
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import type { GrammarItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const s = {
    bosnian: {
        title: 'Gramatika: Popuni prazninu',
        noExercises: 'Nema dostupnih gramatičkih vježbi.',
        newExercises: 'Nove vježbe',
        check: 'Provjeri',
        correct: 'Tačno!',
        incorrect: 'Netačno!',
        incorrectToastDescription: (answer: string) => `Tačan odgovor je bio "${answer}".`,
        explanation: 'Objašnjenje',
        nextQuestion: 'Sljedeće pitanje',
        showResults: 'Prikaži rezultate',
        finished: 'Vježba je gotova!',
        correctOutOf: (c: number, t: number) => `Imali ste ${c} od ${t} tačnih odgovora.`,
        practiceAgain: 'Vježbaj ponovo',
    },
    croatian: {
        title: 'Gramatika: Popuni prazninu',
        noExercises: 'Nema dostupnih gramatičkih vježbi.',
        newExercises: 'Nove vježbe',
        check: 'Provjeri',
        correct: 'Točno!',
        incorrect: 'Netočno!',
        incorrectToastDescription: (answer: string) => `Točan odgovor je bio "${answer}".`,
        explanation: 'Objašnjenje',
        nextQuestion: 'Sljedeće pitanje',
        showResults: 'Prikaži rezultate',
        finished: 'Vježba je gotova!',
        correctOutOf: (c: number, t: number) => `Imali ste ${c} od ${t} točnih odgovora.`,
        practiceAgain: 'Vježbaj ponovno',
    },
    serbian: {
        title: 'Gramatika: Popuni prazninu',
        noExercises: 'Nema dostupnih gramatičkih vežbi.',
        newExercises: 'Nove vežbe',
        check: 'Proveri',
        correct: 'Tačno!',
        incorrect: 'Netačno!',
        incorrectToastDescription: (answer: string) => `Tačan odgovor je bio "${answer}".`,
        explanation: 'Objašnjenje',
        nextQuestion: 'Sledeće pitanje',
        showResults: 'Prikaži rezultate',
        finished: 'Vežba je gotova!',
        correctOutOf: (c: number, t: number) => `Imali ste ${c} od ${t} tačnih odgovora.`,
        practiceAgain: 'Vežbaj ponovo',
    }
};


export function GrammarActivity() {
  const { language, grade, updateScore, setMaxScore, resetScore } = useAppContext();

  const [exercises, setExercises] = useState<GrammarItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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
      
    } else {
      
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
    const strings = language ? s[language] : s.bosnian;
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">{strings.title}</h2>
        <p>{strings.noExercises}</p>
      </div>
    );
  }

  const strings = s[language];
  const progress = (currentExerciseIndex / exercises.length) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">{strings.title}</h2>
        {!isQuizFinished && (
           <div className="text-lg font-semibold text-muted-foreground">
             {currentExerciseIndex + 1} / {exercises.length}
           </div>
         )}
        <Button onClick={generateExercises} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          {strings.newExercises}
        </Button>
      </div>
      
      <Progress value={isQuizFinished ? 100 : progress} className="mb-6" />

      {!isQuizFinished && currentExercise ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
                <div />
                <CardTitle className="text-center text-2xl md:text-3xl text-foreground">
                {currentExercise.sentence.split('___').map((part, index) => (
                    <span key={index}>
                    {part}
                    {index < currentExercise.sentence.split('___').length - 1 && (
                        <span className="inline-block bg-secondary text-secondary-foreground rounded-md px-4 py-2 mx-2 font-bold text-card-foreground min-w-[120px] text-center border-2 border-dashed border-border">
                        {isAnswered ? currentExercise.blank : selectedOption || '...'}
                        </span>
                    )}
                    </span>
                ))}
                </CardTitle>
                <div />
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
              <Button onClick={checkAnswer} disabled={!selectedOption} size="lg">{strings.check}</Button>
            ) : (
              <div className="text-center w-full">
                 {selectedOption === currentExercise.blank ? (
                    <p className="flex items-center justify-center gap-2 text-green-600 text-xl font-bold mb-4"><CheckCircle /> {strings.correct}</p>
                 ) : (
                    <p className="flex items-center justify-center gap-2 text-red-600 text-xl font-bold mb-4"><XCircle /> {strings.incorrect} {strings.incorrectToastDescription(currentExercise.blank)}</p>
                 )}
                <Alert className="mb-4 text-left">
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>{strings.explanation}</AlertTitle>
                  <AlertDescription>
                    {currentExercise.explanation}
                  </AlertDescription>
                </Alert>
                <Button onClick={nextQuestion} size="lg">
                    {currentExerciseIndex < exercises.length - 1 ? strings.nextQuestion : strings.showResults}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">{strings.finished}</h3>
            <p className="text-lg mb-6">{strings.correctOutOf(correctAnswers, exercises.length)}</p>
            <Button onClick={generateExercises}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {strings.practiceAgain}
            </Button>
        </Card>
      )}
    </div>
  );
}
