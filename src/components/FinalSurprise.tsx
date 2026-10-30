import { AnimatePresence, motion } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface FinalSurpriseProps {
  onCelebrate: () => void;
  onReplay: () => void;
}

const PARTICLE_COUNT = 18;
const HEART_COUNT = 7;

export default function FinalSurprise({ onCelebrate, onReplay }: FinalSurpriseProps) {
  const { teaser, buttonLabel, heading, message, replayLabel } = birthdayConfig.finalSurprise;
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    onCelebrate();
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-midnight-950 via-midnight-800 to-midnight-700 px-6 py-24 text-center text-blush-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {Array.from({ length: PARTICLE_COUNT }, (_, index) => (
          <span
            key={`particle-${index}`}
            className="twinkle absolute h-1 w-1 rounded-full bg-blush-200"
            style={{
              left: `${(index * 23) % 100}%`,
              top: `${(index * 37 + 11) % 100}%`,
              animationDelay: `${(index % 6) * 0.5}s`,
            }}
          />
        ))}
        {Array.from({ length: HEART_COUNT }, (_, index) => (
          <Heart
            key={`heart-${index}`}
            className="float-up h-5 w-5 fill-blush-300/60 text-blush-300/60"
            style={{
              left: `${(index * 15 + 5) % 92}%`,
              animationDelay: `${index * 1.8}s`,
              animationDuration: `${12 + (index % 3) * 3}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {isRevealed ? (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-w-2xl flex-col items-center"
          >
            <h2 className="font-display text-4xl font-semibold leading-[1.2] text-white sm:text-6xl">
              {heading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-blush-100 sm:text-lg">{message}</p>
            <div className="mt-10">
              <PrimaryButton variant="ghost" onClick={onReplay}>
                <RotateCcw className="h-5 w-5" />
                {replayLabel}
              </PrimaryButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="teaser"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            <p className="mb-10 font-display text-2xl italic text-blush-100 sm:text-3xl">{teaser}</p>
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-10 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-blush-400/80 to-lavender-400/80 shadow-[0_0_80px_rgba(240,135,168,0.55)] sm:h-44 sm:w-44"
            >
              <Heart className="h-16 w-16 fill-white text-white sm:h-20 sm:w-20" />
            </motion.div>
            <PrimaryButton onClick={handleReveal}>{buttonLabel}</PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
