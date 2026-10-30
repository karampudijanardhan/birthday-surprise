import { motion } from 'framer-motion';

interface CakeCandleProps {
  x: number;
  color: string;
  isLit: boolean;
  isSmoking: boolean;
  onSnuff: () => void;
}

const FLAME_BASE_Y = 36;

function Smoke({ x }: { x: number }) {
  return (
    <g aria-hidden="true">
      {[0, 1, 2].map((puff) => (
        <motion.circle
          key={puff}
          cx={x}
          cy={34}
          r={3 + puff * 1.5}
          fill="#b6c3d8"
          initial={{
            opacity: 0.55,
            x: 0,
            y: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0.55, 0.35, 0],
            x: [0, puff % 2 === 0 ? -7 : 7, puff % 2 === 0 ? 5 : -5],
            y: [0, -20, -42 - puff * 5],
            scale: [0.5, 1.2, 1.8],
          }}
          transition={{
            duration: 2.2,
            delay: puff * 0.25,
            ease: 'easeOut',
          }}
        />
      ))}
    </g>
  );
}

export default function CakeCandle({
  x,
  color,
  isLit,
  isSmoking,
  onSnuff,
}: CakeCandleProps) {
  return (
    <g>
      {/* Smoke rises after the candle is extinguished */}
      {isSmoking && <Smoke x={x} />}

      {/* Candle body */}
      <rect
        x={x - 5}
        y={40}
        width={10}
        height={32}
        rx={2.5}
        fill={color}
        stroke="#ffffff"
        strokeOpacity={0.65}
        strokeWidth={0.7}
      />

      {/* Subtle candle highlight */}
      <line
        x1={x - 2}
        x2={x - 2}
        y1={43}
        y2={66}
        stroke="#ffffff"
        strokeOpacity={0.55}
        strokeWidth={1.3}
        strokeLinecap="round"
      />

      {/* Wick */}
      <line
        x1={x}
        x2={x}
        y1={35}
        y2={41}
        stroke="#5b4636"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* Flame and glow */}
      <g transform={`translate(${x} ${FLAME_BASE_Y})`}>
        <motion.circle
          cx={0}
          cy={-12}
          r={16}
          fill="#ffd98a"
          initial={false}
          animate={{
            opacity: isLit ? [0.2, 0.45, 0.25] : 0,
            scale: isLit ? [0.9, 1.15, 0.95] : 0.5,
          }}
          transition={{
            duration: 1.5,
            repeat: isLit ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        <motion.g
          initial={false}
          animate={{
            scale: isLit ? [1, 1.08, 0.94, 1] : 0,
            opacity: isLit ? 1 : 0,
            rotate: isLit ? [0, 3, -3, 0] : 0,
          }}
          transition={{
            duration: 1.1,
            repeat: isLit ? Infinity : 0,
            ease: 'easeInOut',
          }}
          style={{
            originX: 0.5,
            originY: 1,
          }}
        >
          {/* Outer golden flame */}
          <path
            d="M0 0C-8-6-7-16 0-26C7-16 8-6 0 0Z"
            fill="#ffb86b"
          />

          {/* Inner flame */}
          <path
            d="M0-2C-3-7-3-11 0-15C3-11 3-7 0-2Z"
            fill="#fff4c2"
          />
        </motion.g>
      </g>

      {/* Larger invisible hit area for mobile and mouse users */}
      <rect
        x={x - 16}
        y={5}
        width={32}
        height={70}
        fill="transparent"
        role="button"
        tabIndex={isLit ? 0 : -1}
        aria-label={isLit ? 'Extinguish birthday candle' : 'Candle extinguished'}
        aria-disabled={!isLit}
        style={{
          cursor: isLit ? 'pointer' : 'default',
          pointerEvents: isLit ? 'auto' : 'none',
        }}
        onClick={() => {
          if (isLit) onSnuff();
        }}
        onKeyDown={(event) => {
          if (isLit && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onSnuff();
          }
        }}
      />
    </g>
  );
}