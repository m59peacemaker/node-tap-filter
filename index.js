const parser = require('@m59/tap-parser')
const through = require('throo').obj
const duplex = require('duplexer')
const assertTypesAreValid = require('./lib/assert-types-are-valid')

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

const filterParsed = (types, reverse) => {
  return through((push, chunk, enc, cb) => {
    const should = shouldFilter(types, chunk)
    if (reverse ? !should : should) {
      push(chunk.value + '\n')
    }
    cb()
  })
}

const filter = (types = [], reverse = false) => {
  assertTypesAreValid(types)
  const parserStream = parser()
  const filteredStream = parserStream.pipe(filterParsed(types, reverse))
  return duplex(parserStream, filteredStream)
}

module.exports = filter
