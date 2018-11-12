const sensor = require('node-dht-sensor')
const store = require('../core/store.js')

const THERMOMETER_TYPE = 11
const THERM_PIN = 18
const LOOP_DELAY = 2000

const loop = () => {
  sensor.read(THERMOMETER_TYPE, THERM_PIN, (err, temperature, humidity) => {
    if (err) {
      console.error(err)
    }
    store.setCurrentTemp(temperature, humidity)
  })
}
setInterval(loop, LOOP_DELAY)

module.exports = {}
