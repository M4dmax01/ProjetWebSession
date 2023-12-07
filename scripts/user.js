async function getUserById(id) {
    try{
        const response = await fetch(BASE_API+"/user/"+id);
        const data = await response.json();

        return data;
    } catch(err) {
        console.log(err);
    }
}