const BASE_API = "http://localhost:3000/api";
$('#createForm').on("submit", handleFoodsSubmit);

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

            if(result)
                redirectToHomePage();

            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        console.log("Erreur pas d'utilisateur")
    }

    
}

function redirectToHomePage(){
    window.location.href = "/";
}

