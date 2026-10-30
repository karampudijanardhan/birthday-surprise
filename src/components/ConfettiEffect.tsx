import { useEffect, useRef } from 'react';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface ConfettiEffectProps {
  burstId: number;
  colors: string[];
}

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  spin: number;
  color: string;
}

const PIECE_COUNT = 140;
const GRAVITY = 0.22;
const AIR_DRAG = 0.985;

function createPiece(originX: number, originY: number, colors: string[]): Piece {
  return {
    x: originX,
    y: originY,
    vx: (Math.random() - 0.5) * 12,
    vy: -(Math.random() * 10 + 4),
    width: 6 + Math.random() * 6,
    height: 3 + Math.random() * 3,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

export default function ConfettiEffect({ burstId, colors }: ConfettiEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (burstId === 0 || prefersReducedMotion || !canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const originX = width / 2;
    const originY = height * 0.45;
    let pieces: Piece[] = Array.from({ length: PIECE_COUNT }, () =>
      createPiece(originX, originY, colors)
    );
    let frame = 0;

    const tick = () => {
      context.clearRect(0, 0, width, height);
      for (const piece of pieces) {
        piece.vx *= AIR_DRAG;
        piece.vy = piece.vy * AIR_DRAG + GRAVITY;
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rotation += piece.spin;

        context.save();
        context.translate(piece.x, piece.y);
        context.rotate(piece.rotation);
        context.fillStyle = piece.color;
        context.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
        context.restore();
      }
      pieces = pieces.filter((piece) => piece.y < height + 20);
      if (pieces.length > 0) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, width, height);
    };
  }, [burstId, colors, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  );
}
