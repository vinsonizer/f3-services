/* jslint node: true */
'use strict'

var wp = {}

const config = require('./config')
const request = require('request')

const BASEHEADERS = { 'content-type': 'application/json', 'key': `${config.wp.apikey}` }

function addToken (headers, token) {
  headers.authorization = token
  return headers
}

// external methods
wp.getEvents = function (callback) {
  login(function (err, token) {
    if (err) callback(err)
    else {
      fetchEvents(token, function (err, events) {
        if (err) callback(err)
        else callback(err, events)
      })
    }
  })
}

// always start with login and return the token
function login (callback) {
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

function fetchEvents (token, callback) {
  var options = {
    url: config.wp.baseurl + '/events',
    headers: addToken(BASEHEADERS, token),
    json: {}
  }
  request(options, function (err, response, body) {
    if (err) callback(err)
    else callback(err, body.data)
  })
}

module.exports = wp
