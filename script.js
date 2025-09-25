// script.js

// Initialize map, centered on Europe
var map = L.map('map').setView([48.8566, 2.3522], 5); // Paris coords

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Add a draggable marker
var marker = L.marker([48.8566, 2.3522], {draggable: true}).addTo(map);
marker.bindPopup("Drag me around!").openPopup();
