import React, { useRef } from 'react';
import gsap from 'gsap';

export function WaveText({ text, className = '' }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.wave-char');
    gsap.killTweensOf(chars);
    gsap.to(chars, {
      y: -5,
      scaleY: 1.1,
      color: 'var(--color-accent)',
      stagger: {
        each: 0.03,
        from: 'start',
        yoyo: true,
        repeat: 1
      },
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={containerRef}
      className={`inline-flex ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="wave-char inline-block will-change-transform transition-colors"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}