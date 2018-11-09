const sensor = require('node-dht-sensor')

const THERMOMETER_TYPE = 11
const THERM_PIN = 18

const getTemperatureData = () => {
  return new Promise((resolve, reject) => {
    sensor.read(THERMOMETER_TYPE, THERM_PIN, (err, temperature, humidity) => {
      if (err) {
        reject(err)
      }
      resolve({
        temperature,
        humidity
      })
    })
  })
}

module.exports = {
  getTemperatureData
}
