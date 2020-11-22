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


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(queryUrl, function(json) {
    console.log(json)
    // Loop through the cities array and create one marker for each city object
    //for (var i = 0; i < data.length; i++) {

        geoLayer = L.geoJson(json, {

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
        
              var popupText = "<b>Magnitude:</b> " + feature.properties.mag +
                "<br><b>Location:</b> " + feature.properties.place +
                "<br><a href='" + feature.properties.url + "'>More info</a>";
        
              layer.bindPopup(popupText, {
                closeButton: true,
                offset: L.point(0, -20)
              });
              layer.on('click', function() {
                layer.openPopup();
              });
            },
        
            pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, {
                radius: Math.round(feature.properties.mag) * 3,
                // opacity: 1,
                fillOpacity: 1
              });
            },
          }).addTo(myMap);
        });

// function createFeatures(earthquakeData) {

//     // Define the function to run once for each feature in the features array
//     // Give each feature a popup descibing the place and time of the earthquake
    
//     function onEachFeature(feature, layer) {
//         layer.bindPopup("<h3>" + feature.properties.place +
//             "</h3><hr><p>"+ "Time:" + new Date(feature.properties.time) +
//             "<hr>" + "Magnitude:" + feature.properties.mag + "</p>");
//     }

//     // Create a GeoJSON layer containing the features array on the earthquakeData object
//     // Run the onEachFeature function once for each piece of data in the array
//     L.geoJSON(earthquakeData, {
//         onEachFeature: onEachFeature
//     });

//     // // Sending our earthquakes layer to the createMap function
//     // createMap(earthquakes);

//     // for (var i = 0; i < data.length; i++) {
//     //   var geometry = data[i].features.geometry;
  
//     //   if (geometry) {
//     //     L.marker([features.geometry.coordinates[1], features.geometry.coordinates[0]]).addTo(myMap);
//     //   }
//     // }
  
// };
// Perform a GET request to the query URL
//d3.json(queryUrl, function(data) {
    // After get a response, send the data.features object to the createFeatures function
    //createFeatures(data.features);
//});

//function createFeatures(earthquakeData) {

    // Define the function to run once for each feature in the features array
    // Give each feature a popup descibing the place and time of the earthquake
    
    // function onEachFeature(feature, layer) {
    //     layer.bindPopup("<h3>" + feature.properties.place +
    //         "</h3><hr><p>"+ "Time:" + new Date(feature.properties.time) +
    //         "<hr>" + "Magnitude:" + feature.properties.mag + "</p>");
    // }

    // d3.json(queryUrl, function(response) {

        // console.log(data);
      
        // for (var i = 0; i < data.length; i++) {
        //   var location = data[i].location;
      
        //   if (location) {
        //     L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
        //   }
        // }
      
    //});

    // Create a GeoJSON layer containing the feature array on the earthquakeData object 
    // Run the onEachFeature function once for each piece of data in the array
    // var earthquakes = L.geoJSON(earthquakeData, {
    //     onEachFeature: onEachFeature
    // });

    // Sending our earthquake layer to the createMap function
    //createMap(earthquakes);
    //console.log(earthquakeData)
//}
//});

//function createMap(earthquakes) {

//     // Adding tile layer
//     L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 18,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: API_KEY
//       }).addTo(myMap);


//     // Create the map
//     var myMap = L.map("map", {
//         center: [37.09, -95.71],
//         zoom: 5,
//     });


    // d3.json(queryUrl, function(response) {

    //     console.log(response);
      
    //     for (var i = 0; i < response.length; i++) {
    //       var location = response[i].location;
      
    //       if (location) {
    //         L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    //       }
    //     };