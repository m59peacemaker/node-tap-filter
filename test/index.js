const test = require('tape')
const parser = require('@m59/tap-parser')
const filter = require('../')

test('filters out "plan" when given "test" type', t => {
  t.plan(1)
  const stream = parser().pipe(filter(['test']))
  stream.on('data', data => {
    stream.end()
    t.equal(data, 'ok 1 stuff')
  })
  stream.write('1..2')
  stream.write('ok 1 stuff')
})
