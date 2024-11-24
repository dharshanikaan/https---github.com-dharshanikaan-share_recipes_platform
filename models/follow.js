const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');

const Follow = sequelize.define('Follow', {
    follower_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    followed_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
});

// Define associations
User.belongsToMany(User, { as: 'Followers', through: Follow, foreignKey: 'followerId' });
User.belongsToMany(User, { as: 'Followed', through: Follow, foreignKey: 'followedId' });

module.exports = Follow;
