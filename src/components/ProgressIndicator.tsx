interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export default function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div
      role="progressbar"
      aria-label="Birthday surprise progress"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center"
    >
      <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2.5 shadow-sm ring-1 ring-blush-200 backdrop-blur-md">
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === current
                ? 'w-7 bg-blush-600'
                : index < current
                  ? 'w-2.5 bg-gold-500'
                  : 'w-2.5 bg-lavender-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
