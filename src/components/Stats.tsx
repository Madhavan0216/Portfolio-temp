import { motion } from 'framer-motion';
import GlareHover from './GlareHover';

const stats = [
  { value: '3+', label: 'Years Experience', description: 'Engineering infrastructure' },
  { value: '10+', label: 'Projects Built', description: 'From concept to production' },
  { value: '5+', label: 'AI & DevOps Tools', description: 'Operating at the edge' },
];

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden" style={{ padding: 'clamp(4vh,8vw,8vh) 0' }}>
      <div className="relative z-10 w-full max-w-[800px] mx-auto px-4 sm:px-6 md:px-10">
        {/* 1-col on mobile, 3-col on md */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                background: 'rgba(11,15,23,.58)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,.1)',
                boxShadow: '0 0 40px rgba(100,140,255,.06), inset 0 1px 1px rgba(255,255,255,.05)',
                borderRadius: '1.25rem',
              }}
            >
              <GlareHover
                glareColor="hsl(140 60% 65%)"
                glareOpacity={0.08}
                glareSize={400}
                className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-0 rounded-inherit text-center"
                style={{ padding: 'clamp(1rem,3vw,1.75rem) clamp(0.75rem,2vw,1.25rem)', borderRadius: 'inherit' }}
              >
                <span className="block text-4xl sm:text-5xl md:text-6xl font-display italic sm:mb-2 relative z-10"
                  style={{ color: 'var(--color-accent)' }}>
                  {stat.value}
                </span>
                <div className="text-left sm:text-center relative z-10">
                  <span className="block text-xs sm:text-[11px] font-semibold uppercase tracking-[0.15em] mb-0.5 sm:mb-1"
                    style={{ color: 'rgba(255,255,255,.9)' }}>
                    {stat.label}
                  </span>
                  <span className="block text-xs sm:text-[11px]" style={{ color: 'rgba(255,255,255,.48)' }}>
                    {stat.description}
                  </span>
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
