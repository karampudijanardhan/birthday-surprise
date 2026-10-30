import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const STAR_COUNT = 18;
const HEART_COUNT = 6;
const SPARKLE_COUNT = 5;

const stars = Array.from({ length: STAR_COUNT }, (_, index) => ({
  id: index,
  left: `${(index * 29 + 5) % 96}%`,
  top: `${(index * 43 + 7) % 94}%`,
  delay: (index % 6) * 0.55,
  duration: 2.8 + (index % 4) * 0.8,
  size: index % 3 === 0 ? 6 : 4,
}));

const hearts = Array.from({ length: HEART_COUNT }, (_, index) => ({
  id: index,
  left: `${(index * 17 + 8) % 90}%`,
  delay: index * 2.1,
  duration: 14 + (index % 3) * 3,
  size: index % 2 === 0 ? 18 : 14,
}));

const sparkles = Array.from({ length: SPARKLE_COUNT }, (_, index) => ({
  id: index,
  left: `${(index * 23 + 12) % 92}%`,
  top: `${(index * 31 + 16) % 88}%`,
  delay: index * 0.7,
}));

export default function FloatingDecorations() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Soft blue and lavender background glows */}
      <motion.div
        className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-blue-300/15 blur-[100px] sm:h-96 sm:w-96"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0.35, 0.65, 0.35],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-violet-300/15 blur-[100px] sm:h-96 sm:w-96"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -25, 0],
                y: [0, 20, 0],
                opacity: [0.25, 0.55, 0.25],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.span
          key={`star-${star.id}`}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.5 }
              : {
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.7, 1.3, 0.7],
                }
          }
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          className="absolute"
          style={{
            left: heart.left,
            bottom: '-30px',
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.35 }
              : {
                  y: [0, -180, -420],
                  x: [0, 12, -10],
                  opacity: [0, 0.55, 0],
                  rotate: [0, 12, -10],
                }
          }
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart
            className="fill-blue-200/40 text-blue-300/60"
            style={{
              width: heart.size,
              height: heart.size,
            }}
          />
        </motion.div>
      ))}

      {/* Small decorative sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute text-violet-300/60"
          style={{
            left: sparkle.left,
            top: sparkle.top,
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.5 }
              : {
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.15, 0.8],
                  rotate: [0, 15, -15, 0],
                }
          }
          transition={{
            duration: 3.5,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.div>
      ))}
    </div>
  );
}