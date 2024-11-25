const User = require('../models/user');
const Recipe = require('../models/recipe');
const Review = require('../models/review');

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            include: [{
                model: User,
                as: 'user',  // Explicitly set the alias for the association
                attributes: ['id', 'username', 'email']  // Optionally specify which fields to include
            }],
        });

        if (!recipes || recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found' });
        }

        res.json(recipes);
    } catch (err) {
        console.error('Error fetching recipes:', err);  // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createRecipe = async (req, res) => {
    const { title, ingredients, instructions, cooking_time, servings, image_url } = req.body;

    // Basic validation for required fields
    if (!title || !ingredients || !instructions || !cooking_time || !servings) {
        return res.status(400).json({ message: 'Missing required fields: title, ingredients, instructions, cooking_time, servings' });
    }

    try {
        const newRecipe = await Recipe.create({
            user_id: req.userId,  // User ID from the auth middleware
            title,
            ingredients,
            instructions,
            cooking_time,
            servings,
            image_url: image_url || null,  // Optional field
        });

        res.status(201).json({ message: 'Recipe created successfully', recipeId: newRecipe.id });
    } catch (err) {
        console.error('Error creating recipe:', err);  // Log the error for debugging
        res.status(500).json({ message: 'Failed to create recipe' });
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
        res.json({ message: 'Recipe updated successfully' });
    } catch (err) {
        console.error('Error updating recipe:', err);  // Log the error for debugging
        res.status(500).json({ message: 'Failed to update recipe' });
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
        res.json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        console.error('Error deleting recipe:', err);  // Log the error for debugging
        res.status(500).json({ message: 'Failed to delete recipe' });
    }
};

// Get a single recipe with reviews
exports.getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id, {
            include: [
                {
                    model: Review,
                    include: [{ model: User, as: 'user' }]  // Explicitly set the alias for User in Review
                },
                {
                    model: User,
                    as: 'user',  // Explicitly set the alias for User in Recipe
                    attributes: ['id', 'username', 'email']
                }
            ],
        });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (err) {
        console.error('Error fetching recipe:', err);  // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
