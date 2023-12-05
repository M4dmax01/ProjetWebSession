const BASE_API = 'http://localhost:3000/api';
var count=0;

//get a Match
async function getAMatch() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');


    try{
        const response = await fetch(BASE_API+"/matchs/"+ id);
        const data = await response.json();

        populateTennisMatchDetail(data);

        count++;

        if(count == 1){
            addPlayersToSelectBet(data);
        }


    } catch(err) {
        console.log(err);
    }
}

function populateTennisMatchDetail(match){

    var container = $('#tennisMatchdetailContainer');

    var html = `
    <div class="card w-100 mb-3">
        <div class="card-body">
            <div class="row mb-5">
                <div class="col">
                    <h3 class="text-center">${match.isFinished}</h3>
                    <h5 class="text-center"> ${moment(match.startTime).format('DD/MM/YYYY HH:mm:ss')}</h5>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-6 col-sm-6 col-md-6">
                    <span class="text-center">
                    <h5 class="card-title">${match.joueur1.prenom} ${match.joueur1.nom}</h5>
                    <p class="card-text">Classement : ${match.joueur1.classement}</p>
                    <p class="card-text">Nationalite :  ${match.joueur1.nationalite}</p>
                    <p class="card-text">Contestation restante : ${match.challengesRemaining["joueur1"]}</p>
                    </span>
                </div>
                <div class="col-6 col-sm-6 col-md-6">
                    <span class="text-center">
                        <h5 class="card-title">${match.joueur2.prenom} ${match.joueur2.nom}</h5>
                        <p class="card-text">Classement : ${match.joueur2.classement}</p>
                        <p class="card-text">Nationalite : ${match.joueur2.nationalite}</p>
                        <p class="card-text">Contestation restante : ${match.challengesRemaining["joueur2"]}</p>
                        <p class="card-text">Au service</p>
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="col-4 offset-md-4">
                    <ul class="list-group list-group-horizontal">
                    <li class="list-group-item w-100">${match.joueur1.prenom} ${match.joueur1.nom}</li>
                    <li class="list-group-item">${match.scoring["points"]}</li>
                    <li class="list-group-item">${match.scoring["points"]}</li>
                    <li class="list-group-item">${match.scoring["sets"]}</li>
                    </ul>
                    
                    <ul class="list-group list-group-horizontal">
                    <li class="list-group-item w-100">${match.joueur2.prenom} ${match.joueur2.nom}</li>
                    <li class="list-group-item">${match.scoring["points"]}</li>
                    <li class="list-group-item">${match.scoring["points"]}</li>
                    <li class="list-group-item">${match.scoring["sets"]}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
     `;

     container.html(html);
}

setInterval(getAMatch, 6000);
getAMatch()

$('#pari-form').on("submit", handlePariFormSubmit);

async function handlePariFormSubmit(event) {
    event.preventDefault();

    var urlParams = new URLSearchParams(window.location.search);

    var user = await getUsers();
    console.log(document.getElementById("joueurSelect").value);
    
    if(user) {
        data = {
            utilisateur: user[0]._id,
            match: urlParams.get('id'),
            choixJoueur: document.getElementById("joueurSelect").value,
            montant: document.getElementById("montant").value
        }

        try {
            const response = await fetch(BASE_API+"/bets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    } else {
        console.log("Erreur pas d'utilisateur")
    }
}

function addPlayersToSelectBet(data){
    option = "<option value="+data.joueur1._id+">"+data.joueur1.prenom +" "+ data.joueur1.nom+"</option>";
    option += "<option value="+data.joueur2._id+">"+data.joueur2.prenom +" "+ data.joueur2.nom+"</option>";
    $("#joueurSelect").html(option);
}