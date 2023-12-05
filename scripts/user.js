async function getUsers() {
    try{
        const response = await fetch(BASE_API+"/users");
        const data = await response.json();

        return data;
    } catch(err) {
        console.log(err);
    }
}