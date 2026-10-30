import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Image as ImageIcon,
  Sparkles,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import MemoryModal from '@/components/MemoryModal';
import PhotoImage from '@/components/PhotoImage';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface PhotoGalleryProps {
  onContinue: () => void;
}

export default function PhotoGallery({ onContinue }: PhotoGalleryProps) {
  const { heading, subheading, continueLabel, photos } = birthdayConfig.gallery;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50 px-5 pb-20 pt-28 sm:px-8">
      {/* Soft background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl sm:h-96 sm:w-96" />

        <motion.div
          className="absolute right-[12%] top-[15%] text-blue-300/70"
          animate={{ rotate: [0, 15, -15, 0], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Star className="h-7 w-7" />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[8%] text-purple-300/70"
          animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-7 w-7" />
        </motion.div>
      </div>

      {/* Gallery heading */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur-sm sm:text-sm"
        >
          <Heart className="h-4 w-4 fill-pink-300 text-pink-400" />
          A little collection of wishes
          <Heart className="h-4 w-4 fill-pink-300 text-pink-400" />
        </motion.div>

        <h2 className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text font-display text-3xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl">
          {heading}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          {subheading}
        </p>

        <div className="mx-auto mt-5 flex items-center justify-center gap-2 text-sm text-blue-600">
          <Sparkles className="h-4 w-4" />
          <span>Special wishes for Parameswari</span>
          <Sparkles className="h-4 w-4" />
        </div>
      </motion.header>

      {/* Birthday gallery cards */}
      {photos.length > 0 ? (
        <ul className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <motion.li
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.12 + index * 0.14,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="min-w-0"
            >
              <motion.button
                type="button"
                onClick={() => setActiveIndex(index)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Open: ${photo.caption}`}
                className="group relative block w-full rounded-[1.7rem] border border-white/80 bg-white/85 p-2.5 text-left shadow-lg shadow-blue-200/30 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-200/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                  <PhotoImage
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-blue-900/10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="pointer-events-none absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/80 text-blue-600 shadow-md backdrop-blur-sm">
                    <ImageIcon className="h-5 w-5" />
                  </div>

                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    <Heart className="h-4 w-4 fill-pink-300 text-white" />
                  </motion.div>
                </div>

                <div className="px-3 pb-3 pt-4">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Sparkles className="h-4 w-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold leading-snug text-slate-800 sm:text-xl">
                        {photo.caption}
                      </h3>

                      <p className="mt-2 text-xs font-medium text-blue-600">
                        Tap to view ✨
                      </p>
                    </div>
                  </div>
                </div>
              </motion.button>
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-blue-100 bg-white/80 px-6 py-12 text-center shadow-sm">
          <ImageIcon className="h-10 w-10 text-blue-400" />
          <p className="mt-4 text-lg font-semibold text-slate-700">
            Birthday wishes for Parameswari
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This special collection is waiting for its pictures.
          </p>
        </div>
      )}

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="mt-10 flex flex-col items-center sm:mt-12"
      >
        <PrimaryButton onClick={onContinue}>
          {continueLabel}
          <ArrowRight className="h-5 w-5" />
        </PrimaryButton>

        <p className="mt-5 text-center text-xs leading-6 text-slate-500 sm:text-sm">
          Every good wish here is meant to bring a smile to your face. 💙
        </p>
      </motion.div>

      {/* Image preview modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <MemoryModal
            key="memory-modal"
            photos={photos}
            activeIndex={activeIndex}
            onNavigate={setActiveIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}