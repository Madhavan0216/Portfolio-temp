import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const items = [
  { title: 'Geometric Flux',  subtitle: 'Exploration 01', color: 'from-blue-900/70 to-purple-900/70',   video: 'https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8' },
  { title: 'Light Study',     subtitle: 'Exploration 02', color: 'from-amber-900/70 to-orange-900/70',  video: 'https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8' },
  { title: 'Abstract Form',   subtitle: 'Exploration 03', color: 'from-emerald-900/70 to-teal-900/70', video: 'https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8' },
  { title: 'Digital Texture', subtitle: 'Exploration 04', color: 'from-rose-900/70 to-pink-900/70',    video: 'https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8' },
  { title: 'Mono Chrome',     subtitle: 'Exploration 05', color: 'from-gray-800/70 to-gray-900/70',    video: 'https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8' },
  { title: 'Color Field',     subtitle: 'Exploration 06', color: 'from-indigo-900/70 to-violet-900/70',video: 'https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8' },
];

function ExplorationPanel({ item, index }: { item: typeof items[0]; index: number }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const img = imgRef.current;
    if (!panel || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(img,
        { y: '-8%' },
        {
          y: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Parallax background layer */}
      <div
        ref={imgRef}
        className={`absolute inset-[-10%] bg-gradient-to-br ${item.color}`}
      />

      {/* Halftone texture */}
      <div className="absolute inset-0 halftone-overlay opacity-10 mix-blend-multiply pointer-events-none" />

      {/* Bottom-left content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-0 left-0 right-0 p-10 md:p-16 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      >
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-2">{item.subtitle}</p>
        <h3 className="text-4xl md:text-6xl font-display italic text-text-primary">{item.title}</h3>
      </motion.div>

      {/* Index number top-right */}
      <div className="absolute top-8 right-10 text-xs text-muted/50 font-body tracking-[0.2em] uppercase">
        {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </div>
    </div>
  );
}

export default function Explorations() {
  return (
    <section id="explorations">
      {/* ── Section header ──────────────────────────────────── */}
      <div className="bg-transparent py-24 md:py-32 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
          <span className="w-8 h-px bg-stroke" />
        </div>
        <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary leading-tight mb-4">
          Visual <span className="font-display italic">playground</span>
        </h2>
        <p className="text-sm text-muted mb-8 max-w-sm mx-auto">
          A curated collection of visual experiments and creative explorations.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full text-xs uppercase tracking-[0.2em] border border-stroke px-5 py-2.5 text-muted hover:text-text-primary transition-all"
        >
          View on Dribbble <span>↗</span>
        </a>
      </div>

      {/* ── Individual full-height panels ───────────────────── */}
      {items.map((item, i) => (
        <ExplorationPanel key={item.title} item={item} index={i} />
      ))}
    </section>
  );
}
