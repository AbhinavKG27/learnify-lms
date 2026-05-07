import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

import Layout from '../components/layout/Layout';
import CourseCard from '../components/course/CourseCard';
import Toast from '../components/ui/Toast';

import { subjectsAPI } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

/* ================= HERO SECTION ================= */

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

    {/* Background */}
    <div
      className="absolute inset-0
      bg-[radial-gradient(ellipse_at_top,_#f5f3ff_0%,_#ede9fe_40%,_#ffffff_100%)]
      dark:bg-[radial-gradient(ellipse_at_top,_#14052c_0%,_#070018_40%,_#020010_100%)]"
    />

    {/* Animated Glow 1 */}
    <motion.div
      animate={{
        x: [0, 40, 0],
        y: [0, 30, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute -top-40 -left-40 w-[650px] h-[650px]
      bg-pink-500/20 blur-[180px] rounded-full"
    />

    {/* Animated Glow 2 */}
    <motion.div
      animate={{
        x: [0, -30, 0],
        y: [0, -40, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute -bottom-40 -right-32 w-[600px] h-[600px]
      bg-violet-500/20 blur-[170px] rounded-full"
    />

    {/* Grid Overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]
      bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
      bg-[size:60px_60px]"
    />

    {/* Bottom Fade */}
    <div
      className="absolute bottom-0 left-0 w-full h-40
      bg-gradient-to-b from-transparent
      to-white dark:to-[#020010]"
    />

    {/* Content */}
    <div className="relative z-10 w-full max-w-6xl px-6 sm:px-8 text-center">
  

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="font-display font-black
        text-5xl sm:text-7xl lg:text-8xl
        leading-[1]
        tracking-tight
        text-gray-900 dark:text-white
        mb-8"
      >
        Learn Without{' '}
        <span
          className="bg-gradient-to-r
          from-pink-500
          via-purple-500
          to-violet-500
          bg-clip-text text-transparent"
        >
          Limits...
        </span>

        <br />

        <span className="inline-block mt-4 min-h-[90px]">
          <TypeAnimation
            sequence={[
              'Master With Purpose...',
              2000,
              'Learn From Experts...',
              2000,
              'Build Skills That Matter...',
              2000,
              'Shape Your Future...',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="bg-gradient-to-r
            from-pink-500
            via-purple-500
            to-indigo-500
            bg-clip-text text-transparent"
          />
        </span>
      </motion.h1>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link
          href="/register"
          className="group relative
          px-8 py-4
          rounded-full
          overflow-hidden
          font-semibold
          text-white
          bg-gradient-to-r
          from-pink-500
          to-orange-400
          shadow-[0_0_40px_rgba(236,72,153,0.35)]
          hover:scale-105
          transition-all duration-300"
        >
          <span className="relative z-10">
            Start Learning →
          </span>
        </Link>

        <Link
          href="#courses"
          className="px-8 py-4
          rounded-full
          border border-gray-300 dark:border-white/10
          bg-white/40 dark:bg-white/5
          backdrop-blur-xl
          text-gray-800 dark:text-white/90
          hover:bg-white/70 dark:hover:bg-white/10
          transition-all duration-300"
        >
          Browse Courses
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ================= FEATURES SECTION ================= */

const FeaturesSection = () => (
  <section className="py-24 relative">

    {/* Background */}
    <div
      className="absolute inset-0
      bg-gradient-to-b
      from-white
      via-gray-50
      to-gray-100
      dark:from-[#020010]
      dark:via-[#060018]
      dark:to-[#030012]"
    />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2
          className="font-display font-bold
          text-4xl
          text-gray-900 dark:text-white
          mb-4"
        >
          Why Learnify Works
        </h2>

        <p className="text-gray-600 dark:text-white/70 max-w-xl mx-auto">
          Built around the science of structured learning.
          Every feature is intentional.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {[
          {
            icon: '🔒',
            title: 'Linear Locked Paths',
            desc: 'Complete each lesson before unlocking the next for focused learning.',
          },
          {
            icon: '▶️',
            title: 'Resume Anytime',
            desc: 'Continue exactly where you left off with saved progress.',
          },
          {
            icon: '📈',
            title: 'Visual Progress',
            desc: 'Track your progress percentage as you complete lessons.',
          },
          {
            icon: '⚡',
            title: 'Auto-Load Lessons',
            desc: 'Smooth transitions between lessons for uninterrupted learning.',
          },
          {
            icon: '🎯',
            title: 'Structured Curriculum',
            desc: 'Well-organized sections and lessons designed for mastery.',
          },
          {
            icon: '🔐',
            title: 'Secure Platform',
            desc: 'Protected authentication and reliable account security.',
          },
        ].map((feature) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={feature.title}
            className="p-6 rounded-2xl
            backdrop-blur-xl
            bg-white dark:bg-white/5
            border border-gray-200 dark:border-white/10
            hover:border-pink-400/40
            transition-all duration-300"
          >
            <div className="text-3xl mb-4">
              {feature.icon}
            </div>

            <h3
              className="font-display font-bold
              text-gray-900 dark:text-white
              text-lg mb-2"
            >
              {feature.title}
            </h3>

            <p
              className="text-gray-600 dark:text-white/70
              text-sm leading-relaxed"
            >
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ================= HOME PAGE ================= */

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const router = useRouter();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    subjectsAPI.getAll()
      .then((res) => setSubjects(res.data.subjects))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleEnroll = useCallback(async (subjectId) => {

    if (!isAuthenticated) {
      router.push('/login?next=/#courses');
      return;
    }

    setEnrolling(subjectId);

    try {
      await subjectsAPI.enroll(subjectId);

      setSubjects((prev) =>
        prev.map((s) =>
          s.id === subjectId
            ? { ...s, enrolled: true }
            : s
        )
      );

      showToast(
        'Successfully enrolled! 🎉 You can start learning now.'
      );

    } catch (err) {

      const msg =
        err.response?.data?.error ||
        'Enrollment failed.';

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

      {/* COURSES SECTION */}
      <section
        id="courses"
        className="py-24 relative"
      >
        {/* Background */}
        <div
          className="absolute inset-0
          bg-gradient-to-b
          from-gray-100
          via-white
          to-white
          dark:from-[#030012]
          dark:via-[#040016]
          dark:to-[#020010]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-12">
            <h2
              className="font-display font-bold
              text-4xl
              text-gray-900 dark:text-white
              mb-4"
            >
              Explore Courses
            </h2>

            <p className="text-gray-600 dark:text-white/70">
              Handcrafted learning paths for modern skills.
            </p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl
                  animate-pulse
                  bg-white/5"
                />
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