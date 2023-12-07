const BASE_API = "http://localhost:3000/api";

$('#createForm').on("submit", handleFoodsSubmit);

//Creer une annonce 
async function handleFoodsSubmit(event) {
    event.preventDefault();

    //var user = await getUsers();

    let allergenSplit = document.getElementById("allergen").value.split(',');
    
    // TODO modif
    var user = await getUserById("656fbd96dae697882bab2dd2");
    
    data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        quantity: document.getElementById("quantity").value,
        allergen: allergenSplit,
        expiryDate: document.getElementById("expiryDate").value,
        idDonator: user._id
    }
    if(data) {
        try {
            const response = await fetch(BASE_API + "/food", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if(data.name && data.description && data.quantity && data.expiryDate && data.idDonator) {
                showMessage("success", "Annonce ajoute avec succes");
                redirectToHomePage();
            } else {
                showMessage("danger", "Veuillez remplir tous les champs obligatoires");
            }

            console.log("Success:", result);
        } catch (error) {
                showMessage("danger", error);
        }
    } else {
        showMessage("danger", "Impossible de trouver l'utilisateur");
    }

    
}

function redirectToHomePage(){
    window.location.href = "/";
}

function showMessage(color , message){
    var alert = `
    <div class='alert alert-${color} alert-dismissible fade show mx-auto' role='alert' style="width: 80%;">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    $("#errorContainer").html(alert);
}