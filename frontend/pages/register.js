import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import AuthForm from '../components/auth/AuthForm';
import { getRoleDashboardPath, useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const { register, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(getRoleDashboardPath(user?.role));
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async ({ name, email, password, role }) => {
    setLoading(true);
    setError('');
    try {
      const data = await register(name, email, password, role);
      router.push(getRoleDashboardPath(data.user?.role));
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Create Account — Learnify">
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md">
          <div className="glass-panel p-8">
            <div className="text-center mb-8">
              <div className="inline-flex w-14 h-14 bg-gradient-to-br from-brand-500 to-violet-500 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-brand-900/40">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="font-display font-bold text-2xl text-text-primary dark:text-text-primary-dark">Create your account</h1>
              <p className="text-text-secondary dark:text-text-secondary-dark text-sm mt-1">Join Learnify as a student or instructor today</p>
            </div>

            <AuthForm
              mode="register"
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          </div>

          {/* Benefits */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {['Student progress', 'Instructor tools', 'Role protected'].map(b => (
              <div key={b} className="text-center py-3 glass rounded-xl">
                <p className="text-xs text-text-secondary dark:text-text-secondary-dark font-medium">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}