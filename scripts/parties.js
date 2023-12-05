const BASE_API = "http://localhost:3000/api";

async function getAllMatchs(){
    try{
        const response = await fetch(BASE_API+"/matchs");
        const data = await response.json();

        if(data) {
            joueur1 = await getJoueurById(data[0].joueur1);
            joueur2 = await getJoueurById(data[0].joueur2);
        }

        populateTennisMatchs(data, joueur1, joueur2);
    } catch(err) {
        console.log(err);
    }
}

function populateTennisMatchs(data, joueur1, joueur2) {

    var html = "";

    data.forEach(function(match) {
        html += `
            <div class="col">
                <div class="card w-100 mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8 col-sm-12 col-md-8">
                                <h5 class="card-title">${joueur1.prenom} ${joueur1.nom} - ${joueur2.prenom} ${joueur2.nom}</h5>
                                <p class="card-text"> ${match.isFinished}</p>
                                <p class="card-text">Date et heure de Debut: ${moment(match.startTime).format('DD/MM/YYYY HH:mm:ss')}</p>
                            </div>
                            <div class="col-4 col-sm-12 col-md-4 d-flex align-items-center justify-content-center">
                                <button class="btn btn-link text-warning">
                                    <i class="fa-solid fa-star fa-lg"></i>
                                </button>
                                <a href="./detail.html?id=${match._id}" class="btn btn-primary">Detail...</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // change the HTML to the container
    $('#tennisMatchsContainer').html(html);
}

setInterval(getAllMatchs, 6000);
getAllMatchs()