import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import CourseCard from '../../../components/course/CourseCard';
import StatsCard from '../../../components/ui/StatsCard';
import Toast from '../../../components/ui/Toast';
import { PageLoader } from '../../../components/ui/Spinner';
import { subjectsAPI } from '../../../lib/api';
import { useAuth } from '../../../hooks/useAuth';

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export default function StudentDashboardPage() {
  const { user, isAuthenticated, isStudent, loading: authLoading } = useAuth();
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('enrolled');
  const [enrolling, setEnrolling] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace('/login?next=/dashboard/student');
      return;
    }
    if (!isStudent) {
      router.replace('/dashboard/instructor');
    }
  }, [authLoading, isAuthenticated, isStudent, router]);

  const fetchAllData = useCallback(async () => {
    try {
      const [enrolledRes, allRes] = await Promise.all([
        subjectsAPI.getEnrolled(),
        subjectsAPI.getAll(),
      ]);
      console.log('[Dashboard] Enrolled subjects:', enrolledRes.data.subjects?.length);
      console.log('[Dashboard] All subjects:', allRes.data.subjects?.length);
      setSubjects(enrolledRes.data.subjects);
      setAllSubjects(allRes.data.subjects.filter(s => !s.enrolled));
    } catch (err) {
      console.error('[Dashboard] Failed to fetch subjects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !isStudent) return;
    fetchAllData();
  }, [isAuthenticated, isStudent, fetchAllData]);

  const handleEnroll = useCallback(async (subjectId) => {
    console.log('[Dashboard] Enrolling in subject:', subjectId);
    setEnrolling(subjectId);
    try {
      await subjectsAPI.enroll(subjectId);
      console.log('[Dashboard] Enrollment success — refetching from DB');
      // Refetch from real DB so enrolled list is accurate
      await fetchAllData();
      setToast({ message: 'Successfully enrolled! 🎉 Head to My Courses to start learning.', type: 'success' });
    } catch (err) {
      const msg = err.response?.data?.error || 'Enrollment failed. Please try again.';
      console.error('[Dashboard] Enrollment error:', msg);
      setToast({ message: msg, type: 'error' });
    } finally {
      setEnrolling(null);
    }
  }, [fetchAllData]);

  if (authLoading || loading) return <Layout title="Student Dashboard — Learnify"><PageLoader /></Layout>;

  const totalVideos = subjects.reduce((acc, s) => acc + (s.video_count || 0), 0);
  const completedVideos = subjects.reduce((acc, s) => acc + (s.completed_videos || 0), 0);
  const avgProgress = subjects.length > 0
    ? Math.round(subjects.reduce((acc, s) => acc + (s.video_count > 0 ? (s.completed_videos || 0) / s.video_count * 100 : 0), 0) / subjects.length)
    : 0;

  return (
    <Layout title="Student Dashboard — Learnify">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="dashboard-shell">
        <div className="dashboard-content">
          {/* Welcome header */}
          <div className="dashboard-hero mb-8">
            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-gradient-to-br from-accent-400 via-brand-500 to-cta-500 font-display text-2xl font-bold text-white shadow-[0_20px_45px_-24px_rgba(255,46,159,0.95)] dark:border-white/10">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/[0.65] px-3 py-1 text-xs font-bold uppercase tracking-[0.28em] text-neon-violet shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                    <span className="h-2 w-2 rounded-full bg-neon-violet shadow-[0_0_16px_rgba(123,97,255,0.9)]" />
                    Student lounge
                  </div>
                  <h1 className="font-display text-4xl font-extrabold tracking-tight text-primary-900 dark:text-white sm:text-5xl">
                    Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0]}</span>!
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-primary-700 dark:text-slate-300">
                    Pick up where you left off, discover your next course, and track progress from a refined learning workspace.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/[0.55] px-4 py-3 text-sm text-primary-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                <span className="font-display text-lg font-bold text-primary-900 dark:text-white">{avgProgress}%</span> average progress
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatsCard
            icon={<BookmarkIcon />}
            label="Enrolled Courses"
            value={subjects.length}
            color="brand"
          />
          <StatsCard
            icon={<GridIcon />}
            label="Videos Completed"
            value={completedVideos}
            sub={`of ${totalVideos} total`}
            color="cta"
          />
          <StatsCard
            icon={<TrophyIcon />}
            label="Avg. Progress"
            value={`${avgProgress}%`}
            color="accent"
          />
          <StatsCard
            icon={<GridIcon />}
            label="Available Courses"
            value={allSubjects.length}
            sub="not yet enrolled"
            color="primary"
          />
        </div>

          {/* Tabs */}
          <div className="mb-8 flex w-fit gap-1 rounded-2xl border border-white/70 bg-white/70 p-1 shadow-[0_18px_60px_-42px_rgba(37,20,93,0.85)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
          {[
            { key: 'enrolled', label: `My Courses (${subjects.length})` },
            { key: 'browse', label: `Browse (${allSubjects.length})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-brand-primary-gradient text-white shadow-lg shadow-primary-900/25'
                  : 'text-primary-700 dark:text-slate-400 hover:bg-white/60 hover:text-primary-900 dark:hover:bg-white/5 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

          {/* Content */}
        {activeTab === 'enrolled' ? (
          subjects.length === 0 ? (
            <div className="premium-panel p-16 text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="font-display font-bold text-xl text-primary-900 dark:text-white mb-2">No courses yet</h3>
              <p className="text-primary-700 dark:text-slate-400 mb-6">Browse available courses and enroll to start learning</p>
              <button onClick={() => setActiveTab('browse')} className="btn-primary">
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((s, i) => (
                <CourseCard key={s.id} subject={{ ...s, enrolled: true }} index={i} />
              ))}
            </div>
          )
        ) : (
          allSubjects.length === 0 ? (
            <div className="premium-panel p-16 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display font-bold text-xl text-primary-900 dark:text-white mb-2">You're enrolled in everything!</h3>
              <p className="text-primary-700 dark:text-slate-400">All available courses are in your library.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSubjects.map((s, i) => (
                <CourseCard key={s.id} subject={s} index={i} onEnroll={handleEnroll} enrolling={enrolling === s.id} />
              ))}
            </div>
          )
        )}
        </div>
      </div>
    </Layout>
  );
}