const sensor = require('node-dht-sensor')

const getTemperatureData = () => {
  sensor.read(11, 18, (err, temperature, humidity) => {
    if (err) {
      throw err
    }
    return {
      temperature,
      humidity
    }
  })
}

module.exports = {
  getTemperatureData
}
