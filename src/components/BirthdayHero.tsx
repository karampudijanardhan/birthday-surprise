
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Heart, Sparkles } from 'lucide-react';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface BirthdayHeroProps {
  onContinue: () => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const BALLOONS = [
  {
    color: '#8bb8ff',
    position: 'left-3 top-28 sm:left-[8%] sm:top-[26%]',
    delay: 0,
  },
  {
    color: '#c5b5ef',
    position: 'right-3 top-36 sm:right-[9%] sm:top-[20%]',
    delay: 1.4,
  },
  {
    color: '#eedacb',
    position: 'hidden bottom-16 left-8 sm:block sm:bottom-[14%] sm:left-[16%]',
    delay: 2.6,
  },
  {
    color: '#fccfdc',
    position: 'hidden bottom-20 right-6 sm:block sm:bottom-[20%] sm:right-[16%]',
    delay: 0.8,
  },
];

function Balloon({
  color,
  position,
  delay,
}: {
  color: string;
  position: string;
  delay: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`balloon-bob absolute h-24 w-[4.5rem] opacity-90 sm:h-32 sm:w-24 ${position}`}
      style={{ animationDelay: `${delay}s` }}
      animate={{ y: [0, -12, 0], rotate: [0, 4, -4, 0] }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <svg viewBox="0 0 80 130" className="h-full w-full">
        <path
          d="M40 4C66 4 76 30 76 50 76 76 58 92 40 94 22 92 4 76 4 50 4 30 14 4 40 4Z"
          fill={color}
        />
        <ellipse
          cx="28"
          cy="30"
          rx="8"
          ry="12"
          fill="#ffffff"
          opacity="0.4"
          transform="rotate(-20 28 30)"
        />
        <path d="M36 94L40 102 44 94Z" fill={color} />
        <path
          d="M40 102C34 112 46 120 40 130"
          stroke="#a9bfff"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

export default function BirthdayHero({ onContinue }: BirthdayHeroProps) {
  const { greeting, subtitle, buttonLabel } = birthdayConfig.hero;

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50/70 via-white/40 to-pink-50/70 px-5 pb-20 pt-28 text-center sm:px-6">
      {/* Soft decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl sm:h-[30rem] sm:w-[30rem]"
      />

      {/* Floating balloons */}
      {BALLOONS.map((balloon) => (
        <Balloon key={balloon.position} {...balloon} />
      ))}

      {/* Birthday content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-3xl flex-col items-center"
      >
        {/* Gift icon */}
        <motion.div
          variants={itemVariants}
          className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-blue-200/80 bg-white/80 shadow-lg shadow-blue-200/40 backdrop-blur-md sm:h-20 sm:w-20"
        >
          <Gift className="h-8 w-8 text-blue-600 sm:h-10 sm:w-10" />

          <motion.span
            aria-hidden="true"
            className="absolute -right-1 -top-1"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Sparkles className="h-5 w-5 text-amber-400" />
          </motion.span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 sm:text-sm sm:tracking-[0.3em]"
        >
          <Heart className="h-4 w-4 fill-pink-300 text-pink-400" />
          A celebration made with care
          <Heart className="h-4 w-4 fill-pink-300 text-pink-400" />
        </motion.p>

        {/* Main birthday greeting */}
        <motion.h1
          variants={itemVariants}
          className="mt-5 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 bg-clip-text font-display text-4xl font-semibold leading-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {greeting}
        </motion.h1>

        {/* Personal message */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-base leading-8 text-slate-700 sm:text-lg sm:leading-9"
        >
          {subtitle}
        </motion.p>

        {/* Decorative message */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-base"
        >
          <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
          <span>A little surprise, with lots of good wishes.</span>
        </motion.div>

        {/* Continue button */}
        <motion.div variants={itemVariants} className="mt-9">
          <PrimaryButton onClick={onContinue}>
            {buttonLabel}
            <ArrowRight className="h-5 w-5" />
          </PrimaryButton>
        </motion.div>

        {/* Small footer decoration */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-xs tracking-wide text-slate-500 sm:text-sm"
        >
          Made especially for a wonderful birthday ✨
        </motion.p>
      </motion.div>
    </section>
  );
}