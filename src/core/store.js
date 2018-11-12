const loki = require('lokijs')
const db = new loki('db.json')

const GLOBAL_HOME_ID = 'home'
const system = db.getCollection('system') || db.addCollection('system')
system.insert({
  id: GLOBAL_HOME_ID,
  tempData: {
    temperature: null,
    humidity: null
  },
  therm: {
    targetTemp: 21,
    targetRange: null
  },
  state: {
    mode: 'a',
    power: true,
    fan: false
  },
  board: {
    heat: false,
    cool: false,
    fan: false
  },
  schedule: {
    away: null
  }
})

const getAway = () => {
  const systemDoc = system.findOne({'id': GLOBAL_HOME_ID})
  return systemDoc.schedule
}

const setAway = ({ away: timestamp }) => {
  const systemDoc = system.findOne({'id': GLOBAL_HOME_ID})
  console.log('AWAY: ', timestamp)
  systemDoc.schedule.away = timestamp
  system.update(systemDoc)
}

const getCurrentTemp = () => {
  const systemDoc = system.findOne({'id': GLOBAL_HOME_ID})
  return systemDoc.tempData
}
const setCurrentTemp = (currentTemp, currentHumidity) => {
  const systemDoc = system.findOne({'id': GLOBAL_HOME_ID})
  systemDoc.tempData.temperature = currentTemp
  systemDoc.tempData.humidity = currentHumidity
  system.update(systemDoc)
}

const getTargetTemp = () => {
  const systemDoc = system.findOne({'id': GLOBAL_HOME_ID})
  return systemDoc.therm
}

const setTargetTemp = ({ targetTemp }) => {
  const systemDoc = system.findOne({'id': GLOBAL_HOME_ID})
  systemDoc.therm.targetTemp = targetTemp
  system.update(systemDoc)
}

const setTargetRange = ({ targetRange }) => {
  const systemDoc = system.findOne({'id': GLOBAL_HOME_ID})
  systemDoc.therm.targetRange = targetRange
  system.update(systemDoc)
}

const setBoardState = ({ heat, cool, fan }) => {
  const systemDoc = system.findOne({'id': GLOBAL_HOME_ID})
  console.log({heat, cool, fan})
  systemDoc.board.heat = heat
  systemDoc.board.cool = cool
  systemDoc.board.fan = fan
  system.update(systemDoc)
}

const getBoardState = () => {
  return system.findOne({'id': GLOBAL_HOME_ID}).board
}

const getSystemState = () => {
  return system.findOne({'id': GLOBAL_HOME_ID}).state
}

const setSystemState = ({ mode, power, fan }) => {
  const systemDoc = system.findOne({'id': GLOBAL_HOME_ID})
  systemDoc.state.mode = mode
  systemDoc.state.power = power
  systemDoc.state.fan = fan
  system.update(systemDoc)
}

const heat = () => {
  setBoardState({
    heat: true,
    cool: false,
    fan: false
  })
}
const cool = () => {
  setBoardState({
    heat: false,
    cool: true,
    fan: false
  })
}
const fan = () => {
  setBoardState({
    heat: false,
    cool: false,
    fan: true
  })
}

const off = () => {
  setBoardState({
    heat: false,
    cool: false,
    fan: false
  })
}

module.exports = {
  getSystemState,
  setSystemState,
  setTargetTemp,
  setTargetRange,
  getTargetTemp,
  setBoardState,
  getBoardState,
  getCurrentTemp,
  setCurrentTemp,
  getAway,
  setAway,
  heat,
  cool,
  fan,
  off
}
