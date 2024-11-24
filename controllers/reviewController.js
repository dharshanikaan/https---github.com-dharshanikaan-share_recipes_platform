const { Review, Recipe, User } = require('../models');

exports.createReview = async (req, res) => {
    const { rating, comment } = req.body;
    const { id } = req.params;  // Recipe ID passed as a parameter

    try {
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const review = await Review.create({
            rating,
            comment,
            user_id: req.userId,  // Assuming the user is authenticated
            recipe_id: id
        });

        res.status(201).json({ message: 'Review created successfully', review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
