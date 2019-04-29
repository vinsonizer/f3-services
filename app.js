const express = require('express')
const app = express()
const wp = require('./lib/worshipplanning')

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/heartbeat', (req, res) => res.send('Ok'))

app.get('/events', (req, res) => wp.getEvents(function (err, events) {
  if (err) {
    console.log(err); res.send('Error')
  } else res.send(events)
}))

app.listen(PORT, () => console.log(`Example app listening on ${PORT}!`))
