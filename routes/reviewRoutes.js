const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');

// Route for creating a review for a recipe
router.post('/:id/reviews', authMiddleware, reviewController.createReview);

module.exports = router;
