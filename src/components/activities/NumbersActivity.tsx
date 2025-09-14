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
    <div className="flex flex-col gap-12">
        {/* Osnovni brojevi */}
        <div>
            <h2 className="text-3xl font-headline font-bold mb-2">Osnovni brojevi</h2>
            <p className="text-muted-foreground mb-6">
                Pregled osnovnih brojeva.
            </p>
            <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-4">
                {numbers.map((numberItem) => (
                    <Card
                        key={`cardinal-${numberItem.number}`}
                        className="transition-colors"
                    >
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold font-headline text-center">
                                {numberItem.number}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center p-4 pt-0">
                            <p className="text-center text-lg font-semibold">{numberItem.word}</p>
                        </CardContent>
                    </Card>
                ))}
                </div>
            </ScrollArea>
        </div>

        {/* Redni brojevi */}
        <div>
            <h2 className="text-3xl font-headline font-bold mb-2">Redni brojevi</h2>
            <p className="text-muted-foreground mb-6">
                Pregled rednih brojeva.
            </p>
            <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-4">
                {numbers.map((numberItem) => (
                    <Card
                        key={`ordinal-${numberItem.number}`}
                        className="transition-colors"
                    >
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold font-headline text-center">
                                {numberItem.number}.
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center p-4 pt-0">
                             <p className="text-center text-lg font-semibold">{numberItem.ordinal}</p>
                        </CardContent>
                    </Card>
                ))}
                </div>
            </ScrollArea>
        </div>
    </div>
  );
}
