const loki = require('lokijs')
const db = new loki('db.json')

const GLOBAL_HOME_ID = 'home'
const system = db.getCollection('system') || db.addCollection('system')
system.insert({
  id: GLOBAL_HOME_ID,
  heat: false,
  cool: false,
  fan: false
})

const setSystemState = ({ heat, cool, fan }) => {
  const systemState = system.findOne({'id': GLOBAL_HOME_ID})
  system.update(Object.assign(systemState, {heat, cool, fan}))
}

const getSystemState = () => {
  return system.findOne({'id': GLOBAL_HOME_ID})
}

const heat = () => {
  setSystemState({
    heat: true,
    cool: false,
    fan: false
  })
}
const cool = () => {
  setSystemState({
    heat: false,
    cool: true,
    fan: false
  })
}
const fan = () => {
  setSystemState({
    heat: false,
    cool: false,
    fan: true
  })
}

const off = () => {
  setSystemState({
    heat: false,
    cool: false,
    fan: false
  })
}

module.exports = {
  getSystemState,
  setSystemState,
  heat,
  cool,
  fan,
  off
}
