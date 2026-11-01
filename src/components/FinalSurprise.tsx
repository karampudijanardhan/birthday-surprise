
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Gift,
  Heart,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface FinalSurpriseProps {
  onCelebrate: () => void;
  onReplay: () => void;
}

const PARTICLE_COUNT = 24;
const HEART_COUNT = 8;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 7) % 96}%`,
  top: `${(index * 53 + 11) % 95}%`,
  delay: (index % 8) * 0.35,
  size: index % 3 === 0 ? 5 : 3,
}));

const hearts = Array.from({ length: HEART_COUNT }, (_, index) => ({
  id: index,
  left: `${(index * 13 + 3) % 94}%`,
  delay: index * 1.1,
  duration: 8 + (index % 4) * 2,
}));

export default function FinalSurprise({
  onCelebrate,
  onReplay,
}: FinalSurpriseProps) {
  const {
    teaser,
    buttonLabel,
    heading,
    message,
    replayLabel,
  } = birthdayConfig.finalSurprise;

  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (isRevealed) return;

    setIsRevealed(true);
    onCelebrate();
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 px-5 py-24 text-center text-white sm:px-8">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[100px] sm:h-[35rem] sm:w-[35rem]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.45, 0.8, 0.45],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-blue-200"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              opacity: [0.15, 1, 0.15],
              scale: [0.7, 1.4, 0.7],
            }}
            transition={{
              duration: 2.5,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute bottom-[-40px]"
            style={{ left: heart.left }}
            animate={{
              y: [0, -1000],
              x: [0, 15, -12, 0],
              opacity: [0, 0.65, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Heart className="h-5 w-5 fill-blue-300/30 text-blue-200/50" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="gift-teaser"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex w-full max-w-xl flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-5 flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200 backdrop-blur-md sm:text-sm"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              A special birthday gift
              <Sparkles className="h-4 w-4 text-amber-300" />
            </motion.div>

            <h2 className="max-w-lg font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
              {teaser}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-blue-100/75 sm:text-base">
              There is one more little surprise waiting for you.
              Open it to discover the thought behind your gift. 💙
            </p>

            {/* Animated gift box */}
            <motion.div
              className="relative my-10 flex h-48 w-48 items-center justify-center sm:my-12 sm:h-56 sm:w-56"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-blue-400/15 blur-2xl"
                animate={{
                  scale: [0.85, 1.15, 0.85],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] border border-blue-200/30 bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800 shadow-[0_0_60px_rgba(59,130,246,0.35)] sm:h-44 sm:w-44"
                animate={{ rotate: [0, -2, 2, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 bg-blue-100/80 shadow-sm" />
                <div className="absolute inset-x-0 top-1/2 h-5 -translate-y-1/2 bg-blue-100/80 shadow-sm" />

                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-blue-700 shadow-lg sm:h-20 sm:w-20">
                  <Gift className="h-9 w-9 text-white sm:h-11 sm:w-11" />
                </div>
              </motion.div>

              <motion.div
                aria-hidden="true"
                className="absolute -right-1 top-4"
                animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Star className="h-7 w-7 fill-amber-300 text-amber-300" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                className="absolute -left-2 bottom-8"
                animate={{ rotate: [0, -20, 10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Sparkles className="h-8 w-8 text-blue-200" />
              </motion.div>
            </motion.div>

            <PrimaryButton onClick={handleReveal}>
              <Gift className="h-5 w-5" />
              {buttonLabel}
              <ArrowRight className="h-5 w-5" />
            </PrimaryButton>

            <p className="mt-6 text-xs tracking-wide text-blue-200/60 sm:text-sm">
              Made with care by Janardhan 💙
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="gift-reveal"
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 flex w-full max-w-3xl flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 12,
                delay: 0.2,
              }}
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-blue-200/30 bg-blue-400/10 shadow-[0_0_45px_rgba(96,165,250,0.25)] sm:h-24 sm:w-24"
            >
              <Gift className="h-10 w-10 text-blue-200 sm:h-12 sm:w-12" />
            </motion.div>

            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200 sm:text-sm">
              <Sparkles className="h-4 w-4" />
              A gift for your bright future
              <Sparkles className="h-4 w-4" />
            </p>

            <h2 className="max-w-2xl bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text font-display text-3xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl">
              {heading}
            </h2>

            {/* Actual Parker Classic Gold pen photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="my-8 w-full max-w-md overflow-hidden rounded-3xl border border-amber-200/30 bg-white p-4 shadow-2xl sm:my-10"
            >
              <img
                src="/images/parker-gold.jpeg"
                alt="Parker Classic Gold Ball Pen gift"
                className="mx-auto max-h-[420px] w-full object-contain"
              />

              <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                Parker Classic Gold
              </p>

              <p className="mt-2 text-center text-sm text-slate-600">
                Blue ink • A little gift for your big dreams.
              </p>
            </motion.div>

            {/* Short Parker history */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mb-6 max-w-xl rounded-2xl border border-blue-200/20 bg-white/[0.06] p-5 backdrop-blur-md"
            >
              <h3 className="mb-2 font-display text-xl text-amber-200">
                A Little Story Behind Parker
              </h3>
              <p className="text-sm leading-7 text-blue-100/80 sm:text-base">
                Founded in 1888 by George S. Parker, Parker has a long history
                of writing instruments known for their elegant design and
                craftsmanship.
              </p>
            </motion.div>

            {/* Personal gift message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="mb-5 flex items-center justify-center gap-2 text-blue-200">
                <Heart className="h-4 w-4 fill-blue-300 text-blue-300" />
                <span className="text-sm font-medium">For Parameswari</span>
                <Heart className="h-4 w-4 fill-blue-300 text-blue-300" />
              </div>

              <p className="whitespace-pre-line text-base leading-8 text-blue-50/90 sm:text-lg sm:leading-9">
                {message}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-9 flex flex-col items-center gap-4"
            >
              <p className="font-display text-xl italic text-blue-200 sm:text-2xl">
                Today, this pen is my gift. Tomorrow, let it write your success story. 💙
              </p>

              <PrimaryButton variant="ghost" onClick={onReplay}>
                <RotateCcw className="h-5 w-5" />
                {replayLabel}
              </PrimaryButton>

              <p className="mt-2 text-xs tracking-wide text-blue-200/60 sm:text-sm">
                With best wishes, Janardhan ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
