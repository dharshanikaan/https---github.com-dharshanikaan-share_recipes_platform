// controllers/favoriteController.js
const User = require('../models/user');
const Recipe = require('../models/recipe');
const Favorite = require('../models/favorite');

// Add recipe to favorites
exports.addFavorite = async (req, res) => {
    const { recipeId } = req.body;

    try {
        const recipe = await Recipe.findByPk(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        await req.user.addRecipe(recipe);  // Add to favorites
        res.json({ message: 'Recipe added to favorites' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all user's favorite recipes
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [{ model: Recipe, through: { attributes: [] }, as: 'recipes' }]
        });
        res.json(user.recipes);  // Returning user's favorite recipes
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
