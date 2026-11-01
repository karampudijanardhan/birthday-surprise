
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Music2, Pause } from 'lucide-react';

interface MusicToggleProps {
  src: string;
  title?: string;
}

export default function MusicToggle({
  src,
  title = 'Birthday Song',
}: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const startMusic = async () => {
      if (!audio.paused) return;

      try {
        await audio.play();
      } catch (error) {
        console.info('Browser requires user interaction to play music.', error);
      }
    };

    const handleFirstInteraction = (event: Event) => {
      const target = event.target;

      if (
        target instanceof Element &&
        target.closest('[data-music-toggle]')
      ) {
        return;
      }

      void startMusic();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Try autoplay when the website opens.
    void startMusic();

    // If autoplay is blocked, start after the visitor interacts.
    document.addEventListener('pointerdown', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('pointerdown', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);

      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);

      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error('Unable to play birthday music:', error);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <motion.button
      type="button"
      data-music-toggle
      onClick={toggleMusic}
      title={title}
      aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/60 bg-white/85 px-4 py-3 text-blue-700 shadow-lg backdrop-blur-md"
      animate={
        reducedMotion
          ? undefined
          : { scale: isPlaying ? [1, 1.05, 1] : 1 }
      }
      transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
    >
      {isPlaying ? <Pause size={20} /> : <Music2 size={20} />}
      <span className="text-sm font-semibold">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </span>
    </motion.button>
  );
}
