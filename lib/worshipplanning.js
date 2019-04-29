/* jslint node: true */
'use strict'

const config = require('./config')
var webexec = require('./webexec')
var wp = {}

const BASEHEADERS = { 'content-type': 'application/json', 'key': `${config.wp.apikey}` }

function addToken (headers, token) {
  headers.authorization = token
  return headers
}

function dateHandler (dateStr) {
  var dp = dateStr.substring(9, dateStr.length - 1).split(',')
  return new Date(dp[0], dp[1], dp[2], dp[3], dp[4])
}

// external methods
wp.getEvents = function (callback) {
  login((err, token) => {
    if (err) callback(err)
    else {
      fetchEvents(token, (err, events) => {
        if (err) callback(err)
        else {
          var promises = events.map((theEvent) => {
            return new Promise((resolve, reject) => {
              fetchEventAssignments(token, theEvent, (err, details) => {
                if (err) reject(err)
                else {
                  resolve({
                    location: theEvent.location,
                    date: dateHandler(theEvent.worshipDate),
                    q: details.map((q) => {
                      return q.assigneeName
                    })
                  })
                }
              })
            })
          })
          Promise.all(promises).then((results) => {
            callback(err, results)
          })
        }
      })
    }
  })
}

// always start with login and return the token
function login (callback) {
  var url = `${config.wp.baseurl}/authentication/login`
  var json = { 'username': `${config.wp.username}`, 'password': `${config.wp.password}` }
  webexec.callService(url, BASEHEADERS, json, (result) => { return result.token }, callback)
}

function fetchEvents (token, callback) {
  var url = `${config.wp.baseurl}/events`
  var json = {}
  webexec.callService(url, addToken(BASEHEADERS, token), json, (result) => { return result.data }, callback)
}

function fetchEventAssignments (token, event, callback) {
  var url = `${config.wp.baseurl}/eventAssignments/forEvent/${event.id}`
  var json = {}
  webexec.callService(url, addToken(BASEHEADERS, token), json, (result) => { return result }, callback)
}

module.exports = wp
