import Link from 'next/link';
import Layout from '../components/layout/Layout';

export default function NotFoundPage() {
  return (
    <Layout title="404 — Page Not Found">
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="font-display font-black text-[120px] leading-none text-brand-600/20 mb-4">404</div>
          <h1 className="font-display font-bold text-3xl text-white mb-3">Page Not Found</h1>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Looks like this lesson doesn't exist yet. Let's get you back on track.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-secondary">Go Home</Link>
            <Link href="/dashboard" className="btn-primary">Dashboard</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
