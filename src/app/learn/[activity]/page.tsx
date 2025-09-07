'use client';

import { useParams } from 'next/navigation';
import { VocabularyActivity } from '@/components/activities/VocabularyActivity';
import { SpellingActivity } from '@/components/activities/SpellingActivity';
import { AiReviewActivity } from '@/components/activities/AiReviewActivity';
import { NotImplementedActivity } from '@/components/activities/NotImplementedActivity';
import { SentencesActivity } from '@/components/activities/SentencesActivity';
import { GrammarActivity } from '@/components/activities/GrammarActivity';

export default function ActivityPage() {
  const params = useParams();
  const activity = params.activity as string;

  const renderActivity = () => {
    switch (activity) {
      case 'vocabulary':
        return <VocabularyActivity />;
      case 'spelling':
        return <SpellingActivity />;
      case 'sentences':
        return <SentencesActivity />;
      case 'grammar':
        return <GrammarActivity />;
      case 'ai-review':
        return <AiReviewActivity />;
      default:
        return <NotImplementedActivity activityName={activity} />;
    }
  };

  return <div>{renderActivity()}</div>;
}
