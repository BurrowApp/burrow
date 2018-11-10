const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const store = require('./core/store.js')
require('./interfaces/therm.js')
require('./core/manager.js')
require('./interfaces/relay.js')

const app = express()

app.use(bodyParser.json())
app.use(cors({allowedOrigins: ['*']}))

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
    try {
      res.send(store.getSystemState())
    } catch (e) {
      return res.status(500).send(`Something went wrong: ${e.message}`)
    }
  })
  .put((req, res) => {
    try {
      store.setSystemState(req.body)
      res.send('Success')
    } catch (e) {
      return res.status(500).send(`Something went wrong: ${e.message}`)
    }
  })

app.route('/api/schedule/away')
  .post((req, res) => {
    try {
      store.setAway(req.body)
      res.send('success')
    } catch (e) {
      return res.status(500).send(`Something went wrong: ${e.message}`)
    }
  })
  .get((req, res) => {
    try {
      return res.send(store.getAway())
    } catch (e) {
      return res.status(500).send(`Something went wrong: ${e.message}`)
    }
  })

app.route('/api/weather/:zip')
  .get((req, res) => {
    res.send(`Get weather for ${req.params.zip}`)
  })

app.listen(8080)
