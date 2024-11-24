document.addEventListener('DOMContentLoaded', () => {
    // Handle Login form submission
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'recipes.html'; // Redirect to the recipes page
            } else {
                alert(data.message);
            }
        });
    }

    // Handle Registration form submission
    if (document.getElementById('register-form')) {
        document.getElementById('register-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('User registered successfully');
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                alert(data.message);
            }
        });
    }

    // Fetch and display recipes
    if (document.getElementById('recipe-list')) {
        fetchRecipes();
    }

    async function fetchRecipes() {
        const response = await fetch('http://localhost:5000/api/recipes');
        const recipes = await response.json();

        const recipeList = document.getElementById('recipe-list');
        recipes.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe-item');
            recipeItem.innerHTML = `
                <h3>${recipe.title}</h3>
                <p>${recipe.ingredients}</p>
                <p>${recipe.instructions}</p>
            `;
            recipeList.appendChild(recipeItem);
        });
    }

    // Handle review form submission
    if (document.getElementById('review-form')) {
        document.getElementById('review-form').addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const rating = document.getElementById('rating').value;
            const comment = document.getElementById('comment').value;

            const response = await fetch('http://localhost:5000/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating, comment }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Review submitted successfully');
                window.location.href = 'recipes.html'; // Redirect to recipes page
            } else {
                alert(data.message);
            }
        });
    }
});
