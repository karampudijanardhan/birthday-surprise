import { Music, Pause } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MusicToggleProps {
  src: string;
  title: string;
}

export default function MusicToggle({ src, title }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'none';
    const handleError = () => {
      setIsPlaying(false);
      setIsUnavailable(true);
    };
    audio.addEventListener('error', handleError);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
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
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/85 text-blush-700 shadow-lg ring-1 ring-blush-200 backdrop-blur-md transition-transform hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-gold-300 sm:bottom-6 sm:right-6"
    >
      {isPlaying ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
    </button>
  );
}
