const express = require('express');
const router = express.Router();
const { getAllSubjects, getEnrolledSubjects, enroll, getSections } = require('../controllers/subjectController');
const { authenticate } = require('../middleware/auth');

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
router.get('/enrolled', authenticate, getEnrolledSubjects);
router.post('/enroll', authenticate, enroll);
router.get('/:subjectId/sections', authenticate, getSections);

module.exports = router;
