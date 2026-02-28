const express = require('express');
const router = express.Router();
const { getVideo, updateProgress, getNextVideo, getCourseProgress } = require('../controllers/videoController');
const { authenticate } = require('../middleware/auth');

// ⚠️ CRITICAL: Specific string routes MUST be registered BEFORE wildcard /:param routes
// Otherwise Express matches 'next' and 'course-progress' as a :videoId param
router.get('/next', authenticate, getNextVideo);
router.post('/progress', authenticate, updateProgress);
router.get('/course-progress/:subjectId', authenticate, getCourseProgress);

// Wildcard param route goes LAST
router.get('/:videoId', authenticate, getVideo);

module.exports = router;