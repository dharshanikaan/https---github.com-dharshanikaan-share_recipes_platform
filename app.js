const express = require('express');
const cors = require('cors');
const path = require('path');  // Import the path module

const sequelize = require('./utils/database');  // Correct import of sequelize instance
const authRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Importing models from centralized file
const { User, Recipe, Review, Favorite, Follow } = require('./models');

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));  // Serve auth.html
});

app.get('/api/recipes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'recipes.html'));  // Serve recipes.html
});

app.get('/api/reviews', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reviews.html'));  // Serve reviews.html
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/reviews', reviewRoutes);

// Sync the database after all models are loaded
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
