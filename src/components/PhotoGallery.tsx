import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
    <section className="mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-5 pb-20 pt-28 sm:px-8">
      <header className="mb-10 text-center">
        <h2 className="font-display text-4xl font-semibold leading-[1.2] text-ink sm:text-5xl">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink/75">{subheading}</p>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <motion.li
            key={photo.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group w-full overflow-hidden rounded-3xl bg-white p-2 text-left shadow-md shadow-lavender-300/30 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-gold-300 md:hover:-translate-y-1 md:hover:shadow-xl"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-blush-100">
                <PhotoImage
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                />
              </div>
              <span className="block px-2 pb-1 pt-3 font-display text-lg font-semibold text-ink sm:text-xl">
                {photo.caption}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <PrimaryButton onClick={onContinue}>
          {continueLabel}
          <ArrowRight className="h-5 w-5" />
        </PrimaryButton>
      </div>

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
