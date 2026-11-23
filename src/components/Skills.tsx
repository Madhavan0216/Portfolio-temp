import { motion } from 'framer-motion';
import GlareHover from './GlareHover';

const clusters = [
  { name: 'CLOUD & INFRA', items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Linux'] },
  { name: 'DEVOPS', items: ['CI/CD', 'GitHub Actions', 'Ansible', 'Nginx', 'Prometheus'] },
  { name: 'LANGUAGES', items: ['Python', 'JavaScript', 'TypeScript', 'Bash', 'Node.js'] },
  { name: 'SECURITY', items: ['Wireshark', 'Nmap', 'Metasploit', 'MITRE ATT&CK', 'Tor'] },
  { name: 'AI & ML', items: ['Gemini API', 'OpenRouter', 'LangChain', 'PyQt5', 'OpenAI'] },
];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden" style={{ padding: 'clamp(4vh,8vw,8vh) 0' }}>
      <div className="relative z-10 w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-5 h-px" style={{ background: 'rgba(255,255,255,.25)' }} />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em]" style={{ color: 'var(--color-accent)' }}>
              Technical Expertise
            </span>
            <span className="w-5 h-px" style={{ background: 'rgba(255,255,255,.25)' }} />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-body font-light leading-tight" style={{ color: 'rgba(255,255,255,.95)' }}>
            Skill <span className="font-display italic" style={{ color: 'var(--color-accent)' }}>Landscape</span>
          </h2>
        </motion.div>

        {/* 1-col mobile, 2-col tablet, 3-col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {clusters.map((cluster, i) => (
            <motion.div
              key={cluster.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="transition-all duration-300"
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
                className="p-4 sm:p-5 rounded-inherit"
                style={{ borderRadius: 'inherit' }}
              >
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-3 sm:mb-4 relative z-10"
                  style={{ color: 'var(--color-accent)' }}>
                  {cluster.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 relative z-10">
                  {cluster.items.map(item => (
                    <span key={item}
                      className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:text-white hover:-translate-y-[1px] cursor-pointer"
                      style={{
                        color: 'rgba(255,255,255,.8)',
                        border: '1px solid rgba(255,255,255,.12)',
                        background: 'rgba(255,255,255,.04)',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLSpanElement;
                        el.style.background = 'rgba(255,255,255,.15)';
                        el.style.boxShadow = '0 0 12px rgba(255,255,255,.25)';
                        el.style.borderColor = 'rgba(255,255,255,.3)';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLSpanElement;
                        el.style.background = 'rgba(255,255,255,.04)';
                        el.style.boxShadow = 'none';
                        el.style.borderColor = 'rgba(255,255,255,.12)';
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
