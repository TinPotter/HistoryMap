// Create the map inside the “map” div, centered somewhere
var map = L.map('map').setView([0, 0], 2);  
// (lat, lng), zoom = 2 (world view)

// Use a tile server — OpenStreetMap standard tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a draggable marker to test
var marker = L.marker([0, 0], { draggable: true }).addTo(map);
marker.bindPopup("Here’s a marker. Drag me!").openPopup();
