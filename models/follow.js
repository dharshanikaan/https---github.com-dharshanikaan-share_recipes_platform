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

User.belongsToMany(User, { as: 'Followers', through: Follow, foreignKey: 'follower_id' });
User.belongsToMany(User, { as: 'Followed', through: Follow, foreignKey: 'followed_id' });

module.exports = Follow;
