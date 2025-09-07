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

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export function SentencesActivity() {
  const { language, grade, updateScore } = useAppContext();
  const { toast } = useToast();
  
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
    const sentenceList = data[language][grade].sentences;
    const shuffled = shuffleArray(sentenceList);
    setExercises(shuffled.slice(0, Math.min(5, shuffled.length)));
    setCurrentExerciseIndex(0);
    setCorrectAnswers(0);
  }, [language, grade]);

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
      setWordBank(wordBank.filter((w) => w !== word));
      setAnswerWords([...answerWords, word]);
    } else {
      setAnswerWords(answerWords.filter((w) => w !== word));
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
      toast({ title: "Tačno!", description: "Sjajno! +20 poena." });
    } else {
      toast({ title: "Netačno!", description: `Pravilan odgovor je: "${currentExercise.sentence}"`, variant: "destructive" });
    }
  };

  const nextQuestion = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Quiz finished, this state will be caught by the main render
    }
  };
  
  if (!language || !grade || exercises.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">Sastavljanje rečenica</h2>
        <p>Nema dostupnih vježbi.</p>
      </div>
    );
  }

  const progress = (currentExerciseIndex / exercises.length) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">Sastavi rečenicu</h2>
        <Button onClick={generateExercises} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Nove vježbe
        </Button>
      </div>
      
      <Progress value={progress} className="mb-6" />

      {currentExerciseIndex < exercises.length ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg md:text-xl text-muted-foreground">
              Poredaj riječi u ispravan redoslijed.
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8 items-center">
            {/* Answer Area */}
            <div className="min-h-[6rem] w-full bg-secondary rounded-lg p-4 flex flex-wrap items-center justify-center gap-2">
              {answerWords.map((word, index) => (
                 <motion.div key={index} layoutId={`word-${word}-${index}`}>
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
                <p className="text-muted-foreground">Ovdje poredaj riječi</p>
               )}
            </div>
            
            {/* Word Bank */}
            <div className="min-h-[6rem] w-full p-4 flex flex-wrap items-center justify-center gap-2">
                {wordBank.map((word, index) => (
                    <motion.div key={index} layoutId={`word-${word}-${index}`}>
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
              <Button onClick={checkAnswer} disabled={wordBank.length > 0} size="lg">Provjeri</Button>
            ) : (
              <>
                 {isCorrect ? (
                    <p className="flex items-center gap-2 text-green-600 text-xl font-bold"><CheckCircle /> Tačno!</p>
                 ) : (
                    <div className="text-center">
                        <p className="flex items-center justify-center gap-2 text-red-600 text-xl font-bold"><XCircle /> Netačno!</p>
                        <p className="text-muted-foreground mt-1">Ispravna rečenica je: "{currentExercise.sentence}"</p>
                    </div>
                 )}
                <Button onClick={nextQuestion} size="lg">
                    {currentExerciseIndex < exercises.length - 1 ? 'Sljedeća rečenica' : 'Vidi rezultate'}
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">Vježba završena!</h3>
            <p className="text-lg mb-6">Tačno si sastavio/la {correctAnswers} od {exercises.length} rečenica.</p>
            <Button onClick={generateExercises}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Sastavljaj ponovo
            </Button>
        </Card>
      )}
    </div>
  );
}