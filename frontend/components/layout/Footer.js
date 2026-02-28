import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-primary-300 dark:border-primary-800/60 bg-surface-100 dark:bg-surface-950 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-cta-500 rounded-xl flex items-center justify-center">
              <Image
                  src="/learnify-logo.png"
                  alt="Learnify-logo"
                  width={16}
                  height={16}
                  className="w-4 h-4"
              />
            </div>
            <span className="font-display font-bold text-primary-900 dark:text-white">Learnify</span>
          </div>
          <p className="text-sm text-primary-600 dark:text-slate-500">
            © {new Date().getFullYear()} Learnify LMS. Built with Next.js & Node.js. By aBhi and AI tools
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-primary-600 dark:text-slate-500 hover:text-primary-900 dark:hover:text-slate-300 transition-colors">Home</Link>
            <Link href="/#courses" className="text-sm text-primary-600 dark:text-slate-500 hover:text-primary-900 dark:hover:text-slate-300 transition-colors">Courses</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}