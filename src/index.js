const express = require('express')
const app = express()

app.route('/api/therm')
  .get((req, res) => {
    res.send({'termp': 33, 'humidity': 0.60})
  })
  .put((req, res) => {
    res.send('Updated desired temp state! (not really)')
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
