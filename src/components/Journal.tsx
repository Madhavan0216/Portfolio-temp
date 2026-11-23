import { motion } from 'framer-motion';
import GlareHover from './GlareHover';

const entries = [
  { title: 'The Art of Minimalism in UI Design', date: 'March 2026', readTime: '5 min read', number: '01' },
  { title: 'Building Design Systems That Scale', date: 'February 2026', readTime: '8 min read', number: '02' },
  { title: 'Why Motion Design Matters More Than Ever', date: 'January 2026', readTime: '4 min read', number: '03' },
  { title: 'From Concept to Launch: A Case Study', date: 'December 2025', readTime: '12 min read', number: '04' },
];

export default function Journal() {
  return (
    <section className="relative overflow-hidden" style={{ padding: 'clamp(4vh,8vw,8vh) 0' }}>
      <div className="relative z-10 w-full max-w-[720px] mx-auto px-4 sm:px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-px" style={{ background: 'rgba(255,255,255,.25)' }} />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em]" style={{ color: 'var(--color-accent)' }}>Recent thoughts</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-body font-light leading-tight mb-2" style={{ color: 'rgba(255,255,255,.95)' }}>
            Recent <span className="font-display italic" style={{ color: 'var(--color-accent)' }}>thoughts</span>
          </h2>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,.55)' }}>
            Ideas, reflections, and lessons from the creative journey.
          </p>
        </motion.div>

        <div className="flex flex-col gap-2.5">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.number}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group"
              style={{
                background: 'rgba(11,15,23,.58)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,.1)',
                boxShadow: '0 0 30px rgba(100,140,255,.05)',
                borderRadius: '9999px',
                transition: 'border-color .3s, background .3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(137,212,207,.25)';
                el.style.background  = 'rgba(14,20,32,.65)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(255,255,255,.1)';
                el.style.background  = 'rgba(11,15,23,.58)';
              }}
            >
              <GlareHover
                glareColor="hsl(140 60% 65%)"
                glareOpacity={0.08}
                glareSize={300}
                className="flex items-center gap-3 sm:gap-4 cursor-pointer rounded-inherit"
                style={{ padding: '0.7rem 1.1rem', borderRadius: 'inherit' }}
              >
                <span className="text-[10px] font-medium w-6 shrink-0 tabular-nums relative z-10" style={{ color: 'rgba(255,255,255,.35)' }}>
                  {entry.number}
                </span>

                <div className="flex-1 min-w-0 relative z-10">
                  <span className="text-sm sm:text-base font-body font-light truncate block transition-colors group-hover:text-white"
                    style={{ color: 'rgba(255,255,255,.88)' }}>
                    {entry.title}
                  </span>
                </div>

                {/* Meta — visible on sm+ */}
                <div className="hidden sm:flex items-center gap-3 shrink-0 relative z-10">
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,.42)' }}>{entry.readTime}</span>
                  <span className="w-px h-3" style={{ background: 'rgba(255,255,255,.15)' }} />
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,.42)' }}>{entry.date}</span>
                </div>

                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors relative z-10"
                  style={{ border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.45)' }}>
                  →
                </span>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
