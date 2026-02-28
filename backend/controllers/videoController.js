const VideoModel = require('../models/VideoModel');
const ProgressModel = require('../models/ProgressModel');
const EnrollmentModel = require('../models/EnrollmentModel');
const SectionModel = require('../models/SectionModel');

const getVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const video = await VideoModel.findById(videoId);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const section = await SectionModel.findById(video.section_id);
    
    // Verify enrollment
    const enrollment = await EnrollmentModel.findByUserAndSubject(req.user.id, section.subject_id);
    if (!enrollment) return res.status(403).json({ error: 'Not enrolled in this subject' });

    // Check if video is unlocked (linear enforcement)
    const unlocked = await ProgressModel.isPreviousCompleted(req.user.id, videoId);
    if (!unlocked) {
      return res.status(403).json({ error: 'Complete previous videos first', code: 'VIDEO_LOCKED' });
    }

    // Get progress
    const progress = await ProgressModel.findByUserAndVideo(req.user.id, videoId);
    const nextVideo = await VideoModel.findNextVideo(videoId);

    res.json({
      video,
      section,
      progress: progress || { last_watched_seconds: 0, completed: false },
      nextVideoId: nextVideo?.id || null,
    });
  } catch (err) {
    next(err);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const { videoId, lastWatchedSeconds, completed } = req.body;

    if (!videoId) return res.status(400).json({ error: 'videoId is required' });

    const video = await VideoModel.findById(videoId);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    const section = await SectionModel.findById(video.section_id);
    const enrollment = await EnrollmentModel.findByUserAndSubject(req.user.id, section.subject_id);
    if (!enrollment) return res.status(403).json({ error: 'Not enrolled' });

    // Don't overwrite completed status back to false
    const existing = await ProgressModel.findByUserAndVideo(req.user.id, videoId);
    const isCompleted = completed || existing?.completed || false;

    await ProgressModel.upsert({
      userId: req.user.id,
      videoId,
      lastWatchedSeconds: lastWatchedSeconds || 0,
      completed: isCompleted,
    });

    let nextVideoId = null;
    if (isCompleted) {
      const nextVideo = await VideoModel.findNextVideo(videoId);
      nextVideoId = nextVideo?.id || null;
    }

    res.json({
      message: 'Progress updated',
      completed: isCompleted,
      nextVideoId,
    });
  } catch (err) {
    next(err);
  }
};

const getNextVideo = async (req, res, next) => {
  try {
    const { videoId } = req.query;
    if (!videoId) return res.status(400).json({ error: 'videoId is required' });

    const nextVideo = await VideoModel.findNextVideo(videoId);
    if (!nextVideo) return res.json({ nextVideo: null, message: 'Course completed!' });

    const progress = await ProgressModel.findByUserAndVideo(req.user.id, nextVideo.id);
    res.json({
      nextVideo: {
        ...nextVideo,
        progress: progress || { last_watched_seconds: 0, completed: false },
      },
    });
  } catch (err) {
    next(err);
  }
};

const getCourseProgress = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const enrollment = await EnrollmentModel.findByUserAndSubject(req.user.id, subjectId);
    if (!enrollment) return res.status(403).json({ error: 'Not enrolled' });

    const [progressList, allVideos, lastWatched] = await Promise.all([
      ProgressModel.findAllByUserAndSubject(req.user.id, subjectId),
      VideoModel.findAllBySubjectId(subjectId),
      ProgressModel.findLastWatched(req.user.id, subjectId),
    ]);

    const totalVideos = allVideos.length;
    const completedVideos = progressList.filter(p => p.completed).length;
    const percentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

    res.json({
      progress: progressList,
      completedVideos,
      lastWatchedVideo: lastWatched,
      totalVideos,
      percentage,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getVideo, updateProgress, getNextVideo, getCourseProgress };