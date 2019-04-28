/* jslint node: true */
'use strict'

var wp = {}

const config = require('./config')
const request = require('request')

const BASEHEADERS = { 'content-type': 'application/json', 'key': `${config.wp.apikey}` }

// always start with login and return the token
wp.login = function (callback) {
  var options = {
    url: config.wp.baseurl + '/authentication/login',
    headers: BASEHEADERS,
    json: { 'username': `${config.wp.username}`, 'password': `${config.wp.password}` }
  }
  request(options, function (err, response, body) {
    if (err) callback(err)
    else callback(err, body.token)
  })
}

module.exports = wp
