// Fonction de déconnexion
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = 'login.html'; // Redirection vers la page de connexion
}

// Utilisation de la fonction de déconnexion
document.getElementById('logoutButton').addEventListener('click', logout);