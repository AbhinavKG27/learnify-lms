import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import CourseCard from '../components/course/CourseCard';
import Toast from '../components/ui/Toast';
import { subjectsAPI } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

/* ================= HERO (NO BOX + FULL GRADIENT) ================= */
const HeroSection = () => (
  <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden">

    {/* LIGHT MODE BACKGROUND */}
    <div className="absolute inset-0 
      bg-[radial-gradient(ellipse_at_top,_#f5f3ff_0%,_#ede9fe_40%,_#ffffff_100%)]
      dark:bg-[radial-gradient(ellipse_at_top,_#14052c_0%,_#070018_40%,_#020010_100%)]" 
    />

    {/* Glow Effects */}
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] 
      bg-pink-400/20 dark:bg-pink-500/20 
      blur-[180px] rounded-full" 
    />
    <div className="absolute -bottom-40 -right-32 w-[550px] h-[550px] 
      bg-violet-400/20 dark:bg-violet-500/20 
      blur-[160px] rounded-full" 
    />

    {/* Smooth fade */}
    <div className="absolute bottom-0 left-0 w-full h-40 
      bg-gradient-to-b 
      from-transparent 
      to-white 
      dark:to-[#020010]" 
    />

    <div className="relative z-10 w-full max-w-6xl px-6 sm:px-8 text-center pt-12">

      <h1 className="font-display font-extrabold 
        text-4xl sm:text-6xl lg:text-7xl 
        leading-[1.05] 
        text-gray-900 dark:text-white 
        mb-6"
      >
        Learn Without{' '}
        <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          Limits...
        </span>
        <br />
        Master With{' '}
        <span className="bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Purpose...
        </span>
      </h1>

      <p className="text-lg sm:text-xl 
        text-gray-600 dark:text-white/70 
        max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Immersive, structured learning paths that unlock step by step. Stay focused,
        stay consistent, and master every topic with momentum.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/register"
          className="px-8 py-3.5 rounded-full font-semibold 
          bg-gradient-to-r from-pink-500 to-orange-400 
          text-white shadow-lg shadow-pink-500/30 
          hover:scale-105 transition-all duration-300"
        >
          Start Learning →
        </Link>

        <Link
          href="#courses"
          className="px-8 py-3.5 rounded-full font-semibold 
          border border-gray-300 dark:border-white/20 
          text-gray-800 dark:text-white/90 
          hover:bg-gray-100 dark:hover:bg-white/10 
          transition-all duration-300"
        >
          Browse Courses
        </Link>
      </div>
    </div>
  </section>
);

/* ================= FEATURES (NO HARD BACKGROUND) ================= */
const FeaturesSection = () => (
  <section className="py-24 relative">
    
    {/* CONTINUE SAME GRADIENT TO REMOVE MIDDLE LINE */}
    <div className="absolute inset-0 
      bg-gradient-to-b 
      from-white 
      via-gray-50 
      to-gray-100 
      dark:from-[#020010] 
      dark:via-[#060018] 
      dark:to-[#030012]" 
    />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display font-bold text-4xl 
          text-gray-900 dark:text-white mb-4">
          Why Learnify Works
        </h2>
        <p className="text-gray-600 dark:text-white/70 max-w-xl mx-auto">
          Built around the science of structured learning. Every feature is intentional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: '🔒',
            title: 'Linear Locked Paths',
            desc: 'Complete each video before unlocking the next. No shortcuts, no confusion—just clarity.',
          },
          {
            icon: '▶️',
            title: 'Resume Anytime',
            desc: 'Pick up exactly where you left off. Your progress is saved to the second.',
          },
          {
            icon: '📈',
            title: 'Visual Progress',
            desc: 'Watch your progress percentage climb with every completed lesson.',
          },
          {
            icon: '⚡',
            title: 'Auto-Load Next Video',
            desc: 'Smooth transitions between lessons. Finish one, the next loads automatically.',
          },
          {
            icon: '🎯',
            title: 'Structured Curriculum',
            desc: 'Courses organized into sections and videos, carefully sequenced for optimal learning.',
          },
          {
            icon: '🔐',
            title: 'Secure & Private',
            desc: 'JWT authentication with refresh tokens. Your account and progress are always protected.',
          },
        ].map(f => (
          <div
            key={f.title}
            className="p-6 rounded-xl 
            backdrop-blur-xl 
            bg-white dark:bg-white/5 
            border border-gray-200 dark:border-white/10 
            hover:border-pink-400/40 
            transition-all duration-300"
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-display font-bold 
              text-gray-900 dark:text-white 
              text-lg mb-2"
            >
              {f.title}
            </h3>
            <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    subjectsAPI.getAll()
      .then(res => setSubjects(res.data.subjects))
      .catch(err => console.error(err))
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

    setEnrolling(subjectId);

    try {
      await subjectsAPI.enroll(subjectId);
      setSubjects(prev =>
        prev.map(s => s.id === subjectId ? { ...s, enrolled: true } : s)
      );
      showToast('Successfully enrolled! 🎉 You can start learning now.');
    } catch (err) {
      const msg = err.response?.data?.error || 'Enrollment failed.';
      showToast(msg, 'error');
    } finally {
      setEnrolling(null);
    }
  }, [isAuthenticated, router, showToast]);

  return (
    <Layout title="Learnify-LMS">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <HeroSection />
      <FeaturesSection />

      {/* 🔥 COURSES — NO HARD BACKGROUND (REMOVES LINE) */}
      <section id="courses" className="py-24 relative">
        <div className="absolute inset-0 
            bg-gradient-to-b 
          from-gray-100 
          via-white 
          to-white 
          dark:from-[#030012] 
          dark:via-[#040016] 
          dark:to-[#020010]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-gray-900 dark:text-white mb-4">
              Explore Courses
            </h2>
            <p className="text-gray-600 dark:text-white/70">
              Handcrafted learning paths for today's most in-demand skills.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="card h-80 animate-pulse bg-white/5" />
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
        </div>
      </section>
    </Layout>
  );
}