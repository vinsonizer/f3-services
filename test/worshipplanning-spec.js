/* global describe, it */
require('dotenv').config({ debug: true })
const assert = require('assert')
const should = require('chai').should()

const wp = require('../lib/worshipplanning')

describe('WP', function () {
  it('should exist', function () {
    should.exist(wp)
  })

  describe('login', function (done) {
    it('should return a token', function () {
      wp.login(function (err, token) {
        if (err) assert.fail('No token')
        else {
          should.exist(token)
        }
      })
    })
  })
})
