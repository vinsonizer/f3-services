/* global describe, it */
require('dotenv').config()
const assert = require('assert')
const should = require('chai').should()

const wp = require('../lib/worshipplanning')

describe('WP', function () {
  it('should exist', function () {
    should.exist(wp)
  })

  describe('getEvents', function () {
    it('should return events', function (done) {
      this.timeout(3000) // temporary timeout till we add mocks
      wp.getEvents(function (err, data) {
        if (err) assert.fail('No data')
        else should.exist(data); done()
      })
    })
  })
})
