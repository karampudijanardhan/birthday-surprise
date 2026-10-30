import { motion } from 'framer-motion';
import { ArrowRight, Gift } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface BirthdayHeroProps {
  onContinue: () => void;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const BALLOONS = [
  { color: '#f9aec6', position: 'left-3 top-28 sm:left-[8%] sm:top-[26%]', delay: 0 },
  { color: '#c5b5ef', position: 'right-3 top-36 sm:right-[9%] sm:top-[20%]', delay: 1.4 },
  { color: '#eedacb', position: 'hidden bottom-16 left-8 sm:block sm:bottom-[14%] sm:left-[16%]', delay: 2.6 },
  { color: '#fccfdc', position: 'hidden bottom-20 right-6 sm:block sm:bottom-[20%] sm:right-[16%]', delay: 0.8 },
];

function Balloon({ color, position, delay }: { color: string; position: string; delay: number }) {
  return (
    <div
      aria-hidden="true"
      className={`balloon-bob absolute h-24 w-[4.5rem] opacity-90 sm:h-32 sm:w-24 ${position}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 80 130" className="h-full w-full">
        <path
          d="M40 4C66 4 76 30 76 50 76 76 58 92 40 94 22 92 4 76 4 50 4 30 14 4 40 4Z"
          fill={color}
        />
        <ellipse cx="28" cy="30" rx="8" ry="12" fill="#ffffff" opacity="0.4" transform="rotate(-20 28 30)" />
        <path d="M36 94L40 102 44 94Z" fill={color} />
        <path d="M40 102C34 112 46 120 40 130" stroke="#c5b5ef" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

export default function BirthdayHero({ onContinue }: BirthdayHeroProps) {
  const { greeting, subtitle, buttonLabel } = birthdayConfig.hero;

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 text-center">
      {BALLOONS.map((balloon) => (
        <Balloon key={balloon.position} {...balloon} />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-3xl flex-col items-center"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/60 shadow-lg shadow-blush-300/40 ring-1 ring-blush-200 backdrop-blur-md sm:h-20 sm:w-20"
        >
          <Gift className="h-8 w-8 text-blush-700 sm:h-10 sm:w-10" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-700"
        >
          A celebration just for you
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mt-4 bg-gradient-to-r from-blush-700 via-gold-600 to-lavender-600 bg-clip-text font-display text-5xl font-semibold leading-[1.2] text-transparent sm:text-7xl md:text-8xl"
        >
          {greeting}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10">
          <PrimaryButton onClick={onContinue}>
            {buttonLabel}
            <ArrowRight className="h-5 w-5" />
          </PrimaryButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
