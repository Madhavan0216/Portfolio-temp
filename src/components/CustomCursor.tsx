import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────
// Pure CSS cursor — zero WebGL overhead.
// Minimalistic trail added matching theme colors.
// ─────────────────────────────────────────────────────────────────

const TRAIL_COUNT = 6;

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use raw values, updated on mousemove
    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let rafId: number;
    let isHidden = false;

    // Trail physics
    const trails = Array.from({ length: TRAIL_COUNT }, () => ({ x: mouseX, y: mouseY }));

    // ── Dot: instant snap (no RAF needed) ──
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Direct style mutation — fastest possible update
      dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;

      if (isHidden) {
        isHidden = false;
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
        trailRefs.current.forEach((el, i) => el && (el.style.opacity = `${0.9 * (1 - i / TRAIL_COUNT)}`));
      }
    };

    const onLeave = () => {
      isHidden = true;
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
      trailRefs.current.forEach(el => el && (el.style.opacity = '0'));
    };

    const onEnter = () => {
      isHidden = false;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
      trailRefs.current.forEach((el, i) => el && (el.style.opacity = `${0.9 * (1 - i / TRAIL_COUNT)}`));
    };

    const onDown = () => ring.classList.add('cursor-ring--click');
    const onUp   = () => ring.classList.remove('cursor-ring--click');

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor]')) {
        ring.classList.add('cursor-ring--hover');
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor]')) {
        ring.classList.remove('cursor-ring--hover');
      }
    };

    // ── Ring & Trail: lagged follow at 60fps — one shared RAF ──
    const LERP = 0.11;
    const tick = () => {
      let isMoving = false;

      // Ring
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        ringX += dx * LERP;
        ringY += dy * LERP;
        ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;
        isMoving = true;
      }

      // Trail
      let targetX = mouseX;
      let targetY = mouseY;
      trails.forEach((trail, i) => {
        const tx = targetX - trail.x;
        const ty = targetY - trail.y;
        if (Math.abs(tx) > 0.05 || Math.abs(ty) > 0.05) {
          trail.x += tx * 0.35; // follow speed
          trail.y += ty * 0.35;
          const el = trailRefs.current[i];
          if (el) {
            el.style.transform = `translate3d(${trail.x}px,${trail.y}px,0) translate(-50%,-50%) scale(${1 - i/TRAIL_COUNT})`;
          }
          isMoving = true;
        }
        targetX = trail.x;
        targetY = trail.y;
      });

      if (isMoving) {
        // Keeps loop running if there's momentum
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('mousedown',  onDown,  { passive: true });
    window.addEventListener('mouseup',    onUp,    { passive: true });
    window.addEventListener('mouseover',  onOver,  { passive: true });
    window.addEventListener('mouseout',   onOut,   { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('mouseover',  onOver);
      window.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Trail */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            opacity: 0.9 * (1 - i / TRAIL_COUNT),
            pointerEvents: 'none',
            zIndex: 10000,
            willChange: 'transform',
            transition: 'opacity 0.2s',
          }}
        />
      ))}

      {/* Dot — instant snap */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none',
          zIndex: 10001,
          willChange: 'transform',
          transition: 'opacity 0.2s',
        }}
      />

      {/* Ring — lagged follow */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 30, height: 30,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.5)',
          pointerEvents: 'none',
          zIndex: 10001,
          willChange: 'transform',
          transition: 'width .22s ease, height .22s ease, border-color .22s ease, opacity .2s',
        }}
      />

      <style>{`
        html, body, a, button, input, select, textarea { cursor: none !important; }
        .cursor-ring--hover {
          width: 48px !important; height: 48px !important;
          border-color: var(--color-accent) !important;
        }
        .cursor-ring--click {
          width: 20px !important; height: 20px !important;
          border-color: rgba(255,255,255,.9) !important;
        }
      `}</style>
    </>
  );
}
