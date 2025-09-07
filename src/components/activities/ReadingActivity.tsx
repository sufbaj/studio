'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import type { ReadingItem, ReadingQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ReadingActivity() {
  const { language, grade, updateScore } = useAppContext();
  const { toast } = useToast();

  const [exercises, setExercises] = useState<ReadingItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  const generateExercises = useCallback(() => {
    if (!language || !grade) return;
    const readingList = data[language][grade].reading;
    const shuffled = [...readingList].sort(() => 0.5 - Math.random());
    setExercises(shuffled.slice(0, Math.min(2, shuffled.length))); // Take up to 2 texts
    setCurrentExerciseIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTotalCorrectAnswers(0);
  }, [language, grade]);

  useEffect(() => {
    generateExercises();
  }, [generateExercises]);

  const currentExercise = useMemo(() => exercises[currentExerciseIndex], [exercises, currentExerciseIndex]);
  const currentQuestion = useMemo(() => currentExercise?.questions[currentQuestionIndex], [currentExercise, currentQuestionIndex]);

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const checkAnswer = () => {
    if (!selectedOption || !currentQuestion) return;
    setIsAnswered(true);
    const correct = selectedOption === currentQuestion.answer;
    if (correct) {
      updateScore(15);
      setTotalCorrectAnswers(prev => prev + 1);
      toast({ title: "Tačno!", description: "Sjajno! +15 poena." });
    } else {
      toast({ title: "Netačno!", description: `Tačan odgovor je "${currentQuestion.answer}".`, variant: "destructive" });
    }
  };

  const next = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentExercise && currentQuestionIndex < currentExercise.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
      } else {
        // Quiz finished
        setCurrentExerciseIndex(exercises.length);
      }
    }
  };

  if (!language || !grade || exercises.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">Razumijevanje pročitanog</h2>
        <p>Nema dostupnih vježbi.</p>
      </div>
    );
  }
  
  const totalQuestions = exercises.reduce((acc, curr) => acc + curr.questions.length, 0);
  const answeredQuestions = exercises.slice(0, currentExerciseIndex).reduce((acc, curr) => acc + curr.questions.length, 0) + (currentExercise ? currentQuestionIndex : 0);
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  
  const isQuizFinished = currentExerciseIndex >= exercises.length;


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">Razumevanje pročitanog</h2>
        <Button onClick={generateExercises} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Nove vežbe
        </Button>
      </div>
      
      <Progress value={isQuizFinished ? 100 : progress} className="mb-6" />

      {!isQuizFinished && currentExercise && currentQuestion ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>{currentExercise.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-96">
                        <p className="text-muted-foreground whitespace-pre-line pr-4">{currentExercise.text}</p>
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pitanje {currentQuestionIndex + 1}</CardTitle>
                <CardDescription>{currentQuestion.question}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {currentQuestion.options.map(option => (
                  <Button
                    key={option}
                    variant="outline"
                    size="lg"
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswered}
                    className={cn(
                        "h-auto py-3 justify-start text-left",
                        selectedOption === option && "border-primary ring-2 ring-primary",
                        isAnswered && option === currentQuestion.answer && "bg-green-100 border-green-400 text-green-800",
                        isAnswered && selectedOption === option && option !== currentQuestion.answer && "bg-red-100 border-red-400 text-red-800"
                    )}
                  >
                    {isAnswered && (
                        option === currentQuestion.answer ? <CheckCircle className="mr-2 h-5 w-5 text-green-600" /> :
                        (selectedOption === option && <XCircle className="mr-2 h-5 w-5 text-red-600" />)
                    )}
                    {option}
                  </Button>
                ))}
              </CardContent>
              <CardFooter className="justify-end mt-6 flex-col items-end gap-4">
                {!isAnswered ? (
                  <Button onClick={checkAnswer} disabled={!selectedOption} size="lg">Proveri odgovor</Button>
                ) : (
                    <Button onClick={next} size="lg">
                        {currentQuestionIndex < currentExercise.questions.length - 1 || currentExerciseIndex < exercises.length - 1 ? 'Sledeće pitanje' : 'Vidi rezultate'}
                    </Button>
                )}
              </CardFooter>
            </Card>
        </div>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">Vežba završena!</h3>
            <p className="text-lg mb-6">Imali ste {totalCorrectAnswers} od {totalQuestions} tačnih odgovora.</p>
            <Button onClick={generateExercises}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Vežbaj ponovo
            </Button>
        </Card>
      )}
    </div>
  );
}
