const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=320813f3d34cf74e45a382be674ab441&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', defined)
        } else if (body.error) {
            callback('Unable to find location', defined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast