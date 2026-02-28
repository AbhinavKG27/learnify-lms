const SubjectModel = require('../models/SubjectModel');
const EnrollmentModel = require('../models/EnrollmentModel');
const SectionModel = require('../models/SectionModel');
const VideoModel = require('../models/VideoModel');
const ProgressModel = require('../models/ProgressModel');

const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await SubjectModel.findAll();
    
    // If user is authenticated, mark which are enrolled
    if (req.user) {
      const enrollments = await EnrollmentModel.findAllByUser(req.user.id);
      const enrolledIds = new Set(enrollments.map(e => e.subject_id));
      const result = subjects.map(s => ({ ...s, enrolled: enrolledIds.has(s.id) }));
      return res.json({ subjects: result });
    }

    res.json({ subjects });
  } catch (err) {
    next(err);
  }
};

const getEnrolledSubjects = async (req, res, next) => {
  try {
    const subjects = await SubjectModel.findWithProgress(req.user.id);
    res.json({ subjects });
  } catch (err) {
    next(err);
  }
};

const enroll = async (req, res, next) => {
  try {
    const { subjectId } = req.body;
    if (!subjectId) return res.status(400).json({ error: 'subjectId is required' });

    const subject = await SubjectModel.findById(subjectId);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    const existing = await EnrollmentModel.findByUserAndSubject(req.user.id, subjectId);
    if (existing) return res.status(409).json({ error: 'Already enrolled' });

    const enrollment = await EnrollmentModel.create(req.user.id, subjectId);
    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (err) {
    next(err);
  }
};

const getSections = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const subject = await SubjectModel.findById(subjectId);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    // Check enrollment if authenticated
    if (req.user) {
      const enrollment = await EnrollmentModel.findByUserAndSubject(req.user.id, subjectId);
      if (!enrollment) return res.status(403).json({ error: 'Not enrolled in this subject' });
    }

    const sections = await SectionModel.findBySubjectId(subjectId);
    
    // For each section, get videos with progress
    const sectionsWithVideos = await Promise.all(
      sections.map(async (section) => {
        const videos = await VideoModel.findBySectionId(section.id);
        
        const videosWithProgress = await Promise.all(
          videos.map(async (video, idx) => {
            let progress = null;
            let unlocked = false;

            if (req.user) {
              progress = await ProgressModel.findByUserAndVideo(req.user.id, video.id);
              unlocked = await ProgressModel.isPreviousCompleted(req.user.id, video.id);
            }

            return {
              ...video,
              progress: progress || { last_watched_seconds: 0, completed: false },
              unlocked,
            };
          })
        );

        return { ...section, videos: videosWithProgress };
      })
    );

    res.json({ subject, sections: sectionsWithVideos });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllSubjects, getEnrolledSubjects, enroll, getSections };
