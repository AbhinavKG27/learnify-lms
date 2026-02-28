import { useEffect, useState } from 'react';

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
);

/**
 * Toast - simple non-blocking notification
 * Props:
 *   message  : string  — text to display
 *   type     : 'success' | 'error'
 *   onClose  : fn      — called after auto-dismiss or manual close
 *   duration : number  — ms before auto-close (default 3500)
 */
export default function Toast({ message, type = 'success', onClose, duration = 3500 }) {
  const [visible, setVisible] = useState(false);

  // Animate in on mount
  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10);
    const hide = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for fade-out then remove from DOM
    }, duration);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [duration, onClose]);

  const colors = {
    success: 'bg-emerald-900/90 border-emerald-500/50 text-emerald-100',
    error:   'bg-red-900/90 border-red-500/50 text-red-100',
  };
  const icons = {
    success: <CheckIcon />,
    error:   <ErrorIcon />,
  };

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3.5
        rounded-xl border shadow-2xl shadow-black/50 backdrop-blur-sm
        transition-all duration-300
        ${colors[type]}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      role="alert"
    >
      <span className={type === 'success' ? 'text-emerald-400' : 'text-red-400'}>
        {icons[type]}
      </span>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
