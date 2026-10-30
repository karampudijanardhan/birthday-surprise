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
      {[0, 1].map((puff) => (
        <motion.circle
          key={puff}
          cx={x}
          cy={34}
          r={4 + puff * 2}
          fill="#9d8aa8"
          initial={{ opacity: 0.55, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -48 - puff * 14, x: puff === 0 ? -6 : 6, scale: 2.4 }}
          transition={{ duration: 2.6, delay: puff * 0.4, ease: 'easeOut' }}
        />
      ))}
    </g>
  );
}

export default function CakeCandle({ x, color, isLit, isSmoking, onSnuff }: CakeCandleProps) {
  return (
    <g>
      {isSmoking && <Smoke x={x} />}
      <rect x={x - 5} y={40} width={10} height={32} rx={2.5} fill={color} />
      <line x1={x} x2={x} y1={36} y2={40} stroke="#5b4636" strokeWidth={1.5} />

      <g transform={`translate(${x} ${FLAME_BASE_Y})`}>
        <motion.circle
          cx={0}
          cy={-12}
          r={16}
          fill="#ffd98a"
          initial={false}
          animate={{ opacity: isLit ? 0.45 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <motion.g
          initial={false}
          animate={{ scale: isLit ? 1 : 0, opacity: isLit ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ originX: 0.5, originY: 1 }}
        >
          <path d="M0 0C-8-6-7-16 0-26C7-16 8-6 0 0Z" fill="#ffb86b" />
          <path className="candle-flame" d="M0-2C-3-7-3-11 0-15C3-11 3-7 0-2Z" fill="#fff4c2" />
        </motion.g>
      </g>

      <rect
        x={x - 14}
        y={8}
        width={28}
        height={64}
        fill="transparent"
        style={{ cursor: isLit ? 'pointer' : 'default' }}
        onClick={onSnuff}
      />
    </g>
  );
}
