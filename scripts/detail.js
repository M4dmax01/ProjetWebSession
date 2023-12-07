const BASE_API = 'http://localhost:3000/api';
var count=0;

//get a Match
async function getAFood() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');

    try{
        const response = await fetch(BASE_API+"/food/"+ id);
        const data = await response.json();

        populateFoodDetail(data);

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
  
    var html = `
        <div class="row mb-5">
            <div class="col">
                <h3 class="text-center">${moment(food.expiryDate).format('DD/MM/YYYY HH:mm:ss')}</h3>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <span class="text-center">
                <h5 class="card-title">${food.name} ${food.name}</h5>
                <p class="card-text">${food.description}</p>
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

async function handleReservationSubmit(event) {
    event.preventDefault();
    var urlParams = new URLSearchParams(window.location.search);
    
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
        window.location.href = 'login.html';
        return;
    }

    var id = urlParams.get('id');

    data = {
        idClient: userId
    }
    
    console.log(data);

    if(data) {
        try {
            const response = await fetch(BASE_API + "/food/"+id, {
                method: "PUT",
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);
            if(result.length > 0)
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
