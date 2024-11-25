const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');  // Import the authentication middleware
const recipeController = require('../controllers/recipeController');

// Public Routes (No authentication required)
router.get('/recipes', recipeController.getAllRecipes);  // Accessible to all users
router.get('/recipes/:id', recipeController.getRecipe);  // Accessible to all users

// Protected Routes (Authentication required)
router.post('/recipes', authMiddleware, recipeController.createRecipe);  // Only accessible after login
router.put('/recipes/:id', authMiddleware, recipeController.updateRecipe);  // Only accessible after login
router.delete('/recipes/:id', authMiddleware, recipeController.deleteRecipe);  // Only accessible after login

module.exports = router;
