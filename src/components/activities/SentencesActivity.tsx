'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import type { SentenceItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getStrings = (language: 'bosnian' | 'croatian' | 'serbian' | null) => {
    const isSerbian = language === 'serbian';
    return {
        title: isSerbian ? 'Sastavi rečenicu' : 'Sastavi rečenicu',
        description: isSerbian ? 'Postavi reči u pravilan redosled.' : 'Postavi riječi u pravilan redoslijed.',
        noExercises: isSerbian ? 'Nema dostupnih vežbi.' : 'Nema dostupnih vježbi.',
        newExercises: isSerbian ? 'Nove vežbe' : 'Nove vježbe',
        check: isSerbian ? 'Proveri' : 'Provjeri',
        correctToastTitle: 'Tačno!',
        correctToastDescription: 'Sjajno! +20 poena.',
        incorrectToastTitle: 'Netačno!',
        incorrectToastDescription: (answer: string) => isSerbian ? `Tačna rečenica je: "${answer}"` : `Tačna rečenica je: "${answer}"`,
        correct: 'Tačno!',
        incorrect: 'Netačno!',
        nextSentence: isSerbian ? 'Sledeća rečenica' : 'Sljedeća rečenica',
        showResults: isSerbian ? 'Prikaži rezultate' : 'Prikaži rezultate',
        finished: 'Vežba je gotova!',
        correctlyAssembled: (c: number, t: number) => isSerbian ? `Tačno ste sastavili ${c} od ${t} rečenica.` : `Tačno ste sastavili ${c} od ${t} rečenica.`,
        practiceAgain: isSerbian ? 'Vežbaj ponovo' : 'Vježbaj ponovo',
        dropHere: isSerbian ? 'Postavi reči ovde' : 'Postavi riječi ovdje',
    };
}

export function SentencesActivity() {
  const { language, grade, updateScore, setMaxScore, resetScore } = useAppContext();
  const { toast } = useToast();
  const s = getStrings(language);

  const [exercises, setExercises] = useState<SentenceItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [wordBank, setWordBank] = useState<string[]>([]);
  const [answerWords, setAnswerWords] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentExercise = useMemo(() => exercises[currentExerciseIndex], [exercises, currentExerciseIndex]);

  const generateExercises = useCallback(() => {
    if (!language || !grade) return;
    resetScore();
    const sentenceList = data[language][grade].sentences;
    const shuffled = shuffleArray(sentenceList);
    const selectedExercises = shuffled.slice(0, Math.min(5, shuffled.length));
    setExercises(selectedExercises);
    setMaxScore(selectedExercises.length * 20);
    setCurrentExerciseIndex(0);
    setCorrectAnswers(0);
  }, [language, grade, setMaxScore, resetScore]);

  useEffect(() => {
    generateExercises();
  }, [generateExercises]);

  useEffect(() => {
    if (currentExercise) {
      setWordBank(shuffleArray(currentExercise.sentence.split(' ')));
      setAnswerWords([]);
      setIsAnswered(false);
      setIsCorrect(null);
    }
  }, [currentExercise]);

  const handleWordClick = (word: string, from: 'bank' | 'answer') => {
    if (isAnswered) return;
    if (from === 'bank') {
      setWordBank(wordBank.filter((w, i) => `${w}-${i}` !== `${word}-${wordBank.indexOf(word)}`));
      setAnswerWords([...answerWords, word]);
    } else {
      setAnswerWords(answerWords.filter((w, i) => `${w}-${i}` !== `${word}-${answerWords.indexOf(word)}`));
      setWordBank([...wordBank, word]);
    }
  };

  const checkAnswer = () => {
    if (isAnswered) return;
    const constructedSentence = answerWords.join(' ');
    const correct = constructedSentence === currentExercise.sentence;

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      updateScore(20);
      setCorrectAnswers(prev => prev + 1);
      toast({ title: s.correctToastTitle, description: s.correctToastDescription });
    } else {
      toast({ title: s.incorrectToastTitle, description: s.incorrectToastDescription(currentExercise.sentence), variant: "destructive" });
    }
  };

  const nextQuestion = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      setCurrentExerciseIndex(exercises.length);
    }
  };

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
            <CardTitle className="text-center text-lg md:text-xl text-muted-foreground">
              {s.description}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-center">
            <div className="min-h-[4rem] w-full bg-secondary rounded-lg p-3 flex flex-wrap items-center justify-center gap-2 border-2 border-dashed border-border">
              {answerWords.map((word, index) => (
                 <motion.div key={`${word}-${index}`} layoutId={`word-${word}-${index}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleWordClick(word, 'answer')}
                      className={cn(
                        "text-lg cursor-pointer bg-background",
                        isAnswered && "cursor-default",
                        isAnswered && isCorrect && "border-green-500 text-green-700",
                        isAnswered && !isCorrect && "border-red-500 text-red-700"
                      )}
                    >
                      {word}
                    </Button>
                 </motion.div>
              ))}
               {answerWords.length === 0 && (
                <p className="text-muted-foreground">{s.dropHere}</p>
               )}
            </div>
            
            <div className="min-h-[5rem] w-full p-4 flex flex-wrap items-center justify-center gap-2">
                {wordBank.map((word, index) => (
                    <motion.div key={`${word}-${index}`} layoutId={`word-${word}-${index}`}>
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => handleWordClick(word, 'bank')}
                        className="text-lg cursor-pointer"
                        disabled={isAnswered}
                      >
                        {word}
                      </Button>
                    </motion.div>
                ))}
            </div>

          </CardContent>
          <CardFooter className="justify-center mt-6 flex-col gap-4">
            {!isAnswered ? (
              <Button onClick={checkAnswer} disabled={wordBank.length > 0} size="lg">{s.check}</Button>
            ) : (
              <>
                 {isCorrect ? (
                    <div className="flex items-center gap-4">
                        <p className="flex items-center gap-2 text-green-600 text-xl font-bold"><CheckCircle /> {s.correct}</p>
                    </div>
                 ) : (
                    <div className="text-center">
                        <p className="flex items-center justify-center gap-2 text-red-600 text-xl font-bold"><XCircle /> {s.incorrect}</p>
                        <p className="text-muted-foreground mt-1">{s.incorrectToastDescription(currentExercise.sentence)}</p>
                    </div>
                 )}
                <Button onClick={nextQuestion} size="lg">
                    {currentExerciseIndex < exercises.length - 1 ? s.nextSentence : s.showResults}
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">{s.finished}</h3>
            <p className="text-lg mb-6">{s.correctlyAssembled(correctAnswers, exercises.length)}</p>
            <Button onClick={generateExercises}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {s.practiceAgain}
            </Button>
        </Card>
      )}
    </div>
  );
}
