import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { TextReveal } from './ui/TextReveal';
import { GlitchText } from './ui/GlitchText';
import { WaveText } from './ui/WaveText';
import { Magnetic } from './ui/Magnetic';

const NAV_LINKS = ['Home', 'Work', 'Resume'];
const ROLES = ['Cloud & DevOps Engineer', 'Security Tool Builder', 'AI Systems Architect', 'Infrastructure Engineer'];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeNav,  setActiveNav]  = useState('Home');
  const [roleIndex,  setRoleIndex]  = useState(0);
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  // Role cycling
  useEffect(() => {
    const id = setInterval(() => setRoleIndex(p => (p + 1) % ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blur-in',
        { opacity: 0, filter: 'blur(8px)', y: 18 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.4 },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (link: string) => {
    setActiveNav(link);
    setMenuOpen(false);
    const map: Record<string, string> = { Home: 'hero', Work: 'selected-works', Resume: 'stats' };
    document.getElementById(map[link] || 'hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen w-full overflow-hidden">



      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-5 px-4">
        <div className={`inline-flex items-center rounded-full px-2 py-1.5 sm:py-2 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
          style={{
            background: 'rgba(11,15,23,.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,.1)',
            boxShadow: '0 0 30px rgba(100,140,255,.08)',
          }}
        >
          {/* Logo */}
          <Magnetic>
            <button className="group relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0">
              <span className="absolute inset-0 rounded-full accent-gradient group-hover:opacity-90 transition-opacity" />
              <span className="absolute inset-[2px] rounded-full bg-bg" />
              <span className="relative z-10 font-display italic text-[11px] sm:text-[13px] text-white">MA</span>
            </button>
          </Magnetic>

          {/* Desktop nav links */}
          <span className="hidden sm:block w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,.12)' }} />
          {NAV_LINKS.map(link => (
            <Magnetic key={link}>
              <button
                onClick={() => scrollTo(link)}
                className={`hidden sm:block text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-medium transition-all duration-300 ${
                  activeNav === link ? 'text-white bg-white/10' : 'text-white/65 hover:text-white hover:bg-white/8'
                }`}
              >
                <WaveText text={link} />
              </button>
            </Magnetic>
          ))}
          <span className="hidden sm:block w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,.12)' }} />

          {/* Say hi */}
          <Magnetic>
            <a href="mailto:madhavan2001vivo@gmail.com"
              className="hidden sm:flex text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 items-center gap-1 font-medium transition-all duration-300 text-white/80 hover:text-white hover:bg-white/8">
              Say hi <span className="text-xs">↗</span>
            </a>
          </Magnetic>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden ml-2 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-white/80 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white/80 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white/80 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full mt-2 left-4 right-4 rounded-2xl overflow-hidden sm:hidden"
            style={{ background: 'rgba(11,15,23,.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,.1)' }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                className="w-full text-left px-5 py-3.5 text-sm font-medium transition-colors"
                style={{ color: activeNav === link ? 'var(--color-accent)' : 'rgba(255,255,255,.75)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                {link}
              </button>
            ))}
            <a href="mailto:madhavan2001vivo@gmail.com"
              className="block px-5 py-3.5 text-sm font-medium" style={{ color: 'rgba(255,255,255,.75)' }}>
              Say hi ↗
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero Content ────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">

        <p className="blur-in text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] mb-4 sm:mb-6"
          style={{ color: 'var(--color-accent)' }}>
          COLLECTION '26
        </p>

        <div className="mb-4 sm:mb-6 cinematic-bloom">
          <TextReveal
            text="Madhavan"
            as="h1"
            className="font-display italic leading-[0.82] tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(4rem, 15vw, 10.5rem)' } as React.CSSProperties}
            delay={0.1}
          />
        </div>

        {/* Role pill */}
        <p className="blur-in text-xs sm:text-sm md:text-base mb-5 sm:mb-6 px-4 sm:px-5 py-1.5 rounded-full max-w-[90vw]"
          style={{
            color: 'rgba(255,255,255,.85)',
            background: 'rgba(11,15,23,.5)',
            border: '1px solid rgba(255,255,255,.1)',
            backdropFilter: 'blur(8px)',
          }}>
          A{' '}
          <span key={roleIndex} className="font-display italic text-white animate-role-fade-in inline-block mx-1">
            <GlitchText text={ROLES[roleIndex]} />
          </span>{' '}
          building intelligent ecosystems.
        </p>

        {/* Description */}
        <p className="blur-in text-xs sm:text-sm max-w-xs sm:max-w-md mb-8 sm:mb-10"
          style={{ color: 'rgba(255,255,255,.65)' }}>
          I build tools that make infrastructure intelligent — from anonymous browsing systems
          to AI assistants that control entire operating systems.
        </p>

        {/* CTA buttons — stack vertically on mobile */}
        <div className="blur-in flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto items-center">
          <a href="#selected-works"
            className="w-full sm:w-auto text-center rounded-full text-sm font-medium px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 hover:scale-105"
            style={{ background: 'white', color: '#0b0f17' }}>
            See Works
          </a>
          <a href="mailto:madhavan2001vivo@gmail.com"
            className="w-full sm:w-auto text-center rounded-full text-sm font-medium px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(255,255,255,.08)', color: 'white', border: '1px solid rgba(255,255,255,.15)' }}>
            Reach out ↗
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,.4)' }}>Scroll</span>
        <div className="w-px h-8 sm:h-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,.1)' }}>
          <div className="w-full h-3 accent-gradient animate-scroll-down absolute" />
        </div>
      </div>
    </section>
  );
}
