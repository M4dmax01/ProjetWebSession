$('#signupForm').on("submit", handleSignUp);

async function handleSignUp(event){
    event.preventDefault();
    // Récupérer les valeurs du formulaire
    var formData = {
        username: document.getElementById('floatingUsername').value,
        lastname: document.getElementById('floatingLastname').value,
        email: document.getElementById('floatingEmail').value,
        password: document.getElementById('floatingPassword').value,
        location: document.getElementById('floatingAddress').value,
        postcode: document.getElementById('floatingPostcode').value,
        city: document.getElementById('floatingCity').value
    };

    // Envoyer les données du formulaire au serveur au format JSON
    fetch('http://localhost:3000/api/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convertir les données du formulaire en chaîne JSON
    })
    .then(response => 
    response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}