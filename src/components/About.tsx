import { motion } from 'framer-motion';
import profileImg from '../assets/iam.jpeg';
import GlareHover from './GlareHover';
import TiltedCard from './TiltedCard';

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden" style={{ padding: 'clamp(6vh,10vw,14vh) 0 clamp(4vh,6vw,8vh)' }}>
      <div className="relative z-10 w-full max-w-[860px] mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: 'rgba(10,10,20,.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,.1)',
            boxShadow: '0 0 60px rgba(100,140,255,.08), inset 0 1px 1px rgba(255,255,255,.06)',
            borderRadius: 'clamp(1rem,3vw,2rem)',
          }}
        >
          <GlareHover
             glareColor="hsl(140 60% 65%)"
             glareOpacity={0.08}
             glareSize={600}
             style={{ padding: 'clamp(1.25rem,4vw,2.5rem)', borderRadius: 'inherit' }}
          >
            <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-10 items-center">

            {/* Left — Text */}
            <div className="w-full md:col-span-7 flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-5 h-px" style={{ background: 'rgba(255,255,255,.25)' }} />
                <span className="text-[11px] font-medium tracking-[0.28em] uppercase" style={{ color: 'var(--color-accent)' }}>Who I am</span>
              </div>

              <p className="text-base sm:text-lg md:text-xl font-body font-light leading-relaxed mb-6"
                style={{ color: 'rgba(255,255,255,.92)' }}>
                I'm <strong className="font-medium text-white">Madhavan</strong> — a Cloud &amp; DevOps engineer
                who doesn't just maintain infrastructure. I build the tools that make infrastructure{' '}
                <span className="font-display italic" style={{ color: 'var(--color-accent)' }}>intelligent</span>.
                From anonymous browsing systems to AI assistants that control entire operating systems.
              </p>

              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ border: '1px solid rgba(137,212,207,.3)', background: 'rgba(137,212,207,.06)' }}>
                <span className="font-display italic text-sm" style={{ color: 'var(--color-accent)' }}>M</span>
              </div>
            </div>

            {/* Right — Profile Image with hover reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full md:col-span-5 flex justify-center"
            >
              <div className="relative"
                style={{ width: 'clamp(140px,40vw,220px)', aspectRatio: '3/4' }}>

                {/* Ambient glow */}
                <div className="absolute -inset-3 rounded-2xl blur-2xl opacity-30 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse, var(--color-accent) 0%, transparent 70%)' }} />

                <TiltedCard
                  imageSrc={profileImg}
                  altText="Madhavan"
                  captionText="Madhavan - Cloud & DevOps Engineer"
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip
                  displayOverlayContent
                  overlayContent={
                    <>
                      {/* Bottom fade */}
                      <div className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{ background: 'linear-gradient(to top, rgba(11,15,23,.4) 0%, transparent 40%)' }} />
                      
                      {/* Accent dot */}
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse-green pointer-events-none"
                        style={{ background: 'var(--color-accent)', boxShadow: '0 0 8px var(--color-accent)' }} />
                      
                      {/* Text */}
                      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                        <p className="font-display italic text-sm text-white drop-shadow-md" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                          Madhavan - HxRO
                        </p>
                      </div>
                    </>
                  }
                />
              </div>
            </motion.div>

          </div>
          </GlareHover>
        </motion.div>
      </div>
    </section>
  );
}
