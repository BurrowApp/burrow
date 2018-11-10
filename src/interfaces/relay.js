const five = require('johnny-five')
const Raspi = require('raspi-io')
const store = require('../core/store.js')
const board = new five.Board({
  io: new Raspi(),
  repl: false
})

const STORE_QUERY_INTERVAL = 3000

// ['P1-7', 'P1-11', 'P1-13', 'P1-15', 'P1-19', 'P1-21', 'P1-23', 'P1-29']
// const unusedPins = ['P1-15', 'P1-19', 'P1-21', 'P1-23', 'P1-29']

const defaultPinConfig = {
  type: 'NC'
}
const relayPins = [
  {
    id: 'heat',
    pin: 'P1-7'
  },
  {
    id: 'cool',
    pin: 'P1-11'
  },
  {
    id: 'fan',
    pin: 'P1-13'
  }
]
const relayPinsWithConfig = relayPins.map(pin => {
  return Object.assign(pin, defaultPinConfig)
})

board.on('ready', function () {
  const relays = new five.Relays(relayPinsWithConfig)
  const [ heatRelay, coolRelay, fanRelay ] = relays
  // const unusedRelays = new five.Relays(unusedPins)
  // unusedRelays.toggle()
  setInterval(function () {
    const { heat, cool, fan } = store.getSystemState()
    if (heat) {
      heatRelay.on()
      coolRelay.off()
      fanRelay.off()
    } else if (cool) {
      heatRelay.off()
      coolRelay.on()
      fanRelay.off()
    } else if (fan) {
      heatRelay.off()
      coolRelay.off()
      fanRelay.on()
    } else {
      relays.off()
    }
  }, STORE_QUERY_INTERVAL)
  board.on('exit', () => {
    relays.off()
  })
})

module.exports = {}
