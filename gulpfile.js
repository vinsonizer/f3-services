const { series, src } = require('gulp')
const mocha = require('gulp-mocha')
const jshint = require('gulp-jshint')

function test (cb) {
  return src('./test/*.js')
    .pipe(mocha({ reporter: 'spec' }))
}

function lint (cb) {
  return src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
}

exports.default = series(lint, test)
