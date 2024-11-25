document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert(data.message); // Show error message from the backend
        }
    } catch (err) {
        alert('Server error, please try again later.');
    }
});
