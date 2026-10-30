import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import PhotoImage from '@/components/PhotoImage';
import type { GalleryPhoto } from '@/types/birthday';

interface MemoryModalProps {
  photos: GalleryPhoto[];
  activeIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

const navButtonClass =
  'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-blue-100/70 bg-white/90 text-slate-800 shadow-lg backdrop-blur-sm transition duration-200 hover:scale-110 hover:bg-blue-50 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:h-12 sm:w-12';

export default function MemoryModal({
  photos,
  activeIndex,
  onNavigate,
  onClose,
}: MemoryModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const photo = photos[activeIndex];
  const total = photos.length;

  const goToPrevious = useCallback(() => {
    if (total > 1) {
      onNavigate((activeIndex - 1 + total) % total);
    }
  }, [activeIndex, total, onNavigate]);

  const goToNext = useCallback(() => {
    if (total > 1) {
      onNavigate((activeIndex + 1) % total);
    }
  }, [activeIndex, total, onNavigate]);

  useEffect(() => {
    if (!photo) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goToPrevious, goToNext]);

  if (!photo || total === 0) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/85 px-3 py-8 backdrop-blur-md sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Soft background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500/15 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-violet-500/15 blur-[100px]"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Photo ${activeIndex + 1} of ${total}: ${photo.caption}`}
        className="relative z-10 my-auto w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="absolute -right-1 -top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-800 shadow-xl transition duration-200 hover:rotate-90 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:-right-3 sm:-top-3"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Main photo card */}
        <div className="overflow-hidden rounded-3xl border border-blue-100/70 bg-white p-2 shadow-[0_25px_100px_rgba(0,0,0,0.35)] sm:p-4">
          {/* Photo */}
          <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-violet-50 sm:min-h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                className="flex w-full items-center justify-center"
                initial={{ opacity: 0, scale: 0.97, x: 12 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <PhotoImage
                  src={photo.src}
                  alt={photo.alt}
                  loading="eager"
                  className="max-h-[65vh] min-h-64 w-full object-contain sm:max-h-[70vh]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Photo navigation */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Previous photo"
                  className={`${navButtonClass} left-2 sm:left-4`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next photo"
                  className={`${navButtonClass} right-2 sm:right-4`}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Photo counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/70 bg-slate-950/65 px-4 py-1.5 text-xs font-semibold tracking-wider text-white shadow-lg backdrop-blur-md">
              {activeIndex + 1} / {total}
            </div>
          </div>

          {/* Caption and progress */}
          <div className="px-3 pb-3 pt-5 text-center sm:px-5 sm:pb-4">
            <motion.div
              key={`caption-${photo.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                <Heart
                  aria-hidden="true"
                  className="h-4 w-4 fill-blue-300 text-blue-400"
                />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                  A Little Birthday Memory
                </span>

                <Heart
                  aria-hidden="true"
                  className="h-4 w-4 fill-violet-300 text-violet-400"
                />
              </div>

              <p className="mx-auto max-w-2xl font-display text-lg font-semibold leading-relaxed text-slate-800 sm:text-2xl">
                {photo.caption}
              </p>
            </motion.div>

            {/* Progress indicator */}
            {total > 1 && (
              <div
                className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-2"
                aria-label={`Photo ${activeIndex + 1} of ${total}`}
              >
                {photos.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(index)}
                    aria-label={`View photo ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 ${
                      index === activeIndex
                        ? 'w-8 bg-blue-500'
                        : 'w-2 bg-violet-200 hover:bg-violet-400'
                    }`}
                  />
                ))}
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500">
              Use the arrows to explore each photo 💙
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}