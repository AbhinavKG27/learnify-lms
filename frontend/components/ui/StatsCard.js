export default function StatsCard({ icon, label, value, sub, color = 'brand' }) {
  const colorMap = {
    brand: {
      shell: 'from-accent-500/20 via-brand-500/10 to-white/30 dark:from-accent-500/25 dark:via-brand-500/10 dark:to-white/5',
      icon: 'text-accent-600 dark:text-accent-300 bg-accent-400/15 border-accent-400/30 shadow-accent-500/20',
      orb: 'bg-accent-400/30',
    },
    cta: {
      shell: 'from-cta-500/20 via-accent-500/10 to-white/30 dark:from-cta-500/25 dark:via-accent-500/10 dark:to-white/5',
      icon: 'text-cta-600 dark:text-cta-400 bg-cta-500/15 border-cta-500/30 shadow-cta-500/20',
      orb: 'bg-cta-400/30',
    },
    primary: {
      shell: 'from-primary-400/20 via-white/30 to-white/30 dark:from-primary-500/25 dark:via-white/5 dark:to-white/5',
      icon: 'text-primary-700 dark:text-primary-200 bg-primary-200/70 dark:bg-primary-700/30 border-primary-300 dark:border-primary-500/50 shadow-primary-500/20',
      orb: 'bg-primary-400/30',
    },
    accent: {
      shell: 'from-brand-500/20 via-accent-400/10 to-white/30 dark:from-brand-500/25 dark:via-accent-400/10 dark:to-white/5',
      icon: 'text-brand-700 dark:text-brand-400 bg-brand-500/15 border-brand-500/30 shadow-brand-500/20',
      orb: 'bg-brand-400/30',
    },
  };

  const palette = colorMap[color] || colorMap.brand;

  return (
    <div className={`group relative overflow-hidden rounded-[1.65rem] border border-white/70 bg-gradient-to-br ${palette.shell} p-5 shadow-[0_24px_70px_-42px_rgba(37,20,93,0.85)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_-44px_rgba(123,97,255,0.78)] dark:border-white/10`}>
      <div className={`absolute -right-8 -top-10 h-24 w-24 rounded-full ${palette.orb} blur-2xl transition-transform duration-500 group-hover:scale-125`} />
      <div className="relative flex items-start justify-between mb-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg ${palette.icon}`}>
          {icon}
        </div>
        <span className="rounded-full border border-white/60 bg-white/50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-700/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-300/70">
          Live
        </span>
      </div>
      <p className="relative mb-0.5 font-display text-3xl font-bold tracking-tight text-primary-900 dark:text-white">{value}</p>
      <p className="relative text-sm font-semibold text-primary-800 dark:text-slate-200">{label}</p>
      {sub && <p className="relative mt-1 text-xs text-primary-600 dark:text-slate-400">{sub}</p>}
    </div>
  );
}