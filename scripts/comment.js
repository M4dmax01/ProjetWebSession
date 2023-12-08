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

    var title=document.getElementById("title").value;
    var description=document.getElementById("description").value;

    if(!title || !description || getRatingValue() == 0) {
        showMessage("danger" , "Impossible d'envoyer le commentaire");
        return;
    }

    data = {
        title: title,
        description: description,
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

            if(result) {
                showMessage("success" , "Votre commentaire a été reçu."); 
                window.location.replace('index.html');
            }
        } catch (error) {
            showMessage("danger" , error);
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
  
        populateComments(filteredData);
    } catch (err) {
        console.log(err);
    }
  }

//Rempli l'HTML par les comment card
function populateComments(data) {

    var html = "";

    data.forEach(function(comment) {

        html += `
            <div class="col-md-12">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-success">Note : ${comment.mark} / 5</strong>
                  <h3 class="mb-0">${comment.title}</h3>
                  <div class="mb-1 text-muted">${moment(comment.date).format('DD/MM/YYYY HH:mm:ss')}</div>
                  <p class="card-text mb-auto">${comment.description}</p> 
                </div>
              </div>
            </div>
        `;
    });

    // change the HTML to the container
    $('#CommentContainer').html(html);
}

getAllComments();



function showMessage(color , message) {
    var alert = `
    <div class='alert alert-${color} alert-dismissible fade show mx-auto' role='alert' style="width: 80%;">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    $("#errorContainer").html(alert);
}