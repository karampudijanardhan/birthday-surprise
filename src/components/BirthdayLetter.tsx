import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Mail,
  Sparkles,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface BirthdayLetterProps {
  onContinue: () => void;
}

const FIRST_LINE_DELAY_S = 0.35;
const LINE_DELAY_S = 0.45;

function getLineClassName(index: number, total: number): string {
  if (index === 0) {
    return 'font-display text-xl font-semibold text-blue-800 sm:text-2xl';
  }

  if (index === total - 1) {
    return 'border-t border-blue-100 pt-5 font-display text-xl font-semibold text-blue-700 sm:text-2xl';
  }

  if (index === total - 2) {
    return 'pt-3 font-display text-lg italic text-slate-600 sm:text-xl';
  }

  return '';
}

export default function BirthdayLetter({
  onContinue,
}: BirthdayLetterProps) {
  const {
    heading,
    revealLabel,
    greeting,
    paragraphs,
    signoff,
    signature,
    continueLabel,
  } = birthdayConfig.letter;

  const [isRevealed, setIsRevealed] = useState(false);

  const lines = [greeting, ...paragraphs, signoff, signature];

  const continueDelay =
    FIRST_LINE_DELAY_S + lines.length * LINE_DELAY_S + 0.4;

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50 px-5 pb-20 pt-28 sm:px-8">
      {/* Soft background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

        <motion.div
          className="absolute left-[10%] top-[22%] text-blue-300/70"
          animate={{ y: [0, -10, 0], rotate: [0, 12, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Star className="h-6 w-6" />
        </motion.div>

        <motion.div
          className="absolute bottom-[18%] right-[10%] text-purple-300/70"
          animate={{ y: [0, 10, 0], rotate: [0, -12, 12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-7 w-7" />
        </motion.div>
      </div>

      {/* Heading */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-sm">
          <Heart className="h-4 w-4 fill-pink-300 text-pink-400" />
          A message from the heart
          <Heart className="h-4 w-4 fill-pink-300 text-pink-400" />
        </div>

        <h2 className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text font-display text-3xl font-semibold leading-tight text-transparent sm:text-5xl">
          {heading}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          Some words deserve to be read slowly and remembered for a long time.
          This little letter is written especially for you, Parameswari. 💙
        </p>
      </motion.header>

      <div className="mt-9 w-full max-w-3xl sm:mt-12">
        <AnimatePresence mode="wait">
          {isRevealed ? (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white/95 px-5 py-8 shadow-[0_20px_70px_rgba(59,130,246,0.12)] backdrop-blur-sm sm:px-10 sm:py-12 md:px-14"
            >
              {/* Decorative top line */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-400 via-purple-300 to-pink-300"
              />

              <div className="mb-8 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.15,
                    type: 'spring',
                    stiffness: 180,
                    damping: 12,
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-100 bg-blue-50 shadow-sm sm:h-16 sm:w-16"
                >
                  <Mail className="h-7 w-7 text-blue-600 sm:h-8 sm:w-8" />
                </motion.div>

                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
                  Just for you
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-blue-200" />
                  <Heart className="h-4 w-4 fill-pink-300 text-pink-400" />
                  <span className="h-px w-8 bg-blue-200" />
                </div>
              </div>

              <div className="space-y-5 text-left text-base leading-8 text-slate-700 sm:space-y-6 sm:text-lg sm:leading-9">
                {lines.map((line, index) => (
                  <motion.p
                    key={`${index}-${line}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: FIRST_LINE_DELAY_S + index * LINE_DELAY_S,
                      duration: 0.65,
                      ease: 'easeOut',
                    }}
                    className={getLineClassName(index, lines.length)}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: continueDelay,
                  duration: 0.6,
                }}
                className="mt-10 flex flex-col items-center"
              >
                <div className="mb-5 flex items-center gap-2 text-sm text-blue-500">
                  <Sparkles className="h-4 w-4" />
                  <span>With care and the very best wishes</span>
                  <Sparkles className="h-4 w-4" />
                </div>

                <PrimaryButton onClick={onContinue}>
                  {continueLabel}
                  <ArrowRight className="h-5 w-5" />
                </PrimaryButton>
              </motion.div>
            </motion.article>
          ) : (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, filter: 'blur(5px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-7"
            >
              {/* Animated envelope */}
              <motion.div
                className="relative h-48 w-64 sm:h-56 sm:w-80"
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-5 rounded-full bg-blue-300/30 blur-3xl"
                />

                {/* Letter peeking out */}
                <motion.div
                  aria-hidden="true"
                  className="absolute left-[14%] top-[4%] z-10 flex h-[75%] w-[72%] flex-col items-center rounded-t-xl border border-blue-100 bg-white px-4 pt-5 shadow-md"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Heart className="h-7 w-7 fill-pink-300 text-pink-400" />

                  <div className="mt-4 h-1 w-3/4 rounded-full bg-blue-100" />
                  <div className="mt-2 h-1 w-1/2 rounded-full bg-purple-100" />
                  <div className="mt-2 h-1 w-2/3 rounded-full bg-blue-100" />
                </motion.div>

                {/* Envelope body */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 z-20 h-[72%] overflow-hidden rounded-b-2xl border border-blue-200 bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 shadow-xl"
                >
                  <svg
                    viewBox="0 0 320 150"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                  >
                    <path
                      d="M0 0 L160 112 L320 0 L320 150 L0 150 Z"
                      fill="#dbeafe"
                    />
                    <path
                      d="M0 150 L112 58 L160 92 L208 58 L320 150"
                      fill="#bfdbfe"
                    />
                    <path
                      d="M0 0 L160 112 L320 0"
                      fill="none"
                      stroke="#93c5fd"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Envelope seal */}
                <motion.div
                  aria-hidden="true"
                  className="absolute bottom-[24%] left-1/2 z-30 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/70 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg sm:h-14 sm:w-14"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Heart className="h-5 w-5 fill-white text-white sm:h-6 sm:w-6" />
                </motion.div>

                <motion.div
                  aria-hidden="true"
                  className="absolute -right-1 top-3 z-30"
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-7 w-7 text-amber-400" />
                </motion.div>
              </motion.div>

              <p className="max-w-sm text-center text-sm leading-7 text-slate-600 sm:text-base">
                Take a little moment, open your letter, and read the birthday
                wishes waiting inside. 💌
              </p>

              <PrimaryButton onClick={() => setIsRevealed(true)}>
                <Mail className="h-5 w-5" />
                {revealLabel}
                <ArrowRight className="h-5 w-5" />
              </PrimaryButton>

              <p className="text-xs tracking-wide text-slate-500">
                Written especially for Parameswari 💙
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}