const BASE_API = "http://localhost:3000/api";

async function getAllFoods(){
    try{
        const response = await fetch(BASE_API+"/food");
        const data = await response.json();

        populateFoodAnnonces(data);
    } catch(err) {
        console.log(err);
    }
}

function populateFoodAnnonces(data) {

    var html = "";
    var allegen ='';

    data.forEach(function(food) {

        if(food.allergen) 
            food.allergen.forEach((allegen) => {
                allegen +=` ${allegen};`;
            })

        html += `
            <div class="col-md-6">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-success">Donation</strong>
                  <h3 class="mb-0">${food.name}</h3>
                  <div class="mb-1 text-muted">${moment(food.expiryDate).format('DD/MM/YYYY HH:mm:ss')}</div>
                  <p class="card-text mb-auto">${food.description}</p> 
                  <p class='card-text mb-auto'>${allegen}</p>
                  <a href="./detail.html?id=${food._id}" class="stretched-link">Detail...</a>
                </div>
                <div class="col-auto d-none d-lg-block">
                  <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                </div>
              </div>
            </div>
        `;
    });

    // change the HTML to the container
    $('#FoodContainer').html(html);
}

setInterval(getAllFoods, 6000);
getAllFoods();