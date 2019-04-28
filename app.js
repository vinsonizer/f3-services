const express = require('express')
const app = express()
const wp = require('./lib/worshipplanning')

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => wp.login(function (err, token) {
  if (err) console.log(err)
  else res.send(token)
}))

app.listen(PORT, () => console.log(`Example app listening on ${PORT}!`))
