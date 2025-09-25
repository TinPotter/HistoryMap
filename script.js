// Initialize the map with TimeDimension
var map = L.map('map', {
  center: [20, 0],
  zoom: 2,
  scrollWheelZoom: true,
  timeDimension: true,
  timeDimensionControl: true,
  timeDimensionOptions: {
    timeInterval: "-4000-01-01/2025-01-01", // Timeline range: 4000 BC to 2025 AD
    period: "P100Y", // Default step: 100 years
    loop: false,
    speed: 0.5
  }
});

// Add base layer (optional: e.g., CartoDB Positron)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Generate a darker variant of a color for labels
function getDarkerColor(hexColor, factor = 0.7) {
  const num = parseInt(hexColor.replace("#", ""), 16);
  const r = Math.max(0, Math.floor((num >> 16) * factor));
  const g = Math.max(0, Math.floor(((num >> 8) & 0xFF) * factor));
  const b = Math.max(0, Math.floor((num & 0xFF) * factor));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

// Generate random colors for countries
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Load GeoJSON (modern borders) and add permanent labels
const geoJsonUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

fetch(geoJsonUrl)
  .then(res => {
    if (!res.ok) throw new Error(`GeoJSON failed: ${res.status}`);
    return res.json();
  })
  .then(data => {
    const geoJsonLayer = L.geoJSON(data, {
      style: (feature) => {
        const fillColor = getRandomColor();
        return {
          color: "#333",          // Border color
          weight: 0.5,
          fillColor: fillColor,
          fillOpacity: 0.8
        };
      },
      onEachFeature: (feature, layer) => {
        // Add permanent label (no hover needed)
        const label = L.divIcon({
          className: 'country-label',
          html: `<div>${feature.properties.name}</div>`,
          iconSize: [100, 20],
          iconAnchor: [50, 0]
        });
        const center = layer.getBounds().getCenter();
        L.marker(center, {
          icon: label,
          interactive: false,
          zIndexOffset: 1000
        }).addTo(map);
      }
    }).addTo(map);

    // Add TimeDimension layer (placeholder for future historical data)
    L.timeDimension.layer.geoJson(geoJsonLayer, {
      updateTimeDimension: true,
      addlastPoint: false,
      duration: "P100Y" // Match the period in timeDimensionOptions
    }).addTo(map);
  })
  .catch(err => console.error("Error:", err));
