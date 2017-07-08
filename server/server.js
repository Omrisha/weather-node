const express = require('express');
const http = require('http');
const mathjs = require('mathjs');
const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');

    socket.on('newLocation', (location) => {
        console.log('Location: ', location);
        geocode.geocodeAddress(location, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(JSON.stringify(results, undefined, 2));
                weather.fetchForcast(results.lat, results.long, (errorMsg, forecast) => {
                    if (errorMsg) {
                        console.log(errorMsg);
                    } else {
                        console.log(JSON.stringify(forecast, undefined, 2));
                        socket.emit('fetchNewForecast', {
                            location: location,
                            summary: forecast.summary,
                            icon: forecast.icon,
                            temperature: mathjs.round(forecast.temperature/3.6),
                            feelsLike: mathjs.round(forecast.feelsLike/3.6),
                            humidity: mathjs.round(forecast.humidity*100),
                            windSpeed: forecast.windSpeed
                        });
                    }
                });
            }
        });
    });

    socket.on('disconnect', (socket) => {
        console.log('Client disconneted');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});