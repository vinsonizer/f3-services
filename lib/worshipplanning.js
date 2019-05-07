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

// TODO: make suck less
function dateHandler (dateStr) {
  var dateArray = dateStr.substring(9, dateStr.length - 1).split(',')
  var dp = dateArray.slice(1).map((part, index) => {
    if (index === 0) part = (parseInt(part) + 1).toString()
    return part.padStart(2, '0')
  })
  var year = dateArray[0]
  var resultStr = `${year}-${dp[0]}-${dp[1]}T${dp[2]}:${dp[3]}:00-0400`
  var result = new Date(resultStr)
  return result
}

// external methods
wp.getEvents = function (callback) {
  login((err, token) => {
    if (err) callback(err)
    else {
      fetchEvents(token, (err, events) => {
        if (err) callback(err)
        else {
          var promises = events.map(theEvent => {
            return new Promise((resolve, reject) => {
              fetchEventAssignments(token, theEvent, (err, details) => {
                if (err) reject(err)
                else {
                  resolve({
                    location: theEvent.location,
                    date: dateHandler(theEvent.worshipDate),
                    q: details.filter(q => {
                      /*
                      10 = pending
                       20 = accepted
                       40 = tentatively accepted
                      */
                      return q.status === 10 || q.status === 20 || q.status === 40
                    }).map(q => {
                      return q.assigneeName
                    })
                  })
                }
              })
            })
          })
          Promise.all(promises).then(results => {
            callback(err, results.filter(ev => { return ev.q.length > 0 }))
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
  webexec.callService(url, BASEHEADERS, json, result => { return result.token }, callback)
}

function fetchEvents (token, callback) {
  var url = `${config.wp.baseurl}/events?perPage=35`
  webexec.callService(url, addToken(BASEHEADERS, token), {}, result => { return result.data }, callback)
}

function fetchEventAssignments (token, event, callback) {
  var url = `${config.wp.baseurl}/eventAssignments/forEvent/${event.id}`
  webexec.callService(url, addToken(BASEHEADERS, token), {}, result => { return result }, callback)
}

module.exports = wp
