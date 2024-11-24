const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const followController = require('../controllers/followController');



// Follow routes
router.post('/follow/:userId', authMiddleware, followController.followUser);
router.get('/following/activity', authMiddleware, followController.getFollowingActivity);
module.exports = router;