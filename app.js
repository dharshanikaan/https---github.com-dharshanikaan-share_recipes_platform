const express = require('express');
const cors = require('cors');
const path = require('path');

const sequelize = require('./utils/database'); 
const authRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const { User, Recipe, Review, Favorite, Follow } = require('./models');

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (images, css, js) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes for the application (only API routes for business logic)
app.use('/', authRoutes);
app.use('/api', recipeRoutes);  // API prefix for recipe routes
app.use('/api/reviews', reviewRoutes);

// Serve the home page, login, and register pages as static HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Sync the database after all models are loaded
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
