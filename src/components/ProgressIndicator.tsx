import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export default function ProgressIndicator({
  current,
  total,
}: ProgressIndicatorProps) {
  if (total <= 0) return null;

  const safeCurrent = Math.max(0, Math.min(current, total - 1));

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <div
        role="progressbar"
        aria-label="Birthday surprise progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={safeCurrent + 1}
        aria-valuetext={`Step ${safeCurrent + 1} of ${total}`}
        className="flex items-center gap-2 rounded-full border border-blue-100/80 bg-white/80 px-4 py-3 shadow-lg shadow-blue-200/20 backdrop-blur-xl sm:gap-3 sm:px-5"
      >
        {Array.from({ length: total }, (_, index) => {
          const isCompleted = index < safeCurrent;
          const isCurrent = index === safeCurrent;

          return (
            <motion.span
              key={index}
              initial={false}
              animate={{
                width: isCurrent ? 30 : 10,
                scale: isCurrent ? 1 : 0.95,
                opacity: isCompleted || isCurrent ? 1 : 0.65,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`block h-2 rounded-full ${
                isCompleted
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  : isCurrent
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 shadow-sm shadow-blue-300/50'
                    : 'bg-gradient-to-r from-blue-100 to-violet-100'
              }`}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
}