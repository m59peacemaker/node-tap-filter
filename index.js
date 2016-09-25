const duplex = require('duplexer')
const parser  = require('@m59/tap-parser')
const through = require('throo').obj
const supportedTypes = require('./lib/supported-types')

const shouldFilter = (types, chunk) => {
  if (chunk.type === 'test') {
    if (types.includes('test-pass') && chunk.parsed.ok) {
      return true
    }
    if (types.includes('test-fail') && !chunk.parsed.ok) {
      return true
    }
  }
  return types.includes(chunk.type)
}

const filter = (types = [], reverse = false) => {
  types.forEach(type => {
    if (!supportedTypes.includes(type)) {
      throw new Error(`"${type}" is not a valid TAP type`)
    }
  })
  const parserStream = parser()
  const filteredStream = parserStream
    .pipe(through((push, chunk, enc, cb) => {
      const should = shouldFilter(types, chunk)
      if (reverse ? !should : should) {
        push(chunk.value + '\n')
      }
      cb()
    }))
  return duplex(parserStream, filteredStream)
}

module.exports = filter
