import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neon-violet/25 dark:border-neon-violet/35 bg-background/70 dark:bg-background-dark/70 backdrop-blur py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="
  w-10 h-10 
  flex items-center justify-center 
  rounded-2xl 
  bg-gradient-to-br from-neon-pink via-neon-violet to-purple-600
  shadow-md shadow-neon-pink/20
  ring-1 ring-white/10
  overflow-hidden
">
              <Image
  src="/logo.png"
  alt="Learnify logo"
  width={22}
  height={22}
  className="w-6 h-6 object-contain rounded-lg p-0.5"
/>
            </div>

            <span className="font-display font-bold text-lg text-text-primary dark:text-text-primary-dark tracking-tight">
              Learnify
            </span>
          </div>

          <p className="text-sm text-text-secondary dark:text-text-secondary-dark text-center md:text-left">
            © {new Date().getFullYear()} Learnify-LMS. Built with Next.js & Node.js by aBhi And AI.
          </p>

          <div className="flex gap-6">
            <Link href="/" className="text-sm text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors">
              Home
            </Link>
            <Link href="/#courses" className="text-sm text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark transition-colors">
              Courses
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}