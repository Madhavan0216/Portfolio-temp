import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: string;
  extraScale?: number;
}

export default function ClickSpark({
  sparkColor = "var(--color-accent)",
  sparkSize = 15,
  sparkRadius = 20,
  sparkCount = 10,
  duration = 600,
  easing = "easeOut",
  extraScale = 1.2,
}: ClickSparkProps) {
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const id = Date.now();
      setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== id));
      }, duration);
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10005]">
      <AnimatePresence>
        {clicks.map((click) => (
          <div key={click.id} className="absolute" style={{ left: click.x, top: click.y }}>
            {Array.from({ length: sparkCount }).map((_, i) => {
              const angle = (i / sparkCount) * Math.PI * 2;
              const distance = sparkRadius;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                  animate={{ x: tx, y: ty, scale: extraScale, opacity: 0 }}
                  transition={{ duration: duration / 1000, ease: easing as any }}
                  className="absolute rounded-full"
                  style={{
                    width: sparkSize,
                    height: sparkSize,
                    backgroundColor: sparkColor,
                    marginLeft: -sparkSize / 2,
                    marginTop: -sparkSize / 2,
                  }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
