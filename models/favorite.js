const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');
const Recipe = require('./recipe');

const Favorite = sequelize.define('Favorite', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Recipe,
            key: 'id',
        },
    },
});

// Define associations
User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'userId' });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: 'recipeId' });

module.exports = Favorite;
