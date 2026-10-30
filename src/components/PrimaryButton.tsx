import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'solid' | 'ghost';
}

const VARIANT_CLASSES = {
  solid:
    'bg-gradient-to-r from-blush-700 to-lavender-600 text-white shadow-lg shadow-blush-500/30 hover:shadow-xl',
  ghost: 'border-2 border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
};

export default function PrimaryButton({ children, onClick, variant = 'solid' }: PrimaryButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body text-base font-semibold tracking-wide transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </motion.button>
  );
}
