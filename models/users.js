const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const bcrypt = require('bcryptjs');
const Recipe = require('./recipe');
const Review = require('./review');
const Favorite = require('./favorite');
const Follow = require('./follow');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Hash the password before saving the user
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

// Relationships
User.hasMany(Recipe, { foreignKey: 'user_id' });
User.hasMany(Review, { foreignKey: 'user_id' });
User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'user_id' });
User.belongsToMany(User, { as: 'Followers', through: Follow, foreignKey: 'follower_id' });
User.belongsToMany(User, { as: 'Followed', through: Follow, foreignKey: 'followed_id' });

module.exports = User;
