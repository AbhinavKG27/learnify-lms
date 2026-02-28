import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated]);

  const handleSubmit = async ({ name, email, password }) => {
    setLoading(true);
    setError('');
    try {
      await register(name, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Create Account — Learnify">
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-brand-600/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full filter blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="card p-8 shadow-2xl shadow-black/40">
            <div className="text-center mb-8">
              <div className="inline-flex w-14 h-14 bg-gradient-to-br from-brand-500 to-violet-500 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-brand-900/40">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="font-display font-bold text-2xl text-white">Create your account</h1>
              <p className="text-slate-400 text-sm mt-1">Join Learnify and start mastering new skills today</p>
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
            {['100% Free', 'Linear Path', 'Track Progress'].map(b => (
              <div key={b} className="text-center py-3 glass rounded-xl">
                <p className="text-xs text-slate-400 font-medium">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
