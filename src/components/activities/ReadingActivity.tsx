'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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

interface ReadingActivityStrings {
  title: string;
  question: string;
  of: string;
  newExercises: string;
  checkAnswer: string;
  nextQuestion: string;
  seeResults: string;
  exerciseFinished: string;
  correctAnswersOutOf: (correct: number, total: number) => string;
  practiceAgain: string;
  noExercises: string;
  correctToastTitle: string;
  correctToastDescription: string;
  incorrectToastTitle: string;
  incorrectToastDescription: (answer: string) => string;
}

const getStrings = (language: 'bosnian' | 'croatian' | 'serbian' | null): ReadingActivityStrings => {
    const isSerbian = language === 'serbian';
    return {
      title: isSerbian ? 'Čitanje s razumevanjem' : 'Čitanje s razumijevanjem',
      question: isSerbian ? 'Pitanje' : 'Pitanje',
      of: isSerbian ? 'od' : 'od',
      newExercises: isSerbian ? 'Nove vežbe' : 'Nove vježbe',
      checkAnswer: isSerbian ? 'Proveri odgovor' : 'Provjeri odgovor',
      nextQuestion: isSerbian ? 'Sledeće pitanje' : 'Sljedeće pitanje',
      seeResults: isSerbian ? 'Prikaži rezultate' : 'Prikaži rezultate',
      exerciseFinished: isSerbian ? 'Vežba je gotova!' : 'Vježba je gotova!',
      correctAnswersOutOf: (c, t) => isSerbian ? `Imali ste ${c} od ${t} tačnih odgovora.` : `Imali ste ${c} od ${t} tačnih odgovora.`,
      practiceAgain: isSerbian ? 'Vežbaj ponovo' : 'Vježbaj ponovo',
      noExercises: isSerbian ? 'Nema dostupnih vežbi.' : 'Nema dostupnih vježbi.',
      correctToastTitle: 'Tačno!',
      correctToastDescription: 'Sjajno! +15 poena.',
      incorrectToastTitle: 'Netačno!',
      incorrectToastDescription: (a) => isSerbian ? `Tačan odgovor je bio "${a}".` : `Tačan odgovor je bio "${a}".`,
    };
}

export function ReadingActivity() {
  const { language, grade, updateScore, setMaxScore, resetScore } = useAppContext();
  const { toast } = useToast();
  const s = getStrings(language);

  const [exercises, setExercises] = useState<ReadingItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const sentencesRef = useRef<string[]>([]);

  const generateExercises = useCallback(() => {
    if (!language || !grade) return;
    resetScore();
    const readingList = data[language][grade].reading;
    const shuffled = [...readingList].sort(() => 0.5 - Math.random());
    const selectedExercises = shuffled.slice(0, Math.min(2, shuffled.length));
    setExercises(selectedExercises);

    const totalQuestions = selectedExercises.reduce((acc, curr) => acc + curr.questions.length, 0);
    setMaxScore(totalQuestions * 15);

    setCurrentExerciseIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTotalCorrectAnswers(0);
  }, [language, grade, setMaxScore, resetScore]);

  useEffect(() => {
    generateExercises();
  }, [generateExercises]);

  const currentExercise = useMemo(() => exercises[currentExerciseIndex], [exercises, currentExerciseIndex]);
  const currentQuestion = useMemo(() => currentExercise?.questions[currentQuestionIndex], [currentExercise, currentQuestionIndex]);

  useEffect(() => {
    if (currentExercise) {
      sentencesRef.current = currentExercise.text.match(/[^.!?]+[.!?]+/g) || [];
    }
  }, [currentExercise]);


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
      
    } else {
      
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
        setCurrentExerciseIndex(exercises.length);
      }
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

  const totalQuestions = exercises.reduce((acc, curr) => acc + curr.questions.length, 0);
  const answeredQuestions = exercises.slice(0, currentExerciseIndex).reduce((acc, curr) => acc + curr.questions.length, 0) + (currentExercise ? currentQuestionIndex : 0);
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  const isQuizFinished = currentExerciseIndex >= exercises.length;


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">{s.title}</h2>
        {!isQuizFinished && (
          <div className="text-lg font-semibold text-muted-foreground">
            {s.question} {answeredQuestions + 1} / {totalQuestions}
          </div>
        )}
        <Button onClick={generateExercises} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          {s.newExercises}
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
              <ScrollArea className="h-72">
                <div className="text-foreground/90 whitespace-pre-line pr-4">
                  {sentencesRef.current.map((sentence, index) => (
                    <span
                      key={index}
                      className="transition-colors duration-300"
                    >
                      {sentence}
                    </span>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{s.question} {currentQuestionIndex + 1}</CardTitle>
              <CardDescription className="text-foreground font-semibold">{currentQuestion.question}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {currentQuestion.options.map(option => (
                <Button
                  key={option}
                  variant="outline"
                  size="lg"
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={cn(
                    "h-auto py-3 justify-start text-left text-base",
                    "text-foreground/90",
                    selectedOption === option && "border-primary ring-2 ring-primary",
                    isAnswered && option === currentQuestion.answer && "bg-green-100 border-green-400 text-green-900 font-semibold",
                    isAnswered && selectedOption === option && option !== currentQuestion.answer && "bg-red-100 border-red-400 text-red-900 font-semibold"
                  )}
                >
                  {isAnswered && (
                    option === currentQuestion.answer ? <CheckCircle className="mr-2 h-5 w-5 text-green-600" /> :
                      (selectedOption === option && <XCircle className="mr-2 h-5 w-5 text-red-600" />)
                  )}
                   {!isAnswered && (<div className="w-5 mr-2" />) }
                  {option}
                </Button>
              ))}
            </CardContent>
            <CardFooter className="justify-end mt-4 flex-col items-end gap-4">
              {!isAnswered ? (
                <Button onClick={checkAnswer} disabled={!selectedOption}>{s.checkAnswer}</Button>
              ) : (
                <Button onClick={next}>
                  {currentQuestionIndex < currentExercise.questions.length - 1 || currentExerciseIndex < exercises.length - 1 ? s.nextQuestion : s.seeResults}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card className="text-center p-8">
          <h3 className="text-2xl font-headline mb-4">{s.exerciseFinished}</h3>
          <p className="text-lg mb-6">{s.correctAnswersOutOf(totalCorrectAnswers, totalQuestions)}</p>
          <Button onClick={generateExercises}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {s.practiceAgain}
          </Button>
        </Card>
      )}
    </div>
  );
}
