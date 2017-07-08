const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for.',
            string: true
        }
}).help()
.alias('help', 'h')
.argv;

var encodedAdd = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdd}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/0ad3b4ca30487e946e131049a9567383/${lat},${long}`;
    console.log(`Location: ${response.data.results[0].formatted_address}`);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature / 3.6;
    var feelsLike = response.data.currently.apparentTemperature / 3.6;
    console.log(`The temp right now is ${temperature}, It's actually feels like ${feelsLike}.`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});

