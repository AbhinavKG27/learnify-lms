import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-neon-violet/25 dark:border-neon-violet/35 bg-background/80 dark:bg-background-dark/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Perfect vertical alignment container */}
        <div className="flex items-center justify-between h-16">
          
          {/* ===== BRAND / LOGO (FIXED ALIGNMENT + CURVED NEON) ===== */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            
            {/* Curvy Neon Logo Shell */}
            <div className="
  relative 
  w-11 h-11 
  flex items-center justify-center 
  rounded-2xl 
  bg-gradient-to-br from-neon-pink via-neon-violet to-purple-600
  shadow-lg shadow-neon-pink/30
  ring-1 ring-white/10
  overflow-hidden
  backdrop-blur-sm
  transition-all duration-300 
  group-hover:scale-105
">
              
              {/* Logo Image (Perfect Fit) */}
              <Image
            src="/logo.png"
            alt="Learnify logo"
            width={28}
            height={28}
            priority
            className="
              w-7 h-7 
              object-contain 
              rounded-xl 
              p-0.5 
              bg-transparent
              mix-blend-normal
              "
            />
            </div>

            {/* Brand Text (Perfect Baseline Alignment) */}
            <span className="font-display font-bold text-xl tracking-tight leading-none text-text-primary dark:text-text-primary-dark">
              Learnify
            </span>
          </Link>

          {/* CENTER NAV */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/#courses" className="btn-ghost text-sm">Courses</Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="btn-ghost text-sm">Dashboard</Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold border border-neon-violet/35 dark:border-neon-violet/40 bg-surface/90 dark:bg-surface-dark/90 text-text-primary dark:text-text-primary-dark transition-all duration-300 hover:scale-105"
              aria-label="Toggle theme"
            >
              <ThemeIcon isDark={isDark} />
              {isDark ? 'Light' : 'Dark'}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-2xl bg-surface/90 dark:bg-surface-dark/90 border border-neon-violet/35 dark:border-neon-violet/40 transition-all hover:scale-[1.02]"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center text-xs font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-text-primary dark:text-text-primary-dark font-medium">
                    {user?.name}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 card shadow-xl shadow-black/30 py-1 z-50">
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary dark:text-text-secondary-dark hover:bg-neon-violet/10 dark:hover:bg-white/5 transition-colors">
                      Dashboard
                    </Link>
                    <hr className="border-neon-violet/20 dark:border-neon-violet/30 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-neon-pink hover:bg-neon-pink/10 transition-colors"
                    >
                      Sign Out
                    </button>
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

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden btn-ghost p-2">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}