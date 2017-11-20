(function() {
    'use strict';

    // map = L.map('map', {doubleClickZoom: false}).locate({setView: true, maxZoom: 11});
    map = L.map('map', {
        center: [40, -95],
        zoom: 4
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BhdHRlcnNvbjgiLCJhIjoiY2lzZzBnbmlxMDFzNjJzbnZ1cXJ0bDJ5cSJ9.r_0eIQ9LIuNS3LV-GL1AIg').addTo(map);

    console.log("loaded map");

    // function to clear all layers
    function clearLayer(my_map) {
        my_map.eachLayer(function(layer) {
            if (layer.feature) {
                my_map.removeLayer(layer);
            }
        });
    }
    $(document).ready();


})();