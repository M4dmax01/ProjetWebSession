async function getJoueurById(id){
    try{
        const response = await fetch(BASE_API+"/joueurs/"+id);
        const data = await response.json();
        
        return data;
    } catch(err) {
        console.log(err);
    }
}