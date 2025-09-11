'use client';

import { useParams } from 'next/navigation';
import { VocabularyActivity } from '@/components/activities/VocabularyActivity';
import { SpellingActivity } from '@/components/activities/SpellingActivity';
import { NotImplementedActivity } from '@/components/activities/NotImplementedActivity';
import { SentencesActivity } from '@/components/activities/SentencesActivity';
import { GrammarActivity } from '@/components/activities/GrammarActivity';
import { ReadingActivity } from '@/components/activities/ReadingActivity';
import { AlphabetActivity } from '@/components/activities/AlphabetActivity';
import { NumbersActivity } from '@/components/activities/NumbersActivity';
import { TranslationActivity } from '@/components/activities/TranslationActivity';
import { TranslatorActivity } from '@/components/activities/TranslatorActivity';
import { AiReviewActivity } from '@/components/activities/AiReviewActivity';


export default function ActivityPage() {
  const params = useParams();
  const activity = params.activity as string;

  const renderActivity = () => {
    switch (activity) {
      case 'alphabet':
        return <AlphabetActivity />;
      case 'numbers':
        return <NumbersActivity />;
      case 'vocabulary':
        return <VocabularyActivity />;
      case 'spelling':
        return <SpellingActivity />;
      case 'sentences':
        return <SentencesActivity />;
      case 'grammar':
        return <GrammarActivity />;
      case 'reading':
        return <ReadingActivity />;
      case 'translation':
        return <TranslationActivity />;
      case 'translator':
        return <TranslatorActivity />;
      case 'ai-review':
        return <AiReviewActivity />;
      default:
        return <NotImplementedActivity activityName={activity} />;
    }
  };

  return <div>{renderActivity()}</div>;
}
