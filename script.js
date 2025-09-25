// Initialize the map (without TimeDimension)
var map = L.map('map', {
  center: [20, 0],
  zoom: 2,
  scrollWheelZoom: true
});

// Load a public GeoJSON (e.g., world countries)
const geoJsonUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

fetch(geoJsonUrl)
  .then(res => {
    if (!res.ok) throw new Error(`Failed to load GeoJSON: ${res.status}`);
    return res.json();
  })
  .then(data => {
    L.geoJSON(data, {
      style: () => ({
        color: "white",
        weight: 1,
        fillColor: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
        fillOpacity: 0.7
      }),
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(feature.properties.name);
      }
    }).addTo(map);
  })
  .catch(err => console.error("Error:", err));
