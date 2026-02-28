import { useRef, useEffect, useState, useCallback } from 'react';
import { videosAPI } from '../../lib/api';

const PlayIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export default function VideoPlayer({ video, progress, onComplete, onProgress, nextVideoId }) {
  const videoRef = useRef(null);
  const progressSaveRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(progress?.completed || false);
  const [showCompleteOverlay, setShowCompleteOverlay] = useState(false);
  const [autoplayCountdown, setAutoplayCountdown] = useState(null);

  // Load video and seek to last position
  useEffect(() => {
    if (!videoRef.current || !video) return;

    setIsCompleted(progress?.completed || false);
    setShowCompleteOverlay(false);
    setAutoplayCountdown(null);

    const handleLoaded = () => {
      const seekTo = progress?.last_watched_seconds || 0;
      if (seekTo > 5) {
        videoRef.current.currentTime = seekTo;
      }
    };

    videoRef.current.addEventListener('loadedmetadata', handleLoaded);
    videoRef.current.load();

    return () => {
      videoRef.current?.removeEventListener('loadedmetadata', handleLoaded);
      if (progressSaveRef.current) clearInterval(progressSaveRef.current);
    };
  }, [video?.id]);

  const saveProgress = useCallback(async (completed = false) => {
    if (!videoRef.current || !video) return;
    const currentTime = Math.floor(videoRef.current.currentTime);

    try {
      await videosAPI.updateProgress({
        videoId: video.id,
        lastWatchedSeconds: currentTime,
        completed,
      });
      onProgress && onProgress(video.id, currentTime, completed);
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  }, [video, onProgress]);

  // Periodic progress save every 10 seconds
  useEffect(() => {
    if (!video) return;

    progressSaveRef.current = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        saveProgress(false);
      }
    }, 10000);

    return () => clearInterval(progressSaveRef.current);
  }, [video, saveProgress]);

  const handleVideoEnded = useCallback(async () => {
    await saveProgress(true);
    setIsCompleted(true);
    setShowCompleteOverlay(true);
    onComplete && onComplete(video.id);

    if (nextVideoId) {
      let count = 5;
      setAutoplayCountdown(count);
      const interval = setInterval(() => {
        count--;
        if (count <= 0) {
          clearInterval(interval);
          setAutoplayCountdown(null);
          setShowCompleteOverlay(false);
          onComplete && onComplete(video.id, true); // true = autoplay next
        } else {
          setAutoplayCountdown(count);
        }
      }, 1000);
    }
  }, [saveProgress, onComplete, video, nextVideoId]);

  const handlePause = useCallback(() => {
    saveProgress(false);
  }, [saveProgress]);

  const handleMarkComplete = async () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    await saveProgress(true);
    setIsCompleted(true);
    setShowCompleteOverlay(true);
    onComplete && onComplete(video.id);
  };

  if (!video) {
    return (
      <div className="aspect-video bg-surface-900 rounded-2xl flex items-center justify-center">
        <p className="text-primary-600 dark:text-slate-500">Select a video to start learning</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 transition-colors duration-300">
      {/* Video container */}
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          controls
          onEnded={handleVideoEnded}
          onPause={handlePause}
          preload="metadata"
          key={video.id}
        >
          <source src={video.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Completion overlay */}
        {showCompleteOverlay && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 rounded-2xl animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-cta-500/20 border-2 border-cta-500 flex items-center justify-center">
              <svg className="w-10 h-10 text-cta-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-display font-bold text-xl text-primary-900 dark:text-white">Video Completed!</h3>

            {nextVideoId && autoplayCountdown !== null && (
              <p className="text-primary-200 dark:text-slate-300 text-sm">
                Next video in <span className="text-accent-400 font-bold">{autoplayCountdown}s</span>...
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowCompleteOverlay(false)}
                className="btn-secondary text-sm"
              >
                Stay Here
              </button>
              {nextVideoId && (
                <button
                  onClick={() => {
                    setShowCompleteOverlay(false);
                    setAutoplayCountdown(null);
                    onComplete && onComplete(video.id, true);
                  }}
                  className="btn-primary text-sm flex items-center gap-2"
                >
                  <PlayIcon />
                  Next Video
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Video info */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isCompleted && (
              <span className="badge bg-emerald-500/15 text-cta-500 border border-emerald-500/30">
                <span className="mr-1"><CheckCircleIcon /></span>Completed
              </span>
            )}
          </div>
          <h2 className="font-display font-bold text-xl text-primary-900 dark:text-white leading-snug">{video.title}</h2>
          {video.description && (
            <p className="text-primary-700 dark:text-slate-400 text-sm mt-2 leading-relaxed">{video.description}</p>
          )}
        </div>

        {!isCompleted && (
          <button
            onClick={handleMarkComplete}
            className="btn-secondary text-sm flex-shrink-0 flex items-center gap-2"
          >
            <CheckCircleIcon />
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
}