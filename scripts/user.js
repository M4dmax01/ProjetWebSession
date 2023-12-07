async function getUserById(id) {
    try{
        const token = localStorage.getItem('token');
        
        const response = await fetch(BASE_API + "/user/" + id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Adjust this content type based on your API requirements
            },
        });
        
        const data = await response.json();

        return data;
    } catch(err) {
        console.log(err);
    }
}