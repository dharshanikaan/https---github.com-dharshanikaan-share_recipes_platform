const dotenv = require("dotenv");
dotenv.config({ path: '../expenseapppassword/.env' });
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`,
    { dialect: 'mysql' }
);

module.exports = sequelize;
