import { motion } from 'framer-motion';
import GlareHover from './GlareHover';

const events = [
  {
    id: 'education', era: '2020 — 2023', title: 'Cloud & DevOps Foundations',
    subtitle: 'Engineering Education',
    quote: '"Learning the infrastructure of the internet"', active: false,
  },
  {
    id: 'projects', era: '2023 — 2025', title: 'The Projects Era',
    subtitle: 'Building GHOSTLink, JARVIS, NetMonitor & 5 more tools',
    quote: '"Engineering at the edge of what\'s possible"', active: false,
  },
  {
    id: 'now', era: '2026 — Present', title: 'Now — Active',
    subtitle: 'Available for freelance & full-time roles',
    quote: '"Building the infrastructure of tomorrow"', active: true,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden" style={{ padding: 'clamp(4vh,8vw,8vh) 0' }}>
      <div className="relative z-10 w-full max-w-[680px] mx-auto px-4 sm:px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-5 h-px" style={{ background: 'rgba(255,255,255,.25)' }} />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em]" style={{ color: 'var(--color-accent)' }}>Journey</span>
            <span className="w-5 h-px" style={{ background: 'rgba(255,255,255,.25)' }} />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-body font-light leading-tight" style={{ color: 'rgba(255,255,255,.95)' }}>
            My <span className="font-display italic" style={{ color: 'var(--color-accent)' }}>Experience</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="transition-all duration-300"
              style={{
                background: event.active ? 'rgba(20,28,42,.62)' : 'rgba(11,15,23,.58)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: event.active ? '1px solid rgba(137,212,207,.22)' : '1px solid rgba(255,255,255,.1)',
                boxShadow: event.active
                  ? '0 0 40px rgba(100,200,210,.08), inset 0 1px 1px rgba(137,212,207,.06)'
                  : '0 0 40px rgba(100,140,255,.05), inset 0 1px 1px rgba(255,255,255,.04)',
                borderRadius: '1.25rem',
              }}
            >
              <GlareHover
                glareColor="hsl(140 60% 65%)"
                glareOpacity={0.08}
                glareSize={500}
                className="p-4 sm:p-5 rounded-inherit"
                style={{ borderRadius: 'inherit' }}
              >
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,.5)' }}>
                    {event.era}
                  </span>
                  {event.active && (
                    <span className="text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                      style={{ background: 'var(--color-accent)', color: '#0b0f17' }}>
                      Active
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-display italic mb-1 relative z-10"
                  style={{ color: 'rgba(255,255,255,.95)' }}>
                  {event.title}
                </h3>
                <p className="text-sm mb-3 relative z-10" style={{ color: 'rgba(255,255,255,.65)' }}>{event.subtitle}</p>

                <div className="pl-3 relative z-10" style={{ borderLeft: '2px solid rgba(255,255,255,.1)' }}>
                  <p className="text-xs italic" style={{ color: 'rgba(255,255,255,.42)' }}>{event.quote}</p>
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
