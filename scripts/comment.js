const BASE_API = "http://localhost:3000/api";
$('#commentForm').on("submit", handleCommentSubmit);

var stars = document.querySelectorAll('.star');
var ratingValue = 0;

function rate(rating) {
    ratingValue = rating;  // Met à jour la variable globale
    stars.forEach(function(star, index) {
        if (index < rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });

    console.log("Nombre d'étoiles sélectionnées : " + ratingValue);
    // Vous pouvez faire d'autres actions avec le nombre d'étoiles, par exemple, l'envoyer à un serveur, etc.
}

stars.forEach(function(star, index) {
    star.addEventListener('mouseover', function() {
        for (var i = 0; i <= index; i++) {
            stars[i].classList.add('selected');
        }
    });

    star.addEventListener('mouseout', function() {
        stars.forEach(function(star) {
            if (!star.classList.contains('clicked')) {
                star.classList.remove('selected');
            }
        });
    });

    star.addEventListener('click', function() {
        rate(index + 1);
        stars.forEach(function(star, i) {
            if (i <= index) {
                star.classList.add('clicked');
            } else {
                star.classList.remove('clicked');
            }
        });
    });
});

// Fonction externe pour récupérer la valeur de rating
function getRatingValue() {
    return ratingValue;
}

function affichevalue(){
    return console.log("voici : " + getRatingValue())
}

// Fonction pour obtenir la date actuelle au format YYYY-MM-DD
function getCurrentDate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}


///// Fonction POST commentaire
async function handleCommentSubmit(event) {
    event.preventDefault();

    //var user = await getUsers();

    // TODO modif
    var userCommentator = await getUserById("6570e52fed53bdc22acc13e8");
    var userTarget = await getUserById("6570e553ed53bdc22acc13ea");

    data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        mark: getRatingValue(),
        date: getCurrentDate(),
        idCommentator: userCommentator._id,
        idTarget: userTarget._id
    }
    if(data) {
        try {
            const response = await fetch(BASE_API + "/comment", {
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

//Recupere tout les commentaires de l'api
async function getAllComments() {
    try {
        const response = await fetch(BASE_API + "/comment");
        const data = await response.json();
  
        // Filter out items where clientId is undefined
        const filteredData = data.filter(item => item.idClient == undefined);
  
        populateFoodAnnonces(filteredData);
    } catch (err) {
        console.log(err);
    }
  }

  //Rempli l'HTML par les foods card
function populateFoodAnnonces(data) {

    var html = "";

    data.forEach(function(comment) {

        html += `
            <div class="col-md-6">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-success">Note : ${comment.mark} / 5</strong>
                  <h3 class="mb-0">${comment.title}</h3>
                  <div class="mb-1 text-muted">${moment(comment.date).format('DD/MM/YYYY HH:mm:ss')}</div>
                  <p class="card-text mb-auto">${comment.description}</p> 
                </div>
                <div class="col-auto d-none d-lg-block">
                  <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                </div>
              </div>
            </div>
        `;
    });

    // change the HTML to the container
    $('#CommentContainer').html(html);
}

getAllComments();