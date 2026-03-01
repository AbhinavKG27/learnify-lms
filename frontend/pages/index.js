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
    
    {/* 🌌 ULTRA SMOOTH FULL-BLEED GRADIENT (NO HARD LINES) */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#14052c_0%,_#070018_40%,_#020010_100%)]" />

    {/* Soft Neon Glow (Properly blended, no harsh edges) */}
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-pink-500/20 blur-[180px] rounded-full" />
    <div className="absolute -bottom-40 -right-32 w-[550px] h-[550px] bg-violet-500/20 blur-[160px] rounded-full" />
    <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-indigo-500/15 blur-[140px] rounded-full" />

    {/* 🧠 IMPORTANT: Smooth fade to next section (removes middle line) */}
    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#020010]" />

    {/* CONTENT */}
    <div className="relative z-10 w-full max-w-6xl px-6 sm:px-8 text-center pt-12">
      
      <h1 className="font-display font-extrabold 
        text-4xl sm:text-6xl lg:text-7xl 
        leading-[1.05] 
        text-white 
        mb-6 animate-fade-up"
      >
        Discover the future of{' '}
        <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
          Learning.
        </span>
        <br />
        Build your skills in{' '}
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
          Neon Flow.
        </span>
      </h1>

      <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animate-delay-100">
        Immersive, structured learning paths that unlock step by step. Stay focused,
        stay consistent, and master every topic with momentum.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-200">
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
          border border-white/20 text-white/90 
          hover:bg-white/10 transition-all duration-300"
        >
          Browse Courses
        </Link>
      </div>

      {/* Floating Stats (no divider line) */}
      <div className="flex flex-wrap justify-center gap-10 mt-16 animate-fade-up animate-delay-300">
        {[
          { value: '15+', label: 'Expert Courses' },
          { value: '150+', label: 'Video Lessons' },
          { value: '100%', label: 'Free to Start' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="font-display font-bold text-3xl text-white">
              {stat.value}
            </div>
            <div className="text-sm text-white/60 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ================= FEATURES (NO HARD BACKGROUND) ================= */
const FeaturesSection = () => (
  <section className="py-24 relative">
    
    {/* CONTINUE SAME GRADIENT TO REMOVE MIDDLE LINE */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#020010] via-[#060018] to-[#030012]" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display font-bold text-4xl text-white mb-4">
          Why Learnify Works
        </h2>
        <p className="text-white/70 max-w-xl mx-auto">
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
            className="card p-6 backdrop-blur-xl bg-white/5 border border-white/10 hover:border-pink-400/40 transition-all duration-300"
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-display font-bold text-white text-lg mb-2">{f.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{f.desc}</p>
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
    <Layout title="Learnify — Learn Anything, Master Everything">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#030012] via-[#040016] to-[#020010]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-white mb-4">
              Explore Courses
            </h2>
            <p className="text-white/70">
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