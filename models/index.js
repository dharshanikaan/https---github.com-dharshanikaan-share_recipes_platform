// models/index.js
const User = require('./user');
const Recipe = require('./recipe');
const Review = require('./review');
const Favorite = require('./favorite');
const Follow = require('./follow');

module.exports = { User, Recipe, Review, Favorite, Follow };
