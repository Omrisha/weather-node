const request = require('request');

var fetchForcast = (lat, long, callback) => {
    request({
        url: `https://api.darksky.net/forecast/0ad3b4ca30487e946e131049a9567383/${lat},${long}`,
        json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    summary: body.currently.summary,
                    temperature: body.currently.temperature,
                    feelsLike: body.currently.apparentTemperature
                });
            } else {
                callback('There was a problem with your location.');
            }
    });
};

module.exports = {
    fetchForcast
};

