const User = require('../models/user');
const Recipe = require('../models/recipe');
const Review = require('../models/review');
// Create a new recipe
exports.createRecipe = async (req, res) => {
    const { title, ingredients, instructions, cooking_time, servings, image_url } = req.body;

    try {
        const newRecipe = await Recipe.create({
            user_id: req.userId,
            title,
            ingredients,
            instructions,
            cooking_time,
            servings,
            image_url: image_url || null,
        });
        res.status(201).json({ message: 'Recipe created', recipeId: newRecipe.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an existing recipe
exports.updateRecipe = async (req, res) => {
    const { title, ingredients, instructions, cooking_time, servings, image_url } = req.body;

    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (!recipe || recipe.user_id !== req.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await recipe.update({
            title,
            ingredients,
            instructions,
            cooking_time,
            servings,
            image_url: image_url || recipe.image_url,
        });
        res.json({ message: 'Recipe updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (!recipe || recipe.user_id !== req.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await recipe.destroy();
        res.json({ message: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            include: [{ model: User, as: 'user' }]
        });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single recipe
exports.getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id, {
            include: [{ model: Review, include: User }],
        });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
