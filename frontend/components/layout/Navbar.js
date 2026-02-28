import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ThemeIcon = ({ isDark }) => (
  isDark ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-10h-1M4.34 12h-1m14.95 6.95l-.7-.7M6.41 6.41l-.7-.7m12.58 0l-.7.7M6.41 17.59l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
);

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-100/90 dark:bg-surface-950/85 backdrop-blur-xl border-b border-primary-300/70 dark:border-primary-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-accent-400 to-cta-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-900/30 transition-shadow">
              <Image
                src="/Learnify-logo.png"
                  alt="Learnify-logo"
                    width={20}
                      height={20}
                        className="w-5 h-5"
              />
            </div>
            <span className="font-display font-bold text-xl text-primary-900 dark:text-white tracking-tight">Learnify</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/#courses" className="btn-ghost text-sm">Courses</Link>
            {isAuthenticated && <Link href="/dashboard" className="btn-ghost text-sm">Dashboard</Link>}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold border border-primary-300 dark:border-primary-700 bg-surface-50 dark:bg-surface-900 text-primary-800 dark:text-slate-100 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <ThemeIcon isDark={isDark} />
              {isDark ? 'Light' : 'Dark'}
            </button>
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-xl bg-surface-50 dark:bg-surface-900 border border-primary-300 dark:border-primary-700 transition-all">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-400 to-cta-500 flex items-center justify-center text-xs font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-primary-900 dark:text-slate-100 font-medium">{user?.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 card shadow-xl shadow-primary-900/20 py-1 z-50">
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-primary-800 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-white/5 transition-colors">Dashboard</Link>
                    <hr className="border-primary-200 dark:border-primary-800 my-1" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-cta-600 hover:bg-cta-500/10 transition-colors">Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-ghost text-sm">Sign In</Link>
                <Link href="/register" className="btn-primary text-sm">Get Started</Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden btn-ghost p-2">☰</button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface-100 dark:bg-surface-950 border-b border-primary-300 dark:border-primary-800 px-4 py-4 space-y-2">
          <button onClick={toggleTheme} className="w-full btn-secondary text-sm">Switch to {isDark ? 'Light' : 'Dark'} Mode</button>
          <Link href="/#courses" onClick={() => setMobileOpen(false)} className="block btn-ghost py-2.5 text-sm">Courses</Link>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block btn-ghost py-2.5 text-sm">Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-left btn-ghost py-2.5 text-sm text-cta-600">Sign Out</button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="btn-secondary text-sm flex-1 text-center">Sign In</Link>
              <Link href="/register" className="btn-primary text-sm flex-1 text-center">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}