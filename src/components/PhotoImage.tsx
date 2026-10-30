import { useState } from 'react';

const PLACEHOLDER_SRC = '/images/placeholder.svg';

interface PhotoImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export default function PhotoImage({ src, alt, className, loading = 'lazy' }: PhotoImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const resolvedSrc = failedSrc === src ? PLACEHOLDER_SRC : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      draggable={false}
      onError={() => setFailedSrc(src)}
    />
  );
}
