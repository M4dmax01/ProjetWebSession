$('#loginForm').on("submit", handleLogin);

async function handleLogin(event) {
    event.preventDefault();
    // Récupérer les valeurs du formulaire
    var formData = {
        email: document.getElementById('floatingEmail').value,
        password: document.getElementById('floatingPassword').value
    };

    // Envoyer les données du formulaire au serveur au format JSON
    fetch('http://localhost:3000/api/user/web/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convertir les données du formulaire en chaîne JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Stocker le token dans le stockage local
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);

            console.log('Success:', data);
            window.location.href = 'index.html'; // Redirection vers la page d'accueil
        } else {
            console.error('Login failed:', data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
