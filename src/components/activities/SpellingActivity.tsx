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

export function SpellingActivity() {
  const { language, grade, updateScore } = useAppContext();
  const { toast } = useToast();
  const [exercises, setExercises] = useState<SpellingItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const generateExercises = useCallback(() => {
    if (!language || !grade) return;
    const spellingList = data[language][grade].spelling;
    const shuffled = [...spellingList].sort(() => 0.5 - Math.random());
    setExercises(shuffled.slice(0, Math.min(10, shuffled.length)));
    setCurrentExerciseIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
  }, [language, grade]);

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
      toast({ title: "Korrekt!", description: "Bra jobbat! +10 poäng." });
    } else {
      toast({ title: "Fel!", description: `Rätt svar var "${exercises[currentExerciseIndex].blank}".`, variant: "destructive" });
    }
  };

  const nextQuestion = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
    }
  };

  const currentExercise = exercises[currentExerciseIndex];

  if (!language || !grade || exercises.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">Stavning</h2>
        <p>Inga stavningsövningar tillgängliga.</p>
      </div>
    );
  }
  
  const progress = (currentExerciseIndex / exercises.length) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">Stavning: Fyll i luckan</h2>
        <Button onClick={generateExercises} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === 'serbian' ? 'Nove vežbe' : 'Nove vježbe'}
        </Button>
      </div>
      
      <Progress value={progress} className="mb-6" />

      {currentExerciseIndex < exercises.length ? (
        <Card>
          <CardHeader>
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
          <CardFooter className="justify-center mt-6">
            {!isAnswered ? (
              <Button onClick={checkAnswer} disabled={!selectedOption} size="lg">Kontrollera svar</Button>
            ) : (
              <div className="text-center">
                 {selectedOption === currentExercise.blank ? (
                    <p className="flex items-center gap-2 text-green-600 text-xl font-bold mb-4"><CheckCircle /> Rätt!</p>
                 ) : (
                    <p className="flex items-center gap-2 text-red-600 text-xl font-bold mb-4"><XCircle /> Fel! Rätt svar: {currentExercise.blank}</p>
                 )}
                <Button onClick={nextQuestion} size="lg">Nästa fråga</Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">Bra stavat!</h3>
            <p className="text-lg mb-6">Du fick {correctAnswers} av {exercises.length} rätt.</p>
            <Button onClick={generateExercises}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Gör om övningen
            </Button>
        </Card>
      )}
    </div>
  );
}
