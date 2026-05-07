const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/subjectController');
const { authenticate, authorize, ROLES } = require('../middleware/auth');

// Optional auth - public can view subjects
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const jwt = require('jsonwebtoken');
    try {
      req.user = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    } catch (_) {}
  }
  next();
};

router.get('/', optionalAuth, getAllSubjects);
router.get('/enrolled', authenticate, authorize(ROLES.STUDENT), getEnrolledSubjects);
router.post('/enroll', authenticate, authorize(ROLES.STUDENT), enroll);

router.get('/instructor/dashboard', authenticate, authorize(ROLES.INSTRUCTOR), getInstructorDashboard);
router.post('/', authenticate, authorize(ROLES.INSTRUCTOR), createSubject);

// Register fixed nested routes before /:subjectId routes so Express does not
// accidentally treat "sections" or "videos" as a course id.
router.put('/sections/:sectionId', authenticate, authorize(ROLES.INSTRUCTOR), updateSection);
router.delete('/sections/:sectionId', authenticate, authorize(ROLES.INSTRUCTOR), deleteSection);
router.post('/sections/:sectionId/videos', authenticate, authorize(ROLES.INSTRUCTOR), createVideo);
router.put('/videos/:videoId', authenticate, authorize(ROLES.INSTRUCTOR), updateVideo);
router.delete('/videos/:videoId', authenticate, authorize(ROLES.INSTRUCTOR), deleteVideo);

router.get('/:subjectId/students', authenticate, authorize(ROLES.INSTRUCTOR), getEnrolledStudents);
router.post('/:subjectId/sections', authenticate, authorize(ROLES.INSTRUCTOR), createSection);
router.get('/:subjectId/sections', authenticate, getSections);
router.put('/:subjectId', authenticate, authorize(ROLES.INSTRUCTOR), updateSubject);
router.delete('/:subjectId', authenticate, authorize(ROLES.INSTRUCTOR), deleteSubject);

module.exports = router;