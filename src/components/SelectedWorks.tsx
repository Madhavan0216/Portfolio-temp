import { motion } from 'framer-motion';
import ghostlinkImg from '../assets/ghostlink.png';
import netmonitorImg from '../assets/netmonitor.png';
import jarvisImg from '../assets/jarvis_ai.png';
import GlareHover from './GlareHover';

const projects = [
  { title: 'GHOSTLINK',      category: 'Privacy & Security',    year: '2025', image: ghostlinkImg },
  { title: 'NETMONITOR',     category: 'Cybersecurity Platform', year: '2024', image: netmonitorImg },
  { title: 'JARVIS AI',      category: 'AI System Controller',  year: '2024', image: jarvisImg },
  { title: 'LOCAL AI STUDIO',category: 'Offline AI Platform',   year: '2024', image: null },
];

const gradients = [
  'bg-gradient-to-br from-slate-700 via-slate-800 to-black',
  'bg-gradient-to-br from-stone-700 via-stone-800 to-black',
  'bg-gradient-to-br from-zinc-600 via-zinc-800 to-black',
  'bg-gradient-to-br from-neutral-700 via-neutral-800 to-black',
];

export default function SelectedWorks() {
  return (
    <section id="selected-works" className="relative overflow-hidden" style={{ padding: 'clamp(4vh,8vw,8vh) 0' }}>
      <div className="relative z-10 w-full max-w-[920px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Header */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <span className="w-5 h-px" style={{ background: 'rgba(255,255,255,.25)' }} />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em]" style={{ color: 'var(--color-accent)' }}>Selected Work</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-body font-light leading-tight mb-1 sm:mb-2"
              style={{ color: 'rgba(255,255,255,.95)' }}>
              Featured <span className="font-display italic" style={{ color: 'var(--color-accent)' }}>projects</span>
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,.5)' }}>
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <button className="hidden sm:inline-flex items-center gap-2 rounded-full text-xs font-medium uppercase tracking-[0.18em] px-4 py-2 transition-all duration-300 hover:text-white"
            style={{ border: '1px solid rgba(255,255,255,.15)', background: 'rgba(11,15,23,.5)', color: 'rgba(255,255,255,.6)' }}>
            View all →
          </button>
        </motion.div>

        {/* Grid — 2-col landscape cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {projects.map((project, i) => {
            return (
              <motion.div
                key={project.title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group cursor-pointer relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video"
                style={{ border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 0 30px rgba(100,140,255,.05)' }}
              >
                <GlareHover
                  glareColor="hsl(140 60% 65%)" // match theme
                  glareOpacity={0.12}
                  glareSize={400}
                  transitionDuration={500}
                >
                  {project.image ? (
                    <img src={project.image} alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.9] transition-all duration-700 ease-out group-hover:scale-[1.02]" />
                  ) : (
                    <div className={`absolute inset-0 ${gradients[i]} group-hover:scale-[1.02] transition-transform duration-700 ease-out`} />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,.45)' }}>
                    <span className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1"
                      style={{ background: 'white', color: '#0b0f17' }}>
                      View — <span className="font-display italic">{project.title}</span>
                    </span>
                  </div>

                  {/* Info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, rgba(0,0,0,.3) 60%, transparent 100%)' }}>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] mb-0.5 font-medium"
                          style={{ color: 'rgba(255,255,255,.55)' }}>{project.category}</p>
                        <h3 className="text-sm sm:text-base font-body font-semibold" style={{ color: 'rgba(255,255,255,.95)' }}>
                          {project.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,.4)' }}>{project.year}</span>
                    </div>
                  </div>
                </GlareHover>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
