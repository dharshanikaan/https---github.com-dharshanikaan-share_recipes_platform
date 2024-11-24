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

// Ensuring the models are fully initialized before association
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Recipe, { foreignKey: 'recipeId' });

module.exports = Review;
