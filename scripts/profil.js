// Charger les informations de l'utilisateur au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
        window.location.href = 'login.html';
        return;
    }

    fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById('usernameDisplay').textContent = user.username;
        document.getElementById('lastnameDisplay').textContent = user.lastname;
        document.getElementById('emailDisplay').textContent = user.email;
        document.getElementById('locationDisplay').textContent = user.location;
        document.getElementById('postcodeDisplay').textContent = user.postcode;
        document.getElementById('cityDisplay').textContent = user.city;
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
});

// Gestion de l'ouverture de la fenêtre modale pour la mise à jour
document.getElementById('updateProfileButton').addEventListener('click', function() {
    // Ouvrir la fenêtre modale
    document.getElementById('updateProfileModal').style.display = 'block';
});

// Gestion de la mise à jour du profil
document.getElementById('updateProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    var formData = {
        username: document.getElementById('modalUsername').value,
        lastname: document.getElementById('modalLastname').value,
        email: document.getElementById('modalEmail').value,
        // Pas de champ pour le mot de passe, la localisation, le code postal et la ville dans la modale
    };

    fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Profile Update Success:', data);
        // Fermer la fenêtre modale
        document.getElementById('updateProfileModal').style.display = 'none';
        // Recharger les informations de l'utilisateur
        window.location.reload();
    })
    .catch((error) => {
        console.error('Profile Update Error:', error);
    });
});

// Gestion de la suppression du compte
document.getElementById('deleteAccount').addEventListener('click', function() {
    if (confirm("Are you sure you want to delete your account?")) {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        fetch(`http://localhost:3000/api/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Account Deleted:', data);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.href = 'login.html'; // Redirection vers la page de connexion
        })
        .catch(error => {
            console.error('Error Deleting Account:', error);
        });
    }
});
