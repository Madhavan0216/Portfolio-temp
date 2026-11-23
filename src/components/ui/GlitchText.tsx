import React, { useRef } from 'react';
import gsap from 'gsap';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function GlitchText({ text, className = '', as: Component = 'span' }: GlitchTextProps) {
  const textRef = useRef<HTMLElement>(null);

  const handleMouseEnter = () => {
    if (!textRef.current) return;
    
    gsap.to(textRef.current, {
      duration: 0.1,
      x: () => (Math.random() - 0.5) * 4,
      y: () => (Math.random() - 0.5) * 4,
      skewX: () => (Math.random() - 0.5) * 10,
      textShadow: '2px 0 red, -2px 0 cyan',
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        gsap.to(textRef.current, { x: 0, y: 0, skewX: 0, textShadow: 'none', duration: 0.1 });
      }
    });
  };

  const Comp: any = Component;
  return (
    <Comp
      ref={textRef}
      className={`relative inline-block transition-transform ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </Comp>
  );
}