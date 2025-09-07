'use client';

import { VocabularyActivity } from '@/components/activities/VocabularyActivity';
import { SpellingActivity } from '@/components/activities/SpellingActivity';
import { AiReviewActivity } from '@/components/activities/AiReviewActivity';
import { NotImplementedActivity } from '@/components/activities/NotImplementedActivity';

interface ActivityPageProps {
  params: {
    activity: string;
  };
}

export default function ActivityPage({ params }: ActivityPageProps) {
  const { activity } = params;

  const renderActivity = () => {
    switch (activity) {
      case 'vocabulary':
        return <VocabularyActivity />;
      case 'spelling':
        return <SpellingActivity />;
      case 'ai-review':
        return <AiReviewActivity />;
      default:
        return <NotImplementedActivity activityName={activity} />;
    }
  };

  return <div>{renderActivity()}</div>;
}
