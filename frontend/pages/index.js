import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import CourseCard from '../components/course/CourseCard';
import Toast from '../components/ui/Toast';
import { subjectsAPI } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

const HeroSection = () => (
  <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden">
    {/* Background grid pattern */}
    <div className="absolute inset-0 bg-hero-pattern opacity-100" />
    {/* Gradient overlays */}
    <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent-400/20 rounded-full filter blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cta-500/15 rounded-full filter blur-3xl" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-950" />

    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-primary-900 dark:text-white leading-[1.05] mb-6 animate-fade-up">
        Learn Without{' '}
        <span className="text-gradient">Limits.</span>
        <br />
        Master with{' '}
        <span className="relative">
          <span className="text-gradient">Purpose.</span>
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 8" fill="none">
            <path d="M0 6 Q75 0 150 4 Q225 8 300 2" stroke="#5EB1BF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
          </svg>
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-primary-700 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animate-delay-100">
        Structured, linear learning paths that unlock step by step. No skipping ahead—
        just pure, focused progress from beginner to expert.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-200">
        <Link href="/register" className="btn-primary text-base px-8 py-3.5 shadow-xl shadow-primary-900/30">
          Start Learning Free →
        </Link>
        <Link href="#courses" className="btn-secondary text-base px-8 py-3.5">
          Browse Courses
        </Link>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-8 mt-14 animate-fade-up animate-delay-300">
        {[
          { value: '3+', label: 'Expert Courses' },
          { value: '30+', label: 'Video Lessons' },
          { value: '100%', label: 'Free to Start' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="font-display font-bold text-3xl text-primary-900 dark:text-white">{stat.value}</div>
            <div className="text-sm text-primary-600 dark:text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="font-display font-bold text-4xl text-primary-900 dark:text-white mb-4">
        Why Learnify Works
      </h2>
      <p className="text-primary-700 dark:text-slate-400 max-w-xl mx-auto">
        Built around the science of structured learning. Every feature is intentional.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          icon: '🔒',
          title: 'Linear Locked Paths',
          desc: 'Complete each video before unlocking the next. No shortcuts, no confusion—just clarity.',
          color: 'brand',
        },
        {
          icon: '▶️',
          title: 'Resume Anytime',
          desc: 'Pick up exactly where you left off. Your progress is saved to the second.',
          color: 'violet',
        },
        {
          icon: '📈',
          title: 'Visual Progress',
          desc: 'Watch your progress percentage climb with every completed lesson.',
          color: 'emerald',
        },
        {
          icon: '⚡',
          title: 'Auto-Load Next Video',
          desc: 'Smooth transitions between lessons. Finish one, the next loads automatically.',
          color: 'amber',
        },
        {
          icon: '🎯',
          title: 'Structured Curriculum',
          desc: 'Courses organized into sections and videos, carefully sequenced for optimal learning.',
          color: 'brand',
        },
        {
          icon: '🔐',
          title: 'Secure & Private',
          desc: 'JWT authentication with refresh tokens. Your account and progress are always protected.',
          color: 'violet',
        },
      ].map(f => (
        <div key={f.title} className="card p-6 hover:border-primary-400 dark:hover:border-primary-700 transition-all hover:-translate-y-0.5 duration-300">
          <div className="text-3xl mb-4">{f.icon}</div>
          <h3 className="font-display font-bold text-primary-900 dark:text-white text-lg mb-2">{f.title}</h3>
          <p className="text-primary-700 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null); // subjectId currently enrolling
  const [toast, setToast] = useState(null);          // { message, type }

  useEffect(() => {
    subjectsAPI.getAll()
      .then(res => {
        console.log('[HomePage] Subjects loaded:', res.data.subjects?.length);
        setSubjects(res.data.subjects);
      })
      .catch(err => console.error('[HomePage] Failed to load subjects:', err))
      .finally(() => setLoading(false));
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleEnroll = useCallback(async (subjectId) => {
    if (!isAuthenticated) {
      router.push(`/login?next=/#courses`);
      return;
    }

    console.log('[HomePage] Enrolling in subject:', subjectId);
    setEnrolling(subjectId); // show spinner on the button — card stays visible

    try {
      await subjectsAPI.enroll(subjectId);
      console.log('[HomePage] Enrollment success for subject:', subjectId);

      // Optimistic UI update — mark as enrolled in local state (no refetch, no vanish)
      setSubjects(prev =>
        prev.map(s => s.id === subjectId ? { ...s, enrolled: true } : s)
      );

      showToast('Successfully enrolled! 🎉 You can start learning now.');
    } catch (err) {
      const msg = err.response?.data?.error || 'Enrollment failed. Please try again.';
      console.error('[HomePage] Enrollment error:', msg);
      showToast(msg, 'error');
    } finally {
      setEnrolling(null);
    }
  }, [isAuthenticated, router, showToast]);

  return (
    <Layout title="Learnify — Learn Anything, Master Everything">
      {/* Global Toast — rendered outside page flow so it floats bottom-right */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <HeroSection />
      <FeaturesSection />

      {/* Course Catalog */}
      <section id="courses" className="py-24 bg-surface-100/70 dark:bg-surface-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-primary-900 dark:text-white mb-4">
              Explore Courses
            </h2>
            <p className="text-primary-700 dark:text-slate-400">
              Handcrafted learning paths for today's most in-demand skills.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="card h-80 animate-pulse">
                  <div className="h-44 bg-slate-800" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-slate-800 rounded w-3/4" />
                    <div className="h-3 bg-slate-800 rounded" />
                    <div className="h-3 bg-slate-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, idx) => (
                <CourseCard
                  key={subject.id}
                  subject={subject}
                  index={idx}
                  onEnroll={handleEnroll}
                  enrolling={enrolling === subject.id}
                />
              ))}
            </div>
          )}

          {!loading && subjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-primary-600 dark:text-slate-500">No courses available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card p-10 glow-brand relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-400/10 to-cta-600/10" />
            <div className="relative z-10">
              <h2 className="font-display font-bold text-4xl text-primary-900 dark:text-white mb-4">
                Ready to Level Up?
              </h2>
              <p className="text-primary-700 dark:text-slate-400 mb-8 leading-relaxed">
                Join thousands of learners mastering in-demand skills with structured, step-by-step courses.
              </p>
              <Link href={isAuthenticated ? '/dashboard' : '/register'} className="btn-primary text-base px-10 py-3.5 shadow-xl shadow-primary-900/30">
                {isAuthenticated ? 'Go to Dashboard →' : 'Start Free Today →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}