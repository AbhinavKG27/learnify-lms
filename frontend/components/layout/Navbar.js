import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Close dropdown on outside click (Works for Mobile + Desktop)
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-neon-violet/25 dark:border-neon-violet/35 bg-background/85 dark:bg-background-dark/85 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN NAV BAR */}
        <div className="flex items-center justify-between h-16">
          
          {/* ===== LOGO + NAME ===== */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="
              relative w-11 h-11 flex items-center justify-center
              rounded-2xl
              bg-gradient-to-br from-neon-pink via-neon-violet to-purple-600
              shadow-lg shadow-neon-pink/30
              ring-1 ring-white/10
              overflow-hidden
              transition-all duration-300
              group-hover:scale-105
            ">
              <Image
                src="/logo.png"
                alt="Learnify logo"
                width={26}
                height={26}
                priority
                className="w-6 h-6 object-contain rounded-full"
              />
            </div>

            {/* ALWAYS visible (mobile + desktop) */}
            <span className="font-display font-bold text-xl tracking-tight leading-none text-text-primary dark:text-text-primary-dark">
              Learnify
            </span>
          </Link>

          {/* ===== DESKTOP NAV ===== */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/#courses" className="btn-ghost text-sm">Courses</Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="btn-ghost text-sm">Dashboard</Link>
            )}
          </div>

          {/* ===== RIGHT SIDE (MOBILE + DESKTOP UNIFIED) ===== */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* THEME TOGGLE (VISIBLE ON MOBILE NOW) */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold border border-neon-violet/35 dark:border-neon-violet/40 bg-surface/90 dark:bg-surface-dark/90 text-text-primary dark:text-text-primary-dark transition-all duration-300 hover:scale-105"
              aria-label="Toggle theme"
            >
              <ThemeIcon isDark={isDark} />
              <span className="hidden sm:inline">
                {isDark ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* ===== USER (REPLACES HAMBURGER ON MOBILE) ===== */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 pl-2.5 pr-3 py-2 rounded-2xl 
                  bg-surface/90 dark:bg-surface-dark/90 
                  border border-neon-violet/35 dark:border-neon-violet/40 
                  transition-all hover:scale-[1.02]"
                >
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-pink to-neon-violet flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* USER NAME (NOW VISIBLE ON MOBILE) */}
                  <span className="text-sm text-text-primary dark:text-text-primary-dark font-medium max-w-[90px] truncate">
                    {user?.name}
                  </span>
                </button>

                {/* DROPDOWN MENU (Mobile + Desktop) */}
                {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-surface dark:bg-surface-dark border border-neon-violet/30 shadow-xl py-1 z-50">
    
    {/* 👇 COURSES - MOBILE ONLY */}


<button
  onClick={() => {
    setDropdownOpen(false);
    router.push("/#courses");
  }}
  className="w-full text-left px-4 py-2.5 text-sm 
  text-neon-pink hover:bg-neon-pink/10 
  transition-all duration-200"
>
  📚 Courses
</button>

<hr className="border-neon-violet/20 my-1" />

    {/* Dashboard (All devices) */}
    <button
  onClick={() => {
    setDropdownOpen(false);
    router.push("/dashboard");
  }}
  className="w-full text-left px-4 py-2.5 text-sm 
  text-neon-pink hover:bg-neon-pink/10 
  transition-all duration-200"
>
  Dashboard
</button>

    <hr className="border-neon-violet/20 my-1" />

    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2.5 text-sm text-neon-pink hover:bg-neon-pink/10"
    >
      Sign Out
    </button>
  </div>
)}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="btn-ghost text-sm">Sign In</Link>
                <Link href="/register" className="btn-primary text-sm">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}