import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface EnvelopeIntroProps {
  onCelebrate: () => void;
  onOpen: () => void;
}

const OPEN_DELAY_MS = 1800;

export default function EnvelopeIntro({ onCelebrate, onOpen }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const { heading, subheading, buttonLabel } = birthdayConfig.welcome;

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onCelebrate();
    window.setTimeout(onOpen, OPEN_DELAY_MS);
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <motion.div
        className="relative mb-12 h-56 w-72 sm:h-64 sm:w-96"
        style={{ perspective: 900 }}
        animate={{ y: isOpening ? 0 : [0, -10, 0] }}
        transition={{ duration: 4, repeat: isOpening ? 0 : Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gold-300/50 blur-3xl"
          animate={{ scale: isOpening ? 1.6 : [1, 1.12, 1], opacity: isOpening ? 1 : [0.5, 0.8, 0.5] }}
          transition={{ duration: isOpening ? 0.8 : 3.2, repeat: isOpening ? 0 : Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute inset-x-6 top-4 bottom-6 z-10 rounded-xl bg-cream shadow-md"
          animate={{ y: isOpening ? -80 : 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
        />

        <div className="absolute inset-x-0 bottom-0 top-10 z-20 rounded-2xl bg-gradient-to-br from-blush-200 via-gold-100 to-lavender-100 shadow-xl ring-1 ring-gold-300/60" />

        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-10 z-30 h-[55%] origin-top bg-gradient-to-b from-blush-200 to-gold-100 [clip-path:polygon(0_0,100%_0,50%_100%)]"
          style={{ backfaceVisibility: 'hidden' }}
          animate={{ rotateX: isOpening ? 180 : 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeInOut' }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-[48%] z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blush-700 shadow-lg"
          animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.5 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <Heart className="h-5 w-5 fill-white text-white" />
        </motion.div>

        <span aria-hidden="true" className="twinkle absolute -left-2 top-6 h-2 w-2 rounded-full bg-gold-400" />
        <span aria-hidden="true" className="twinkle absolute -right-1 top-2 h-1.5 w-1.5 rounded-full bg-blush-400" style={{ animationDelay: '1s' }} />
        <span aria-hidden="true" className="twinkle absolute -bottom-2 right-8 h-2 w-2 rounded-full bg-lavender-400" style={{ animationDelay: '2s' }} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl font-display text-4xl font-semibold leading-[1.2] text-ink sm:text-6xl"
      >
        {heading}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="mt-5 max-w-md text-base leading-relaxed text-ink/75 sm:text-lg"
      >
        {subheading}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="mt-10"
      >
        <PrimaryButton onClick={handleOpen}>{buttonLabel}</PrimaryButton>
      </motion.div>
    </section>
  );
}
