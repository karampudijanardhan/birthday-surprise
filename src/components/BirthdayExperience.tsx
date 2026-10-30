import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BirthdayCake from '@/components/BirthdayCake';
import BirthdayHero from '@/components/BirthdayHero';
import BirthdayLetter from '@/components/BirthdayLetter';
import EnvelopeIntro from '@/components/EnvelopeIntro';
import FinalSurprise from '@/components/FinalSurprise';
import PhotoGallery from '@/components/PhotoGallery';
import ProgressIndicator from '@/components/ProgressIndicator';
import type { SceneId } from '@/types/birthday';

const SCENE_ORDER: SceneId[] = ['welcome', 'hero', 'gallery', 'letter', 'cake', 'final'];

interface BirthdayExperienceProps {
  onCelebrate: () => void;
  onReplay: () => void;
}

export default function BirthdayExperience({ onCelebrate, onReplay }: BirthdayExperienceProps) {
  const [scene, setScene] = useState<SceneId>('welcome');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [scene]);

  const renderScene = () => {
    switch (scene) {
      case 'welcome':
        return <EnvelopeIntro onCelebrate={onCelebrate} onOpen={() => setScene('hero')} />;
      case 'hero':
        return <BirthdayHero onContinue={() => setScene('gallery')} />;
      case 'gallery':
        return <PhotoGallery onContinue={() => setScene('letter')} />;
      case 'letter':
        return <BirthdayLetter onContinue={() => setScene('cake')} />;
      case 'cake':
        return <BirthdayCake onCelebrate={onCelebrate} onContinue={() => setScene('final')} />;
      case 'final':
        return <FinalSurprise onCelebrate={onCelebrate} onReplay={onReplay} />;
    }
  };

  return (
    <>
      {scene !== 'welcome' && (
        <ProgressIndicator current={SCENE_ORDER.indexOf(scene)} total={SCENE_ORDER.length} />
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
