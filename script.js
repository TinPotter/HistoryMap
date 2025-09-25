// Initialize the map
var map = L.map('map', {
  center: [20, 0],
  zoom: 2,
  scrollWheelZoom: true,
  timeDimension: true,
  timeDimensionControl: true
});

// Random color generator for countries
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Load countries GeoJSON (modern borders)
fetch("countries.geo.json") // or GitHub raw URL if not local
  .then(res => {
    if (!res.ok) throw new Error("GeoJSON fetch failed");
    return res.json();
  })
  .then(data => {
    var countryLayer = L.geoJSON(data, {
      style: () => ({
        color: "white",          // border color
        weight: 1,
        fillColor: getRandomColor(),
        fillOpacity: 1
      }),
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(feature.properties.name);
      }
    });

    // Wrap in TimeDimension (slider works, placeholder for timeline)
    var tdLayer = L.timeDimension.layer.geoJson(countryLayer, {
      updateTimeDimension: true,
      addlastPoint: false,
      duration: 'P1Y'
    });

    tdLayer.addTo(map);
  })
  .catch(err => console.error("Error loading GeoJSON:", err));
