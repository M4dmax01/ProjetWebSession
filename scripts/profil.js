function loadUserData() {
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
}

$('#updateProfileForm').on("submit", handleUpdate);

async function handleUpdate(event){
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    var formData = {
        username: document.getElementById('modalUsername').value,
        lastname: document.getElementById('modalLastname').value,
        email: document.getElementById('modalEmail').value,
        password: document.getElementById('modalPassword').value,
        location: document.getElementById('modalLocation').value,
        postcode: document.getElementById('modalPostcode').value,
        city: document.getElementById('modalCity').value
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
        document.getElementById('updateProfileModal').style.display = 'none';
        loadUserData();
    })
    .catch((error) => {
        console.error('Profile Update Error:', error);
    });
}

document.getElementById('updateProfileButton').addEventListener('click', function() {
    document.getElementById('updateProfileModal').style.display = 'block';
});


$('#deleteAccount').on("submit", handleDelete);
async function handleDelete(event){
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
}
// Appeler la fonction pour charger les informations de l'utilisateur au chargement de la page
loadUserData();
