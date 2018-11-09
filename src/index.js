const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.route('/api/therm')
  .get((req, res) => {
    res.send({'termp': 33, 'humidity': 0.60})
  })
  .put((req, res) => {
    res.send('Updated system state! (not really)')
  })

app.listen(8080)
