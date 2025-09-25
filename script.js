// Initialize the map
var map = L.map('map', {
  center: [20, 0],
  zoom: 2,
  scrollWheelZoom: true,
  timeDimension: true,
  timeDimensionControl: true
});

// Utility: random color generator
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Load countries (modern borders for now)
fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
  .then(res => {
    if (!res.ok) throw new Error("GeoJSON fetch failed");
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
    });

    // Just add directly (ignore timeline for now)
    countryLayer.addTo(map);
  })
  .catch(err => console.error("Error loading GeoJSON:", err));
