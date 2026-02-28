import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-surface-950 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-display font-bold text-white">Learnify</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Learnify LMS. Built with Next.js & Node.js.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Home</Link>
            <Link href="/#courses" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Courses</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
