import React, { useEffect, useRef, useState } from "react";

// ─── Configuration ────────────────────────────────────────────────────────────
const FRAME_COUNT = 960;

// Skip frames based on device capability
// High-end: every frame (960)   Low-end: every 3rd frame (~320)
const detectStep = (): number => {
  if (typeof navigator === "undefined") return 1;
  const cores = (navigator as any).hardwareConcurrency ?? 4;
  const conn   = (navigator as any).connection;
  const slow   = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g" || conn?.saveData;
  if (slow || cores <= 2) return 3;
  if (cores <= 4)         return 2;
  return 1;
};

const STEP          = detectStep();
const EFF_COUNT     = Math.ceil(FRAME_COUNT / STEP);

// Draw at half resolution — CSS scales it up.
// This is the #1 speed win: 4× fewer pixels to write per frame.
const DRAW_W = 960;
const DRAW_H = 540;

// ─── Helper ───────────────────────────────────────────────────────────────────
function frameUrl(i: number): string {
  return `/frames2/frame_${((i * STEP) + 1).toString().padStart(6, "0")}.webp`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const ScrollFramesAnimation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  // Store ImageBitmaps — GPU-ready, draw is a simple texture blit
  const bitmapsRef   = useRef<(ImageBitmap | null)[]>(Array(EFF_COUNT).fill(null));
  const lastFrameRef = useRef(-1);
  const rafRef       = useRef<number>(0);
  const [ready, setReady] = useState(false); // first frame visible

  useEffect(() => {
    let mounted = true;
    let loaded = 0;
    let active = 0;
    let idx = 0;
    const CONCURRENCY = 12; // Lower concurrency to prevent main thread lag during loading

    const pump = () => {
      if (!mounted) return;
      if (loaded === EFF_COUNT) {
        return;
      }
      while (active < CONCURRENCY && idx < EFF_COUNT) {
        const frameIdx = idx++;
        active++;
        fetch(frameUrl(frameIdx))
          .then(r => r.ok ? r.blob() : Promise.reject())
          .then(blob => createImageBitmap(blob, { colorSpaceConversion: "none", premultiplyAlpha: "none" }))
          .then(bm => {
            if (!mounted) { bm.close(); return; }
            bitmapsRef.current[frameIdx] = bm;
          })
          .catch(() => {})
          .finally(() => {
            active--;
            loaded++;
            if (loaded === 1 && canvasRef.current) {
              const ctx = canvasRef.current.getContext("2d", { alpha: false });
              const bm = bitmapsRef.current[frameIdx] || bitmapsRef.current[0];
              if (bm) ctx?.drawImage(bm, 0, 0, DRAW_W, DRAW_H);
              setReady(true);
            }
            // Report progress globally so App.tsx can use it without deeply nesting state
            if (typeof (window as any).onFrameProgress === "function") {
              (window as any).onFrameProgress(loaded, EFF_COUNT);
            }
            pump();
          });
      }
    };
    pump();

    return () => {
      mounted = false;
      // Close all bitmaps to free GPU memory
      bitmapsRef.current.forEach(bm => bm?.close());
      bitmapsRef.current.fill(null);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // alpha:false = no premultiply overhead; willReadFrequently:false = write-only path
    const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
    if (!ctx) return;

    // Disable smoothing — we're scaling via CSS, not canvas transform
    ctx.imageSmoothingEnabled = false;

    const draw = () => {
      if (!containerRef.current) return;
      const rect     = containerRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const frac  = Math.max(0, Math.min(1, -rect.top / maxScroll));
      const fi    = Math.min(EFF_COUNT - 1, Math.floor(frac * EFF_COUNT));

      // Handle video crossfade
      if (videoRef.current && canvasRef.current) {
        const isScrolled = frac > 0.001; // slight scroll threshold
        if (!isScrolled) {
          videoRef.current.style.opacity = "0.55";
          canvasRef.current.style.opacity = "0";
        } else {
          videoRef.current.style.opacity = "0";
          canvasRef.current.style.opacity = "0.55";
        }
      }

      if (fi === lastFrameRef.current) return; // no change — skip draw entirely
      lastFrameRef.current = fi;

      const bm = bitmapsRef.current[fi];
      if (bm) {
        // ImageBitmap.drawImage is a GPU texture blit — extremely fast
        ctx.drawImage(bm, 0, 0, DRAW_W, DRAW_H);
      } else {
        // Frame not loaded yet — walk backwards to find nearest loaded frame
        for (let k = fi - 1; k >= 0; k--) {
          if (bitmapsRef.current[k]) {
            ctx.drawImage(bitmapsRef.current[k]!, 0, 0, DRAW_W, DRAW_H);
            break;
          }
        }
      }
    };

    let active = true;
    const loop = () => {
      if (!active) return;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Fixed canvas — behind all UI */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ clipPath: "inset(0 0 0 0)", zIndex: 0 }}
      >
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#0b120f]">
          {/* Seamless loop video for top of page */}
          <video
            ref={videoRef}
            src="/frames2/Create_a_perfect_seamless_loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-[1.15] transition-opacity duration-700 ease-in-out"
            style={{ opacity: 0.55 }}
          />
          {/*
            width/height = half-res draw surface.
            CSS stretches it to full screen (the scaling is free — GPU compositor).
          */}
          <canvas
            ref={canvasRef}
            width={DRAW_W}
            height={DRAW_H}
            className="absolute inset-0 w-full h-full object-cover scale-[1.15] transition-opacity duration-700 ease-in-out"
            style={{
              opacity: 0,
              // hint browser this layer won't be read, only drawn to
              willChange: "contents",
            }}
          />
        </div>
      </div>

      {/* UI sections float above */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};
