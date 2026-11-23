import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType | any;
  delay?: number;
  trigger?: boolean;
}

export function TextReveal({ text, className = '', style, as: Component = 'div' as any, delay = 0, trigger = true }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Split text into characters
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.set(chars, {
      opacity: 0,
      y: 50,
      rotateX: -90,
      z: -50,
      transformOrigin: "50% 50% -50",
      filter: 'blur(10px)',
    });

    const animation = gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      z: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.04,
      ease: 'power4.out',
      delay,
      scrollTrigger: trigger ? {
        trigger: containerRef.current,
        start: 'top 85%',
      } : undefined
    });

    return () => {
      animation.kill();
    };
  }, [delay, trigger]);

  const Comp: any = Component;
  return (
    <Comp ref={containerRef} className={className} style={{ perspective: "1000px", ...style }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block will-change-transform"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </Comp>
  );
}