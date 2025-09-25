// Initialize map WITH TimeDimension (but don't use it yet)
var map = L.map('map', {
  center: [20, 0],
  zoom: 2,
  timeDimension: true,
  timeDimensionControl: true,
  timeDimensionOptions: {
    timeInterval: "2000-01-01/2025-01-01", // Placeholder interval
    period: "P1Y" // Default period (won't affect static data)
  }
});

// Load GeoJSON normally (no TimeDimension layer)
fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
  .then(res => res.json())
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
  });
