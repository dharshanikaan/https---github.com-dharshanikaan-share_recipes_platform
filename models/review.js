const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');
const Recipe = require('./recipe');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
});

// Relationships
Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Recipe, { foreignKey: 'recipe_id' });

module.exports = Review;
