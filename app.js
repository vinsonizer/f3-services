const express = require('express')
const app = express()
const wp = require('./lib/worshipplanning')
const slack = require('./lib/slack')

app.use(express.json())
app.use(express.urlencoded())

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/heartbeat', (req, res) => res.send('Ok'))

app.get('/api/events', (req, res) => wp.getEvents(function (err, events) {
  if (err) {
    console.log(err); res.send('Error: ' + err)
  } else res.json(events)
}))

app.listen(PORT, () => console.log(`Example app listening on ${PORT}!`))
