var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected for server.');
});

socket.on('fetchNewForecast', function(forecast) {
    console.log(forecast);

    jQuery('#forecast').empty();
    jQuery('#forecast').append(`
    <h3>${forecast.location}</h3>
    <br>
    The summary of today: ${forecast.summary}
    <br>
    Temp: ${forecast.temperature} C
    <br>
    It feels like: ${forecast.feelsLike} C
    <br>
    The Humidity: ${forecast.humidity } % 
    <br>
    Wind Speed: ${forecast.windSpeed} km/h
    <br>`);
});

$('form').submit(function(event) {
    event.preventDefault();
    console.log($('input').val());
    socket.emit('newLocation', $('input').val());
    return false;
});