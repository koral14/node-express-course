document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const messageDiv = document.getElementById('message');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      // Send login request to the backend
      const response = await fetch('/api/v1/logon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to local storage
        localStorage.setItem('token', data.token);

        // Send request to get the hello message
        const helloResponse = await fetch('/api/v1/hello', {
          headers: {
            'Authorization': `Bearer ${data.token}`,
          },
        });

        const helloData = await helloResponse.json();

        // Display the hello message to the user
        messageDiv.textContent = helloData.message;
      } else {
        messageDiv.textContent = 'Login failed. Please check your credentials.';
      }
    } catch (error) {
      messageDiv.textContent = 'An error occurred during login.';
    }
  });
});