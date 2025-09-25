// Initialize the map
var map = L.map('map', {
  center: [20, 0],
  zoom: 2,
  scrollWheelZoom: true,
  timeDimension: true,
  timeDimensionControl: true
});

// Random color generator
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Use a reliable GeoJSON URL (example: Natural Earth via GitHub)
const geoJsonUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

fetch(geoJsonUrl)
  .then(res => {
    if (!res.ok) throw new Error(`GeoJSON fetch failed: ${res.status}`);
    return res.json();
  })
  .then(data => {
    var countryLayer = L.geoJSON(data, {
      style: () => ({
        color: "white",
        weight: 1,
        fillColor: getRandomColor(),
        fillOpacity: 1
      }),
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(feature.properties.name);
      }
    }).addTo(map); // Add directly to map (no TimeDimension if not needed)
  })
  .catch(err => console.error("Error:", err));
