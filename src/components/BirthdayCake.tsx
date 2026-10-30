import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import CakeCandle from '@/components/CakeCandle';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface BirthdayCakeProps {
  onCelebrate: () => void;
  onContinue: () => void;
}

const CANDLE_COLORS = ['#f9aec6', '#c5b5ef'];
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

function Frosting({ x, y, width, drips }: { x: number; y: number; width: number; drips: Drip[] }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={18} rx={9} fill="#fffaf5" />
      {drips.map((drip) => (
        <path
          key={drip.x}
          d={dripPath(drip.x, drip.length)}
          transform={`translate(0 ${y + 9})`}
          fill="#fffaf5"
        />
      ))}
    </g>
  );
}

export default function BirthdayCake({ onCelebrate, onContinue }: BirthdayCakeProps) {
  const { heading, hint, blowLabel, wishHeading, wishMessage, continueLabel, candleCount } =
    birthdayConfig.cake;
  const [lit, setLit] = useState<boolean[]>(() => Array.from({ length: candleCount }, () => true));
  const [smoking, setSmoking] = useState<boolean[]>(() =>
    Array.from({ length: candleCount }, () => false)
  );
  const isBlown = lit.every((isOn) => !isOn);

  const snuffCandle = (index: number) => {
    if (!lit[index]) return;
    const nextLit = lit.map((isOn, i) => (i === index ? false : isOn));
    setLit(nextLit);
    setSmoking((previous) => previous.map((isSmoking, i) => isSmoking || i === index));
    if (nextLit.every((isOn) => !isOn)) onCelebrate();
  };

  const blowAll = () => {
    if (isBlown) return;
    setSmoking((previous) => previous.map((isSmoking, i) => isSmoking || lit[i]));
    setLit(lit.map(() => false));
    onCelebrate();
  };

  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
      <h2 className="font-display text-4xl font-semibold leading-[1.2] text-ink sm:text-5xl">
        {heading}
      </h2>
      {!isBlown && <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70 sm:text-base">{hint}</p>}

      <div className="relative mx-auto mt-8 w-full max-w-[280px] sm:max-w-[340px]">
        <svg
          viewBox="0 0 320 310"
          role="img"
          aria-label={`A birthday cake with ${candleCount} candles`}
          className="h-auto w-full overflow-visible drop-shadow-xl"
        >
          <ellipse cx={160} cy={292} rx={150} ry={13} fill="#e3bfa6" />

          <rect x={40} y={200} width={240} height={90} rx={18} fill="#f9aec6" />
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
            <circle key={`bottom-${x}`} cx={x} cy={248} r={4} fill="#fffaf5" />
          ))}

          <rect x={72} y={130} width={176} height={70} rx={16} fill="#c5b5ef" />
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
            <circle key={`middle-${x}`} cx={x} cy={172} r={4} fill="#fffaf5" />
          ))}

          <rect x={100} y={76} width={120} height={54} rx={14} fill="#eed3c3" />
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
      </div>

      <div className="mt-10 flex min-h-[170px] w-full flex-col items-center justify-start">
        <AnimatePresence mode="wait">
          {!isBlown ? (
            <motion.div key="blow" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <PrimaryButton onClick={blowAll}>{blowLabel}</PrimaryButton>
            </motion.div>
          ) : (
            <motion.div
              key="wish"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{wishHeading}</h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-ink/75">{wishMessage}</p>
              <div className="mt-6">
                <PrimaryButton onClick={onContinue}>
                  {continueLabel}
                  <ArrowRight className="h-5 w-5" />
                </PrimaryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
