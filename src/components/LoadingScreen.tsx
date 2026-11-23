import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import ghostlinkImg from '../assets/ghostlink.png';
import netmonitorImg from '../assets/netmonitor.png';
import jarvisImg from '../assets/jarvis_ai.png';
import profileImg from '../assets/iam.jpeg';

const ASSETS_TO_PRELOAD = [
  ghostlinkImg,
  netmonitorImg,
  jarvisImg,
  profileImg,
];

interface LoadingScreenProps {
  onComplete: () => void;
  targetProgress: number;
}

const WORDS = ['Design', 'Create', 'Inspire'];
const MIN_DURATION = 2700;

export default function LoadingScreen({ onComplete, targetProgress }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const hasCompleted = useRef(false);
  const assetsLoaded = useRef(false);

  // Preload assets
  useEffect(() => {
    let isMounted = true;
    
    const preloadPromises = ASSETS_TO_PRELOAD.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Ignore errors to prevent infinite hang
      });
    });

    const windowLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve(null);
      } else {
        window.addEventListener('load', resolve);
      }
    });

    Promise.all([...preloadPromises, windowLoadPromise]).then(() => {
      if (isMounted) {
        assetsLoaded.current = true;
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Counter animation based on targetProgress
  useEffect(() => {
    const animate = () => {
      setCount((prev) => {
        // smoothly interpolate to targetProgress
        if (prev < targetProgress) {
          return Math.min(targetProgress, prev + 2); // speed of counting
        }
        return prev;
      });

      if (targetProgress < 100 || count < 100 || !assetsLoaded.current) {
        rafRef.current = requestAnimationFrame(animate);
      } else if (!hasCompleted.current) {
        hasCompleted.current = true;
        setTimeout(() => onComplete(), 400);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete, targetProgress, count]);

  // Word cycling every 900ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between">
      {/* Top-left label */}
      <motion.div
        className="p-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em]">
          Portfolio
        </span>
      </motion.div>

      {/* Center rotating words */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom section: counter + progress bar */}
      <div className="p-8">
        {/* Counter - bottom right */}
        <div className="flex justify-end mb-6">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none">
            {String(count).padStart(3, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-stroke/50 w-full rounded-full overflow-hidden">
          <div
            className="h-full accent-gradient rounded-full transition-transform duration-75 origin-left"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
