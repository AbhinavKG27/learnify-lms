import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/layout/Navbar';
import CourseSidebar from '../../components/course/CourseSidebar';
import VideoPlayer from '../../components/video/VideoPlayer';
import { PageLoader } from '../../components/ui/Spinner';
import { subjectsAPI, videosAPI } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function CoursePage() {
  const router = useRouter();
  const { id: subjectId } = router.query;
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [subject, setSubject] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeVideoId, setActiveVideoId] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(null);
  const [nextVideoId, setNextVideoId] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace(`/login?next=/course/${subjectId}`);
    }
  }, [authLoading, isAuthenticated, subjectId]);

  useEffect(() => {
    if (!subjectId || !isAuthenticated) return;

    const fetchCourse = async () => {
      setLoading(true);
      setError('');
      console.log('[CoursePage] Fetching course data for subjectId:', subjectId);

      try {
        const [sectionsRes, progressRes] = await Promise.all([
          subjectsAPI.getSections(subjectId),
          videosAPI.getCourseProgress(subjectId),
        ]);

        const fetchedSections = sectionsRes.data.sections || [];
        const fetchedSubject = sectionsRes.data.subject;

        console.log('[CoursePage] Subject:', fetchedSubject?.name);
        console.log('[CoursePage] Sections:', fetchedSections.length);
        console.log('[CoursePage] Progress %:', progressRes.data.percentage);

        setSubject(fetchedSubject);
        setSections(fetchedSections);
        setProgressPercent(progressRes.data.percentage || 0);

        // ── Check if course is empty ──────────────────────────────────────
        const hasVideos = fetchedSections.some(s => s.videos && s.videos.length > 0);

        // If navigated here with ?empty=1 OR genuinely has no videos
        if (!hasVideos || router.query.empty === '1') {
          console.warn('[CoursePage] Course has no videos — showing coming soon UI');
          setLoading(false);
          return; // Don't try to load a video
        }

        // ── Determine which video to load first ──────────────────────────
        const lastVideo = progressRes.data.lastWatchedVideo;
        // Find first video from first section with content, sorted by order_index
        const firstSection = fetchedSections.find(s => s.videos && s.videos.length > 0);
        const firstVideo = firstSection
          ? [...firstSection.videos].sort((a, b) => a.order_index - b.order_index)[0]
          : null;

        const startVideo = lastVideo || firstVideo;
        console.log('[CoursePage] Starting with video:', startVideo?.id, startVideo?.title || startVideo?.video_id);

        if (startVideo) {
          // Use video_id if it's from lastWatchedVideo shape, else id
          const videoId = startVideo.video_id || startVideo.id;
          await loadVideo(videoId);
        }
      } catch (err) {
        const msg = err.response?.data?.error || 'Failed to load course';
        console.error('[CoursePage] Fetch error:', msg, err.response?.status);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId, isAuthenticated]);

  const loadVideo = useCallback(async (videoId) => {
    if (!videoId) {
      console.warn('[CoursePage] loadVideo called with empty videoId — skipping');
      return;
    }
    console.log('[CoursePage] Loading video id:', videoId);
    setVideoLoading(true);
    try {
      const res = await videosAPI.getVideo(videoId);
      console.log('[CoursePage] Video loaded:', res.data.video?.title);
      setCurrentVideo(res.data.video);
      setCurrentProgress(res.data.progress);
      setNextVideoId(res.data.nextVideoId);
      setActiveVideoId(videoId);
    } catch (err) {
      if (err.response?.data?.code === 'VIDEO_LOCKED') {
        console.warn('[CoursePage] Video is locked:', videoId);
        alert('Complete previous videos first to unlock this one!');
      } else {
        console.error('[CoursePage] Failed to load video:', err?.response?.data || err.message);
      }
    } finally {
      setVideoLoading(false);
    }
  }, []);

  const handleVideoSelect = useCallback((videoId) => {
    loadVideo(videoId);
  }, [loadVideo]);

  const handleVideoComplete = useCallback(async (videoId, autoNext = false) => {
    // Update sections state to mark video as completed
    setSections(prev =>
      prev.map(sec => ({
        ...sec,
        videos: sec.videos?.map(v => {
          if (v.id === videoId) return { ...v, progress: { ...v.progress, completed: true } };
          // Unlock next video
          return v;
        }),
      }))
    );

    // Refresh course progress
    try {
      const progressRes = await videosAPI.getCourseProgress(subjectId);
      setProgressPercent(progressRes.data.percentage || 0);
    } catch (_) {}

    // Refresh sections to update unlock states
    try {
      const sectionsRes = await subjectsAPI.getSections(subjectId);
      setSections(sectionsRes.data.sections);
    } catch (_) {}

    if (autoNext && nextVideoId) {
      loadVideo(nextVideoId);
    }
  }, [subjectId, nextVideoId, loadVideo]);

  const handleProgressUpdate = useCallback((videoId, seconds, completed) => {
    setSections(prev =>
      prev.map(sec => ({
        ...sec,
        videos: sec.videos?.map(v =>
          v.id === videoId
            ? { ...v, progress: { ...v.progress, last_watched_seconds: seconds, completed } }
            : v
        ),
      }))
    );
  }, []);

  if (authLoading || loading) {
    return (
      <>
        <Head><title>Course — Learnify</title></Head>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="pt-16 flex-1"><PageLoader /></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head><title>Error — Learnify</title></Head>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="pt-16 flex-1 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="font-display font-bold text-2xl text-white mb-2">
                {error.includes('enrolled') ? 'Not Enrolled' : 'Something went wrong'}
              </h2>
              <p className="text-slate-400 mb-6">{error}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => router.back()} className="btn-secondary">Go Back</button>
                <button onClick={() => router.push('/dashboard')} className="btn-primary">Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Empty course fallback — no crash, no 404 ─────────────────────────────
  const hasVideos = sections.some(s => s.videos && s.videos.length > 0);
  if (!hasVideos) {
    return (
      <>
        <Head><title>{subject?.name || 'Course'} — Learnify</title></Head>
        <div className="min-h-screen flex flex-col bg-surface-950">
          <Navbar />
          <div className="pt-16 flex-1 flex items-center justify-center">
            <div className="text-center max-w-lg mx-auto px-4">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="font-display font-bold text-3xl text-white mb-3">
                {subject?.name}
              </h2>
              <p className="text-slate-400 mb-2 text-lg">This course content is coming soon.</p>
              <p className="text-slate-500 text-sm mb-8">
                You&apos;re enrolled! We&apos;ll notify you as soon as lessons are available.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => router.push('/dashboard')} className="btn-primary">
                  Back to Dashboard
                </button>
                <button onClick={() => router.push('/#courses')} className="btn-secondary">
                  Browse Other Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>{subject?.name || 'Course'} — Learnify</title></Head>
      <div className="min-h-screen flex flex-col bg-surface-950">
        <Navbar />

        <div className="flex flex-1 pt-16 overflow-hidden h-[calc(100vh-64px)]">
          {/* Sidebar */}
          <div className={`flex-shrink-0 transition-all duration-300 border-r border-slate-800/60 bg-surface-900 overflow-hidden ${sidebarOpen ? 'w-80' : 'w-0'}`}>
            {sidebarOpen && (
              <div className="h-full overflow-hidden">
                <CourseSidebar
                  subject={subject}
                  sections={sections}
                  activeVideoId={activeVideoId}
                  onVideoSelect={handleVideoSelect}
                  progressPercent={progressPercent}
                />
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            {/* Top bar */}
            <div className="flex items-center gap-3 px-6 py-3.5 border-b border-slate-800/60 bg-surface-950/90 sticky top-0 z-10 backdrop-blur-sm">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="btn-ghost p-2 -ml-1"
                title="Toggle sidebar"
              >
                {sidebarOpen ? <XIcon /> : <MenuIcon />}
              </button>

              <div className="h-5 w-px bg-slate-800" />

              <div className="flex items-center gap-2 text-sm text-slate-400 min-w-0">
                <button onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors flex-shrink-0">
                  Dashboard
                </button>
                <span>/</span>
                <span className="text-slate-300 truncate">{subject?.name}</span>
                {currentVideo && (
                  <>
                    <span>/</span>
                    <span className="text-white truncate">{currentVideo.title}</span>
                  </>
                )}
              </div>
            </div>

            {/* Video area */}
            <div className="p-6 max-w-5xl mx-auto">
              {videoLoading ? (
                <div>
                  <div className="aspect-video bg-surface-900 rounded-2xl animate-pulse mb-4" />
                  <div className="h-6 bg-surface-800 rounded w-1/2 mb-2 animate-pulse" />
                  <div className="h-4 bg-surface-800 rounded w-3/4 animate-pulse" />
                </div>
              ) : (
                <VideoPlayer
                  video={currentVideo}
                  progress={currentProgress}
                  nextVideoId={nextVideoId}
                  onComplete={handleVideoComplete}
                  onProgress={handleProgressUpdate}
                />
              )}

              {/* Next video hint */}
              {!videoLoading && nextVideoId && (
                <div className="mt-6 p-4 card flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Up Next</p>
                    <p className="text-sm text-slate-300 font-medium">Continue your learning path</p>
                  </div>
                  <button
                    onClick={() => loadVideo(nextVideoId)}
                    className="btn-secondary text-sm flex-shrink-0 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Next Video
                  </button>
                </div>
              )}

              {/* Course complete */}
              {!videoLoading && !nextVideoId && currentVideo && progressPercent === 100 && (
                <div className="mt-6 p-6 card text-center glow-brand relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-emerald-600/10" />
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">🎉</div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">Course Complete!</h3>
                    <p className="text-slate-400 text-sm">Congratulations! You've mastered the entire course.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}