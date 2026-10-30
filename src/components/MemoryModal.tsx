import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import PhotoImage from '@/components/PhotoImage';
import type { GalleryPhoto } from '@/types/birthday';

interface MemoryModalProps {
  photos: GalleryPhoto[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

const navButtonClass =
  'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-gold-300';

export default function MemoryModal({ photos, activeIndex, onNavigate, onClose }: MemoryModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const photo = photos[activeIndex];
  const total = photos.length;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onNavigate((activeIndex - 1 + total) % total);
      if (event.key === 'ArrowRight') onNavigate((activeIndex + 1) % total);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, total, onClose, onNavigate]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={photo.caption}
        className="relative w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="absolute -top-3 right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:ring-4 focus-visible:ring-gold-300 sm:-right-3"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-2xl sm:p-4">
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-blush-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                className="flex w-full items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <PhotoImage
                  src={photo.src}
                  alt={photo.alt}
                  loading="eager"
                  className="max-h-[68vh] w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate((activeIndex - 1 + total) % total)}
                  aria-label="Previous photo"
                  className={`${navButtonClass} left-2 sm:left-4`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate((activeIndex + 1) % total)}
                  aria-label="Next photo"
                  className={`${navButtonClass} right-2 sm:right-4`}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 px-2 pb-2 pt-4 text-left">
            <p className="font-display text-xl font-semibold text-ink sm:text-2xl">{photo.caption}</p>
            <p className="shrink-0 text-sm font-semibold text-gold-700">
              {activeIndex + 1} / {total}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
