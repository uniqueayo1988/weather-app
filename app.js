const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help', 'h')
.argv

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    // console.log(JSON.stringify(results, undefined, 2))
    weather.getWeather(results.latitude, results.latitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage)
      } else {
        console.log(JSON.stringify(weatherResults, undefined, 2))
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`)
      }
    })
  }
})

// err - OVER_QUERY_LIMIT
// http://links.mead.io/api-fix
