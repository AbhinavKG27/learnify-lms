import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import AuthForm from '../components/auth/AuthForm';
import { getRoleDashboardPath, useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(router.query.next || getRoleDashboardPath(user?.role));
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      router.push(router.query.next || getRoleDashboardPath(data.user?.role));
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sign In — Learnify">
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="glass-panel p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex w-14 h-14 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-brand-900/40">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="font-display font-bold text-2xl text-text-primary dark:text-text-primary-dark">Welcome back</h1>
              <p className="text-text-secondary dark:text-text-secondary-dark text-sm mt-1">Sign in to continue your learning journey</p>
            </div>

            <AuthForm
              mode="login"
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          </div>

          <p className="text-center text-xs text-text-secondary/80 dark:text-text-secondary-dark/75 mt-6">
            By signing in, you agree to our{' '}
            <span className="text-text-secondary dark:text-text-secondary-dark">Terms of Service</span> and{' '}
            <span className="text-text-secondary dark:text-text-secondary-dark">Privacy Policy</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}