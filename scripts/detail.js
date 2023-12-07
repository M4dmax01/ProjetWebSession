const BASE_API = 'http://localhost:3000/api';
var count=0;

//Recupere le food de l'api
async function getAFood() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    try{
        const response = await fetch(BASE_API+"/food/"+ id);
        const data = await response.json();
        
        if(data){
            if(data.idClient)
                $("#reserveFood").hide();

            populateFoodDetail(data);
        }
            

    } catch(err) {
        console.log(err);
    }
}

async function populateFoodDetail(food) {

    var container = $('#foodDetailContainer');

    var allegen ='';
    
    if(food.allergen) {
        food.allergen.forEach((a) => {
            allegen += a +'; ';     
        })
    }

    var user = await getUserById(food.idDonator);
    console.log(user);

    var html = `
        <div class="row mb-5">
            <div class="col">
                <h3 class="text-center">${moment(food.expiryDate).format('DD/MM/YYYY HH:mm:ss')}</h3>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <span>
                <h4 class="card-title text-center"><b>${food.name}</b></h4>
                <p class="card-text mt-5 justified-text"">${food.description}</p>
                <p class="card-text">Allegen : ${allegen}</p>
                <p class="card-text">Donneur : ${user.username}</p>
                </span>
            </div>
        </div>
    `;

    container.html(html);
    renderFoodMap(user.location);
}

getAFood();

$('#reserveFood').on("click", handleReservationSubmit);

//Reserve le Food
async function handleReservationSubmit(event) {
    event.preventDefault();

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    var client = await getUserById(userId);

    if (!userId || !token || !client) {
        window.location.href = 'login.html';
        return;
    }

    data = {
        idClient: client._id
    }

    if(data) {
        try {
            const response = await fetch(BASE_API + "/food/"+id, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Adjust this content type based on your API requirements
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);
            if(result.length > 0)
                redirectToHomePage();

            console.log("Success:", result);
            showMessage("success" , "Plat reserver avec succes");
            $("#reserveFood").hide();
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


function showMessage(color , message) {
    var alert = `
    <div class='alert alert-${color} alert-dismissible fade show mx-auto' role='alert' style="width: 80%;">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    $("#errorContainer").html(alert);
}