const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const favoriteController = require('../controllers/favoriteController');

router.post('/favorites', authMiddleware, favoriteController.addFavorite);
router.get('/favorites', authMiddleware, favoriteController.getFavorites);
module.exports = router;