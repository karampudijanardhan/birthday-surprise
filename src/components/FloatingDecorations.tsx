import { Heart } from 'lucide-react';

const STAR_COUNT = 14;
const HEART_COUNT = 6;

export default function FloatingDecorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <span
          key={`star-${index}`}
          className="twinkle absolute h-1.5 w-1.5 rounded-full bg-gold-400"
          style={{
            left: `${(index * 29) % 100}%`,
            top: `${(index * 43 + 7) % 100}%`,
            animationDelay: `${(index % 5) * 0.6}s`,
            animationDuration: `${3 + (index % 4)}s`,
          }}
        />
      ))}
      {Array.from({ length: HEART_COUNT }, (_, index) => (
        <Heart
          key={`heart-${index}`}
          className="float-up h-4 w-4 fill-blush-200 text-blush-300/70"
          style={{
            left: `${(index * 17 + 8) % 90}%`,
            animationDelay: `${index * 2.1}s`,
            animationDuration: `${14 + (index % 3) * 3}s`,
          }}
        />
      ))}
    </div>
  );
}
