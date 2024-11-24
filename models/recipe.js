// models/recipe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');  // User model to be associated with Recipe

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

// Association: Recipe belongs to User
Recipe.belongsTo(User, { foreignKey: 'userId' });

module.exports = Recipe;
