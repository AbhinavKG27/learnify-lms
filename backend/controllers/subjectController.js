const SubjectModel = require('../models/SubjectModel');
const EnrollmentModel = require('../models/EnrollmentModel');
const SectionModel = require('../models/SectionModel');
const VideoModel = require('../models/VideoModel');
const ProgressModel = require('../models/ProgressModel');
const { ROLES } = require('../middleware/auth');

const isOwner = (subject, user) => subject?.instructor_id && Number(subject.instructor_id) === Number(user?.id);

const requireCourseOwner = async (subjectId, user, res) => {
  const subject = await SubjectModel.findById(subjectId);
  if (!subject) {
    res.status(404).json({ error: 'Subject not found' });
    return null;
  }
  if (!isOwner(subject, user)) {
    res.status(403).json({ error: 'Only the instructor who owns this course can manage it' });
    return null;
  }
  return subject;
};

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

    if (req.user.role !== ROLES.STUDENT) {
      return res.status(403).json({ error: 'Only students can enroll in courses' });
    }

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

    const instructorOwner = req.user?.role === ROLES.INSTRUCTOR && isOwner(subject, req.user);

    // Students must be enrolled; the course owner can preview/manage their content.
    if (req.user && !instructorOwner) {
      const enrollment = await EnrollmentModel.findByUserAndSubject(req.user.id, subjectId);
      if (!enrollment) return res.status(403).json({ error: 'Not enrolled in this subject' });
    }

    const sections = await SectionModel.findBySubjectId(subjectId);
    
    // For each section, get videos with progress
    const sectionsWithVideos = await Promise.all(
      sections.map(async (section) => {
        const videos = await VideoModel.findBySectionId(section.id);
        
        const videosWithProgress = await Promise.all(
          videos.map(async (video) => {
            let progress = null;
            let unlocked = instructorOwner;

            if (req.user && !instructorOwner) {
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

const getInstructorDashboard = async (req, res, next) => {
  try {
    const subjects = await SubjectModel.findByInstructor(req.user.id);
    const totals = subjects.reduce((acc, subject) => ({
      courses: acc.courses + 1,
      lessons: acc.lessons + Number(subject.video_count || 0),
      students: acc.students + Number(subject.enrollment_count || 0),
      completions: acc.completions + Number(subject.completed_videos || 0),
    }), { courses: 0, lessons: 0, students: 0, completions: 0 });

    res.json({ subjects, analytics: totals });
  } catch (err) {
    next(err);
  }
};

const createSubject = async (req, res, next) => {
  try {
    const { name, description, thumbnailUrl } = req.body;
    if (!name) return res.status(400).json({ error: 'Course name is required' });

    const subject = await SubjectModel.create({
      name,
      description,
      thumbnailUrl,
      instructorId: req.user.id,
    });

    res.status(201).json({ message: 'Course created', subject });
  } catch (err) {
    next(err);
  }
};

const updateSubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const { name, description, thumbnailUrl } = req.body;
    if (!name) return res.status(400).json({ error: 'Course name is required' });

    const subject = await requireCourseOwner(subjectId, req.user, res);
    if (!subject) return;

    const updated = await SubjectModel.update(subjectId, { name, description, thumbnailUrl });
    res.json({ message: 'Course updated', subject: updated });
  } catch (err) {
    next(err);
  }
};

const deleteSubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const subject = await requireCourseOwner(subjectId, req.user, res);
    if (!subject) return;

    await SubjectModel.delete(subjectId);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};

const createSection = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const { title, orderIndex } = req.body;
    if (!title) return res.status(400).json({ error: 'Module title is required' });

    const subject = await requireCourseOwner(subjectId, req.user, res);
    if (!subject) return;

    const existingSections = await SectionModel.findBySubjectId(subjectId);
    const section = await SectionModel.create({
      subjectId,
      title,
      orderIndex: orderIndex || existingSections.length + 1,
    });

    res.status(201).json({ message: 'Module added', section });
  } catch (err) {
    next(err);
  }
};

const updateSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const { title, orderIndex } = req.body;
    if (!title) return res.status(400).json({ error: 'Module title is required' });

    const section = await SectionModel.findById(sectionId);
    if (!section) return res.status(404).json({ error: 'Module not found' });

    const subject = await requireCourseOwner(section.subject_id, req.user, res);
    if (!subject) return;

    const updated = await SectionModel.update(sectionId, { title, orderIndex: orderIndex || section.order_index });
    res.json({ message: 'Module updated', section: updated });
  } catch (err) {
    next(err);
  }
};

const deleteSection = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const section = await SectionModel.findById(sectionId);
    if (!section) return res.status(404).json({ error: 'Module not found' });

    const subject = await requireCourseOwner(section.subject_id, req.user, res);
    if (!subject) return;

    await SectionModel.delete(sectionId);
    res.json({ message: 'Module deleted' });
  } catch (err) {
    next(err);
  }
};

const createVideo = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const { title, description, videoUrl, durationSeconds, orderIndex } = req.body;
    if (!title || !videoUrl) return res.status(400).json({ error: 'Lesson title and video URL are required' });

    const section = await SectionModel.findById(sectionId);
    if (!section) return res.status(404).json({ error: 'Module not found' });

    const subject = await requireCourseOwner(section.subject_id, req.user, res);
    if (!subject) return;

    const existingVideos = await VideoModel.findBySectionId(sectionId);
    const video = await VideoModel.create({
      sectionId,
      title,
      description,
      videoUrl,
      durationSeconds,
      orderIndex: orderIndex || existingVideos.length + 1,
    });

    res.status(201).json({ message: 'Lesson added', video });
  } catch (err) {
    next(err);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { title, description, videoUrl, durationSeconds, orderIndex } = req.body;
    if (!title || !videoUrl) return res.status(400).json({ error: 'Lesson title and video URL are required' });

    const video = await VideoModel.findById(videoId);
    if (!video) return res.status(404).json({ error: 'Lesson not found' });

    const section = await SectionModel.findById(video.section_id);
    const subject = await requireCourseOwner(section.subject_id, req.user, res);
    if (!subject) return;

    const updated = await VideoModel.update(videoId, {
      title,
      description,
      videoUrl,
      durationSeconds,
      orderIndex: orderIndex || video.order_index,
    });
    res.json({ message: 'Lesson updated', video: updated });
  } catch (err) {
    next(err);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const video = await VideoModel.findById(videoId);
    if (!video) return res.status(404).json({ error: 'Lesson not found' });

    const section = await SectionModel.findById(video.section_id);
    const subject = await requireCourseOwner(section.subject_id, req.user, res);
    if (!subject) return;

    await VideoModel.delete(videoId);
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    next(err);
  }
};

const getEnrolledStudents = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const subject = await requireCourseOwner(subjectId, req.user, res);
    if (!subject) return;

    const students = await SubjectModel.getEnrolledStudents(subjectId);
    res.json({ students });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSubjects,
  getEnrolledSubjects,
  enroll,
  getSections,
  getInstructorDashboard,
  createSubject,
  updateSubject,
  deleteSubject,
  createSection,
  updateSection,
  deleteSection,
  createVideo,
  updateVideo,
  deleteVideo,
  getEnrolledStudents,
};