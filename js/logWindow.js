function openNav() {
    console.log("clicked open");
    document.getElementById("logWindow").style.width = "100%";
}

function closeNav() {
    console.log("clicked close");
    document.getElementById("logWindow").style.width = "0";
}


function clearForm() {
    console.log("cleared form");
    $('#form input[type=text], input[type=date], input[type=number], input[type=time]').val("");
}

var api_key = '0bc661c1ea32153881fc4a135ca4ccb8c18bae18';
var base_url = 'https://spatterson8.carto.com/api/v2/sql?q=';
var geojson_base_url = 'https://spatterson8.carto.com/api/v2/sql?format=GeoJSON&q=';

// function to authenticate
function sql_insert_query() {
    // return 'SELECT * FROM ' + layer + '&api_key=' + api_key;
    var columns = {
        'date'      : "'" + $('#log_date').val() + "'",
        'airframe'  : "'" + $('#log_airframe').val() + "'",
        'lat'       : $('#log_lat').val(),
        'lon'       : $('#log_lon').val(),
        'time'      : "'" + $('#log_time').val() + "'",
        'timespan'  : $('#log_timespan').val(),
        'purpose'   : "'" + $('#log_purpose').val() + "'",
        'city'      : "'" + $('#log_city').val() + "'",
        'state'      : "'" + $('#log_state').val() + "'",
        'issues'    : "'" + $('#log_issues').val() + "'",
        // 'type'      : "'" + $('#log_type').val() + "'"
    };
    var keys = Object.keys(columns);
    var string_keys = keys.toString();

    var vals = [];
    var counter = 0;
    for (var key in keys) {
         vals[counter] = columns[keys[key]];
         counter += 1;
    }
    var string_vals = vals.toString();

    return 'INSERT INTO flight_log_data (' + string_keys + ') ' +
        'VALUES (' + string_vals + ')&api_key=' + api_key;
}

function get_sql_query() {
    return 'SELECT * FROM flight_log_data &api_key=' + api_key;
}

function createPopup(feature) {
    // TODO make popup unique by layer and show everything

    var prop = feature.properties;
    var months = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    var date = new Date(prop.date);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    return L.popup().setContent(
        '<p>Date: ' + months[month] + ' ' + day + ', ' + year + '</p>' +
        '<p>Time: ' + prop.time + ' ISO' + '</p>' +
        '<p>Location: ' + prop.city + ', ' + prop.state + '</p>' +
        '<p>Airframe: ' + prop.airframe + '</p>' +
        '<p>Purpose: ' + prop.purpose + '</p>' +
        '<p>Issues: ' + prop.issues + '</p>' +
        '<p>Lat/Lon: ' + prop.lat + ', ' + prop.lon + '</p>'
    );
}

function load_all_flight_logs() {
    $.getJSON(geojson_base_url + get_sql_query(), function(data) {
        for (var i in data.features) {
            console.log(data.features[i].properties);
            var marker = L.marker([data.features[i].properties.lat, data.features[i].properties.lon]);
            marker.bindPopup(createPopup(data.features[i]));
            marker.addTo(map);
        }
    });
}
load_all_flight_logs();

$('#store').on('click', function() {
    console.log("clicky clicky");

    // TODO submit form data with SQL to carto
    $.ajax({
        url: base_url + sql_insert_query(),
        type: 'POST',
        success: function() {
            alert('submitted report');
            clearForm();
            load_all_flight_logs();
        }
    });
});