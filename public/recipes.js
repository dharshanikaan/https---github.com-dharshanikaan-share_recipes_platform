const modal = document.getElementById('createRecipeModal');
const createRecipeBtn = document.getElementById('createRecipeBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const createRecipeForm = document.getElementById('createRecipeForm');

createRecipeBtn.onclick = () => {
    modal.style.display = 'block';
};

closeModalBtn.onclick = () => {
    modal.style.display = 'none';
};

// Fetch and display all recipes using fetch
const fetchRecipes = async () => {
    try {
        const response = await fetch('/api/recipes');
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const recipes = await response.json();
        const recipeList = document.getElementById('recipeList');
        recipeList.innerHTML = '';

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <img src="${recipe.image_url || 'https://via.placeholder.com/400'}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p><strong>Cooking Time:</strong> ${recipe.cooking_time} mins</p>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
                <p>${recipe.instructions.slice(0, 100)}...</p>
            `;
            recipeList.appendChild(recipeCard);
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch recipes. Please try again later.',
        });
    }
};

// Handle form submission to create a new recipe using fetch
createRecipeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newRecipe = {
        title: document.getElementById('recipeTitle').value,
        ingredients: document.getElementById('recipeIngredients').value,
        instructions: document.getElementById('recipeInstructions').value,
        cooking_time: document.getElementById('cookingTime').value,
        servings: document.getElementById('servings').value,
        image_url: document.getElementById('imageUrl').value,
    };

    try {
        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            },
            body: JSON.stringify(newRecipe),
        });

        if (!response.ok) {
            throw new Error('Failed to create recipe');
        }

        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Recipe created successfully.',
        }).then(() => {
            modal.style.display = 'none';
            fetchRecipes();  // Refresh the recipe list after creation
        });
    } catch (error) {
        console.error('Error creating recipe:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create recipe. Please check your input and try again.',
        });
    }
});

fetchRecipes();  // Initial fetch to display existing recipes
