const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAdd = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdd}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find the address');
        } else if (body.status === 'OK') { 
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                long: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports = {
    geocodeAddress
};

