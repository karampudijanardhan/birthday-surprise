import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface BirthdayLetterProps {
  onContinue: () => void;
}

const FIRST_LINE_DELAY_S = 0.4;
const LINE_DELAY_S = 0.7;

function getLineClassName(index: number, total: number): string {
  if (index === 0) return 'font-display text-2xl font-semibold text-ink';
  if (index === total - 1) return 'font-display text-2xl font-semibold text-gold-700';
  if (index === total - 2) return 'pt-2 font-display text-xl italic text-ink/80';
  return '';
}

export default function BirthdayLetter({ onContinue }: BirthdayLetterProps) {
  const { heading, revealLabel, greeting, paragraphs, signoff, signature, continueLabel } =
    birthdayConfig.letter;
  const [isRevealed, setIsRevealed] = useState(false);
  const lines = [greeting, ...paragraphs, signoff, signature];
  const continueDelay = FIRST_LINE_DELAY_S + lines.length * LINE_DELAY_S;

  return (
    <section className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:px-8">
      <h2 className="font-display text-4xl font-semibold leading-[1.2] text-ink sm:text-5xl">
        {heading}
      </h2>

      <div className="mt-10 w-full">
        <AnimatePresence mode="wait">
          {isRevealed ? (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full rounded-3xl border border-gold-200 bg-[#fffdf9] px-6 py-10 text-left shadow-xl shadow-gold-300/30 sm:px-12 sm:py-14"
            >
              <Heart className="mx-auto mb-6 h-6 w-6 fill-blush-300 text-blush-600" aria-hidden="true" />
              <div className="space-y-5 text-base leading-[1.8] text-ink/85 sm:text-lg">
                {lines.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: FIRST_LINE_DELAY_S + index * LINE_DELAY_S, duration: 0.8, ease: 'easeOut' }}
                    className={getLineClassName(index, lines.length)}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: continueDelay, duration: 0.6 }}
                className="mt-10 flex justify-center"
              >
                <PrimaryButton onClick={onContinue}>
                  {continueLabel}
                  <ArrowRight className="h-5 w-5" />
                </PrimaryButton>
              </motion.div>
            </motion.article>
          ) : (
            <motion.div
              key="envelope"
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-8"
            >
              <svg viewBox="0 0 260 170" className="h-auto w-64 drop-shadow-lg sm:w-72" aria-hidden="true">
                <rect x="2" y="2" width="256" height="166" rx="16" fill="#f7ede5" stroke="#d4a085" strokeWidth="2" />
                <path d="M4 18 L130 104 L256 18" fill="none" stroke="#d4a085" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="130" cy="100" r="22" fill="#c44a74" />
              </svg>
              <PrimaryButton onClick={() => setIsRevealed(true)}>{revealLabel}</PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
