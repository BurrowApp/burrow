const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const store = require('./core/store.js')
require('./interfaces/therm.js')
require('./core/manager.js')
require('./interfaces/relay.js')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.route('/api/therm')
  .get(async (req, res) => {
    try {
      const tempData = store.getCurrentTemp()
      const targetTemp = store.getTargetTemp()
      return res.send({tempData, targetTemp})
    } catch (e) {
      return res.status(500).send(`Something went wrong: ${e.message}`)
    }
  })
  .put((req, res) => {
    try {
      store.setTargetTemp(req.body)
      res.send('Success')
    } catch (e) {
      return res.status(500).send(`Something went wrong: ${e.message}`)
    }
  })

app.route('/api/system')
  .get((req, res) => {
    const systemStateObject = {
      'fan': false,
      'system': false,
      'mode': 'h'
    }
    res.send(systemStateObject)
  })
  .put((req, res) => {
    res.send('updated system state (not really)')
  })

app.route('/api/schedule/away/:timestamp')
  .post((req, res) => {
    res.send(`Set the system to "away" ${req.params.timestamp}`)
  })

app.route('/api/weather/:zip')
  .get((req, res) => {
    res.send(`Get weather for ${req.params.zip}`)
  })

app.listen(8080)
