// Create a map centered on Paris
var map = L.map('map').setView([48.8566, 2.3522], 5);

// Dark Matter tiles from Carto
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Add a draggable marker
var marker = L.marker([48.8566, 2.3522], { draggable: true }).addTo(map);
marker.bindPopup("Drag me!").openPopup();
