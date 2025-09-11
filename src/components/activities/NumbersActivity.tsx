'use client';

import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
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
        Pregled brojeva od 0 do 100.
      </p>

      <ScrollArea className="h-[70vh]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pr-4">
          {numbers.map((numberItem) => {
            return (
              <Card
                key={numberItem.number}
                className="transition-colors"
              >
                <CardContent className="flex flex-col items-center justify-center p-4 aspect-video">
                  <span className="text-4xl font-bold font-headline">
                    {numberItem.number}
                  </span>
                  <p className="text-muted-foreground text-center mt-2">{numberItem.word}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
