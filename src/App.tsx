import { MotionConfig } from 'framer-motion';
import { useCallback, useState } from 'react';
import BirthdayExperience from '@/components/BirthdayExperience';
import ConfettiEffect from '@/components/ConfettiEffect';
import FloatingDecorations from '@/components/FloatingDecorations';
import MusicToggle from '@/components/MusicToggle';
import { birthdayConfig } from '@/config/birthdayConfig';

function App() {
  const [runId, setRunId] = useState(0);
  const [burstId, setBurstId] = useState(0);

  const celebrate = useCallback(() => setBurstId((id) => id + 1), []);
  const replay = useCallback(() => setRunId((id) => id + 1), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-[100dvh] overflow-x-hidden">
        <FloatingDecorations />
        <main className="relative z-10">
          <BirthdayExperience key={runId} onCelebrate={celebrate} onReplay={replay} />
        </main>
        <ConfettiEffect burstId={burstId} colors={birthdayConfig.theme.confettiColors} />
        {birthdayConfig.music.enabled && (
          <MusicToggle src={birthdayConfig.music.src} title={birthdayConfig.music.title} />
        )}
      </div>
    </MotionConfig>
  );
}

export default App;
