document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful!');
            localStorage.setItem('token', data.token);  // Save the JWT token to localStorage
            window.location.href = 'home.html';  // Redirect to home page after login
        } else {
            alert(data.message);  // Show error message from the backend
        }
    } catch (err) {
        alert('Server error, please try again later.');
    }
});
