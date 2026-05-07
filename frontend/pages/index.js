import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

import {
  Lock,
  PlayCircle,
  BarChart3,
  Zap,
  Target,
  ShieldCheck,
} from 'lucide-react';

import Layout from '../components/layout/Layout';
import CourseCard from '../components/course/CourseCard';
import Toast from '../components/ui/Toast';

import { subjectsAPI } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

/* ================= HERO SECTION ================= */

const HeroSection = () => (
  <section className="relative overflow-hidden bg-[#060816]">

    {/* Background Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

    {/* Glow Orbs */}
    <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" />

    <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />

    <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl" />

    {/* Noise Overlay */}
    <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />

    {/* Content */}
    <div
      className="
      relative z-10
      mx-auto
      flex
      min-h-screen
      max-w-7xl
      flex-col
      items-center
      justify-center
      px-6
      pt-20
      pb-24
      text-center
      "
    >

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="
        font-black
        tracking-tight
        leading-[0.9]
        text-white
        text-5xl
        sm:text-7xl
        lg:text-[7rem]
        max-w-6xl
        "
      >
        <span className="block text-white/80">
          The Future of
        </span>

        <span className="bg-gradient-to-r from-pink-500 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          Learning Starts Here
        </span>
      </motion.h1>

      {/* Animated Typing */}
      <div className="mt-10 h-[120px] flex items-center justify-center">
        <TypeAnimation
          sequence={[
            'Master Skills That Matter',
            2000,
            'Learn From Industry Experts',
            2000,
            'Build Your Future Faster',
            2000,
            'Upgrade Your Career',
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="
          text-xl
          sm:text-3xl
          lg:text-4xl
          font-semibold
          text-white/80
          "
        />
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="
        mt-6
        max-w-2xl
        text-lg
        leading-relaxed
        text-white/60
        "
      >
        Structured learning paths, immersive lessons,
        real progress tracking, and a premium learning
        experience designed for ambitious learners.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="
        mt-12
        flex
        flex-col
        sm:flex-row
        gap-4
        "
      >

        <Link
          href="/register"
          className="
          relative
          overflow-hidden
          rounded-2xl
          bg-gradient-to-r
          from-pink-500
          via-violet-500
          to-cyan-500
          px-10
          py-4
          font-semibold
          text-white
          shadow-2xl
          shadow-pink-500/20
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-pink-500/40
          "
        >
          Start Learning →
        </Link>

        <Link
          href="#courses"
          className="
          rounded-2xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          px-10
          py-4
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-white/10
          hover:scale-105
          "
        >
          Browse Courses
        </Link>

      </motion.div>

    </div>
  </section>
);

/* ================= FEATURES SECTION ================= */

const features = [
  {
    icon: <Lock size={28} />,
    title: 'Linear Locked Paths',
    desc: 'Complete lessons step-by-step with guided progression.',
  },
  {
    icon: <PlayCircle size={28} />,
    title: 'Resume Anytime',
    desc: 'Continue exactly where you left off instantly.',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Progress Tracking',
    desc: 'Visual analytics and completion insights.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Fast Learning Flow',
    desc: 'Smooth transitions and optimized experience.',
  },
  {
    icon: <Target size={28} />,
    title: 'Focused Curriculum',
    desc: 'Structured learning designed for mastery.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Secure Platform',
    desc: 'Protected authentication and secure data.',
  },
];

const FeaturesSection = () => (
  <section className="relative py-32 bg-[#060816]">

    <div className="max-w-7xl mx-auto px-6">

      {/* Heading */}
      <div className="text-center mb-20">

        <h2
          className="
          text-5xl
          md:text-6xl
          font-black
          text-white
          "
        >
          Why Learnify Wins
        </h2>

        <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
          Designed to deliver a premium and focused
          learning experience for modern learners.
        </p>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-8
            transition-all
            duration-500
            hover:border-pink-500/30
            hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]
            "
          >

            {/* Hover Gradient */}
            <div
              className="
              absolute
              inset-0
              opacity-0
              transition
              duration-500
              group-hover:opacity-100
              bg-gradient-to-br
              from-pink-500/10
              to-cyan-500/10
              "
            />

            <div className="relative z-10">

              <div
                className="
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-pink-500/20
                to-cyan-500/20
                text-cyan-300
                mb-6
                "
              >
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>

              <p className="text-white/60 leading-relaxed">
                {feature.desc}
              </p>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  </section>
);

/* ================= STATS SECTION ================= */

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
        'Successfully enrolled! 🎉'
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
    <Layout title="Learnify">

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
        className="py-32 bg-[#060816]"
      >

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-16">

            <h2
              className="
              text-5xl
              md:text-6xl
              font-black
              text-white
              mb-6
              "
            >
              Explore Courses
            </h2>

            <p className="text-white/60 text-lg">
              Handcrafted learning paths for modern skills.
            </p>

          </div>

          {/* Loading */}
          {loading ? (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="
                  h-80
                  rounded-3xl
                  animate-pulse
                  border
                  border-white/10
                  bg-white/[0.03]
                  "
                />
              ))}

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

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