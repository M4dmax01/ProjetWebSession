const BASE_API = 'http://localhost:3000/api';

async function getAllparis(){
    try{
        const response = await fetch(BASE_API+"/bets");
        const data = await response.json();

        populateTennisparis(data);
    } catch(err) {
        console.log(err);
    }
}

async function populateTennisparis(data) {
    if (data && data.length > 0) {
      var html = "";
      var joueurPromises = [];
      var matchPromises = [];
  
      data.forEach(function(pari) {
        joueurPromises.push(getJoueurById(pari.choixJoueur));
        matchPromises.push(getAMatch(pari.match));
      });
  
      // Wait for all joueurPromises to resolve
      const joueurs = await Promise.all(joueurPromises);
      const matchs = await Promise.all(matchPromises);
  
      data.forEach((pari, index) => {
        const joueur = joueurs[index];
        const match = matchs[index];
  
        html += `
          <div class="col">
            <div class="card w-100 mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-10 col-sm-12 col-md-10">
                    <h5 class="card-title">${match.tournament}</h5>
                    <p class="card-text">Montant : ${pari.montant}$</p>
                    <p class="card-text">Joueur : ${joueur.nom} ${joueur.prenom}</p>
                  </div>
  
                  <div class="col-2 col-sm-12 col-md-2 d-flex align-items-center justify-content-center">
                    <span class="${pari.estGagnant ? "badge bg-success" : "badge bg-danger"}">
                      <h6>${pari.estGagnant ? "Gagne" : "Perdu"}</h6>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      });
  
      // change the HTML to the container
      $('#parisContainer').html(html);
    } else {
      console.log("no data found");
    }  
}

//get a Match
async function getAMatch(id) {
    try{
        const response = await fetch(BASE_API+"/matchs/"+ id);
        const data = await response.json();

        return data;

    } catch(err) {
        console.log(err);
    }
}


setInterval(getAllparis, 60000);
getAllparis();