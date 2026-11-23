import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const socials = ['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'];

export default function Contact() {
  /* ── Content layer ──────────────────────────────────── */

  return (
    <section className="bg-transparent pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">

      {/* ── Content layer ──────────────────────────────────── */}
      <div className="relative z-10">

        {/* CTA */}
        <div className="text-center py-12 md:py-16 max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary leading-tight mb-4">
            Let's work <span className="font-display italic">together</span>
          </h2>
          <p className="text-sm text-muted mb-8">
            Have a project in mind? Let's create something extraordinary.
          </p>

          {/* Email button */}
          <a
            href="mailto:madhavan2001vivo@gmail.com"
            className="inline-flex items-center gap-2 rounded-full text-sm px-7 py-3.5 transition-all duration-300 group relative overflow-hidden border border-stroke group-hover:border-transparent"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="glass-panel !border-none !shadow-none rounded-full px-7 py-3.5 text-text-primary relative z-10 flex items-center gap-2">
              Get in touch <span>↗</span>
            </span>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full max-w-[1200px] mx-auto h-px bg-stroke my-8" />

        {/* Footer bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social links */}
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-muted hover:text-text-primary transition-colors uppercase tracking-[0.15em] cursor-pointer"
              >
                {s}
              </a>
            ))}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-green" />
            <span className="text-xs text-muted">Available for projects</span>
          </div>

          {/* Copyright */}
          <span className="text-xs text-muted/50 mt-4 sm:mt-0">
            © 2026 Madhavan. All rights reserved.
          </span>
        </div>
      </div>
    </section>
  );
}
