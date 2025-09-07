'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function LearnPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.toString()) {
      router.replace(`/learn/vocabulary?${searchParams.toString()}`);
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
        <h1 className="text-2xl font-headline">Laddar övningar...</h1>
        <div className="space-y-2 w-full max-w-md">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-full" />
        </div>
    </div>
  )
}
