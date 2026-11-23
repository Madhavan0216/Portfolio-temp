import React, { useRef, useState } from 'react';

interface GlareHoverProps {
  children: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number; // unused in radial glow, kept for signature compatibility
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlareHover({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.1,
  glareAngle = -30,
  glareSize = 500,
  transitionDuration = 500,
  playOnce = false,
  className = "",
  style = {}
}: GlareHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const hasPlayedRef = useRef(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    if (playOnce && hasPlayedRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x, y, opacity: glareOpacity });
  };

  const onMouseLeave = () => {
    if (playOnce) {
      hasPlayedRef.current = true;
    }
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={onMouseMove} 
      onMouseLeave={onMouseLeave}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
    >
      {children}
      <div 
        className="pointer-events-none absolute inset-0 z-[100] transition-opacity"
        style={{
          transitionDuration: `${transitionDuration}ms`,
          opacity: glare.opacity,
          background: `radial-gradient(circle ${glareSize}px at ${glare.x}% ${glare.y}%, ${glareColor}, transparent)`
        }}
      />
    </div>
  );
}
