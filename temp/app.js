const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        weather.fetchForcast(results.lat, results.long, (errorMsg, forecast) => {
            if (errorMsg) {
                console.log(errorMsg);
            } else {
                console.log(JSON.stringify(forecast, undefined, 2));
            }
        });
    }
});
