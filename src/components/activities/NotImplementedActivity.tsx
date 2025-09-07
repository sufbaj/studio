import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

interface NotImplementedActivityProps {
    activityName: string;
}

export function NotImplementedActivity({ activityName }: NotImplementedActivityProps) {
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <Wrench className="w-8 h-8 text-muted-foreground" />
          <span className="text-2xl font-headline">Under utveckling</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground">
          Sektionen "{capitalize(activityName)}" är inte implementerad än, men den kommer snart!
        </p>
      </CardContent>
    </Card>
  );
}
