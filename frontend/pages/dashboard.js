import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { PageLoader } from '../components/ui/Spinner';
import { getRoleDashboardPath, useAuth } from '../hooks/useAuth';

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace('/login?next=/dashboard');
      return;
    }
    router.replace(getRoleDashboardPath(user?.role));
  }, [loading, isAuthenticated, user, router]);

  return (
    <Layout title="Dashboard — Learnify">
      <PageLoader />
    </Layout>
  );
}