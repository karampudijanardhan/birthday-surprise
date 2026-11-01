
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Cake,
  Heart,
  Sparkles,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import CakeCandle from '@/components/CakeCandle';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface BirthdayCakeProps {
  onCelebrate: () => void;
  onContinue: () => void;
}

const CANDLE_COLORS = ['#93c5fd', '#c4b5fd', '#f9a8d4'];

const CANDLE_START_X = 118;
const CANDLE_END_X = 202;

const PEARL_XS_BOTTOM = [70, 110, 150, 190, 230, 262];
const PEARL_XS_MIDDLE = [96, 136, 176, 216];

interface Drip {
  x: number;
  length: number;
}

function getCandleX(index: number, count: number): number {
  if (count <= 1) return (CANDLE_START_X + CANDLE_END_X) / 2;

  return CANDLE_START_X + ((CANDLE_END_X - CANDLE_START_X) * index) / (count - 1);
}

function dripPath(x: number, length: number): string {
  return `M${x - 7} 0V${length}A7 7 0 0 0 ${x + 7} ${length}V0Z`;
}

function Frosting({
  x,
  y,
  width,
  drips,
}: {
  x: number;
  y: number;
  width: number;
  drips: Drip[];
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={18} rx={9} fill="#ffffff" />

      {drips.map((drip) => (
        <path
          key={drip.x}
          d={dripPath(drip.x, drip.length)}
          transform={`translate(0 ${y + 9})`}
          fill="#ffffff"
        />
      ))}
    </g>
  );
}

export default function BirthdayCake({
  onCelebrate,
  onContinue,
}: BirthdayCakeProps) {
  const {
    heading,
    hint,
    blowLabel,
    wishHeading,
    wishMessage,
    continueLabel,
    candleCount,
  } = birthdayConfig.cake;

  const [lit, setLit] = useState<boolean[]>(() =>
    Array.from({ length: candleCount }, () => true),
  );

  const [smoking, setSmoking] = useState<boolean[]>(() =>
    Array.from({ length: candleCount }, () => false),
  );

  // NEW: Play celebration blast sound
const playBlastSound = () => {
  const audio = new Audio('/sounds/celebration.mp3');
  audio.volume = 0.8;

  audio.currentTime = 0;
  audio.play().catch(() => {
    console.warn('Celebration sound could not be played.');
  });

  // Stop automatically after 3 seconds
  window.setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 3000);
};
  const isBlown = lit.every((isOn) => !isOn);

  const snuffCandle = (index: number) => {
    if (!lit[index]) return;

    const nextLit = lit.map((isOn, i) => (i === index ? false : isOn));

    setLit(nextLit);

    setSmoking((previous) =>
      previous.map((isSmoking, i) => isSmoking || i === index),
    );

    if (nextLit.every((isOn) => !isOn)) {
      playBlastSound();
      onCelebrate();
    }
  };

  const blowAll = () => {
    if (isBlown) return;

    setSmoking((previous) =>
      previous.map((isSmoking, i) => isSmoking || lit[i]),
    );

    setLit(lit.map(() => false));

    // NEW: Sound when the button is clicked
    playBlastSound();
    onCelebrate();
  };

  return (
    <section
      className="relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50 px-5 pb-20 pt-28 text-center sm:px-8"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(239,246,255,0.82), rgba(255,255,255,0.82), rgba(250,245,255,0.82)), url('/images/sister-06.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[42%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/40 blur-3xl sm:h-[30rem] sm:w-[30rem]" />

        <motion.div
          className="absolute left-[8%] top-[22%] text-blue-300"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 12, -12, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Star className="h-7 w-7 fill-blue-200" />
        </motion.div>

        <motion.div
          className="absolute right-[9%] top-[28%] text-purple-300"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="h-8 w-8" />
        </motion.div>

        <motion.div
          className="absolute bottom-[18%] left-[12%] text-pink-300"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 12, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Heart className="h-6 w-6 fill-pink-200" />
        </motion.div>
      </div>

      {/* Heading */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur-sm sm:text-sm">
          <Cake className="h-4 w-4" />
          Birthday wishes for Parameswari
          <Sparkles className="h-4 w-4 text-amber-400" />
        </div>

        <h2 className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text font-display text-3xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl">
          {heading}
        </h2>

        {!isBlown && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base"
          >
            {hint}
          </motion.p>
        )}
      </motion.header>

      {/* Animated birthday cake */}
      <motion.div
        className="relative z-10 mx-auto mt-8 w-full max-w-[280px] sm:max-w-[340px]"
        animate={isBlown ? { scale: [1, 1.035, 1] } : { y: [0, -5, 0] }}
        transition={
          isBlown
            ? { duration: 0.6 }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-5 bottom-8 top-8 rounded-full bg-blue-300/20 blur-3xl"
        />

        <svg
          viewBox="0 0 320 310"
          role="img"
          aria-label={`A three-tier birthday cake with ${candleCount} candles`}
          className="relative h-auto w-full overflow-visible drop-shadow-xl"
        >
          <defs>
            <linearGradient id="bottomCakeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>

            <linearGradient id="middleCakeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ddd6fe" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>

            <linearGradient id="topCakeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
          </defs>

          {/* Cake plate */}
          <ellipse cx={160} cy={292} rx={150} ry={13} fill="#bfdbfe" />
          <ellipse cx={160} cy={287} rx={140} ry={10} fill="#eff6ff" />

          {/* Bottom tier */}
          <rect
            x={40}
            y={200}
            width={240}
            height={90}
            rx={18}
            fill="url(#bottomCakeGradient)"
          />

          <Frosting
            x={36}
            y={194}
            width={248}
            drips={[
              { x: 62, length: 22 },
              { x: 110, length: 12 },
              { x: 170, length: 26 },
              { x: 228, length: 14 },
              { x: 262, length: 20 },
            ]}
          />

          {PEARL_XS_BOTTOM.map((x) => (
            <circle
              key={`bottom-${x}`}
              cx={x}
              cy={248}
              r={4}
              fill="#ffffff"
            />
          ))}

          {/* Middle tier */}
          <rect
            x={72}
            y={130}
            width={176}
            height={70}
            rx={16}
            fill="url(#middleCakeGradient)"
          />

          <Frosting
            x={68}
            y={124}
            width={184}
            drips={[
              { x: 94, length: 18 },
              { x: 150, length: 10 },
              { x: 200, length: 22 },
              { x: 236, length: 12 },
            ]}
          />

          {PEARL_XS_MIDDLE.map((x) => (
            <circle
              key={`middle-${x}`}
              cx={x}
              cy={172}
              r={4}
              fill="#ffffff"
            />
          ))}

          {/* Top tier */}
          <rect
            x={100}
            y={76}
            width={120}
            height={54}
            rx={14}
            fill="url(#topCakeGradient)"
          />

          <Frosting
            x={96}
            y={70}
            width={128}
            drips={[
              { x: 120, length: 14 },
              { x: 160, length: 9 },
              { x: 196, length: 16 },
            ]}
          />

          {/* Candles */}
          {Array.from({ length: candleCount }, (_, index) => (
            <CakeCandle
              key={index}
              x={getCandleX(index, candleCount)}
              color={CANDLE_COLORS[index % CANDLE_COLORS.length]}
              isLit={lit[index]}
              isSmoking={smoking[index]}
              onSnuff={() => snuffCandle(index)}
            />
          ))}
        </svg>
      </motion.div>

      {/* Candle instructions and birthday wish */}
      <div className="relative z-10 mt-8 flex min-h-[190px] w-full flex-col items-center justify-start sm:mt-10">
        <AnimatePresence mode="wait">
          {!isBlown ? (
            <motion.div
              key="blow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <p className="mb-5 text-sm text-slate-500">
                Make a wish before you blow out the candles! ✨
              </p>

              <PrimaryButton onClick={blowAll}>
                <Heart className="h-5 w-5" />
                {blowLabel}
              </PrimaryButton>
            </motion.div>
          ) : (
            <motion.div
              key="wish"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.25,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex w-full flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.35,
                  type: 'spring',
                  stiffness: 180,
                  damping: 12,
                }}
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-blue-200 bg-white shadow-md shadow-blue-200/50"
              >
                <Sparkles className="h-7 w-7 text-blue-600" />
              </motion.div>

              <h3 className="bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text font-display text-2xl font-semibold text-transparent sm:text-4xl">
                {wishHeading}
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {wishMessage}
              </p>

              <div className="mt-7">
                <PrimaryButton onClick={onContinue}>
                  {continueLabel}
                  <ArrowRight className="h-5 w-5" />
                </PrimaryButton>
              </div>

              <p className="mt-5 text-xs text-slate-500 sm:text-sm">
                May your dreams become beautiful achievements, Parameswari. 💙
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
