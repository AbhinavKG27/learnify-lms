export default function StatsCard({ icon, label, value, sub, color = 'brand' }) {
  const colorMap = {
    brand: 'text-accent-500 bg-accent-400/10 border-accent-400/30',
    cta: 'text-cta-600 bg-cta-500/10 border-cta-500/25',
    primary: 'text-primary-700 dark:text-primary-200 bg-primary-200/60 dark:bg-primary-700/30 border-primary-300 dark:border-primary-600',
    accent: 'text-accent-500 bg-accent-400/10 border-accent-400/30',
  };

  return (
    <div className="card p-5 transition-colors duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colorMap[color] || colorMap.brand}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-display font-bold text-primary-900 dark:text-white mb-0.5">{value}</p>
      <p className="text-sm font-medium text-primary-700 dark:text-slate-300">{label}</p>
      {sub && <p className="text-xs text-primary-600 dark:text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}