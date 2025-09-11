'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import type { SpellingItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const getStrings = (language: 'bosnian' | 'croatian' | 'serbian' | null) => {
    const isSerbian = language === 'serbian';
    return {
        title: 'Pravopis: Popuni prazninu',
        noExercises: isSerbian ? 'Nema dostupnih vežbi za pravopis.' : 'Nema dostupnih vježbi za pravopis.',
        newExercises: isSerbian ? 'Nove vežbe' : 'Nove vježbe',
        check: isSerbian ? 'Proveri odgovor' : 'Provjeri odgovor',
        correctToastTitle: 'Tačno!',
        correctToastDescription: 'Bravo! +10 poena.',
        incorrectToastTitle: 'Netačno!',
        incorrectToastDescription: (answer: string) => isSerbian ? `Tačan odgovor je bio "${answer}".` : `Tačan odgovor je bio "${answer}".`,
        correct: 'Tačno!',
        incorrect: 'Netačno!',
        nextQuestion: isSerbian ? 'Sledeće pitanje' : 'Sljedeće pitanje',
        showResults: isSerbian ? 'Prikaži rezultate' : 'Prikaži rezultate',
        finished: 'Sjajno napisano!',
        correctOutOf: (c: number, t: number) => isSerbian ? `Imali ste ${c} od ${t} tačnih odgovora.` : `Imali ste ${c} od ${t} tačnih odgovora.`,
        practiceAgain: isSerbian ? 'Uradi vežbu ponovo' : 'Uradi vježbu ponovo',
    };
}

export function SpellingActivity() {
  const { language, grade, updateScore, setMaxScore, resetScore } = useAppContext();
  const { toast } = useToast();
  const s = getStrings(language);

  const [exercises, setExercises] = useState<SpellingItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const generateExercises = useCallback(() => {
    if (!language || !grade) return;
    resetScore();
    const spellingList = data[language][grade].spelling;
    const shuffled = [...spellingList].sort(() => 0.5 - Math.random());
    const selectedExercises = shuffled.slice(0, Math.min(10, shuffled.length));
    setExercises(selectedExercises);
    setMaxScore(selectedExercises.length * 10);
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
      updateScore(10);
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
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">{s.title}</h2>
        <p>{s.noExercises}</p>
      </div>
    );
  }

  const progress = (currentExerciseIndex / exercises.length) * 100;

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
        <Card>
          <CardHeader>
             <div className="flex items-center justify-center">
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
             </div>
          </CardHeader>
          <CardContent className="flex justify-center flex-wrap gap-4">
            {currentExercise.options.sort(() => 0.5 - Math.random()).map((option, index) => (
              <Button
                key={`${option}-${index}`}
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
          <CardFooter className="justify-center mt-6">
            {!isAnswered ? (
              <Button onClick={checkAnswer} disabled={!selectedOption} size="lg">{s.check}</Button>
            ) : (
              <div className="text-center">
                 {selectedOption === currentExercise.blank ? (
                    <p className="flex items-center gap-2 text-green-600 text-xl font-bold mb-4"><CheckCircle /> {s.correct}</p>
                 ) : (
                    <p className="flex items-center gap-2 text-red-600 text-xl font-bold mb-4"><XCircle /> {s.incorrect} {s.incorrectToastDescription(currentExercise.blank)}</p>
                 )}
                <Button onClick={nextQuestion} size="lg">
                    {currentExerciseIndex < exercises.length - 1 ? s.nextQuestion : s.showResults}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">{s.finished}</h3>
            <p className="text-lg mb-6">{s.correctOutOf(correctAnswers, exercises.length)}</p>
            <Button onClick={generateExercises}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {s.practiceAgain}
            </Button>
        </Card>
      )}
    </div>
  );
}
