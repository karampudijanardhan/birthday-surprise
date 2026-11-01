
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
  Camera,
  Maximize2,
} from 'lucide-react';
import { useState } from 'react';

import MemoryModal from '@/components/MemoryModal';
import PhotoImage from '@/components/PhotoImage';
import PrimaryButton from '@/components/PrimaryButton';
import { birthdayConfig } from '@/config/birthdayConfig';

interface PhotoGalleryProps {
  onContinue: () => void;
}

const slideDetails = [
  {
    title: 'Beautiful Childhood Memories',
    subtitle: 'Every beautiful journey has a beginning.',
    label: 'Chapter 01',
  },
  {
    title: 'Little Moments, Big Smiles',
    subtitle: 'The little moments that make life special.',
    label: 'Chapter 02',
  },
  {
    title: 'A Beautiful Journey Ahead',
    subtitle: 'May your future be filled with happiness and success.',
    label: 'Chapter 03',
  },
];

const slideGroups = [
  [0, 1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

export default function PhotoGallery({ onContinue }: PhotoGalleryProps) {
  const { continueLabel, photos } = birthdayConfig.gallery;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const reduceMotion = useReducedMotion();

  const totalSlides = slideGroups.length;

  const currentPhotos = slideGroups[currentSlide]
    .map((index) => ({ photo: photos[index], originalIndex: index }))
    .filter((item) => Boolean(item.photo));

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  };

  const nextSlide = () => {
    setCurrentSlide((previous) => (previous + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrentSlide((previous) => (previous - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-gradient-to-br from-[#eaf3ff] via-white to-[#f1eaff] px-4 pb-16 pt-28 sm:px-8 sm:pt-32">

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-blue-300/25 blur-3xl" />
        <div className="absolute -right-28 top-1/3 h-96 w-96 rounded-full bg-purple-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-200/20 blur-3xl" />

        <motion.div
          className="absolute right-[12%] top-[14%] text-blue-300"
          animate={reduceMotion ? {} : { y: [0, -12, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Sparkles size={32} />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[7%] text-purple-300"
          animate={reduceMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Heart size={28} fill="currentColor" />
        </motion.div>
      </div>

      {/* Main heading */}
      <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-blue-700 shadow-md backdrop-blur-xl"
        >
          <Heart size={15} className="fill-pink-300 text-pink-400" />
          A birthday memory album
          <Heart size={15} className="fill-pink-300 text-pink-400" />
        </motion.div>

        <h2 className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text font-display text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
          Her Beautiful Journey 💙
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          A little collection of memories, smiles, and special moments,
          created especially for Parameswari.
        </p>
      </header>

      {/* Slideshow */}
      <div className="mx-auto w-full max-w-5xl">

        {/* Slide title and count */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">
              {slideDetails[currentSlide].label}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-slate-800 sm:text-2xl">
              {slideDetails[currentSlide].title}
            </h3>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {slideDetails[currentSlide].subtitle}
            </p>
          </div>

          <div className="shrink-0 rounded-full border border-blue-100 bg-white/80 px-3 py-2 text-xs font-bold text-indigo-600 shadow-sm">
            0{currentSlide + 1} / 0{totalSlides}
          </div>
        </div>

        {/* Slide content */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/50 p-3 shadow-2xl shadow-blue-200/40 backdrop-blur-xl sm:p-6">

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={reduceMotion ? false : { opacity: 0, x: 45 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -45 }}
              transition={{ duration: 0.4 }}
              className={`grid gap-3 sm:gap-5 ${
                currentPhotos.length === 3
                  ? 'grid-cols-3'
                  : 'grid-cols-2'
              }`}
            >
              {currentPhotos.map(({ photo, originalIndex }, index) => (
                <motion.button
                  key={photo.id}
                  type="button"
                  onClick={() => setActiveIndex(originalIndex)}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.45 }}
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  aria-label={`View ${photo.caption}`}
                  className={`group relative min-w-0 overflow-hidden rounded-2xl border-4 border-white bg-gradient-to-br from-blue-100 to-purple-100 text-left shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 ${
                    currentPhotos.length === 4
                      ? 'aspect-[4/5]'
                      : 'aspect-[3/4]'
                  }`}
                >
                  <PhotoImage
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/10" />

                  <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/80 text-indigo-600 shadow-md backdrop-blur-md sm:right-3 sm:top-3 sm:h-10 sm:w-10">
                    <Maximize2 size={17} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white sm:p-4">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-100 sm:text-xs">
                      <Heart size={12} fill="currentColor" />
                      Memory {String(originalIndex + 1).padStart(2, '0')}
                    </div>

                    <p className="line-clamp-2 text-xs font-semibold leading-snug sm:text-base">
                      {photo.caption}
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide navigation */}
        <div className="mt-7 flex items-center justify-between gap-3">

          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-indigo-600 shadow-md transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex items-center justify-center gap-3">
            {slideDetails.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={currentSlide === index ? 'step' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-9 bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'w-2.5 bg-indigo-200 hover:bg-indigo-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Select a photo to view it in full screen ✨
        </p>
      </div>

      {/* Birthday message */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-12 max-w-2xl text-center"
      >
        <Camera className="mx-auto h-7 w-7 text-indigo-500" />

        <p className="mt-3 font-display text-xl font-semibold text-slate-800 sm:text-2xl">
          Every picture has a story. Every smile is precious. 💙
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Parameswari, may your next chapters be filled with happiness,
          good health, wonderful achievements, and endless smiles.
        </p>
      </motion.div>

      {/* Continue button */}
      <div className="mt-10 flex flex-col items-center">
        <PrimaryButton onClick={onContinue}>
          {continueLabel}
          <ArrowRight size={19} />
        </PrimaryButton>

        <p className="mt-4 text-xs text-slate-500">
          There is another special message waiting for you. 💌
        </p>
      </div>

      {/* Existing full-screen photo viewer */}
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
