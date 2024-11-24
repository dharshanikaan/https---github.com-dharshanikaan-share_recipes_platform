const dotenv = require("dotenv");
dotenv.config({ path: '../expenseapppassword/.env' });
const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/database');
const authRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/reviews', reviewRoutes);

sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
