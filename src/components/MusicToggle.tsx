import { motion, useReducedMotion } from 'framer-motion';
import { Music2, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MusicToggleProps {
  src: string;
  title: string;
}

export default function MusicToggle({ src, title }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const audio = new Audio(src);

    audio.loop = true;
    audio.preload = 'none';

    const handleEnded = () => setIsPlaying(false);

    const handleError = () => {
      setIsPlaying(false);
      setIsUnavailable(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;
    setIsPlaying(false);
    setIsUnavailable(false);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, [src]);

  const toggle = async () => {
    const audio = audioRef.current;

    if (!audio || isUnavailable) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setIsUnavailable(true);
    }
  };

  if (isUnavailable) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
      title={isPlaying ? `Pause ${title}` : `Play ${title}`}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-blue-200/70 bg-white/90 text-blue-700 shadow-lg shadow-blue-300/25 backdrop-blur-xl transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      {/* Soft glow while music is playing */}
      {isPlaying && !shouldReduceMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-blue-400/60"
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <span className="relative flex items-center justify-center">
        {isPlaying ? (
          <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <Music2 className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </span>
    </motion.button>
  );
}