/* global describe, it, beforeEach, afterEach */
require('dotenv').config()
const assert = require('assert')
const should = require('chai').should()
const sinon = require('sinon')
const fs = require('fs')
const webexec = require('../lib/webexec')

const wp = require('../lib/worshipplanning')
var testEvents = JSON.parse(fs.readFileSync('test/data/worshipplanning.json', 'utf-8'))

describe('WP', function () {
  var serviceStub
  beforeEach(function () {
    serviceStub = sinon.stub(webexec, 'callService')
  })

  afterEach(function () {
    sinon.restore()
  })

  it('should exist', function () {
    should.exist(wp)
  })

  describe('getEvents', function () {
    it('should return events', function (done) {
      serviceStub.onFirstCall().yieldsRight(null, testEvents.login.token)
      serviceStub.onSecondCall().yieldsRight(null, testEvents.getEvents.data)
      serviceStub.yieldsRight(null, testEvents.getEventAssignments)
      this.timeout(3000) // temporary timeout till we add mocks
      wp.getEvents(function (err, data) {
        if (err) assert.fail('No data')
        else should.exist(data); done()
      })
    })
  })
})
