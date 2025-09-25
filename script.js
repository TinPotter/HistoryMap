// Initialize the map with TimeDimension
var map = L.map('map', {
  center: [20, 0],
  zoom: 2,
  scrollWheelZoom: true,
  timeDimension: true,
  timeDimensionControl: true,
  timeDimensionOptions: {
    timeInterval: "-4000-01-01/2025-01-01", // Timeline range: 4000 BC to present
    period: "P100Y", // Default step: 100 years
    speed: 0.5, // Slower playback
  }
});

// Dark basemap (better contrast)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Generate darker color variants
function getDarkerColor(baseColor, factor = 0.7) {
  const num = parseInt(baseColor.replace("#", ""), 16);
  const r = Math.max(0, Math.floor((num >> 16) * factor));
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * factor));
  const b = Math.max(0, Math.floor((num & 0x0000FF) * factor));
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).padStart(6, '0')}`;
}

// Load GeoJSON (modern borders as placeholder)
const geoJsonUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

fetch(geoJsonUrl)
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: (feature) => {
        const baseColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        return {
          color: "#333", // Dark borders
          weight: 0.5,
          fillColor: getDarkerColor(baseColor, 0.6), // Darker fill
          fillOpacity: 0.8
        };
      },
      onEachFeature: (feature, layer) => {
        // Always-show labels (no hover needed)
        layer.bindTooltip(feature.properties.name, {
          permanent: true, // Always visible
          direction: 'center',
          className: 'country-label'
        });
      }
    }).addTo(map);
  })
  .catch(err => console.error("Error loading GeoJSON:", err));
