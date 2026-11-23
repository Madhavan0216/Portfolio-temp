import { useState, useEffect, lazy, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Critical path — loaded immediately
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import ClickSpark from './components/ClickSpark';
import { BackgroundWebGL } from './components/ui/BackgroundWebGL';
import SkipLink from './components/seo/SkipLink';

import { ScrollFramesAnimation } from './components/ScrollFramesAnimation';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import SelectedWorks from './components/SelectedWorks';
import Journal from './components/Journal';
import Stats from './components/Stats';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

// ── Global perf: tell GSAP not to fight the browser compositor ──
gsap.config({ force3D: true });

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [frameProgress, setFrameProgress] = useState(0);

  useEffect(() => {
    (window as any).onFrameProgress = (loaded: number, total: number) => {
      setFrameProgress(Math.floor((loaded / total) * 100));
    };
    return () => {
      delete (window as any).onFrameProgress;
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,           // slightly snappier (was 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      syncTouch: false,         // don't intercept native touch scroll
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // lagSmoothing: allow GSAP to skip frames when lagging rather than burst-compensate
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <SkipLink />
      <BackgroundWebGL />
      <div className="noise-overlay" />
      <CustomCursor />
      <ClickSpark
        sparkColor="var(--color-accent)"
        sparkSize={12}
        sparkRadius={25}
        sparkCount={10}
        duration={600}
        extraScale={1.2}
      />

      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} targetProgress={frameProgress} />
      )}

      <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <ScrollFramesAnimation>
          <Hero />

          {/* Sections */}
          <div style={{ paddingTop: '8vh' }} />
          <About />
          <div style={{ paddingTop: '12vh' }} />
          <Skills />
          <div style={{ paddingTop: '12vh' }} />
          <Experience />
          <div style={{ paddingTop: '12vh' }} />
          <SelectedWorks />
          <div style={{ paddingTop: '12vh' }} />
          <Journal />
          <div style={{ paddingTop: '12vh' }} />
          <Stats />
          <div style={{ paddingTop: '12vh' }} />

          <Contact />
        </ScrollFramesAnimation>
      </div>
    </>
  );
}
