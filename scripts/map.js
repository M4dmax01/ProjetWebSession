//Render la map dans le detail page
async function renderFoodMap(FoodAddress) {
  // Initialize and add the map
  var map = L.map('map'); // Removed setView to center map later

  // Add the OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  var coordinates = await getCoordinatesFromAddress(FoodAddress);
  console.log(coordinates);

  if (coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];

    // Add a marker
    L.marker([x, y]).addTo(map)
      .bindPopup('Food Marker!')
      .openPopup();

    // Center the map to the specified coordinates
    map.setView([x, y], 15); // Adjust the zoom level (15 in this example)
  }
}

//Get User coordinates address
async function getCoordinatesFromAddress(address) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const data = await response.json();

    if (data && data.length > 0) {
      const x = data[0].lat;
      const y = data[0].lon;

      return [x, y];
    } else {
      throw new Error('Unable to geocode address.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // Propagate the error further if needed
  }
}