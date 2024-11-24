const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');
const Review = require('./review');

const Recipe = sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cooking_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

// Relationships
Recipe.belongsTo(User, { foreignKey: 'user_id' });
Recipe.hasMany(Review, { foreignKey: 'recipe_id' });
User.hasMany(Recipe, { foreignKey: 'user_id' });

module.exports = Recipe;

