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

User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'user_id' });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: 'recipe_id' });

module.exports = Favorite;
