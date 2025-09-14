'use client';

import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function NumbersActivity() {
  const { language, grade } = useAppContext();

  const numbers = (language && grade && data[language][grade].numbers) || [];

  if (!language || !grade) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-4">Brojevi</h2>
      <p className="text-muted-foreground mb-6">
        Pregled osnovnih i rednih brojeva.
      </p>

      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-4">
          {numbers.map((numberItem) => {
            return (
              <Card
                key={numberItem.number}
                className="transition-colors"
              >
                <CardHeader>
                    <CardTitle className="text-4xl font-bold font-headline text-center">
                        {numberItem.number}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-4 pt-0">
                  <div>
                    <p className="text-center">
                        <span className="font-semibold">Osnovni:</span> {numberItem.word}
                    </p>
                    <p className="text-center text-muted-foreground">
                        <span className="font-semibold">Redni:</span> {numberItem.ordinal}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
