const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const recipeController = require('../controllers/recipeController');

router.post('/recipes', authMiddleware, recipeController.createRecipe);
router.put('/recipes/:id', authMiddleware, recipeController.updateRecipe);
router.delete('/recipes/:id', authMiddleware, recipeController.deleteRecipe);
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipe);
module.exports = router;
