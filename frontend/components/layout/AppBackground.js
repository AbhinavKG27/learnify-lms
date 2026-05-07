import { motion, useReducedMotion } from 'framer-motion';

const ambientOrbs = [
  {
    className: 'left-[-12rem] top-[-10rem] h-[34rem] w-[34rem] bg-neon-pink/[0.22] dark:bg-neon-pink/[0.24]',
    animate: { x: [0, 42, 16, 0], y: [0, 26, 58, 0], scale: [1, 1.08, 0.98, 1] },
    duration: 30,
  },
  {
    className: 'right-[-14rem] top-[8rem] h-[38rem] w-[38rem] bg-neon-violet/[0.24] dark:bg-neon-violet/[0.28]',
    animate: { x: [0, -52, -18, 0], y: [0, 38, -20, 0], scale: [1, 0.95, 1.08, 1] },
    duration: 36,
  },
  {
    className: 'bottom-[-18rem] left-[18%] h-[42rem] w-[42rem] bg-cyan-400/[0.14] dark:bg-cyan-400/[0.16]',
    animate: { x: [0, 56, -28, 0], y: [0, -38, -70, 0], scale: [1, 1.06, 0.96, 1] },
    duration: 42,
  },
  {
    className: 'bottom-[8%] right-[8%] h-[24rem] w-[24rem] bg-accent-400/[0.14] dark:bg-accent-400/[0.18]',
    animate: { x: [0, -24, 26, 0], y: [0, -36, 14, 0], scale: [1, 1.12, 1, 1] },
    duration: 28,
  },
];

export default function AppBackground({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen isolate overflow-hidden bg-[#f8f6ff] text-text-primary transition-colors duration-500 dark:bg-[#030014] dark:text-text-primary-dark">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,46,159,0.18),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(123,97,255,0.24),transparent_32%),radial-gradient(circle_at_52%_92%,rgba(34,211,238,0.13),transparent_30%),linear-gradient(135deg,#fbf9ff_0%,#f2ecff_36%,#f9f7ff_100%)] dark:bg-[radial-gradient(circle_at_18%_12%,rgba(255,46,159,0.24),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(123,97,255,0.30),transparent_32%),radial-gradient(circle_at_52%_92%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(135deg,#030014_0%,#0b0624_36%,#16072f_72%,#05010f_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,18,51,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,18,51,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-55 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.075)_1px,transparent_1px)] dark:opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.45)_60%,rgba(237,233,254,0.82)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,0,20,0.12)_48%,rgba(0,0,0,0.72)_100%)]" />

        {ambientOrbs.map((orb) => (
          <motion.div
            key={orb.className}
            className={`absolute rounded-full blur-[110px] ${orb.className}`}
            animate={reduceMotion ? undefined : orb.animate}
            transition={reduceMotion ? undefined : { duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: reduceMotion ? 'auto' : 'transform' }}
          />
        ))}

        <motion.div
          className="absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-[conic-gradient(from_160deg,rgba(255,46,159,0.08),rgba(123,97,255,0.12),rgba(34,211,238,0.08),rgba(255,46,159,0.08))] blur-3xl dark:border-white/5 dark:bg-[conic-gradient(from_160deg,rgba(255,46,159,0.12),rgba(123,97,255,0.14),rgba(34,211,238,0.09),rgba(255,46,159,0.12))]"
          animate={reduceMotion ? undefined : { rotate: [0, 360], scale: [1, 1.04, 1] }}
          transition={reduceMotion ? undefined : { rotate: { duration: 80, repeat: Infinity, ease: 'linear' }, scale: { duration: 26, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ willChange: reduceMotion ? 'auto' : 'transform' }}
        />

        <div className="app-noise absolute inset-0 opacity-[0.12] mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
}