const LOOP_DELAY = 1000
const TEMP_TOLERANCE = 1
const store = require('./store.js')
const sensor = require('../interfaces/therm.js')

const auto = (temperature, targetTemp) => {
  console.log('in auto')
  console.log(temperature, targetTemp)
  if (temperature === targetTemp) {
    store.off()
  } else if (temperature > targetTemp) {
    console.log('auto cool the shiz')
    store.cool()
  } else if (temperature < targetTemp) {
    console.log('auto heat the shiz')
    store.heat()
  }
}

const handleAway = (away) => {
  if (new Date() < away) {
    store.off()
  } else {
    store.setAway({
      away: null
    })
  }
}

const loop = () => {
  const { targetTemp } = store.getTargetTemp()
  const { temperature } = store.getCurrentTemp()
  const { away } = store.getAway()
  const { fan, power, mode } = store.getSystemState()
  if (!power) {
    console.log('powering off')
    store.off()
  } else if (away) {
    console.log('AWAY BREH!')
    handleAway(away)
  } else if (fan) {
    console.log('fan on')
    store.fan()
  } else {
    switch (mode) {
      case 'h':
        console.log('heat on')
        if (temperature < targetTemp) {
          store.heat()
        } else {
          store.off()
        }
        break
      case 'c':
        console.log('cool on')
        if (temperature > targetTemp) {
          store.cool()
        } else {
          store.off()
        }
        break
      case 'a':
        console.log('auto on')
        auto(temperature, targetTemp)
        break
      default:
        store.off()
    }
  }
}

setInterval(loop, LOOP_DELAY)

module.exports = {}
