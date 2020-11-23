// Create the map
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 2
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(mag) {
    return mag * 3;
}

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

var geojson;

d3.json(queryUrl, function(json) {
    console.log(json)
    // Loop through the cities array and create one marker for each city object
    //for (var i = 0; i < data.length; i++) {

        geojson = L.geoJson(json, {

            style: function(feature) {
              var depth = feature.geometry.coordinates[2];
              if (depth >= 90) {
                return {
                  color: "#7400b8"
                }; 
              }
              else if (depth >= 70 && depth <= 89 ) {
                return {
                  color: "#6666ff"
                };
              } else if (depth >= 50 && depth <= 69) {
                return {
                  color: "#ff6666"
                };
              } else if (depth >= 30 && depth <= 49) {
                return {
                  color: "#ff66d9"
                };
              } else if (depth >= 10 && depth <= 29) {
                return {
                  color: "#ffb366"
                };
              } else if (depth >= -10 && depth <= 9) {
                return {
                  color: "#ffff66"
                };
              } else {
                return {
                  color: "#66ff66"
                }
              }
            },
        
            onEachFeature: function(feature, layer) {
        
                layer.bindPopup("<h3>" + feature.properties.place +
                "</h3><hr><p>"+ "<b>Time:</b> " + new Date(feature.properties.time) +
                "<br>" + "<b>Magnitude:</b> " + feature.properties.mag + 
                "<br>" + "<b>Depth:</b> " + feature.geometry.coordinates[2] + "</p>");
            },
        
            pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillOpacity: 1
              });
            }
          }).addTo(myMap);

        
        // Set up the legend
        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {
        
            var div = L.DomUtil.create('div', 'info legend'),
                depth = [0, 10, 20, 50, 100, 200, 500, 1000],
                labels = [];
        
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < depth.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(depth[i] + 1) + '"></i> ' +
                    depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
            }
        
            return div;
        };
        legend.addTo(map);

    });

