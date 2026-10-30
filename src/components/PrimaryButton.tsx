import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'solid' | 'ghost';
}

const VARIANT_CLASSES = {
  solid:
    'border border-blue-300/40 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:brightness-110',
  ghost:
    'border border-white/30 bg-white/10 text-white shadow-lg shadow-black/10 backdrop-blur-md hover:border-blue-200/60 hover:bg-white/20',
};

export default function PrimaryButton({
  children,
  onClick,
  variant = 'solid',
}: PrimaryButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.035, y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 24,
      }}
      className={`
        relative inline-flex min-h-[48px] items-center justify-center gap-2
        overflow-hidden rounded-full px-6 py-3.5
        font-body text-sm font-semibold tracking-wide
        transition-[background-color,box-shadow,border-color,filter]
        duration-300
        focus-visible:outline-none
        focus-visible:ring-4 focus-visible:ring-blue-300
        focus-visible:ring-offset-2 focus-visible:ring-offset-cream
        active:brightness-95
        disabled:pointer-events-none disabled:opacity-50
        sm:px-8 sm:text-base
        ${VARIANT_CLASSES[variant]}
      `}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}