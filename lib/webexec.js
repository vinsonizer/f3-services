const request = require('request')

var webexec = {}

webexec.callService = function (url, headers, json, handler, callback) {
  console.log('inside webexec')
  var options = {
    url: url,
    headers: headers,
    json: json
  }
  request(options, function (err, response, body) {
    if (err) callback(err)
    else callback(err, handler(body))
  })
}

module.exports = webexec
